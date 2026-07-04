# Delivery Feedback Loop

Last updated: 2026-07-04

Purpose: close the loop between user corrections, delivery outcomes, Daily Improve, Morning System Upgrade, and Evening Architecture Review.

## Loop

```txt
user signal / PR / issue / automation report
-> delivery outcome ledger
-> replay or prompt regression when repeated
-> rule lifecycle action when validated
-> Daily Improve strategic planning
-> Morning System Upgrade safe harness fix or ticket
-> Evening Architecture Review root-cause review
```

## Required artifacts

- `projects/codex-automation/delivery-outcome-ledger.md`
- `projects/codex-automation/prompt-regression-tests.json`
- `projects/codex-automation/failure-replay-cases.json`
- `projects/codex-automation/agent-learning-metrics.md`
- `systems/harness-rule-lifecycle.md`
- `systems/provider-live-readiness-gate.md`
- `systems/to-delivery-tickets.md`

## Error signals that must enter the loop

- false `STATUS: SUCCESS`;
- code merged but provider/live not proven;
- wrong repo/source/deploy mapping;
- stale or wrong-base PR reached `merged` but not production;
- repeated UI/default-state regressions;
- finance balances blocked by provider/manual source gaps;
- `/planner`, `/delivery`, `/improve`, `/upgrade`, `/save`, `/memory`, or `/handoff` behavior drift;
- user correction that repeats a known problem.

## Daily Improve role

Daily Improve is the strategic vision layer. It uses errors and trends as signals, but its output is a cross-project development plan with ready prompts, not just a bug list.

## Morning System Upgrade role

Morning System Upgrade is the safe implementation layer. It must either:

- `APPLIED_UPGRADE`: apply a safe harness/docs/registry/regression/ledger/handoff update and report validation status; or
- `NO_SAFE_UPGRADE`: prove why no safe update is possible and create exact tickets for risky/product/provider work.

A report-only morning run without one of these outcomes is a failed loop.

## Evening Architecture Review role

Evening Architecture Review chooses the root structural issue, checks whether the day's rules helped, and writes the next handoff. It should not redo Daily Improve discovery or Morning implementation.
