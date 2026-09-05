# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy Netlify/Cloudflare aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-09-05

State: `CURRENT_DEGRADED_HISTORY_ATTRIBUTION_AND_GATE_OPEN`.

Canonical re-read at 2026-09-05 12:53 UTC:

- 7/7 required APIs and `/sw.js` returned HTTP 200;
- shared operational source is `2026-09-05T11:35:50.912Z`, 1.3h old at check;
- 24 metrics, ten operational projects and ten Trends implementation tasks are present;
- control-plane health is `DEGRADED`: 17 passed, 1 failed, 0 errors and 1 warning; only `immutable_history_7d` fails at 1/7;
- `/mobile-release-manifest.json` returns 200 with 299 files, cache `brain-management-v60` and source SHA `d82b87e869c293fc331cd0797cd8806bd1bd56f7`;
- latest production deployment is READY; the seven-day runtime-error query is zero;
- `/api/data.publication` remains stale internally: source SHA `1d7154d...`, state `IMPLEMENTED_AWAITING_PRODUCTION`, no latest verified deployment id, despite the newer live manifest.

## Continuity and publication gaps

- At 10:47 UTC on Sep 5, the prior source was 23.0h old and 4/7 APIs failed closed. Freshness was restored later, so current behavior is healthy but cadence is not proven.
- Only Aug 30 exists in the current immutable window; Aug 31–Sep 5 are missing.
- Weekly API serves Aug 17–23 while the Aug 24–30 durable review is already merged in AI Projects Brain PR #207.
- The complete Mobile Release Bundle gate remains red across obsolete assertions, fixtures, dependencies and source-owned checks. PR #501 was closed when the failure set exceeded one bounded owner.
- Five latest closure receipts contain no canonical `LIVE_VERIFIED`: one `DEPLOYMENT_PENDING` and four `NO_SAFE_UPGRADE`.

## Trends and effect state

- Aug 31–Sep 5 has 13 Trend terminal receipts: five bound to `live_completion_rate`, three to `user_pain_recurrence_rate`, three to `rework_rate` and two to `context_retry_cost`.
- All 13 have raw before equal to raw after and zero metric credit.
- All 13 still use noncanonical top-level `LIVE_VERIFIED_NO_EFFECT_EXPLAINED` even though queue state correctly uses `EVALUATED_NO_EFFECT`.
- Current queue has 7 `EVALUATED_NO_EFFECT` and 3 READY.
- Current assignment is CordisBench task `trend-task-arxiv-org-abs-2609-01600v1`, bound to `context_retry_cost` `2/3 completed → 3/4 completed`. It must not execute until immutable event eligibility is proven.

## Automation and ownership state

- Scheduler truth is 10 effective recurring tasks, one exhausted enabled task and three operational names without an enabled scheduler.
- Daily Dashboard Update has no enabled scheduler although it is the exclusive routine publisher.
- Agent-productivity reports Sep 3–5 activity as Brain Regression Guard even though no enabled scheduler has that title. This is actor/scheduler attribution drift.
- Morning System Upgrade produced all 13 Trend terminal receipts and deployments, continuing to overlap PR Delivery and independent closure.
- Current release lock is single-owner on task `...01600v1`, but its `acquired_at` remains Sep 1 while assignments rotated; lock rebinding freshness needs verification.

## Metrics and evidence gaps

- Product Delivery, Task Success and Live Completion remain `1/4`.
- Deployment Frequency remains `1/3`; Rework remains `1/3 completed`; Context Retry Cost remains `2/3 completed` (score 33.3).
- Provider readiness remains `0/4`; public business evidence remains `4/6`.
- `memory_sync_status` still reports last durable success `d4519ad...` on Aug 23 and pending PRs #193/#195/#196/#203.
- Sep 5 PR inventory is 49 open, 0 ready, 34 stale and 28 nonmergeable.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Persist one coherent source before build; reject tracked post-checkout mutation.
- Verify status, content type, body, schema/counts, source timestamp, parity, service worker, release manifest, rendered routes and runtime health.
- Publish the newest weekly review and append prospective immutable history; never backfill missing dates.
- Release locks are task-specific and must rebind or close on every terminal queue transition.
- The full release gate must rerun in entirety; tail-truncated or partial evidence is not green.
- Metric binding requires a pre-existing immutable denominator item plus causal eligibility.
- Zero-effect work receives no metric, product or canonical LIVE credit.

## Current chains and blockers

1. `operational-source-freshness-refresh-20260818` — immediate live recovered; <=12h routine publisher cadence and attribution remain open.
2. `trend-implementation-trend-task-arxiv-org-abs-2609-01600v1` — READY but causal immutable-event eligibility must be proven.
3. Complete release gate — red multi-owner migration.
4. Immutable history — 1/7; weekly review one cycle stale.
5. `provider-live-readiness-ezohata-finance` — `BLOCKED_BY_OWNER`, 0/4.
6. Psihotavr identity — unresolved.

## Next durable actions

1. Enforce the causal denominator gate before consuming task `...01600v1` or any successor.
2. Restore one scheduler-backed routine publisher; prove two <=12h cycles, exact manifest/deploy attribution and delayed independent closure.
3. Partition the full release-gate failures by owner, restore green validation, publish Aug 24–30 and accumulate seven real snapshots.

## Environment variable names

Values never enter durable memory. Known names: `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
