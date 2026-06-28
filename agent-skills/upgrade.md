# /upgrade — Safe Agent Harness Upgrade Mode

`/upgrade` is the user-facing name for controlled Self-Harness improvement.

It improves the agent harness itself: prompts, command adapters, routing rules, memory schemas, validation gates, installer templates, and tool-use workflows.

Canonical related specs:

```txt
agent-skills/self-harness.md
agent-skills/upgrade-quality-rubric.md
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
Quality check -> Standards check -> Weakness mining -> Harness proposal -> Validation -> Controlled promotion -> Regression monitoring
```

---

## Quality check

Every `/upgrade` run must score current agent-system quality using:

```txt
agent-skills/upgrade-quality-rubric.md
```

Score these dimensions from 0 to 3:

```txt
Memory quality
Harness quality
Verification quality
Self-learning quality
Harness evolution quality
Current standards alignment
```

The goal is to identify what is weak before changing anything.

---

## Current standards check

When web access is available, compare local practice with current public agent-harness principles.

Use recent public research and best-practice ideas as inspiration, not as automatic authority.

Relevant principle families:

- weakness mining from execution traces;
- minimal harness proposals tied to observed failures;
- proposal validation and regression tests;
- candidate memory before active promotion;
- metrics for applied/failed rules;
- task-wise routing instead of one giant harness;
- human decision for high-risk/global changes.

If web access is unavailable, use the latest locally stored rubric and say that public standards were not refreshed.

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
2. Score current quality using `upgrade-quality-rubric.md`.
3. Compare against current public harness principles when web access is available.
4. Mine recent weaknesses from failures, missed rules, repeated corrections, and memory metrics.
5. Propose the smallest harness change that would prevent the issue.
6. Validate the proposal with a smoke test, replay, checklist, or user confirmation.
7. Apply only low-risk Markdown changes automatically.
8. For high-risk/global changes, create an issue/PR handoff or prompt instead.
9. Record the proposal and validation result.

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
- conflicts with existing instructions;
- requires code changes or live system changes.

---

## Required report

```md
## Upgrade

Quality score:
- Memory quality: 0-3
- Harness quality: 0-3
- Verification quality: 0-3
- Self-learning quality: 0-3
- Harness evolution quality: 0-3
- Current standards alignment: 0-3

Standards checked:
- ...

Weakness mined:
- ...

Harness proposal:
- ...

Validation:
- pass / fail / not run

Applied changes:
- ...

Could not fix automatically:
- ...

Improvement ideas:
- ...

Prompts for next automation/Codex:
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
