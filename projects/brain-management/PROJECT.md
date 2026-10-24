# brain-management

## Purpose

Operational control plane for current metrics, immutable receipts, assignments, delivery chains, Trends, projects and the installable web/PWA client.

## Canonical targets

- production: https://brain-management.vercel.app
- repository / branch: `andylitvinov-design/brain-management` / `main`
- Vercel team/project: `super10` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d`
- durable memory: `andylitvinov-design/ai-projects-brain`

Legacy aliases, deployment URLs and probe projects are noncanonical.

## Current durable state — 2026-10-24

State: `DEGRADED_SOURCE_STALE_RUNTIME_CONSUMER_AND_CLOSURE_ABSENT`.

Latest accepted canonical observation at 2026-10-24 12:45 UTC:

- `/api/data`, `/api/trends`, `/api/agent-productivity`, `/api/needs-attention` and `/api/strategic-priorities` return 503;
- `/api/control-plane-health` and `/api/weekly-delivery-system-review` return 200, so the canonical core is 2/7;
- shared live source is `2026-09-15T11:34:55.858Z`, age 937.2h;
- `/api/data-publication-current` returns 500 `FUNCTION_INVOCATION_FAILED`;
- live weekly review still ends 2026-08-23;
- latest production deployment remains `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp`, created 2026-09-15 11:45 UTC;
- `/sw.js` remains reachable, but shell reachability is not operational recovery.

## Repository/live producer-consumer split

Repository `data-current.json` was last generated at `2026-10-19T18:23:04.422Z`; its atomic manifest followed at `2026-10-19T18:32:51.145Z`. It says `READY_FOR_PRODUCTION`, carries 24 metrics and ten operational projects, and preserves the published `1/4` delivery baselines. No later source or manifest exists, so the producer itself is now stale at about 114 hours and prior-week cadence is not current evidence.

No canonical consumer has made the October source live. Repository self-reports of current sync, safe deployment or alias verification conflict with live evidence and receive no publication or metric credit. The controlling repair is the existing chain through one safe current-main PR, one runtime consumer, exact manifest attribution, 7/7 reread, a later no-deploy refresh and independent closure.

## Continuity and publication gaps

- Repository has only Oct 18–19 prospective snapshots for the Oct 18–24 window: `2/7`. Oct 20–24 are missing and are not backfilled.
- Live health reports only `3/7`; repository and canonical continuity are not in parity.
- Repository weekly history reaches Oct 12–18; live remains Aug 17–23.
- Repository `memory_sync_status` says `CURRENT_SOURCE_RECONCILED`; canonical live cannot serve that source, so production sync is stale/unproven.
- PR #691 is behind current main, conflicting, removes continuity records and fails both exact-head release gates. It must be rebuilt from current main before it can be a publication vehicle.

## Trends and effect state

- Revalidation and Trends source data stopped on Oct 19; the implementation queue remains older still.
- The implementation queue was generated `2026-09-11T16:09:44.452Z`, has 0/10 sources inside the current 20-day window and contains discovery-only material.
- Task `trend-task-arxiv-org-abs-2609-11918v1` remains `implementation_authorized=false`; no exact denominator event exists.
- Last accepted Product Delivery, Task Success and Live Completion remain `1/4`. Repository publication freshness marked current conflicts with canonical 503 evidence and is not treated as a gain.

## Automation and ownership state

- Eight recurring management automations are enabled out of fourteen enabled automations overall.
- Morning System Upgrade is not enabled; no primary implementation scheduler owns the chain.
- Daily Dashboard Update is not enabled; no routine publication scheduler owns the chain.
- Evening Delivery Closure is not enabled; no independent terminal closer owns the chain.
- Product/research schedules and feedback collectors do not fill these management roles.
- Oct 24 PR inventory is 185 open, 146 owner-blocked, 160 conflicting/unknown, 123 CI-failing, 83 stale and 101 drafts. The current sweep converted zero.

## Weekly efficiency evidence

- Oct 12–18: seven stable chains, one canonical live, zero numeric gains and product:infrastructure activity 4:3.
- Brain Management: 24 PRs created, 23 merged and zero metric credit; PR Delivery accepted zero merges and repaired zero.
- Current partial window: repository history 2/7, producer last ran Oct 19, and product/task/live remain 1/4.
- Documentation and this capsule are `NO_DIRECT_METRIC_EFFECT`.

## Release guardrails

- One repo, one `main`, one canonical Vercel project and one canonical origin.
- A source producer is not a publication consumer, and prior-week producer health is not current cadence evidence.
- Operational data stays outside static release bundles and is read through the guarded runtime source.
- A 200 fallback cannot override source-dependent 503s.
- Repository `READY_FOR_PRODUCTION` is not canonical freshness.
- Missing history is never fabricated.
- A disabled scheduler cannot own executable publication or terminal closure.
- Zero-effect, blocked and documentation work receives no metric/product credit.

## Current blockers and next actions

1. Repair existing PR #691 from current main while preserving continuity records; pass both unchanged-head release gates.
2. Restore exactly one source producer/publication executor, perform one canonical deployment, then prove publication-current 200 and 7/7 exact-source APIs.
3. Prove a second source refresh within 12h without an application deployment and require delayed independent closure.
4. Keep task 11918 unauthorized until current queue evidence and immutable denominator causality both pass.

## Environment variable names

Values never enter durable memory. Known names: `BRAIN_RUNTIME_GITHUB_TOKEN`, `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`.

## 10. Runtime-data architecture — restored on main, activation blocked 2026-09-19

Brain Management PR #607 (merge `cfb7b2d99598fb51921197ec7956df7e51022d8f`) re-applied the storage-safe runtime-data separation from PRs #597–#599 on current `main` after the PR #602 regression. It restored static-only release packaging, guarded runtime readers, lazy agent-productivity reads, data-only collection, deployable-content hashing, and a normal-suite regression guard while retaining the newer bounded pilots.

The repository architecture state is now `RESTORED_ON_MAIN_BLOCKED_BY_OWNER`, not `REGRESSED_NOT_LIVE` and not `LIVE_VERIFIED`. Mobile Release Bundle #1250 passed on the repair head, and the Sep 18 repository snapshot is coherent, but canonical production still served the Sep 15 snapshot at age 95.0h with four operational APIs fail-closed on 2026-09-19.

The existing Vercel project owner must configure `BRAIN_RUNTIME_GITHUB_TOKEN` with fine-grained, read-only Contents access to `andylitvinov-design/brain-management`; the value must never enter a repository or receipt. Activation then requires the exact-main single-deploy guard, at most one material application deployment, a canonical 7/7 API reread, and a subsequent guarded runtime-source update that creates no deployment. Until that sequence and delayed closure pass, production remains `BLOCKED_BY_OWNER`.

## 11. Next durable actions

1. Activate the restored PR #607 runtime-data path only after the scoped Vercel read credential exists; pass the exact-main deploy guard, verify 7/7 canonical APIs, then prove a guarded source refresh with no new deployment.
2. Keep the current live contract stable while future honest daily snapshots accumulate.
3. Select one concrete existing deliverable for the shared `1/4` delivery-conversion input; preserve one implementation owner.
4. Complete the EzoHata Finance owner-session/read-only provider proof without copying protected finance data.
5. Add metric-level evidence references and a supported operational closure-write path when safe.

## 12. Verification status

- canonical repo/branch/origin: confirmed
- production terminal state: `BLOCKED_BY_OWNER` pending restored runtime-source activation
- six bottom routes: confirmed
- four Overview aggregates: confirmed
- `/api/data`: 503 stale fail-closed on 2026-09-19; repository source is newer but not activated
- `/api/trends`: 200 stale fallback on 2026-09-19; it must not be treated as current production evidence
- `/api/agent-productivity`: 503 stale fail-closed on 2026-09-19
- `/api/needs-attention`: 503 because canonical current data is unavailable
- `/api/strategic-priorities`: 503 because canonical current data is unavailable
- manifest shortcuts: six
- service worker: `brain-management-v67`
- runtime error cluster: none in the verified deployment
- exact private finance balances: intentionally not duplicated

## 13. Publisher activation progress — source current, production still blocked 2026-10-13

Brain Management `main` now contains the scheduled refresh, runtime-data publication and production-canary workflow chain. The first accepted cycle produced fresh atomic sources at `2026-10-13T05:37:55.827Z`: Refresh Operational Data run #2 succeeded, Publish Runtime Data run #207 succeeded, and source/runtime commits `76bec283a840e5c508a9666257342d6a1c0989f7` and `9192b0cd5dd051c96bf84aca13f513e375786280` reached `main`.

This is not `LIVE_VERIFIED`. Production Canary runs #811 and #812 failed on the production-contract step. At the 2026-10-13 10:30 UTC terminal reread, the canonical APIs still served the September snapshot: `/api/data` and `/api/trends` returned HTTP 503 at age 670.9h, `/api/data-publication-current` returned HTTP 500, and control-plane health remained `DEGRADED` with immutable history 3/7. The durable state is therefore `FRESH_SOURCE_ON_MAIN_PRODUCTION_CANARY_FAILED_BLOCKED_BY_OWNER`.

Next owner remains the Brain Management Vercel project owner together with the source/release-test owner: provide the configured read-only runtime source path, reconcile the existing fail-closed overlay PR on current `main`, obtain a green unchanged-head release gate, and prove the canonical 7/7 API reread plus two consecutive publisher intervals before terminal closure. No source commit, workflow success or merge alone receives metric credit.


## 14. Trends queue continuity regression — repair held 2026-10-14

The Oct 14 scheduled source refresh reached `main` at commits `518b05d333510b47233da3ac996e142e53f4c584` and `48021f120fa90921e78df6033ae5946311255b08`, but regenerated `trends-data.json` as ten `READY` implementation rows owned by Morning System Upgrade. That projection omits the preserved task `trend-task-arxiv-org-abs-2609-11918v1` lease, its eight terminal records and the explicit `implementation_authorized=false` gate from the accepted Oct 13 Strategic handoff. Collection remains discovery; it cannot create execution authority or terminate/reassign the existing lease.

Brain Management PR #674 is the current bounded repair. Its branch separates the ten discoveries from the durable implementation queue, restores task 11918 plus terminal history, and adds a compact runtime artifact proof. It is not merge-ready: exact head `d76ce9b312890407bd1f26cbca6a550391d3cc89` is 11 commits behind and 12 ahead of current `main`, has no exact-head hosted workflow result, and the PR itself holds the main merge until the collector/publication scope is explicitly cleared. PR #675 was merged only into the #674 feature branch and is not a canonical-main release.

Production is still the first broken boundary. On the 2026-10-14 10:34 UTC reread, only 2/7 core APIs returned HTTP 200; `/api/data` and `/api/trends` remained fail-closed on the Sep 15 snapshot at about 695.0h age, `/api/data-publication-current` returned HTTP 500, and immutable history remained 3/7. The durable state is `FRESH_SOURCE_QUEUE_CONTINUITY_REGRESSED_PRODUCTION_BLOCKED_BY_OWNER`.

Next owner remains the Brain Management source/release-test owner for a current-main, unchanged-head repair of #674; the Vercel project owner must then provide the scoped read-only runtime credential and publication activation. Terminal proof still requires the canonical 7/7 API reread, the preserved sole lease with no competing assignments, two publisher intervals within 12h, immutable history 7/7, and delayed closure. Source refresh, branch CI, feature-branch merge, main merge, deployment or queue generation alone receives zero metric credit.

## 15. Trends queue continuity restored on main; production activation still blocked — 2026-10-15

Brain Management PR #674 was squash-merged to `main` at `d42102842d176126a01cd2d72f5c275ada23c0b6` after the exact-head Mobile Release Bundle and Trends workflows passed. PR #680 followed at `d57bcdb09acfc03550150d4edb6fd02c5d368487` to align the runtime-package validator. The Oct 15 source/runtime commits `a0ab1b20e39542b92d7455cadca8e1af4f1355bb` and `25560229ba14928c42bd1c5521b1e1128cab9abd` now preserve eight terminal queue records, READY tasks 11918 and 11923, and the sole task-11918 lease with `implementation_authorized=false`. Ten fresh discoveries remain discovery evidence rather than competing assignments.

This restores source and queue continuity but does not restore production. At the 2026-10-15 10:29 UTC reread, only 2/7 core endpoints returned HTTP 200; `/api/data` and `/api/trends` were fail-closed on the Sep 15 snapshot at about 718.9h age, `/api/data-publication-current` returned HTTP 500, control-plane health remained `DEGRADED` at 8 passed / 10 failed / 8 errors, and the Weekly Delivery System Review still exposed its Aug 23 generation. The Oct 14 closure branch recorded a transient `402 DEPLOYMENT_DISABLED` incident, but current production responds with the older stale 503 contract; that branch-only receipt must not replace the current terminal reread.

The durable state is `QUEUE_CONTINUITY_RESTORED_ON_MAIN_PRODUCTION_ACTIVATION_BLOCKED_BY_OWNER`. The Vercel project owner must restore/confirm serving entitlement and configure the scoped read-only runtime source credential; the source/release owner must reconcile publication parity and obtain a green unchanged-head publication gate. Terminal proof still requires canonical 7/7 API bodies, current immutable history, two publisher intervals within 12h, the preserved sole lease without competing assignments, and delayed closure. Merge, source freshness, queue restoration, workflow success or deployment alone receives zero metric credit.



## 16. Queue continuity preserved but the implementation queue is stale — 2026-10-17

The scheduled source/runtime path remains active on `brain-management/main`: the 17 October atomic source and runtime commits are `d8f2545fa9af9a7bc909a526d031cff5926a754a` and `b3770cf33ffa818e4222e074660011e01287cf84`. The current repository source was generated at `2026-10-17T10:03:30.883Z`, and collector availability remains an honest `12/16` (11 checked with evidence, one checked with no relevant item, four temporarily unavailable).

Queue ownership continuity is still preserved, but queue freshness is not. `trends-data.json` retains eight `EVALUATED_NO_EFFECT` terminal records, READY tasks 11918/11923 and the sole task-11918 lease with `implementation_authorized=false`; however, `implementation_queue_generated_at` remains `2026-09-11T16:09:44.452Z`. Zero of the 10 implementation-queue sources fall inside the current 20-day window `2026-09-27 — 2026-10-17`, while the discovery-only queue has grown to 39 records. Collection does not grant execution authority, so those records must not become competing owners.

Production remains the first broken publication boundary. At the 2026-10-17 10:33 UTC reread, only 2/7 core APIs returned HTTP 200; five failed closed at HTTP 503 on the `2026-09-15T11:34:55.858Z` snapshot (767.0 hours old), `/api/data-publication-current` returned HTTP 500, control-plane health remained `DEGRADED` at 8 passed / 10 failed / 8 errors, immutable history remained 3/7, and Weekly Review still exposed the Aug 23 artifact. Repository `publication_freshness=current` therefore receives zero production or metric credit.

The durable state is `QUEUE_CONTINUITY_PRESERVED_IMPLEMENTATION_QUEUE_STALE_PRODUCTION_BLOCKED_BY_OWNER`. The Trends collector/source publisher must produce one current, source-backed exact-10 queue from the discovery evidence while preserving the eight terminal records and sole unauthorized task-11918 lease. Daily Strategic Priorities may rank it only after that boundary is current. The Vercel project/source-release owners still must obtain a green unchanged-head publication gate and prove canonical 7/7 API bodies, structured publication-current HTTP 200, immutable history 7/7, two publisher intervals within 12 hours and delayed closure. Source refresh, queue generation, ranking, merge or deployment alone receives zero metric credit.
