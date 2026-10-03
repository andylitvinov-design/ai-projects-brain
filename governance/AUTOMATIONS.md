# Automation Registry

Last reconciled: `2026-10-03`

## Registry contract

Scheduler evidence, operational actor identity and exclusive ownership must agree. Documentation, an assignment label or an operational report name alone does not prove runnable capacity.

## Current scheduler truth

- Twelve automations are enabled overall; nine belong to the management system. `New Feedback Alert`, `Sync Heart Healing Responses` and `Sync Sep27 Feedback` are unrelated and excluded from management capacity.
- Enabled management roles: Morning Task Sweep, PR Delivery Sweep, Daily Strategic Priorities, Evening Delivery Closure, Weekly Brain Refresh, Sunday Dashboard Review, Weekly Delivery System Review, Weekly Live Safe Sweep and Portfolio Sales Audit.
- Morning System Upgrade and Finish Trends Rotation are disabled. Daily Dashboard Update, Brain Regression Guard and Brain Data Freshness Watch remain disabled.
- Result: discovery, ranking, PR inspection, closure and weekly review have schedulers; primary implementation and routine publication do not.
- `systems/mobile-autopilot-control-plane.md` enables on-demand phone/web routing through cloud or connected tools. It is a capability contract, not an enabled scheduler and does not fill either missing role.

## Canonical management chain

| Automation | Exclusive role | Current health | Current evidence / next action |
|---|---|---|---|
| Morning Task Sweep | discovery, carryover and readiness | active | Oct 3 handoff exposes PR #629 and #617 without authorizing task 11918 implementation. |
| PR Delivery Sweep | PR/branch/CI/review/merge stage | active; one merge awaiting deploy | Oct 3 merged Books PR #85 and left it `MERGED_WAITING_DEPLOY`; portfolio is 62 open, 48 stale, 33 nonmergeable, 21 blocked and 8 CI-failing. |
| Daily Strategic Priorities | ranking only | active; fail-closed | Task 11918 remains `implementation_authorized=false` because live data/queue and denominator identity are unavailable. It still names disabled Morning System Upgrade. |
| Morning System Upgrade | one implementation owner | `DISABLED` | Must not run until the assignment and runner both prove causal eligibility. |
| Daily Dashboard Update | metrics, history and atomic publication | `DISABLED / UNASSIGNED` | No routine publisher exists; owner activation alone cannot establish cadence. |
| Evening Delivery Closure | independent verification and terminal closure | active | Sep 27–Oct 2 closures all returned `BLOCKED_BY_OWNER / NO_SAFE_UPGRADE`; verifies future 7/7 and delayed no-deploy refresh. |
| Weekly Delivery System Review | execution-quality evaluator | active | Sep 21–27 review is in repository weekly history; live publication remains Aug 17–23. Separate durable PR #217 overlaps this canonical refresh and should not become a second registry. |
| Sunday Dashboard Review | metric/control-plane architecture | active | PR #613 fixed outage semantics in source; canonical production still serves old behavior. |
| Weekly Brain Refresh | durable reconciler | active | Owns catalog/governance/index reconciliation only; no operational, product or scheduler mutation. |

## Ownership defects

1. **Assigned-to-disabled executor:** task 11918 remains leased to Morning System Upgrade although that scheduler is disabled.
2. **No routine publisher:** Daily Dashboard Update is disabled, so scoped runtime access would still not provide recurring publication capacity.
3. **Owner/runtime activation gap:** canonical Vercel lacks the dedicated repository Contents-read credential; no fresh atomic source exists.
4. **Repository/live split:** repository main holds Sep 18 data and PR #613 semantics, while the Sep 15 production artifact serves stale data and old health behavior.
5. **Trends acceptance gap:** PR #617 is draft and red; a mechanical rebase cannot resolve schema-v5/v6 and deterministic gate failures.
6. **Weekly persistence split:** repository weekly review ends Sep 20; live API ends Aug 23.
7. **PR conversion gap:** 62 open PRs and 78 waiting deploy/terminal items show one current-sweep merge is not yet end-to-end delivery throughput.
8. **Receipt-only repair divergence:** daily evidence PRs advance application `main` while source and live remain unchanged, leaving PR #629 and #617 progressively farther behind and turning persistence into repair rework.
9. **Durable registry overlap:** ai-projects-brain PRs #211 and #217 contain governance/weekly facts that overlap the canonical Weekly Brain Refresh PR #193; review must consolidate, not merge competing registries independently.

## Durable rules

1. A disabled or exhausted scheduler is not runnable capacity.
2. Assignment continuity preserves one owner, but does not authorize implementation.
3. Runtime credential activation and recurring publisher enablement are separate prerequisites.
4. Repository freshness, READY deployment and HTTP 200 fallback do not override stale canonical operational sources.
5. Dependency outage marks dependent checks `NOT_EVALUATED`; never audit an error body as a valid source payload.
6. A red semantic gate requires source-owner regeneration, not mechanical conflict repair.
7. PR/CI/merge evidence belongs to PR Delivery Sweep; terminal closure belongs to Evening Delivery Closure.
8. Missing daily snapshots are never reconstructed from handoffs.
9. Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.
10. Receipt-only merges receive zero delivery/effect credit; repeated base movement underneath an unresolved repair requires one latest-base regeneration, not repeated rebase activity.
11. Weekly Brain Refresh PR #193 is the canonical durable reconciler; overlapping durable PRs are evidence inputs until consolidated or superseded through review.
12. An on-demand control-plane interface is not recurring automation capacity; scheduler liveness must still be proven independently.

## Success conditions

- one enabled scheduler identity for every canonical stage;
- scoped runtime access plus one fresh accepted atomic source;
- exact-main activation with 7/7 coherent APIs and PR #613 semantics;
- one later publisher-owned runtime refresh with no application deployment;
- PR #629 regenerated on current main with a green complete gate and structured publication-current behavior;
- PR #617 regenerated on current main with honest 12/16 evidence and a green unchanged-head gate;
- newest weekly review reaches canonical live and seven prospective snapshots accumulate honestly.
