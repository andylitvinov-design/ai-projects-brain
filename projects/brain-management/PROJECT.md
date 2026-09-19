# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-09-19

State: `STALE_FAIL_CLOSED_RUNTIME_PATH_RESTORED_OWNER_ACTIVATION_BLOCKED`.

Canonical re-read at 2026-09-19 12:11–12:12 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity`, `/api/needs-attention` and `/api/strategic-priorities` all returned 503;
- shared live source is `2026-09-15T11:34:55.858Z`, 96.6h old; the 18h data/productivity limit and 96h Trends limit are both exceeded;
- `/api/weekly-delivery-system-review` returned 200 but still exposes Aug 17–23, generated 2026-08-23;
- `/api/control-plane-health` returned 200 `DEGRADED` while evaluating missing/empty upstream data: 8 passed, 10 failed, 8 errors and 2 warnings;
- `/sw.js` and `/mobile-release-manifest.json` returned 200; the Sep 15 manifest has cache `brain-management-v60`, 295 files and source SHA `93265d176ded956ce098516156508cd0413e5622`;
- a reachable PWA, health endpoint or weekly fallback is not evidence that the operational control plane is current.

## Repository/live architecture split

PR #607 restored the storage-safe runtime-data separation on `main` after PR #602 reintroduced deployment-bundled operational JSON. Repository validation covered static-only packaging, guarded runtime readers, data-only collection, deployable-content hashing and the normal regression suite.

Repository `main` contains a Sep 19 operational snapshot, but canonical production still serves the Sep 15 artifact. The architecture is therefore `RESTORED_ON_MAIN_BLOCKED_BY_OWNER`, not live-activated. Activation requires the existing Vercel project owner to configure `BRAIN_RUNTIME_GITHUB_TOKEN` with fine-grained read-only Contents access to `andylitvinov-design/brain-management`. The value must never enter source, logs or durable receipts.

After credential configuration, closure requires: exact-main deployment guard, at most one material application deployment, 7/7 canonical API re-read, one later guarded runtime-source refresh that causes no deployment, and delayed independent terminal verification.

## Continuity and publication gaps

- Repository history has four prospective scored snapshots for Sep 13–19: Sep 13, 14, 15 and 18. Sep 16, 17 and 19 are absent; do not backfill them.
- Live health reports only 3/7 because it is itself tied to the older Sep 15 source.
- Morning and ranking handoffs exist for Sep 13, 14, 15, 18 and 19; Sep 16–17 are absent. Closure coverage is also incomplete.
- The Sep 7–13 Weekly Delivery System Review exists in open PR #579, not canonical `main` or live. Live weekly publication remains at Aug 17–23.
- `memory_sync_status` cannot be read through current `/api/data` because that endpoint fails closed. The last known sync was already stale; current durable reconciliation is not yet operationally acknowledged.

## Trends and effect state

- Sep 13–18 contains seven terminal Trend receipts. All seven re-read their assigned metric unchanged and receive zero metric credit.
- Across the last three reconciliation windows, 32 of 32 Trend pilots produced zero assigned-metric effect.
- Daily Strategic Priorities now blocks task `trend-task-arxiv-org-abs-2609-11918v1` because an exact denominator identity and causal transition are unavailable; `implementation_authorized=false` is the correct result.
- The assignment still names Morning System Upgrade even though that scheduler was disabled on Sep 18. Ranking refusal has begun, but runner-level fail-closed enforcement and a valid causally eligible task are not yet proven.

## Automation and ownership state

- Scheduler truth is nine enabled recurring automations.
- Morning System Upgrade and Finish Trends Rotation are disabled; no enabled primary implementation owner remains.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch remain disabled; no enabled routine publisher exists.
- Daily Strategic Priorities is active but still emits an assignment to a disabled executor.
- Sep 19 PR inventory is 55 open, 0 ready, 39 stale, 31 nonmergeable and 13 drafts; the PR sweep merged, repaired and closed zero.

## Metrics and effect

- Product Delivery, Task Success and Live Completion remain `1/4`.
- Deployment Frequency remains `1/3`; Rework remains `1/3 completed`; User Pain Recurrence remains `1/2`; Context Retry Cost remains `2/3 completed`; Provider readiness remains `0/4`; Business KPI coverage remains `4/6`.
- Repository snapshots label publication freshness current even while canonical production fails closed. Publication freshness must be derived from canonical source age, not repository snapshot recency.
- The runtime restoration, this capsule and all index/governance changes are `NO_DIRECT_METRIC_EFFECT`.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Operational data stays outside static release bundles and is read only through the guarded runtime source.
- A 200 health/fallback route cannot override 503 operational sources.
- Repository freshness cannot substitute for canonical production freshness.
- Publish the newest weekly review and append prospective immutable history; never fabricate missing dates.
- Metric assignment requires an immutable denominator event and a demonstrable numerator transition before implementation.
- A disabled executor cannot own an active assignment.
- Zero-effect work receives no metric, product or canonical LIVE credit.

## Current blockers and next actions

1. Owner activation: configure the scoped read-only runtime token, then perform the bounded exact-main activation and verify 7/7 APIs.
2. Prove runtime separation: publish a later repository data refresh with no Vercel deployment, then complete delayed independent closure.
3. Keep Trend implementation paused until an enabled executor receives an assignment with immutable denominator identity and runner-enforced causal eligibility.
4. Merge or supersede PR #579 only after final-head validation so the Sep 7–13 scorecard becomes canonical; continue prospective snapshots toward 7/7.

## Environment variable names

Values never enter durable memory. Known names: `BRAIN_RUNTIME_GITHUB_TOKEN`, `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
