# Safe Mode

Callable trigger: `/safe`

Canonical concept / idea backlog: `systems/safe-concept.md`
Routing matrix: `systems/safe-routing.md`
Frontend UX checks: `systems/safe-frontend-ux-checks.md`
Project template: `systems/safe-project-template.md`
Daily report schema: `systems/safe-report-schema.md`

Use this mode when Andrey asks to improve safety, prevent user-visible frontend errors, prepare a release, audit an app, or run recurring checks across projects.

## Goal

Keep every active project safe enough for real users without turning audits into large rewrites.

Safe Mode checks three things together:

1. **Security / abuse / cost safety** — secrets, RLS, auth, headers, CORS, rate limits, bot protection, API cost exposure, privacy, logs, and data minimization.
2. **User-facing reliability** — no blank screens, uncaught frontend exceptions, raw server/database errors, broken primary routes, broken forms, confusing auth states, or unsafe public error messages.
3. **Frontend UX safety and polish** — normal user actions do not break the site, duplicate submissions are guarded, states are clear, mobile/desktop layouts are usable, and the interface does not look unfinished or messy.

## Context first

Before auditing or patching a project:

1. Read `projects.md` and identify the target projects.
2. Read `projects.json` when repo/live mapping matters.
3. Read `systems/agent-rules.md` and `systems/codex-project-workflow.md`.
4. Read `systems/safe-routing.md` before choosing files/checks.
5. Read `systems/safe-frontend-ux-checks.md` when any user-facing route, form, dashboard, order flow, upload flow, or mobile UI is in scope.
6. Read `systems/safe-concept.md` when adding new `/safe` ideas or changing the long-term checklist.
7. Read `systems/safe-project-template.md` when a repo lacks a compact safety map.
8. Read `systems/safe-report-schema.md` when preparing dashboard-ingestible daily reports.
9. Read the target `projects/<slug>/PROJECT.md`.
10. In the target repo, read the smallest useful set:
   - `SAFE.md` if present;
   - `AGENTS.md` if present;
   - `CODEX_BRIEF.md` or `README.md`;
   - `STATE.md` / `LOG.md` if present;
   - deploy config (`vercel.json`, `wrangler.toml`, `wrangler.jsonc`, Netlify config, package scripts);
   - auth/API/database/frontend route files directly relevant to the selected route.

Do not scan the whole repo first. Use routing and search to find exact security, auth, form, API, UI, skill, and error-boundary files.

## Route first

Before checks, choose and report selected route(s) from `systems/safe-routing.md`:

- project type;
- risk surface;
- user intent;
- hosting/toolchain;
- live vs local vs unknown status.

If no route matches, use the closest read-only baseline route and mark `route needs verification`.

## Audit scope

For each active project, check only what applies.

### 1. Project boundary

- canonical repo and live URL match project memory;
- production source is not deprecated or legacy;
- hosting provider and deploy config are known;
- deploy branch/source and last verified commit are known or marked `needs verification`;
- uncertain source/live/deploy details are marked `needs verification`.

### 2. Secrets and environment exposure

- no real secret values are committed;
- env files are ignored except safe examples;
- frontend env variables are intentionally public only (`VITE_*`, `NEXT_PUBLIC_*`, etc.);
- server-only API keys are used only in server routes/functions;
- logs do not print tokens, auth headers, full provider responses, or private user data;
- secret scanning is run or explicitly listed as not run.

### 3. Database and Supabase safety

- RLS is enabled on user-data tables;
- policies restrict rows to the authenticated owner/admin role where needed;
- service-role keys never appear in the browser;
- API endpoints return only needed fields, not full user/provider rows;
- storage buckets have public/private rules documented;
- migrations and docs name required policies without storing secrets.

### 4. Auth edge cases

Test or inspect flows for:

- wrong password repeated attempts;
- nonexistent email password reset;
- duplicate registration email;
- expired or reused confirmation/reset link;
- logged-out access to private routes;
- user without required role accessing admin/master pages;
- direct API calls to private/admin endpoints;
- neutral user-facing errors and detailed server-only logs.

