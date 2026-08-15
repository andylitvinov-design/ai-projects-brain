# AI System Governance Index

> Durable memory about the quality of the AI-management system: goals, ownership, errors, lessons and efficiency. Operational daily data remains in Brain Management.

Last reconciled: `2026-08-15`

## Canonical files

- `CURRENT.md` — confirmed current system state and strategic blockers.
- `GOALS.md` — active outcomes, owner, next action and success definition.
- `AUTOMATIONS.md` — scheduler-backed canonical roles, gaps and overlap boundaries.
- `RULES.md` — durable rules, lifecycle state, usage evidence and regression/retirement criteria.
- `EFFICIENCY.md` — immutable weekly scorecards plus clearly labelled current evidence.
- `WEEKLY-LEARNINGS.md` — compact weekly failures, root causes, fixes and reusable lessons.
- `durable-root-cause-candidate-2026-08-15.json` — one machine-readable candidate for the Daily Strategic Priorities scan; documentation has no direct metric effect.

## Source boundary

- `brain-management` owns current operational metrics, snapshots, assignments, chains, collectors and publication receipts.
- `ai-projects-brain/governance` owns durable synthesis, accepted rules, catalog state, ownership corrections and cross-week lessons.
- Routine daily receipts are referenced, not copied.
- Scheduler evidence is required before a recurring role is described as currently active.
- A durable statement must be supported by current live evidence, GitHub/provider evidence, immutable operational history or an explicit owner decision.

## Current evidence precedence

1. Current verified live behavior and source timestamps.
2. Current GitHub/provider reachability and deployment/source identity.
3. Immutable Brain Management operational history and receipts.
4. Durable capsule/governance state.
5. Routing/index metadata.

An older `LIVE_VERIFIED` record is historical evidence, not permanent health. If a later fail-closed freshness guard fires, `CURRENT.md` must downgrade the current state until reverified.

## Layer rules

1. `CURRENT.md` contains only what is true now.
2. Historical events go to `WEEKLY-LEARNINGS.md` and immutable scorecards.
3. A goal without owner, next action and success definition is incomplete.
4. An automation without current scheduler evidence, exclusive role, persistence, failure signal and overlap check is unhealthy or unassigned.
5. An error closes only with verification evidence.
6. Metrics must not reward skipping safety, auth, data protection or production checks.
7. Uncertain evidence remains `NEEDS_VERIFICATION`.
8. Rule lifecycle changes require stable id, current usage evidence and regression/retirement condition.
9. Merge, deployment READY and HTTP status alone are not live success.
10. Current API verification includes content type, body, parseability and underlying source age.
11. Diagnostic provider projects are not canonical identities unless the durable project mapping explicitly changes.
12. A historical repository URL that is currently unreachable cannot remain a confirmed canonical repo.
13. An enabled executor without a complete consumable assignment is `PIPELINE_BROKEN`, not healthy.
14. Ranking must receive current authorized capability evidence; a disproven blocker requires a re-rank.
15. Mixed route behavior that serves one stale HTTP 200 alongside fail-closed routes fails atomic publication health.

## Weekly cycle

Weekly Brain Refresh reconciles durable catalog and governance according to `systems/weekly-brain-refresh.md`. Weekly Delivery System Review supplies execution-quality evidence; Sunday Dashboard Review supplies control-plane architecture findings. When the latest full-week reviews predate the current reconciliation, current operational receipts may update `CURRENT.md` and durable lessons but must not manufacture a missing full-week denominator.
