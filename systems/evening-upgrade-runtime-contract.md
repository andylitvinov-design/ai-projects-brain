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
6. the current public publication receipt at `https://brain-management.netlify.app/system-health-dashboard/data/current-publication-receipt.json` when available.
7. current agent-assessment memories only when changed since the previous snapshot.

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

## Immutable publication receipt boundary

1. The canonical dashboard JSON is a business and metric snapshot. Do not mutate its project evidence, metric history or `last_updated` solely to record a later deploy result.
2. A production workflow may publish a separate receipt only after all of these pass for the same snapshot timestamp:
   - public JSON timestamp equals canonical/mirror `last_updated`;
   - Netlify deploy metadata is current and READY;
   - Portfolio Health is visible;
   - project matrix and selectable project detail are visible;
   - the three-goal metric pyramid and required JS modules are present.
3. A receipt is valid only when its `snapshot_timestamp` and `public_last_updated` both equal the current dashboard `last_updated`, its deploy timestamp is not earlier in absolute time, its source commit is a 40-character SHA, and every required UI check is true.
4. Compare timestamps with parsed instants, never lexical text or displayed local clock values.
5. The public UI may overlay `LIVE`, publication `4/4` and Publication Freshness `PASS` from a valid receipt without rewriting the immutable business snapshot.
6. A missing, stale, mismatched or incomplete receipt must be ignored; canonical `STALE`/`NEEDS_VERIFICATION` remains authoritative.
7. A new canonical timestamp automatically invalidates every older receipt. Never carry LIVE proof forward across snapshot timestamps.
8. Reconcile receipt evidence before selecting the evening upgrade. Treat READY deploy metadata without the matching public timestamp and UI receipt as `NEEDS_VERIFICATION`, not PASS.

## Trigger-independent publication recovery

1. The canonical Brain Management publisher remains the only workflow allowed to deploy the dashboard or create a publication receipt.
2. A separate recovery watchdog may check the current mirror, public JSON and public receipt, then dispatch the canonical publisher when exact-snapshot proof is missing.
3. The watchdog must not contain Netlify credentials, provider mutation logic or direct deployment commands.
4. A valid matching receipt and equal public timestamp require a healthy no-op; stale, missing or invalid evidence requires dispatch rather than a false `LIVE` claim.
5. Keep one manual trigger and a low-frequency GitHub-native schedule so publication can recover even when a push or cross-repository dispatch is missed.
6. A retry commit, queued workflow or dispatch request is not publication evidence. The run remains `STALE` until the canonical publisher produces a matching receipt and visible UI proof.

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
2. Reconcile a matching external publication receipt as live evidence without changing the canonical business timestamp.
3. Apply the explicit Morning/Evening snapshot or validated pending upgrade record.
4. Update canonical JSON.
5. Update canonical Markdown from the same snapshot.
6. Validate the goal pyramid, project-health model and exact-snapshot publisher topology.
7. Sync identical JSON to `brain-management`.
8. Record canonical/mirror commit and blob evidence in the publication trace.
9. Verify deploy and visible live UI separately through the matching receipt.

When a full JSON rewrite cannot be performed safely, do not overwrite a partial snapshot. Persist the applied harness change and Morning handoff, then mark `DASHBOARD_UPDATE_BLOCKED` with the exact reason.

## Evidence rules

- Audit scores are readiness evidence, not business outcomes.
- Missing evidence stays `unknown`.
- Non-applicable stays `NOT_APPLICABLE`.
- A merge or deploy-ready state is not live.
- A previous snapshot's LIVE proof cannot be reused for a newer canonical timestamp.
- Public state is `LIVE` only after timestamp equality and visible Portfolio Health, project selection and goal-pyramid verification.
- A receipt is presentation/live evidence only; it cannot change portfolio, project, commercial or audit outcomes.

## Compact final report

1. Dashboard and public state.
2. Status.
3. Main upgrade applied.
4. Changed files and automation.
5. Validation.
6. Portfolio/project/goal impact.
7. Guardrails and publication ladder.
8. Receipt status and timestamp match.
9. Morning handoff.
10. Unknown or blocked work.
