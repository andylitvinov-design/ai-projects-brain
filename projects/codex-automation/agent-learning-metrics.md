# Agent Learning Metrics

Last updated: 2026-07-11 Morning System Upgrade

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
| false-success prevention candidates | 3 | provider proof; report-only Morning; recurring scheduler liveness | Scheduler-liveness false health is now a saved candidate failure class. |
| user corrections converted to harness artifacts | 4 | Delivery ledger 2026-07-04; upgrade-cycle metrics contract 2026-07-09 | No new user correction was counted today. |
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, and replay/regression scaffolds. |
| upgrade cycle metrics contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; automation prompt registry | Defines Evening scoring and Morning applied-upgrade metrics. |
| health delta reporting contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; live automation prompts | Morning must report before/after/delta/confidence/evidence. |
| evening health delta verifications completed | 2 | Evening Reviews 2026-07-09 and 2026-07-10 | Latest Evening found and repaired scheduler-state drift. |
| metric model trend-review contracts defined | 1 | `systems/upgrade-cycle-metrics.md` | Scheduler liveness remains a subdimension, not a new top-level metric. |
| live automation prompts updated for metrics split | 2 | ChatGPT Automations update 2026-07-09 | Morning and Evening prompts retain the health-delta split. |
| replay cases defined | 6 | `failure-replay-cases.json` | Added `recurring-automation-disabled-after-successful-run`; live behavior execution is not claimed. |
| prompt regressions defined | 7 | `prompt-regression-tests.json` | Every behavior fixture ID has matching prompt-regression coverage. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs` | Reads prompt/replay/fixture/registry/metrics/workflow, liveness ladder, and unified-runner contracts. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs` | Deterministic saved-output runner, not live model replay. |
| behavior replay fixtures defined | 6 | `behavior-replay-fixtures.json` | Includes liveness samples for unsafe disable/replace, safe existing-schedule repair, and no-live-access abstention. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml` | Runs the unified evidence runner on PR, main push, and manual dispatch. |
| CI raw evidence artifact capture defined | 1 | workflow + prompt validator | Captures the four expected logs and fails if the contract disappears. |
| unified harness evidence runners defined | 1 | PR #98; `run-agent-harness-validation-evidence.mjs` | One script runs all four validators locally and in CI. |
| raw CI workflow runs fetched | 3 | runs #40, #42, and #47 | Run #47 is the first passing raw CI evidence for scheduler-liveness coverage. Post-merge push-run lookup remains separately unverified. |
| validation commands run | 15 | PR #95 reported 3; runs #40, #42, and #47 provide 4 each | Run #47 raw artifact confirms all four commands exited 0. |
| validation evidence propagation fixes | 1 | PR #96 | Evidence states remain separated. |
| validation recovery fixes | 1 | PR #101 runs #46 and #47 | Run #46 exposed an overbroad negation matcher; the evaluator was narrowed and run #47 passed. |
| stale safe-harness PR reconciled | 2 | PR #92 closed; PR #97 superseded | No stale safe-harness PR remains queued. |
| unvalidated safe-harness PRs requiring reconciliation | 0 | Morning System Upgrade 2026-07-09 | Current harness changes use fresh branches and CI. |
| prompt-to-behavior fixture coverage fixes | 2 | Morning Upgrades 2026-07-09 and 2026-07-11 | Scheduler fixture maps to both prompt regression and replay case. |
| behavior replay fixture samples passed | 14 | run #47 raw artifact | Six fixtures / fourteen samples passed: eight expected pass and six expected fail. This is deterministic saved-output evidence, not live model behavior. |
| agentic prompt validator local run passed | 1 | Morning System Upgrade 2026-07-09 | Reconstructed local validation passed. |
| agentic prompt validator CI runs passed | 3 | runs #40, #42, and #47 | Run #47 confirms seven prompt regressions, six replay cases, six behavior fixtures, seven automation contracts, metrics alignment, and scheduler-liveness protection. |
| live automation state checks completed | 2 | Evening 2026-07-10; Morning 2026-07-11 Automations list | Morning verified exactly one enabled Morning System Upgrade and no duplicate active Morning schedule. |
| required recurring automations re-enabled after drift | 1 | Evening Architecture Review 2026-07-10 | Existing Morning schedule was restored; no duplicate was created. |
| active duplicate core automations found | 0 | Live Automations lists 2026-07-10 and 2026-07-11 | No duplicate active Morning System Upgrade exists. |
| scheduler-liveness regression candidates | 1 | Evening 2026-07-10; Morning 2026-07-11 | Candidate remains unpromoted until a later real prevention/detection case confirms operational value. |
| scheduler-liveness regression contracts defined | 1 | prompt regression + failure replay + behavior fixture + registry ladder | Structural coverage is implemented and raw-CI validated. |
| scheduler-liveness deterministic fixture runs passed | 1 | run #47 raw artifact | Bad disable/replace fails; existing-schedule repair and no-live-access `NEEDS_VERIFICATION` samples pass. |

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
scheduler_liveness_regression_passed:
```

## Reporting rule

If metrics are not updated, the report must state why. Missing live access, unavailable raw output, or absent replay evidence is a valid reason; guessing is not.

## Validator coverage note

As of 2026-07-11, `scripts/validate-agentic-prompts.mjs` checks that:

- seven prompt regressions, six replay cases, and six behavior fixtures are parseable, unique, mapped, and metrics-aligned;
- every behavior fixture maps to both a replay case and prompt regression and includes expected-pass and expected-fail samples;
- provider false-success, Daily Improve portfolio, Morning applied/no-op, and recurring scheduler-liveness cases remain present;
- `recurring-automation-disabled-after-successful-run` blocks duplicate replacement, requires live enabled-state evidence, safe existing-schedule repair, and `NEEDS_VERIFICATION` without live access;
- `automation-prompt-registry.json` contains the four-level scheduler-liveness evidence ladder;
- Morning's registry contract preserves recurring schedules and rejects registry-only proof;
- the unified evidence runner calls all four validators, writes four logs, and fails non-zero on failure;
- the workflow calls the runner and uploads `agent-harness-validation-evidence`.

Run #47 raw output:

```txt
agentic prompt validation ok: 7 prompt regressions, 6 replay cases, 6 behavior fixtures, 7 automation contracts, metrics aligned, fixture-to-prompt coverage checked, scheduler liveness contract checked, CI workflow defined, unified raw evidence runner contract checked
behavior replay fixtures ok: 6 fixtures, 14 samples (8 expected pass, 6 expected fail)
context-scout verification ok
validation ok: 20 projects
```

The validator does not have live ChatGPT Automations access. Scheduler liveness therefore combines deterministic prompt/replay/fixture evidence with a separate live Automations check. CI cannot prove live enabled state by itself.

## Evidence propagation note

Distinguish:

1. `intended registry state defined`;
2. `live scheduler enabled state verified`;
3. `expected run observed`;
4. `latest run outcome recorded`;
5. `PR-reported run`;
6. `CI workflow defined`;
7. `CI raw evidence artifact capture defined`;
8. `raw validation output available`;
9. `behavior replay fixture passed`;
10. `live behavior/prevention evidence exists`.

Do not treat static registry state as live scheduler proof, and do not treat deterministic fixtures as live model behavior.
