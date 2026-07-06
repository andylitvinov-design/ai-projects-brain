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
| replay cases defined | 5 | `failure-replay-cases.json` | Defined, not behavior-executed. |
| prompt regressions defined | 5 | `prompt-regression-tests.json` | Defined, not behavior-executed. |
| feedback-loop validators defined | 1 | `scripts/validate-agentic-prompts.mjs`; Morning System Upgrade 2026-07-05 and 2026-07-06 | Validator now reads prompt regressions, replay cases, automation registry contracts, and learning-metric counts to catch metrics/artifact drift. |
| validation commands run | 3 | ai-projects-brain PR #95 verification section | PR #95 reports `validate-agentic-prompts`, `validate-projects-brain`, and `verify-context-scout` were run before merge. Raw command output / Actions logs are not available in this connector review, so behavior rules remain candidates. |
| validation evidence propagation fixes | 1 | Evening Architecture Review 2026-07-06 | Metrics and handoff wording needed revision after PR #95 changed the evidence state from no validation to PR-reported validation. |

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

## Evidence propagation note

Do not leave stale metric wording after a later PR or automation report changes the evidence state. Distinguish:

1. `not run` — no checkout/CI/PR evidence exists;
2. `PR-reported run` — a PR verification section says commands ran, but raw output is unavailable;
3. `raw validation output available` — command logs or CI output are available and can support promotion of structural rules;
4. `behavior replay passed` — a replay runner or real prevention evidence supports promoting behavior rules.
