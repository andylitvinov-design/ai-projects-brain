"""Real read-only public CTA navigation; no form, login, payment or lead."""
from __future__ import annotations
import json
from hba.runner import run_manifest

ORIGIN = "https://holistichouse.vercel.app"
CASES = (
    ("free-tests", "Take a free self-test", "/en/client/tests"),
    ("opora", "Open free OPORA course", "/en/courses/antistress"),
    ("free-review", "Request free written review", "/en/services/free-situation-review"),
)


def main() -> int:
    failed = 0
    passed = 0
    for case, name, destination in CASES:
        manifest = {
            "schema_version": "hba.manifest.v1",
            "project": "holistic-house", "mode": "PUBLIC_READONLY",
            "provider": "local_playwright", "max_external_spend_usd": 0,
            "start_url": ORIGIN + "/",
            "viewport": {"width": 390, "height": 844},
            "actions": [
                {"op": "assert_role", "role": "main"},
                {"op": "click_link", "name": name},
                {"op": "assert_url", "path_prefix": destination},
                {"op": "measure_layout"},
            ],
        }
        result = run_manifest(manifest)
        success = result["state"] == "VERIFIED_READONLY" and result["assertions_passed"] == 4
        if success:
            passed += 1
        else:
            failed += 1
        limited = bool(result["network_denied"] or result["console_errors"])
        print(json.dumps({
            "case": case, "expected_path": destination,
            "destination_verified": success,
            "outcome": ("PASS_NAVIGATION_POLICY_LIMITED" if limited else "PASS_NAVIGATION")
                       if success else "FAIL_NAVIGATION",
            "failure_code": result["failure_code"],
            "network_denied": result["network_denied"],
            "console_errors": result["console_errors"],
            "not_tested": ["lead_creation", "form_submission", "booking", "payment", "crm"],
        }, sort_keys=True), flush=True)
    print(json.dumps({"public_cta_cases": len(CASES), "navigation_passes": passed,
                      "navigation_failures": failed, "paid_provider_calls": 0},
                     sort_keys=True), flush=True)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
