# Agent Learning Metrics

Last updated: 2026-07-11 Evening Architecture Review

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
- provider deploy state plus recorded live/browser verification;
- cited public trend research used only for metric-model review.

## Current baseline

| Metric | Count | Evidence | Notes |
| --- | ---: | --- | --- |
| provider/live gate triggered | 3 | Psihotavr issue #168; Finance issue #614; brain-management issue #28 | Brain-management reached a verified Netlify release; the two earlier provider blockers remain open. |
| provider/live releases verified | 1 | brain-management issue #28; Netlify deploy `6a5207d064f1feba62676b5e`; PR #29 | Counts a provider-ready user-visible release, not code merge alone. |
| false-success prevention candidates | 3 | provider proof; report-only Morning; recurring scheduler liveness | Scheduler-liveness false health remains a saved candidate failure class. |
| dashboard publication drift candidates | 1 | Evening Review 2026-07-11; canonical/mirror legacy URL; verified Netlify production | Candidate is queued for Morning prompt/replay/fixture coverage. |
| user corrections converted to harness artifacts | 5 | Delivery ledger 2026-07-04 and 2026-07-11; upgrade-cycle metrics contract | Today's direct-execution-versus-prompt correction was recorded in the ledger and dashboard. |
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, and replay/regression scaffolds. |
| upgrade cycle metrics contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; automation prompt registry | Defines Evening scoring and Morning applied-upgrade metrics. |
| health delta reporting contracts defined | 1 | `systems/upgrade-cycle-metrics.md`; live automation prompts | Morning must report before/after/delta/confidence/evidence. |
| evening health delta verifications completed | 3 | Evening Reviews 2026-07-09, 2026-07-10, and 2026-07-11 | Latest Evening accepted evidence-backed deltas, corrected user-pain scoring, and incorporated the verified production release. |
| metric model trend-review contracts defined | 1 | `systems/upgrade-cycle-metrics.md` | Publication trace completeness is a candidate subdimension, not a new top-level metric. |
| live automation prompts updated for metrics split | 2 | ChatGPT Automations update 2026-07-09 | Morning and Evening prompts retain the health-delta split. |
| replay cases defined | 7 | `failure-replay-cases.json` | The publication-drift case is queued but not counted before implementation. |
| prompt regressions defined | 8 | `prompt-regression-tests.json` | Every current behavior fixture ID has matching prompt-regression coverage. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs` | Reads prompt/replay/fixture/registry/metrics/workflow, liveness ladder, and unified-runner contracts. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs` | Deterministic saved-output runner, not live model replay. |
| behavior replay fixtures defined | 7 | `behavior-replay-fixtures.json` | Includes liveness samples for unsafe disable/replace, safe existing-schedule repair, and no-live-access abstention. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml` | Runs the unified evidence runner on PR, main push, and manual dispatch. |
| CI raw evidence artifact capture defined | 1 | workflow + prompt validator | Captures the four expected logs and fails if the contract disappears. |
| unified harness evidence runners defined | 1 | PR #98; `run-agent-harness-validation-evidence.mjs` | One script runs all four validators locally and in CI. |
| raw CI workflow runs fetched | 4 | runs #40, #42, #47, and #53 | Run #53 is the final passing PR validation for scheduler-liveness coverage. Post-merge push-run lookup remains separately unverified. |
| validation commands run | 19 | PR #95 reported 3; runs #40, #42, #47, and #53 provide 4 each | Unique command executions are counted; run #53's four job steps passed. |
| validation evidence propagation fixes | 1 | PR #96 | Evidence states remain separated. |
| validation recovery fixes | 1 | PR #101 runs #46, #47, and #53 | Run #46 exposed an overbroad negation matcher; the evaluator was narrowed and later runs passed. |
| stale safe-harness PR reconciled | 2 | PR #92 closed; PR #97 superseded | No stale safe-harness PR remains queued. |
| unvalidated safe-harness PRs requiring reconciliation | 0 | Morning System Upgrade 2026-07-09 | Current harness changes use fresh branches and CI. |
| prompt-to-behavior fixture coverage fixes | 2 | Morning Upgrades 2026-07-09 and 2026-07-11 | Scheduler fixture maps to both prompt regression and replay case. |
| behavior replay fixture samples passed | 14 | runs #47 and #53 raw evidence | Six fixtures / fourteen samples passed. Rerunning the same set does not create new samples. |
| agentic prompt validator local run passed | 1 | Morning System Upgrade 2026-07-09 | Reconstructed local validation passed. |
| agentic prompt validator CI runs passed | 4 | runs #40, #42, #47, and #53 | Run #53 confirms the final PR state passed the protected contract. |
| live automation state checks completed | 3 | Evening 2026-07-10; Morning 2026-07-11; Evening 2026-07-11 | Latest check confirms one enabled Morning schedule after successful completion. |
| required recurring automations re-enabled after drift | 1 | Evening Architecture Review 2026-07-10 | Existing Morning schedule was restored; no duplicate was created. |
| active duplicate core automations found | 0 | Live Automations checks 2026-07-10 and 2026-07-11 | No duplicate active Morning System Upgrade exists. |
| scheduler-liveness regression candidates | 1 | Evening 2026-07-10; Morning and Evening 2026-07-11 | Candidate remains unpromoted until another real prevention/detection or repair case confirms operational value. |
| scheduler-liveness regression contracts defined | 1 | prompt regression + failure replay + behavior fixture + registry ladder | Structural coverage is implemented and raw-CI validated. |
| scheduler-liveness deterministic fixture runs passed | 2 | runs #47 and #53 | Both CI runs passed the same saved fixture set; this is repeatability evidence, not two distinct fixtures. |

## Metrics to update after each run

```txt
provider_live_gate_triggered:
provider_live_release_verified:
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
dashboard_publication_drift_candidate:
```

## Reporting rule

If metrics are not updated, the report must state why. Missing live access, unavailable raw output, or absent replay evidence is a valid reason; guessing is not.

Count distinct artifacts separately from repeated executions:
- a repeated CI run may increase `raw CI workflow runs fetched` and `validation commands run`;
- it does not increase the number of prompt regressions, replay cases, fixtures, or saved samples unless new artifacts were added;
- a provider release counts only when deploy identity and user-visible proof exist.

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

Final PR run #53 completed successfully and all validation/artifact-upload steps passed. The saved output set remains:

```txt
agentic prompt validation ok: 7 prompt regressions, 6 replay cases, 6 behavior fixtures, 7 automation contracts, metrics aligned, fixture-to-prompt coverage checked, scheduler liveness contract checked, CI workflow defined, unified raw evidence runner contract checked
behavior replay fixtures ok: 6 fixtures, 14 samples (8 expected pass, 6 expected fail)
context-scout verification ok
validation ok: 20 projects
```

The validator does not have live ChatGPT Automations or provider access. Scheduler liveness therefore combines deterministic prompt/replay/fixture evidence with a separate live Automations check. Dashboard publication truth must similarly separate canonical, mirror, deploy, and live evidence.

## Evidence propagation note

Distinguish:

1. `intended registry state defined`;
2. `live scheduler enabled state verified`;
3. `expected run observed`;
4. `latest run outcome recorded`;
5. `canonical dashboard source updated`;
6. `mirror dashboard data synced`;
7. `provider deploy source and ID known`;
8. `live dashboard timestamp/content verified`;
9. `PR-reported run`;
10. `CI workflow defined`;
11. `CI raw evidence artifact capture defined`;
12. `raw validation output available`;
13. `behavior replay fixture passed`;
14. `live behavior/prevention evidence exists`.

Do not treat static registry state as live scheduler proof, deterministic fixtures as live model behavior, or canonical dashboard commits as proof that the production surface is fresh.

## 2026-07-12 publication prevention

- Regression/replay/behavior IDs added: `dashboard-canonical-live-freshness-drift` (1/1/1).
- New deterministic samples: 12; total fixture samples: 26.
- Prevention implemented: deterministic aggregate-score and publication-drift validators, not documentation alone.
- Raw validation result: pending PR CI artifact; no PR or manual deploy is counted as live success.
