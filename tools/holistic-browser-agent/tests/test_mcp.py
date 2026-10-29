import json
import subprocess
import sys

from hba.mcp import handle_message


def request(method, **params):
    return {"jsonrpc":"2.0", "id":1, "method":method, "params":params}


def test_initialize_and_tools_list():
    r = handle_message(request("initialize", protocolVersion="2025-03-26"))
    assert r["result"]["protocolVersion"] == "2025-03-26"
    tools = handle_message(request("tools/list"))["result"]["tools"]
    assert [t["name"] for t in tools] == ["hba_doctor", "hba_plan", "hba_run", "hba_status", "hba_cancel"]
    assert "execute_shell" not in json.dumps(tools)
    assert "eval_js" not in json.dumps(tools)


def test_unknown_tool_rejected_without_egress():
    r = handle_message(request("tools/call", name="hba_execute_shell", arguments={"command":"curl https://evil"}))
    assert r["result"]["isError"] is True
    assert "TOOL_UNKNOWN" in r["result"]["content"][0]["text"]


def test_tool_arguments_not_extension_capability():
    r = handle_message(request("tools/call", name="hba_doctor", arguments={"paid_api":True}))
    assert r["result"]["isError"] is True
    assert "INPUT_INVALID" in r["result"]["content"][0]["text"]


def test_stdio_real_handshake_roundtrip():
    payload = "\n".join(json.dumps(r) for r in [request("initialize", protocolVersion="2025-03-26"),
                                                  request("tools/list"),
                                                  request("tools/call", name="hba_doctor", arguments={})]) + "\n"
    p = subprocess.run([sys.executable, "-m", "hba", "mcp"], capture_output=True, input=payload, text=True, timeout=20)
    assert p.returncode == 0, p.stderr
    rows = [json.loads(line) for line in p.stdout.strip().splitlines()]
    assert len(rows) == 3
    assert rows[0]["result"]["serverInfo"]["name"] == "holistic-browser-agent"
    assert rows[1]["result"]["tools"][0]["name"] == "hba_doctor"
    assert "allowed_external_spend_usd" in rows[2]["result"]["content"][0]["text"]


def test_notification_no_response():
    assert handle_message({"jsonrpc":"2.0", "method":"notifications/initialized"}) is None


def test_malformed_mcp_tool_name_fails_closed():
    response = handle_message(request("tools/call", name=["hba_run"], arguments={}))
    assert response["result"]["isError"] is True
    assert "INPUT_INVALID" in response["result"]["content"][0]["text"]


def test_mcp_run_is_cancellable_from_same_stdio_process(monkeypatch, tmp_path):
    import os
    import threading
    import hba.mcp as mcp
    import hba.runner as runner

    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    if os.path.isfile("/usr/bin/chromium"):
        monkeypatch.setenv("HBA_CHROMIUM_EXECUTABLE", "/usr/bin/chromium")

    entered = threading.Event()
    resume = threading.Event()
    original = runner._execute

    def held_action(page, spec, manifest, directory, screenshots, counters):
        entered.set()
        if not resume.wait(timeout=15):
            raise RuntimeError("Synthetic worker released too late")
        return original(page, spec, manifest, directory, screenshots, counters)

    monkeypatch.setattr(runner, "_execute", held_action)
    manifest = {
        "schema_version": "hba.manifest.v1",
        "project": "holistic-house", "mode": "FIXTURE",
        "provider": "local_playwright", "max_external_spend_usd": 0,
        "viewport": {"width": 390, "height": 844},
        "actions": [{"op": "assert_no_overflow"}],
    }
    started = handle_message(request("tools/call", name="hba_run", arguments={"manifest": manifest}))
    job = json.loads(started["result"]["content"][0]["text"])
    run_id = job["run_id"]
    try:
        assert job["state"] == "QUEUED"
        assert entered.wait(timeout=20), runner.read_status(run_id)
        busy = handle_message(request("tools/call", name="hba_run", arguments={"manifest": manifest}))
        assert busy["result"]["isError"] is True
        assert "RUN_BUSY" in busy["result"]["content"][0]["text"]
        stopped = handle_message(request("tools/call", name="hba_cancel", arguments={"run_id": run_id}))
        assert json.loads(stopped["result"]["content"][0]["text"])["cancel_requested"] is True
    finally:
        resume.set()
        if mcp._worker is not None:
            mcp._worker.join(timeout=25)
    assert mcp._worker is not None and not mcp._worker.is_alive()
    status = json.loads(handle_message(request(
        "tools/call", name="hba_status", arguments={"run_id": run_id}
    ))["result"]["content"][0]["text"])
    assert status["state"] == "CANCELLED"
    assert status["cost"] == {"paid_provider_calls": 0, "new_external_spend_usd": 0}


def test_mcp_run_rejects_paid_provider_without_job_creation(monkeypatch, tmp_path):
    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    bad = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
           "mode": "FIXTURE", "provider": "tinyfish",
           "viewport": {"width": 390, "height": 844},
           "actions": [{"op": "assert_no_overflow"}]}
    output = handle_message(request("tools/call", name="hba_run", arguments={"manifest": bad}))
    assert output["result"]["isError"] is True
    assert "BLOCKED_COST" in output["result"]["content"][0]["text"]
    assert not list(tmp_path.iterdir())
