# /upgrade — Safe Agent Harness Upgrade Mode

`/upgrade` is the user-facing name for controlled Self-Harness improvement.

It improves the agent harness itself: prompts, command adapters, routing rules, memory schemas, validation gates, installer templates, tool-use workflows, and project readiness. It may also run a project-level upgrade sweep: find weak points across active projects, apply safe non-product fixes, and create precise handoffs for product-code or risky work.

Canonical related specs:

```txt
agent-skills/self-harness.md
agent-skills/upgrade-quality-rubric.md
agent-skills/upgrade-daily-protocol.md
```

---

## Purpose

Use `/upgrade` when the agent system or project operating loop needs improvement.

Examples:

- repeated delivery/audit failures;
- ignored memory rules;
- false `STATUS: SUCCESS`;
- missing verification gates;
- bad command behavior;
- overgrown or contradictory instructions;
- weak routing between ChatGPT, Codex, Claude Code, and project memory;
- missing Claude Code or Codex slash-command adapters in active projects;
- weak orchestration for frontier models such as Fable;
- active projects accumulating repeated bugs, stale PRs, missing verification docs, unclear repo/live mapping, or missing delivery handoffs.

---

## Core Loop

```txt
Quality check -> Project upgrade sweep -> Standards check -> Weakness mining -> Safe auto-fix or handoff -> Validation -> Controlled promotion -> Regression monitoring
```

---

## Required Behavior

1. Read relevant memory:
   - `agent-memory/active.md`
   - `agent-memory/index.md`
   - `agent-memory/candidates.md`
   - `agent-memory/metrics.md`
   - `agent-memory/harness-proposals.md`
   - `agent-memory/harness-regression-tests.md`
2. Score current quality using `upgrade-quality-rubric.md`.
3. Check operational indicators from `upgrade-daily-protocol.md`.
4. Compare against current public harness principles when web access is available.
5. Mine recent weaknesses from failures, missed rules, repeated corrections, and memory metrics.
6. Propose the smallest harness change that would prevent the issue.
7. Validate the proposal with a smoke test, replay, checklist, or user confirmation.
8. Apply only low-risk Markdown changes automatically.
9. For high-risk/global/product-code changes, create an issue/PR handoff or prompt instead.
10. Record proposal and validation result.
11. Verify slash-command rollout for active projects.
12. When using Fable or another frontier orchestrator, read and update `lessons/fable-agent-lessons.md` with 1-3 short lessons.
13. Run the Project Upgrade Sweep when the task asks to improve projects broadly or when this is a daily Morning System Upgrade.

---

## Project Upgrade Sweep

Use this layer to make `/upgrade` a practical quality loop across projects, not only a command-memory cleanup.

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

Check each active confirmed project for:

```txt
repo/live/source mapping confidence
missing /upgrade adapters
missing or stale project memory docs
open/stale/wrong-base PR patterns
recent repeated user pain
missing verification commands
missing live/deploy proof rules
UI/default-state regression risks
finance/data/payment/auth risks
agent readiness for /delivery, /audit, /safe, /audit-ui, /audit-fin
```

Score each project 0-3:

```txt
Live confidence
Delivery confidence
Data/payment risk control
UX regression control
Agent readiness
```

Scoring convention:

- `0` = blocked/unknown/high-risk;
- `1` = partial or stale;
- `2` = usable but has gaps;
- `3` = current, verified, and ready.

For each project, choose at most one highest-leverage action.

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

## Project Rollout Check

Every daily `/upgrade` or Morning System Upgrade must check active projects from `projects.md` / `projects.json`:

```txt
.claude/commands/upgrade.md
.codex/skills/upgrade/SKILL.md
agent-memory/harness-proposals.md
agent-memory/harness-regression-tests.md
lessons/fable-agent-lessons.md
```

If a canonical local checkout is available and safe to touch, run:

```sh
BRAIN_DIR=/path/to/ai-projects-brain PROJECT_DIR=/path/to/project bash /path/to/ai-projects-brain/tools/install-save-memory.sh
```

Do not install into temporary worktrees, dirty unrelated checkouts, unknown repo mappings, or projects where the canonical repo is `needs verification`.

---

## Fable Orchestrator Mode

Use this when the strongest available model should coordinate the work instead of editing directly.

Fable's role:

- choose the highest-leverage project/problem;
- read only the necessary project memory and current evidence;
- define acceptance criteria and verification gates;
- delegate mechanical implementation to Codex or Claude Code;
- require tool-backed proof before status claims;
- synthesize results into a short next action;
- write 1-3 lessons to `lessons/fable-agent-lessons.md`.

Default task split:

```txt
Fable: orchestrate, decide, verify, synthesize.
Codex: code edits, tests, PRs, deploy checks.
Claude Code: local repo diagnosis, narrow fixes, command-specific harness checks.
Sonnet/cheaper model: repetitive summaries, file inventory, mechanical formatting.
```

Master prompt:

```md
/upgrade

You are the frontier orchestrator for this project. Find the highest-leverage weakness in the project/agent loop, delegate implementation safely, verify with tool evidence, and leave durable lessons.

Rules:
- Read project memory first: AGENTS.md, CLAUDE.md, agent-memory/active.md, and only needed topic files.
- Check `.claude/commands/upgrade.md` and `.codex/skills/upgrade/SKILL.md`; if missing, install or produce an exact handoff.
- Before reporting status, verify every factual claim against tool output. If not verified, say `needs verification`.
- Do not change product code during `/upgrade` unless explicitly requested. For product-code fixes, create a `/delivery` handoff.
- Use Ponytail Gate before proposing new code or rules.
- Update `lessons/fable-agent-lessons.md` with 1-3 short lessons.

Deliver:
1. Weakness found
2. Smallest harness fix or handoff
3. Verification evidence
4. Lessons added
5. Next project/action
```

Project sweep master prompt:

```md
/upgrade

Run Project Upgrade Sweep across active projects. Use project memory as source of truth.

Goals:
- find the top project/harness weaknesses;
- safely auto-fix only docs, adapters, memory, runbooks, checklists, and missing command wiring;
- for product-code/risky work, produce exact `/delivery`, `/audit-fin`, `/audit-ui`, `/safe`, or Claude Code handoff prompts;
- choose one highest-leverage next action per project and one overall next action.

Score each project 0-3: Live confidence, Delivery confidence, Data/payment risk control, UX regression control, Agent readiness.

Before reporting, verify every factual claim with tool output or mark it `needs verification`.

Update `lessons/fable-agent-lessons.md` with 1-3 lessons if a frontier orchestrator is used.
```

---

## Required Report

```md
## Upgrade

Quality score:
- Memory quality: 0-3
- Harness quality: 0-3
- Verification quality: 0-3
- Self-learning quality: 0-3
- Harness evolution quality: 0-3
- Current standards alignment: 0-3

Operational indicators:
- false success count:
- ignored memory count:
- repeated correction count:
- blocked pattern count:
- unreviewed candidates:
- unvalidated harness proposals:

Project sweep:
- projects checked:
- scores:
- safe auto-fixes:
- handoff prompts created:
- single next action:

Validation:
- pass / fail / not run

Applied changes:
- ...

Could not fix automatically:
- ...

Regression risk:
- ...

Next check:
- ...
```

---

## Relationship To Other Commands

- `/save` saves user-confirmed lessons.
- `/learn-pass` turns task experience into candidates and metrics.
- `/memory-review` compacts and promotes memory.
- `/upgrade` improves the harness that controls future agent behavior.
