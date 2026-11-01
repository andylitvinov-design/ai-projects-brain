"""Small independent MCP stdio client: discover and invoke REAL local browser tools.

No Codex model, cloud service, external account, network browser or secrets.
"""
from __future__ import annotations
import json
import queue
import subprocess
import sys
import threading
import time


def main() -> int:
    p = subprocess.Popen(
        [sys.executable, "-m", "hba", "mcp"],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
        text=True, bufsize=1,
    )
    messages: queue.Queue[dict] = queue.Queue()

    def reader() -> None:
        assert p.stdout
        for line in p.stdout:
            try:
                messages.put(json.loads(line))
            except ValueError:
                messages.put({"error": "MALFORMED_RPC_REPLY"})

    threading.Thread(target=reader, daemon=True).start()
    counter = 0

    def call(method: str, params: dict | None = None) -> dict:
        nonlocal counter
        counter += 1
        assert p.stdin
        p.stdin.write(json.dumps({"jsonrpc": "2.0", "id": counter,
                                  "method": method, "params": params or {}}) + "\n")
        p.stdin.flush()
        message = messages.get(timeout=18)
        if message.get("id") != counter or "error" in message:
            raise RuntimeError("MCP_PROTOCOL_FAILURE")
        return message["result"]

    def tool(name: str, args: dict) -> dict:
        result = call("tools/call", {"name": name, "arguments": args})
        if result.get("isError"):
            raise RuntimeError("MCP_TOOL_ERROR")
        return json.loads(result["content"][0]["text"])

    try:
        init = call("initialize", {"protocolVersion": "2025-03-26",
                                   "capabilities": {}, "clientInfo": {"name": "hba-smoke", "version": "1"}})
        assert init["serverInfo"]["name"] == "holistic-browser-agent"
        discovered = call("tools/list")
        names = [item["name"] for item in discovered["tools"]]
        assert names == ["hba_doctor", "hba_plan", "hba_run", "hba_status", "hba_cancel"]
        doctor = tool("hba_doctor", {})
        assert doctor["state"] == "READY", "Chromium headless probe failed"
        manifest = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
                    "mode": "FIXTURE", "provider": "local_playwright",
                    "max_external_spend_usd": 0,
                    "viewport": {"width": 390, "height": 844},
                    "actions": [{"op": "assert_role", "role": "heading",
                                 "name": "Holistic House QA Fixture"},
                                {"op": "assert_no_overflow"}]}
        assert tool("hba_plan", {"manifest": manifest})["state"] == "PLANNED"
        launched = tool("hba_run", {"manifest": manifest})
        assert launched["state"] == "QUEUED"
        deadline = time.monotonic() + 50
        state = "QUEUED"
        while time.monotonic() < deadline:
            report = tool("hba_status", {"run_id": launched["run_id"]})
            state = report["state"]
            if state in {"SYNTHETIC_TEST_PASS", "FAILED", "CANCELLED", "BLOCKED_DEVICE"}:
                break
            time.sleep(.10)
        assert state == "SYNTHETIC_TEST_PASS", "MCP_RUN_DID_NOT_SUCCEED"
        assert report["assertions_passed"] == 2
        done = tool("hba_cancel", {"run_id": launched["run_id"]})
        assert done["cancel_requested"] is False
        print(json.dumps({"protocol": "PASS", "discovery": "PASS",
                          "real_chromium_mcp": "PASS", "assertions": 2,
                          "spend_usd": 0}, sort_keys=True))
        return 0
    finally:
        if p.stdin and not p.stdin.closed:
            p.stdin.close()
        try:
            p.wait(timeout=10)
        except subprocess.TimeoutExpired:
            p.kill()
            p.wait(timeout=5)


if __name__ == "__main__":
    raise SystemExit(main())
