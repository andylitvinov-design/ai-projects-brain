# Evening Architecture Review Handoff

Last updated: 2026-07-08

## Evidence reviewed

- Morning System Upgrade 2026-07-08 consumed the behavior replay / validator evidence handoff.
- `.github/workflows/agent-harness-validators.yml` now exists and runs the four harness validators on PR, push to `main`, and manual dispatch.
- `scripts/validate-agentic-prompts.mjs` now validates prompt regressions, replay cases, behavior replay fixtures, registry contracts, learning-metric count alignment, and the CI workflow contract.
- `projects/codex-automation/agent-learning-metrics.md` now distinguishes `CI workflow defined` from `raw validation output available`.
- `projects/codex-automation/morning-handoff-queue.md` now asks the next Morning run to fetch or record raw GitHub Actions pass/fail output before promoting coverage.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, or secret-adjacent change was executed from this review handoff.

## Repeated patterns found

1. The system has moved from missing structural validation to needing executable CI evidence.
2. Structural validation, deterministic fixture replay, CI workflow definition, raw CI logs, and live model behavior must remain separate evidence states.
3. Connector-only runs can create and maintain safe harness files, but cannot by themselves prove validator pass/fail behavior unless raw logs are fetched from Actions or CI.

## Selected root structural issue for tonight

Check whether the new GitHub Actions workflow actually converts the validator layer from local-only scripts into raw, auditable pass/fail evidence.

Evidence-state ladder to preserve:

```txt
not run
PR-reported run
CI workflow defined
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
  - none known after Morning 2026-07-08, unless the workflow or validators fail
- promoted to active:
  - none yet; CI workflow exists but raw Actions output is not recorded in this handoff
- deprecated/rejected:
  - stale PR #92 merge path remains rejected/superseded; do not merge stale hunks blindly
- evidence:
  - PR #95 verification section
  - merged PR #96
  - closed unmerged PR #92
  - Morning 2026-07-07 behavior replay fixture runner files
  - Morning 2026-07-08 CI workflow and workflow-contract validator updates
```

## Replay coverage and expected result

Current coverage:

```txt
structural validator: defined
behavior replay fixtures: defined
behavior fixture runner: defined
CI workflow for validators: defined
raw fixture-run output: not recorded in this handoff
live model replay: not implemented
behavior rules: remain candidate
```

Evening should look for raw GitHub Actions or checkout output. If absent, preserve candidate status.

## Learning metrics

Morning 2026-07-08 added evidence-backed metrics for:

- validation CI workflows defined = 1.

Do not increment `validation_passed`, `behavior_replay_fixture_passed`, `replay_case_passed`, or `prompt_regression_passed` unless raw command output, CI logs, or equivalent evidence is available.

## Prompt regression / runner / CI layer

No new prompt-regression entry is required tonight unless the workflow or fixture runner misses a concrete failure class.

Priority check:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/run-behavior-replay-fixtures.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

CI path:

```txt
.github/workflows/agent-harness-validators.yml
```

If the workflow passes with raw logs, Evening may recommend promoting only CI/validator coverage, not the actual behavior rules.

## Agent-ready ticket for Morning

```txt
/upgrade

Goal: verify and harden the CI-backed validator layer.

Source of truth:
- .github/workflows/agent-harness-validators.yml
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/morning-handoff-queue.md

Required checks:
- Check the latest GitHub Actions `Agent Harness Validators` run.
- If raw logs show all four commands passed, update metrics and ledger with exact evidence.
- If raw logs show a failure, fix the smallest workflow/script/schema/docs issue.
- If no raw logs exist, keep only `CI workflow defined` evidence and create an exact verification handoff.

Required decisions:
- Promote only `validation CI workflow coverage` or structural validator coverage when raw output exists.
- Keep provider/live, Daily Improve strategic portfolio, Morning report-only, improve/upgrade boundary, and save/memory/handoff behavior rules candidate until behavior fixture output or live prevention evidence exists.

Constraints:
- harness/docs/scripts/CI workflow only
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

Not counted as passed from this handoff. Evidence state:

- CI workflow exists.
- Validator asserts the workflow contract.
- Raw Actions/check output still needs to be fetched or produced before counting `validation_passed`.

## Needs verification

- Raw Actions/check output for `validate-agentic-prompts.mjs`.
- Raw Actions/check output for `run-behavior-replay-fixtures.mjs`.
- Raw Actions/check output for `verify-context-scout.mjs`.
- Raw Actions/check output for `validate-projects-brain.mjs`.
- Whether live ChatGPT Automation UI prompts match the registry after the CI workflow layer was added.
- Whether a live model replay runner is worth adding after deterministic fixtures and CI pass.

## Single next action

Evening Architecture Review should verify whether the new GitHub Actions workflow produced raw pass/fail output and keep behavior rules candidate unless that evidence exists.
