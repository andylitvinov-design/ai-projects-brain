# Morning Handoff Queue

Last updated: 2026-07-07

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-08 — execute behavior replay fixture runner and validators

Source: Morning System Upgrade 2026-07-07 and Evening Architecture Review 2026-07-07.

Status: ready for safe `/upgrade` verification work from a real checkout.

Inputs:
- `scripts/run-behavior-replay-fixtures.mjs` now exists and checks deterministic expected-pass/expected-fail output fixtures.
- `projects/codex-automation/behavior-replay-fixtures.json` now covers five candidate behavior patterns:
  - provider/live false success;
  - Daily Improve portfolio strategy not only bugs;
  - Morning Upgrade report-only completion;
  - `/improve` vs `/upgrade` boundary drift;
  - `/save` vs `/memory` vs `/handoff` confusion.
- Evening Architecture Review 2026-07-07 found an additional artifact-drift risk: behavior fixtures were mapped to replay cases, but not all fixture IDs were guaranteed to map to prompt-regression IDs.
- Safe fix prepared:
  - `prompt-regression-tests.json` now includes matching prompt regressions for every behavior fixture ID;
  - `scripts/validate-agentic-prompts.mjs` now fails if any behavior fixture lacks a matching prompt-regression test or replay case;
  - `agent-learning-metrics.md` and `delivery-outcome-ledger.md` record the prompt-to-behavior fixture coverage fix.
- PR #92 is no longer open: it was closed unmerged as stale/superseded after PR #95/PR #96. Do not merge its stale hunks blindly.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Review the Evening Architecture PR for fixture-to-prompt coverage drift.
2. From a real checkout, rerun:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/run-behavior-replay-fixtures.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
3. If checks pass, record raw validation output evidence in `agent-learning-metrics.md` and `delivery-outcome-ledger.md`, then merge the safe harness PR.
4. Promote only structural/fixture-runner coverage if raw output exists. Do not promote live behavior rules until a real automation report or live model replay proves prevention.
5. If checks fail, fix the smallest schema/docs/fixture/registry issue and keep all behavior rules candidate.
6. Check whether live ChatGPT Automations UI prompts still match the registry contracts for Daily Improve, Morning Upgrade, and Evening Review; if not, update the existing automation prompt only, not a new automation.

Needs verification:
- Connector-only runs can write safe docs/scripts but cannot produce local Node output.
- Fixture runner validates saved examples, not live model behavior.
- No provider config, secrets, product code, auth/payment, deploy, or finance data should be touched from Morning Upgrade.

## Closed / consumed items

### 2026-07-07 — close validation-evidence propagation loop

Consumed by Morning System Upgrade 2026-07-07.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- confirmed PR #96 is merged and PR #92 is closed unmerged/stale;
- created `projects/codex-automation/behavior-replay-fixtures.json`;
- created `scripts/run-behavior-replay-fixtures.mjs`;
- updated `scripts/validate-agentic-prompts.mjs` to validate behavior fixtures and metrics alignment;
- updated `automation-prompt-registry.json`, `agent-learning-metrics.md`, and `delivery-outcome-ledger.md` with the behavior replay layer;
- created the next checkout validation handoff above.

Still not counted as raw validation output:
- this was a connector-only safe update; Node command output still requires checkout/CI evidence.

### 2026-07-07 — run upgraded validator and decide next replay layer

Superseded by the queue item above.

Reason: PR #95 and PR #96 moved the system from missing structural validation to needing behavior replay fixtures and raw checkout evidence.

### 2026-07-06 — execute the new feedback-loop validator from checkout

Consumed by Morning System Upgrade 2026-07-06.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- strengthened `scripts/validate-agentic-prompts.mjs` to validate `agent-learning-metrics.md` drift against prompt/replay artifact counts;
- updated `projects/codex-automation/automation-prompt-registry.json` so Morning and Evening contracts mention metrics drift, not only prompt/replay/registry drift;
- updated `projects/codex-automation/agent-learning-metrics.md` with validator coverage note;
- updated `projects/codex-automation/delivery-outcome-ledger.md` with a 2026-07-06 evidence row;
- created the next checkout validation handoff above.

Still not counted as raw validation output:
- Connector-only runs can report PR-level verification, but raw command output still requires checkout/CI evidence.

### 2026-07-05 — execute feedback-loop artifacts, not only keep them present

Consumed by Morning System Upgrade 2026-07-05.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- created `scripts/validate-agentic-prompts.mjs`;
- registered the validator in `projects/codex-automation/automation-prompt-registry.json`;
- recorded validator evidence in `projects/codex-automation/delivery-outcome-ledger.md`;
- updated `projects/codex-automation/agent-learning-metrics.md` with `feedback-loop validators defined = 1`;
- created the next checkout validation handoff above.

Still routed out of Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168`.
- Finance strict `verify:finance` provider-balance blocker: `andylitvinov-design/finance#614`.

### 2026-07-05 — verify feedback-loop artifacts are used, not only present

Consumed by Morning System Upgrade 2026-07-05.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- same validator and registry/ledger/metrics updates as above;
- no product code, provider config, production data, auth/payment, deploy settings, or secrets touched.

Still needs verification:
- run all Node validators from a checkout and record pass/fail evidence.

### 2026-07-04 — skill visibility and handoff loop stabilization

Consumed by Morning System Upgrade 2026-07-04.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- created provider/live readiness gate;
- created rule lifecycle standard;
- created delivery feedback loop standard;
- created ledger, metrics, prompt-regression, and replay scaffolds;
- created domain-vocabulary, suggested-skills, and red-capable feedback-loop guardrail files;
- updated `/improve` to restore Daily Improve as strategic portfolio planning;
- updated `/upgrade` and the daily protocol to require `APPLIED_UPGRADE` or `NO_SAFE_UPGRADE`;
- created automation prompt registry mirror.

Still routed out of Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168`.
- Finance strict `verify:finance` provider-balance blocker: `andylitvinov-design/finance#614`.
