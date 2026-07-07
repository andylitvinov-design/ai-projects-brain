# Evening Architecture Review Handoff

Last updated: 2026-07-07

## Evidence reviewed

- Morning System Upgrade 2026-07-07 consumed the validation-evidence propagation handoff.
- PR #96 (`Track validation evidence propagation drift`) is merged.
- PR #92 (`Fix agentic prompt validator ID drift`) is now closed unmerged and should be treated as stale/superseded unless a future diff review proves otherwise.
- `scripts/validate-agentic-prompts.mjs` now validates prompt regressions, replay cases, behavior replay fixtures, registry contracts, and learning-metric count alignment.
- `projects/codex-automation/behavior-replay-fixtures.json` now stores deterministic expected-pass/expected-fail examples for the main candidate behavior rules.
- `scripts/run-behavior-replay-fixtures.mjs` now exists as the first offline behavior replay layer.
- `projects/codex-automation/agent-learning-metrics.md` distinguishes structural validation, deterministic fixture replay, and live behavior/prevention evidence.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, or secret-adjacent change was executed from this review handoff.

## Repeated patterns found

1. The system has moved from missing structural validation to needing executable behavior evidence.
2. Structural validation and deterministic fixture replay must not be confused with live model behavior or real prevention evidence.
3. Stale safe-harness PR state can now be reconciled in docs faster, but raw checkout/CI evidence is still missing in connector-only runs.

## Selected root structural issue for tonight

Check whether the new behavior fixture runner actually changes the harness from decorative rules to executable guardrails.

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
  - none known after PR #96 and Morning 2026-07-07, unless validators fail
- promoted to active:
  - none yet; fixture runner exists but has no raw execution evidence in this connector-only run
- deprecated/rejected:
  - stale PR #92 merge path is effectively rejected/superseded; do not merge stale hunks blindly
- evidence:
  - PR #95 verification section
  - merged PR #96
  - closed unmerged PR #92
  - Morning 2026-07-07 behavior replay fixture runner files
```

## Replay coverage and expected result

Current coverage:

```txt
structural validator: defined
behavior replay fixtures: defined
behavior fixture runner: defined
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

Do not increment `replay_case_passed`, `prompt_regression_passed`, or `validation_passed` unless raw command output or CI evidence is available.

## Prompt regression / runner layer

No new prompt-regression entry is required tonight unless the fixture runner misses a concrete failure class.

Priority check:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/run-behavior-replay-fixtures.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

If `run-behavior-replay-fixtures.mjs` passes with raw output, Evening may recommend promoting only the deterministic fixture-runner coverage, not the actual behavior rules.

## Agent-ready ticket for Morning

```txt
/upgrade

Goal: execute and harden the behavior replay fixture layer.

Source of truth:
- projects/codex-automation/behavior-replay-fixtures.json
- scripts/run-behavior-replay-fixtures.mjs
- scripts/validate-agentic-prompts.mjs
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/morning-handoff-queue.md

Required checks from real checkout:
- node scripts/validate-agentic-prompts.mjs
- node scripts/run-behavior-replay-fixtures.mjs
- node scripts/verify-context-scout.mjs
- node scripts/validate-projects-brain.mjs

Required decisions:
- If checks pass, record raw output evidence and promote only structural/fixture-runner coverage.
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

## Needs verification

- Raw local/CI output for `validate-agentic-prompts.mjs`.
- Raw local/CI output for `run-behavior-replay-fixtures.mjs`.
- Whether live ChatGPT Automation UI prompts match the registry after role model and behavior replay updates.
- Whether a live model replay runner is worth adding after deterministic fixtures pass.

## Single next action

Evening Architecture Review should verify whether the new behavior fixture runner produced raw pass/fail output and keep behavior rules candidate unless that evidence exists.
