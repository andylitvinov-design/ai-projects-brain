# Agent Learning Metrics

Last updated: 2026-07-08

Purpose: measure whether the agent harness actually improves behavior instead of only adding more rules.

## Evidence rule

Never count a metric without evidence. Acceptable evidence:

- delivery outcome ledger entry;
- automation report;
- GitHub issue or PR;
- user correction;
- prompt regression test;
- replay case;
- validation output.

## Current baseline

| Metric | Count | Evidence | Notes |
| --- | ---: | --- | --- |
| provider/live gate triggered | 2 | Psihotavr issue #168; Finance issue #614 | Both are provider/live proof blockers routed out of upgrade mode. |
| false-success prevention candidates | 2 | `provider-dependent-feature-without-provider-proof`; Evening Review 2026-07-03 | Candidate until replay/regression is run from checkout. |
| user corrections converted to harness artifacts | 2 | Delivery ledger 2026-07-04; prompt regression/replay candidates | Daily Improve strategic-portfolio correction and Morning Upgrade applied/no-safe-upgrade correction. |
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, replay/regression scaffolds. |
| replay cases defined | 5 | `failure-replay-cases.json` | Defined, not behavior-executed. |
| prompt regressions defined | 5 | `prompt-regression-tests.json` | Defined, not behavior-executed. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs`; Morning System Upgrade 2026-07-05 through 2026-07-08 | Validator now reads prompt regressions, replay cases, behavior replay fixtures, automation registry contracts, learning-metric counts, and the CI workflow contract to catch artifact/metrics/runner drift. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs`; Morning System Upgrade 2026-07-07 | Deterministic offline runner for saved output fixtures. This is not a live model replay and does not touch product/provider state. |
| behavior replay fixtures defined | 5 | `projects/codex-automation/behavior-replay-fixtures.json`; Morning System Upgrade 2026-07-07 | Fixtures cover provider/live false success, Daily Improve portfolio strategy, Morning report-only completion, improve/upgrade boundary drift, and save/memory/handoff confusion. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml`; Morning System Upgrade 2026-07-08 | Workflow runs the four harness validators on PR, push to main, and manual dispatch. This creates a path to raw validation logs, but does not itself count as a passed validation until a workflow/check run output exists. |
| validation commands run | 3 | ai-projects-brain PR #95 verification section | PR #95 reports `validate-agentic-prompts`, `validate-projects-brain`, and `verify-context-scout` were run before merge. Raw command output / Actions logs are not available in this connector review, so behavior rules remain candidates. |
| validation evidence propagation fixes | 1 | Evening Architecture Review 2026-07-06; PR #96 | Metrics and handoff wording were revised after PR #95 changed the evidence state from no validation to PR-reported validation. |
| stale safe-harness PR reconciled | 1 | PR #92 closed unmerged; PR #95 and PR #96 merged | The old validator ID-drift PR no longer remains open/non-mergeable; do not merge stale hunks blindly. |

## Metrics to update after each run

```txt
provider_live_gate_triggered:
false_success_blocked:
red_loop_blocked_guessing:
large_plan_split:
rule_promoted_active:
rule_marked_needs_revision:
rule_deprecated:
replay_case_passed:
replay_case_failed:
prompt_regression_passed:
prompt_regression_failed:
behavior_replay_fixture_passed:
behavior_replay_fixture_failed:
user_correction_recorded:
validator_defined:
validation_ci_workflow_defined:
validation_passed:
validation_failed:
```

## Reporting rule

If metrics are not updated, the report must state why. Lack of local checkout, unavailable ledger, or missing replay runner is a valid reason; guessing is not.

## Validator coverage note

As of 2026-07-08, `scripts/validate-agentic-prompts.mjs` checks that:

- prompt regression and replay JSON files are parseable and schema-shaped;
- behavior replay fixture JSON is parseable, maps to replay cases, and contains both expected-pass and expected-fail samples;
- required anti-drift cases exist;
- provider-dependent false success is blocked by the regression/replay/fixture contract;
- Daily Improve keeps strategic portfolio output requirements;
- Morning System Upgrade keeps `APPLIED_UPGRADE / NO_SAFE_UPGRADE` requirements;
- this metrics table stays aligned with the actual number of prompt regressions, replay cases, and behavior replay fixtures;
- `.github/workflows/agent-harness-validators.yml` exists and runs the four expected Node validation commands.

`run-behavior-replay-fixtures.mjs` is the first deterministic behavior replay layer. It validates saved example outputs against fixed guardrail evaluators. It is stronger than schema validation, but it is still not live model output. Do not promote behavior rules from `candidate` to `active` until a checkout/CI run produces output or a real automation report proves the gate prevented a bad completion.

## Evidence propagation note

Do not leave stale metric wording after a later PR or automation report changes the evidence state. Distinguish:

1. `not run` — no checkout/CI/PR evidence exists;
2. `PR-reported run` — a PR verification section says commands ran, but raw output is unavailable;
3. `CI workflow defined` — GitHub Actions or another runner is wired to produce raw logs, but has not yet produced a pass/fail output;
4. `raw validation output available` — command logs or CI output are available and can support promotion of structural rules;
5. `behavior replay fixture passed` — deterministic saved-output fixtures passed locally/CI, but live model behavior is still not proven;
6. `behavior replay passed` — a replay runner, live automation evidence, or real prevention evidence supports promoting behavior rules.
