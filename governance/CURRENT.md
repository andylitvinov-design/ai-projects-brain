# Current AI System State

Last weekly refresh: `2026-10-03`

## Operating model

- `ai-projects-brain` is the durable source of truth for catalog, mappings, governance, goals, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable receipts, assignments, chains, collectors and dashboard/API publication.
- Weekly Brain Refresh aggregates durable evidence only; it does not calculate daily metrics, publish live data or implement product work.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management | `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_PUBLISHER_AND_REPAIR_CHURN_BLOCKED` | Provider re-read 2026-10-03 12:29 UTC: 2/7 core APIs return 200, five return stale-data 503 and publication-current returns 500. Canonical source is `2026-09-15T11:34:55.858Z`, age 432.9h; the newest production deployment is still `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp` from Sep 15. |
| Runtime-data architecture | restored on `main`, not activated | Repository `main` source is `2026-09-18T18:26:12.350Z`, itself 354.1h old. Production lacks scoped read access and one runnable sole publisher. Repository freshness and production freshness remain different facts. |
| Health semantics | fixed in source, absent from production | PR #613 correctly maps unavailable operational data to one source error plus 16 `NOT_EVALUATED` checks. Canonical live still emits the old false `8 passed / 10 failed / 8 errors / 2 warnings` model. |
| Immutable history | repository current window `0/7`; live health stale `3/7` | Only two scored-history files exist, both from July. Current daily receipts are not substitutes and missing days are not backfilled. |
| Weekly review publication | repository Sep 21–27; live Aug 17–23 | Repository weekly history records 0/8 canonical `LIVE_VERIFIED`, but live `/api/weekly-delivery-system-review` remains six weeks behind. |
| Trends pipeline | draft/red/stale | PR #617 remains draft at 539 pass / 49 fail and approximately 101 commits behind `main`. No merge or deployment is safe. |
| Publication overlay repair | focused fix, full gate red | PR #629 converts publication-current's crash to structured fail-closed behavior and focused tests pass 7/7, but the complete weekly-delivery/schema gate is red and receipt-only main movement keeps widening divergence. |
| Scheduler registry | `9 ENABLED` management roles; no implementer or publisher | Twelve automations are enabled overall, including three unrelated feedback tasks. Morning System Upgrade and the three publication/recovery schedulers remain disabled. Daily Strategic Priorities preserves an assignment to the disabled executor with `implementation_authorized=false`. |
| Phone-first control plane | durable routing capability, not scheduler capacity | PR #220 added `systems/mobile-autopilot-control-plane.md` for on-demand web/mobile routing through cloud/connectors. It does not enable Morning System Upgrade, create a publisher or authorize production mutation. |
| Delivery backlog | 62 open; one current-sweep merge awaiting deploy | Oct 3 inventory: 48 stale, 33 nonmergeable, 21 blocked and 8 CI-failing; 78 items wait for deploy or terminal closure. Books PR #85 merged but has no production reread or metric credit. |
| Project catalog | 31 repos; mappings stable | Ten production-overlay identities and 21 meaningful records remain. Books/Holistic House and PsiTrends gained public capabilities without creating new project identities. |
| Memory sync | stale claim, current sync unproven | Repository `data-current.json` still says `CURRENT_SOURCE_RECONCILED`, but its source is Sep 18 and canonical `/api/data` fails closed. No Oct 3 durable sync acknowledgement is inferred. |
| Durable boundary | preserved | Documentation/catalog/index changes only: `NO_DIRECT_METRIC_EFFECT`. |

## Weekly operational synthesis

