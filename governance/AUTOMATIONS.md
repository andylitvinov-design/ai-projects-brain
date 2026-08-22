# Automation Registry

Last reconciled: `2026-08-22`

## Registry contract

A recurring role is healthy only when scheduler evidence proves it is enabled and its operational assignment is consumable. An operational label does not create an enabled automation. One chain has one implementation owner until terminal state or explicit reassignment.

## Enabled management roles

| Automation | Exclusive role | Current evidence | Durable health |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover, dedupe, readiness | enabled daily; ran 2026-08-22 | Healthy separation; Aug 22 handoff reused freshness carryover and exposed zero READY_FOR_PR_DELIVERY. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge hygiene | enabled twice daily; ran 2026-08-22 | Active; does not own product implementation or terminal live proof. |
| Daily Strategic Priorities | ranking only | enabled daily; ran 2026-08-22 | Current ranking produced one production-blocker checkpoint plus rank-6 Trends assignment. Must consume the durable zero-effect candidate. |
| Morning System Upgrade | primary implementation of one exact assignment | enabled twice daily; last run 2026-08-21 | Current executable assignment is `trend-task-vibecoding-3117-agent-skills`; publication repair is no longer assigned after immediate recovery. |
| Evening Delivery Closure | independent verification and terminal closure | enabled daily; last run 2026-08-22 00:11 UTC | Owns the delayed same-source checkpoint; must not repeat implementation. |
| Weekly Brain Refresh | durable catalog/governance/index reconciler | enabled weekly | Current PR #193; no daily metrics, product code or publication ownership. |
| Sunday Dashboard Review | metric/control-plane architecture | enabled weekly; ran 2026-08-16 | PR #354 improved evidence continuity without score change. |
| Weekly Delivery System Review | delivery-process effectiveness | enabled weekly; ran 2026-08-16 | PR #357 operational scorecard and PR #199 durable synthesis. |
| Weekly Live Safe Sweep | bounded weekly live checks | enabled weekly | Not a routine publisher or durable catalog owner. |
| Portfolio Sales Audit | read-only conversion audit | enabled weekly | Separate from control-plane publication and durable reconciliation. |

## Operational assignment names without enabled schedulers

`/api/data` currently lists five automation assignments. Two map to enabled schedulers (Morning System Upgrade and Evening Delivery Closure). Three do not:

- Daily Dashboard Update — listed as routine publisher, but no enabled automation exists.
- Brain Regression Guard — listed as detection-only, but no enabled automation exists.
- Brain Data Freshness Watch — listed as detection-only, but no enabled automation exists.

State: `OPERATIONAL_REGISTRY_DRIFT`. These names must not be treated as runnable capacity or silently inherit publication ownership.

## Ownership health

1. Morning System Upgrade has the implementation slot only for the exact current assignment.
2. Evening Delivery Closure owns the delayed checkpoint and terminal classification, not implementation.
3. No enabled recurring routine metrics/history publisher is currently proven.
4. Zero-effect Trends tasks must not release ownership as `DONE`; they remain evaluated evidence until a later real metric-effect task.
5. `memory_sync_status` is stale: current live still references PR #196 while durable reconciliation is PR #193 and delivery synthesis is PR #199.
6. Finance remains explicit owner-only work; Psihotavr identity resolution is not a publication task.

## Durable rules

1. Reconcile scheduler evidence against operational assignments every week.
2. An assignment name without an enabled scheduler is `UNASSIGNED_IN_SCHEDULER`.
3. Preserve one implementation owner and one independent closure owner.
4. Ranking, receipt, PR, merge, READY, fresh wrapper and evaluated pilot are not metric gain.
5. A zero-effect Trends pilot is `EVALUATED_NO_EFFECT`, never `DONE`.
6. Run the Trends effect postprocessor after every collector refresh and before release; fail closed on semantic regression.
7. Immediate freshness recovery remains nonterminal until its delayed checkpoint.
8. Routine receipts stay in Brain Management; durable synthesis stays here.
9. Protected provider evidence cannot be inferred.
10. Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.
