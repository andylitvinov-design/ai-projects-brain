"""Zero-spend, fail-closed policy for the local Holistic Browser Agent.

The manifest NEVER defines its own privileges, origins, or executable code.
"""
from __future__ import annotations

import hashlib
import ipaddress
import json
import re
from dataclasses import dataclass
from typing import Any
from urllib.parse import urlsplit

PROJECT_ORIGINS = {"holistic-house": "https://holistichouse.vercel.app"}
SCHEMA_VERSION = "hba.manifest.v1"
ALLOWED_OPERATIONS = {
    "navigate", "assert_role", "assert_text", "assert_url",
    "click_link", "click_button", "fill", "screenshot",
    "assert_no_overflow", "assert_no_console_errors",
}
FIXTURE_ONLY = {"click_button", "fill"}
# Fixture inputs must never accidentally encode medical data, tokens or PII in PNGs.
# Review this small public list when expanding synthetic test cases.
SAFE_FIXTURE_VALUES = {"Business", "Sample", "Test", "Example"}
SAFE_ROLES = {"heading", "link", "button", "main", "navigation", "textbox", "status"}
RUN_ID_PATTERN = re.compile(r"^[0-9a-f]{32}$")


class PolicyError(Exception):
    def __init__(self, code: str):
        self.code = code
        super().__init__(code)


def _ensure_keys(value: dict[str, Any], allowed: set[str]) -> None:
    if set(value) - allowed:
        raise PolicyError("INPUT_INVALID")


def clean_origin(url: str) -> str:
    """Canonical exact HTTPS origin; reject local, credentials and non-web schemes."""
    if not isinstance(url, str) or len(url) > 2048 or any(ord(c) < 32 for c in url):
        raise PolicyError("ORIGIN_NOT_ALLOWED")
    try:
        u = urlsplit(url)
        if u.scheme != "https" or not u.hostname or u.username or u.password:
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        host = u.hostname.rstrip(".")
        if host != u.hostname or "\\" in url or "%" in u.netloc or "@" in u.netloc:
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        if host in {"localhost", "local", "metadata.google.internal"} or host.endswith(".local"):
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        try:
            ipaddress.ip_address(host)
        except ValueError:
            pass
        else:
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        if not re.fullmatch(r"[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?", host):
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        if ".." in host or host.startswith("-") or u.port not in (None, 443):
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        return "https://" + host
    except (ValueError, TypeError) as exc:
        raise PolicyError("ORIGIN_NOT_ALLOWED") from exc


def safe_url(url: str, project: str, *, require_path: bool = False) -> str:
    expected = PROJECT_ORIGINS.get(project) if isinstance(project, str) else None
    if expected is None:
        raise PolicyError("PROJECT_UNKNOWN")
    if clean_origin(url) != expected:
        raise PolicyError("ORIGIN_NOT_ALLOWED")
    u = urlsplit(url)
    if require_path and (u.query or u.fragment):
        raise PolicyError("INPUT_INVALID")
    # A fresh guest context is not consent to inspect personal/admin content.
    # Also deny same-origin proxy/transform endpoints that can trigger services.
    if "%" in u.path or "\\" in u.path or "//" in u.path:
        raise PolicyError("BLOCKED_PRIVACY")
    # Explicitly verified PUBLIC catalogue, despite /client prefix. Never expose
    # its dynamic descendants, reports, results, filters or query parameters.
    if (u.path in {"/en/client/tests", "/ru/client/tests", "/es/client/tests"}
            and not u.query and not u.fragment):
        return url
    segments = [v.lower() for v in u.path.split("/") if v]
    if segments and segments[0] in {"en", "ru", "es"}:
        segments = segments[1:]
    forbidden = {"app", "admin", "api", "account", "auth", "client", "clients",
                 "profile", "practice", "dashboard", "reports", "report", "results",
                 "sessions", "session", "checkout", "payment", "payments", "settings"}
    if any(part in forbidden for part in segments):
        raise PolicyError("BLOCKED_PRIVACY")
    if len(segments) >= 2 and segments[0] == "_next" and segments[1] == "image":
        raise PolicyError("BLOCKED_COST")
    return url


def request_allowed(url: str, method: str, project: str, *, fixture: bool = False) -> bool:
    if fixture:
        return False  # Browser fixture never fetches anything, including localhost.
    if method.upper() not in ("GET", "HEAD"):
        return False
    try:
        safe_url(url, project)
        return True
    except PolicyError:
        return False


def _check_positive_int(value: Any, min_v: int, max_v: int) -> bool:
    return type(value) is int and min_v <= value <= max_v


