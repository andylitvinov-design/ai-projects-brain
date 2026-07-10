# Agent Learning Metrics

Last updated: 2026-07-10 Evening Architecture Review

Purpose: measure whether the agent harness actually improves behavior instead of only adding more rules.

## Evidence rule

Never count a metric without evidence. Acceptable evidence:

- delivery outcome ledger entry;
- automation report or live Automations state;
- GitHub issue or PR;
- user correction;
- prompt regression test;
- replay case;
- behavior fixture output;
- validation output;
- GitHub Actions/check log and artifact;
- live ChatGPT Automation prompt/state update confirmed by the Automations tool;
- cited public trend research used only for metric-model review.

## Current baseline

| Metric | Count | Evidence | Notes |
| --- | ---: | --- | --- |
| provider/live gate triggered | 2 | Psihotavr issue #168; Finance issue #614 | Both remain provider/live proof blockers routed out of upgrade mode. |
| false-success prevention candidates | 2 | `provider-dependent-feature-without-provider-proof`; Evening Review 2026-07-03 | Behavior-level candidates remain separate from structural validation proof. |
| user corrections converted to harness artifacts | 4 | Delivery ledger 2026-07-04; upgrade-cycle metrics contract 2026-07-09 | No new durable user-correction artifact was counted tonight. |
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, and replay/regression scaffolds. |
| upgrade cycle metrics contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; automation prompt registry | Defines Evening scoring and Morning applied-upgrade metrics. |
| health delta reporting contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; live automation prompts | Morning must report before/after/delta/confidence/evidence. |
| evening health delta verifications completed | 2 | Evening Reviews 2026-07-09 and 2026-07-10 | Tonight accepted Morning's raw-evidence improvements, fetched a second CI artifact, corrected automation liveness, and wrote the next handoff. |
| metric model trend-review contracts defined | 1 | `systems/upgrade-cycle-metrics.md` | Current candidate refinement adds scheduler liveness under automation noise/loop closure; no new top-level metric. |
| live automation prompts updated for metrics split | 2 | ChatGPT Automations update 2026-07-09 | Morning and Evening prompts retain the health-delta split. |
| replay cases defined | 5 | `failure-replay-cases.json` | Defined; live behavior execution is not claimed. |
| prompt regressions defined | 6 | `prompt-regression-tests.json` | Every current behavior fixture ID has matching prompt-regression coverage. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs` | Reads prompt/replay/fixture/registry/metrics/workflow and unified-runner contracts. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs` | Deterministic saved-output runner, not live model replay. |
| behavior replay fixtures defined | 5 | `behavior-replay-fixtures.json` | Covers the five existing failure classes. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml` | Runs the unified evidence runner on PR, main push, and manual dispatch. |
| CI raw evidence artifact capture defined | 1 | workflow + prompt validator | Captures the four expected logs and fails if the contract disappears. |
| unified harness evidence runners defined | 1 | PR #98; `run-agent-harness-validation-evidence.mjs` | One script runs all four validators locally and in CI. |
| raw CI workflow runs fetched | 2 | runs #40 and #42 | Both PR runs completed successfully and exposed the four-file artifact. Post-merge push-run lookup remains unavailable. |
| validation commands run | 11 | PR #95 reported 3; runs #40 and #42 provide 4 each | The eight fresh raw CI commands all completed through the unified runner. |
| validation evidence propagation fixes | 1 | PR #96 | Evidence states remain separated. |
| stale safe-harness PR reconciled | 2 | PR #92 closed; PR #97 superseded | No stale safe-harness PR remains queued. |
| unvalidated safe-harness PRs requiring reconciliation | 0 | Morning System Upgrade 2026-07-09 | Current harness changes use fresh branches and CI. |
| prompt-to-behavior fixture coverage fixes | 1 | Morning System Upgrade 2026-07-09 | Validator requires fixture-to-prompt and fixture-to-replay mapping. |
| behavior replay fixture local samples passed | 11 | reconstructed local run and raw CI runs | Five fixtures / eleven samples passed; this is deterministic saved-output evidence. |
| agentic prompt validator local run passed | 1 | Morning System Upgrade 2026-07-09 | Reconstructed local validation passed. |
| agentic prompt validator CI runs passed | 2 | runs #40 and #42 | Both raw CI runs passed the prompt validator and unified-runner contract. |
| live automation state checks completed | 1 | Evening Architecture Review 2026-07-10; Automations tool | Core recurring automations were compared against registry intent. |
| required recurring automations re-enabled after drift | 1 | Morning System Upgrade automation state update 2026-07-10 | Existing schedule was restored; no duplicate was created. |
| active duplicate core automations found | 0 | Live Automations list 2026-07-10 | No duplicate active Morning, Evening, Daily Improve, PR Merge, Delivery, or Weekly Safe loops were found. |
| scheduler-liveness regression candidates | 1 | Evening Architecture Review 2026-07-10 | `recurring-automation-disabled-after-successful-run` is queued for Morning implementation. |

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
live_automation_state_check_completed:
required_recurring_automation_reenabled:
active_duplicate_core_automation_found:
scheduler_liveness_regression_candidate:
```

## Reporting rule

If metrics are not updated, the report must state why. Missing live access, unavailable raw output, or absent replay evidence is a valid reason; guessing is not.

## Validator coverage note

As of 2026-07-10, `scripts/validate-agentic-prompts.mjs` checks that:

- prompt regression and replay JSON files are parseable and schema-shaped;
- behavior fixtures map to replay cases and prompt regressions and include expected-pass and expected-fail samples;
- required anti-drift cases exist;
- provider-dependent false success is blocked by the saved regression/replay/fixture contract;
- Daily Improve keeps strategic portfolio requirements;
- Morning keeps `APPLIED_UPGRADE / NO_SAFE_UPGRADE` requirements;
- this metrics table stays aligned with six prompt regressions, five replay cases, and five behavior fixtures;
- the unified evidence runner calls all four validators, writes four logs, and fails non-zero on failure;
- the workflow calls the runner and uploads `agent-harness-validation-evidence`.

The validator does not have live ChatGPT Automations access. Scheduler liveness therefore requires a separate live evidence step and a prompt/replay/fixture contract rather than a false claim that CI proves enabled state.

## Evidence propagation note

Distinguish:

1. `registry contract defined`;
2. `live scheduler state verified`;
3. `expected run observed`;
4. `PR-reported run`;
5. `CI workflow defined`;
6. `CI raw evidence artifact capture defined`;
7. `raw validation output available`;
8. `behavior replay fixture passed`;
9. `live behavior/prevention evidence exists`.

Do not treat static registry state as live scheduler proof, and do not treat deterministic fixtures as live model behavior.
