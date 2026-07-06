# Morning Handoff Queue

Last updated: 2026-07-06

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-07 — run upgraded validator and decide next replay layer

Source: Morning System Upgrade 2026-07-06.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `scripts/validate-agentic-prompts.mjs` now checks prompt regressions, replay cases, automation registry contracts, and `agent-learning-metrics.md` artifact-count drift.
- `projects/codex-automation/agent-learning-metrics.md` now documents the validator coverage note.
- `projects/codex-automation/delivery-outcome-ledger.md` records the metrics-drift guard as an applied safe harness change.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. From a real checkout, run:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
2. If `validate-agentic-prompts.mjs` fails, apply the smallest schema/docs/registry/metrics fix.
3. If it passes, update `agent-learning-metrics.md` with validation evidence and consider promoting only the structural validator coverage from `candidate` to `active`.
4. Do not promote behavior rules such as provider/live false-success blocking, Daily Improve strategic portfolio, or Morning APPLIED_UPGRADE until a behavior replay runner or real prevention evidence exists.
5. Evening Architecture Review should decide whether the next layer should be a minimal behavioral replay runner or enough structural validation for now.

Needs verification:
- Connector-only runs can update GitHub files but still cannot execute Node scripts in a real checkout.
- Replay/prompt-regression cases remain candidates until a runner executes them or an automation report shows the gate changed behavior.
- No provider config, secrets, product code, auth/payment, deploy, or finance data should be touched from Morning Upgrade.

## Closed / consumed items

### 2026-07-06 — execute the new feedback-loop validator from checkout

Consumed by Morning System Upgrade 2026-07-06.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- strengthened `scripts/validate-agentic-prompts.mjs` to validate `agent-learning-metrics.md` drift against prompt/replay artifact counts;
- updated `projects/codex-automation/automation-prompt-registry.json` so Morning and Evening contracts mention metrics drift, not only prompt/replay/registry drift;
- updated `projects/codex-automation/agent-learning-metrics.md` with validator coverage note;
- updated `projects/codex-automation/delivery-outcome-ledger.md` with a 2026-07-06 evidence row;
- created the next checkout validation handoff above.

Still not counted as passed validation:
- Node commands were not executed from a checkout in this connector-only run.

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
