# Evening Architecture Review Handoff

Last updated: 2026-07-04

## Evidence reviewed

- `systems/provider-live-readiness-gate.md` defines that code merge is not enough for provider/live work and requires separate proof layers before `SUCCESS`.
- `systems/harness-rule-lifecycle.md` defines `candidate`, `active`, `needs_revision`, `deprecated`, and `rejected`, and says global rules require evidence before promotion.
- `projects/codex-automation/delivery-outcome-ledger.md` contains provider/live blocker evidence for Psihotavr and Finance, plus 2026-07-04 harness feedback-loop scaffolding.
- `projects/codex-automation/prompt-regression-tests.json` already contains candidates for provider/live false success, Daily Improve strategic portfolio output, Morning Upgrade applied/no-safe-upgrade behavior, and `/improve`/`/upgrade` boundary drift.
- `projects/codex-automation/failure-replay-cases.json` existed but did not yet include replay cases for the two 2026-07-04 user corrections: Daily Improve becoming only bug triage, and Morning Upgrade becoming report-only.
- `projects/codex-automation/agent-learning-metrics.md` counted 3 prompt regressions even though 4 were already defined.
- User corrections on 2026-07-04 established two repeated harness risks: Daily Improve must be a strategic vision loop with prompts across projects, and Morning System Upgrade must apply a material safe update or prove `NO_SAFE_UPGRADE`.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, or secret-adjacent change was executed from this review.

## Repeated patterns found

1. The feedback loop now has artifacts, but several are still candidates and not yet executed by a replay/regression runner.
2. User corrections exposed role drift at the automation boundary:
   - Daily Improve can shrink to bug triage instead of strategic portfolio planning.
   - Morning Upgrade can shrink to analysis/reporting instead of safe implementation.
3. Metrics can drift from artifacts: prompt regressions were counted as 3 while the file already contained 4.

## Selected root structural issue

The system has moved from missing feedback-loop artifacts to unexecuted feedback-loop artifacts. The highest leverage issue is now making replay/regression artifacts verifiable by validators or runners, so rules do not remain decorative candidates.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - daily-improve-strategic-portfolio-not-only-bugs
  - morning-upgrade-report-only-without-applied-upgrade
- promoted to active:
  - none; no replay/regression runner evidence yet
- needs_revision:
  - none; existing rules were improved today but not yet proven ineffective after update
- deprecated/rejected:
  - none
- evidence:
  - user corrections 2026-07-04
  - prompt-regression-tests.json candidates
  - delivery-outcome-ledger.md entries
```

## Replay coverage and result

Safe update applied: added replay candidates for:

1. `daily-improve-strategic-portfolio-not-only-bugs`
2. `morning-upgrade-report-only-without-applied-upgrade`

Replay result: not executed in this connector-only run. Status remains `candidate`.

## Learning metrics

Safe update applied:

- Corrected `prompt regressions defined` from 3 to 4.
- Corrected `replay cases defined` from 3 to 5.
- Added `user corrections converted to harness artifacts = 2`.

Metrics were not marked as passed/failed because no local runner or validator was executed.

## Safe docs changes applied

- Updated `projects/codex-automation/failure-replay-cases.json`.
- Updated `projects/codex-automation/delivery-outcome-ledger.md`.
- Updated `projects/codex-automation/agent-learning-metrics.md`.
- Updated `projects/codex-automation/morning-handoff-queue.md` with the next safe `/upgrade` action.
- Updated this handoff.

## Prompt regression tests

No new prompt-regression entry was needed: matching candidates already exist in `prompt-regression-tests.json`.

Next required safe improvement: verify that a validation script reads both prompt regressions and replay cases, or add the smallest validator that catches malformed JSON, duplicate IDs, missing required fields, and candidate/status drift.

## Agent-ready tickets

No new product/provider ticket created from this run. Existing product/provider work remains:

- Psihotavr provider/live proof: continue with `/delivery`, `/safe`, or `/audit-ui` against the product issue.
- Finance provider-balance proof: continue with `/audit-fin` against the finance issue.

## Suggested skills

```txt
suggested skills:
- existing route used: /upgrade
- new skill proposed: no
- reason: this is harness/docs validation work and fits the existing upgrade route
- source-of-truth update needed: validators or replay runner integration
```

## Validation

Not run from this connector-only review. Required next commands from a real checkout:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

## Needs verification

- Whether current validation scripts load `prompt-regression-tests.json` and `failure-replay-cases.json`.
- Whether the two new replay cases should gain a more formal schema field after the runner exists.
- Whether Daily Improve's live automation prompt and registry mirror stay synchronized over the next run.

## Single next action

Morning System Upgrade should implement or verify the smallest replay/regression validator integration for `prompt-regression-tests.json` and `failure-replay-cases.json`, then run the three project-brain validation commands from a real checkout.
