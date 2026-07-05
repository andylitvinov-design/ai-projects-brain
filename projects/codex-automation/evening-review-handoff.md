# Evening Architecture Review Handoff

Last updated: 2026-07-05

## Evidence reviewed

- `projects/codex-automation/automation-prompt-registry.json` defines Evening Review as root-cause/rule-lifecycle work and explicitly requires checking whether `scripts/validate-agentic-prompts.mjs` prevents prompt/regression/replay drift.
- `scripts/validate-agentic-prompts.mjs` now reads prompt regressions, replay cases, and automation contracts, but the file contained a self-contract mismatch: it required `morning-upgrade-report-only-without-applied-upgrade` to exist in both prompt regressions and replay cases, while the prompt regression used `morning-upgrade-must-apply-or-prove-no-safe-upgrade`.
- `projects/codex-automation/failure-replay-cases.json` contains replay case `morning-upgrade-report-only-without-applied-upgrade`.
- `projects/codex-automation/prompt-regression-tests.json` contained the same behavior but under a different ID before this review's PR.
- `projects/codex-automation/agent-learning-metrics.md` says the validator is defined, but validation commands are still not run from a checkout.
- `projects/codex-automation/delivery-outcome-ledger.md` records the 2026-07-05 validator addition and now records this validator ID drift as an evidence-backed harness issue.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, auth/payment, billing, env value, or secret-adjacent change was executed from this review.

## Repeated patterns found

1. The harness now creates feedback-loop artifacts quickly, but the validator/registry/replay layer can still drift internally before a local runner catches it.
2. A previous report risk appeared again in smaller form: a tool claimed validator coverage existed, but connector-only runs still did not execute the validator and the validator would likely fail because of ID drift.
3. The system needs a distinction between `validator defined`, `validator internally consistent`, and `validator executed/passed`; currently metrics can make this sound more mature than the evidence supports.

## Selected root structural issue

The root structural issue is not missing rules anymore; it is evidence maturity drift. The system can define a validator and count it as a feedback-loop improvement before proving the validator itself is internally aligned and executable from checkout.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - validator-schema-coverage-defined
  - daily-improve-strategic-portfolio-not-only-bugs
  - morning-upgrade-report-only-without-applied-upgrade
- promoted to active:
  - none; no local validator pass or behavior replay evidence yet
- needs_revision:
  - validator-defined metric wording / evidence boundary, because it can sound stronger than actual pass evidence
- deprecated/rejected:
  - none
- evidence:
  - `scripts/validate-agentic-prompts.mjs` ID lookup mismatch
  - `prompt-regression-tests.json` / `failure-replay-cases.json` ID drift
  - `agent-learning-metrics.md` validation commands still at 0
```

## Replay coverage and result

Replay coverage exists for the provider/live false-success case, Daily Improve strategic-portfolio drift, Morning Upgrade report-only drift, improve/upgrade boundary drift, and save/memory/handoff confusion.

Replay result: not executed in this connector-only run. Status remains `candidate`.

Schema/contract check result: not executed, but static inspection found that `validate-agentic-prompts.mjs` would likely fail because the Morning Upgrade prompt regression ID did not match the replay/validator-required ID.

## Learning metrics

No pass/fail metrics were incremented because no local Node command was executed.

Evidence-backed update proposed/applied through PR #92 and ledger:

- keep `feedback-loop validators defined = 1` as defined only, not passed;
- keep `validation commands run = 0` until checkout execution;
- record the new signal as validator ID drift, not as validation failure, because the validator was not actually run here.

## Safe docs/harness changes made

Opened PR `andylitvinov-design/ai-projects-brain#92` with safe harness-only changes:

- aligned `projects/codex-automation/prompt-regression-tests.json` to use canonical ID `morning-upgrade-report-only-without-applied-upgrade`;
- updated `scripts/validate-agentic-prompts.mjs` to validate the canonical Morning Upgrade ID consistently;
- recorded the finding in `projects/codex-automation/delivery-outcome-ledger.md`;
- updated `projects/codex-automation/morning-handoff-queue.md` with the exact next Morning action;
- updated this handoff.

## Prompt regression tests

Updated/proposed in PR #92:

- `morning-upgrade-must-apply-or-prove-no-safe-upgrade` becomes `morning-upgrade-report-only-without-applied-upgrade` to match the replay case and required validator ID.

No new behavior class was needed; the existing behavior class was correct, but its ID drifted.

## Agent-ready tickets

No new product/provider ticket was created from this review.

Existing product/provider work remains routed out:

- Psihotavr provider/live proof: continue with `/delivery`, `/safe`, or `/audit-ui` against product/provider issue `andylitvinov-design/psihotavr#168`.
- Finance provider-balance proof: continue with `/audit-fin` against finance issue `andylitvinov-design/finance#614`.

Safe harness ticket for Morning Upgrade:

```txt
/delivery or /upgrade
Goal: review and merge/check `andylitvinov-design/ai-projects-brain#92`, then run the feedback-loop validators from a real checkout.
Source of truth: PR #92 plus `projects/codex-automation/morning-handoff-queue.md`.
Constraints: harness-only; do not touch product code, providers, data, auth/payment, deploy settings, env values, or secrets.
Required checks:
- node scripts/validate-agentic-prompts.mjs
- node scripts/verify-context-scout.mjs
- node scripts/validate-projects-brain.mjs
Final evidence: pass/fail output, merge/block status, and updated `agent-learning-metrics.md` only when evidence exists.
```

## Suggested skills

```txt
suggested skills:
- existing route used: /upgrade
- acceptable execution route: /delivery only if PR mechanics are required
- new skill proposed: no
- reason: this is harness/schema/validator alignment work inside existing upgrade/delivery routes
```

## Validation

Not run from this connector-only review. Required next commands from a real checkout:

```bash
node scripts/validate-agentic-prompts.mjs
node scripts/verify-context-scout.mjs
node scripts/validate-projects-brain.mjs
```

Static inspection result: PR #92 should remove the known ID drift, but that is not a substitute for executing the commands above.

## Needs verification

- PR #92 mergeability/check status after GitHub finishes computing it.
- Actual Node validation output from a real checkout.
- Whether `agent-learning-metrics.md` should add a separate row for `feedback-loop validators passed` after validation runs.
- Whether Daily Improve's next real run produces project strategic cards and ready prompts, not only blockers.

## Single next action

Morning System Upgrade should review PR #92, run `node scripts/validate-agentic-prompts.mjs` from a real checkout, and only then update learning metrics or promote validator schema coverage.
