# Evening Architecture Review Handoff

Last updated: 2026-07-09 Evening Architecture Review

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
- Evening verified repository file evidence for the workflow and dashboard updates, but did not obtain raw GitHub Actions job logs or downloadable artifacts for a passing run after the latest main commits.
- GitHub connector lookup for known recent harness commit refs returned no workflow runs.
- Local full-checkout validation could not be run in this environment because direct `git clone` failed with DNS resolution error; this run therefore does not count full checkout validation as passed.
- Provider/live readiness blockers remain open: `andylitvinov-design/psihotavr#168` and `andylitvinov-design/finance#614`.
- No product code, provider configuration, production data, deploy setting, auth/payment setting, env value, or secret-adjacent change was executed from this review loop.

## Morning Health Delta Verification

| Morning claim | Evening decision | Current evening score | Reason |
| --- | --- | ---: | --- |
| Provider/live readiness stays unknown/blocked | accepted | unknown | No provider/live proof was produced and no provider state was mutated. |
| False success protection 55/100 estimated, low confidence | accepted | 55/100 estimated | Structural artifact-capture contract reduces prose-only success risk, but no raw CI/log prevention proof yet. |
| Delivery completion quality 55/100 estimated, low confidence | accepted | 55/100 estimated | Morning made real harness/dashboard changes, but completion remains CI-evidence-pending. |
| User pain repetition 55/100 estimated, low confidence | accepted | 55/100 estimated | Live dashboard + concrete changed-file reporting addresses the repeated pain, but needs continued evidence discipline. |
| Loop closure 65/100 estimated, low confidence | accepted | 65/100 estimated | Prior evening handoff was consumed and implemented as a safe harness/CI observability change. |
| Validation evidence 60/100 estimated, medium confidence | corrected | 55/100 estimated, low confidence | Artifact capture is defined, but raw GitHub Actions artifact/job logs were not fetched and full checkout validation was not run. |
| Regression/replay coverage 65/100 estimated, medium confidence | accepted | 65/100 estimated | 6 prompt regressions, 5 replay cases, and 5 behavior fixtures are defined and mapped; no new failure class today. |
| Rule lifecycle health 55/100 estimated, low confidence | accepted | 55/100 estimated | No premature promotion; behavior rules remain candidate until raw/live prevention evidence exists. |
| Automation noise unknown | corrected to baseline estimate | 50/100 estimated, low confidence | No new automation was created, but registry still records scheduler states that need live verification. |
| Active project momentum unknown | corrected to baseline estimate | 50/100 estimated, low confidence | Tickets exist, but provider/live project progress remains unproven. |

## Provider/live readiness gaps found

These remain higher priority than softer mode-vocabulary cleanup:

1. Psihotavr provider/live proof remains open in `andylitvinov-design/psihotavr#168`: Supabase auth/admin persistence and live Google/cabinet/admin/public-card behavior must be proven separately from code paths.
2. Finance provider-balance proof remains open in `andylitvinov-design/finance#614`: strict live `verify:finance` still depends on resolving the provider/manual balance source gap without unsafe finance mutation.

