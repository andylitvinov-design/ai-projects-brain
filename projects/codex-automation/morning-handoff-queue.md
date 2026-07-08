# Morning Handoff Queue

Last updated: 2026-07-08

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-09 — verify CI validator evidence and promote only proven coverage

Source: Morning System Upgrade 2026-07-08.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `.github/workflows/agent-harness-validators.yml` now exists and runs the four harness validators on PR, push to `main`, and manual dispatch.
- `scripts/validate-agentic-prompts.mjs` now fails if the workflow is missing or does not include:
  - `node scripts/validate-agentic-prompts.mjs`;
  - `node scripts/run-behavior-replay-fixtures.mjs`;
  - `node scripts/verify-context-scout.mjs`;
  - `node scripts/validate-projects-brain.mjs`.
- `agent-learning-metrics.md`, `delivery-outcome-ledger.md`, and `automation-prompt-registry.json` now distinguish `CI workflow defined` from `raw validation output available`.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Check GitHub Actions for the latest `Agent Harness Validators` run on `andylitvinov-design/ai-projects-brain`.
2. If the workflow produced raw successful logs, record exact pass evidence in `agent-learning-metrics.md` and `delivery-outcome-ledger.md`.
3. Promote only `validation CI workflow coverage` or `structural validator coverage` when raw output exists. Do not promote provider/live, Daily Improve strategic portfolio, Morning report-only, improve/upgrade boundary, or save/memory/handoff behavior rules until behavior fixture output or live prevention evidence exists.
4. If the workflow failed, fix the smallest script/docs/schema/workflow issue and keep behavior rules candidate.
5. If no Actions output is available, keep status at `CI workflow defined` and write the exact manual/CI verification handoff.

Needs verification:
- Whether GitHub Actions started from the workflow commit.
- Raw logs for `validate-agentic-prompts.mjs` and `run-behavior-replay-fixtures.mjs`.
- Live ChatGPT Automation UI prompts still need occasional comparison against registry contracts, but do not create duplicate automations.

## Closed / consumed items

### 2026-07-08 — execute behavior replay fixture runner and validators

Consumed by Morning System Upgrade 2026-07-08.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- created `.github/workflows/agent-harness-validators.yml` so the validators have a PR/push/manual CI path to raw logs;
- strengthened `scripts/validate-agentic-prompts.mjs` to validate the workflow contract;
- updated `agent-learning-metrics.md` with `validation CI workflows defined = 1` and explicit evidence ladder wording;
- updated `automation-prompt-registry.json` so Morning and Evening contracts include the CI workflow layer;
- updated `delivery-outcome-ledger.md` with the 2026-07-08 evidence row;
- created the next CI-evidence verification handoff above.

Still not counted as raw validation output:
- the workflow was defined in this run, but raw Actions pass/fail output was not fetched yet.

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
