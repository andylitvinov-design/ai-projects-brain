# Current AI System State

Last weekly refresh: `2026-08-08`

## Operating model

- `ai-projects-brain` is the durable source of truth for project catalog, project state, governance, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable snapshots, assignments, chains, collectors and dashboard/API publication.
- ChatGPT Automations collect and execute bounded stages. They must not create parallel registries, duplicate implementation ownership, or independent metric definitions.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management operational control plane | **DEGRADED_FAIL_CLOSED** | On 2026-08-08 `/api/data`, `/api/agent-productivity`, and `/api/trends` each return HTTP 503 with `STALE_OPERATIONAL_DATA_FORBIDDEN`; underlying source is `2026-08-06T04:55:44.630Z`, about 49.8h old. The freshness guard is working, but routine refresh/publication is not current. |
| Durable source-of-truth boundary | healthy | Runtime receipts remain in Brain Management; durable catalog/governance stays here. This refresh does not rewrite operational data or deploy product code. |
| Active portfolio routing | reconciled ten-project overlay | Ten current project identities remain in `projects/portfolio-registry.json`; no new accessible repository is promoted to active without project/live evidence. |
| Accessible repository inventory | **enumerated** | Connected GitHub inventory returned 30 accessible repositories. It confirms `report`, `finance`, `ezohata`, `ezohata-finance`, `brain-management`, `torontotantra`, `codex-links`, `reiki-yggdrasil`, and `ai-projects-brain`; `psihotavr` is not currently visible through the installed-repository inventory and remains `needs verification` for accessibility. |
| Legacy human/machine indexes | stale continuity layer | `projects.md`, `projects.json`, and `data/project-index.json` still contain historical mappings, including obsolete Brain Management Cloudflare routing and older Psitherapy ambiguity. They remain non-authoritative until safely patched field-by-field. |
| Automation ownership | **gap** | Discovery, PR hygiene, ranking, closure and regression detection are enabled, but the canonical primary implementation stage, atomic dashboard publisher and freshness watcher are currently disabled. Ranking can therefore produce work without an enabled canonical implementation/publish path. |
| Weekly review freshness | latest full review = 2026-08-02 | Weekly Delivery System Review and Sunday Dashboard Review last ran on 2026-08-02. Evidence from Aug 3–8 is aggregated here as week-to-date system state, not a replacement full-week denominator. |
| CI reachability | degraded external dependency | Repeated GitHub-hosted workflow runs failed before the first repository step (`steps=null`) during Aug 5–8. This is already a durable risk: preserve exact head SHA and do not interpret pre-step failure as code failure or success. |
| Search/navigation | improved with explicit authority | `projects/portfolio-registry.json` + `projects/index.md` remain current routing authority; legacy files are continuity only, with exact known deltas captured by the Aug 8 reconciliation record. |

## Confirmed week-to-date changes — 2026-08-03 through 2026-08-08

- Brain Management added and exercised fail-closed guards for stale operational data, reduced release payloads, source parity and atomic source refresh.
- Production/source parity required repeated P0 recovery work on Aug 5–6; infrastructure recovery again consumed execution capacity that should normally go to product outcomes.
- Friday Trends evidence was refreshed and persisted on 2026-08-07, but the recurring Weekly AI Trends scheduler is currently disabled, so future Monday/Friday continuity is not guaranteed.
- PR Delivery Sweep continued portfolio hygiene; recent operational receipts reference inventories around 33–34 open PRs, down from the earlier verified 46 baseline, but exact current portfolio-wide count remains an operational measure rather than a durable catalog field.
- Repeated hosted CI failures occurred before repository checkout. Deterministic local/source validation can be supporting evidence only where repository policy permits; it must not be converted into false green CI.
- The freshness guard correctly prevents stale data from being presented as current. The current problem is missing refresh cadence, not a guard failure.

## Current strategic blockers

1. **Restore one canonical execution/publication chain.** Daily Strategic Priorities is enabled, but Morning System Upgrade and Daily Dashboard Update are disabled. Brain Regression Guard must not become the routine implementation/publisher by default.
2. **Recover operational freshness.** Brain Management source age is beyond the 18h hard limit; operational APIs are intentionally fail-closed until a current atomic source refresh and verified publication occur.
3. **EzoHata Finance owner verification remains unresolved.** Protected provider evidence still requires a current owner-session/read-only journey; durable memory must not infer readiness.
4. **Psihotavr remains needs verification.** Existing repo/live identity stays in the catalog, but the repository is not present in the current installed-repository inventory and prior collector/live/source evidence is incomplete.
5. **Legacy indexes remain stale.** `projects.md`, `projects.json`, and `data/project-index.json` must not override the current portfolio overlay until their Brain Management/Psitherapy fields and authority labels are safely reconciled.

## Current priorities

1. Re-establish the exclusive implementation + atomic publication path before adding more ranking/guard automation.
2. Recover Brain Management from `STALE_OPERATIONAL_DATA_FORBIDDEN` using the existing release guards, then re-read canonical APIs; this is operational work for the owning automation, not Weekly Brain Refresh.
3. Patch legacy project indexes without deleting historical secondary-project records, using the ten-project overlay as current routing authority.
4. Preserve the repeated pre-step CI failure as an external reachability class and avoid duplicate recovery PR churn.
5. After freshness/ownership recovery, return execution capacity to one user-visible or business-value deliverable rather than another guard-only improvement.
