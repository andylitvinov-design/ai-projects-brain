# Morning Handoff Queue

Last updated: 2026-07-05

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-06 — execute the new feedback-loop validator from checkout

Source: Morning System Upgrade 2026-07-05.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `scripts/validate-agentic-prompts.mjs` now exists and explicitly reads:
  - `projects/codex-automation/prompt-regression-tests.json`;
  - `projects/codex-automation/failure-replay-cases.json`;
  - `projects/codex-automation/automation-prompt-registry.json`.
- The validator checks malformed JSON indirectly through parse, duplicate IDs/titles, allowed statuses, required fields, required shared provider/Daily Improve/Morning Upgrade cases, and the key anti-drift expectations.
- `projects/codex-automation/automation-prompt-registry.json`, `delivery-outcome-ledger.md`, and `agent-learning-metrics.md` now reference the validator.

Recommended Morning action:
1. From a real checkout, run:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
2. If `validate-agentic-prompts.mjs` fails, apply the smallest schema/docs/registry fix.
3. If it passes, update `agent-learning-metrics.md` with validation evidence and consider promoting only the validator coverage itself from `candidate` to `active`; do not promote behavior rules until their replay/prompt behavior is actually exercised.
4. Keep product/provider work routed to product-specific commands.

Needs verification:
- Connector-only runs can create/update GitHub files but still cannot run local Node validation here.
- Replay/prompt-regression cases remain candidates until a runner executes them, even though the schema/contract validator now exists.
- Product/provider tickets remain routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

## Closed / consumed items

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
