# Morning Handoff Queue

Last updated: 2026-07-04

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-05 — execute feedback-loop artifacts, not only keep them present

Source: Evening Architecture Review 2026-07-04.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `projects/codex-automation/failure-replay-cases.json` now includes replay candidates for Daily Improve strategic-portfolio drift and Morning Upgrade report-only drift.
- `projects/codex-automation/prompt-regression-tests.json` already includes matching prompt regression candidates.
- `projects/codex-automation/delivery-outcome-ledger.md` now records the 2026-07-04 user corrections that exposed both drift classes.
- `projects/codex-automation/agent-learning-metrics.md` now tracks user corrections converted to harness artifacts and fixes replay/regression counts.

Recommended Morning action:
1. Verify whether the existing validation scripts currently read `prompt-regression-tests.json` and `failure-replay-cases.json`.
2. If no validator reads them, add the smallest safe validator or extend the existing prompt validator so malformed JSON, duplicate IDs, missing required fields, and status drift are caught.
3. Run:
   - `node scripts/validate-agentic-prompts.mjs` when present;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
4. Keep the new replay cases as `candidate` until an actual runner executes them; do not promote them from schema existence alone.
5. Keep product/provider work routed to the product-specific commands.

Needs verification:
- Connector-only Evening Review could update GitHub files but could not run local Node validation.
- Replay/prompt-regression cases remain candidates until a runner executes them.
- Product/provider tickets remain routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

### 2026-07-05 — verify feedback-loop artifacts are used, not only present

Source: Morning System Upgrade 2026-07-04.

Status: ready for safe `/upgrade` verification work.

Inputs:
- `systems/provider-live-readiness-gate.md` now defines the provider/live proof boundary.
- `systems/harness-rule-lifecycle.md` now defines candidate/active/needs_revision/deprecated/rejected.
- `projects/codex-automation/prompt-regression-tests.json` includes `provider-dependent-feature-without-provider-proof`, `daily-improve-strategic-portfolio-not-only-bugs`, and `morning-upgrade-must-apply-or-prove-no-safe-upgrade` candidates.
- `projects/codex-automation/failure-replay-cases.json` includes replay candidates for provider/live false success and mode-boundary drift.
- `projects/codex-automation/agent-learning-metrics.md` and `delivery-outcome-ledger.md` now provide minimal evidence scaffolds.

Recommended Morning action:
1. Run local validation from a real checkout if available:
   - `node scripts/validate-agentic-prompts.mjs` when present;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
2. Check whether the new JSON regression/replay files need a dedicated validator or should be integrated into an existing one.
3. Verify live scheduler prompts still match `projects/codex-automation/automation-prompt-registry.json`.
4. If validation reveals schema drift, apply the smallest docs/script fix.
5. Do not touch product code or provider settings from Morning System Upgrade.

Needs verification:
- Connector-only runs cannot execute local Node scripts; validate from Codex/local checkout.
- The prompt-regression and replay cases are candidates until executed by a runner.
- Provider/live product tickets remain open in the product repos and must be handled by `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`.

## Closed / consumed items

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
