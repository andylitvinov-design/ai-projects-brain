# Morning Handoff Queue

Last updated: 2026-07-06

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-07 — close validation-evidence propagation loop

Source: Evening Architecture Review 2026-07-06.

Status: ready for safe `/upgrade` verification work.

Inputs:
- PR #95 (`Document Codex automation role model`) was merged on 2026-07-06 and its verification section reports these commands ran:
  - `node scripts/validate-agentic-prompts.mjs`;
  - `node scripts/validate-projects-brain.mjs`;
  - `node scripts/verify-context-scout.mjs`.
- Main now contains the role model, registry role fields, and the validator contract updates from PR #95.
- `agent-learning-metrics.md` and older handoff wording still needed evidence-state cleanup after PR #95: previous text treated validation as not run at all.
- PR #92 (`Fix agentic prompt validator ID drift`) is still open, non-mergeable, and likely stale/superseded by the merged validator/registry changes in PR #95.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Review the safe docs PR created by Evening Architecture Review for this handoff/metrics/ledger cleanup.
2. From a real checkout, rerun:
   - `node scripts/validate-agentic-prompts.mjs`;
   - `node scripts/verify-context-scout.mjs`;
   - `node scripts/validate-projects-brain.mjs`.
3. If checks pass, merge the docs cleanup and update metrics from `PR-reported run` to raw validation evidence only if command output is captured.
4. Reconcile PR #92:
   - if its validator ID drift fix is already fully covered by main/PR #95, close it as superseded or mark blocked/stale;
   - if it contains still-needed hunks, salvage only those hunks onto fresh `main` via a new PR.
5. Decide the next harness layer:
   - structural validation is now present;
   - behavior replay still is not present;
   - add a minimal behavior replay runner only if it can test outputs without product/provider mutation.
6. Do not promote behavior rules such as provider/live false-success blocking, Daily Improve strategic portfolio, or Morning `APPLIED_UPGRADE` until a behavior replay runner or real prevention evidence exists.

Needs verification:
- Connector-only Evening Review can update docs and PRs, but cannot provide local Node output.
- PR #95 verification is PR-reported evidence, not raw command output in this review.
- Replay/prompt-regression cases remain candidates until a runner executes them or an automation report shows the gate changed behavior.
- No provider config, secrets, product code, auth/payment, deploy, or finance data should be touched from Morning Upgrade.

## Closed / consumed items

### 2026-07-07 — run upgraded validator and decide next replay layer

Superseded by the queue item above.

Reason: PR #95 reports the validator commands ran after this handoff was written, so the next structural task is evidence propagation and stale PR reconciliation, not simply repeating the older `not run` handoff wording.

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
