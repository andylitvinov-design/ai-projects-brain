# Current AI System State

Last weekly refresh: `2026-10-17`

## Operating model

- `ai-projects-brain` is the durable source of truth for catalog, mappings, governance, goals, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable receipts, assignments, chains, collectors and dashboard/API publication.
- Weekly Brain Refresh aggregates durable evidence only; it does not calculate daily metrics, publish live data or implement product work.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management | `DEGRADED_FRESH_SOURCE_NOT_CONSUMED_RUNTIME_PUBLICATION_AND_CLOSURE_UNOWNED` | Canonical probe on 2026-10-17 12:29 UTC: five operational APIs return 503; health and weekly review return 200; publication-current returns 500. Live source is `2026-09-15T11:34:55.858Z`, age 768.9h. |
| Repository source | current producer, pending publication | `data-current.json` and the atomic source manifest were regenerated on 2026-10-17 around 10:03 UTC. Repeated automated source commits prove the producer works, but `READY_FOR_PRODUCTION` is not live evidence. |
| Runtime publication | consumer/activation absent | No new production deployment exists after `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp` on Sep 15. The canonical publication endpoint fails with 500 and no deployment/source attribution closes the fresh repository artifact. |
| Immutable history | repository `5/7`; live health `3/7` | Prospective snapshots exist for Oct 13–17. Oct 11–12 remain missing. Repository continuity is improving but production parity is not proven. |
| Weekly review publication | repository Oct 5–11; live Aug 17–23 | Latest complete review has 25 stable chains, 17 canonical live, 17/21 product/business live and 0/25 numeric gains. Live weekly publication remains stale. |
| Scheduler registry | `8 ENABLED` recurring management roles; no implementer, publisher or terminal closer | Thirteen automations are enabled overall. Evening Delivery Closure is now disabled; product/research automations do not fill management ownership gaps. |
| Delivery backlog | 90 open; 0 current-sweep conversions | Oct 17 inventory: 76 owner-blocked, 51 conflicted, 46 stale, 29 CI-failing and 35 drafts. PR Delivery merged, repaired and closed zero. |
| Product/effect conversion | real live delivery, zero measured gain | Latest complete review records 17/21 product/business chains live and 0/25 numeric gains. Product availability is not same-source metric evidence. |
| Trends | collector current, implementation queue stale | Revalidation is fresh, but the implementation queue was generated Sep 11, has 0/10 sources in the current 20-day window and task 11918 remains unauthorized. |
| Project catalog | 31 repos; mappings stable | Ten production-overlay identities and 21 meaningful records remain. Psihotavr stays unresolved. |
| Holistic House / Books | public production current; protected state partial | Production `dpl_C42NWymgx4Lhuz1X2NsCjPTTchcb` is READY from exact source `a205ee44354694d5db2cfa4d06e5734c9637124f`; canonical public routes reread 200. Protected journeys remain unverified. |
| Memory sync | repository source current; production sync stale | Repository reports `CURRENT_SOURCE_RECONCILED`, but the fresh manifest is not visible on canonical live. The two claims are recorded separately. |
| Durable boundary | preserved | Documentation/catalog/index changes only: `NO_DIRECT_METRIC_EFFECT`. |

## Weekly operational synthesis

- The Oct 5–11 Weekly Delivery System Review counted 25 stable chains, 17/25 canonical live results, 17/21 product/business live results and zero numeric gains. All 17 live results had no measured effect.
- Brain Management recorded 18 PRs created and 17 receipt-only merges. GitHub Actions produced 6 successes, 78 failures and one cancellation. High activity did not restore publication.
- The source producer materially improved: repository operational source and manifest are current on Oct 17, and prospective history reached 5/7. This is source continuity, not production recovery.
- The publication consumer did not improve: production remains Sep 15, operational APIs remain 2/7, publication-current is 500, and no exact source/deployment attribution exists for the Oct 17 artifact.
- Evening Delivery Closure is disabled and its last persisted receipt is Oct 13. The system therefore lacks both a recurring publication owner and an enabled independent terminal closer.
- Holistic House public production advanced to exact source `a205ee44…`; `/en`, `/en/tests`, `/en/services` and `/en/academy` all identify the same deployment. No metric gain is inferred.

## Catalog reconciliation

- GitHub owner inventory remains 31 repositories; the fixed production overlay remains ten identities and the extended memory catalog remains 21 records.
- Books remains one project identity on `andylitvinov-design/books`, production branch `codex/public-book-library`, Vercel project `prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b` and canonical alias https://holistichouse.vercel.app.
- New Holistic House audit and psychological-test research schedules are capabilities within Books/Holistic House, not new project identities.
- Psihotavr remains `IDENTITY_UNRESOLVED`; no replacement source or provider target was inferred.

## Durable root-cause candidate

Canonical machine record: `governance/durable-root-cause-candidate-2026-10-17.json`.

- code: `FRESH_SOURCE_PRODUCER_ACTIVE_BUT_RUNTIME_PUBLICATION_CONSUMER_AND_CLOSURE_OWNER_ABSENT`
- affected metric: `publication_freshness`
- raw baseline: repository source age about 2.4h at check; production source age 768.9h; core APIs 2/7; publication-current HTTP 500; repository history 5/7 versus live health 3/7
- owner: one Brain Management runtime publication owner, Daily Strategic Priorities for executable assignment, and one enabled independent terminal closer
- smallest safe correction: consume the already-fresh atomic manifest through exactly one scoped runtime publisher, require structured publication state plus 7/7 same-source canonical reread, then prove a second refresh without application deployment and independent closure
- expected effect: canonical source age `<=6h`, 7/7 APIs and publication-current 200 are conditional targets; no score or metric gain is credited before canonical reread

## Sync status

- durable catalog: `RECONCILED_IN_PR_193_2026-10-17`
- operational control plane: `DEGRADED_FRESH_SOURCE_NOT_CONSUMED_RUNTIME_PUBLICATION_AND_CLOSURE_UNOWNED`
- memory boundary: `PRESERVED`
- scheduler registry: `8_ENABLED_RECURRING_MANAGEMENT_NO_PRIMARY_IMPLEMENTER_NO_ROUTINE_PUBLISHER_NO_ENABLED_TERMINAL_CLOSER`
- immutable history: `REPOSITORY_5/7; LIVE_HEALTH_3/7`
- weekly publication: `OCT_5_11_ON_REPOSITORY_MAIN; LIVE_STALE_AT_2026-08-23`
- durable direct metric effect: `NO_DIRECT_METRIC_EFFECT`

## Next three highest-value actions

1. Route the existing fresh atomic manifest through exactly one enabled runtime publication consumer; do not create another source-refresh mechanism.
2. Require publication-current 200, 7/7 exact-source APIs, deployment/source attribution, a second `<=12h` no-deploy refresh and independent terminal closure.
3. Re-enable or assign exactly one terminal closer, then restore Oct 11–12 continuity only as explicit gaps while accumulating a complete prospective seven-day window.
