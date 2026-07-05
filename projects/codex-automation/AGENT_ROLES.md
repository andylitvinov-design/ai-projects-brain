# Codex Automation Agent Roles

Last updated: 2026-07-05

Purpose: durable role model for recurring ChatGPT/Codex automation contracts.
This file documents existing roles and boundaries only. It does not create,
enable, disable, or verify any live ChatGPT Automation UI state.

## Role Summary

| Role | Primary ownership | Stop condition |
|---|---|---|
| Prototyper | New concepts, product hypotheses, cross-project ideas, concept cards, ready prompts | Stops after concept cards, hypotheses, and prompts. Does not execute code. |
| Grower | Portfolio development, UX, funnel, sales, strategy, ranked opportunities | Stops after ranked opportunities and ready prompts. Does not mutate product. |
| Sweeper | Repeated-error cleanup loop across evening analysis and morning safe fixes | Stops after one safe harness/docs/rules/memory fix, or `NO_SAFE_UPGRADE` with evidence. |
| Builder | Delivery execution, recovery, PR/check/live-proof completion | Stops after PR/checks/live proof or a clear blocked status with exact next prompt. |
| Maintainer | Safety, reliability, finance correctness, provider/live readiness, merge gates | Stops after audit/safety status is classified and risky work is blocked or handed off. |

## Daily Improve = Prototyper + Grower

`Daily Improve` is the Growth Lab: new ideas plus strategic project growth.
It must not collapse into only bug audit, maintainer sweep, or delivery
recovery.

### Prototyper

Tasks:

- Generate new concepts.
- Find unexpected product opportunities.
- Propose quick hypotheses.
- Connect multiple projects into product or operations ideas.
- Produce concept cards and ready prompts.

Stop condition:

- Stop after concept cards, hypotheses, and prompts.
- Do not execute code.

Must not:

- Change product code.
- Merge PRs.
- Deploy.
- Change provider, env, or secret configuration.
- Become a maintenance-only bug sweep.

### Grower

Tasks:

- Choose which ideas are worth developing.
- Improve product line, UX, sales, funnel, and strategy.
- Keep a portfolio view across active projects.
- Produce project cards and ranked opportunities.
- Create delivery-ready prompts when evidence exists.

Stop condition:

- Stop after ranked opportunities and ready prompts.
- Do not mutate product.

Must not:

- Get stuck only on one blocker.
- Lose the other active projects.
- Give broad abstract advice without a concrete next action.

## Sweeper = Morning System Upgrade + Evening Architecture Review

`Sweeper` is one two-phase cleanup loop, not a separate new automation.

### Evening Architecture Review

Evening phase:

- Analyze repeated mistakes.
- Detect false success.
- Detect AI-slop, overengineering, extra rules, and duplicate automations.
- Review delivery outcome ledger, regression tests, failure replays, and user corrections.
- Choose one highest-leverage structural issue.
- Prepare a handoff for Morning System Upgrade.

### Morning System Upgrade

Morning phase:

- Read Evening Review handoff.
- Read Daily Improve handoff.
- Apply safe markdown-only, harness, docs, prompt-regression, registry, or memory fixes.
- Update rules, registry, regression tests, or learning metrics only when evidence exists.
- Create exact handoff prompts for risky product/provider tasks.
- Do not change product code.

Stop condition:

- Stop after one safe harness/docs/rules/memory fix, or `NO_SAFE_UPGRADE` with evidence.

Must not:

- Add a separate `Sweeper` automation.
- Touch product code.
- Change provider, env, or secret configuration.
- Convert analysis into broad rewrites.

## Builder

`Builder` is the delivery execution lane.

Primary automations and modes:

- `Codex Delivery Loop`
- `/delivery`
- GitHub/Codex Cloud execution when explicitly requested
- mobile-run / workflow dispatch when the task is approved

Tasks:

- Finish concrete tasks to PR/checks/live proof.
- Find unfinished delivery work.
- Fix blocked PRs.
- Create recovery prompts.
- Execute minimal safe fixes.

Stop condition:

- Stop after PR/checks/live proof or a clear blocked status with the exact next prompt.

Must not:

- Act as the strategic vision layer.
- Do broad rewrites.
- Start product code without a concrete issue or prompt.
- Bypass CI, branch protection, provider readiness, or live proof.

## Maintainer

`Maintainer` owns safety, reliability, live/provider readiness, and finance
correctness.

Primary automations and modes:

- `PR Merge Sweep`
- `Weekly Live Safe Sweep`
- `/audit-fin`
- provider/live readiness gates
- PR safety checks

Tasks:

- Block merge without checks and required live/provider proof.
- Check finance invariants.
- Check auth, persistence, admin, uploads, payment, and data risks.
- Detect production regressions.
- Create exact repair prompts.

Stop condition:

- Stop after audit/safety status is classified and risky work is blocked or handed off.

Must not:

- Turn audit into a product rewrite.
- Assert success without required proof.
- Change provider, env, or secret configuration.
- Make unsafe financial mutations.

## Automation To Role Map

This table records the durable role contract. It is not proof that the live
ChatGPT Automation UI currently has these exact prompts or schedules.

| Automation / Mode | Primary Role | Secondary Role | Notes |
|---|---|---|---|
| `Daily Improve` / `Daily Improve Sweep` | `Prototyper` | `Grower` | Growth Lab: ideas plus strategic project development. |
| `Morning System Upgrade` | `Sweeper` | `Maintainer` | Applies safe harness/docs/rules fixes. |
| `Evening Architecture Review` | `Sweeper` | `Maintainer` | Finds repeated failures and root structural issues. |
| `PR Merge Sweep` | `Maintainer` | `Builder` | Safe PR merge/recovery only with checks and readiness proof. |
| `Codex Delivery Loop` | `Builder` | `Maintainer` | Unfinished delivery recovery. |
| `Weekly Live Safe Sweep` | `Maintainer` | `Sweeper` | Weekly live/public safety and UX pass. |
| `/audit-fin` | `Maintainer` | `Sweeper` | Finance correctness and deterministic repair prompts. |

## Schedule Consistency Note

`SYSTEM_MAP.md` and `CHATGPT_AUTOMATIONS_RUNBOOK.md` should use the same
documented scheduler expectations for shared automation names. Actual enabled
state, prompt text, `last_run_time`, and `next_run_time` remain
`needs verification` unless checked in ChatGPT Automations metadata.
