# Automation Registry

Last reconciled: `2026-10-17`

## Registry contract

Scheduler evidence, operational actor identity and exclusive ownership must agree. Documentation, an assignment label or an operational report name alone does not prove runnable capacity.

## Current scheduler truth

- Thirteen automations are enabled overall; eight are recurring management roles.
- Enabled management roles: Morning Task Sweep, PR Delivery Sweep, Daily Strategic Priorities, Weekly Brain Refresh, Sunday Dashboard Review, Weekly Delivery System Review, Weekly Live Safe Sweep and Portfolio Sales Audit.
- Evening Delivery Closure is now disabled. Its latest completed run and persisted receipt do not establish current terminal capacity.
- `Расширение базы психотестов` and `Holistic House: ежедневное ТЗ` are product/research routines. The latter had no completed run at reconciliation time. Neither is a Brain publisher or terminal closer.
- `New Feedback Alert`, `Sync Heart Healing Responses` and `Sync Sep27 Feedback` are unrelated collectors and excluded from management capacity.
- Morning System Upgrade, Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch remain disabled.
- Result: discovery, ranking, PR inspection and weekly review have schedulers; primary implementation, routine Brain publication and independent terminal closure do not.

## Canonical management chain

| Automation | Exclusive role | Current health | Current evidence / next action |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover and readiness | active | Oct 17: 0 ready for PR delivery, 2 owner-blocked, 1 no-safe-action and 22 pipeline-incomplete; verified gains remain zero. |
| PR Delivery Sweep | PR/branch/CI/review/merge stage | active; no conversion | Oct 17: 90 open, 76 owner-blocked, 51 conflicted, 46 stale, 29 CI-failing and 35 drafts; merged/repaired/closed 0. |
| Daily Strategic Priorities | ranking only | active; fail-closed | Preserves task 11918 with `implementation_authorized=false`; emits no executable assignment while production and denominator causality are unproven. |
| Morning System Upgrade | one implementation owner | `DISABLED` | Must not be counted as runnable capacity or receive implementation work. |
| Daily Dashboard Update | metrics, history and atomic publication | `DISABLED / UNASSIGNED` | Source producer is active elsewhere, but no recurring consumer owns runtime publication of the fresh manifest. |
| Evening Delivery Closure | independent verification and terminal closure | `DISABLED` | Last run/receipt is Oct 13. Re-enable or assign exactly one terminal owner before claiming independent closure. |
| Weekly Delivery System Review | execution-quality evaluator | active | Latest complete review is Oct 5–11: 25 chains, 17 live, zero numeric gains. |
| Sunday Dashboard Review | metric/control-plane architecture | active; output persistence gap | Scheduler ran Oct 11, but no separate current durable output was accessible. Scheduler metadata alone is not review evidence. |
| Weekly Brain Refresh | durable reconciler | active | Owns catalog/governance/index reconciliation only; no operational, product or scheduler mutation. |

## Ownership defects

1. **Producer/consumer split:** automated repository source refresh is active, but no enabled publisher consumes the atomic manifest into canonical runtime.
2. **No terminal closer:** Evening Delivery Closure is disabled, so independent terminal verification has no enabled scheduler owner.
3. **Assigned-to-disabled executor:** task 11918 still names Morning System Upgrade while implementation remains unauthorized.
4. **Capability/management confusion:** product research and Holistic House audit schedules do not fill publication or closure roles.
5. **Durable overlap:** open governance PRs remain inputs, but PR #193 is the canonical Weekly Brain Refresh branch until reviewed.

## Durable rules

- One chain, one implementation owner and one terminal verifier.
- A disabled scheduler cannot own executable work.
- A source producer is not a publication consumer; repository freshness is not canonical freshness.
- Product/research schedules are not management publication capacity.
- Operational actor labels without matching scheduler evidence are attribution drift.
- Publication activation and publication cadence are separate proofs.
- A product assignment requires an immutable denominator event and same-source measurement owner before implementation.
- Documentation and scheduler reconciliation are `NO_DIRECT_METRIC_EFFECT`.
