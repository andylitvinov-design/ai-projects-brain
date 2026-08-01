# Current AI System State

Last weekly refresh: `2026-08-01`

## Operating model

- `ai-projects-brain` is the durable source of truth for project catalog, project state, governance, automation ownership, lessons and indexes.
- `brain-management` is the operational control plane for current metrics, immutable snapshots, assignments, chains, collectors and dashboard/API publication.
- ChatGPT Automations collect and execute bounded stages. They must not create parallel registries, duplicate implementation ownership, or independent metric definitions.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Brain Management operational control plane | healthy / LIVE_VERIFIED | Canonical Vercel production has real HTML, six approved routes, four Overview aggregates, 24 metrics, 5/5 JSON APIs, ten Trends, seven agent cards, six manifest shortcuts and no verified runtime-error cluster. |
| Durable source-of-truth boundary | healthy | Runtime receipts remain in Brain Management; durable catalog and governance changes remain here. |
| Active portfolio routing | reconciled for the ten-project overlay | `projects/portfolio-registry.json` and `projects/index.md` now agree, including the Brain Management Vercel mapping and the canonical `finance` repository for legacy finance. |
| Complete accessible repository inventory | needs verification | Connector discovery did not provide a complete owner-wide enumeration. Do not promote unverified backup or experimental repositories into the active portfolio. |
| Legacy human/machine indexes | partial | `projects.md`, `projects.json`, and `data/project-index.json` remain continuity sources requiring bounded field-by-field reconciliation. |
| Automation ownership | healthy | Current daily chain has zero concurrent implementation-owner conflicts; discovery, ranking, implementation, PR hygiene, publication and closure remain separate. |
| Weekly review freshness | due | Latest Weekly Delivery System Review and Sunday Dashboard Review cover the week ending 2026-07-26. Their next scheduled runs should supply the next full weekly denominators. |
| Search/navigation | improved | Current aliases and canonical repo/live mappings are present in the active registry and routing index. |

## Confirmed current operational state

- Brain Management `/api/data` generated `2026-08-01T06:06:00Z` and reports overall `70.1`, efficiency `63.7`, business `72.5`, self-development `77.2`.
- Public business-KPI evidence improved from no accepted source to `4/6` applicable projects without changing the formula.
- The auxiliary API contract moved from `3/5` to `5/5` parseable JSON endpoints and reached `LIVE_VERIFIED`.
- Rule lifecycle reached `3 active/9` from `2 active/9`.
- Morning reconciliation removed four duplicate or terminal chains.
- PR hygiene reduced the verified open-PR inventory from 46 to 36 in one run: three focused documentation PRs merged and seven obsolete/superseded PRs closed.

## Current strategic blockers

1. EzoHata Finance provider/live readiness is `0/4` and genuinely `BLOCKED_BY_OWNER`; it needs a current owner-session smoke and one read-only Wise or YooMoney journey.
2. Product delivery, task success and live completion remain a shared `1/4` input. One exact denominator item and canonical implementation repository must be selected before work begins.
3. Psihotavr remains `NEEDS_VERIFICATION`; its current public collector failed and its live/source/retirement state is not fully proven.
4. Metric-level source references, honest seven-day history coverage and a supported operational closure-write path remain improvement areas; do not fabricate missing history.

## Current priorities

1. Preserve Brain Management's verified production contract and source/deploy parity.
2. Convert one real product deliverable from the shared `1/4` denominator to live evidence under one owner.
3. Complete the owner-only EzoHata Finance read-only verification.
4. Reconcile legacy project indexes field by field without replacing the canonical active overlay.
5. Continue accumulating honest immutable snapshots and metric-level evidence.
