# Automation Registry

Last reconciled: `2026-09-05`

## Registry contract

Scheduler evidence, operational actor identity and exclusive ownership must agree. Documentation or an operational report name alone does not prove runnable capacity.

## Current scheduler truth

- 42 tasks are visible; 11 are marked enabled.
- 10 enabled tasks have recurring schedules: Morning Task Sweep, PR Delivery Sweep, Daily Strategic Priorities, Morning System Upgrade, Evening Delivery Closure, Weekly Brain Refresh, Sunday Dashboard Review, Weekly Delivery System Review, Weekly Live Safe Sweep and Portfolio Sales Audit.
- `Finish Trends Rotation` is still enabled but exhausted its 24 hourly occurrences on 2026-08-27: `ENABLED_BUT_EXHAUSTED`.
- Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch are operational assignment names with no enabled scheduler: `UNASSIGNED_IN_SCHEDULER`.

## Canonical management chain

| Automation | Exclusive role | Current health | Current evidence / next action |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover and readiness | active; operational continuity high, outcome conversion low | Sep 5 reconciled 3 chains, removed 86 duplicate markers, prepared 3 effects and produced 0 verified metric gains. Keep dedup counts non-additive. |
| PR Delivery Sweep | PR/branch/CI/review/merge stage | active but no ready throughput | Sep 5 inventory is 49 open / 0 ready; current sweep merged/repaired 0. Product/recovery workers still merge outside this stage. |
| Daily Strategic Priorities | ranking only | active; causality gate failed | Thirteen additional zero-effect Trend assignments prove field completeness is not causal eligibility. Enforce the continued Sep 5 candidate before another assignment. |
| Morning System Upgrade | one implementation owner | active twice daily; high activity, zero metric conversion | Produced all 13 current-window Trend terminal receipts and deployments, all zero effect. It also performs publication/recovery work, overlapping PR delivery and closure. |
| Daily Dashboard Update | metrics, history and atomic publication | `UNASSIGNED_IN_SCHEDULER` | Nominal exclusive publisher has no enabled task. Restore one scheduler-backed identity or explicitly reassign the contract; do not infer ownership from another actor's report. |
| Evening Delivery Closure | independent verification and terminal closure | active, but no canonical LIVE closure this window | Aug 31–Sep 4: one `DEPLOYMENT_PENDING`, four `NO_SAFE_UPGRADE`; current blockers are attribution, history, weekly review and red complete gate. |
| Weekly Delivery System Review | execution-quality evaluator | active | Aug 24–30 review merged in AI Projects Brain PR #207; live Brain Management API remains one review behind. |
| Sunday Dashboard Review | metric/control-plane architecture | active | Latest durable corrections record bounded multi-owner release-gate recovery and dependency-aware health publication in PRs #208/#209. |
| Weekly Brain Refresh | durable reconciler | active | Owns this catalog/governance/index PR only; no operational or product mutation. |

## Other enabled automation

| Automation | Purpose | Boundary |
|---|---|---|
| Weekly Live Safe Sweep | bounded public live checks | no daily chain ownership or durable-catalog mutation |
| Portfolio Sales Audit | weekly read-only conversion audit | no product mutation or invented conversion evidence |
| Finish Trends Rotation | completed temporary recovery | exhausted; not capacity and should be disabled/archived by its owner |

## Operational ownership conflicts

1. **Actor/scheduler split:** Sep 3–5 agent-productivity reports are attributed to Brain Regression Guard, but no enabled Brain Regression Guard scheduler exists.
2. **Publisher overlap:** those Regression Guard-labelled reports refresh current sources and create dated `regression-guard-atomic-refresh-YYYYMMDD` chains even though Daily Dashboard Update owns routine publication.
3. **Implementation overlap:** Morning System Upgrade implements, merges, deploys and writes rich terminal labels; PR Delivery Sweep and Evening Delivery Closure therefore remain bypassed.
4. **Top-level enum drift:** all 13 Aug 31–Sep 5 Trend receipts use `LIVE_VERIFIED_NO_EFFECT_EXPLAINED`, outside the canonical four-state enum recorded Aug 30.
5. **Reactive continuity:** the Sep 5 source reached 23.0h and 4/7 APIs failed closed before a refresh; a once-daily dated recovery is not the required <=12h publisher cadence.
6. **Release lock semantics:** the current lock is correctly single-owner on task `...01600v1`, but its `acquired_at` remains Sep 1 while the assignment has rotated through multiple tasks; task-specific lock freshness and rebinding need verification.

## Durable rules

1. Read assignment, carryover and lock before acting.
2. Preserve one implementation owner until canonical terminal state or explicit reassignment.
3. Reuse the same chain/PR for the same defect; dated recovery aliases are not new work.
4. Merge, READY, fresh wrapper, live behavior or evaluated pilot is not metric gain.
5. APIs require status, content type, body, parseability, source identity and delayed verification.
6. Direct deployments require current-source binding, exact manifest parity and dependency closure.
7. Routine receipts stay in Brain Management; durable weekly synthesis stays here.
8. A scheduler-less actor identity is `UNASSIGNED_IN_SCHEDULER` even if another task emits reports under that name.
9. Detection guards may hand off an existing recovery chain; they do not become routine publishers or terminal closers.
10. PR/CI/merge evidence belongs to PR Delivery Sweep; terminal closure belongs to Evening Delivery Closure.
11. Rich diagnostic outcomes belong in detail fields; top-level terminal state stays canonical.
12. A Trends metric binding needs pre-existing immutable denominator identity and causal eligibility, not just a raw baseline/target.
13. Missing daily snapshots are not reconstructed from handoffs.
14. Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.

## Success conditions

- one enabled scheduler identity for every canonical stage;
- zero exhausted tasks counted as capacity;
- two <=12h publisher-owned coherent cycles, then independent delayed closure;
- full release gate green;
- next Trends assignment proves ledger eligibility before implementation;
- PR Delivery and Closure consume their exclusive stages rather than observing downstream work after the fact.
