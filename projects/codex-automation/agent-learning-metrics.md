# Agent Learning Metrics

Last updated: 2026-07-06

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
| replay cases defined | 5 | `failure-replay-cases.json` | Defined, not executed in this connector-only run. |
| prompt regressions defined | 4 | `prompt-regression-tests.json` | Defined, not executed in this connector-only run. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs`; Morning System Upgrade 2026-07-05 and 2026-07-06 | Validator now reads prompt regressions, replay cases, automation registry contracts, and learning-metric counts to catch metrics/artifact drift. |
| validation commands run | 0 | no local checkout access in this run | Must be run by Codex/local checkout. Connector-level schema reasoning is not counted as a validation command. |

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
user_correction_recorded:
validator_defined:
validation_passed:
validation_failed:
```

## Reporting rule

If metrics are not updated, the report must state why. Lack of local checkout, unavailable ledger, or missing replay runner is a valid reason; guessing is not.

## Validator coverage note

As of 2026-07-06, `scripts/validate-agentic-prompts.mjs` checks that:

- prompt regression and replay JSON files are parseable and schema-shaped;
- required anti-drift cases exist;
- provider-dependent false success is blocked by the regression/replay contract;
- Daily Improve keeps strategic portfolio output requirements;
- Morning System Upgrade keeps `APPLIED_UPGRADE / NO_SAFE_UPGRADE` requirements;
- this metrics table stays aligned with the actual number of prompt regressions and replay cases.

This is still structural validation, not a behavioral replay runner. Do not promote behavior rules from `candidate` to `active` until a checkout run or runner produces evidence.
