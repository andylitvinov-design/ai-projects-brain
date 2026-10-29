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


def test_mcp_run_can_kill_owned_subprocess_and_reject_second_run(monkeypatch, tmp_path):
    import os
    import time
    import hba.mcp as mcp
    import hba.runner as runner

    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))

    def intentionally_stuck(_run_id):
        # A harmless synthetic child stands in for an unresponsive Chromium.
        return subprocess.Popen(
            [sys.executable, "-c", "import time; time.sleep(60)"],
            stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL, start_new_session=(os.name == "posix"),
        )

    monkeypatch.setattr(mcp, "_spawn_worker", intentionally_stuck)
    manifest = {
        "schema_version": "hba.manifest.v1", "project": "holistic-house",
        "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
        "provider": "local_playwright", "max_external_spend_usd": 0,
        "actions": [{"op": "assert_no_overflow"}],
    }
    started = handle_message(request("tools/call", name="hba_run",
                                     arguments={"manifest": manifest}))
    record = json.loads(started["result"]["content"][0]["text"])
    run_id = record["run_id"]
    deadline = time.monotonic() + 8
    proc = None
    while time.monotonic() < deadline:
        with mcp._worker_lock:
            proc = mcp._worker_process
        if proc is not None:
            break
        time.sleep(.03)
    try:
        assert proc is not None and proc.poll() is None
        busy = handle_message(request("tools/call", name="hba_run",
                                      arguments={"manifest": manifest}))
        assert busy["result"]["isError"]
        assert "RUN_BUSY" in busy["result"]["content"][0]["text"]
        cancelled = handle_message(request("tools/call", name="hba_cancel",
                                           arguments={"run_id": run_id}))
        assert json.loads(cancelled["result"]["content"][0]["text"])["cancel_requested"]
    finally:
        if mcp._worker is not None:
            mcp._worker.join(timeout=12)
        if proc is not None and proc.poll() is None:
            mcp._terminate_tree(proc)
    assert mcp._worker is not None and not mcp._worker.is_alive()
    assert proc is not None and proc.poll() is not None
    status = runner.read_status(run_id, tmp_path)
    assert status["state"] == "CANCELLED"
    assert status["failure_code"] == "CANCELLED"


def test_mcp_dead_worker_fails_not_succeeds(monkeypatch, tmp_path):
    import hba.mcp as mcp
    import hba.runner as runner
    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))

    def instant_crash(_run_id):
        return subprocess.Popen([sys.executable, "-c", "import sys; sys.exit(37)"],
                                stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                stderr=subprocess.DEVNULL)

    monkeypatch.setattr(mcp, "_spawn_worker", instant_crash)
    manifest = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
                "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
                "actions": [{"op": "assert_no_overflow"}]}
    started = handle_message(request("tools/call", name="hba_run",
                                     arguments={"manifest": manifest}))
    run_id = json.loads(started["result"]["content"][0]["text"])["run_id"]
    assert mcp._worker is not None
    mcp._worker.join(timeout=12)
    assert not mcp._worker.is_alive()
    result = runner.read_status(run_id, tmp_path)
    assert result["state"] == "FAILED"
    assert result["failure_code"] == "WORKER_EXIT_NONZERO"


def test_mcp_supervisor_timeout_kills_child(monkeypatch, tmp_path):
    import hba.mcp as mcp
    import hba.runner as runner
    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    monkeypatch.setattr(mcp, "MAX_RUN_SECONDS", -19.9)

    def slow(_run_id):
        return subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                                stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                stderr=subprocess.DEVNULL, start_new_session=True)

    monkeypatch.setattr(mcp, "_spawn_worker", slow)
    manifest = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
                "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
                "actions": [{"op": "assert_no_overflow"}]}
    started = handle_message(request("tools/call", name="hba_run",
                                     arguments={"manifest": manifest}))
    run_id = json.loads(started["result"]["content"][0]["text"])["run_id"]
    assert mcp._worker is not None
    mcp._worker.join(timeout=12)
    assert not mcp._worker.is_alive()
    result = runner.read_status(run_id, tmp_path)
    assert result["state"] == "FAILED"
    assert result["failure_code"] == "WORKER_TIMEOUT"


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


