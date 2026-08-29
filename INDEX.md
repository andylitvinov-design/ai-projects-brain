# AI Projects Brain — Master Index

> Главная точка входа для человека и ИИ. Индексы маршрутизируют к каноническим durable-источникам и не копируют оперативные receipts.

Last reconciled: `2026-08-29`

## Найти проект

- Human routing: `projects/index.md`
- Machine active overlay: `projects/portfolio-registry.json`
- Compact catalog and repository inventory: `projects.json`
- Search machine index: `data/project-index.json`
- Capsules: `projects/<slug>/PROJECT.md`
- Human summary: `projects.md`

Текущий overlay содержит 10 active identities; GitHub owner inventory содержит 30 repositories. Backup/bootstrap/diagnostic repositories не становятся продуктами автоматически.

## Управляющий контур

- `governance/INDEX.md` — durable governance map.
- `governance/CURRENT.md` — current confirmed system state.
- `governance/GOALS.md` — outcomes, owners and success conditions.
- `governance/AUTOMATIONS.md` — scheduler-backed roles and registry conflicts.
- `governance/EFFICIENCY.md` — immutable scorecards and current synthesis.
- `governance/WEEKLY-LEARNINGS.md` — aggregated errors and lessons.
- `governance/durable-root-cause-candidate-2026-08-29.json` — current machine candidate.

`brain-management` is the operational control plane. `ai-projects-brain` is the durable source of truth.

## Read order

1. `systems/management-control-plane-contract.md`.
2. `projects/index.md` or `projects/portfolio-registry.json`.
3. Project capsule.
4. Current operational evidence when the task needs live state.
5. Governance memory for ownership, goals and lessons.

Capability routing: `systems/active-skill-map.md`; screenshot/screen-recording reconstruction routes to `/copy-ui`, while bounded verification/minimal repair remains `/audit-ui`.

## Freshness and identity rules

- Verified live behavior/source timestamps override older labels.
- A historical unreachable repo becomes `NEEDS_VERIFICATION`, not inferred deleted.
- An operational assignment requires enabled scheduler evidence.
- Immediate recovery and delayed terminal closure are different states.
- A zero-effect pilot is `EVALUATED_NO_EFFECT`, not `DONE`.
- A delivery-metric assignment requires an immutable denominator item and causal eligibility.
- Enabled finite schedules with no remaining occurrence are not runnable capacity.
- Documentation/index changes are `NO_DIRECT_METRIC_EFFECT`.
