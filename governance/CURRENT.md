# Current AI System State

Last weekly refresh: `2026-10-10`

## Operating model

- `ai-projects-brain` is the durable source of truth for catalog, mappings, governance, goals, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable receipts, assignments, chains, collectors and dashboard/API publication.
- Weekly Brain Refresh aggregates durable evidence only; it does not calculate daily metrics, publish live data or implement product work.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management | `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_PUBLISHER_AND_EFFECT_BINDING_BLOCKED` | Accepted live probe on 2026-10-10 10:31 UTC: 2/7 core APIs return 200, five return 503, and publication-current returns 500. Canonical source is `2026-09-15T11:34:55.858Z`, age 598.9h; newest production deployment remains `dpl_6rYMy6EN8ociQvWdUEydJxvFXNpp` from Sep 15. |
| Runtime-data architecture | restored on `main`, not activated | Repository source is `2026-09-18T18:26:12.350Z`, age 520.6h at the latest ranking. Production still lacks scoped read access and one runnable sole publisher. |
| Publication repair | current-base, honestly red | PR #629 is reconciled to current `main` with a task-only seven-file diff and zero branch lag. Its exact-head Mobile Release Bundle correctly fails on stale operational data; this is not release acceptance. |
| Trends replacement | current-base, gate missing | PR #649 preserves ten ranked items, task 11918 and terminal continuity on a task-only three-file diff, but no accepted complete final-head gate exists. Canonical queue remains stale. |
| Immutable history | current window `3/7` | This is partial recovery from `0/7`, not a complete week. Routine handoff receipts are not substituted for missing scored snapshots. |
| Weekly review publication | repository Sep 28–Oct 4; live Aug 17–23 | Latest complete repository review has 21 normalized chains, 13 live, zero numeric gains and 0/7 scored days; live publication remains stale. |
| Scheduler registry | `9 ENABLED` recurring management roles; no implementer or publisher | Thirteen automations are enabled overall: nine management, three unrelated feedback collectors and one finite Holistic House release attempt. The one-shot task is not recurring capacity. |
| Delivery backlog | 60 open; 0 current-sweep merges | Oct 10 inventory: 46 stale, 33 nonmergeable and 7 CI-failing. PR Delivery repaired two current-base branches but produced no merge or metric effect. |
| Product/effect conversion | real live delivery, zero measured gain | Latest complete review has 13/18 product/business chains live and 0/21 numeric gains. Oct 9 closure groups 17 Holistic House product classes, but no same-source outcome metric was assigned before release. |
| Project catalog | 31 repos; mappings stable | Ten production-overlay identities and 21 meaningful records remain. Psihotavr stays unresolved. |
| Memory sync | stale claim, current sync unproven | Repository `data-current.json` says `CURRENT_SOURCE_RECONCILED`, but its source is Sep 18 and canonical `/api/data` fails closed. |
| Durable boundary | preserved | Documentation/catalog/index changes only: `NO_DIRECT_METRIC_EFFECT`. |

## Weekly operational synthesis

- The Sep 28–Oct 4 Weekly Delivery System Review counted 21 normalized chains, 13/21 canonical live results, 13/18 product/business live results, zero verified numeric gains, rework at least 8/21 and immutable history 0/7.
- Brain Management produced 13 receipt-only merges and 79 Actions runs; 73 runs failed. Runtime publication was 0/47, canary 0/13 and Mobile Release Bundle 0/5.
- Current Oct 10 evidence improves scored history to 3/7 and reduces the owner-wide PR inventory to 60, but the control plane remains 2/7 and the production source is 598.9h old.
- PR Delivery correctly rebuilt PRs #629 and #649 from the current base tree instead of treating a merge parent as proof of content parity. #629 remains red for the right reason; #649 still lacks accepted validation.
- Holistic House recovered from the temporary deploy-capacity constraint: production `dpl_2v8wUAassBMwRTU5UTLbGfiCmSZu` is READY from exact branch head `df9f5dcb…`, with public acquisition, academy and assessment routes independently re-read. Protected `/en/app` remains owner-session dependent.
- Product throughput and effect throughput are now visibly separate. Shipping 13 product/business chains to live did not change a dashboard metric because no immutable denominator event and same-source outcome measure were assigned before implementation.

## Catalog reconciliation

- GitHub owner inventory remains 31 repositories; the fixed production overlay remains ten identities and the extended memory catalog remains 21 records.
- Books remains one project identity on `andylitvinov-design/books`, production branch `codex/public-book-library`, Vercel project `prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b` and canonical alias https://holistichouse.vercel.app.
- PsiTrends remains one Joomla/Hetzner project across `sales`, `psitrends-ops` and `psitrends-work`; no duplicate identity was created.
- Psihotavr remains `IDENTITY_UNRESOLVED`; no replacement source or provider target was inferred.

## Durable root-cause candidate

Canonical machine record: `governance/durable-root-cause-candidate-2026-10-10.json`.

- code: `PREASSIGNED_EFFECT_METRIC_GATE_NOT_ENFORCED_ACROSS_PRODUCT_RELEASES`
- affected metric: `product_delivery_rate`
- raw baseline: last accepted published value `1/4`; latest complete review shipped 13/18 product/business chains live while verified numeric gains remained `0/21`; 17 Holistic House product classes in the Oct 9 closure lacked assigned same-source metrics
- owner: Daily Strategic Priorities enforces eligibility; the product/release owner provides the measurable event; Evening Delivery Closure performs the unchanged-formula reread
- smallest safe correction: before the next product assignment, require one immutable denominator event, current baseline source, exact expected transition and canonical reread path; return `NO_COMPATIBLE_METRIC` when no valid mapping exists
- expected effect: one future eligible live release can enter one named numerator; `1/4 → 2/4` is conditional and receives no credit until the same-source canonical reread proves it

## Sync status

- durable catalog: `RECONCILED_IN_PR_193_2026-10-10`
- operational control plane: `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_PUBLISHER_AND_EFFECT_BINDING_BLOCKED`
- memory boundary: `PRESERVED`
- scheduler registry: `9_ENABLED_RECURRING_MANAGEMENT_NO_PRIMARY_IMPLEMENTER_NO_ROUTINE_PUBLISHER`
- immutable history: `3/7_CURRENT_WINDOW`
- weekly publication: `SEP_28_OCT_4_ON_REPOSITORY_MAIN; LIVE_STALE_AT_2026-08-23`
- durable direct metric effect: `NO_DIRECT_METRIC_EFFECT`

## Next three highest-value actions

1. Configure scoped runtime read access, generate one fresh atomic source and take PR #629 through a complete green unchanged-head gate before exact-main activation and a 7/7 canonical reread.
2. Restore exactly one scheduler-backed publisher, prove a later no-deployment source refresh and accumulate seven prospective immutable snapshots before delayed closure.
3. Enforce the preassigned effect-metric gate on one concrete product chain before implementation; do not grant retrospective metric credit to already-live uninstrumented releases.
