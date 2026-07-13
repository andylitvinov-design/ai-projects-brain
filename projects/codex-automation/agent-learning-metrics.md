# Agent Learning Metrics

Last updated: 2026-07-13 Morning System Upgrade

Purpose: measure whether the agent harness actually improves behavior instead of only adding more rules.

## Evidence rule

Never count a metric without evidence. Acceptable evidence includes delivery ledgers, automation/live scheduler state, GitHub PRs/issues, user corrections, mapped prompt regressions and replay cases, behavior fixture output, validator output, raw GitHub Actions artifacts, and provider deploy plus live/browser proof. Do not count a provider release from code or CI alone.

## Current baseline

| Metric | Count | Evidence | Notes |
| --- | ---: | --- | --- |
| provider/live gate triggered | 3 | Psihotavr #168; Finance #614; brain-management #28 | Brain-management reached one verified Netlify release; two provider blockers remain open. |
| provider/live releases verified | 1 | brain-management #28; deploy `6a5207d064f1feba62676b5e`; PR #29 | Automatic GitHub→Netlify publication remains unverified. |
| false-success prevention candidates | 4 | provider proof; report-only Morning; scheduler liveness; dashboard publication drift | Publication drift is structurally validated but remains candidate. |
| dashboard publication drift candidates | 1 | Evening 2026-07-11; PR #103; run #70 | Four-stage publication ladder and aggregate guard implemented. |
| user corrections converted to harness artifacts | 7 | delivery ledger; dashboard; upgrade-cycle contract; self-harness dedup contract; 2026-07-13 `/delivery` edit-confirmation correction | The newest correction is mapped to prompt, replay and behavior fixtures. |
| rule lifecycle changes | 4 | 2026-07-04 and 2026-07-13 Morning System Upgrade | One new candidate was added; no rule was promoted. |
| upgrade cycle metrics contracts defined | 1 | `systems/upgrade-cycle-metrics.md` | Morning/Evening responsibilities remain stable. |
| health delta reporting contracts defined | 1 | upgrade-cycle contract; dashboard | Includes observed values, source, change and next action. |
| evening health delta verifications completed | 3 | Evening Reviews 2026-07-09, 10, 11 | Current Morning claims await Evening verification. |
| metric model trend-review contracts defined | 1 | `systems/upgrade-cycle-metrics.md` | Publication trace completeness remains a critical subdimension. |
| live automation prompts updated for metrics split | 2 | ChatGPT Automations 2026-07-09 | No prompt mutation was required in this run. |
| replay cases defined | 9 | `failure-replay-cases.json` | Includes observable metrics and delivery routine-edit reconfirmation. |
| prompt regressions defined | 10 | `prompt-regression-tests.json` | Every replay case has matching prompt coverage; one additional Morning alternative contract remains. |
| feedback-loop validators defined | 4 | prompt validator plus two dashboard validators plus self-harness dedup validator | Existing validators remain the canonical CI gate. |
| behavior replay runners defined | 1 | `scripts/run-behavior-replay-fixtures.mjs` | Offline deterministic saved-output runner. |
| behavior replay fixtures defined | 9 | `behavior-replay-fixtures.json` | Every replay case now has an executable behavior fixture. |
| delivery routine-edit regression contracts defined | 1 | prompt + replay + fixture + delivery standard | Blocks redundant conversational confirmation while preserving host/risk boundaries. |
| observable-metrics behavior fixtures defined | 1 | `dashboard-observable-metrics-no-invented-denominator` | Rejects fake zeros and composite decision scores. |
| self-harness duplicate PR regression contracts defined | 1 | `self-harness-dedup-regression.json`; `validate-self-harness-dedup-contract.mjs` | Covers concurrent main update, equivalent PR reuse, superseded-by-main, and minimal salvage. |
| self-harness duplicate PR fixture samples defined | 4 | `self-harness-dedup-regression.json` | Two expected pass and two expected fail samples. |
| validation CI workflows defined | 1 | `.github/workflows/agent-harness-validators.yml` | Runs unified evidence runner on PR/push/manual dispatch. |
| CI raw evidence artifact capture defined | 1 | workflow + evidence runner | Artifact contains raw validator logs. |
| unified harness evidence runners defined | 1 | PR #98, extended by PR #103 and dedup validator follow-up | Same runner includes prompt, behavior, context, project, dashboard, publication, and dedup validators. |
| raw CI workflow runs fetched | 5 | runs #40, #42, #47, #53, #70 | Run #70 is the latest fetched passing raw artifact. |
| validation commands run | 29 | prior 25 plus four deterministic checks in this run | Counts completed command executions, not validator definitions. |
| validation evidence propagation fixes | 2 | PR #96; Morning follow-up after PR #103 | No additional propagation fix was required. |
| validation recovery fixes | 1 | PR #101 | No recovery was needed in this run. |
| stale safe-harness PR reconciled | 2 | PR #92; PR #97 | No stale safe-harness PR is active. |
| unvalidated safe-harness PRs requiring reconciliation | 0 | PR #103 run #70 | Current direct safe changes await post-commit CI rather than a stale PR. |
| prompt-to-behavior fixture coverage fixes | 5 | Morning 2026-07-09, 2026-07-11, PR #103, plus two fixtures on 2026-07-13 | Observable metrics and delivery reconfirmation now have executable behavior coverage. |
| behavior replay fixture samples passed | 30 | local deterministic run 2026-07-13 | Nine fixtures, 30 saved samples; 16 expected pass and 14 expected fail. |
| agentic prompt validator local run passed | 1 | Morning 2026-07-09 | Full validator awaits repository CI after the current direct changes. |
| agentic prompt validator CI runs passed | 5 | runs #40, #42, #47, #53, #70 | Current commit CI is pending. |
| live automation state checks completed | 5 | Evening 2026-07-10; Morning/Evening 2026-07-11; Morning 2026-07-12; Morning 2026-07-13 | Exactly one enabled Morning and one enabled Evening schedule are proven today. |
| required recurring automations re-enabled after drift | 1 | Evening 2026-07-10 | No repair was required today. |
| active duplicate core automations found | 0 | live checks through 2026-07-13 | No duplicate Morning or Evening schedule. |
| scheduler-liveness regression candidates | 1 | Evening 2026-07-10 onward | Still needs a second independent operational case. |
| scheduler-liveness regression contracts defined | 1 | prompt + replay + fixture + registry ladder | Structurally raw-CI validated. |
| scheduler-liveness deterministic fixture runs passed | 3 | runs #47, #53, #70 | Repeatability evidence, not three distinct fixtures. |
| dashboard publication deterministic fixture runs passed | 1 | run #70 artifact | Twelve publication/aggregate samples passed. |

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
self_harness_duplicate_pr_regression_contract_defined:
self_harness_duplicate_pr_fixture_sample_passed:
self_harness_duplicate_pr_fixture_sample_failed:
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

