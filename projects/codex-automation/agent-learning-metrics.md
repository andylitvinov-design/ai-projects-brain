# Agent Learning Metrics

Last updated: 2026-07-04

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
| rule lifecycle changes | 3 | 2026-07-04 Morning System Upgrade | Created provider/live gate, lifecycle standard, replay/regression scaffolds. |
| replay cases defined | 3 | `failure-replay-cases.json` | Defined, not executed in this connector-only run. |
| prompt regressions defined | 3 | `prompt-regression-tests.json` | Defined, not executed in this connector-only run. |
| validation commands run | 0 | no local checkout access in this run | Must be run by Codex/local checkout. |

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
validation_passed:
validation_failed:
```

## Reporting rule

If metrics are not updated, the report must state why. Lack of local checkout, unavailable ledger, or missing replay runner is a valid reason; guessing is not.
