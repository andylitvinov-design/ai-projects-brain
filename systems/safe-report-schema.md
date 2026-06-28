# /safe Daily Report Schema

Status: canonical JSON contract for `/safe` daily sweep outputs.

Use this schema when `brain-management` or another dashboard needs to ingest `/safe` results.

## Goals

- Make daily reports machine-readable.
- Separate checked, fixed, skipped, and `needs verification` items.
- Avoid storing secrets or sensitive raw payloads.
- Preserve evidence: PRs, commits, checks, live URLs, frontend actions, and exact failing commands.

## JSON shape

```json
{
  "schema": "safe-daily-report-v1",
  "generated_at": "2026-06-27T08:45:00+02:00",
  "mode": "/safe",
  "source_of_truth": {
    "projects_md_ref": "main",
    "projects_json_ref": "main",
    "safe_mode_ref": "main"
  },
  "summary": {
    "projects_total": 0,
    "projects_checked": 0,
    "projects_skipped": 0,
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
    "frontend_critical": 0,
    "frontend_high": 0,
    "fixes_applied": 0,
    "prs_opened": 0,
    "needs_verification": 0
  },
  "projects": [
    {
      "slug": "example-project",
      "name": "Example Project",
      "repo": "https://github.com/owner/repo",
      "live_url": "https://example.com",
      "status": "checked",
      "selected_routes": ["frontend-runtime", "frontend-interaction", "visual-polish", "headers-cors"],
      "priority_reason": "public live URL with auth and forms",
      "files_checked": [
        "README.md",
        "SAFE.md",
        "vercel.json",
        "src/App.jsx"
      ],
      "frontend_checks": [
        {
          "route": "/profile",
          "viewport": "mobile 390x844",
          "action": "double-click save button",
          "expected": "one save request or disabled submit while saving",
          "observed": "two save requests can be sent",
          "status": "failed",
          "severity": "high"
        }
      ],
      "visual_polish_checks": [
        {
          "route": "/orders",
          "viewport": "desktop 1440x900",
          "area": "order cards",
          "observed": "cards overlap when title is long",
          "severity": "medium"
        }
      ],
      "findings": [
        {
          "severity": "high",
          "category": "frontend-duplicate-submit",
          "title": "Profile save can be submitted twice",
          "evidence": "route /profile, mobile viewport, double-click save produced duplicate requests",
          "risk": "User may create duplicate state or conflicting profile updates.",
          "recommended_fix": "Disable submit while saving and make server update idempotent where possible.",
          "status": "pr_opened"
        }
      ],
      "fixes": [
        {
          "type": "pr",
          "title": "Guard duplicate profile save submit",
          "url": "https://github.com/owner/repo/pull/123",
          "changed_files": ["src/pages/Profile.jsx"]
        }
      ],
      "checks_run": [
        {
          "command": "npm run build",
          "status": "passed",
          "notes": "local build passed"
        }
      ],
      "checks_not_run": [
        {
          "check": "authenticated live mobile browser smoke",
          "reason": "live auth requires manual credentials"
        }
      ],
      "live_status": {
        "checked": false,
        "url": "https://example.com",
        "result": "needs verification"
      },
      "state_log_safe_update": "not needed / updated / proposed / needs verification",
      "next_action": "Review PR #123 and verify live after deploy."
    }
  ],
  "global_risks": [
    "Some private auth flows require manual credentials and were not live-verified."
  ],
  "automation_notes": [
    "Do not store env values or raw private payloads in this report."
  ]
}
```

## Required report rules

- Store env variable names only, never values.
- Do not store raw tokens, cookies, auth headers, private provider payloads, or user private data.
- If evidence may contain sensitive data, summarize it instead of copying it.
- Every project entry must include `status`, `selected_routes`, `files_checked`, `findings`, `checks_run`, `checks_not_run`, and `next_action`.
- For user-facing UI, include `frontend_checks` or explicitly explain why frontend checks were not run.
- Every unverified claim must use `needs verification`.
- A fix is not `live verified` unless the deployed/live target was checked.

## Status values

- `checked`
- `partially_checked`
- `skipped`
- `blocked`
- `needs_verification`

## Frontend check status values

- `passed`
- `failed`
- `partially_checked`
- `not_run`
- `needs_verification`

## Severity values

- `critical`
- `high`
- `medium`
- `low`
- `info`

## Finding status values

- `open`
- `fixed`
- `pr_opened`
- `accepted_risk`
- `needs_verification`
- `false_positive`

## Dashboard minimum cards

A dashboard can show:

- projects checked today;
- critical/high findings;
- frontend critical/high findings;
- PRs opened;
- live checks passed/failed/not run;
- frontend routes/actions checked;
- repeated findings from previous days;
- stale project memory or missing `SAFE.md`;
- daily trend of open critical/high items.
