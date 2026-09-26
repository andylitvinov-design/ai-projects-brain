# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-09-26

State: `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_AND_PUBLISHER_BLOCKED`.

Provider re-read at 2026-09-26 12:37–12:40 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity`, `/api/needs-attention` and `/api/strategic-priorities` return 503;
- `/api/control-plane-health` and `/api/weekly-delivery-system-review` return 200, so the canonical core is 2/7;
- shared source is `2026-09-15T11:34:55.858Z`, age 265.1h; data limit is 18h and Trends limit is 96h;
- `/api/data-publication-current` returns 500 `FUNCTION_INVOCATION_FAILED`;
- live weekly review still ends 2026-08-23;
- latest production deployment is `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp`, created 2026-09-15 11:45 UTC;
- frozen UI/PWA remains reachable, but reachability is not operational recovery.

## Repository/live architecture split

PR #607 restored storage-safe runtime-data separation on `main`. Repository `data-current.json` is newer (`2026-09-18T18:26:12.350Z`) than production, but is itself stale. Production lacks `BRAIN_RUNTIME_GITHUB_TOKEN` with fine-grained Contents-read access and no enabled routine publisher exists.

PR #613 fixes a separate semantic defect: when operational data is unavailable, one source error is reported and 16 dependent checks become `NOT_EVALUATED`. Canonical live still runs the old implementation and falsely reports eight schema/formula/guard errors from the 503 body. This source correction receives no live credit until activated.

## Continuity and publication gaps

- Live health reports 3/7 immutable days on an old Sep 9–15 window.
- The merged Sep 14–20 weekly review also found only 3/7 days; missing dates are never backfilled.
- PR #614 makes the Sep 14–20 review canonical on repository main, but live remains Aug 17–23.
- `memory_sync_status` cannot be read because `/api/data` fails closed.
- Sep 21–25 independent closures all ended `BLOCKED_BY_OWNER / NO_SAFE_UPGRADE`.

## Trends and effect state

- PR #617 contains exactly ten ranked trends from 12/16 sources and preserves four failures.
- Its unchanged head is draft, far behind current main and red at 539 passing / 49 failing tests.
- Failures include scheduled collector v5 versus v6 semantics, stale operational data and browser dependencies; a mechanical rebase is not acceptance.
- Task `trend-task-arxiv-org-abs-2609-11918v1` remains the sole carryover assignment, but `implementation_authorized=false`. Canonical source, queue freshness and exact denominator identity are all missing.

## Automation and ownership state

- Nine management automations are enabled.
- Morning System Upgrade is disabled; no enabled primary implementer exists.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch are disabled; no enabled routine publisher exists.
- Daily Strategic Priorities still names disabled Morning System Upgrade, but correctly blocks implementation.
- Sep 26 PR inventory is 56 open, 41 stale, 31 nonmergeable and 13 drafts. Current PR Delivery merged, repaired and closed zero.

## Metrics and effect

- Last accepted Product Delivery, Task Success and Live Completion remain `1/4`.
- Provider readiness remains `0/4`; Business KPI coverage remains `4/6`.
- Published publication freshness says current/100, but canonical source evidence is 265.1h stale. Durable memory records the raw conflict without recalculating a daily score.
- PRs #607/#613/#614 and this capsule are `NO_DIRECT_METRIC_EFFECT`.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Operational data stays outside static release bundles and is read only through guarded runtime source.
- A 200 fallback cannot override source-dependent 503s.
- Dependency outage marks dependent checks `NOT_EVALUATED`.
- Scoped read access and an enabled recurring publisher are separate prerequisites.
- A red semantic collector gate requires regeneration, not mechanical merge repair.
- Missing history is never fabricated.
- Zero-effect or blocked work receives no metric/product credit.

## Current blockers and next actions

1. Configure scoped runtime read access and generate one fresh atomic source.
2. Run one exact-main activation only after the green unchanged-head gate; prove 7/7 APIs and PR #613 semantics.
3. Restore one sole publisher, prove a later source refresh without deployment and obtain delayed closure.
4. Semantically regenerate PR #617 on current main and keep task 11918 blocked until exact denominator eligibility is proven.

## Environment variable names

Values never enter durable memory. Known names: `BRAIN_RUNTIME_GITHUB_TOKEN`, `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
