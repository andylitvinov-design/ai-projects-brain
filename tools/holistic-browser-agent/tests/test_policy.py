import copy
import json

import pytest

from hba.policy import PolicyError, clean_origin, fingerprint, request_allowed, safe_run_id, safe_url, validate_manifest


def sample(mode="FIXTURE"):
    return {"schema_version": "hba.manifest.v1", "project": "holistic-house", "mode": mode,
            "provider": "local_playwright", "max_external_spend_usd": 0,
            "viewport": {"width": 390, "height": 844},
            "actions": [{"op": "assert_role", "role": "heading", "name": "Holistic House QA Fixture"}],
            **({"start_url": "https://holistichouse.vercel.app/"} if mode == "PUBLIC_READONLY" else {})}


def deny(obj, code):
    with pytest.raises(PolicyError) as e:
        validate_manifest(obj)
    assert e.value.code == code


@pytest.mark.parametrize("provider", ["tinyfish", "browserbase", "stagehand-cloud", "openrouter", "paid_llm", "browser-use-cloud", "kling"])
def test_paid_providers_refused_before_browser(provider):
    x = sample()
    x["provider"] = provider
    deny(x, "BLOCKED_COST")


@pytest.mark.parametrize("value", [0.01, 1, 12, "0", None, True, False])
def test_nonzero_or_ambiguous_budget_denied(value):
    x = sample()
    x["max_external_spend_usd"] = value
    deny(x, "BLOCKED_COST")


@pytest.mark.parametrize("url", [
    "http://holistichouse.vercel.app/", "https://example.org/",
    "https://holistichouse.vercel.app.evil.org/", "https://127.0.0.1/",
    "https://localhost/", "https://169.254.169.254/", "file:///etc/passwd",
    "javascript:alert(1)", "data:text/html,<h1>bad</h1>",
    "https://user:pass@holistichouse.vercel.app/",
    "https://holistichouse.vercel.app:8443/", "https://holistichouse.vercel.app./",
    "https://holistichouse.vercel.app\\@evil.org/",
    "https://[::1]/", "https://192.168.1.10/",
])
def test_unapproved_origin_denied(url):
    with pytest.raises(PolicyError):
        safe_url(url, "holistic-house")


@pytest.mark.parametrize("method", ["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"])
def test_writes_and_unrecognized_methods_denied(method):
    assert not request_allowed("https://holistichouse.vercel.app/api/leads", method, "holistic-house")


def test_allowlisted_get_and_head_only():
    assert request_allowed("https://holistichouse.vercel.app/en", "GET", "holistic-house")
    assert request_allowed("https://holistichouse.vercel.app/ru", "HEAD", "holistic-house")
    assert not request_allowed("https://evil.org", "GET", "holistic-house")
    assert not request_allowed("https://holistichouse.vercel.app", "GET", "holistic-house", fixture=True)


@pytest.mark.parametrize("op", ["click_button", "fill"])
def test_public_form_or_button_blocked(op):
    x = sample("PUBLIC_READONLY")
    x["actions"] = [{"op": op, "name": "Try", "value": "test"}]
    deny(x, "BLOCKED_APPROVAL")


def test_unknown_action_denied():
    x = sample()
    x["actions"] = [{"op": "execute_shell", "text": "curl tinyfish.ai"}]
    deny(x, "INPUT_INVALID")


def test_unknown_fields_denied():
    x = sample()
    x["execute_js"] = "window.fetch('evil')"
    deny(x, "INPUT_INVALID")
    x = sample()
    x["actions"][0]["selector"] = "script"
    deny(x, "INPUT_INVALID")


def test_manifest_does_not_authorize_another_origin():
    x = sample("PUBLIC_READONLY")
    x["allowed_origins"] = ["https://evil.org"]
    deny(x, "INPUT_INVALID")


def test_strict_viewports_and_action_limit():
    for v in [0, 319, 9999, "390", True]:
        x = sample()
        x["viewport"]["width"] = v
        deny(x, "INPUT_INVALID")
    x = sample()
    x["actions"] *= 26
    deny(x, "INPUT_INVALID")


def test_invalid_public_start_query_token():
    x = sample("PUBLIC_READONLY")
    x["start_url"] = "https://holistichouse.vercel.app/?auth=secret"
    deny(x, "INPUT_INVALID")


def test_invalid_public_navigate_url():
    x = sample("PUBLIC_READONLY")
    x["actions"] = [{"op": "navigate", "url": "https://evil.org/"}]
    deny(x, "ORIGIN_NOT_ALLOWED")


def test_fixture_url_cannot_be_arbitrary_local_path():
    x = sample()
    x["start_url"] = "file:///private/vault"
    deny(x, "ORIGIN_NOT_ALLOWED")


def test_fingerprint_stable_and_no_mutation():
    x = sample()
    before = copy.deepcopy(x)
    y = validate_manifest(x)
    assert x == before
    assert fingerprint(y) == fingerprint(validate_manifest(json.loads(json.dumps(x))))
    assert len(fingerprint(y)) == 64


def test_run_id_disallows_traversal():
    assert safe_run_id("a"*32)
    for bad in ["../etc/passwd", "~", "a"*33, "b"*31, "Z"*32]:
        assert not safe_run_id(bad)


@pytest.mark.parametrize("path", [
    "/admin/videos", "/en/admin/youtube-upload", "/ru/app/practice", "/api/leads",
    "/en/checkout", "/ru/clients", "/en/reports/abc", "/en/app/my-tests",
    "/es/profile", "/en/practice?panel=clients", "/%61dmin/videos",
])
def test_protected_routes_rejected_even_on_own_domain(path):
    with pytest.raises(PolicyError) as e:
        safe_url("https://holistichouse.vercel.app" + path, "holistic-house")
    assert e.value.code == "BLOCKED_PRIVACY"


def test_image_optimizer_denied_as_cost_risk():
    with pytest.raises(PolicyError) as e:
        safe_url("https://holistichouse.vercel.app/_next/image?url=https://x&w=640", "holistic-house")
    assert e.value.code == "BLOCKED_COST"


def test_public_service_discovery_stays_allowed():
    assert safe_url("https://holistichouse.vercel.app/en/explore/business", "holistic-house")