def validate_manifest(obj: Any) -> dict[str, Any]:
    if not isinstance(obj, dict):
        raise PolicyError("INPUT_INVALID")
    _ensure_keys(obj, {"schema_version", "project", "mode", "provider", "start_url", "viewport", "actions", "max_external_spend_usd"})
    if obj.get("schema_version") != SCHEMA_VERSION:
        raise PolicyError("INPUT_INVALID")
    if not isinstance(obj.get("project"), str) or obj.get("project") not in PROJECT_ORIGINS:
        raise PolicyError("PROJECT_UNKNOWN")
    if obj.get("provider", "local_playwright") != "local_playwright":
        raise PolicyError("BLOCKED_COST")
    if obj.get("max_external_spend_usd", 0) != 0 or type(obj.get("max_external_spend_usd", 0)) not in (int, float):
        raise PolicyError("BLOCKED_COST")
    mode = obj.get("mode")
    if not isinstance(mode, str) or mode not in {"PUBLIC_READONLY", "FIXTURE"}:
        raise PolicyError("INPUT_INVALID")
    vp = obj.get("viewport", {"width": 390, "height": 844})
    if not isinstance(vp, dict):
        raise PolicyError("INPUT_INVALID")
    _ensure_keys(vp, {"width", "height"})
    if not _check_positive_int(vp.get("width"), 320, 1920) or not _check_positive_int(vp.get("height"), 480, 1200):
        raise PolicyError("INPUT_INVALID")
    if mode == "PUBLIC_READONLY":
        safe_url(obj.get("start_url"), obj["project"], require_path=True)
    elif obj.get("start_url") not in (None, "fixture:demo"):
        raise PolicyError("ORIGIN_NOT_ALLOWED")
    actions = obj.get("actions")
    if not isinstance(actions, list) or not 1 <= len(actions) <= 25:
        raise PolicyError("INPUT_INVALID")
    validated: list[dict[str, Any]] = []
    for item in actions:
        if not isinstance(item, dict):
            raise PolicyError("INPUT_INVALID")
        _ensure_keys(item, {"op", "name", "role", "text", "url", "path_prefix", "value"})
        op = item.get("op")
        if not isinstance(op, str) or op not in ALLOWED_OPERATIONS:
            raise PolicyError("INPUT_INVALID")
        if op in FIXTURE_ONLY and mode != "FIXTURE":
            raise PolicyError("BLOCKED_APPROVAL")
        if op == "navigate":
            if mode != "PUBLIC_READONLY":
                raise PolicyError("BLOCKED_APPROVAL")
            safe_url(item.get("url"), obj["project"], require_path=True)
        elif op == "assert_role":
            if not isinstance(item.get("role"), str) or item.get("role") not in SAFE_ROLES:
                raise PolicyError("INPUT_INVALID")
            if item.get("role") in {"main", "navigation", "status"}:
                if item.get("name") is not None:
                    if not isinstance(item["name"], str) or not 1 <= len(item["name"]) <= 128:
                        raise PolicyError("INPUT_INVALID")
            elif not isinstance(item.get("name"), str) or not 1 <= len(item["name"]) <= 128:
                raise PolicyError("INPUT_INVALID")
        elif op in {"click_link", "click_button", "fill"}:
            if not isinstance(item.get("name"), str) or not 1 <= len(item["name"]) <= 128:
                raise PolicyError("INPUT_INVALID")
            if op == "fill" and (not isinstance(item.get("value"), str) or item["value"] not in SAFE_FIXTURE_VALUES):
                raise PolicyError("BLOCKED_PRIVACY")
        elif op == "assert_text":
            if not isinstance(item.get("text"), str) or not 1 <= len(item["text"]) <= 128:
                raise PolicyError("INPUT_INVALID")
        elif op == "assert_url":
            if not isinstance(item.get("path_prefix"), str) or not re.fullmatch(r"/[a-zA-Z0-9/_-]*", item["path_prefix"]):
                raise PolicyError("INPUT_INVALID")
        elif op == "screenshot":
            if not isinstance(item.get("name"), str) or not re.fullmatch(r"[a-zA-Z0-9_-]{1,50}", item["name"]):
                raise PolicyError("INPUT_INVALID")
        validated.append(item.copy())
    # Public mode clicks ONLY actual links, whose href is validated again immediately before clicking.
    return {"schema_version": SCHEMA_VERSION, "project": obj["project"], "mode": mode,
            "provider": "local_playwright", "max_external_spend_usd": 0,
            "start_url": obj.get("start_url", "fixture:demo"), "viewport": vp.copy(), "actions": validated}


def fingerprint(manifest: dict[str, Any]) -> str:
    return hashlib.sha256(json.dumps(manifest, ensure_ascii=False, sort_keys=True,
                                     separators=(",", ":")).encode()).hexdigest()


def safe_run_id(value: str) -> bool:
    return isinstance(value, str) and bool(RUN_ID_PATTERN.fullmatch(value))
