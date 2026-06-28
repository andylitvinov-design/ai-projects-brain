# /upgrade — Controlled Self-Harness Upgrade Mode

`/upgrade` is the user-facing name for the Self-Harness improvement loop.

It improves the agent harness itself: prompts, command adapters, memory routing, verification gates, installer templates, and workflow rules.

It must be controlled, minimal, and validated.

---

## Purpose

Find recurring weaknesses in agent behavior and improve the harness so future agents do better without requiring the user to repeat the same correction.

---

## What counts as harness

```txt
AGENTS.md / CLAUDE.md router snippets
.codex/skills/*/SKILL.md
.claude/commands/*.md
agent-skills/*.md
agent-memory/index.md
agent-memory topic schemas
verification gates
installer templates
daily automation prompts
```

---

## Upgrade loop

```txt
1. Mine weaknesses from mistakes/candidates/metrics and recent user corrections.
2. Create or update a harness proposal.
3. Validate the proposal with a small regression check.
4. Apply only safe Markdown/routing changes directly.
5. Escalate risky/global changes to issue/PR/user decision.
6. Track the result in harness-regression-tests.md or metrics.md.
```

---

## Safe auto-apply

`/upgrade` may directly apply changes only when all are true:

- Markdown-only harness/instruction change;
- minimal and scoped;
- tied to a confirmed or repeated weakness;
- no product code changes;
- no auth, payment, data deletion, deploy, or secret-risk changes;
- observable check exists;
- context load is not meaningfully increased.

---

## Needs issue/PR/user decision

Escalate instead of applying when:

- change affects many projects globally;
- rule conflicts with existing project instructions;
- change touches auth, payments, production deploy, private data, or destructive actions;
- change increases context load significantly;
- validation cannot be run or evidence is weak.

---

## Files used

Read when relevant:

```txt
agent-memory/mistakes.md
agent-memory/candidates.md
agent-memory/metrics.md
agent-memory/harness-proposals.md
agent-memory/harness-regression-tests.md
agent-memory/topics/delivery.md
agent-memory/topics/audit.md
agent-memory/topics/learn-pass.md
```

Do not load the whole memory tree by default.

---

## Output format

```md
## /upgrade report

Weaknesses found:
- ...

Harness proposals:
- ...

Applied safely:
- ...

Needs validation / PR / user decision:
- ...

Regression checks:
- ...

Next action:
- ...
```

---

## Relationship to other modes

- `/save` stores explicit user-confirmed lessons.
- `/learn-pass` creates candidates and metrics after meaningful work.
- `/memory-review` compacts and promotes memory.
- `/upgrade` improves the harness itself when patterns show that memory/routing/commands/checks should change.
