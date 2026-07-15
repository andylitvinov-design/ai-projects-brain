# Evening Architecture Upgrade Runtime Contract

Status: active.

Purpose: keep the recurring Evening Architecture Upgrade small, deterministic and recoverable. The full metric definitions remain in `systems/upgrade-cycle-metrics.md`; the automation prompt must reference them rather than duplicate them.

## Required inputs

Read, in order:

1. `systems/upgrade-cycle-metrics.md`.
2. `projects/codex-automation/system-health-dashboard.json`.
3. `projects/codex-automation/system-health-dashboard.md`.
4. `projects/portfolio-registry.json`.
5. the latest Morning result and Daily Strategic Improve result when available.
6. current agent-assessment memories only when changed since the previous snapshot.

Do not reread unchanged large project files unless a project is selected for the applied upgrade.

## Execution budget

1. Reconcile the previous unresolved handoff first.
2. Select one highest-leverage safe weakness.
3. Apply one primary upgrade; apply at most two additional tightly related changes.
4. Prefer schema, validator, test, registry, prompt or automation-contract changes.
5. Stop broad portfolio scanning once enough evidence exists to select the upgrade.

## Snapshot and publisher ownership

1. Morning and Evening upgrade writers own canonical business, project, metric and handoff content.
2. Publication CI must not regenerate a generic Morning snapshot on every push.
3. Publication CI may apply only an explicit, schema-validated pending upgrade record and must consume it exactly once.
4. Without an explicit pending record, publication CI validates and mirrors the committed snapshot byte-for-byte.
5. The publisher may add commit/blob evidence to the external publication trace, but it must not replace project evidence, metric history, unknown states, `NOT_APPLICABLE` states or the current run identity.
6. A fixed deploy ID, fixed timestamp or fixed provider result in a reusable writer/publisher is forbidden. Provider evidence must come from the current run or remain stale/unknown.
7. Morning and Evening may run close together, but the canonical writer must reread current `main`, preserve unrelated fields and use a fresh-main/dedup gate before writing.

## Recovery states

A run must finish in one of these states:

- `APPLIED_UPGRADE`: a safe real change was written and validated.
- `NO_SAFE_UPGRADE`: every candidate was unsafe, duplicate, unsupported or already complete.
- `PARTIAL_UPGRADE_RECOVERABLE`: at least one durable change was saved, but dashboard sync, validation or publication could not be completed.

`PARTIAL_UPGRADE_RECOVERABLE` is not success and must include:

- completed step;
- failed step;
- exact file or provider involved;
- last verified evidence;
- one resumable next action.

Never return only a generic scheduled-task error when a partial result can be persisted.

## Dashboard write order

1. Reread the current canonical snapshot and preserve prior values/history.
2. Apply the explicit Morning/Evening snapshot or validated pending upgrade record.
3. Update canonical JSON.
4. Update canonical Markdown from the same snapshot.
5. Validate the goal pyramid, project-health model and exact-snapshot publisher topology.
6. Sync identical JSON to `brain-management`.
7. Record canonical/mirror commit and blob evidence in the publication trace.
8. Verify deploy and visible live UI separately.

When a full JSON rewrite cannot be performed safely, do not overwrite a partial snapshot. Persist the applied harness change and Morning handoff, then mark `DASHBOARD_UPDATE_BLOCKED` with the exact reason.

## Evidence rules

- Audit scores are readiness evidence, not business outcomes.
- Missing evidence stays `unknown`.
- Non-applicable stays `NOT_APPLICABLE`.
- A merge or deploy-ready state is not live.
- A previous snapshot's LIVE proof cannot be reused for a newer canonical timestamp.
- Public state is `LIVE` only after timestamp equality and visible Portfolio Health, project selection and goal-pyramid verification.

## Compact final report

1. Dashboard and public state.
2. Status.
3. Main upgrade applied.
4. Changed files and automation.
5. Validation.
6. Portfolio/project/goal impact.
7. Guardrails and publication ladder.
8. Morning handoff.
9. Unknown or blocked work.
