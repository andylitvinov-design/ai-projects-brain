# Evening Architecture Review Handoff

Last updated: 2026-07-09

## Evidence reviewed

- Morning System Upgrade 2026-07-09 consumed the prior raw-CI-evidence handoff and applied a safe harness/CI observability upgrade.
- `.github/workflows/agent-harness-validators.yml` now writes raw validator console output to `agent-harness-validation-evidence/` and uploads it with `actions/upload-artifact@v4`.
- The artifact is expected to contain:
  - `validate-agentic-prompts.log`;
  - `run-behavior-replay-fixtures.log`;
  - `verify-context-scout.log`;
  - `validate-projects-brain.log`.
- `scripts/validate-agentic-prompts.mjs` now validates that the workflow keeps this raw-evidence artifact contract.
- `agent-learning-metrics.md` records `CI raw evidence artifact capture defined` as separate from `raw validation output available`.
- `system-health-dashboard.md`, `system-health-dashboard.json`, and the live brain-management dashboard data mirror were updated with confidence-labelled estimated health values.
- Local reconstructed harness output from Morning:
  - `agentic prompt validation ok: 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 2 automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined`;
  - `behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)`.
- Full GitHub Actions raw logs after the latest main commits are still not recorded in this handoff.
- Provider/live readiness blockers remain open: `andylitvinov-design/psihotavr#168` and `andylitvinov-design/finance#614`.
- No product code, provider configuration, production data, deploy setting, auth/payment setting, env value, or secret-adjacent change was executed from this review loop.

## Provider/live readiness gaps found

These remain higher priority than softer mode-vocabulary cleanup:

1. Psihotavr provider/live proof remains open in `andylitvinov-design/psihotavr#168`: Supabase auth/admin persistence and live Google/cabinet/admin/public-card behavior must be proven separately from code paths.
2. Finance provider-balance proof remains open in `andylitvinov-design/finance#614`: strict live `verify:finance` still depends on resolving the provider/manual balance source gap without unsafe finance mutation.

Evening Review and Morning Upgrade must keep both routed to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`; do not claim `SUCCESS` from code merge alone.

## Repeated patterns found

1. The harness now has a better evidence ladder, but the system still tends to confuse `workflow exists` with `raw workflow evidence fetched` unless the distinction is written explicitly.
2. Evidence states must remain separated:

```txt
not run
PR-reported run
CI workflow defined
CI raw evidence artifact capture defined
raw validation output available
behavior replay fixture passed
live behavior/prevention evidence exists
```

3. Behavior replay fixtures are covered by prompt regressions and deterministic local fixture output, but this is still not live model behavior.
4. Provider/live readiness remains structurally routed, but the product/provider tickets are still open and must keep blocking final `SUCCESS`.

## Selected root structural issue for tonight

The highest-leverage remaining issue is to fetch actual raw CI/full-checkout output from the workflow after the latest main commits.

The system now has:

```txt
prompt regressions = 6
failure replay cases = 5
behavior fixtures = 5
behavior fixture runner = defined
CI workflow = defined
CI raw evidence artifact capture = defined
fixture-to-prompt mapping = validated by script
local reconstructed fixture output = available
```

But it still lacks a fetched passing GitHub Actions artifact or job log proving all four validators passed after the latest workflow/validator/dashboard commits.

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
  - none today; artifact capture is structurally enforced, but should wait for raw CI logs before being promoted as fully active evidence practice.
- needs_revision:
  - validation evidence ladder should include `CI raw evidence artifact capture defined` as distinct from full repository CI evidence.
- deprecated/rejected:
  - PR #97 stale branch remains superseded by fresh-main commits; do not merge it blindly.
```

## Replay coverage and result

Current coverage:

```txt
prompt regressions defined on main = 6
failure replay cases defined on main = 5
behavior replay fixtures defined on main = 5
behavior fixture runner = defined
CI workflow for validators = defined
CI raw evidence artifact capture = defined
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
CI raw evidence artifact capture defined = 1
```

Do not increment full `validation_passed`, `prompt_regression_passed`, `behavior_replay_fixture_passed`, or `replay_case_passed` for CI/full-checkout until raw logs are available.

## Safe harness/docs changes made

Safe docs/scripts/metrics updates only:

- `.github/workflows/agent-harness-validators.yml` now tees each validator command into a durable `.log` file and uploads `agent-harness-validation-evidence`.
- `scripts/validate-agentic-prompts.mjs` now requires the CI raw-evidence artifact contract.
- `agent-learning-metrics.md` records the new artifact-capture evidence layer.
- `system-health-dashboard.md`, `system-health-dashboard.json`, and brain-management live dashboard data were updated.
- `morning-handoff-queue.md` now asks the next Morning run to fetch/confirm the artifact or raw job logs.

## Prompt regression tests updated/proposed

No new prompt regression was required today. The existing prompt regression count remains 6 and every behavior fixture still maps to a prompt-regression ID.

## Agent-ready tickets / handoffs

Provider/product work remains in existing agent-ready tickets:

1. `andylitvinov-design/psihotavr#168`
   - Suggested command: `/delivery` or `/safe` / `/audit-ui` for Supabase auth/admin persistence/live proof.
   - Status: open; provider/live proof missing.
2. `andylitvinov-design/finance#614`
   - Suggested command: `/audit-fin` for strict live `verify:finance` provider-balance gap.
   - Status: open; provider/manual balance source evidence missing.

Safe harness handoff for next Morning:

```txt
/upgrade

Goal: fetch full GitHub Actions/raw checkout evidence for the latest main harness commits after the CI artifact-capture upgrade.

Source of truth:
- .github/workflows/agent-harness-validators.yml
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- projects/codex-automation/prompt-regression-tests.json
- projects/codex-automation/behavior-replay-fixtures.json
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/delivery-outcome-ledger.md
- projects/codex-automation/system-health-dashboard.md
- projects/codex-automation/system-health-dashboard.json

Required checks:
1. Fetch the workflow run after the latest main commits.
2. Fetch `agent-harness-validation-evidence` artifact or job logs.
3. Confirm all four validators passed from raw logs.
4. If all pass, record CI/full-checkout validation evidence and adjust dashboard confidence.
5. If no raw output exists, keep `CI raw evidence artifact capture defined` and `full CI evidence pending` as separate states.

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

- GitHub Actions raw logs or artifacts for all four validators are still not recorded after the latest main commits.
- The connector workflow-run lookup returned no PR-triggered runs for `c3a0f54`; it may not expose push-triggered runs.
- Behavior replay fixtures are still deterministic saved-output tests, not live model replay.
- Provider/live blockers #168 and #614 remain open and must keep blocking `SUCCESS` for their respective product/provider outcomes.
- Live ChatGPT Automation UI prompts still need occasional comparison against the registry; do not create duplicate automations.

## Single next action

Evening Architecture Review should verify whether the latest GitHub Actions run produced the `agent-harness-validation-evidence` artifact or equivalent job logs, then accept/correct the dashboard’s estimated health scores before promoting any structural/fixture-runner coverage beyond local reconstructed evidence.
