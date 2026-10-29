"""Deterministic browser runner. Does not call paid providers or model APIs."""
from __future__ import annotations

import hashlib
import json
import os
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlsplit

from .policy import PolicyError, fingerprint, request_allowed, safe_run_id, safe_url, validate_manifest

ROOT = Path(__file__).resolve().parent.parent
SAMPLE_HTML = ROOT / "fixtures" / "demo.html"
MAX_ARTIFACT_BYTES = 100 * 1024 * 1024
MAX_RUN_SECONDS = 900


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def default_runs_dir() -> Path:
    return Path(os.environ.get("HBA_RUNS_DIR", str(Path.home() / ".local" / "share" / "hba" / "runs"))).expanduser()


def _write_atomic(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp")
    with tmp.open("w", encoding="utf-8") as out:
        json.dump(data, out, ensure_ascii=False, sort_keys=True, indent=2)
    os.chmod(tmp, 0o600)
    os.replace(tmp, path)


def read_status(run_id: str, runs_dir: Path | None = None) -> dict[str, Any]:
    if not safe_run_id(run_id):
        raise PolicyError("INPUT_INVALID")
    path = (runs_dir or default_runs_dir()) / run_id / "status.json"
    try:
        record = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise PolicyError("RUN_NOT_FOUND") from exc
    if record.get("state") in {"QUEUED", "RUNNING", "VERIFYING"}:
        timestamp = record.get("started_at") or record.get("queued_at")
        if isinstance(timestamp, str):
            try:
                age = (datetime.now(timezone.utc) -
                       datetime.fromisoformat(timestamp)).total_seconds()
            except ValueError:
                age = 0
            if age > MAX_RUN_SECONDS + 120:
                # An old active marker is not proof a worker still exists.
                return {**record, "state": "UNCONFIRMED_INTERRUPTED",
                        "failure_code": "STALE_WORKER_STATUS"}
    return record


def cancel_run(run_id: str, runs_dir: Path | None = None) -> dict[str, Any]:
    result = read_status(run_id, runs_dir)
    if result["state"] in {"QUEUED", "RUNNING", "VERIFYING"}:
        directory = (runs_dir or default_runs_dir()) / run_id
        file = directory / "cancel.flag"
        file.write_text("cancel requested\n", encoding="utf-8")
        os.chmod(file, 0o600)
        return {"run_id": run_id, "cancel_requested": True, "state": result["state"]}
    return {"run_id": run_id, "cancel_requested": False, "state": result["state"]}


def make_plan(obj: Any) -> dict[str, Any]:
    manifest = validate_manifest(obj)
    return {"schema_version": "hba.plan.v1", "manifest_sha256": fingerprint(manifest),
            "project": manifest["project"], "mode": manifest["mode"],
            "action_count": len(manifest["actions"]), "risk": "R0" if manifest["mode"] == "PUBLIC_READONLY" else "R1_SYNTHETIC",
            "allowed_external_spend_usd": 0, "selected_provider": "local_playwright",
            "state": "PLANNED", "requires_owner_approval": False}


def _unique_visible(locator: Any) -> Any:
    count = locator.count()
    if count == 0:
        # DOMContentLoaded can precede hydration. Wait for one element, but
        # never choose between equal-name controls after the DOM settles.
        from playwright.sync_api import TimeoutError as PWTimeout
        try:
            locator.first.wait_for(state="visible", timeout=4000)
        except PWTimeout as exc:
            raise PolicyError("ELEMENT_NOT_ACTIONABLE" if locator.count()
                              else "LOCATOR_NOT_FOUND") from exc
        count = locator.count()
    if count != 1:
        raise PolicyError("LOCATOR_AMBIGUOUS")
    if not locator.is_visible() or not locator.is_enabled():
        raise PolicyError("ELEMENT_NOT_ACTIONABLE")
    return locator


def _assert_role(page: Any, spec: dict[str, Any]) -> None:
    role = spec["role"]
    name = spec.get("name")
    opts = {"name": name, "exact": True} if name is not None else {}
    _unique_visible(page.get_by_role(role, **opts))


def _execute(page: Any, spec: dict[str, Any], manifest: dict[str, Any], directory: Path, screenshots: list[dict[str, str]], counters: dict[str, Any]) -> None:
    op = spec["op"]
    project = manifest["project"]
    fixture = manifest["mode"] == "FIXTURE"
    if op == "navigate":
        safe_url(spec["url"], project, require_path=True)
        response = page.goto(spec["url"], wait_until="domcontentloaded", timeout=12000)
        if response is None or not 200 <= response.status < 300:
            raise PolicyError("HTTP_UNEXPECTED")
        safe_url(page.url, project)
    elif op == "assert_role":
        _assert_role(page, spec)
    elif op == "assert_text":
        _unique_visible(page.get_by_text(spec["text"], exact=True))
    elif op == "click_link":
        locator = _unique_visible(page.get_by_role("link", name=spec["name"], exact=True))
        href = locator.get_attribute("href")
        if not href or href.lower().startswith(("javascript:", "data:", "file:")):
            raise PolicyError("ORIGIN_NOT_ALLOWED")
        if (locator.get_attribute("target") or "").lower() == "_blank":
            raise PolicyError("BLOCKED_APPROVAL")
        if fixture:
            if not href.startswith("#") or not 1 < len(href) < 100:
                raise PolicyError("BLOCKED_APPROVAL")
        else:
            full = urljoin(page.url, href)
            safe_url(full, project, require_path=True)
        locator.click(timeout=10000)
        if not fixture:
            safe_url(page.url, project)
    elif op == "click_button":
        if not fixture:
            raise PolicyError("BLOCKED_APPROVAL")
        _unique_visible(page.get_by_role("button", name=spec["name"], exact=True)).click(timeout=10000)
    elif op == "fill":
        if not fixture:
            raise PolicyError("BLOCKED_APPROVAL")
        _unique_visible(page.get_by_role("textbox", name=spec["name"], exact=True)).fill(spec["value"], timeout=10000)
    elif op == "assert_url":
        if not urlsplit(page.url).path.startswith(spec["path_prefix"]):
            raise PolicyError("ASSERTION_FAILED")
    elif op == "assert_no_overflow":
        # Fixed, reviewed diagnostic expression; never evaluate code from manifest/DOM.
        bad = page.evaluate("""() => document.documentElement.scrollWidth > window.innerWidth + 2""")
        if bad:
            raise PolicyError("ASSERTION_FAILED")
    elif op == "assert_no_console_errors":
        if counters["console_errors"]:
            raise PolicyError("ASSERTION_FAILED")
    elif op == "measure_layout":
        # Reviewed fixed expression: numeric geometry and counts only. No DOM
        # content, URLs, arbitrary script, cookies or client data are recorded.
        counters["layout"] = page.evaluate("""() => {
          const root = document.documentElement;
          const main = document.querySelector('main');
          const rect = main ? main.getBoundingClientRect() : null;
          const imgs = Array.from(document.querySelectorAll('img'));
          const loaded = imgs.filter(img => img.complete && img.naturalWidth > 0).length;
          const blocked = imgs.filter(img => img.complete && img.naturalWidth === 0).length;
          return {
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            document_width: root.scrollWidth,
            overflow_px: Math.max(0, root.scrollWidth - window.innerWidth),
            main_present: Boolean(main),
            main_x: rect ? Math.round(rect.x) : null,
            main_width: rect ? Math.round(rect.width) : null,
            image_total: imgs.length,
            image_loaded: loaded,
            image_broken_or_blocked: blocked,
            image_pending: imgs.length - loaded - blocked,
            links_total: document.querySelectorAll('a[href]').length,
            buttons_total: document.querySelectorAll('button').length
          };
        }""")
    elif op == "screenshot":
        filename = f"{spec['name']}.png"
        path = directory / filename
        if path.exists():
            raise PolicyError("INPUT_INVALID")
        page.screenshot(path=str(path), full_page=True, animations="disabled", timeout=10000)
        os.chmod(path, 0o600)
        size = path.stat().st_size
        if size > MAX_ARTIFACT_BYTES or sum(int(x["bytes"]) for x in screenshots) + size > MAX_ARTIFACT_BYTES:
            path.unlink(missing_ok=True)
            raise PolicyError("STORAGE_LIMIT")
        screenshots.append({"file": filename, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "bytes": str(size)})
    else:
        raise PolicyError("INPUT_INVALID")


def reserve_run(obj: Any, *, runs_dir: Path | None = None) -> tuple[str, dict[str, Any]]:
    """Create a cancellable QUEUED record before MCP starts its single worker."""
    manifest = validate_manifest(obj)
    directory = (runs_dir or default_runs_dir()) / uuid.uuid4().hex
    directory.mkdir(mode=0o700, parents=True)
    os.chmod(directory, 0o700)
    record = {
        "schema_version": "hba.run.v1", "run_id": directory.name,
        "state": "QUEUED", "queued_at": now(), "manifest_sha256": fingerprint(manifest),
        "project": manifest["project"], "mode": manifest["mode"],
        "cost": {"paid_provider_calls": 0, "new_external_spend_usd": 0},
    }
    _write_atomic(directory / "status.json", record)
    return directory.name, manifest


def run_manifest(obj: Any, *, runs_dir: Path | None = None,
                 chromium_executable: str | None = None, run_id: str | None = None) -> dict[str, Any]:
    """Runs ONLY validated built-in actions in isolated ephemeral Chromium.

    Public web requests are restricted to exact allowlisted HTTPS origin and
    GET/HEAD methods. Chromium routing is not a host firewall; authenticated
    sites, payment flows, arbitrary domains, and untrusted fixture files are out.
    """
    manifest = validate_manifest(obj)  # policy/cost gate before browser launch
    if run_id is None:
        directory = (runs_dir or default_runs_dir()) / uuid.uuid4().hex
        directory.mkdir(mode=0o700, parents=True)
    else:
        if not safe_run_id(run_id):
            raise PolicyError("INPUT_INVALID")
        directory = (runs_dir or default_runs_dir()) / run_id
        if directory.is_symlink() or not directory.is_dir():
            raise PolicyError("RUN_NOT_FOUND")
        prior = read_status(run_id, runs_dir)
        if prior.get("state") != "QUEUED" or prior.get("manifest_sha256") != fingerprint(manifest):
            raise PolicyError("INPUT_INVALID")
        # Exactly one executor may claim a reserved run, including after a crash.
        try:
            claim = os.open(directory / "execution.lock",
                            os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        except FileExistsError as exc:
            raise PolicyError("RUN_ALREADY_STARTED") from exc
        else:
            os.close(claim)
    os.chmod(directory, 0o700)
    run_id = directory.name
    result: dict[str, Any] = {
        "schema_version": "hba.run.v1", "run_id": run_id,
        "project": manifest["project"], "mode": manifest["mode"],
        "manifest_sha256": fingerprint(manifest), "state": "RUNNING", "phase": "startup", "started_at": now(),
        "completed_at": None, "steps": [], "artifacts": [], "failure_code": None,
        "assertions_passed": 0, "network_denied": 0, "console_errors": 0,
        "cost": {"paid_provider_calls": 0, "new_external_spend_usd": 0},
        "not_tested": ["real_login", "real_customer_records", "real_payment", "production_write"],
    }
    status_path = directory / "status.json"
    _write_atomic(status_path, result)
    # QUEUED jobs may be cancelled before the worker enters Playwright.
    if (directory / "cancel.flag").exists():
        result.update(state="CANCELLED", failure_code="CANCELLED", completed_at=now())
        _write_atomic(status_path, result)
        return result
    counters = {"network_denied": 0, "console_errors": 0}
    screenshots: list[dict[str, str]] = []
    started = time.monotonic()
    try:
        from playwright.sync_api import Error as PWError, sync_playwright
    except ImportError:
        result["state"] = "BLOCKED_DEVICE"
        result["failure_code"] = "PLAYWRIGHT_NOT_INSTALLED"
        PWError = Exception  # only for handler below
    else:
        try:
            if (directory / "cancel.flag").exists():
                raise PolicyError("CANCELLED")
            result["phase"] = "starting_playwright_driver"
            _write_atomic(status_path, result)
            with sync_playwright() as pw:
                result["phase"] = "launching_chromium"
                _write_atomic(status_path, result)
                kwargs: dict[str, Any] = {"headless": True}
                if chromium_executable:
                    if not Path(chromium_executable).is_file():
                        raise PolicyError("BROWSER_EXECUTABLE_MISSING")
                    kwargs["executable_path"] = chromium_executable
                browser = pw.chromium.launch(**kwargs)
                result["phase"] = "creating_browser_context"
                _write_atomic(status_path, result)
                try:
                    context = browser.new_context(viewport=manifest["viewport"],
                                                  service_workers="block", accept_downloads=False)
                    # Refuse ALL WebSocket connections, even to the allowed website.
                    context.route_web_socket("**/*", lambda ws: ws.close())

                    def route_handler(route: Any) -> None:
                        request = route.request
                        if not request_allowed(request.url, request.method, manifest["project"],
                                               fixture=manifest["mode"] == "FIXTURE"):
                            counters["network_denied"] += 1
                            route.abort("blockedbyclient")
                            return
                        try:
                            # Do not allow redirects: a follow-up request may escape
                            # ordinary route interception in some Playwright versions.
                            response = route.fetch(max_redirects=0, timeout=12000)
                            if 300 <= response.status < 400:
                                counters["network_denied"] += 1
                                route.abort("blockedbyclient")
                            else:
                                route.fulfill(response=response)
                        except Exception:
                            counters["network_denied"] += 1
                            route.abort("failed")

                    context.route("**/*", route_handler)
                    page = context.new_page()
                    page.on("console", lambda message: counters.__setitem__(
                        "console_errors", counters["console_errors"] + (1 if message.type == "error" else 0)))
                    page.on("pageerror", lambda _error: counters.__setitem__(
                        "console_errors", counters["console_errors"] + 1))
                    context.on("page", lambda new_page: new_page.close() if new_page != page else None)
                    result["phase"] = "loading_initial_document"
                    _write_atomic(status_path, result)
                    if manifest["mode"] == "FIXTURE":
                        # Fixed, reviewed fixture; no arbitrary user-provided HTML path.
                        page.set_content(SAMPLE_HTML.read_text(encoding="utf-8"), wait_until="load")
                    else:
                        response = page.goto(manifest["start_url"], wait_until="domcontentloaded", timeout=12000)
                        if response is None or response.status >= 400 or response.status < 200:
                            raise PolicyError("HTTP_UNEXPECTED")
                        safe_url(page.url, manifest["project"])
                    result["phase"] = "executing_actions"
                    _write_atomic(status_path, result)
                    for i, spec in enumerate(manifest["actions"]):
                        if (directory / "cancel.flag").exists():
                            raise PolicyError("CANCELLED")
                        if time.monotonic() - started > MAX_RUN_SECONDS:
                            raise PolicyError("TIMEOUT")
                        item = {"step": i + 1, "op": spec["op"], "state": "RUNNING", "completed_at": None}
                        result["steps"].append(item)
                        _write_atomic(status_path, result)
                        try:
                            _execute(page, spec, manifest, directory, screenshots, counters)
                            item["state"] = "PASSED"
                            result["assertions_passed"] += 1
                        except PolicyError as err:
                            item["state"] = "FAILED"
                            item["error_code"] = err.code
                            raise
                        finally:
                            item["completed_at"] = now()
                            _write_atomic(status_path, result)
                    # A cancellation requested while the final action was running
                    # must not be lost between the last action and the terminal status.
                    if (directory / "cancel.flag").exists():
                        raise PolicyError("CANCELLED")
                    result["phase"] = "closing_chromium"
                    result["state"] = "SYNTHETIC_TEST_PASS" if manifest["mode"] == "FIXTURE" else "VERIFIED_READONLY"
                    context.close()
                finally:
                    browser.close()
        except PolicyError as err:
            result["failure_code"] = err.code
            result["state"] = "CANCELLED" if err.code == "CANCELLED" else "FAILED"
        except PWError:
            # Never write exception text/URL/cookies to result (could contain secrets).
            result["failure_code"] = "BROWSER_OR_NETWORK_FAILURE"
            result["state"] = "FAILED"
        except OSError:
            result["failure_code"] = "BROWSER_OR_FILESYSTEM_FAILURE"
            result["state"] = "FAILED"
        except Exception:
            result["failure_code"] = "INTERNAL_ERROR"
            result["state"] = "FAILED"
    result["network_denied"] = counters["network_denied"]
    result["console_errors"] = counters["console_errors"]
    if "layout" in counters:
        result["layout"] = counters["layout"]
    result["artifacts"] = screenshots
    result["completed_at"] = now()
    _write_atomic(status_path, result)
    return result
