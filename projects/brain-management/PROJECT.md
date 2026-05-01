# brain-management

## 1. Purpose

Management dashboard and ops workspace for Codex usage, daily
thinking/audit data, mobile-run flows, and management reports.

## 2. Live URLs

- production: https://brain-management.pages.dev
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and any secondary live URLs
  need verification.

## 3. Repositories

- canonical repo:
  https://github.com/andylitvinov-design/brain-management
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond the listed inventory
  need verification.

## 4. Hosting / Deploy

- provider: Cloudflare Pages
- project name: Cloudflare Pages
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status

Private repo with Cloudflare Pages live dashboard. Dashboard snapshots
live under dashboard-thinking/data/.

## 6. Important Files

- README.md
- .env.example
- dashboard-thinking/data/current-thinking-audit.json
- dashboard-thinking/data/current-daily-upgrade.json
- dashboard-thinking/data/current-daily-changes.json
- scripts/refresh-management-dashboards.js
- functions/api/mobile-run.js

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- GOOGLE_OAUTH_CLIENT_ID
- GOOGLE_OAUTH_CLIENT_SECRET
- GOOGLE_AUTH_SESSION_SECRET
- GOOGLE_AUTH_ALLOWED_EMAILS
- GOOGLE_AUTH_ALLOWED_DOMAIN

## 8. Known Issues

- Morning report publish/API verification can fail on
  codex-links.pages.dev DNS/network reachability.
- Agents sometimes verify dashboard JSON from the wrong root path.

## 9. Recent Tasks

- Morning report flow uses refresh, verify current JSONs, publish,
  verify public API, and open inbox item on explicit request/failure.

## 10. Next Actions

- Re-check live report publishing path when DNS/network is available.
- Keep current JSON verification pointed at dashboard-thinking/data/.

## 11. Risks

- Reporting stale data.
- Mixing sibling repos into the management boundary.
- Skipping the fixed morning report sequence.

## 12. Rules for Codex

- Read AGENTS.md, README.md, and STATE.md first when present.
- Preserve the management report flow order.
- Include exact failing command/check when a step fails.

## 13. Verification Status

- repo mapping: listed in inventory; current source still needs
  verification before production work
- live mapping: listed in inventory; live behavior needs verification
  before claims
- env status: names only; values and completeness need verification
- deploy status: hosting listed; deploy source needs verification
- data flow: needs verification
- needs verification: unconfirmed repo, live, deploy, env, and data-flow
  details.
