# Evening Architecture Review Handoff

Last updated: 2026-07-07

## Evidence reviewed

- Morning System Upgrade 2026-07-07 consumed the validation-evidence propagation handoff.
- PR #96 (`Track validation evidence propagation drift`) is merged.
- PR #92 (`Fix agentic prompt validator ID drift`) is closed unmerged and should be treated as stale/superseded unless a future diff review proves otherwise.
- `scripts/validate-agentic-prompts.mjs` now validates prompt regressions, replay cases, behavior replay fixtures, registry contracts, and learning-metric count alignment.
- `projects/codex-automation/behavior-replay-fixtures.json` stores deterministic expected-pass/expected-fail examples for five candidate behavior rules.
- `scripts/run-behavior-replay-fixtures.mjs` exists as the first offline behavior replay layer.
- `projects/codex-automation/agent-learning-metrics.md` distinguishes structural validation, deterministic fixture replay, and live behavior/prevention evidence.
- Evening Architecture Review 2026-07-07 found that behavior fixtures were guaranteed to map to replay cases, but not guaranteed to map to prompt-regression tests.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, or secret-adjacent change was executed from this review handoff.

## Repeated patterns found

1. The system has moved from missing structural validation to needing executable behavior evidence.
2. Structural validation and deterministic fixture replay must not be confused with live model behavior or real prevention evidence.
3. Stale safe-harness PR state can now be reconciled in docs faster, but raw checkout/CI evidence is still missing in connector-only runs.
4. Behavior fixtures can drift from prompt regressions if the validator only checks fixture-to-replay mapping.

## Selected root structural issue for tonight

Prompt-regression coverage drift in the new behavior replay layer.

The new fixture runner made guardrails executable against saved outputs, but `validate-agentic-prompts.mjs` did not require every behavior fixture to have a matching prompt-regression test. This left two weak edges:

- `/improve` vs `/upgrade` existed as a prompt regression under a shorter ID (`improve-upgrade-boundary`) while replay/fixture used `improve-upgrade-mode-boundary-drift`.
- `/save` vs `/memory` vs `/handoff` had replay/fixture coverage but no prompt-regression test.

Evidence-state ladder to preserve:

```txt
not run
PR-reported run
raw validation output available
behavior replay fixture passed
live behavior/prevention evidence exists
```

Do not skip levels when promoting rules.

## Rule lifecycle action to consider

```txt
rule lifecycle actions:
- candidate:
  - daily-improve-strategic-portfolio-not-only-bugs
  - morning-upgrade-report-only-without-applied-upgrade
  - provider-dependent-feature-without-provider-proof
  - improve-upgrade-mode-boundary-drift
  - save-memory-handoff-confusion
- needs_revision:
  - prompt-regression coverage for behavior fixture IDs was revised by this review
- promoted to active:
  - none yet; fixture runner exists but has no raw execution evidence in this connector-only run
- deprecated/rejected:
  - stale PR #92 merge path is effectively rejected/superseded; do not merge stale hunks blindly
- evidence:
  - PR #95 verification section
  - merged PR #96
  - closed unmerged PR #92
  - Morning 2026-07-07 behavior replay fixture runner files
  - Evening 2026-07-07 safe harness PR for fixture-to-prompt coverage
```

## Replay coverage and expected result

Current coverage:

```txt
structural validator: defined
behavior replay fixtures: defined
behavior fixture runner: defined
fixture-to-replay mapping: covered
fixture-to-prompt-regression mapping: safe fix prepared tonight
raw fixture-run output: not available in connector-only run
live model replay: not implemented
behavior rules: remain candidate
```

Evening should look for raw checkout/CI output. If absent, preserve candidate status.

## Learning metrics

Morning 2026-07-07 added evidence-backed metrics for:

- behavior replay runners defined = 1;
- behavior replay fixtures defined = 5;
- stale safe-harness PR reconciled = 1.

Evening 2026-07-07 adds evidence-backed metrics for:

- prompt-to-behavior fixture coverage fixes = 1;
- prompt regressions defined = 6.

Do not increment `replay_case_passed`, `prompt_regression_passed`, `behavior_replay_fixture_passed`, or `validation_passed` unless raw command output or CI evidence is available.

## Prompt regression / runner layer

Safe fix prepared tonight:

- renamed/aligned the improve/upgrade prompt-regression ID to `improve-upgrade-mode-boundary-drift`;
- added `save-memory-handoff-confusion` prompt-regression coverage;
- updated `validate-agentic-prompts.mjs` so every behavior fixture must map to both a replay case and a prompt-regression test;
- updated learning metrics and delivery ledger.

Priority check:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/run-behavior-replay-fixtures.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

If `run-behavior-replay-fixtures.mjs` passes with raw output, Morning may recommend promoting only the deterministic fixture-runner coverage, not the actual behavior rules.

## Agent-ready ticket for Morning

```txt
/upgrade

Goal: review and validate the fixture-to-prompt-regression coverage fix.

Source of truth:
- projects/codex-automation/prompt-regression-tests.json
- projects/codex-automation/behavior-replay-fixtures.json
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/morning-handoff-queue.md

Required checks from real checkout:
- node scripts/validate-agentic-prompts.mjs
- node scripts/run-behavior-replay-fixtures.mjs
- node scripts/verify-context-scout.mjs
- node scripts/validate-projects-brain.mjs

Required decisions:
- If checks pass, record raw output evidence and merge the safe harness PR.
- If checks fail, apply the smallest fixture/schema/registry/docs fix.
- Keep provider/live, Daily Improve strategic portfolio, and Morning report-only behavior rules candidate until live automation/model behavior proves prevention.

Constraints:
- harness/docs/scripts only
- no product code
- no provider config
- no production data
- no auth/payment/deploy/env/secrets
```

## Suggested skills

```txt
suggested skills:
- existing route used: /upgrade
- secondary route: none unless a stale product/provider issue appears
- new skill proposed: no
```

## Validation

Not run from this connector-only handoff. Evidence state:

- PR #95 reports the three structural validation commands ran before merge.
- Morning 2026-07-07 created a deterministic behavior fixture runner, but no raw command output is available in this review.
- Evening 2026-07-07 prepared a safe validator/fixture coverage fix, but it still needs checkout validation.

## Needs verification

- Raw local/CI output for `validate-agentic-prompts.mjs`.
- Raw local/CI output for `run-behavior-replay-fixtures.mjs`.
- Whether live ChatGPT Automation UI prompts match the registry after role model and behavior replay updates.
- Whether a live model replay runner is worth adding after deterministic fixtures pass.

## Single next action

Morning System Upgrade should review the fixture-to-prompt-regression coverage PR, run the four checkout commands, and merge only if the validator and behavior fixture runner pass with raw output evidence.
