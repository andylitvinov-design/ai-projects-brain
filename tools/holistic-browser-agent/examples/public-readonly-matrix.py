"""Bounded, read-only PUBLIC website QA. Run ONLY against approved Holistic House.

No credentials, form submission, provider APIs or external proxy.
Screenshots are local/private and never automatically uploaded; only safe
numeric geometry and SHA-256 hashes appear in logs.
"""
from __future__ import annotations

import json
import sys

from hba.policy import PolicyError
from hba.runner import run_manifest

ORIGIN = "https://holistichouse.vercel.app"
WIDTHS = (320, 375, 390, 430, 1440)
LOCALES = {"en": "/", "ru": "/ru", "es": "/es"}
HEIGHT = 844


def main() -> int:
    results = []
    for locale, path in LOCALES.items():
        for width in WIDTHS:
            results.append((locale, path, width))
    # A public, unauthenticated test catalogue is an explicit policy exception.
    results.append(("en-tests", "/en/client/tests", 390))

    failures = 0
    restricted = 0
    complete = 0
    dom_passes = 0
    screenshot_count = 0
    for locale, path, width in results:
        manifest = {
            "schema_version": "hba.manifest.v1",
            "project": "holistic-house",
            "mode": "PUBLIC_READONLY",
            "provider": "local_playwright",
            "max_external_spend_usd": 0,
            "start_url": ORIGIN + path,
            "viewport": {"width": width, "height": HEIGHT if width < 1000 else 900},
            "actions": [
                {"op": "measure_layout"},
                {"op": "screenshot", "name": f"public-{locale}-{width}"},
                {"op": "assert_role", "role": "main"},
                {"op": "assert_no_overflow"},
            ],
        }
        try:
            run = run_manifest(manifest)
            state = run["state"]
            reason = run.get("failure_code")
            network_denied = int(run.get("network_denied", 0))
            console_errors = int(run.get("console_errors", 0))
            passed = int(run.get("assertions_passed", 0))
            layout, artifacts = run.get("layout"), run.get("artifacts", [])
        except PolicyError as exc:
            state, reason, network_denied, console_errors, passed = "BLOCKED", exc.code, 0, 0, 0
            layout, artifacts = None, []
        restricted += network_denied > 0
        screenshot_count += len(artifacts)
        if state != "VERIFIED_READONLY":
            verdict = "FAIL_PUBLIC_FLOW"
            failures += 1
        elif network_denied or console_errors:
            # The allowed-site fetch may have blocked assets or JS failures:
            # never call such a page fully verified.
            verdict = "PASS_PUBLIC_DOM_POLICY_LIMITED"
            dom_passes += 1
            failures += 1
        else:
            verdict = "PASS_PUBLIC_LAYOUT"
            dom_passes += 1
            complete += 1
        print(json.dumps({
            "locale": locale, "width": width,
            "route": path, "state": state, "verdict": verdict, "failure_code": reason,
            "passed_actions": passed, "network_denied": network_denied,
            "console_errors": console_errors, "restricted_assets": network_denied > 0,
            "layout": layout, "screenshot_sha256": [a["sha256"] for a in artifacts],
            "not_tested": ["auth", "crm", "payments", "real_leads", "image_completeness", "visual_baseline"],
        }, sort_keys=True), flush=True)
    print(json.dumps({
        "public_browser_runs": len(results),
        "public_dom_passes": dom_passes,
        "private_screenshots_captured": screenshot_count,
        "full_public_layout_passes": complete,
        "incomplete_or_failed_runs": failures, "restricted_network_runs": restricted,
        "scope": "public GET/HEAD only; no client data, no paid providers",
        "caution": "Browser interception is not an OS network sandbox. Blocked assets make image QA incomplete.",
    }, sort_keys=True), flush=True)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
