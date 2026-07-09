# Morning Handoff Queue

Last updated: 2026-07-09

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-10 — verify full CI evidence and close the evidence ladder

Source: Morning System Upgrade 2026-07-09.

Status: ready for safe `/upgrade` verification work.

Inputs:
- PR #97 was open, unmergeable, and had no recorded workflow evidence for head `456ef0c3a2029e27cac3567d6b8f7ed8c97c6a61`.
- Its core safe harness idea was still valid: every behavior replay fixture must map to both a replay case and a prompt-regression test.
- The equivalent minimal fresh-main fix has been applied directly to `main`:
  - `prompt-regression-tests.json` now has 6 prompt regressions, including `improve-upgrade-mode-boundary-drift` and `save-memory-handoff-confusion`.
  - `scripts/validate-agentic-prompts.mjs` now fails if any behavior fixture lacks matching prompt-regression or replay coverage.
  - `agent-learning-metrics.md` and `delivery-outcome-ledger.md` record the fixture-to-prompt coverage fix and local deterministic fixture output.
- Local reconstructed harness checks from this run produced:
  - `agentic prompt validation ok: 6 prompt regressions, 5 replay cases, 5 behavior fixtures, 2 automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined`;
  - `behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)`.
- Full repository checkout/CI evidence is still needed for the complete workflow because connector runtime did not provide raw Actions logs for the four-command workflow.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Fetch GitHub Actions/check evidence for the latest `main` commits that touched the harness.
2. If raw workflow logs are available, confirm all four commands:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/run-behavior-replay-fixtures.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
3. If the workflow passed, record full CI validation evidence in `agent-learning-metrics.md` and `delivery-outcome-ledger.md`.
4. Promote only validated structural/fixture-runner coverage. Do not promote live behavior rules until real automation/model behavior proves prevention.
5. If no raw CI output exists, keep the state as `local reconstructed fixture output available` + `full CI evidence pending`.
6. Keep PR #97 closed/superseded; do not revive the stale branch unless a fresh diff proves it has unique value.

Needs verification:
- Raw GitHub Actions logs for all four commands.
- Whether GitHub connector can fetch push-triggered workflow runs, or only PR-triggered runs.
- Live ChatGPT Automation UI prompts still need occasional comparison against registry contracts, but do not create duplicate automations.

## Closed / consumed items

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
- raw GitHub Actions logs for the four-command workflow were not available in this run.

### Earlier closed items

- 2026-07-08: CI validator workflow created and workflow contract added to validator.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation added and stale validation evidence separated from raw validation output.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live readiness gate, rule lifecycle, Daily Improve strategic portfolio, and Morning `APPLIED_UPGRADE / NO_SAFE_UPGRADE` contracts created.

Still routed out of Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168`.
- Finance strict `verify:finance` provider-balance blocker: `andylitvinov-design/finance#614`.
