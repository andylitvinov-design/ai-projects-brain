# /upgrade — Safe Agent Harness Upgrade Mode

`/upgrade` is the user-facing name for controlled Self-Harness improvement.

It improves the agent harness itself: prompts, command adapters, routing rules, memory schemas, validation gates, installer templates, and tool-use workflows.

Canonical related spec:

```txt
agent-skills/self-harness.md
```

---

## Purpose

Use `/upgrade` when the agent system itself needs improvement, not only project code or project memory.

Examples:

- repeated delivery/audit failures;
- ignored memory rules;
- false `STATUS: SUCCESS`;
- missing verification gates;
- bad command behavior;
- overgrown or contradictory instructions;
- weak routing between ChatGPT, Codex, Claude Code, and project memory.

---

## Core loop

```txt
Weakness mining -> Harness proposal -> Validation -> Controlled promotion -> Regression monitoring
```

---

## What /upgrade may change

Low-risk Markdown harness files only, when safe:

```txt
agent-skills/*.md
templates/codex/skills/*/SKILL.md
templates/claude-code/commands/*.md
templates/project-boot/*.md
templates/project-agent-memory/*.md
tools/install-save-memory.sh
agent-memory/harness-proposals.md
agent-memory/harness-regression-tests.md
```

Project code should not be changed by `/upgrade` unless explicitly requested.

---

## Required behavior

1. Read relevant memory:
   - `agent-memory/active.md`
   - `agent-memory/index.md`
   - `agent-memory/candidates.md`
   - `agent-memory/metrics.md`
   - `agent-memory/harness-proposals.md`
   - `agent-memory/harness-regression-tests.md`
2. Mine recent weaknesses from failures, missed rules, repeated corrections, and memory metrics.
3. Propose the smallest harness change that would prevent the issue.
4. Validate the proposal with a smoke test, replay, checklist, or user confirmation.
5. Apply only low-risk Markdown changes automatically.
6. For high-risk/global changes, create an issue/PR handoff instead.
7. Record the proposal and validation result.

---

## Safe auto-apply policy

Can auto-apply when all are true:

- Markdown-only harness change;
- scoped to one project or one command;
- tied to a confirmed failure;
- no product code changes;
- no auth/payment/data/deploy weakening;
- no broad vague instruction bloat;
- has an observable check.

Needs user decision when:

- affects many projects;
- changes core `/delivery` globally;
- changes production/deploy/auth/data behavior;
- increases context load significantly;
- conflicts with existing instructions.

---

## Required report

```md
## Upgrade

Weakness mined:
- ...

Harness proposal:
- ...

Validation:
- pass / fail / not run

Applied changes:
- ...

Regression risk:
- ...

Next check:
- ...
```

---

## Relationship to other commands

- `/save` saves user-confirmed lessons.
- `/learn-pass` turns task experience into candidates and metrics.
- `/memory-review` compacts and promotes memory.
- `/upgrade` improves the harness that controls future agent behavior.
