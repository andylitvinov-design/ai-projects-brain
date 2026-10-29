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