- The Sep 21–27 Weekly Delivery System Review counted eight chains, 0/8 canonical `LIVE_VERIFIED`, zero numeric/product gains, 0/7 immutable history, 15 Brain PRs created / 12 receipt-only merges, and 77 failed Actions runs of 83.
- Sep 27–Oct 2 closures kept the same Brain production at 2/7 while live source age grew from 300.5h to 420.6h. Direct provider re-read on Oct 3 measured 432.9h. This is one continuing freshness failure, not seven new failures.
- PR #613 is a reusable observability improvement: dependency outage must block dependent checks as `NOT_EVALUATED`, not fabricate schema/formula defects from an error body. It is not live and receives no operational credit.
- PR #629 demonstrates the publication-current fix in focused tests, but its full gate remains red. Repeated receipt-only merges advance `main` without changing the stale source, increasing repair divergence rather than throughput.
- The new mobile autopilot control-plane document is a useful on-demand routing improvement, but it is not evidence of an enabled recurring implementer or publisher.
- Current Trends work is correctly blocked before implementation. PR #617 cannot be mechanically rebased into acceptance because its failures include collector v5/v6 semantic drift, stale data and browser dependencies.
- Public user-facing work shipped in Holistic House and PsiTrends. Books PR #85 is merged and awaits deploy verification. None has an assigned same-source product/business metric, so dashboard-metric credit remains zero.

## Catalog reconciliation

- GitHub owner inventory remains 31 repositories; the fixed production overlay remains ten identities and the extended memory catalog remains 21 records.
- PsiTrends canonical live is https://psitrends.com. `andylitvinov-design/sales` is the public client/content source, `andylitvinov-design/psitrends-ops` is the sanitized production-operations source, and `andylitvinov-design/psitrends-work` is coordination/catalog rather than a runnable app repo. Historical `psitrends.pages.dev` is a legacy alias, not canonical production.
- Books canonical live is now https://holistichouse.vercel.app on the existing `codex-public-book-library` Vercel project and `codex/public-book-library` source branch. The old `codex-public-book-library.vercel.app` alias redirects to Holistic House.
- Psihotavr remains `IDENTITY_UNRESOLVED`; no replacement source was invented.

## Durable root-cause candidate

Canonical machine record: `governance/durable-root-cause-candidate-2026-10-03.json`.

- code: `RUNTIME_DATA_ACTIVATION_BLOCK_REINFORCED_BY_RECEIPT_ONLY_MAIN_CHURN`
- affected metric: `publication_freshness`
- raw baseline: live source age 432.9h against 18h; repository source age 354.1h; 2/7 core APIs HTTP 200; current immutable history 0/7
- owner: Brain Management Vercel owner for scoped read access; control-plane/release-test owner for one current-base PR #629 regeneration; exactly one publisher afterward; Evening Delivery Closure verifies
- smallest safe correction: configure read access, regenerate PR #629 once on current `main` with the full gate repaired, generate one fresh atomic source, activate exact main, restore one sole publisher and stop treating receipt-only main movement as recovery throughput
- expected effect: current source <=18h, 7/7 coherent APIs, structured publication overlay, current weekly review and seven prospective history days; no metric credit until canonical and delayed rereads prove it

## Sync status

- durable catalog: `RECONCILED_IN_PR_193_2026-10-03`
- operational control plane: `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_PUBLISHER_AND_REPAIR_CHURN_BLOCKED`
- memory boundary: `PRESERVED`
- scheduler registry: `9_ENABLED_NO_PRIMARY_IMPLEMENTER_NO_ROUTINE_PUBLISHER`
- immutable history: `0/7_CURRENT_REPOSITORY_WINDOW; LIVE_STALE_3/7_OLD_WINDOW`
- weekly publication: `SEP_21_27_ON_REPOSITORY_MAIN; LIVE_STALE_AT_2026-08-23`
- durable direct metric effect: `NO_DIRECT_METRIC_EFFECT`

## Next three highest-value actions

1. Configure scoped runtime read access; regenerate PR #629 once on current `main`, repair its complete gate and publish one fresh exact-main atomic source with 7/7 APIs and PR #613 semantics.
2. Restore exactly one scheduler-backed publisher, prove a later source refresh without a Vercel deployment and accumulate seven prospective immutable snapshots before delayed closure.
3. Route Books PR #85 through canonical production reread, then semantically regenerate PR #617 without letting receipt-only main churn masquerade as delivery progress.
