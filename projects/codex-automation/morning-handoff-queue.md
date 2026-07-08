# Morning Handoff Queue

Last updated: 2026-07-08

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-09 — reconcile PR #97 and raw CI validator evidence

Source: Morning System Upgrade 2026-07-08 and Evening Architecture Review 2026-07-08.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `.github/workflows/agent-harness-validators.yml` exists on main and defines the four expected harness checks.
- `scripts/validate-agentic-prompts.mjs` requires the workflow contract and the four expected Node commands.
- PR #97 (`Cover behavior fixtures with prompt regressions`) proposes fixture-to-prompt-regression coverage, but it is open, not mergeable, and has no recorded workflow run evidence for head `456ef0c3a2029e27cac3567d6b8f7ed8c97c6a61`.
- `agent-learning-metrics.md` now records `unvalidated safe-harness PRs requiring reconciliation = 1`.
- `delivery-outcome-ledger.md` now records the PR #97 validation/evidence gap.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Check PR #97 against latest `main`.
2. If the PR is still relevant, rebase it or recreate the smallest equivalent safe harness PR from fresh `main`.
3. From checkout or CI, run/fetch raw output for:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/run-behavior-replay-fixtures.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
4. If all checks pass, record exact raw validation evidence in `agent-learning-metrics.md` and `delivery-outcome-ledger.md`, then merge the refreshed safe harness PR.
5. If checks fail, fix the smallest schema/docs/fixture/registry/workflow issue and keep behavior rules candidate.
6. If no raw output exists, keep status at `CI workflow defined` + `unvalidated safe-harness PR requiring reconciliation`; do not count validation passed.

Needs verification:
- Whether GitHub Actions started from the workflow commit or from a refreshed PR.
- Raw logs for all four validator commands.
- Whether PR #97 should be rebased, recreated, or closed as superseded.
- Live ChatGPT Automation UI prompts still need occasional comparison against registry contracts, but do not create duplicate automations.

## Closed / consumed items

### 2026-07-08 — verify CI validator evidence and promote only proven coverage

Consumed by Evening Architecture Review 2026-07-08.

Outcome: `PARTIAL / NEEDS_VERIFICATION`.

Evidence found:
- CI workflow exists on main.
- PR #97 exists as a safe harness coverage PR but is not mergeable and has no recorded workflow run evidence.
- Provider/live tickets #168 and #614 remain open.

Safe updates applied:
- updated `delivery-outcome-ledger.md` with the PR #97 validation/evidence gap;
- updated `agent-learning-metrics.md` with `unvalidated safe-harness PRs requiring reconciliation = 1`;
- updated this queue with the next exact `/upgrade` action.

Still not counted as raw validation output:
- no raw Actions/checkout logs were available for the four validator commands.

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
