# Automation Registry

Last reconciled: `2026-08-29`

## Registry contract

A recurring role is healthy only when scheduler evidence proves it is enabled, still has future occurrences and its operational assignment is consumable. An operational label does not create an enabled automation. One chain has one implementation owner until terminal state or explicit reassignment.

## Effective recurring roles

| Automation | Exclusive role | Current evidence | Durable health |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover, dedupe, readiness | enabled daily; ran Aug 29 | Active, but its prompt still permits self-merging its own PRs, overlapping PR Delivery ownership. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge hygiene | enabled twice daily; ran Aug 29 | Active; latest weekly scorecard still shows 0 merges/repairs by this stage. |
| Daily Strategic Priorities | ranking and effect binding only | enabled daily; ran Aug 29 | Active; rotated from terminal task 3763 to task 3766, but causal metric eligibility is not proven. |
| Morning System Upgrade | primary implementation of one exact assignment | enabled twice daily; ran Aug 29 | Active; Persistent pilot reached live with zero effect, then queue rotated. Must not retain the old release lock. |
| Evening Delivery Closure | independent verification and terminal closure | enabled daily; ran Aug 29 00:07 UTC | Active; current Aug 29 release still needs independent post-rotation attribution/closure. |
| Weekly Brain Refresh | durable catalog/governance/index reconciler | enabled weekly | Current PR #193; no daily metrics, product code or publication ownership. |
| Sunday Dashboard Review | metric/control-plane architecture | enabled weekly; ran Aug 23 | Found/persisted review-surface and immutable-history continuity defects. |
| Weekly Delivery System Review | delivery-process effectiveness | enabled weekly; ran Aug 23 | Repository scorecard is current through Aug 23; live API is one week behind. |
| Weekly Live Safe Sweep | bounded weekly live checks | enabled weekly | Separate from routine publication and durable catalog ownership. |
| Portfolio Sales Audit | read-only conversion audit | enabled weekly | Separate from control-plane publication and durable reconciliation. |

## Enabled but not effective

- `Finish Trends Rotation` is still marked enabled, but its hourly `COUNT=24` schedule ended on Aug 27 and has no remaining occurrence. State: `ENABLED_BUT_EXHAUSTED`. It must not be counted as current capacity.

## Operational assignment names without enabled schedulers

`/api/data` lists five assignment actors. Morning System Upgrade and Evening Delivery Closure map to enabled schedulers. These three do not:

- Daily Dashboard Update — routine publisher;
- Brain Regression Guard — detection-only;
- Brain Data Freshness Watch — detection-only.

State: `OPERATIONAL_REGISTRY_DRIFT`. The missing publisher is material because freshness has repeatedly crossed the 18-hour gate.

## Ownership health

1. Morning System Upgrade owns only the exact current Trends assignment.
2. Persistent task 3763 is terminal `EVALUATED_NO_EFFECT`; operational release lock/assignment records that still reference it are stale.
3. The next assignment is task 3766, but a release lock cannot silently carry across task identities.
4. Evening Delivery Closure verifies; it does not implement or publish.
5. No enabled recurring routine metrics/history publisher is proven.
6. Weekly Brain Refresh and Weekly Delivery System Review both write durable governance through open PRs #193 and #203; PR #193 is the catalog/governance reconciler and should consume the weekly findings instead of maintaining competing current indexes.
7. Finance remains explicit owner-only work; Psihotavr identity resolution is separate.

## Durable rules

1. Enabled with no future occurrence is `ENABLED_BUT_EXHAUSTED`, not capacity.
2. An assignment name without an enabled scheduler is `UNASSIGNED_IN_SCHEDULER`.
3. Preserve one implementation owner, one publication owner and one independent closure owner.
4. Release locks are chain-specific and must close or explicitly rebind after a terminal queue transition.
5. Metric binding requires a causal, ledger-eligible denominator item; generic expected gain is insufficient.
6. Ranking, receipt, PR, merge, READY, fresh wrapper and evaluated pilot are not metric gain.
7. Routine receipts stay in Brain Management; durable synthesis stays here.
8. Protected provider evidence cannot be inferred.
9. Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.
