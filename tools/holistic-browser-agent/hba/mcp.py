"""Minimal, local-only MCP stdio adapter: no remote listener or JS/shell tools.

Implements JSON-RPC messages over newline-delimited stdio for the supported
MCP handshake and tools. No client network endpoint or model invocation.
"""
from __future__ import annotations

import json
import os
import sys
import threading
from typing import Any

from .cli import doctor
from .policy import PolicyError, fingerprint
from .runner import (
    _write_atomic, cancel_run, default_runs_dir, make_plan, now,
    read_status, reserve_run, run_manifest,
)

PROTOCOL_VERSION = "2025-03-26"  # negotiated stable subset; validate against host in M2

# Exactly one bounded run per local MCP process. This is not an always-on queue.
_worker_lock = threading.Lock()
_worker: threading.Thread | None = None
_worker_id: str | None = None


def _start_run(manifest: dict[str, Any]) -> dict[str, Any]:
    """Return a persistent run ID immediately so status and cancel can be invoked."""
    global _worker, _worker_id
    with _worker_lock:
        if _worker is not None and _worker.is_alive():
            return {"state": "BLOCKED", "error_code": "RUN_BUSY", "paid_provider_calls": 0}
        run_id, validated = reserve_run(manifest)  # policy/cost checks precede side effects

        def worker() -> None:
            try:
                run_manifest(validated, run_id=run_id,
                             chromium_executable=os.environ.get("HBA_CHROMIUM_EXECUTABLE"))
            except Exception:
                # No exception text: it might include customer or local machine data.
                try:
                    report = read_status(run_id)
                    report.update(state="FAILED", failure_code="INTERNAL_ERROR", completed_at=now())
                    _write_atomic(default_runs_dir() / run_id / "status.json", report)
                except Exception:
                    pass

        _worker_id = run_id
        _worker = threading.Thread(target=worker, name="hba-local-run", daemon=False)
        _worker.start()
    return {"state": "QUEUED", "run_id": run_id, "manifest_sha256": fingerprint(validated),
            "cost": {"paid_provider_calls": 0, "new_external_spend_usd": 0}}


def _cancel_on_shutdown() -> None:
    """Never abandon an active browser worker when Codex closes the stdio pipe."""
    with _worker_lock:
        worker, run_id = _worker, _worker_id
    if worker is not None and worker.is_alive() and run_id is not None:
        try:
            cancel_run(run_id)
        except PolicyError:
            pass
        worker.join()  # browser calls have their own bounded timeouts

TOOLS = [
    {"name": "hba_doctor", "description": "Probe isolated, network-denied local Chromium without external requests.",
     "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False}},
    {"name": "hba_plan", "description": "Validate and preview one strictly zero-spend browser manifest.",
     "inputSchema": {"type": "object", "properties": {"manifest": {"type": "object"}}, "required": ["manifest"], "additionalProperties": False}},
    {"name": "hba_run", "description": "Start one bounded local browser run; returns run ID for status and cancellation.",
     "inputSchema": {"type": "object", "properties": {"manifest": {"type": "object"}}, "required": ["manifest"], "additionalProperties": False}},
    {"name": "hba_status", "description": "Read compact saved status for one local run.",
     "inputSchema": {"type": "object", "properties": {"run_id": {"type": "string"}}, "required": ["run_id"], "additionalProperties": False}},
    {"name": "hba_cancel", "description": "Request cooperative cancellation of one in-progress local run.",
     "inputSchema": {"type": "object", "properties": {"run_id": {"type": "string"}}, "required": ["run_id"], "additionalProperties": False}},
]


def _tool_result(name: str, args: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(args, dict):
        raise PolicyError("INPUT_INVALID")
    expected = {"hba_doctor": set(), "hba_plan": {"manifest"}, "hba_run": {"manifest"},
                "hba_status": {"run_id"}, "hba_cancel": {"run_id"}}
    if not isinstance(name, str):
        raise PolicyError("INPUT_INVALID")
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
        response["result"] = {"protocolVersion": PROTOCOL_VERSION, "serverInfo": {"name": "holistic-browser-agent", "version": "0.1.0"},
                              "capabilities": {"tools": {"listChanged": False}}}
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
                response["result"] = {"content": [{"type": "text", "text": json.dumps(data, ensure_ascii=False)}],
                                      "isError": data.get("state") in {"FAILED", "BLOCKED", "BLOCKED_DEVICE", "CANCELLED"}}
            except PolicyError as exc:
                response["result"] = {"content": [{"type": "text", "text": json.dumps({"error_code": exc.code, "state": "BLOCKED"})}],
                                      "isError": True}
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
                sys.stdout.write(json.dumps(result, separators=(",", ":"), ensure_ascii=False) + "\n")
                sys.stdout.flush()
    finally:
        _cancel_on_shutdown()
