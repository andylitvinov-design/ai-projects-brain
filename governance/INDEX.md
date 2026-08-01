# AI System Governance Index

> Durable memory about the quality of the AI-management system: goals, ownership, errors, lessons and efficiency. Operational daily data remains in Brain Management.

Last reconciled: `2026-08-01`

## Canonical files

- `CURRENT.md` — confirmed current system state and strategic blockers.
- `GOALS.md` — active outcomes, owner, next action and success definition.
- `AUTOMATIONS.md` — enabled canonical roles, health and overlap boundaries.
- `RULES.md` — durable rules, lifecycle state, usage evidence and regression/retirement criteria.
- `EFFICIENCY.md` — immutable weekly scorecards plus clearly labelled current evidence.
- `WEEKLY-LEARNINGS.md` — compact weekly failures, root causes, fixes and reusable lessons.

## Source boundary

- `brain-management` owns current operational metrics, snapshots, assignments, chains, collectors and publication receipts.
- `ai-projects-brain/governance` owns durable synthesis, accepted rules, catalog state, ownership corrections and cross-week lessons.
- Routine daily receipts are referenced, not copied.
- A durable statement must be supported by verified live evidence, GitHub evidence, immutable operational history or an explicit owner decision.

## Layer rules

1. `CURRENT.md` contains only what is true now.
2. Historical events go to `WEEKLY-LEARNINGS.md` and immutable scorecards.
3. A goal without owner, next action and success definition is incomplete.
4. An automation without exclusive role, persistence, failure signal and overlap check is unhealthy.
5. An error closes only with verification evidence.
6. Metrics must not reward skipping safety, auth, data protection or production checks.
7. Uncertain evidence remains `needs verification`.
8. Rule lifecycle changes require stable id, current usage evidence and regression/retirement condition.
9. Merge, deployment READY and HTTP status alone are not live success.
10. Current API verification includes content type, body and parseability.

## Weekly cycle

Weekly Brain Refresh reconciles durable catalog and governance according to `systems/weekly-brain-refresh.md`. Weekly Delivery System Review supplies delivery denominators; Sunday Dashboard Review supplies control-plane architecture findings. When those reviews are older than the current operational week, current receipts may inform durable state but do not replace a missing full-week scorecard.
