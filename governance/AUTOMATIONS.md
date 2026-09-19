# Automation Registry

Last reconciled: `2026-09-19`

## Registry contract

Scheduler evidence, operational actor identity and exclusive ownership must agree. Documentation, an assignment label or an operational report name alone does not prove runnable capacity.

## Current scheduler truth

- 42 tasks are visible; nine are enabled and recurring.
- Enabled management tasks: Morning Task Sweep, PR Delivery Sweep, Daily Strategic Priorities, Evening Delivery Closure, Weekly Brain Refresh, Sunday Dashboard Review and Weekly Delivery System Review.
- Other enabled bounded roles: Weekly Live Safe Sweep and Portfolio Sales Audit.
- Morning System Upgrade was disabled on Sep 18 after another zero-effect implementation; Finish Trends Rotation is also disabled. Neither is runnable capacity.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch remain disabled.
- Result: no enabled primary implementation owner and no enabled routine operational publisher.

## Canonical management chain

| Automation | Exclusive role | Current health | Current evidence / next action |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover and readiness | active; continuity partial | Sep 13, 14, 15, 18 and 19 handoffs exist; Sep 16–17 are missing. Sep 19 correctly carries owner activation, PR #579 and causal-gate work. |
| PR Delivery Sweep | PR/branch/CI/review/merge stage | active; zero throughput | Sep 19 inventory is 55 open / 0 ready / 39 stale / 31 nonmergeable / 13 drafts; the run merged, repaired and closed zero. |
| Daily Strategic Priorities | ranking only | active; gate partially enforced | The Sep 19 task is `implementation_authorized=false` because an exact denominator identity is unavailable. However, the assignment still targets disabled Morning System Upgrade. |
| Morning System Upgrade | one implementation owner | `DISABLED` | Seven current-window and 32 cumulative Trend pilots produced zero assigned-metric effect before suspension. Do not re-enable without runner-level causal fail-closed rules. |
| Daily Dashboard Update | metrics, history and atomic publication | `DISABLED / UNASSIGNED` | No routine publisher exists. Runtime activation is owner-blocked; after activation one scheduler-backed publisher must prove a no-deployment data refresh. |
| Evening Delivery Closure | independent verification and terminal closure | active; cannot close owner block | Sep 18 correctly ended `BLOCKED_BY_OWNER`; it must independently verify 7/7 APIs and delayed no-deploy freshness after activation. |
| Weekly Delivery System Review | execution-quality evaluator | active; output not canonical | Sep 7–13 scorecard exists in open PR #579, while live/main remain at Aug 17–23. Complete final-head validation and normal delivery. |
| Sunday Dashboard Review | metric/control-plane architecture | active; repair not live | PRs #597–599 introduced runtime separation, #602 regressed it and #607 restored it on `main`; owner production activation remains open. |
| Weekly Brain Refresh | durable reconciler | active | Owns catalog/governance/index reconciliation only; no operational, product or scheduler mutation. |

## Ownership defects

1. **Assigned-to-disabled executor:** Daily Strategic Priorities names Morning System Upgrade even though it is disabled.
2. **No routine publisher:** repository data can advance while production remains stale because Daily Dashboard Update is disabled and the restored runtime path is not activated.
3. **Repository/live split:** Sep 19 source exists on `main`, while canonical production still serves Sep 15 and five operational APIs fail closed.
4. **Fallback ambiguity:** health and weekly endpoints return 200 from empty/stale upstream state; they cannot be counted as operational recovery.
5. **Weekly persistence split:** the newest review is in PR #579 rather than canonical history or live.
6. **PR-stage bypass/churn:** 55 open PRs and zero ready/processed indicate activity is not converting through the exclusive PR stage.

## Durable rules

1. Read assignment, carryover and lock before acting.
2. Preserve one enabled implementation owner until canonical terminal state or explicit reassignment.
3. A disabled or expired scheduler cannot own an active assignment.
4. Reuse the same chain/PR for the same defect; dated recovery aliases are not new work.
5. Merge, READY, repository freshness, live behavior or evaluated pilot is not metric gain.
6. APIs require status, body, parseability, source identity and delayed verification; fallback 200 does not override operational 503.
7. Operational JSON stays out of static bundles; guarded runtime data refresh must not trigger application deployment.
8. PR/CI/merge evidence belongs to PR Delivery Sweep; terminal closure belongs to Evening Delivery Closure.
9. A Trends assignment requires immutable denominator identity, exact numerator transition, canonical route/repo/branch and runner enforcement before implementation.
10. Missing daily snapshots are not reconstructed from handoffs.
11. Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.

## Success conditions

- one enabled scheduler identity for every canonical stage;
- exact-main runtime activation with 7/7 canonical APIs;
- one later guarded runtime-source refresh with no deployment, then delayed independent closure;
- next accepted Trend task passes both ranking and runner causal gates;
- newest weekly review reaches canonical main/live and seven prospective snapshots accumulate honestly;
- PR Delivery converts at least one eligible PR rather than only reporting backlog.
