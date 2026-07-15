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

1. Preserve prior values.
2. Update canonical JSON.
3. Regenerate canonical Markdown from the same snapshot.
4. Validate the goal pyramid and project-health model.
5. Sync identical JSON to `brain-management`.
6. Verify deploy and visible live UI separately.

When a full JSON rewrite cannot be performed safely, do not overwrite a partial snapshot. Persist the applied harness change and Morning handoff, then mark `DASHBOARD_UPDATE_BLOCKED` with the exact reason.

## Evidence rules

- Audit scores are readiness evidence, not business outcomes.
- Missing evidence stays `unknown`.
- Non-applicable stays `NOT_APPLICABLE`.
- A merge or deploy-ready state is not live.
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
