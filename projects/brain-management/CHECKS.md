# CHECKS — brain-management

> Verification guide for Brain Management dashboards and reports.

## Agent Entry

Use this project for: brain-management, dashboards, thinking, Codex efficiency, daily changes, management reports, mobile-run flows.

## Local checks

Canonical repo: `andylitvinov-design/brain-management`.

Recommended checks when available:

- `npm test`
- `npm run build`
- dashboard refresh script if changed
- targeted checks for changed functions/routes

Report absent commands as `needs verification`.

## Data checks

Verify current JSON paths when dashboard data is in scope:

- `dashboard-thinking/data/current-thinking-audit.json`
- `dashboard-thinking/data/current-daily-upgrade.json`
- `dashboard-thinking/data/current-daily-changes.json`

Do not verify from the wrong root path.

## Live checks

Live URL:

- https://brain-management.pages.dev

When relevant, verify:

- dashboard page loads;
- JSON data endpoint/path returns expected current file;
- report publish/API flow;
- mobile-run route if touched.

## Do not

- Do not mix sibling repos into this project boundary.
- Do not report stale dashboard JSON as current.
- Do not skip the fixed report publish/verify sequence.
- Do not store OAuth/client secret values.

## Report format

Return:

- changed files;
- local checks;
- data path checks;
- live checks;
- stale data risks;
- needs verification.