Evening Review and Morning Upgrade must keep both routed to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`; do not claim `SUCCESS` from code merge alone.

## Repeated patterns found

1. The system improved from `CI workflow defined` to `CI raw evidence artifact capture defined`, but still risks treating artifact contract as if it were raw validation output.
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

3. Behavior replay fixtures are covered by prompt regressions and deterministic local fixture expectations, but this is still not live model behavior.
4. Provider/live readiness remains structurally routed, but the product/provider tickets are still open and must keep blocking final `SUCCESS`.
5. The latest evidence-capture logic is duplicated between workflow YAML and conceptual handoff instructions; next Morning should unify local+CI evidence capture into one script so the same raw evidence can be generated locally and uploaded in CI.

## Selected root structural issue for tonight

The highest-leverage remaining issue is raw evidence reproducibility.

The system now has:

```txt
prompt regressions = 6
failure replay cases = 5
behavior fixtures = 5
behavior fixture runner = defined
CI workflow = defined
CI raw evidence artifact capture = defined
fixture-to-replay mapping = covered
fixture-to-prompt-regression mapping = covered
local reconstructed fixture output = available from Morning report
```

But it still lacks a fetched passing GitHub Actions artifact or job log proving all four validators passed after the latest workflow/validator/dashboard commits. The next safe upgrade should reduce this weakness by creating one local+CI evidence runner that writes the same `agent-harness-validation-evidence/*.log` files in both environments.

## Metric model trend review

Sources used in final report: current public research on abstention-aware agent evaluation, guardrail recall/true-negative evaluation, DORA/rework and SPACE/developer-productivity lenses.

Trend observed: the dashboard should not add a new top-level metric today. The current 10 metrics already cover the issue if we sharpen subdimensions:

- `False success protection`: add/track abstention and uncertainty quality as a subdimension.
- `Validation evidence`: add reproducibility/consistency as a subdimension; same command set should produce the same evidence locally and in CI.
- `Delivery completion quality`: keep rework/unplanned repair rate as a subdimension.
- `Automation noise / duplication`: keep hidden cost/context growth/retry cost as a subdimension.

Lifecycle status: candidate subdimension refinement only; no metric-set change.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - provider-dependent-feature-without-provider-proof remains candidate as live/prevention behavior.
  - daily-improve-strategic-portfolio-not-only-bugs remains candidate as live automation behavior.
  - morning-upgrade-report-only-without-applied-upgrade remains candidate as live automation behavior.
  - improve-upgrade-mode-boundary-drift remains candidate as live behavior.
  - save-memory-handoff-confusion remains candidate as live behavior.
  - validation-evidence-reproducibility-local-plus-ci starts as candidate subdimension under Validation evidence.
- promoted to active:
  - none today; artifact capture is structurally enforced, but raw logs are not available.
- needs_revision:
  - validation evidence ladder must keep `CI raw evidence artifact capture defined` distinct from `raw validation output available`.
- deprecated/rejected:
  - none today.
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
local deterministic fixture output = available from Morning report
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
evening health delta verifications completed = 1
raw CI workflow runs fetched = 0
```

Do not increment full `validation_passed`, `prompt_regression_passed`, `behavior_replay_fixture_passed`, or `replay_case_passed` for CI/full-checkout until raw logs are available.

## Safe harness/docs changes made by Evening

Safe docs/dashboard/ledger updates only:

- `system-health-dashboard.md` and `system-health-dashboard.json` updated with Evening score verification and corrected validation-evidence confidence.
- brain-management live dashboard data mirror updated to the same Evening values.
- `morning-handoff-queue.md` updated with one ranked next Morning action.
- `delivery-outcome-ledger.md` updated with the Evening verification outcome.
- `agent-learning-metrics.md` updated with the Evening verification metric.

## Prompt regression tests updated/proposed

No new prompt regression is required tonight. The gap is not a new behavior class; it is evidence reproducibility for an existing validation layer.

Proposed safe harness script for Morning:

```txt
scripts/run-agent-harness-validation-evidence.mjs
```

Responsibilities:

1. create/clean `agent-harness-validation-evidence/`;
2. run all four validators;
3. write each command's raw output to the expected `.log` file;
4. exit non-zero if any validator fails;
5. be called by `.github/workflows/agent-harness-validators.yml` so local and CI evidence match;
6. be checked by `scripts/validate-agentic-prompts.mjs` so the runner cannot silently drop a validator or log file.

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

Goal: create one local+CI raw evidence runner for the agent harness validators and use it to close the artifact-capture versus raw-output gap.

Source of truth:
- .github/workflows/agent-harness-validators.yml
- scripts/validate-agentic-prompts.mjs
- scripts/run-behavior-replay-fixtures.mjs
- scripts/verify-context-scout.mjs
- scripts/validate-projects-brain.mjs
- projects/codex-automation/prompt-regression-tests.json
- projects/codex-automation/behavior-replay-fixtures.json
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/delivery-outcome-ledger.md
- projects/codex-automation/system-health-dashboard.md
- projects/codex-automation/system-health-dashboard.json

Required safe change:
1. Add `scripts/run-agent-harness-validation-evidence.mjs`.
2. The script must run the four commands:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/run-behavior-replay-fixtures.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
3. The script must write these logs:
   - `agent-harness-validation-evidence/validate-agentic-prompts.log`;
   - `agent-harness-validation-evidence/run-behavior-replay-fixtures.log`;
   - `agent-harness-validation-evidence/verify-context-scout.log`;
   - `agent-harness-validation-evidence/validate-projects-brain.log`.
4. Update `.github/workflows/agent-harness-validators.yml` to call the single script and upload the same artifact.
5. Update `scripts/validate-agentic-prompts.mjs` to verify the evidence runner exists, calls all four validators, and writes all four log files.
6. Run the evidence runner from checkout when possible. If checkout/CI is blocked, state the exact blocker and keep confidence low.
7. Update dashboard and learning metrics only from actual output.

Expected metric improvement if validated:
- Validation evidence: 55 -> 65+ if local raw logs are produced; 70+ if CI artifact/job logs are fetched.
- False success protection: 55 -> 60 if validator protects the unified runner contract.
- Delivery completion quality: 55 -> 60 if raw logs are attached to the report.

Boundaries:
- harness/docs/scripts/CI workflow only;
- no product code;
- no provider config;
- no production data;
- no auth/payment/deploy/env/secrets.

Evening verification question:
Can Evening read raw logs for all four commands from either local evidence output or GitHub Actions artifact, and do those logs prove pass/fail instead of relying on prose?
```
