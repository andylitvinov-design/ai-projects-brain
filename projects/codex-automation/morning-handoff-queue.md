# Morning Handoff Queue

Last updated: 2026-07-05

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-06 — merge/check validator ID drift fix before promoting validator coverage

Source: Evening Architecture Review 2026-07-05.

Status: ready for safe `/upgrade` verification work.

Inputs:
- PR `andylitvinov-design/ai-projects-brain#92` aligns a drift between:
  - prompt regression ID: `morning-upgrade-must-apply-or-prove-no-safe-upgrade`;
  - replay/validator-required ID: `morning-upgrade-report-only-without-applied-upgrade`.
- Without this fix, `scripts/validate-agentic-prompts.mjs` can fail on its own contract and cannot yet be counted as proven loop protection.
- The PR is harness-only: prompt-regression JSON plus validator lookup. It does not touch product code, provider config, data, deploy, auth/payment, env values, or secrets.

Recommended Morning action:
1. Review PR #92.
2. From a real checkout, run at least:
   - `node scripts/validate-agentic-prompts.mjs` on the PR branch;
   - `node scripts/verify-context-scout.mjs` if repo dependencies are available;
   - `node scripts/validate-projects-brain.mjs` if repo dependencies are available.
3. If checks pass, merge PR #92 or report why merge is blocked.
4. Only after pass/merge evidence, update `agent-learning-metrics.md` from `validation commands run = 0` to the actual pass/fail count and consider promoting validator schema coverage itself to `active`.
5. Do not promote the Daily Improve or Morning Upgrade behavior rules to `active` until their replay/prompt behavior is actually exercised, not just schema-validated.

Needs verification:
- Connector-only runs cannot execute Node validators here.
- PR #92 currently has no local validation evidence yet.
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
