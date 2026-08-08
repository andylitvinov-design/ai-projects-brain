# Automation Registry

Last reconciled: `2026-08-08`

## Registry contract

Every recurring automation record must identify its scheduler state, exclusive role, cadence, persistence target, failure signal, overlap boundary and stop condition. Documentation alone does not prove an automation is enabled; current scheduler evidence is authoritative for enablement.

## Canonical management chain — current scheduler state

| Automation | Exclusive role | Scheduler state | Current health / durable finding |
|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication, readiness handoff | enabled | Running; Aug 8 handoff persisted. Must not become implementation owner. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge reachability + portfolio PR hygiene | enabled | Running; repeated hosted workflows failed before repository steps during Aug 5–8. Preserve head SHA and classify as external CI reachability when `steps=null`. |
| Daily Strategic Priorities | Ranking only | enabled | Running; can rank work, but currently has no enabled canonical primary implementation stage to consume assignments. |
| Morning System Upgrade | Primary implementation owner | **disabled** | Canonical implementation-owner gap. Guards/closure must not silently take routine implementation ownership instead. |
| Daily Dashboard Update | Metrics, collectors, formulas, history, assignments, atomic publication | **disabled** | Canonical routine publisher/freshness-owner gap. Current Brain Management sources aged beyond 18h and APIs are fail-closed. |
| Evening Delivery Closure | Verification, bounded recovery, terminal closure | enabled | Running; may verify/recover, but should not become the routine publisher or primary implementer. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | enabled | Latest completed full review: 2026-08-02. No newer full-week denominator exists yet. |
| Sunday Dashboard Review | Metric/control-plane architecture and dashboard quality | enabled | Latest completed review: 2026-08-02. Next review can assess the current stale-source/publisher gap. |
| Weekly Brain Refresh | Canonical durable catalog/governance/index reconciler | enabled | Current run. Docs/index only; no operational publication or product implementation. |

## Other relevant enabled/disabled families

| Family | Scheduler state | Ownership boundary / finding |
|---|---|---|
| Brain Regression Guard | enabled | Strong P0 release-integrity detector/recovery guard. It may perform bounded emergency recovery, but must not become the normal Daily Dashboard Update replacement. |
| Brain Data Freshness Watch | disabled | Detection coverage is now concentrated in Regression Guard and API fail-closed logic; routine freshness refresh still needs an enabled canonical publisher. |
| Weekly AI Trends | disabled | Friday 2026-08-07 refresh was persisted, but future Monday/Friday cadence is not currently scheduled. If Trends cadence is required, restore one scheduler only. |
| UI Design Intelligence | enabled | Framework/docs only; no autonomous product redesign. |
| Portfolio Sales Audit | enabled | Audit/recommendations only; no product mutation or invented conversion evidence. |
| Weekly Live Safe Sweep | enabled | Safe live checks/narrow repairs; must not take ownership of daily Brain Management publication or durable catalog reconciliation. |

## Reconciliation findings — 2026-08-08

1. **Canonical chain is incomplete.** Discovery, PR hygiene, ranking and closure are enabled, while the primary implementation owner and routine atomic publisher are disabled.
2. **Current stale production is consistent with the publisher gap.** On Aug 8 the three inspected Brain Management operational APIs reject a shared source timestamp from Aug 6 as ~49.8h old. The freshness guard works; the routine refresh path is absent.
3. **Ranking without implementation is a structural waste risk.** Daily Strategic Priorities can continue producing assignments that no enabled Morning System Upgrade is responsible for consuming.
4. **Regression Guard must remain exceptional.** Its recovery language is intentionally strong, but it should acquire a single incident chain only for P0 recovery and release ownership after terminal evidence. It is not the routine publisher.
5. **Pre-step CI reachability is repeated, not incidental.** Operational receipts on Aug 5–8 repeatedly report workflows failing before checkout with `steps=null`. This is already a durable risk class and should not trigger duplicate repair branches or false success claims.
6. **Weekly review evidence remains Aug 2.** Current Aug 3–8 evidence is week-to-date and cannot overwrite the immutable Aug 2 review denominators before the next full review.
7. **Weekly Trends continuity is currently broken at scheduler level.** A valid Friday refresh does not prove the next Monday refresh will run while the recurring automation is disabled.
8. **Legacy disabled publishers/one-off guards remain noncanonical.** Do not revive them simply to fill the gap; restore the minimum canonical owner instead.

## Durable ownership rules

1. Read current scheduler state, assignment and carryover before acting.
2. Preserve one implementation owner until canonical terminal state or explicit reassignment.
3. A ranking automation may not implement; an implementation automation may not invent a different ranked chain without reconciliation.
4. Merge, artifact creation, preview READY, deployment READY and HTTP status are not live success.
5. Current API verification requires status, content type, body, parseability and underlying source freshness.
6. Routine operational receipts live in Brain Management; only repeated failures, ownership changes and reusable lessons belong here.
7. Protected owner/provider evidence is never treated as autonomously available.
8. Regression/freshness guards must acquire one canonical recovery chain and may not run as routine parallel publishers beside the designated publisher.
9. `steps=null` / pre-checkout hosted CI failures are external reachability evidence; they neither prove the branch is bad nor authorize a false green replacement.
10. Disabled canonical stages create an ownership gap; another enabled automation does not inherit that role implicitly.
11. Restoring automation health should enable the minimum canonical stages needed for one end-to-end chain, not recreate duplicate historical schedulers.
12. Weekly review denominators remain immutable until the next actual weekly review; week-to-date evidence must be labelled separately.