### 5. Public forms and bot/cost protection

- public forms have server validation;
- paid API endpoints have rate limiting, token checks, quota guards, or abuse guard;
- public forms that can be spammed have Turnstile/CAPTCHA or equivalent plan;
- CORS is restricted to intended origins when API is not public;
- upload routes validate size, MIME type, ownership, and storage path;
- retries, background jobs, and webhooks cannot multiply provider/API cost unexpectedly.

### 6. Security headers and browser baseline

Check for appropriate headers where deploy platform supports them:

- `Content-Security-Policy` or a staged CSP plan;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `X-Frame-Options` or CSP `frame-ancestors`;
- CORS origin policy;
- HSTS only when HTTPS/live domain behavior is verified.

### 7. OWASP-style code checks

Look for practical issues, not theoretical noise:

- SQL injection or unsafe query construction;
- XSS via `dangerouslySetInnerHTML`, raw markdown/HTML rendering, template injection, unsafe redirects;
- broken access control in admin/user APIs;
- missing server-side validation where client validation exists;
- excessive data returned from APIs;
- unsafe file upload, path traversal, or SSRF-like fetch proxy behavior;
- dependency scripts that expose secrets or publish artifacts accidentally.

### 8. Frontend runtime, UX, and visual safety

Read and apply `systems/safe-frontend-ux-checks.md` when the project has user-facing UI.

For user-facing routes:

- page does not white-screen on missing/null data;
- loading, empty, success, validation error, server error, unauthorized, forbidden, not-found, and retry states exist where relevant;
- errors shown to users are neutral and actionable;
- raw stack traces, SQL/provider errors, and internal IDs are not displayed;
- console has no blocking runtime errors in key flows when browser verification is available;
- mobile and desktop primary layout still render;
- critical user journeys have at least one smoke-check path;
- normal user actions cannot easily break the site: refresh, back/forward, double-click, empty submit, invalid data, wrong role, modal close, retry, no-results search, upload edge cases;
- duplicate submits/orders/records are guarded by UI or server idempotency;
- the interface looks finished: spacing, cards, buttons, typography, images, tables, modals, tabs, and navigation are not visibly broken or messy.

### 9. Agent skill and workflow safety

For projects that include agent skills, workflow packages, `SKILL.md`, routing files, or installable third-party skills:

- route through `systems/safe-routing.md`;
- inspect skill instructions, examples, tool permissions, scripts, dependency files, and package metadata;
- check prompt injection, data leakage, risky local code, vulnerable dependencies, and excessive permissions;
- optionally run a scanner such as NVIDIA SkillSpector when available;
- treat scanner output as evidence, not automatic truth;
- do not store scanner API keys or LLM provider credentials in project memory.

### 10. Dependency, CI, and supply-chain safety

- lockfile exists where dependencies are used;
- dependency audit command is known or marked `needs verification`;
- CI checks are documented or marked `needs verification`;
- release/build scripts do not print secrets or publish unintended artifacts;
- third-party packages with elevated permissions are reviewed before install;
- accepted findings are documented as accepted risk or baseline, not silently ignored.

### 11. Observability, rollback, and backups

- deployment logs/error logs location is known;
- health check or smoke check is known;
- rollback method and last known good commit/deploy are known or marked `needs verification`;
- backup/export status is known for data-bearing apps;
- incident owner/contact is documented where relevant;
- no report claims a fix is production-safe without a rollback/verification note.

## Fix rules

Use **minimal safe fix**.

Prefer small changes such as:

- add an error boundary;
- replace raw error display with safe message + server log;
- add missing loading/empty/error state;
- disable submit during request or guard duplicate submit;
- fix one broken route/link/button/form;
- improve one broken mobile/desktop layout section;
- add missing server validation;
- restrict returned API fields;
- add a rate-limit guard to one paid endpoint;
- document required RLS policies when live DB access is not available;
- add safe headers in deploy config;
- add missing auth guard on one route;
- add or propose repo-level `SAFE.md` from `systems/safe-project-template.md`;
- narrow a skill permission boundary or document a manual review requirement before install;
- add evidence/rollback notes to the report.

