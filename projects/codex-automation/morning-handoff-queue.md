# Morning Handoff Queue

Last updated: 2026-07-09

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-10 — fetch raw CI artifact evidence and close the evidence ladder

Source: Morning System Upgrade 2026-07-09.

Status: ready for safe `/upgrade` verification work.

Inputs:
- The 2026-07-09 Morning Upgrade implemented the safe part of the previous handoff: `.github/workflows/agent-harness-validators.yml` now tees each validator command to log files under `agent-harness-validation-evidence/` and uploads that directory with `actions/upload-artifact@v4`.
- `scripts/validate-agentic-prompts.mjs` now fails if the workflow stops including the expected raw-evidence artifact contract:
  - `agent-harness-validation-evidence`;
  - `validate-agentic-prompts.log`;
  - `run-behavior-replay-fixtures.log`;
  - `verify-context-scout.log`;
  - `validate-projects-brain.log`.
- `agent-learning-metrics.md`, `system-health-dashboard.md`, `system-health-dashboard.json`, and the live brain-management dashboard data mirror were updated.
- Local reconstructed harness checks from this run produced:
  - `agentic prompt validation ok: 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 2 automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined`;
  - `behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)`.
- Full GitHub Actions raw logs are still not counted as passed until the artifact or job logs are fetched from a real workflow run after the latest commits.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Fetch GitHub Actions/check evidence for latest `main` commits that touched the harness after `e2edb2b6`, `2f6fcef8`, `556c288`, `e11f305`, and `4d99cae`.
2. If a workflow run exists, fetch the `agent-harness-validation-evidence` artifact or job logs.
3. Confirm all four commands from raw logs:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/run-behavior-replay-fixtures.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
4. If all pass, record full CI/raw validation evidence in `agent-learning-metrics.md`, `delivery-outcome-ledger.md`, and the dashboard.
5. Promote only validated structural/fixture-runner coverage. Do not promote provider/live or live behavior rules until real provider/live or automation prevention evidence exists.
6. If no raw CI output exists, keep the state as `CI raw evidence artifact capture defined` + `full CI evidence pending`.

Needs verification:
- Raw GitHub Actions logs or artifact for all four commands.
- Whether the GitHub connector can fetch push-triggered workflow runs or only PR-triggered runs.
- Live ChatGPT Automation UI prompts still need occasional comparison against registry contracts, but do not create duplicate automations.

## Closed / consumed items

### 2026-07-09 — define raw validator evidence artifact capture

Consumed by Morning System Upgrade 2026-07-09.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- `.github/workflows/agent-harness-validators.yml` now tees every validator command into durable log files and uploads them as `agent-harness-validation-evidence`;
- `scripts/validate-agentic-prompts.mjs` now validates the raw-evidence artifact contract so this CI observability layer cannot silently disappear;
- `agent-learning-metrics.md` records `CI raw evidence artifact capture defined` as a distinct state from `raw validation output available`;
- `system-health-dashboard.md`, `system-health-dashboard.json`, and the live dashboard data mirror were updated with estimated, confidence-labelled health changes.

Still not counted as full CI validation passed:
- raw GitHub Actions logs for a workflow run after the latest commits have not been fetched.

### 2026-07-09 — reconcile PR #97 and raw CI validator evidence

Consumed by Morning System Upgrade 2026-07-09.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- applied the core PR #97 guardrail directly on fresh `main` instead of trying to merge an unmergeable stale branch;
- added missing prompt-regression coverage for all behavior replay fixture IDs;
- strengthened `scripts/validate-agentic-prompts.mjs` with fixture-to-prompt and fixture-to-replay coverage checks;
- recorded local reconstructed `validate-agentic-prompts` and `run-behavior-replay-fixtures` output in metrics/ledger;
- closed PR #97 as superseded after applying the equivalent safe change on main.

Still not counted as full CI validation passed:
- raw GitHub Actions logs for the four-command workflow were not available in that run.

### Earlier closed items

- 2026-07-08: CI validator workflow created and workflow contract added to validator.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation added and stale validation evidence separated from raw validation output.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live readiness gate, rule lifecycle, Daily Improve strategic portfolio, and Morning `APPLIED_UPGRADE / NO_SAFE_UPGRADE` contracts created.

Still routed out of Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168`.
- Finance strict `verify:finance` provider-balance blocker: `andylitvinov-design/finance#614`.
