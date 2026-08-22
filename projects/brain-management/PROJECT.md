# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy Netlify/Cloudflare aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-08-22

State: `RECOVERED_CURRENT_AWAITING_DELAYED_CLOSURE`.

Canonical re-read at 2026-08-22 12:02 UTC:

- five required APIs returned HTTP 200 JSON;
- shared source timestamp: `2026-08-22T11:57:34.985Z` (about 0.1h old);
- `/api/data` reports source parity true and canonical alias verified;
- `/sw.js` returned HTTP 200 with cache `brain-management-v59`;
- current Vercel production deployment `dpl_DbxvkUgnqoEHKYWCvqN6JNu9qipw` is READY;
- runtime error inventory contains only one historical `url.parse()` deprecation warning last seen Aug 16, not a current deployment failure.

This is real immediate recovery, but operational state still requires a delayed same-source checkpoint and independent Evening Delivery Closure. Do not write `LIVE_VERIFIED` yet.

## Current metrics and evidence gaps

- 24 metrics and ten projects are present.
- Product Delivery, Task Success and Live Completion remain `1/4` (25).
- Provider readiness remains `0/4`; public business evidence remains `4/6`.
- Week-ending Aug 16 immutable history coverage is `1/7`.
- `memory_sync_status` is `PENDING_DURABLE_UPDATE`, still referencing PR #196 instead of current PR #193/#199.

## Trends semantic regression

Brain Management PR #396 established: zero-effect pilots are `EVALUATED_NO_EFFECT`, and only a verified live metric gain may become `DONE`. Current canonical `/api/trends` nevertheless exposes five queue items as `DONE` with `LIVE_VERIFIED_NO_EFFECT_EXPLAINED`.

Treat this as `TREND_ZERO_EFFECT_DONE_REGRESSION`. Product metric credit remains zero. The release invariant must run the effect postprocessor after every Trends refresh and reject any zero-effect `DONE` before publication.

## Automation/ownership state

- Morning System Upgrade is enabled and assigned `trend-task-vibecoding-3117-agent-skills` after the publication checkpoint.
- Evening Delivery Closure owns the delayed source checkpoint and terminal proof.
- `/api/data` also names Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch, but no enabled recurring schedulers with those titles exist.
- Tool availability and an operational label do not transfer ownership.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- Persist one coherent source before build; reject tracked post-checkout source mutation.
- Verify status, content type, body, schema/counts, source timestamp, parity, service worker, rendered routes and runtime health.
- Run semantic effect validation after every collector refresh and before release.
- Zero-effect work receives no implementation/product/LIVE metric credit.
- Preserve six routes, four Overview aggregates, ten projects, ten Trends and 24 metrics unless owner-approved.

## Current chains and blockers

1. `operational-source-freshness-refresh-20260818` — immediate recovery complete; delayed Evening checkpoint pending.
2. `trend-implementation:trend-task-vibecoding-3117-agent-skills` — assigned only after checkpoint; requires baseline and actual same-metric effect.
3. `provider-live-readiness-ezohata-finance` — `BLOCKED_BY_OWNER`, `0/4`.
4. Immutable history — `1/7` for week ending Aug 16.
5. Psihotavr identity — unresolved.

## Next durable actions

1. Complete the delayed Aug 22 same-source checkpoint and independent closure.
2. Make zero-effect semantic validation release-invariant and reclassify five live queue items truthfully.
3. Restore one non-duplicating prospective immutable-history publisher, then complete one named product denominator item.

## Environment variable names

Values never enter durable memory. Known names: `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
