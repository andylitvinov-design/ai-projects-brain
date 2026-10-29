"""Least-privilege local MCP bridge with a bounded, killable browser subprocess.

All externally callable operations pass the same manifest policy.  A browser
worker is never run inside Codex's stdio thread: a supervisor owns the child
process group, reports crashes and enforces deadlines/cancellation.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import threading
import time
from typing import Any

from .cli import doctor
from .policy import PolicyError, fingerprint
from .runner import (
    MAX_RUN_SECONDS, _write_atomic, cancel_run, default_runs_dir, make_plan,
    now, read_status, reserve_run,
)

PROTOCOL_VERSION = "2025-03-26"
TERMINAL = {"FAILED", "CANCELLED", "BLOCKED_DEVICE", "VERIFIED_READONLY",
            "SYNTHETIC_TEST_PASS"}
_worker_lock = threading.Lock()
_worker: threading.Thread | None = None
_worker_id: str | None = None
_worker_process: subprocess.Popen[bytes] | None = None


def _spawn_worker(run_id: str) -> subprocess.Popen[bytes]:
    """The fixed argv is not user-programmable and never invokes a shell."""
    allowed_env = {
        "PATH", "HOME", "LANG", "LC_ALL", "LC_CTYPE", "PYTHONPATH",
        "HBA_RUNS_DIR", "HBA_CHROMIUM_EXECUTABLE", "PLAYWRIGHT_BROWSERS_PATH",
        "XDG_CACHE_HOME", "TMPDIR", "LD_LIBRARY_PATH", "SYSTEMROOT", "WINDIR",
    }
    env = {key: value for key, value in os.environ.items() if key in allowed_env}
    return subprocess.Popen(
        [sys.executable, "-m", "hba.worker", run_id],
        stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        close_fds=True, start_new_session=(os.name == "posix"), env=env,
    )


def _terminate_tree(proc: subprocess.Popen[bytes]) -> None:
    """Only signal a direct child created by this MCP server, never a supplied PID."""
    if proc.poll() is not None:
        return
    try:
        if os.name == "posix":
            os.killpg(proc.pid, signal.SIGTERM)
        else:
            proc.terminate()
    except ProcessLookupError:
        return
    try:
        proc.wait(timeout=2.0)
    except subprocess.TimeoutExpired:
        try:
            if os.name == "posix":
                os.killpg(proc.pid, signal.SIGKILL)
            else:
                proc.kill()
        except ProcessLookupError:
            pass
        try:
            proc.wait(timeout=3.0)
        except subprocess.TimeoutExpired:
            pass


def _record_incomplete(run_id: str, reason: str, state: str = "FAILED") -> None:
    """Write a terminal result only AFTER the browser subprocess has exited."""
    try:
        record = read_status(run_id)
        if record.get("state") in TERMINAL:
            return
        record.update(state=state, failure_code=reason, completed_at=now())
        _write_atomic(default_runs_dir() / run_id / "status.json", record)
    except (OSError, PolicyError, ValueError):
        # Never print error strings, environment, URLs, or fixture data to MCP.
        pass


def _supervise(run_id: str) -> None:
    global _worker_process
    proc: subprocess.Popen[bytes] | None = None
    reason: str | None = None
    state = "FAILED"
    try:
        proc = _spawn_worker(run_id)
        with _worker_lock:
            _worker_process = proc
        deadline = time.monotonic() + MAX_RUN_SECONDS + 20
        flag = default_runs_dir() / run_id / "cancel.flag"
        while proc.poll() is None:
            if flag.exists():
                reason, state = "CANCELLED", "CANCELLED"
                _terminate_tree(proc)
                break
            if time.monotonic() >= deadline:
                reason = "WORKER_TIMEOUT"
                _terminate_tree(proc)
                break
            time.sleep(0.075)
        proc.wait(timeout=5)
        if reason is None and proc.returncode != 0:
            reason = "WORKER_EXIT_NONZERO"
    except Exception:
        reason = reason or "WORKER_LAUNCH_FAILED"
        if proc is not None:
            _terminate_tree(proc)
    finally:
        if reason:
            _record_incomplete(run_id, reason, state)
        else:
            # A child disappearing without any terminal record is not SUCCESS.
            _record_incomplete(run_id, "WORKER_UNCONFIRMED_EXIT")
        with _worker_lock:
            _worker_process = None


def _start_run(obj: Any) -> dict[str, Any]:
    global _worker, _worker_id
    with _worker_lock:
        if _worker is not None and _worker.is_alive():
            return {"state": "BLOCKED", "error_code": "RUN_BUSY", "paid_provider_calls": 0}
        run_id, manifest = reserve_run(obj)  # authorization and spend checks first
        _write_atomic(default_runs_dir() / run_id / "manifest.json", manifest)
        _worker_id = run_id
        _worker_process = None
        _worker = threading.Thread(target=_supervise, args=(run_id,),
                                   name="hba-subprocess-supervisor", daemon=False)
        _worker.start()
    return {"state": "QUEUED", "run_id": run_id, "manifest_sha256": fingerprint(manifest),
            "cost": {"paid_provider_calls": 0, "new_external_spend_usd": 0}}


def _cancel_on_shutdown() -> None:
    with _worker_lock:
        worker, run_id = _worker, _worker_id
    if worker is None or not worker.is_alive() or run_id is None:
        return
    try:
        cancel_run(run_id)
    except PolicyError:
        pass
    worker.join(timeout=5)
    if worker.is_alive():
        with _worker_lock:
            proc = _worker_process
        if proc is not None:
            _terminate_tree(proc)
        worker.join(timeout=5)


TOOLS = [
    {"name": "hba_doctor", "description": "Probe a local isolated Chromium; no external requests.",
     "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False}},
    {"name": "hba_plan", "description": "Validate one zero-spend browser manifest before execution.",
     "inputSchema": {"type": "object", "properties": {"manifest": {"type": "object"}},
                     "required": ["manifest"], "additionalProperties": False}},
    {"name": "hba_run", "description": "Start one isolated browser subprocess and return its run ID.",
     "inputSchema": {"type": "object", "properties": {"manifest": {"type": "object"}},
                     "required": ["manifest"], "additionalProperties": False}},
    {"name": "hba_status", "description": "Read persisted status of a local run.",
     "inputSchema": {"type": "object", "properties": {"run_id": {"type": "string"}},
                     "required": ["run_id"], "additionalProperties": False}},
    {"name": "hba_cancel", "description": "Cancel one run and terminate its owned Chromium process group.",
     "inputSchema": {"type": "object", "properties": {"run_id": {"type": "string"}},
                     "required": ["run_id"], "additionalProperties": False}},
]


def _tool_result(name: str, args: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(args, dict) or not isinstance(name, str):
        raise PolicyError("INPUT_INVALID")
    expected = {"hba_doctor": set(), "hba_plan": {"manifest"}, "hba_run": {"manifest"},
                "hba_status": {"run_id"}, "hba_cancel": {"run_id"}}
    if name not in expected:
        raise PolicyError("TOOL_UNKNOWN")
    if set(args) != expected[name]:
        raise PolicyError("INPUT_INVALID")
    if name == "hba_doctor":
        return doctor()
    if name == "hba_plan":
        return make_plan(args["manifest"])
    if name == "hba_run":
        return _start_run(args["manifest"])
    if name == "hba_status":
        return read_status(args["run_id"])
    return cancel_run(args["run_id"])


def handle_message(request: Any) -> dict[str, Any] | None:
    if not isinstance(request, dict) or request.get("jsonrpc") != "2.0":
        return {"jsonrpc": "2.0", "id": None, "error": {"code": -32600, "message": "Invalid request"}}
    method = request.get("method")
    if isinstance(method, str) and method.startswith("notifications/"):
        return None
    response: dict[str, Any] = {"jsonrpc": "2.0", "id": request.get("id")}
    if "id" not in request:
        return None
    if method == "initialize":
        response["result"] = {
            "protocolVersion": PROTOCOL_VERSION,
            "serverInfo": {"name": "holistic-browser-agent", "version": "0.2.0"},
            "capabilities": {"tools": {"listChanged": False}},
        }
    elif method == "ping":
        response["result"] = {}
    elif method == "tools/list":
        response["result"] = {"tools": TOOLS}
    elif method == "tools/call":
        params = request.get("params")
        if not isinstance(params, dict) or set(params) - {"name", "arguments", "_meta"}:
            response["error"] = {"code": -32602, "message": "Invalid tool arguments"}
        else:
            try:
                data = _tool_result(params.get("name"), params.get("arguments", {}))
                response["result"] = {
                    "content": [{"type": "text", "text": json.dumps(data, ensure_ascii=False)}],
                    "isError": data.get("state") in {"FAILED", "BLOCKED", "BLOCKED_DEVICE", "CANCELLED"},
                }
            except PolicyError as exc:
                response["result"] = {
                    "content": [{"type": "text", "text": json.dumps(
                        {"error_code": exc.code, "state": "BLOCKED"})}],
                    "isError": True,
                }
    else:
        response["error"] = {"code": -32601, "message": "Method not found"}
    return response


def serve_stdio() -> None:
    try:
        for line in sys.stdin:
            if len(line) > 1024 * 1024:
                continue
            try:
                obj = json.loads(line)
                result = handle_message(obj)
            except (ValueError, UnicodeError):
                result = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}
            except Exception:
                result = {"jsonrpc": "2.0", "id": None, "error": {"code": -32603, "message": "Internal error"}}
            if result is not None:
                sys.stdout.write(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n")
                sys.stdout.flush()
    finally:
        _cancel_on_shutdown()
