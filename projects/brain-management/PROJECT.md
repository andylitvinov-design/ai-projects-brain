# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable operational receipts, assignments, delivery chains, Trends, projects, and the installable web/PWA client.

## 2. Canonical targets

- production web/PWA: https://brain-management.vercel.app
- repository: `andylitvinov-design/brain-management`
- production branch: `main`
- provider: Vercel team `super10`
- canonical Vercel project: `brain-management`, id `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`
- Finance source of truth: `andylitvinov-design/ezohata-finance`

Legacy Netlify/Cloudflare, deployment-specific URLs, and temporary Vercel probe/recovery projects are historical or diagnostic only.

## 3. Operational APIs

Required canonical routes are `/api/data`, `/api/needs-attention`, `/api/trends`, `/api/strategic-priorities`, and `/api/agent-productivity`.

HTTP status alone is not proof. Verify content type, JSON body, source timestamp, schema/count contracts and canonical alias binding on every route.

## 4. Current durable state — 2026-08-15

Current state: `DEGRADED_STALE_MIXED_GUARD`.

Canonical re-read at 2026-08-15 13:03 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity` and `/api/strategic-priorities` returned HTTP 503 JSON;
- `/api/needs-attention` returned HTTP 200 with the same stale source, so route-consistent fail-closed behavior is broken;
- source timestamp: `2026-08-11T06:08:23.510Z`;
- source age: `102.9h` against the `18h` ceiling;
- `/sw.js` returned 404;
- repository/source/artifact parity remains false.

The fail-closed guard still prevents four routes from serving stale data as current, but current liveness, the fifth-route contract and PWA publication are unhealthy.

## 5. Durable improvements and corrections

- Aug 9 Sunday review separated behavior recovery from source-parity closure and corrected a false `LIVE_VERIFIED` claim to `LIVE_BEHAVIOR_VERIFIED_SOURCE_PARITY_OPEN`.
- The seven-day history window now anchors to the current canonical date and exposes missing days.
- Rule lifecycle remains last accepted at `6 active/9`; no new rule was activated merely to increase the score.
- Morning System Upgrade is confirmed enabled; the current defect is assignment/capability handoff, not scheduler absence.
- Aug 15 proved `CAPABILITY_CONTEXT_OMITTED`: ranking ignored the connected direct Vercel production channel and therefore emitted no executable assignment.
- No product/business live closure was proven in the latest complete weekly scorecard.

## 6. Current chains and blockers

1. `production-source-parity-recovery-20260806` — Brain Regression Guard owner; nonterminal.
2. `provider-live-readiness-ezohata-finance` — `BLOCKED_BY_OWNER`, raw input `0/4`.
3. `product-delivery-next-concrete-improvement` — `PIPELINE_INCOMPLETE`; shared raw input `1/4`.
4. Immutable scored history — `0/7` for week ending 2026-08-09.
5. Psihotavr — current repo/provider/live identity unresolved.

## 7. Release and ownership guardrails

- One repository, one `main`, one canonical Vercel project and one canonical origin.
- `LIVE_VERIFIED` is time-bound and requires fresh canonical re-read.
- Never publish pointer, local-path, reduced, snapshot-only or hand-crafted shells.
- Code and operational datasets must be packaged atomically from one current cycle.
- Direct deployments require exact project/production binding, source SHA, dependency-closed manifest, required routes/assets and post-alias verification.
- GitHub Actions billing is not an exhaustive release blocker while the authenticated connected Vercel route is available.
- Tool availability does not transfer the release-owner lease or authorize deployment.
- Ranking must include currently verified authorized capability channels.
- Preserve six routes, four Overview aggregates, ten projects, ten Trends and 24 metrics unless an owner-approved contract supersedes them.

## 8. PWA/API verification

Closure requires root, assets, service worker/cache, all five APIs, source timestamps, runtime errors, rendered contract and source/artifact parity. Merge, READY, behavior recovery or a fresh wrapper timestamp alone is insufficient.

## 9. Environment variable names

Only names may be stored; values never enter durable memory.

- `MOBILE_LAUNCH_KEY`
- `STATUS_CALLBACK_SECRET`
- `MOBILE_RUNS`
- `GH_REPO_OWNER`
- `GH_REPO_NAME`
- `GH_WORKFLOW_FILE`
- `GH_WORKFLOW_REF`
- `GH_WORKFLOW_PAT`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_AUTH_SESSION_SECRET`
- `GOOGLE_AUTH_ALLOWED_EMAILS`
- `GOOGLE_AUTH_ALLOWED_DOMAIN`

## 10. Next durable actions

1. Re-rank publication freshness with the connected Vercel channel and explicit single-owner lease.
2. Restore one fresh attributable dependency-closed artifact and verify 5/5 APIs plus `sw.js`.
3. Resume prospective immutable daily snapshots.
4. After terminal P0 closure, execute one named existing product/business deliverable from `1/4`.
5. Keep protected Finance and Psihotavr identity work separate.

## 11. Verification status

- canonical repo/branch/origin: confirmed
- canonical Vercel project id: confirmed
- current operational freshness: `FAIL_CLOSED_MIXED_WITH_STALE_SUCCESS`
- four canonical operational APIs: 503 stale JSON
- `/api/needs-attention`: 200 stale JSON
- `/sw.js`: 404
- latest known source timestamp: `2026-08-11T06:08:23.510Z`
- source age at re-read: `102.9h`
- max allowed source age: `18h`
- source parity: false
- current recovery owner: Brain Regression Guard
- protected finance balances/provider payloads: intentionally not duplicated
