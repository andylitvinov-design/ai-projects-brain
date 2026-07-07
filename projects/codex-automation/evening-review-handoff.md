# Evening Architecture Review Handoff

Last updated: 2026-07-06

## Evidence reviewed

- `projects/codex-automation/automation-prompt-registry.json` now records the automation role model and requires Evening Review to check whether `scripts/validate-agentic-prompts.mjs` prevents prompt/regression/replay/metrics drift.
- `projects/codex-automation/AGENT_ROLES.md` defines Evening Architecture Review as the evening half of the Sweeper loop: analyze repeated mistakes, choose one structural issue, and prepare Morning handoff.
- `projects/codex-automation/agent-learning-metrics.md` still distinguished structural validation from behavior replay, but before this run it said validation commands run = 0.
- `projects/codex-automation/morning-handoff-queue.md` still had a queued item to run validators, but PR #95 later reported that the validator commands were run before merge.
- `scripts/validate-agentic-prompts.mjs` currently validates prompt regressions, replay cases, registry contracts, and metrics count alignment.
- `projects/codex-automation/prompt-regression-tests.json` and `failure-replay-cases.json` contain the required provider/live, Daily Improve, Morning Upgrade, and improve/upgrade boundary candidates.
- `andylitvinov-design/ai-projects-brain#95` was merged on 2026-07-06 and its verification section reports these commands: `validate-agentic-prompts`, `validate-projects-brain`, and `verify-context-scout`.
- `andylitvinov-design/ai-projects-brain#92` is still open and non-mergeable, even though PR #95 appears to have covered or superseded the validator/registry alignment problem.

## Provider/live readiness gaps found

Still routed out of Evening Review and Morning Upgrade:

1. Psihotavr provider/live proof: Supabase auth/admin persistence/live production behavior remains product/provider work and must stay under `/delivery`, `/safe`, or `/audit-ui`.
2. Finance provider-balance proof: strict `verify:finance` remains blocked by provider/manual balance source evidence and must stay under `/audit-fin`.

No product code, provider configuration, production data, deploy setting, or secret-adjacent change was executed from this review.

## Repeated patterns found

1. Evidence propagation can lag behind actual harness changes: PR #95 reports validation, while metrics/handoff still said validation was not run.
2. Stale safe-harness PRs can remain open after newer merged PRs supersede them, creating duplicate context and possible merge confusion.
3. The system still lacks a behavior replay runner. Structural validation exists, but behavior rules remain candidates until a replay runner or real prevention evidence exists.

## Selected root structural issue

The system has moved from missing feedback-loop artifacts to validation-evidence propagation drift. The highest leverage issue is now making evidence states explicit and synchronized:

```txt
not run
PR-reported run
raw validation output available
behavior replay passed
```

Without this distinction, the harness can either undercount real validation evidence or over-promote rules based on weak evidence.

## Rule lifecycle action

```txt
rule lifecycle actions:
- candidate:
  - daily-improve-strategic-portfolio-not-only-bugs
  - morning-upgrade-report-only-without-applied-upgrade
  - provider-dependent-feature-without-provider-proof
- needs_revision:
  - validation evidence wording / metrics propagation rule
  - stale PR reconciliation path for safe harness PRs
- promoted to active:
  - none; PR-reported validator execution is structural evidence, not behavior replay evidence
- deprecated/rejected:
  - none
- evidence:
  - PR #95 verification section
  - stale open PR #92 status
  - metrics/handoff mismatch before this review
```

## Replay coverage and result

Replay/prompt-regression artifacts exist and are structurally validated by `validate-agentic-prompts.mjs`, but no behavior replay runner was executed in this review.

Result:

```txt
structural validator: PR-reported run in #95
behavior replay: not run / not implemented
behavior rules: remain candidate
```

## Learning metrics

Safe update proposed:

- Update `validation commands run` from `0` to `3` with PR #95 as evidence.
- Add a distinct metric row for `validation evidence propagation fixes`.
- Keep behavior replay/pass metrics unpromoted because raw command output and behavior replay evidence are still missing.

## Safe docs changes applied

Opened a safe docs/handoff branch to update:

- `projects/codex-automation/agent-learning-metrics.md`
- `projects/codex-automation/delivery-outcome-ledger.md`
- `projects/codex-automation/morning-handoff-queue.md`
- `projects/codex-automation/evening-review-handoff.md`

No product/provider/auth/payment/data/deploy/env/secrets changed.

## Prompt regression tests

No new prompt-regression entry was added. Current issue is not a missing prompt regression; it is evidence-state propagation and stale PR reconciliation after a later merged PR.

Proposed next regression/runner layer:

- a minimal behavior replay runner that can evaluate saved prompt-regression fixtures against deterministic expected output classes, without touching product/provider state.

## Agent-ready tickets

No product/provider ticket created from this run. Existing product/provider work remains:

- Psihotavr provider/live proof: continue with `/delivery`, `/safe`, or `/audit-ui` against the product issue.
- Finance provider-balance proof: continue with `/audit-fin` against the finance issue.

Safe harness ticket for Morning:

```txt
/upgrade

Goal: close validation-evidence propagation drift after PR #95 and reconcile stale PR #92.

Source of truth:
- andylitvinov-design/ai-projects-brain#95
- andylitvinov-design/ai-projects-brain#92
- projects/codex-automation/agent-learning-metrics.md
- projects/codex-automation/morning-handoff-queue.md
- scripts/validate-agentic-prompts.mjs

Required checks from real checkout:
- node scripts/validate-agentic-prompts.mjs
- node scripts/verify-context-scout.mjs
- node scripts/validate-projects-brain.mjs

Required decisions:
- If PR #92 is superseded by main/PR #95, close or mark it stale; do not merge stale hunks blindly.
- If PR #92 contains still-needed hunks, salvage only those hunks onto fresh main.
- If current docs cleanup passes checks, merge it.
- Do not promote behavior rules until behavior replay or real prevention evidence exists.

Constraints:
- harness/docs only
- no product code
- no provider config
- no production data
- no auth/payment/deploy/env/secrets
```

## Suggested skills

```txt
suggested skills:
- existing route used: /upgrade
- secondary PR mechanics: /delivery only for stale PR reconciliation, not product work
- new skill proposed: no
```

## Validation

Not run from this connector-only review. Evidence state:

- PR #95 reports that the three validation commands ran before merge.
- This Evening Review did not receive raw command output or GitHub Actions logs.
- `fetch_commit_workflow_runs` for PR #95 head returned no workflow runs.

## Needs verification

- Raw local/CI validation output for the current main branch.
- Whether PR #92 is fully superseded by PR #95.
- Whether a behavior replay runner is now worth adding, or whether structural validation is enough for one more cycle.
- Whether live ChatGPT Automation UI prompts match the registry after role model updates.

## Single next action

Morning System Upgrade should review the docs cleanup PR from this review, rerun the three validators from checkout, and reconcile PR #92 as stale/superseded or salvage-only.
