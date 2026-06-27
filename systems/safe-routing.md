# /safe Routing Matrix

Status: defensive routing layer for `/safe`.

Primary mode: `systems/safe-mode.md`
Canonical concept: `systems/safe-concept.md`

This document adds a routing step before a `/safe` audit. First classify the project and risk surface, then inspect the smallest useful files.

## Boundary

`/safe` is for Andrey-owned projects only. It is for production readiness, privacy, reliability, and defensive review. It must not be used for unauthorized third-party activity or harmful operational guidance.

If an external source is dual-use, extract only the safe routing idea and leave risky operational details out of the brain.

## Routing protocol

1. Route before auditing or fixing.
2. Match all available dimensions:
   - project type;
   - risk surface;
   - user intent;
   - hosting/data/toolchain;
   - live vs local vs unknown status.
3. If no route fits, mark `route needs verification` and use the closest read-only baseline route.
4. For cross-surface projects, combine routes in priority order: secrets/data/auth, paid API cost, frontend runtime, headers/privacy/docs.
5. After routing, read the smallest useful project files named by that route.
6. Use minimal safe fix and report checks run/not run.

## By project type

| Project type | Primary route | High-signal files |
| --- | --- | --- |
| Vite/React SPA with Supabase | Supabase + frontend reliability + auth route | `src/lib/*supabase*`, auth/profile/admin pages, route tree, migrations, `vercel.json` |
| Cloudflare Pages app/functions | Cloudflare API/functions safety route | `functions/api/*`, `functions/_lib/*`, `wrangler.toml`, `wrangler.jsonc`, `public/*` |
| Vercel app/API | Vercel API/frontend route | `api/*`, `app/api/*`, `pages/api/*`, `vercel.json`, auth/server utilities |
| Finance/provider import app | Provider/API-cost/data-minimization route | provider API routes, sync/import scripts, sheet/data config, release guards |
| Public content/landing site | Forms/headers/frontend route | contact forms, upload forms, analytics/ads config, headers/deploy config |
| Admin dashboard | Auth/admin access-control route | admin pages, role checks, session middleware, API permissions |
| AI/API endpoint app | Paid API + prompt/data safety route | AI route handlers, rate limits, auth gates, logs, prompt/data storage |
| Agent skill / workflow package | Agent skill safety route | `SKILL.md`, routing docs, tool manifests, install scripts, package files, examples |
| Unknown project | Baseline inventory route | README, AGENTS, PROJECT.md, deploy config, package scripts |

## By risk surface

| Risk surface | Route | Checks |
| --- | --- | --- |
| Secrets/env | Secret exposure route | committed env files, frontend env prefixes, server-only keys, logs, API responses |
| Supabase/database | RLS/data route | RLS enabled, policies, anon access, service-role use, explicit selected fields |
| Auth/admin | Access-control route | private routes, admin role checks, direct API access, unhappy auth paths |
| Public forms | Bot/form route | server validation, Turnstile/CAPTCHA plan, spam/rate limits, safe errors |
| Paid API/provider calls | Cost-control route | token checks, per-user/IP rate limits, quotas, retries, logging without secrets |
| Uploads/storage | Upload safety route | size, MIME, extension, path ownership, public/private bucket rules |
| Frontend runtime | UX safety route | white screen, null data, loading/error/empty states, console errors |
| API data exposure | Data minimization route | response fields, raw provider payloads, internal IDs, overbroad admin data |
| Headers/CORS | Browser baseline route | CSP plan, nosniff, referrer policy, permissions policy, frame protection, CORS origins |
| Privacy/legal | Privacy baseline route | collected data, storage provider, privacy policy, delete/export notes |
| Supply chain | Dependency/CI route | lockfiles, package scripts, secret scanning plan, dependency audit plan |
| Agent skill package | Skill safety route | prompt injection risk, data leakage risk, dangerous code, vulnerable dependencies, tool permissions |

## By user intent

| User says | Route to |
| --- | --- |
| `/safe all projects` | Daily cross-project sweep route in `systems/safe-mode.md` + this routing matrix |
| `проверь безопасность сайта` | Project boundary -> risk surface routing -> minimal audit |
| `чтобы юзер не видел ошибок` | Frontend runtime + API safe-error route |
| `проверь Supabase/RLS` | Supabase/database route |
| `проверь админку/роли` | Auth/admin access-control route |
| `проверь формы от ботов` | Public forms + bot/cost protection route |
| `проверь платные API/счета` | Paid API/provider cost-control route |
| `проверь skill/agent skill` | Agent skill safety route |
| `перед релизом` | Release gate route from `systems/safe-concept.md` |
| `после багов/инцидента` | Incident-to-rule route: turn recurring issue into `/safe` check |
| `добавь новую идею в /safe` | Idea intake route: update `safe-concept.md`; update `safe-mode.md` only if operational |

## By hosting/toolchain

| Toolchain / hosting | Route notes |
| --- | --- |
| Cloudflare Pages Functions | Check `wrangler` config, functions auth, KV/R2/D1 bindings, headers, CORS, public assets |
| Vercel | Check API routes/serverless functions, env prefix use, `vercel.json`, preview/prod distinction |
| Supabase | Check migrations, RLS, policies, anon/service role boundary, storage buckets |
| React/Vite | Check env prefix exposure, route error boundaries, null-data guards, build/runtime console |
| Google Sheets/OAuth | Check OAuth boundary, no token logging, least data returned, provider sync status separated from code path |
| Slack/command bridge | Check command tokens, replay/auth checks, logs, webhook validation, admin-only actions |
| Payment/finance providers | Check server-only credentials, rate limits, safe provider logs, explicit data fields |
| Agent skills | Check skill instructions, tool permissions, examples, dependency files, scripts, and optional SkillSpector output |

## Optional scanner: SkillSpector

When a project includes agent skills, skill packages, workflow skills, or third-party skills before installation, consider NVIDIA SkillSpector as an optional scanner.

Use static-only scanning by default when enough:

- scan a local skill directory or `SKILL.md`;
- produce JSON/Markdown/SARIF report when useful;
- use baseline suppression only after reviewing accepted findings;
- do not store LLM provider keys in the repo or project memory.

Treat scanner output as evidence, not as automatic truth. Review high/critical findings manually before changing project rules.

## Minimal route outputs

Every routed `/safe` pass must report:

- selected route(s);
- why this route was selected;
- files checked;
- findings by severity;
- fixes applied or PR/prompt created;
- checks run/not run;
- live status;
- `needs verification` items;
- next action.

## Source notes

- `zhaoxuya520/reverse-skill` uses a routing matrix that routes by target type, user intent, and toolchain before action.
- `/safe` adopts the routing pattern defensively for Andrey-owned production safety work.
- NVIDIA SkillSpector is a security scanner for AI agent skills; its README describes scanning Git repos, URLs, zip files, directories, or files, and patterns for prompt injection, data leakage, dependency risk, dangerous code, and related skill security issues.
