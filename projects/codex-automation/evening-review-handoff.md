# Evening Architecture Review Handoff

Last updated: 2026-07-09

## Evidence reviewed

- Morning System Upgrade 2026-07-09 consumed the PR #97 reconciliation handoff.
- PR #97 was open, unmergeable, and had no recorded workflow evidence for head `456ef0c3a2029e27cac3567d6b8f7ed8c97c6a61`.
- The valid part of PR #97 was applied directly on fresh `main`: behavior replay fixture IDs now map to prompt-regression IDs as well as replay-case IDs.
- `prompt-regression-tests.json` now defines 6 prompt regressions.
- `scripts/validate-agentic-prompts.mjs` now validates fixture-to-prompt coverage, fixture-to-replay coverage, metrics alignment, and CI workflow command coverage.
- Local reconstructed harness output was recorded:
  - `agentic prompt validation ok: 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 2 automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined`;
  - `behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)`.
- Full GitHub Actions raw logs for the four-command workflow are still not recorded.
- Provider/live readiness blockers remain open: `andylitvinov-design/psihotavr#168` and `andylitvinov-design/finance#614`.
- No product code, provider configuration, production data, deploy setting, auth/payment setting, env value, or secret-adjacent change was executed from this review loop.

## Provider/live readiness gaps found

These remain higher priority than softer mode-vocabulary cleanup:

1. Psihotavr provider/live proof remains open in `andylitvinov-design/psihotavr#168`: Supabase auth/admin persistence and live Google/cabinet/admin/public-card behavior must be proven separately from code paths.
2. Finance provider-balance proof remains open in `andylitvinov-design/finance#614`: strict live `verify:finance` still depends on resolving the provider/manual balance source gap without unsafe finance mutation.

Evening Review and Morning Upgrade must keep both routed to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`; do not claim `SUCCESS` from code merge alone.

## Repeated patterns found

1. The harness is now better at converting stale/unmergeable safe PRs into fresh-main minimal fixes, rather than waiting on broken PR state.
2. Evidence still has to be split carefully:

```txt
not run
PR-reported run
CI workflow defined
local reconstructed fixture output available
raw CI/full checkout validation output available
behavior replay fixture passed
live behavior/prevention evidence exists
```

3. Behavior replay fixtures are now covered by prompt regressions, but this is still deterministic saved-output evidence, not live model behavior.
4. Provider/live readiness remains structurally routed, but the product/provider tickets are still open and must keep blocking final `SUCCESS`.

## Selected root structural issue for tonight

The highest-leverage remaining issue is raw CI/full-checkout evidence.

The system now has:

```txt
prompt regressions = 6
failure replay cases = 5
behavior fixtures = 5
behavior fixture runner = defined
CI workflow = defined
fixture-to-prompt mapping = validated by script
local reconstructed fixture output = available
```

But it still lacks durable raw GitHub Actions logs for all four commands after the latest main commits.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - provider-dependent-feature-without-provider-proof remains candidate as live/prevention behavior.
  - daily-improve-strategic-portfolio-not-only-bugs remains candidate as live automation behavior.
  - morning-upgrade-report-only-without-applied-upgrade remains candidate as live automation behavior.
  - improve-upgrade-mode-boundary-drift remains candidate as live behavior.
  - save-memory-handoff-confusion remains candidate as live behavior.
- promoted to active:
  - deterministic fixture-to-prompt coverage guard may be considered structurally active after full CI logs confirm the latest main workflow passes.
- needs_revision:
  - validation evidence ladder should include `local reconstructed fixture output available` as distinct from full repository CI evidence.
- deprecated/rejected:
  - PR #97 stale branch is superseded by fresh-main commits; do not merge it blindly.
```

## Replay coverage and result

Current coverage:

```txt
prompt regressions defined on main = 6
failure replay cases defined on main = 5
behavior replay fixtures defined on main = 5
behavior fixture runner = defined
CI workflow for validators = defined
fixture-to-replay mapping = covered
fixture-to-prompt-regression mapping = covered
local deterministic fixture output = available
raw full CI workflow output = not recorded
live model replay = not implemented
behavior rules = remain candidate
```

