# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy Netlify/Cloudflare aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-08-29

State: `CURRENT_DEGRADED_CONTINUITY_AND_ATTRIBUTION_OPEN`.

Canonical re-read at 2026-08-29 12:46–12:51 UTC:

- required APIs and `/sw.js` returned HTTP 200;
- shared source timestamp: `2026-08-29T00:02:13.657Z` (12.8h old, under the 18h terminal limit but in warning range);
- 24 metrics, ten projects and ten Trends implementation tasks are present;
- `/api/control-plane-health` reports `DEGRADED`: 15 checks pass, immutable history fails at `1/7`, and one warning is present;
- latest Vercel production deployments are READY and 24h grouped runtime errors are zero;
- `/api/data.publication` still says `IMPLEMENTED_AWAITING_PRODUCTION`, has no latest verified deployment id and references source SHA `1d7154d...`, so current publication attribution is incomplete;
- service worker cache is `brain-management-v60`.

## Metrics and evidence gaps

- Product Delivery, Task Success and Live Completion remain `1/4` (25).
- Provider readiness remains `0/4`; public business evidence remains `4/6`.
- Current immutable history is `1/7`: only Aug 23 exists for the Aug 23–29 window.
- Canonical weekly review API serves week ending Aug 16, while repository evidence contains week ending Aug 23.
- `memory_sync_status` lists PRs #193/#195/#196/#199 but omits open durable PR #203 and merged `/copy-ui` PR #204.

## Trends and assignment state

- Persistent task `...3763` is now correctly `EVALUATED_NO_EFFECT`; actual effect was `live_completion_rate 1/4 → 1/4`, score `25 → 25`.
- The queue contains nine READY tasks and selects Model Hardware Standard task `...3766` next.
- Operational release ownership and some assignment records still reference terminal task 3763. This is `QUEUE_ROTATED_LOCK_DRIFT`.
- Five prior pilots plus Persistent have produced no same-metric gain. Before the next assignment, ranking must prove the task can enter an immutable delivery numerator.

## Automation/ownership state

- Morning System Upgrade is enabled and assigned task 3766, but must not inherit task 3763's release lock.
- Evening Delivery Closure owns independent verification.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch are operational actors without enabled schedulers.
- `Finish Trends Rotation` is enabled but exhausted its finite schedule and is not current capacity.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Persist one coherent source before build; reject tracked post-checkout source mutation.
- Verify status, content type, body, schema/counts, source timestamp, parity, service worker, rendered routes and runtime health.
- Publish the newest weekly review and append prospective immutable history; never backfill missing dates.
- Release locks are task/chain-specific and close at terminal transition.
- Metric binding requires an immutable denominator item and causal eligibility.
- Zero-effect work receives no implementation/product/LIVE metric credit.
- Preserve six routes, four Overview aggregates, ten projects, ten Trends and 24 metrics unless owner-approved.

## Current chains and blockers

1. `operational-source-freshness-refresh-20260818` — current behavior readable; routine publisher ownership and attributable delayed proof remain open.
2. `trend-implementation-trend-task-t-me-vibecoding-tg-3766` — next READY assignment; causal delivery-metric eligibility unproven.
3. task 3763 release lock — stale after terminal `EVALUATED_NO_EFFECT` transition.
4. `provider-live-readiness-ezohata-finance` — `BLOCKED_BY_OWNER`, `0/4`.
5. Immutable history — `1/7`; weekly review API one scorecard behind.
6. Psihotavr identity — unresolved.

## Next durable actions

1. Require denominator eligibility before consuming task 3766 or bind it to a compatible direct metric.
2. Restore one publisher-owned attributable cycle, clear the stale task-3763 lock and obtain independent delayed closure.
3. Publish current weekly review evidence and accumulate seven prospective immutable days.

## Environment variable names

Values never enter durable memory. Known names: `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
