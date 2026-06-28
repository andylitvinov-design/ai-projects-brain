# Self-Harness — Safe Harness Self-Improvement Loop

This skill adds a controlled way for agents to improve their own harness: prompts, command adapters, routing rules, memory schemas, verification gates, and tool-use workflows.

It is inspired by current Self-Harness / auto-harness research, but adapted for project repos where safety and regression control matter more than raw benchmark gains.

---

## Core idea

Agent learning should not stop at project memory.

The agent should also improve the harness that controls future work.

But harness changes must be small, traceable, and validated.

---

## Loop

```txt
1. Weakness mining
2. Harness proposal
3. Proposal validation
4. Controlled promotion
5. Regression monitoring
```

---

## 1. Weakness mining

Collect failure patterns from:

- failed `/delivery` or `/audit` runs;
- false `STATUS: SUCCESS`;
- repeated user corrections;
- ignored memory rules;
- missing verification gates;
- tool-use failures;
- overgrown or contradictory instructions.

Write weak signals to:

```txt
agent-memory/candidates.md
agent-memory/metrics.md
```

Write confirmed workflow failures to:

```txt
agent-memory/topics/delivery.md
agent-memory/topics/audit.md
agent-memory/mistakes.md
```

---

## 2. Harness proposal

A harness proposal is a minimal change to one of:

```txt
AGENTS.md / CLAUDE.md router snippets
.codex/skills/*/SKILL.md
.claude/commands/*.md
agent-skills/*.md
agent-memory/index.md
verification checklists
installer templates
```

Each proposal must include:

```md
Problem:
- observed failure pattern

Minimal harness change:
- exact file and rule to change

Expected behavior change:
- what future agent should do differently

Regression risk:
- what may get worse

Validation plan:
- how to test the harness change
```

Store proposals in:

```txt
agent-memory/harness-proposals.md
```

---

## 3. Proposal validation

Do not accept a harness change only because it sounds reasonable.

Validate using at least one of:

- replay of a recent failed scenario;
- smoke test in a safe branch;
- checklist comparison before/after;
- human confirmation;
- daily Memory Optimizer review;
- `/memory-review` conflict check.

High-risk harness changes require an issue/PR and explicit review.

---

## 4. Controlled promotion

Promotion levels:

```txt
candidate -> proposed -> validated -> active -> archived/replaced
```

Rules:

- Single weak signal usually becomes candidate only.
- Repeated failure can become proposed.
- Validated proposal can update command adapters or router rules.
- High-risk changes should not be auto-applied to all projects.

---

## 5. Regression monitoring

After applying a harness change, track:

```txt
rule applied?
old failure prevented?
new failures introduced?
context size increased?
agent stopped reading instructions?
```

Use:

```txt
agent-memory/metrics.md
```

---

## Safe auto-apply policy

Can be auto-applied when all are true:

- Markdown-only harness change;
- scoped to one project or one command;
- clearly tied to a confirmed failure;
- does not change product code;
- does not weaken auth/data/deploy safety;
- does not add broad vague instructions;
- has an observable check.

Needs issue/PR or user decision when:

- affects multiple projects;
- changes deployment/auth/payment/data behavior;
- conflicts with existing project rules;
- increases context load significantly;
- changes a core command such as `/delivery` globally.

---

## Required final report

```md
## Self-Harness

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

## Relationship to existing commands

- `/save` stores user-confirmed lessons.
- `/learn-pass` mines lessons after meaningful work.
- `/memory-review` consolidates memory.
- Self-Harness upgrades the agent harness itself when repeated evidence shows the harness should change.

Self-Harness should normally run inside `/learn-pass` after a repeated workflow failure or ignored rule.