## Learning metrics

Updated with evidence-backed metrics:

```txt
prompt regressions defined = 6
stale safe-harness PR reconciled = 2
unvalidated safe-harness PRs requiring reconciliation = 0
prompt-to-behavior fixture coverage fixes = 1
behavior replay fixture local samples passed = 11
agentic prompt validator local run passed = 1
```

Do not increment full `validation_passed`, `prompt_regression_passed`, `behavior_replay_fixture_passed`, or `replay_case_passed` for CI/full-checkout until raw logs are available.

## Safe harness/docs changes made

Safe docs/scripts/metrics updates only:

- `prompt-regression-tests.json` now includes `improve-upgrade-mode-boundary-drift` and `save-memory-handoff-confusion` prompt regression coverage.
- `scripts/validate-agentic-prompts.mjs` now requires every behavior fixture to map to both a replay case and a prompt-regression test.
- `agent-learning-metrics.md` records local deterministic validation evidence and the PR #97 reconciliation.
- `delivery-outcome-ledger.md` records the fresh-main equivalent of PR #97 and the remaining CI evidence gap.
- `morning-handoff-queue.md` now asks the next Morning run to fetch/confirm full CI logs.
- PR #97 was closed as superseded after the equivalent safe changes landed on main.

## Prompt regression tests updated/proposed

Updated directly:

```txt
- renamed/aligned improve/upgrade prompt-regression ID to `improve-upgrade-mode-boundary-drift`;
- added `save-memory-handoff-confusion` prompt-regression coverage;
- kept provider-dependent false success as a must-block-success class.
```

## Agent-ready tickets / handoffs

Provider/product work remains in existing agent-ready tickets:

1. `andylitvinov-design/psihotavr#168`
   - Suggested command: `/delivery` or `/safe` / `/audit-ui` for Supabase auth/admin persistence/live proof.
   - Status: open; provider/live proof missing.
2. `andylitvinov-design/finance#614`
   - Suggested command: `/audit-fin` for strict live `verify:finance` provider-balance gap.
   - Status: open; provider/manual balance source evidence missing.

Safe harness handoff for Morning:

```txt
/upgrade

Goal: verify full GitHub Actions/raw checkout evidence for the latest main harness commits.

Source of truth:
- .github/workflows/agent-harness-validators.yml
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- projects/codex-automation/prompt-regression-tests.json
- projects/codex-automation/behavior-replay-fixtures.json
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/delivery-outcome-ledger.md

Required checks:
1. Fetch or run raw output for all four validators.
2. If all pass, record CI/full-checkout validation evidence.
3. Promote only structural/fixture-runner coverage, not live behavior rules.
4. If no raw output exists, keep `local reconstructed fixture output available` and `full CI evidence pending` as separate states.

Boundaries:
- harness/docs/scripts/CI workflow only
- no product code
- no provider config
- no production data
- no auth/payment/deploy/env/secrets
```

## Suggested skills

```txt
suggested skills:
- CI/raw validator evidence: /upgrade
- Psihotavr provider/live proof: /delivery or /safe, with /audit-ui for browser/live UI proof
- Finance provider-balance proof: /audit-fin
- new skill proposed: no
```

## Validation

Partial local reconstructed evidence is available:

```txt
agentic prompt validation ok: 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 2 automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined
behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)
```

Not yet counted as full CI/full-checkout validation passed:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/run-behavior-replay-fixtures.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

## Risks / needs verification

- GitHub Actions raw logs for all four validators are still not recorded after the latest main commits.
- The connector workflow-run lookup available in prior reviews returned no PR-triggered runs and may not expose push-triggered runs.
- Behavior replay fixtures are still deterministic saved-output tests, not live model replay.
- Provider/live blockers #168 and #614 remain open and must keep blocking `SUCCESS` for their respective product/provider outcomes.
- Live ChatGPT Automation UI prompts still need occasional comparison against the registry; do not create duplicate automations.

## Single next action

Morning System Upgrade should fetch or produce full CI/raw checkout output for the latest main harness commits and record that evidence before promoting any structural/fixture-runner coverage beyond the local reconstructed result.
