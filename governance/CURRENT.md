# Current AI System State

Last weekly refresh: `2026-08-08`

## Operating model

- `ai-projects-brain` is the durable source of truth for project catalog, canonical mappings, governance, goals, automation ownership, lessons and search indexes.
- `brain-management` is the operational control plane for current metrics, immutable operational receipts, assignments, chains, collectors and dashboard/API publication.
- Recurring workers may execute bounded stages but must not create parallel catalogs, metric definitions, publishers or implementation owners.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management operational control plane | `DEGRADED_STALE_FAIL_CLOSED` | On 2026-08-08 all five canonical operational APIs returned 503 JSON with `STALE_OPERATIONAL_DATA_FORBIDDEN`; source `2026-08-06T04:55:44.630Z` was ~48–50h old against an 18h ceiling. Existing recovery remains owned by Brain Regression Guard. |
| Fail-closed release/freshness protection | healthy and proven | The system correctly refuses to mask stale sources with fresh wrapper/deploy timestamps; reduced one-file preview was rejected. |
| Durable source-of-truth boundary | healthy | Operational receipts remain in Brain Management; durable catalog/governance synthesis remains here. |
| Active portfolio routing | reconciled, 1 identity unresolved | Ten-project overlay retained. Nine active repo mappings are currently reachable; Psihotavr historical repo returns 404 and is downgraded to `IDENTITY_UNRESOLVED`. |
| Complete owner repository inventory | confirmed | Current GitHub owner enumeration exposes 30 accessible repositories. Accessibility does not imply active-product status. |
| Human/machine indexes | reconciled to compact current format | `projects.md`, `projects.json`, `data/project-index.json`, `projects/index.md` and `portfolio-registry.json` now route to capsules and current evidence instead of stale duplicated detail. |
| Automation ownership | degraded by scheduler gaps | Discovery, PR hygiene, ranking, closure and regression recovery have current scheduler evidence. The recurring primary implementation role and atomic publication role have no active scheduler evidence at this reconciliation and must not be claimed healthy from old docs. |
| Weekly review freshness | latest full review evidence ends 2026-08-02 | PR #190 records Weekly Delivery findings; PR #189 records Sunday control-plane findings. Current-week operational receipts extend durable CURRENT/lessons but are not a fabricated full-week scorecard. |
| Search/navigation | improved | Active identities, aliases, 30-repo inventory and unresolved identity warnings are machine-readable. |

## Confirmed changes since the prior refresh

- Brain Management rule lifecycle advanced from `3 active/9` to `6 active/9` by 2026-08-04 through real guard activations; formula unchanged.
- Atomic source refresh, full operational API/shell validation and production source-parity checks were strengthened in Brain Management during Aug 5–6.
- Repeated GitHub-hosted workflow failures before checkout (`steps=null`, unavailable logs / BlobNotFound class) were recorded as a durable failure mode in AI Projects Brain PR #191; they must not be misdiagnosed as code failures.
- `/audit-ui` durable markers advanced to v1.5 in PR #192 with explicit accessible form-completion/authentication assistance checks.
- Current GitHub inventory closes the earlier owner-repository enumeration gap: 30 repositories are now explicitly known.

## Current strategic blockers

1. **Production freshness/source parity:** canonical Brain Management APIs are fail-closed; the current recovery chain lacks a fresh complete attributable dependency-closed artifact. Owner: Brain Regression Guard until terminal evidence.
2. **EzoHata Finance protected proof:** provider/live readiness remains `0/4`; a current owner session and one read-only Wise or YooMoney journey are required. This is a genuine owner-only blocker.
3. **Shared delivery `1/4` readiness:** product delivery/task success/live completion still lack the exact four denominator identities, one existing deliverable, project/repo/branch and one implementation owner.
4. **Scheduler ownership gap:** the durable management contract requires distinct implementation and atomic publication stages, but current scheduler evidence does not show active owners for those recurring roles. Regression recovery must not silently become routine publication.
5. **Psihotavr identity:** canonical repository/provider/live ownership is unresolved; no code/business-KPI action should be routed until re-proven.
6. **Provider-project sprawl:** multiple temporary Brain Management Vercel probe/recovery projects exist; only `brain-management` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d` is canonical.

## Current priorities

1. Restore one clearly assigned recurring atomic publication stage and verify a fresh complete Brain Management artifact/canonical re-read without creating a parallel recovery owner.
2. Restore/confirm one primary implementation-stage scheduler owner, then select one concrete product deliverable from the shared `1/4` input.
3. Resolve Psihotavr canonical identity or explicitly retire it only after evidence; do not infer from the 404 alone.
4. Complete the EzoHata Finance owner-only read-only provider proof.
5. Keep the 30-repository inventory and ten-project overlay separate so experimental/backup repos do not become products by accident.

## Sync status

- durable catalog: `CURRENT_RECONCILED_2026-08-08`
- operational control plane: `STALE_FAIL_CLOSED_NEEDS_RECOVERY`
- memory boundary: `PRESERVED`
- scheduler registry: `RECONCILED_WITH_GAPS`
- next durable recheck: after the operational freshness chain reaches a terminal state or current scheduler ownership changes
