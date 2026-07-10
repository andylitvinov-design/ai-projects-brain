# Agent Learning Metrics

Last updated: 2026-07-10 Morning System Upgrade

Purpose: measure whether the agent harness actually improves behavior instead of only adding more rules.

## Evidence rule

Never count a metric without evidence. Acceptable evidence:

- delivery outcome ledger entry;
- automation report;
- GitHub issue or PR;
- user correction;
- prompt regression test;
- replay case;
- behavior fixture output;
- validation output;
- GitHub Actions/check log;
- live ChatGPT Automation prompt update confirmed by the Automations tool;
- cited public trend research used only for metric-model review.

## Current baseline

| Metric | Count | Evidence | Notes |
| --- | ---: | --- | --- |
| provider/live gate triggered | 2 | Psihotavr issue #168; Finance issue #614 | Both are provider/live proof blockers routed out of upgrade mode. |
| false-success prevention candidates | 2 | `provider-dependent-feature-without-provider-proof`; Evening Review 2026-07-03 | Candidate until replay/regression is run from checkout. |
| user corrections converted to harness artifacts | 4 | Delivery ledger 2026-07-04; prompt regression/replay candidates; upgrade-cycle metrics contract 2026-07-09 | Daily Improve strategic-portfolio correction, Morning Upgrade applied/no-safe-upgrade correction, morning/evening metrics split, and Health Delta Table requirement are now durable harness artifacts. |
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, replay/regression scaffolds. |
| upgrade cycle metrics contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; automation prompt registry 2026-07-09 | Defines Evening health scoring and Morning applied-upgrade metrics so the loop measures health before changing rules. |
| health delta reporting contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; ChatGPT Automations update 2026-07-09 | Morning must report before/after/delta/confidence/evidence after applied upgrades. |
| evening health delta verifications completed | 1 | Evening Architecture Review 2026-07-09; `system-health-dashboard.md`; `delivery-outcome-ledger.md` | Evening accepted structural Morning improvements, corrected full validation-evidence confidence down to low, and wrote a ranked Morning handoff. |
| metric model trend-review contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; ChatGPT Automations update 2026-07-09 | Evening may update metric candidates based on current reliability/guardrail/DORA/SPACE trends, with evidence and lifecycle control. |
| live automation prompts updated for metrics split | 2 | ChatGPT Automations tool update 2026-07-09 | Morning System Upgrade and Evening Architecture Review live prompts were updated to use the score/implementation split and then updated again for health delta + trend-review behavior. |
| replay cases defined | 5 | `failure-replay-cases.json` | Defined, not live behavior-executed. |
| prompt regressions defined | 6 | `prompt-regression-tests.json`; Morning System Upgrade 2026-07-09 | Every behavior replay fixture ID now has matching prompt-regression coverage. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs`; Morning System Upgrade 2026-07-05 through 2026-07-09 | Validator reads prompt regressions, replay cases, behavior replay fixtures, automation registry contracts, learning-metric counts, CI workflow contract, fixture-to-prompt/replay ID coverage, and CI raw-evidence artifact contract. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs`; Morning System Upgrade 2026-07-07 | Deterministic offline runner for saved output fixtures. This is not a live model replay and does not touch product/provider state. |
| behavior replay fixtures defined | 5 | `projects/codex-automation/behavior-replay-fixtures.json`; Morning System Upgrade 2026-07-07 | Fixtures cover provider/live false success, Daily Improve portfolio strategy, Morning report-only completion, improve/upgrade boundary drift, and save/memory/handoff confusion. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml`; Morning System Upgrade 2026-07-08 and 2026-07-09 | Workflow runs the four harness validators on PR, push to main, and manual dispatch; as of 2026-07-09 it also writes each validator's raw console output to `agent-harness-validation-evidence` and uploads it as an artifact. |
| CI raw evidence artifact capture defined | 1 | `.github/workflows/agent-harness-validators.yml`; `scripts/validate-agentic-prompts.mjs`; Morning System Upgrade 2026-07-09 | The workflow now captures `validate-agentic-prompts.log`, `run-behavior-replay-fixtures.log`, `verify-context-scout.log`, and `validate-projects-brain.log`; the validator now fails if the artifact contract is removed. This is CI-observability setup, not a passed CI run. |
| unified harness evidence runners defined | 1 | PR #98; `scripts/run-agent-harness-validation-evidence.mjs`; CI run #40 | One script now creates/cleans the evidence directory, runs all four validators, writes four logs, and exits non-zero if any validator fails. The prompt validator protects this contract. |
| raw CI workflow runs fetched | 1 | PR #98; Agent Harness Validators run #40; job 86305828251 | Raw job logs were fetched. All four validator commands exited 0 and the workflow concluded success. |
| validation commands run | 7 | PR #95 reported 3 commands; PR #98 CI run #40 provides raw output for 4 commands | The four fresh CI commands all exited 0: prompt validator, behavior fixtures, context-scout, and projects-brain validation. |
| validation evidence propagation fixes | 1 | Evening Architecture Review 2026-07-06; PR #96 | Metrics and handoff wording were revised after PR #95 changed the evidence state from no validation to PR-reported validation. |
| stale safe-harness PR reconciled | 2 | PR #92 closed unmerged; PR #97 superseded by direct fresh-main safe harness commits on 2026-07-09 | Do not merge stale/unmergeable safe-harness branches blindly; apply or recreate smallest fresh-main equivalent instead. |
| unvalidated safe-harness PRs requiring reconciliation | 0 | Morning System Upgrade 2026-07-09 | PR #97's intended fixture-to-prompt coverage was applied directly on fresh main and the stale PR is closed/superseded. |
| prompt-to-behavior fixture coverage fixes | 1 | Morning System Upgrade 2026-07-09; `prompt-regression-tests.json`; `scripts/validate-agentic-prompts.mjs` | Added missing prompt-regression coverage and made the validator fail if any behavior fixture lacks matching prompt-regression and replay coverage. |
| behavior replay fixture local samples passed | 11 | Morning System Upgrade 2026-07-09 reconstructed local run; PR #98 CI run #40 raw output | CI independently confirmed 5 fixtures and 11 samples passed (6 expected pass, 5 expected fail). This is deterministic saved-output evidence, not live model behavior. |
| agentic prompt validator local run passed | 1 | Morning System Upgrade 2026-07-09 reconstructed local validator run | Local reconstructed validation passed on the prompt/replay/behavior/registry/metrics/workflow contract set. |
| agentic prompt validator CI runs passed | 1 | PR #98; Agent Harness Validators run #40 raw job log | Fresh CI raw output confirms 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 7 automation contracts, metrics alignment, mapping coverage, workflow contract, and unified runner contract. |

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
upgrade_cycle_metrics_contract_defined:
health_delta_reporting_contract_defined:
evening_health_delta_verification_completed:
metric_model_trend_review_contract_defined:
live_automation_prompt_updated:
validator_defined:
validation_ci_workflow_defined:
validation_passed:
validation_failed:
unvalidated_harness_pr_requiring_reconciliation:
ci_raw_evidence_artifact_capture_defined:
raw_ci_workflow_run_fetched:
unified_harness_evidence_runner_defined:
agentic_prompt_validator_ci_run_passed:
```

