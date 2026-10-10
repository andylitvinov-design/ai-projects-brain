# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-10-10

State: `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_PUBLISHER_AND_EFFECT_BINDING_BLOCKED`.

Latest accepted live observation at 2026-10-10 10:31 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity`, `/api/needs-attention` and `/api/strategic-priorities` return 503;
- `/api/control-plane-health` and `/api/weekly-delivery-system-review` return 200, so the canonical core is 2/7;
- shared source is `2026-09-15T11:34:55.858Z`, age 598.9h; data limit is 18h and Trends limit is 96h;
- `/api/data-publication-current` returns 500 `FUNCTION_INVOCATION_FAILED`;
- live weekly review still ends 2026-08-23;
- latest production deployment is `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp`, created 2026-09-15 11:45 UTC;
- frozen UI/PWA remains reachable, but reachability is not operational recovery.

## Repository/live architecture split

PR #607 restored storage-safe runtime-data separation on `main`. Repository `data-current.json` is newer (`2026-09-18T18:26:12.350Z`) than production, but is itself 520.6h old at the latest ranking. Production lacks `BRAIN_RUNTIME_GITHUB_TOKEN` with fine-grained Contents-read access and no enabled routine publisher exists.

PR #613 fixes a separate semantic defect: when operational data is unavailable, one source error is reported and 16 dependent checks become `NOT_EVALUATED`. Canonical live still runs the old implementation and falsely reports eight schema/formula/guard errors from the 503 body. This source correction receives no live credit until activated.

## Continuity and publication gaps

- Current operational evidence now exposes 3/7 scored days; four missing dates remain missing and are not backfilled from receipts.
- Repository weekly history now reaches Sep 28–Oct 4, but live remains Aug 17–23; missing dates are never backfilled.
- Repository `memory_sync_status` still says current, but the source is Sep 18 and `/api/data` fails closed, so current durable sync is unproven.
- Sep 27–Oct 2 independent closures all ended `BLOCKED_BY_OWNER / NO_SAFE_UPGRADE`.
- PR #629 changes publication-current from an unstructured crash to structured fail-closed behavior. PR Delivery rebuilt it from the current `main` tree with a task-only seven-file diff and zero lag; the exact-head complete gate still correctly fails on stale source.

## Trends and effect state

- Replacement PR #649 contains exactly ten ranked trends from 12/16 sources, preserves task 11918 and terminal continuity, and is reconciled to current `main` with a task-only three-file diff.
- PR #649 still lacks an accepted complete exact-head gate. Superseded draft PR #617 remains evidence only until the replacement is accepted.
- A current-base diff is not acceptance; source freshness and full semantic validation remain mandatory.
- Task `trend-task-arxiv-org-abs-2609-11918v1` remains the sole carryover assignment, but `implementation_authorized=false`. Canonical source, queue freshness and exact denominator identity are all missing.

## Automation and ownership state

- Nine recurring management automations are enabled; three feedback collectors and one finite Holistic House release task are outside recurring management capacity.
- Morning System Upgrade is disabled; no enabled primary implementer exists.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch are disabled; no enabled routine publisher exists.
- Daily Strategic Priorities still names disabled Morning System Upgrade, but correctly blocks implementation.
- Oct 10 PR inventory is 60 open, 46 stale, 33 nonmergeable and 7 CI-failing. PR Delivery repaired two current-base branches and merged zero in the current sweep.

## Metrics and effect

- Last accepted Product Delivery, Task Success and Live Completion remain `1/4`.
- Provider readiness remains `0/4`; Business KPI coverage remains `4/6`.
- Published publication freshness says current/100, but canonical source evidence is 598.9h stale. Durable memory records the raw conflict without recalculating a daily score.
- The latest complete review delivered 13/18 product/business chains to live but recorded 0/21 numeric gains. Product delivery requires a preassigned immutable denominator event and same-source reread before metric credit.
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
- Receipt-only main movement receives no throughput credit and must not repeatedly invalidate the same repair branch.

## Current blockers and next actions

1. Configure scoped runtime read access, regenerate PR #629 once on current main and repair the complete gate.
2. Generate one fresh atomic source and run exact-main activation only after the green unchanged-head gate; prove 7/7 APIs and PR #613 semantics.
3. Restore one sole publisher, prove a later source refresh without deployment, accumulate seven prospective snapshots and obtain delayed closure.
4. Obtain an accepted complete final-head gate for PR #649 and close superseded PR #617 only afterward; keep task 11918 blocked until exact denominator eligibility is proven.

## Environment variable names

Values never enter durable memory. Known names: `BRAIN_RUNTIME_GITHUB_TOKEN`, `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
