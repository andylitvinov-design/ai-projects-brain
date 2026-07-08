# Evening Architecture Review Handoff

Last updated: 2026-07-08

## Evidence reviewed

- Morning System Upgrade 2026-07-08 created `.github/workflows/agent-harness-validators.yml` and wired `scripts/validate-agentic-prompts.mjs` to require the four harness validation commands in CI.
- Current main contains the workflow with PR, push-to-main, and manual triggers for harness paths.
- Open PR #97 (`Cover behavior fixtures with prompt regressions`) exists as a safe harness PR for fixture-to-prompt-regression coverage, but it is still unmerged, reported `mergeable=false`, and has no recorded workflow run evidence for head `456ef0c3a2029e27cac3567d6b8f7ed8c97c6a61`.
- `fetch_commit_workflow_runs` returned no workflow runs for PR #97 head and no workflow runs for the main harness evidence commit checked in this connector review.
- Provider/live readiness blockers remain open: `andylitvinov-design/psihotavr#168` and `andylitvinov-design/finance#614`.
- No product code, provider configuration, production data, deploy setting, auth/payment setting, env value, or secret-adjacent change was executed from this review.

## Provider/live readiness gaps found

These remain higher priority than softer mode-vocabulary cleanup:

1. Psihotavr provider/live proof remains open in `andylitvinov-design/psihotavr#168`: Supabase auth/admin persistence and live Google/cabinet/admin/public-card behavior must be proven separately from code paths.
2. Finance provider-balance proof remains open in `andylitvinov-design/finance#614`: strict live `verify:finance` still depends on resolving the provider/manual balance source gap without unsafe finance mutation.

Evening Review and Morning Upgrade must keep both routed to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`; do not claim `SUCCESS` from code merge alone.

## Repeated patterns found

1. The system has advanced from missing validators to having validators, a fixture runner, and a CI workflow, but still lacks raw pass/fail evidence in the durable metrics layer.
2. Safe harness PRs can become stale or unmergeable faster than the learning metrics update, causing another evidence-propagation gap.
3. The same evidence ladder keeps recurring and must not be collapsed:

```txt
not run
PR-reported run
CI workflow defined
raw validation output available
behavior replay fixture passed
live behavior/prevention evidence exists
```

4. Provider/live readiness is structurally handled by tickets, but those tickets remain open and must continue to block final `SUCCESS` for provider-dependent work.

## Selected root structural issue for tonight

The highest-leverage structural issue is not another new rule. It is the unclosed validation-evidence loop:

```txt
CI workflow exists + behavior fixture runner exists + PR #97 proposes fixture-to-prompt coverage
but raw workflow/checkout output is still absent and PR #97 is not mergeable.
```

Without resolving that loop, the harness can keep adding rules and PRs while still not producing reliable pass/fail evidence for the next automation.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - provider-dependent-feature-without-provider-proof remains candidate as behavior replay/live-prevention evidence, even though the provider/live operational gate is already being used in tickets.
  - daily-improve-strategic-portfolio-not-only-bugs
  - morning-upgrade-report-only-without-applied-upgrade
  - improve-upgrade-mode-boundary-drift
  - save-memory-handoff-confusion
- needs_revision:
  - validation evidence lifecycle: safe harness PRs must be rebased/validated/superseded before metrics count pass/fail or rules promote.
- promoted to active:
  - none tonight; no raw validation output or live behavior-prevention evidence was available.
- deprecated/rejected:
  - do not revive stale/unmergeable safe harness branches unless a fresh diff proves they still apply cleanly.
- evidence:
  - PR #97 open, not mergeable, no workflow runs found for head SHA.
  - delivery ledger and metrics updated on 2026-07-08.
  - provider issues #168 and #614 remain open.
```

## Replay coverage and result

Current coverage:

```txt
prompt regressions: defined on main = 5
failure replay cases: defined on main = 5
behavior replay fixtures: defined on main = 5
behavior fixture runner: defined on main
CI workflow for validators: defined on main
PR #97 fixture-to-prompt coverage: proposed, unmerged, unvalidated
raw fixture-run output: not recorded
live model replay: not implemented
behavior rules: remain candidate
```

No replay/prompt/fixture pass count was incremented because there was no raw command output or CI log evidence.

## Learning metrics

Updated with evidence-backed metric:

```txt
unvalidated safe-harness PRs requiring reconciliation = 1
```

Evidence: PR #97 is open, not mergeable, and has no recorded workflow run evidence for its head SHA. Do not increment `validation_passed`, `prompt_regression_passed`, `behavior_replay_fixture_passed`, or `replay_case_passed` from this connector-only review.

## Safe harness/docs changes made

Safe docs/metrics updates only:

- `projects/codex-automation/delivery-outcome-ledger.md` records the PR #97 validation/evidence gap.
- `projects/codex-automation/agent-learning-metrics.md` records `unvalidated safe-harness PRs requiring reconciliation = 1`.
- `projects/codex-automation/evening-review-handoff.md` records this root-cause review and next action.
- `projects/codex-automation/morning-handoff-queue.md` asks Morning Upgrade to reconcile PR #97 and raw CI/checkout evidence before promoting coverage.

## Prompt regression tests updated/proposed

No prompt-regression JSON was changed directly tonight because PR #97 already proposes the concrete fixture-to-prompt coverage fix. The required class to preserve remains:

```txt
provider-dependent-feature-without-provider-proof must block SUCCESS when provider/live proof is missing.
```

Morning should validate PR #97 rather than create another duplicate regression layer.

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

Goal: reconcile PR #97 and raw CI/checkout validator evidence before any rule promotion.

Source of truth:
- PR #97: Cover behavior fixtures with prompt regressions
- .github/workflows/agent-harness-validators.yml
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- projects/codex-automation/prompt-regression-tests.json
- projects/codex-automation/behavior-replay-fixtures.json
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/delivery-outcome-ledger.md

Required checks:
1. Check whether PR #97 is still relevant against latest main.
2. If relevant, rebase or recreate the minimal safe harness PR from fresh main.
3. Run or fetch raw output for:
   - node scripts/validate-agentic-prompts.mjs
   - node scripts/run-behavior-replay-fixtures.mjs
   - node scripts/verify-context-scout.mjs
   - node scripts/validate-projects-brain.mjs
4. Merge only after raw output proves the harness passes.
5. If no raw output exists, keep behavior rules candidate and record the exact blocker.

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
- PR #97 / validator reconciliation: /upgrade
- Psihotavr provider/live proof: /delivery or /safe, with /audit-ui for browser/live UI proof
- Finance provider-balance proof: /audit-fin
- new skill proposed: no
```

## Validation

Not counted as passed in this review. Connector evidence only:

- Workflow file exists on main.
- PR #97 exists but is not mergeable and has no workflow run evidence found by the available connector check.
- Local Node commands could not be run from this connector-only review.

Required validation remains:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/run-behavior-replay-fixtures.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

## Risks / needs verification

- GitHub Actions raw logs for the four validators are still not recorded in durable metrics.
- PR #97 may need rebase/recreation before it can safely merge.
- Behavior replay fixtures are still deterministic saved-output tests, not live model replay.
- Provider/live blockers #168 and #614 remain open and must keep blocking `SUCCESS` for their respective product/provider outcomes.
- Live ChatGPT Automation UI prompts still need occasional comparison against the registry; do not create duplicate automations.

## Single next action

Morning System Upgrade should reconcile PR #97 from fresh main, run/fetch raw validator evidence, and only then merge or promote structural/fixture coverage. If raw evidence is unavailable, keep candidate status and record the exact blocker.