## Reporting rule

If metrics are not updated, the report must state why. Lack of local checkout, unavailable ledger, or missing replay runner is a valid reason; guessing is not.

## Validator coverage note

As of 2026-07-09, `scripts/validate-agentic-prompts.mjs` checks that:

- prompt regression and replay JSON files are parseable and schema-shaped;
- behavior replay fixture JSON is parseable, maps to replay cases, maps to prompt regressions, and contains both expected-pass and expected-fail samples;
- required anti-drift cases exist;
- provider-dependent false success is blocked by the regression/replay/fixture contract;
- Daily Improve keeps strategic portfolio output requirements;
- Morning System Upgrade keeps `APPLIED_UPGRADE / NO_SAFE_UPGRADE` requirements;
- this metrics table stays aligned with the actual number of prompt regressions, replay cases, and behavior replay fixtures;
- `scripts/run-agent-harness-validation-evidence.mjs` runs all four validators, writes four raw logs, and fails non-zero if any validator fails;
- `.github/workflows/agent-harness-validators.yml` calls that single runner and uploads `agent-harness-validation-evidence`;
- PR #98 CI run #40 produced and exposed raw output for all four validators plus the four-file artifact.

`run-behavior-replay-fixtures.mjs` is the first deterministic behavior replay layer. It validates saved example outputs against fixed guardrail evaluators. It is stronger than schema validation, but it is still not live model output. Do not promote behavior rules from `candidate` to `active` until a checkout/CI run produces output or a real automation report proves the gate prevented a bad completion.

## Evidence propagation note

Do not leave stale metric wording after a later PR or automation report changes the evidence state. Distinguish:

1. `not run` — no checkout/CI/PR evidence exists;
2. `PR-reported run` — a PR verification section says commands ran, but raw output is unavailable;
3. `CI workflow defined` — GitHub Actions or another runner is wired to produce raw logs, but has not yet produced a pass/fail output;
4. `CI raw evidence artifact capture defined` — the workflow is wired to save validator command output as downloadable logs, but a passing run has not yet been fetched;
5. `raw validation output available` — command logs or CI output are available and can support promotion of structural rules;
6. `behavior replay fixture passed` — deterministic saved-output fixtures passed locally/CI, but live model behavior is still not proven;
7. `behavior replay passed` — a replay runner, live automation evidence, or real prevention evidence supports promoting behavior rules.