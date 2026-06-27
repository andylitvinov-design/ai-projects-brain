# /safe Canonical Concept

Status: living canonical concept for Andrey's `/safe` mode.

Primary mode file: `systems/safe-mode.md`

Use this document as the place to accumulate new safety ideas, checks, patterns, and lessons learned. Keep `safe-mode.md` compact and operational; keep this concept document broader and evolutionary.

## 1. Why `/safe` exists

Vibe-coded products can reach real users before they have a normal production-readiness pass. The common failures are not only classic security bugs. They also include:

- open or over-permissive databases;
- public forms hit by bots;
- paid API endpoints without rate limits;
- secrets accidentally exposed in frontend bundles, logs, docs, or API responses;
- authentication edge cases that were never tested;
- raw internal errors shown to users;
- frontend white screens from null/missing data;
- legal/privacy gaps once user data is collected;
- agents claiming a live fix without verifying the live target.

`/safe` is a repeatable safety and reliability mode that catches these issues early and keeps every project closer to production-safe without rewriting the product.

## 2. Core principles

1. **User safety and secrets first.** Never request, print, store, or commit secret values.
2. **Project memory first.** Start from `projects.md`, `projects.json`, and the target `projects/<slug>/PROJECT.md`.
3. **Smallest useful context.** Inspect high-signal files before any wide repo scan.
4. **Minimal safe fix.** Fix the proven issue with the smallest reversible change.
5. **Server-side trust boundary.** Client validation is UX only; security checks must exist on the server/API/database layer.
6. **No raw internal errors to users.** Users get neutral messages; details stay in server logs.
7. **No live claims without live checks.** Separate code-level fix, configured env, deployed version, and verified live behavior.
8. **Report uncertainty.** Missing data is `needs verification`, not a blocker for safe partial progress.

## 3. Safety domains

### A. Privacy and legal baseline

Check whether the project collects user data, emails, payments, uploaded files, health-like notes, personal diagnostics, or private messages.

Minimum expectations:

- privacy policy exists or is explicitly listed as missing;
- data storage location/provider is known;
- only required user data is collected;
- sensitive data is not logged unnecessarily;
- deletion/export obligations are noted as `needs verification` where applicable;
- project memory stores env variable names only, never values.

### B. Secrets and credentials

Check:

- committed `.env` files and examples;
- frontend prefixes such as `VITE_*` / `NEXT_PUBLIC_*`;
- service-role/admin/provider keys;
- logs and error reporting;
- API responses that may include tokens, raw provider objects, cookies, auth headers, or private IDs.

Rule: if a key is in the browser, treat it as public. Only anonymous/public keys designed for client use may appear in frontend code.

### C. Supabase / database safety

Check:

- Row Level Security is enabled on user-data tables;
- policies restrict read/write/update/delete to owner/admin/service path as appropriate;
- anon key cannot read unrelated user data;
- admin pages use server-side or policy-backed authorization;
- API responses select explicit fields instead of returning whole rows;
- migrations document policies without real secrets.

### D. Auth and access control

Check unhappy paths:

- wrong password repeated attempts;
- duplicate registration email;
- password reset for nonexistent email;
- expired/reused confirmation or reset links;
- logged-out access to private routes;
- low-role user opening admin/master pages;
- direct API call to admin endpoints without UI;
- safe error messages for all failed states.

### E. Public forms, bots, and API-cost protection

Check:

- public forms have server validation;
- public forms that send email, write DB rows, upload files, or trigger paid APIs have abuse protection;
- rate limits exist for paid API endpoints and expensive operations;
- Cloudflare Turnstile/CAPTCHA or equivalent is planned/implemented where public spam risk exists;
- CORS allows only intended origins unless the API is intentionally public;
- uploads validate size, MIME type, ownership, and path.

### F. Frontend reliability and user-facing errors

Check:

- key routes render without white screen;
- null/missing/empty data is handled;
- loading, empty, error, unauthorized, and offline-ish states exist where relevant;
- raw stack traces, SQL errors, provider payloads, internal IDs, and debug dumps are not shown to users;
- console has no blocking runtime errors in key flows when browser verification is available;
- mobile and desktop layouts still render.

### G. Security headers and browser baseline

