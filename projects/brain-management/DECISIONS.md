# DECISIONS — brain-management

> Architecture decisions and guardrails for Brain Management.

## Canonical project

- Canonical repo: `andylitvinov-design/brain-management`.
- Live target: https://brain-management.pages.dev.

## Data source

- Dashboard snapshots live under `dashboard-thinking/data/`.
- Do not verify dashboard JSON from an incorrect root path.

## Report flow

- Preserve report flow order: refresh → verify current JSONs → publish → verify public API/page.
- If DNS/network blocks live verification, report exact failing check.

## Boundaries

- This project is management/ops dashboard work, not the project memory base itself.
- Do not mix with `ai-projects-brain` or `codex-links` unless the task explicitly involves cross-project reporting.

## Secrets

- Env names may be listed; values must never be stored.
- Google OAuth credentials and session secrets are sensitive.
- Expected Google OAuth/private auth boundary is not `BLOCKED`; use `STATUS: SUCCESS_WITH_AUTH_LIMITATION` with safe public/login/protected-redirect/local/code proof.

## Main formula

**Current dashboard data must come from the correct `dashboard-thinking/data/` path and report flows must be verified in sequence.**