Do not:

- rotate secrets without explicit instruction;
- request secret values;
- store secret values in project memory;
- merge to `main` or production deploy without explicit permission;
- rewrite app architecture during a safety audit;
- install or trust new third-party skills without review;
- claim live security is fixed unless live behavior was verified.

## Daily cross-project safe sweep

When asked to run `/safe` across all projects:

1. Use `projects.md` / `projects.json` to list active projects with live URLs and canonical repos.
2. Prioritize projects with public live URLs, auth, payments, Supabase, public forms, uploads, paid API calls, newly changed agent skills, repeated previous findings, or visible frontend regressions.
3. For each project, inspect only high-signal files and recent memory.
4. Prefer `SAFE.md` if present; if missing, propose or create a minimal one when safe.
5. Classify findings:
   - `critical`: secrets exposed, open DB/user data, unauthenticated admin, paid API abuse path, live blank screen, primary order/checkout/admin action broken, duplicate paid/order action likely, malicious or highly unsafe skill package, missing rollback for a risky production fix;
   - `high`: missing RLS/policies evidence, public form without abuse guard, raw internal errors shown, broken auth flow, key form cannot submit, user trapped in auth/role state, destructive action can happen accidentally, high-risk skill permission or prompt issue, no backup/rollback path for data-bearing app;
   - `medium`: missing headers, weak validation, excessive API response fields, missing error boundary, important mobile/desktop layout broken, confusing validation, missing empty/error state, unreviewed skill dependency risk, missing observability path;
   - `low`: docs gaps, stale memory, unclear deploy mapping, missing SAFE.md, spacing/copy/alignment/polish issue, non-blocking console warning.
6. Apply safe docs/planning updates directly when appropriate.
7. For code fixes, create a focused branch/PR or a Codex-ready prompt per project unless the user explicitly authorized autonomous code changes in that repo.
8. Produce both compact human report and, when requested or dashboard-bound, JSON matching `systems/safe-report-schema.md`.
9. Report what was checked, what was fixed, what remains `needs verification`, and exact next commands/checks.

## Evidence pack

Every `/safe` result should preserve a compact evidence pack:

- selected route(s) and why;
- exact files checked;
- exact commands/checks run;
- exact checks not run and why;
- PR/commit/deploy/live URL when available;
- page/route, viewport/device, user action attempted, observed result, expected result for frontend findings;
- screenshot/browser notes only when UI was actually checked;
- sanitized finding evidence without secrets/private payloads;
- rollback/backup status when production or data is involved.

## New idea intake

When Andrey sends a new `/safe` idea, source, article, post, incident, or checklist:

1. Add durable ideas and source notes to `systems/safe-concept.md`.
2. Add only repeatable operational checks to this file.
3. Add routing changes to `systems/safe-routing.md` when the idea changes how checks are selected.
4. Add templates/contracts to separate files when the idea would bloat `safe-mode.md`.
5. Mark unavailable source text as `source text needs verification` instead of inventing details.
6. Convert real incidents into reusable checks when they can recur.

## Minimum checks per project

Use the narrowest available commands:

- dependency install only if needed;
- `npm run lint` when configured;
- `npm test` or project-specific tests when configured;
- `npm run build` for frontend projects;
- dependency audit when configured;
- secret scan when configured;
- route/browser smoke checks when live or local app can be opened;
- frontend UX smoke checks from `systems/safe-frontend-ux-checks.md` for user-facing UI;
- optional static skill scan when agent skills are in scope;
- platform-specific checks named in project memory.

If checks cannot be run, say so clearly.

## Final report format

Keep reports compact:

- Project / repo / live URL
- Selected route(s)
- Files checked
- Frontend routes/actions checked, if applicable
- Findings by severity
- Fixes applied
- Changed files
- Checks run
- Checks not run
- Evidence / live status
- Rollback / backup status
- Risks / `needs verification`
- STATE/LOG/SAFE.md update status
- Next action
