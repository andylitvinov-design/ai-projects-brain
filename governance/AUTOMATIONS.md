# Automation Registry

Last reconciled: `2026-08-08`

## Registry contract

Every recurring automation record must identify current scheduler evidence, exclusive role, persistence target, failure signal, overlap boundary and stop/terminal condition. Documentation or historical receipts do not prove a recurring role is currently scheduled.

## Current daily management roles

| Role / active automation | Exclusive role | Scheduler evidence | Current health / durable finding |
|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication, readiness | active; current Aug 8 receipt exists | Healthy role separation. Current handoff preserves three chains, dedupes shared 503 symptoms into one production recovery chain and creates no parallel PR. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge hygiene | active; Aug 8 receipt exists | Healthy role separation, but hosted workflow jobs repeatedly fail before checkout. Treat `steps=null` / unavailable logs as infrastructure reachability evidence, not code failure. |
| Daily Strategic Priorities | Ranking only | active; Aug 8 ranking exists | Correctly abstained from stale metric-based implementation assignment and preserved the existing Brain Regression Guard owner for production freshness. |
| **Primary implementation stage** | Implement exactly one ranked executable chain | **no current active scheduler evidence** | `UNASSIGNED_IN_SCHEDULER`. Do not infer an implementation owner from stale durable docs or old assignment fields. |
| **Atomic operational publication / collector stage** | Refresh current sources, build/publish one atomic artifact, persist current operational state | **no current active scheduler evidence** | `UNASSIGNED_IN_SCHEDULER`. This is consequential: canonical operational sources aged past 18h and now fail closed. Emergency recovery is not a substitute for routine publisher ownership. |
| Evening Delivery Closure | Verification, bounded recovery handoff and terminal closure | active; Aug 7 receipt exists | Active. Must not claim success from merge/READY and must not compete with the single production recovery owner. |
| Brain Regression Guard | Detect/recover release-integrity, freshness, rendered-contract and API regressions | active; current recovery owner | Correctly owns `production-source-parity-recovery-20260806`. Emergency recovery only; must release ownership after terminal evidence and must not become permanent routine publication. |

## Current weekly / audit roles

| Automation | Purpose | Current boundary |
|---|---|---|
| Weekly Brain Refresh | Canonical durable catalog/governance/index reconciliation | Active; docs/index only. No operational publication or product implementation. |
| Weekly Delivery System Review | Weekly execution-quality evaluation | Active; latest durable output is PR #190 for week ending 2026-08-02. |
| Sunday Dashboard Review | Metric/control-plane architecture review | Active; latest durable output is PR #189 for 2026-08-02. |
| UI Design Intelligence | Evidence-backed `/audit-ui` markers | Active; PR #192 merged v1.5 form-completion/authentication checks. No autonomous product redesign. |
| Portfolio Sales Audit | Read-only portfolio conversion audit | Active; audit only, no product mutation. |
| Weekly Live Safe Sweep | Safe live checks and narrow confirmed repairs | Active; must not take durable catalog ownership or routine Brain Management publication ownership. |

A Friday Trends refresh is present in Brain Management repository evidence on 2026-08-07, but no current active dedicated Monday/Friday trend-scheduler evidence was available in this reconciliation. Treat trend-research scheduling as `NEEDS_VERIFICATION`; do not describe a historical automation record as currently enabled.

## Reconciliation findings — 2026-08-08

1. **Routine management chain is incomplete in scheduler state.** Discovery, PR hygiene, ranking and closure are active, but the primary implementation and atomic publication recurring slots have no active scheduler evidence.
2. **Freshness impact is real.** Canonical Brain Management APIs now return `503 STALE_OPERATIONAL_DATA_FORBIDDEN`; the missing routine publication ownership is therefore an execution-health defect, not merely documentation drift.
3. **Single-owner recovery is preserved.** Morning Task Sweep and Daily Strategic Priorities both retain Brain Regression Guard as owner of `production-source-parity-recovery-20260806`; no second implementation/recovery owner was created.
4. **Hosted CI pre-checkout failures are repeated.** Aug 5–8 receipts show workflows failing before repository steps, with no usable job logs. Durable rule from PR #191 applies: preserve the exact head, avoid duplicate recovery PRs and do not infer branch-code failure.
5. **Current recovery lacks a complete attributable artifact.** Latest reduced preview was rejected; routine publication must not resume from an incomplete/pointer package.
6. **Shared delivery input remains unresolved.** `product_delivery_rate`, `task_success_rate` and `live_completion_rate` still share one `1/4` input and must remain one future implementation chain once exact denominator identities are published.
7. **Owner-only provider chain remains separate.** EzoHata Finance `0/4` is not a CI/deploy task and must not be reassigned to automation.
8. **Scheduler evidence outranks the old registry.** A role documented here as canonical but absent from the current scheduler is unassigned, not healthy.
9. **Diagnostic Vercel projects are not automation owners.** Temporary probe/recovery projects do not create alternate publication identities.

## Durable rules

1. Read current assignment/carryover and current scheduler evidence before acting.
2. Preserve one implementation/recovery owner until terminal state or explicit reassignment.
3. Reuse existing chain/PR; do not create trigger-only or parallel recovery work without new evidence.
4. Merge, artifact creation, deployment start and READY are not live success.
5. For APIs verify status, content type, body, schema and underlying source age.
6. Direct releases require current source binding, exact manifest/dependency closure and canonical post-alias re-read.
7. Routine receipts stay in Brain Management; durable synthesis belongs here.
8. Protected owner/provider evidence cannot be automated by inference.
9. Ranking and implementation are distinct: implementation must consume the exact ranked `chain_id` or return it for reconciliation.
10. Regression detection/recovery may temporarily own one canonical incident but may not become a silent permanent publisher.
11. Correlated metrics sharing one raw input use one chain and one owner.
12. Current scheduler state is authoritative for whether a recurring role is active.
13. A required unassigned scheduler role is a governance defect and must be explicit; never fill it by relabeling another active automation.
