"""Bounded, read-only PUBLIC website QA. Run ONLY against approved Holistic House.

No credentials, form submission, provider APIs, external proxy, screenshots,
asset downloads or private data. Stdout only safe status counters.
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
        except PolicyError as exc:
            state, reason, network_denied, console_errors, passed = "BLOCKED", exc.code, 0, 0, 0
        failures += state != "VERIFIED_READONLY"
        restricted += network_denied > 0
        print(json.dumps({
            "locale": locale, "width": width,
            "route": path, "state": state, "failure_code": reason,
            "passed_actions": passed, "network_denied": network_denied,
            "console_errors": console_errors, "restricted_assets": network_denied > 0,
            "not_tested": ["auth", "crm", "payments", "real_leads", "image_completeness", "visual_baseline"],
        }, sort_keys=True), flush=True)
    print(json.dumps({
        "public_browser_runs": len(results),
        "functional_failures": failures, "restricted_network_runs": restricted,
        "scope": "public GET/HEAD only; no client data, no paid providers",
        "caution": "Browser interception is not an OS network sandbox. Blocked assets make image QA incomplete.",
    }, sort_keys=True), flush=True)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
