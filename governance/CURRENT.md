# Current AI System State

Last weekly refresh: `2026-09-26`

## Operating model

- `ai-projects-brain` is the durable source of truth for catalog, mappings, governance, goals, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable receipts, assignments, chains, collectors and dashboard/API publication.
- Weekly Brain Refresh aggregates durable evidence only; it does not calculate daily metrics, publish live data or implement product work.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management | `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_AND_PUBLISHER_BLOCKED` | Provider re-read 2026-09-26 12:37–12:40 UTC: 2/7 core APIs return 200, four return stale-data 503 and publication-current returns 500. Canonical source is `2026-09-15T11:34:55.858Z`, age 265.1h; the newest production deployment is still `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp` from Sep 15. |
| Runtime-data architecture | restored on `main`, not activated | Repository `main` has a Sep 18 source and PR #607's runtime separation, but production lacks scoped read access and one runnable sole publisher. Repository freshness and production freshness remain different facts. |
| Health semantics | fixed in source, absent from production | PR #613 correctly maps unavailable operational data to one source error plus 16 `NOT_EVALUATED` checks. Canonical live still emits the old false `8 passed / 10 failed / 8 errors / 2 warnings` model. |
| Immutable history | live health `3/7`, stale window | Canonical health still reports missing Sep 9–12. The Sep 14–20 review found 3/7 current-week history. Missing days are not backfilled. |
| Weekly review publication | repository Sep 14–20; live Aug 17–23 | PR #614 is merged and records 0/6 canonical `LIVE_VERIFIED`; live `/api/weekly-delivery-system-review` remains a month behind. |
| Trends pipeline | draft/red/stale | PR #617 has 10 ranked items and honest 12/16 source coverage, but is draft, far behind `main` and red at 539 pass / 49 fail. No merge or deployment is safe. |
| Scheduler registry | `9 ENABLED` management roles; no implementer or publisher | Morning System Upgrade and the three publication/recovery schedulers remain disabled. Daily Strategic Priorities preserves an assignment to the disabled executor with `implementation_authorized=false`. |
| Delivery backlog | 56 open, zero current-sweep conversion | Sep 26 inventory across 31 repos: 41 stale, 31 nonmergeable, 13 drafts; PR Delivery processed PR #617 and returned it for semantic regeneration, with 0 merge/repair/close. |
| Project catalog | 31 repos; mappings changed | Ten production-overlay identities and 21 meaningful records remain. `psitrends-ops` is a related operations repo, not a new product. PsiTrends and Books live/source mappings were reconciled. |
| Memory sync | unavailable/stale | `/api/data` fails closed, so current `memory_sync_status` cannot be read. No durable sync acknowledgement is inferred. |
| Durable boundary | preserved | Documentation/catalog/index changes only: `NO_DIRECT_METRIC_EFFECT`. |

## Weekly operational synthesis

- The merged Sep 14–20 Weekly Delivery System Review counted six chains, 0/6 canonical `LIVE_VERIFIED`, zero numeric/product gains, 3/7 immutable history, 26 PRs created / 24 merged, 77 failed Actions runs of 120, and PR Delivery at 0 merges / 1 repair.
- Sep 21–25 closure receipts show the same Brain production at 2/7 while source age grew from 156.5h to 252.4h. Direct provider re-read on Sep 26 measured 265.1h. This is one continuing freshness failure, not five new failures.
- PR #613 is a reusable observability improvement: dependency outage must block dependent checks as `NOT_EVALUATED`, not fabricate schema/formula defects from an error body. It is not live and receives no operational credit.
- Current Trends work is correctly blocked before implementation. PR #617 cannot be mechanically rebased into acceptance because its failures include collector v5/v6 semantic drift, stale data and browser dependencies.
- Public user-facing work shipped in Holistic House and PsiTrends, but the operational effect receipts contain no assigned same-source product/business metric. These releases receive no dashboard-metric credit.

## Catalog reconciliation

- GitHub owner inventory is now 31 repositories; the fixed production overlay remains ten identities and the extended memory catalog remains 21 records.
- PsiTrends canonical live is https://psitrends.com. `andylitvinov-design/sales` is the public client/content source, `andylitvinov-design/psitrends-ops` is the sanitized production-operations source, and `andylitvinov-design/psitrends-work` is coordination/catalog rather than a runnable app repo. Historical `psitrends.pages.dev` is a legacy alias, not canonical production.
- Books canonical live is now https://holistichouse.vercel.app on the existing `codex-public-book-library` Vercel project and `codex/public-book-library` source branch. The old `codex-public-book-library.vercel.app` alias redirects to Holistic House.
- Psihotavr remains `IDENTITY_UNRESOLVED`; no replacement source was invented.

## Durable root-cause candidate

Canonical machine record: `governance/durable-root-cause-candidate-2026-09-26.json`.

- code: `RUNTIME_DATA_ACTIVATION_OWNER_BLOCK_AND_PUBLISHER_CAPACITY_GAP`
- affected metric: `publication_freshness`
- raw baseline: canonical source age 265.1h against 18h; 2/7 core APIs HTTP 200; no production deployment after Sep 15
- owner: Brain Management Vercel project owner for scoped read access, then exactly one enabled publisher; Evening Delivery Closure verifies
- smallest safe correction: configure the existing read-only runtime credential, regenerate/accept one fresh atomic source, perform one bounded exact-main activation, restore one sole publisher and prove a later no-deploy refresh
- expected effect: current source <=18h and 7/7 coherent APIs; no metric credit until canonical and delayed rereads prove it

## Sync status

- durable catalog: `RECONCILED_IN_PR_193_2026-09-26`
- operational control plane: `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_AND_PUBLISHER_BLOCKED`
- memory boundary: `PRESERVED`
- scheduler registry: `9_ENABLED_NO_PRIMARY_IMPLEMENTER_NO_ROUTINE_PUBLISHER`
- immutable history: `3/7_LIVE_STALE_WINDOW; SEP_14_20_REVIEW_3/7`
- weekly publication: `SEP_14_20_ON_REPOSITORY_MAIN; LIVE_STALE_AT_2026-08-23`
- durable direct metric effect: `NO_DIRECT_METRIC_EFFECT`

## Next three highest-value actions

1. Configure scoped runtime read access, regenerate a fresh atomic source and prove one exact-main activation with 7/7 APIs and PR #613 semantics live.
2. Restore exactly one scheduler-backed publisher and prove a later source refresh without a Vercel deployment, then obtain delayed independent closure.
3. Semantically regenerate PR #617 on current `main`, preserve honest 12/16 evidence, and keep task 11918 blocked until both current source and exact denominator eligibility exist.
