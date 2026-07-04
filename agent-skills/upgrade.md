# /upgrade — Safe Agent Harness Upgrade Mode

`/upgrade` is the user-facing command for controlled Self-Harness improvement.

It improves the agent harness itself: prompts, command adapters, routing rules, memory schemas, validation gates, automation registry mirrors, tool-use workflows, project readiness docs, replay cases, and prompt regressions.

It may create exact handoffs for product-code or risky work, but must not execute that work unless the user explicitly scopes `/delivery` or another implementation command.

Canonical related specs:

```txt
systems/active-skill-map.md
systems/provider-live-readiness-gate.md
systems/harness-rule-lifecycle.md
systems/delivery-feedback-loop.md
agent-skills/upgrade-quality-rubric.md
agent-skills/upgrade-daily-protocol.md
projects/codex-automation/automation-prompt-registry.json
projects/codex-automation/delivery-outcome-ledger.md
projects/codex-automation/prompt-regression-tests.json
projects/codex-automation/failure-replay-cases.json
projects/codex-automation/agent-learning-metrics.md
```

---

## Purpose

Use `/upgrade` when the agent system or project operating loop needs improvement.

Examples:

- repeated delivery/audit failures;
- ignored memory rules;
- false `STATUS: SUCCESS`;
- code merged but provider/live readiness remains unproven;
- missing verification gates;
- bad command behavior;
- overgrown or contradictory instructions;
- weak routing between ChatGPT, Codex, Claude Code, and project memory;
- active projects accumulating repeated bugs, stale PRs, missing verification docs, unclear repo/live mapping, or missing delivery handoffs.

---

## Command Boundary

Use `systems/active-skill-map.md` before adding, renaming, or advertising modes.

```txt
/improve = read-only strategic discovery and ready prompts
/upgrade = safe harness/docs/memory/registry/regression implementation
/save    = durable reusable rule or lesson
/memory  = secondary read-only lookup
/handoff = operational continuation state
```

Do not create a new top-level skill when the behavior can be integrated into an existing command plus an internal guardrail.

---

## Core Loop

```txt
Read handoffs -> Check provider/live risk -> Check rule lifecycle -> Apply safe harness fix or create ticket -> Update ledger/regression/replay/metrics -> Validate or state not-run reason -> Report APPLIED_UPGRADE / NO_SAFE_UPGRADE
```

---

## Required Behavior

1. Read `projects/codex-automation/morning-handoff-queue.md` first when running Morning System Upgrade.
2. Read `projects/codex-automation/evening-review-handoff.md` second.
3. Read `systems/active-skill-map.md` before changing command visibility or skill language.
4. Read `systems/provider-live-readiness-gate.md` before changing delivery/audit/PR/automation prompts.
5. Read `systems/harness-rule-lifecycle.md` before promoting or changing durable rules.
6. Read `projects/codex-automation/agent-learning-metrics.md`, `failure-replay-cases.json`, and `prompt-regression-tests.json` before changing prompt gates.
7. Mine recent weaknesses from failures, missed rules, repeated corrections, provider/live blockers, and memory metrics.
8. Propose the smallest harness change that would prevent the issue.
9. Validate the proposal with a smoke test, replay, checklist, or user confirmation when available.
10. Apply only low-risk Markdown/docs/registry/regression/handoff changes automatically.
11. For product-code, provider, data, auth/payment, deploy, production workflow permissions, or secret-adjacent changes, create an issue/PR handoff or prompt instead.
12. Record proposal and validation result.
13. Finish Morning System Upgrade with `APPLIED_UPGRADE` or `NO_SAFE_UPGRADE`.

---

## Provider / Live Readiness Rule

Code path proof is not provider/live proof.

For provider-dependent work, reports must separate:

```txt
code path exists
provider configured
schema/storage/data present
production deploy source proven
live behavior verified
```

If any required layer is missing, final project status is `BLOCKED`, `PARTIAL`, or `NEEDS_VERIFICATION`, not `SUCCESS`.

---

## Safe Auto-Fix Lane

Allowed safe auto-fixes:

```txt
AGENTS.md / CLAUDE.md router installation when missing
.claude/commands/* adapters
.codex/skills/* adapters
agent-memory/* templates and missing fields
lessons/fable-agent-lessons.md
SAFE.md / SYSTEM_MAP.md / CHECKS.md skeletons when project memory confirms facts
runbook/report schema fixes
automation registry mirrors
feedback-loop ledger / metrics / replay / regression scaffolds
exact /delivery, /audit-fin, /audit-ui, or /safe prompts
GitHub issue/PR body drafts for risky changes
```

Do not auto-fix product code, auth/payment/data logic, migrations, deploy settings, secrets, provider configuration, or production workflow permissions inside `/upgrade`.

---

## Handoff Lane

Use precise handoffs for risky/product work:

- `/delivery` for product code fixes;
- `/audit-fin` for finance/accounting/data reconciliation;
- `/audit-ui` for visual UX/navigation/layout regressions;
- `/safe` for live/security/auth/payment/data-loss risks;
- Claude Code handoff for local repo diagnosis or command-specific harness checks.

Every handoff must include:

```txt
project/repo/live
goal
evidence
files/areas to inspect
non-goals
safe fix constraints
required checks
stop condition
final report format
```

---

## Project Upgrade Sweep

Use this layer only when the task asks to improve projects broadly or when a handoff requires project readiness scoring. Broad discovery belongs to `/improve`; `/upgrade` implements safe harness fixes and routes product/risky work.

Project source:

```txt
projects.md
projects.json
projects/<slug>/PROJECT.md
projects/<slug>/STATE.md when present
projects/<slug>/LOG.md when present
projects/<slug>/SYSTEM_MAP.md when present
projects/<slug>/CHECKS.md when present
projects/<slug>/CODEX_BRIEF.md when present
```

For each project, choose at most one highest-leverage action and route product/provider work out of `/upgrade`.

---

## Required Report

```md
## Upgrade

Outcome: APPLIED_UPGRADE / NO_SAFE_UPGRADE

Inputs used:
- Daily Improve:
- Evening Review:

Provider/live readiness:
- gaps:
- tickets:

Rule lifecycle:
- candidate:
- promoted active:
- needs_revision:
- deprecated/rejected:

Replay / regression / metrics:
- replay checked:
- regressions changed:
- metrics updated:

Active skill map:
- drift found:
- changes:

Safe updates applied:
- files:
- validation:

Handoffs created:
- /delivery:
- /audit-fin:
- /audit-ui:
- /safe:

Could not fix automatically:
- ...

Next check:
- ...
```
