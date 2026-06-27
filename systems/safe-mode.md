# Safe Mode

Callable trigger: `/safe`

Use this mode when Andrey asks to improve safety, prevent user-visible frontend errors, prepare a release, audit an app, or run recurring checks across projects.

## Goal

Keep every active project safe enough for real users without turning audits into large rewrites.

Safe Mode checks two things together:

1. **Security / abuse / cost safety** — secrets, RLS, auth, headers, CORS, rate limits, bot protection, API cost exposure, privacy, logs, and data minimization.
2. **User-facing reliability** — no blank screens, uncaught frontend exceptions, raw server/database errors, broken primary routes, broken forms, confusing auth states, or unsafe public error messages.

## Context first

Before auditing or patching a project:

1. Read `projects.md` and identify the target projects.
2. Read `projects.json` when repo/live mapping matters.
3. Read `systems/agent-rules.md` and `systems/codex-project-workflow.md`.
4. Read the target `projects/<slug>/PROJECT.md`.
5. In the target repo, read the smallest useful set:
   - `AGENTS.md` if present;
   - `CODEX_BRIEF.md` or `README.md`;
   - `STATE.md` / `LOG.md` if present;
   - deploy config (`vercel.json`, `wrangler.toml`, `wrangler.jsonc`, Netlify config, package scripts);
   - auth/API/database files directly relevant to the audit.

Do not scan the whole repo first. Use search to find exact security, auth, form, API, and error-boundary files.

## Audit scope

For each active project, check only what applies.

### 1. Project boundary

- canonical repo and live URL match project memory;
- production source is not deprecated or legacy;
- hosting provider and deploy config are known;
- uncertain source/live/deploy details are marked `needs verification`.

### 2. Secrets and environment exposure

- no real secret values are committed;
- env files are ignored except safe examples;
- frontend env variables are intentionally public only (`VITE_*`, `NEXT_PUBLIC_*`, etc.);
- server-only API keys are used only in server routes/functions;
- logs do not print tokens, auth headers, full provider responses, or private user data.

### 3. Database and Supabase safety

- RLS is enabled on user-data tables;
- policies restrict rows to the authenticated owner/admin role where needed;
- service-role keys never appear in the browser;
- API endpoints return only needed fields, not full user/provider rows;
- migrations and docs name required policies without storing secrets.

### 4. Auth edge cases

Test or inspect flows for:

- wrong password repeated attempts;
- nonexistent email password reset;
- duplicate registration email;
- expired or reused confirmation/reset link;
- logged-out access to private routes;
- user without required role accessing admin/master pages;
- neutral user-facing errors and detailed server-only logs.

### 5. Public forms and bot/cost protection

- public forms have server validation;
- paid API endpoints have rate limiting, token checks, or abuse guard;
- public forms that can be spammed have Turnstile/CAPTCHA or equivalent plan;
- CORS is restricted to intended origins when API is not public;
- upload routes validate size, MIME type, ownership, and storage path.

### 6. Security headers and browser baseline

Check for appropriate headers where deploy platform supports them:

- `Content-Security-Policy` or a staged CSP plan;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `X-Frame-Options` or CSP `frame-ancestors`;
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

### 8. Frontend runtime and UX safety

For user-facing routes:

- page does not white-screen on missing/null data;
- loading, empty, error, and unauthorized states exist;
- errors shown to users are neutral and actionable;
- raw stack traces, SQL/provider errors, and internal IDs are not displayed;
- console has no blocking runtime errors in key flows when browser verification is available;
- mobile and desktop primary layout still render after fixes.

## Fix rules

Use **minimal safe fix**.

Prefer small changes such as:

- add an error boundary;
- replace raw error display with safe message + server log;
- add missing server validation;
- restrict returned API fields;
- add a rate-limit guard to one paid endpoint;
- document required RLS policies when live DB access is not available;
- add safe headers in deploy config;
- add missing auth guard on one route.

Do not:

- rotate secrets without explicit instruction;
- request secret values;
- store secret values in project memory;
- merge to `main` or production deploy without explicit permission;
- rewrite app architecture during a safety audit;
- claim live security is fixed unless live behavior was verified.

## Daily cross-project safe sweep

When asked to run `/safe` across all projects:

1. Use `projects.md` / `projects.json` to list active projects with live URLs and canonical repos.
2. Prioritize projects with public live URLs, auth, payments, Supabase, public forms, uploads, or paid API calls.
3. For each project, inspect only high-signal files and recent memory.
4. Classify findings:
   - `critical`: secrets exposed, open DB/user data, unauthenticated admin, paid API abuse path, live blank screen;
   - `high`: missing RLS/policies evidence, public form without abuse guard, raw internal errors shown, broken auth flow;
   - `medium`: missing headers, weak validation, excessive API response fields, missing error boundary;
   - `low`: docs gaps, stale memory, unclear deploy mapping.
5. Apply safe docs/planning updates directly when appropriate.
6. For code fixes, create a focused branch/PR or a Codex-ready prompt per project unless the user explicitly authorized autonomous code changes in that repo.
7. Report what was checked, what was fixed, what remains `needs verification`, and exact next commands/checks.

## Minimum checks per project

Use the narrowest available commands:

- dependency install only if needed;
- `npm run lint` when configured;
- `npm test` or project-specific tests when configured;
- `npm run build` for frontend projects;
- route/browser smoke checks when live or local app can be opened;
- platform-specific checks named in project memory.

If checks cannot be run, say so clearly.

## Final report format

Keep reports compact:

- Project / repo / live URL
- Files checked
- Findings by severity
- Fixes applied
- Changed files
- Checks run
- Checks not run
- Live/preview status
- Risks / `needs verification`
- STATE/LOG update status
- Next action
