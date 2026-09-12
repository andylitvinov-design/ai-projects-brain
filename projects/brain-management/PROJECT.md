# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy Netlify/Cloudflare aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-09-12

State: `CURRENT_DEGRADED_REACTIVE_RECOVERY_HISTORY_ATTRIBUTION_AND_SYNC_OPEN`.

Canonical re-read at 2026-09-12 12:32 UTC:

- 7/7 required APIs, `/sw.js` and `/mobile-release-manifest.json` returned HTTP 200;
- shared operational source is `2026-09-12T11:42:27.636Z`, 0.8h old at the first current check;
- 24 metrics, ten operational projects and ten READY Trends tasks are present;
- control-plane health is `DEGRADED`: 17 passed, 1 failed, 0 errors and 1 warning; `immutable_history_7d` fails at 0/7;
- release manifest has 298 files, cache `brain-management-v60` and source SHA `12d38041124dcb4262bf8967b8f000ab37b1a24e`;
- current Vercel production is READY, but the repository Mobile Release Bundle remains red;
- seven-day runtime errors contain one recurring low-severity `url.parse()` deprecation warning on `/api/hobby-snapshots`.

## Continuity and publication gaps

- At 10:31 UTC on Sep 12, source age was 71h and four required APIs returned 503. The later refresh restored current behavior but did not prove a routine <=12h publication cadence.
- `/api/data.publication` still reports `IMPLEMENTED_AWAITING_PRODUCTION`, source SHA `1d7154d...` and no verified deployment id despite the newer live manifest.
- Sep 6–12 immutable scored snapshots are all missing: 0/7.
- Weekly API and repository scorecard history still end at Aug 17–23. Visible Sep 6 scheduler execution has no newer canonical persisted scorecard.
- Main lacks Morning handoffs for Sep 6, 7 and 11. Main closure receipts exist for Sep 7–8; Sep 9 is in open/conflicted PR #561, and Sep 10–11 are absent.
- Recent Mobile Release Bundle workflows fail deterministic repository assertions. Vercel READY does not close this repository-gate defect.

## Trends and effect state

- Sep 7–12 has 12 Trend terminal receipts: five bound to `live_completion_rate`, four to `rework_rate`, two to `context_retry_cost` and one to `user_pain_recurrence_rate`.
- All 12 have raw before equal to raw after and zero metric credit.
- All 12 still use noncanonical top-level `LIVE_VERIFIED_NO_EFFECT_EXPLAINED`.
- A new collector rotation exposes ten READY tasks and correctly excludes prior terminal ids.
- Current assignment is `trend-task-t-me-vibecoding-tg-3833`, bound to `context_retry_cost` `2/3 completed → 3/4 completed`, but has no immutable denominator-event id or causal ledger-transition proof. It must not consume another implementation slot until that proof exists.

## Automation and ownership state

- Scheduler truth remains ten effective recurring tasks, one exhausted enabled task and three operational names without an enabled scheduler.
- Daily Dashboard Update has no enabled scheduler although it is the exclusive routine publisher.
- Sep 12 agent-productivity reports work as Brain Regression Guard even though no enabled scheduler has that title: actor/scheduler attribution drift.
- Morning System Upgrade continues to implement, merge, deploy and write its own rich terminal receipts, bypassing PR Delivery Sweep and independent closure.
- Sep 12 owner inventory is 49 open PRs, 0 ready, 35 stale and 27 nonmergeable. The current PR Delivery Sweep merged or repaired zero.

## Metrics and evidence gaps

- Product Delivery, Task Success and Live Completion remain `1/4`.
- Deployment Frequency remains `1/3`; Rework remains `1/3 completed`; Context Retry Cost remains `2/3 completed`.
- `memory_sync_status` still reports last durable success `d4519ad...` on Aug 23 and omits later durable main/PR state.
- Twelve current-window Trend cycles and 36 new Brain Management PRs produced zero verified dashboard-metric gains.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Persist one coherent source before build; reject tracked post-checkout mutation.
- Verify status, body, schema/counts, source timestamp, parity, service worker, release manifest, rendered routes and runtime health.
- A connected-provider READY artifact is not a green repository release gate and does not repair stale attribution.
- Publish the newest weekly review and append prospective immutable history; never backfill missing dates.
- Missing stage artifacts are `PIPELINE_INCOMPLETE`, not no-op or terminal receipts.
- Metric assignment requires a pre-existing immutable denominator event plus causal eligibility.
- Zero-effect work receives no metric, product or canonical LIVE credit.

## Current chains and blockers

1. `operational-source-freshness-refresh-20260818` — immediate live recovered; <=12h routine publisher cadence, exact attribution and delayed closure remain open.
2. `trend-implementation-trend-task-t-me-vibecoding-tg-3833` — READY but immutable-event causality is missing.
3. Complete release gate — red; PR #561 conflicted and failing.
4. Immutable history — 0/7; weekly review stale at Aug 23.
5. `provider-live-readiness-ezohata-finance` — `BLOCKED_BY_OWNER`, 0/4.
6. Psihotavr identity — unresolved.

## Next durable actions

1. Enforce the denominator-event causality gate before consuming task `...3833` or any successor.
2. Restore one scheduler-backed routine publisher; prove two <=12h cycles, exact live attribution, seven snapshots and delayed independent closure.
3. Repair and consume the full release/closure path through PR Delivery Sweep and Evening Delivery Closure, then publish the newest weekly scorecard.

## Environment variable names

Values never enter durable memory. Known names: `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
