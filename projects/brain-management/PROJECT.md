# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-10-17

State: `DEGRADED_FRESH_SOURCE_NOT_CONSUMED_RUNTIME_PUBLICATION_AND_CLOSURE_UNOWNED`.

Latest accepted canonical observation at 2026-10-17 12:29 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity`, `/api/needs-attention` and `/api/strategic-priorities` return 503;
- `/api/control-plane-health` and `/api/weekly-delivery-system-review` return 200, so the canonical core is 2/7;
- shared live source is `2026-09-15T11:34:55.858Z`, age 768.9h;
- `/api/data-publication-current` returns 500 `FUNCTION_INVOCATION_FAILED`;
- live weekly review still ends 2026-08-23;
- latest production deployment remains `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp`, created 2026-09-15 11:45 UTC;
- `/sw.js` remains reachable, but shell reachability is not operational recovery.

## Repository/live producer-consumer split

Repository `data-current.json` was generated at `2026-10-17T10:03:30.883Z`; its atomic manifest followed at `2026-10-17T10:03:34.904Z`. Repeated automated refresh commits prove the source producer is operating. The artifact says `READY_FOR_PRODUCTION`, carries 24 metrics and ten operational projects, and preserves the published `1/4` delivery baselines.

No canonical consumer has made that source live. Repository freshness therefore receives no publication or metric credit. The controlling repair is now one runtime publication consumer, exact manifest attribution, 7/7 reread, a second no-deploy refresh and independent closure—not another source generator.

## Continuity and publication gaps

- Repository has prospective daily snapshots for Oct 13–17: `5/7` for the Oct 11–17 window. Oct 11–12 remain missing and are not backfilled.
- Live health reports only `3/7`; repository and canonical continuity are not in parity.
- Repository weekly history reaches Oct 5–11; live remains Aug 17–23.
- Repository `memory_sync_status` says `CURRENT_SOURCE_RECONCILED`; canonical live cannot serve that source, so production sync is stale/unproven.
- The current publication receipt remains `MERGED_WAITING_DEPLOY` with no deployment id, source SHA or canonical alias verification.

## Trends and effect state

- Revalidation is fresh and reports 12/16 source completeness.
- The implementation queue was generated `2026-09-11T16:09:44.452Z`, has 0/10 sources inside the current 20-day window and contains discovery-only material.
- Task `trend-task-arxiv-org-abs-2609-11918v1` remains `implementation_authorized=false`; no exact denominator event exists.
- Last accepted Product Delivery, Task Success and Live Completion remain `1/4`. Repository publication freshness marked current conflicts with canonical 503 evidence and is not treated as a gain.

## Automation and ownership state

- Eight recurring management automations are enabled out of thirteen enabled automations overall.
- Morning System Upgrade is disabled; no enabled primary implementer exists.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch are disabled; no enabled routine publisher exists.
- Evening Delivery Closure is disabled; its last persisted receipt is Oct 13, so no enabled independent terminal closer exists.
- Product/research schedules and feedback collectors do not fill these management roles.
- Oct 17 PR inventory is 90 open, 76 owner-blocked, 51 conflicted, 46 stale, 29 CI-failing and 35 drafts. The current sweep converted zero.

## Weekly efficiency evidence

- Oct 5–11: 25 stable chains, 17 canonical live, 17/21 product/business live and 0/25 numeric gains.
- Brain Management: 18 PRs created, 17 receipt-only merges and zero metric credit.
- GitHub Actions: 6 success, 78 failure and 1 cancelled.
- Documentation and this capsule are `NO_DIRECT_METRIC_EFFECT`.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- A source producer is not a publication consumer.
- Operational data stays outside static release bundles and is read through the guarded runtime source.
- A 200 fallback cannot override source-dependent 503s.
- Repository `READY_FOR_PRODUCTION` is not canonical freshness.
- Missing history is never fabricated.
- A disabled scheduler cannot own executable publication or terminal closure.
- Zero-effect, blocked and documentation work receives no metric/product credit.

## Current blockers and next actions

1. Route the already-current atomic manifest through exactly one enabled runtime publication consumer; do not add another source-refresh path.
2. Prove publication-current 200, 7/7 exact-source APIs and deployment/source attribution, then a second source refresh within 12h without an application deployment.
3. Re-enable or assign exactly one independent terminal closer and require delayed same-source closure.
4. Keep task 11918 unauthorized until current queue evidence and immutable denominator causality both pass.

## Environment variable names

Values never enter durable memory. Known names: `BRAIN_RUNTIME_GITHUB_TOKEN`, `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.