Check platform config for:

- `Content-Security-Policy` or a staged CSP plan;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `X-Frame-Options` or CSP `frame-ancestors`;
- HSTS only after HTTPS/live domain behavior is verified.

### H. OWASP-style practical checks

Look for practical issues:

- SQL injection / unsafe query construction;
- XSS via raw HTML, markdown, templates, or unsanitized user content;
- broken access control;
- missing server-side validation;
- excessive API data exposure;
- unsafe redirects;
- unsafe file upload/path traversal;
- fetch/proxy routes that could become SSRF-like;
- dependency scripts or build artifacts that leak sensitive data.

## 4. Release gate checklist

Before a public release or after major AI-generated changes, `/safe` should answer:

1. What public routes and forms exist?
2. What private/admin routes exist?
3. What data is collected and where is it stored?
4. What secrets/env names are required and which are browser-safe?
5. Are DB policies/RLS verified or `needs verification`?
6. Are paid/external APIs protected from abuse?
7. Are raw internal errors hidden from users?
8. Are key routes checked on desktop and mobile?
9. What checks ran and what checks did not run?
10. What exact PR/commit/deploy/live URL was verified?

## 5. Daily sweep model

Daily `/safe` should prioritize projects by risk:

1. Public live URL + auth/admin/database.
2. Public forms, uploads, or email sending.
3. Payments/finance/provider imports.
4. Paid AI/API endpoints.
5. Recently changed frontend routes.
6. Projects with unclear repo/live/deploy mapping.

The daily output should be compact:

- checked projects;
- high/critical findings;
- fixes applied;
- PRs opened/updated;
- checks run/not run;
- live status;
- risks and `needs verification`;
- next action.

## 6. Safe fix patterns

Prefer:

- error boundary around route tree;
- safe public error copy + server-only logging;
- explicit API field selection;
- one missing auth guard;
- one missing server validation branch;
- one rate-limit guard for paid endpoint;
- safe headers in deploy config;
- RLS policy documentation or migration when verified;
- small test/smoke check for the failing path.

Avoid:

- architecture rewrite;
- secret rotation without explicit instruction;
- direct production deploy without permission;
- broad dependency upgrades unless needed for a proven vulnerability;
- claiming security is fixed without live/config verification.

## 7. Finding severity

- `critical`: secret exposed, open DB/user data, unauthenticated admin, paid API abuse path, live blank screen on primary route.
- `high`: missing RLS evidence for user data, public form without abuse guard, raw internal errors exposed, broken auth protection.
- `medium`: missing security headers, weak validation, excessive API response fields, missing error boundary.
- `low`: stale docs, unclear deploy mapping, missing checklist, non-blocking console warnings.

## 8. Idea intake loop

When Andrey sends a new `/safe` idea, article, X/Twitter post, audit result, incident, or checklist:

1. Extract the reusable principle.
2. Convert it into one or more concrete checks.
3. Add the idea to this concept document if it changes the long-term model.
4. Add only the operational subset to `systems/safe-mode.md` if agents must execute it every time.
5. If it is project-specific, update that project `PROJECT.md`, `RISKS.md`, `CODEX_BRIEF.md`, `STATE.md`, or `LOG.md` instead.
6. Keep source references short. If source content cannot be fetched, mark `source text needs verification` and do not invent details.

## 9. Open improvement backlog

- Add project-level `SAFE.md` template for repos with public live apps.
- Add standard browser smoke script template for frontend routes.
- Add Supabase RLS audit prompt/template.
- Add Cloudflare/Vercel security headers snippets per platform.
- Add privacy policy minimum template for small public projects.
- Add daily report JSON schema for `brain-management` dashboard ingestion.
- Add incident-to-rule loop: every real bug/security issue becomes a reusable `/safe` check if it can recur.

## 10. Source notes

- Andrey's initial vibe-coding safety checklist: privacy/GDPR/CCPA awareness, Supabase RLS, auth unhappy paths, security headers, OWASP checks, server-side validation, env/API-key leakage, rate limiting, CAPTCHA/Turnstile, CORS, and safe user-facing errors.
- X/Twitter reference from Prajwal Tomar shared by Andrey: source text needs verification because the linked post did not expose readable text through the available fetch path.
