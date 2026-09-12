# Automation Registry

Last reconciled: `2026-09-12`

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
| Morning Task Sweep | discovery, carryover and readiness | active; continuity incomplete, outcome conversion zero | Sep 12 reconciled 3 chains and 135 non-additive duplicate markers, but main lacks Sep 6, 7 and 11 handoffs. No verified metric gain. |
| PR Delivery Sweep | PR/branch/CI/review/merge stage | active but no ready throughput | Sep 12 inventory is 49 open / 0 ready / 35 stale / 27 nonmergeable; the sweep merged/repaired 0. Product/recovery workers still merge outside this stage. |
| Daily Strategic Priorities | ranking only | active; causality gate still failed | Twelve more zero-effect Trend receipts and the new denominator-free assignment prove the Sep 5 candidate was documented but not enforced. |
| Morning System Upgrade | one implementation owner | active twice daily; very high activity, zero metric conversion | Produced 12 current-window Trend terminals and most of 36 new Brain Management PRs; every assigned metric re-read unchanged. It continues to merge/deploy/self-terminalize. |
| Daily Dashboard Update | metrics, history and atomic publication | `UNASSIGNED_IN_SCHEDULER` | Nominal exclusive publisher has no enabled task. Restore one scheduler-backed identity or explicitly reassign the contract; do not infer ownership from another actor's report. |
| Evening Delivery Closure | independent verification and terminal closure | active, persistence incomplete | Main contains Sep 7–8 closures; Sep 9 is stuck in open/conflicted PR #561 and Sep 10–11 receipts are absent. No current canonical LIVE closure. |
| Weekly Delivery System Review | execution-quality evaluator | active, canonical output stale | Scheduler ran Sep 6, but the newest accessible live and repository scorecard still ends Aug 23. Missing output is a persistence/sync defect, not evidence of no findings. |
| Sunday Dashboard Review | metric/control-plane architecture | active, durable output not current | Scheduler ran Sep 6; no newer canonical durable/live review artifact was found. The last accepted durable corrections remain PRs #208/#209/#210. |
| Weekly Brain Refresh | durable reconciler | active | Owns this catalog/governance/index PR only; no operational or product mutation. |

## Other enabled automation

| Automation | Purpose | Boundary |
|---|---|---|
| Weekly Live Safe Sweep | bounded public live checks | no daily chain ownership or durable-catalog mutation |
| Portfolio Sales Audit | weekly read-only conversion audit | no product mutation or invented conversion evidence |
| Finish Trends Rotation | completed temporary recovery | exhausted; not capacity and should be disabled/archived by its owner |

## Operational ownership conflicts

1. **Actor/scheduler split:** Sep 12 agent-productivity is still attributed to Brain Regression Guard, but no enabled Brain Regression Guard scheduler exists.
2. **Publisher overlap:** those Regression Guard-labelled reports refresh current sources and create dated `regression-guard-atomic-refresh-YYYYMMDD` chains even though Daily Dashboard Update owns routine publication.
3. **Implementation overlap:** Morning System Upgrade implements, merges, deploys and writes rich terminal labels; PR Delivery Sweep and Evening Delivery Closure therefore remain bypassed.
4. **Top-level enum drift:** all 12 Sep 7–12 Trend receipts use `LIVE_VERIFIED_NO_EFFECT_EXPLAINED`, outside the canonical four-state enum.
5. **Reactive continuity:** the Sep 12 source reached 71h and 4/7 APIs failed closed before recovery; a dated emergency refresh is not the required <=12h publisher cadence.
6. **Missing stage artifacts:** Morning and Closure files are absent for several dates; the Sep 9 closure remains outside main in conflicted PR #561.
7. **Release-gate split brain:** connected Vercel publishes READY artifacts while Mobile Release Bundle stays red and the API attribution envelope points to a legacy SHA/null deployment id.

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
- two <=12h publisher-owned coherent cycles, then independent delayed closure, with no intermediate fail-closed window;
- full release gate green;
- next Trends assignment proves immutable ledger-event eligibility before implementation;
- PR Delivery and Closure consume their exclusive stages rather than observing downstream work after the fact.