## Current raw evidence

Prior canonical CI evidence remains:

```txt
agentic prompt validation ok: 8 prompt regressions, 7 replay cases, 7 behavior fixtures, 7 automation contracts, metrics aligned, fixture-to-prompt coverage checked, scheduler liveness contract checked, CI workflow defined, unified raw evidence runner contract checked
behavior replay fixtures ok: 7 fixtures, 26 samples (14 expected pass, 12 expected fail)
context-scout verification ok
validation ok: 20 projects
numeric_metrics=9; score_sum=606; raw_average=67.3333; reported_score=67; status=PASS
publication_status=STALE; success_allowed=false; canonical_updated=verified; mirror_synced=stale; deploy_identified=verified; live_verified=stale; status=PASS
```

Current local deterministic evidence:

```txt
behavior replay fixtures ok: 9 fixtures, 30 samples (16 expected pass, 14 expected fail)
dashboard schema v5 observable_outcomes_v2 canonical validation: PASS
canonical/mirror identity validation: PASS
prompt/replay/fixture cross-map and delivery approval contract: PASS
```

The current GitHub commit and raw CI artifact are `needs verification after commit`.

## Reporting and lifecycle rule

Distinct artifacts are counted separately from repeated executions. Re-running an unchanged fixture set may increase workflow-run or command counts, but does not increase regression, replay, fixture, or sample counts. Provider/live readiness changes only from provider/live proof.

`dashboard-canonical-live-freshness-drift`, `recurring-automation-disabled-after-successful-run`, `dashboard-observable-metrics-no-invented-denominator`, and `delivery-routine-edit-reconfirmation` remain `candidate`. Promotion requires repeated operational evidence or one documented high-severity prevention case plus current validation evidence.