def test_mcp_run_finishes_real_chromium_fixture(monkeypatch, tmp_path):
    import os
    import hba.mcp as mcp
    import hba.runner as runner

    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    if os.path.isfile("/usr/bin/chromium"):
        monkeypatch.setenv("HBA_CHROMIUM_EXECUTABLE", "/usr/bin/chromium")
    manifest = {
        "schema_version": "hba.manifest.v1", "project": "holistic-house",
        "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
        "provider": "local_playwright", "max_external_spend_usd": 0,
        "actions": [{"op": "assert_role", "role": "heading", "name": "Holistic House QA Fixture"},
                    {"op": "assert_no_overflow"}],
    }
    response = handle_message(request("tools/call", name="hba_run", arguments={"manifest": manifest}))
    job = json.loads(response["result"]["content"][0]["text"])
    assert job["state"] == "QUEUED"
    assert mcp._worker is not None
    mcp._worker.join(timeout=45)
    if mcp._worker.is_alive():
        snapshot = runner.read_status(job["run_id"], tmp_path)
        mcp._cancel_on_shutdown()
        assert False, ("HBA worker exceeded 45s in phase=" +
                       str(snapshot.get("phase", "missing")) +
                       ", state=" + str(snapshot.get("state")))
    assert not mcp._worker.is_alive(), runner.read_status(job["run_id"], tmp_path)
    status = runner.read_status(job["run_id"], tmp_path)
    assert status["state"] == "SYNTHETIC_TEST_PASS", status
    assert status["assertions_passed"] == 2
    assert status["cost"] == {"paid_provider_calls": 0, "new_external_spend_usd": 0}


def test_worker_module_runs_real_chromium_as_standalone_subprocess(monkeypatch, tmp_path):
    import os
    from hba.runner import reserve_run, read_status, _write_atomic

    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    if os.path.isfile("/usr/bin/chromium"):
        monkeypatch.setenv("HBA_CHROMIUM_EXECUTABLE", "/usr/bin/chromium")
    manifest = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
                "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
                "actions": [{"op": "assert_no_overflow"}]}
    run_id, prepared = reserve_run(manifest, runs_dir=tmp_path)
    _write_atomic(tmp_path / run_id / "manifest.json", prepared)
    proc = subprocess.run(
        [sys.executable, "-m", "hba.worker", run_id],
        timeout=25, check=False, capture_output=True, text=True,
        env=os.environ.copy(),
    )
    result = read_status(run_id, tmp_path)
    assert proc.returncode == 0, (result["state"], result.get("phase"),
                                  result.get("failure_code"))
    assert result["state"] == "SYNTHETIC_TEST_PASS"


def test_worker_parent_pipe_disconnection_terminates_synthetic_child(monkeypatch, tmp_path):
    import os
    import time
    from hba.runner import reserve_run, _write_atomic

    monkeypatch.setenv("HBA_RUNS_DIR", str(tmp_path))
    manifest = {"schema_version": "hba.manifest.v1", "project": "holistic-house",
                "mode": "FIXTURE", "viewport": {"width": 390, "height": 844},
                "actions": [{"op": "assert_no_overflow"}]}
    run_id, prepared = reserve_run(manifest, runs_dir=tmp_path)
    _write_atomic(tmp_path / run_id / "manifest.json", prepared)
    env = os.environ.copy()
    env["HBA_SUPERVISED_WORKER"] = "1"
    proc = subprocess.Popen(
        [sys.executable, "-m", "hba.worker", run_id],
        stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        start_new_session=True, env=env,
    )
    try:
        assert proc.stdin is not None
        proc.stdin.close()  # emulate controller exit/crash, no model or network
        proc.wait(timeout=12)
        assert proc.returncode != 0
    finally:
        if proc.poll() is None:
            proc.kill()
            proc.wait(timeout=5)
