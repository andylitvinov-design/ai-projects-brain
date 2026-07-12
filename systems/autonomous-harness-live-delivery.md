# Autonomous Harness Live Delivery

Use this contract for Morning System Upgrade, Weekly Self-Harness Review, `/upgrade`, `/learn-pass`, and any task that changes Andrey's agent/Codex operating system.

## Default behavior

A safe harness improvement is an execution task, not a report-only task.

When a confirmed failure can be fixed safely, the agent must complete the whole available chain itself:

```txt
inspect -> fresh-main/dedup gate -> minimal change -> validation -> PR -> CI -> merge -> deploy/sync -> live verification -> memory/report update
```

Do not stop after analysis, a patch, a prompt, an issue, or an open PR when the remaining steps are safe and available through connected tools.

## Autonomous actions

Without asking for another confirmation, the agent should:

- create or reuse the correct branch/PR;
- apply safe docs, rules, memory, schema, validator, fixture, automation-prompt, dashboard, and harness-script changes;
- run the narrowest meaningful local or CI checks;
- fix failing harness checks caused by the proposed change or clearly exposed adjacent harness drift;
- merge a green, low-risk harness PR when repository policy allows;
- update the canonical dashboard/memory/handoff records required by the change;
- sync the public mirror or deployment source when the change affects a live dashboard, docs site, agent portal, or other published operating-system surface;
- trigger or allow the configured deployment path;
- verify the deployed commit, public URL, visible timestamp/content, and relevant behavior before claiming live success.

## Live delivery boundary

`Merged` is not `live`.

For a published harness surface, use this evidence ladder:

```txt
canonical_updated
mirror_synced
production_branch_contains_change
deploy_identified
deployed_source_commit_matches
live_url_checked
live_content_or_behavior_verified
```

Report `LIVE` only when every required stage is proven.

Use `STALE`, `BLOCKED`, or `NEEDS_VERIFICATION` when any required stage is missing. Name the exact missing layer and continue every other safe step.

## Safe auto-merge and deploy scope

Autonomous merge/deploy is allowed only when all are true:

- the change is limited to harness/docs/rules/memory/validators/fixtures/dashboard publication or another explicitly low-risk operating-system surface;
- no secrets or environment values are read, printed, changed, or requested;
- no auth, payment, financial data, user data, destructive migration, account, billing, or irreversible action is involved;
- fresh-main and duplicate-work checks pass;
- required CI or validators pass;
- repository and deploy mapping are proven from `projects.md`, `projects.json`, project memory, or provider metadata;
- rollback is available through commit revert, prior deploy, or documented provider rollback;
- project policy does not require additional human approval.

If these conditions are not met, do not fake completion. Finish all safe preparation, then create or update one precise issue/PR/handoff containing the blocker, exact files, checks, risk, rollback, and next action.

## Failure recovery

When CI, merge, sync, deploy, or live verification fails:

1. Prove the failing layer.
2. Fix the smallest safe cause.
3. Re-run the failed check.
4. Continue the same PR/deployment path instead of creating duplicates.
5. Stop only at a real safety, permissions, provider, or policy boundary.

A failed first attempt is not a reason to return a prompt to Andrey when connected tools can safely continue.

## Ponytail role

Ponytail helps choose the smallest implementation and remove duplication. It must not turn execution into passive advice or stop safe merge, deploy, and live verification.

## Required final status

Every applicable run must report:

```txt
Execution status: APPLIED_UPGRADE / NO_SAFE_UPGRADE / BLOCKED
Freshness / duplicate-work gate: ...
PR / merge: ...
Checks / CI: ...
Deployment mapping: ...
Deploy: ...
Live verification: LIVE / STALE / BLOCKED / NEEDS_VERIFICATION
Canonical memory / STATE / LOG / dashboard update: ...
Remaining blocker: none / exact blocker
```

A run cannot report `APPLIED_UPGRADE` as fully complete when a required public surface remains unverified. Use `APPLIED_UPGRADE + LIVE`, `APPLIED_UPGRADE + STALE`, or `APPLIED_UPGRADE + NEEDS_VERIFICATION`.