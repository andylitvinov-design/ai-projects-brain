# brain-management

## 1. Purpose

Management dashboard and ops workspace for Codex usage, daily thinking/audit data, mobile-run flows, and management reports.

## 2. Live URLs

- production: https://brain-management.netlify.app
- legacy: https://brain-management.pages.dev
- preview: needs verification
- admin: needs verification
- needs verification: exact current Netlify deploy SHA, preview/admin mappings, and whether the legacy Cloudflare deployment should remain reachable.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/brain-management
- deprecated repo: none confirmed
- related repos: `ai-projects-brain` is project memory only; do not treat it as the runtime dashboard source.

## 4. Hosting / Deploy

- provider: Netlify
- production project/domain: `brain-management.netlify.app`
- deploy config: `netlify.toml`
- publish directory: repository root (`.`)
- production branch/source: `main` expected; exact Netlify linkage and deployed SHA need verification
- legacy provider: Cloudflare Pages at `brain-management.pages.dev`
- deploy rules: do not verify or patch production through the legacy URL; use the Netlify source and preserve a rollback note.

## 5. Current Status

Private canonical repo with a Netlify-hosted live dashboard. The repo README identifies the previous Cloudflare Pages URL as legacy. Dashboard snapshots live under the documented `dashboard-*/data/` paths.

## 6. Important Files

- `README.md`
- `SAFE.md`
- `netlify.toml`
- `package.json`
- `.env.example`
- `dashboard-thinking/data/current-thinking-audit.json`
- `dashboard-thinking/data/current-daily-upgrade.json`
- `dashboard-thinking/data/current-daily-changes.json`
- `system-health-dashboard/data/current-system-health-dashboard.json`
- `scripts/refresh-management-dashboards.js`
- `functions/api/mobile-run.js`
- `functions/_lib/mobile-run.js`

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- `MOBILE_LAUNCH_KEY`
- `STATUS_CALLBACK_SECRET`
- `MOBILE_RUNS`
- `GH_REPO_OWNER`
- `GH_REPO_NAME`
- `GH_WORKFLOW_FILE`
- `GH_WORKFLOW_REF`
- `GH_WORKFLOW_PAT`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_AUTH_SESSION_SECRET`
- `GOOGLE_AUTH_ALLOWED_EMAILS`
- `GOOGLE_AUTH_ALLOWED_DOMAIN`

## 8. Known Issues

- `projects.md` and `projects.json` still contain the legacy Cloudflare production mapping and need a coordinated registry regeneration/update.
- Live Netlify deploy SHA and branch linkage need verification before production claims.
- Morning report publish/API verification can fail on `codex-links.pages.dev` DNS/network reachability.
- Agents sometimes verify dashboard JSON from the wrong root path.
- Public exposure and freshness of operational dashboard JSON need live verification.

## 9. Recent Tasks

- 2026-07-19 `/safe` sweep proved repo/project-memory drift: repo-local README and `netlify.toml` identify Netlify, while shared inventory still named Cloudflare Pages.
- Repo-level `SAFE.md` refresh opened in `brain-management` to document Netlify production, legacy Cloudflare, mobile workflow authorization, headers, and rollback boundaries.
- Morning report flow uses refresh, verify current JSONs, publish, verify public API, and open inbox item on explicit request/failure.

## 10. Next Actions

- Regenerate or update the `projects.md` and `projects.json` brain-management record together so the mirrors match this project file.
- Verify the exact Netlify production deploy source, branch, SHA, and live response headers.
- Re-check live report publishing path when DNS/network is available.
- Keep current JSON verification pointed at the documented dashboard data directories.

## 11. Risks

- Routing agents or verification to a legacy deployment.
- Reporting stale or private operational data publicly.
- Mixing sibling repos into the management boundary.
- Skipping the fixed report-generation and publication sequence.
- Triggering GitHub workflow dispatch without proving authorization, freshness, and duplicate-submit behavior.

## 12. Rules for Codex

- Read repo `SAFE.md`, `AGENTS.md`, `README.md`, and `STATE.md` first when present.
- Treat Netlify as production and Cloudflare Pages as legacy unless fresh deployment evidence proves otherwise.
- Preserve the management report flow order.
- Verify the exact dashboard data root before reading or writing snapshots.
- Include the exact failing command/check when a step fails.
- Never expose or request secret values; use environment-variable names only.
- Do not merge, deploy, or trigger a secret-backed workflow during `/safe` without explicit authorization and evidence.

## 13. Verification Status

- repo mapping: confirmed by repo-local README and GitHub repository
- production mapping: Netlify confirmed by repo-local README and deploy config; live response still needs verification
- legacy mapping: Cloudflare Pages explicitly marked legacy in the repo README
- env status: names only; values and completeness need verification
- deploy status: Netlify config present; exact project linkage/deployed SHA needs verification
- data flow: code and paths identified; live/public freshness behavior needs verification
- shared inventory mirrors: needs verification/update (`projects.md`, `projects.json`)
