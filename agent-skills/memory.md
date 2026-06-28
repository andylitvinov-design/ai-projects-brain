# /memory — Read Active Agent Memory

Use `/memory` to inspect relevant project memory without dumping every saved note.

This command is read-only.

Canonical related specs:

- `agent-skills/save.md`
- `agent-skills/save-runtime.md`
- `agent-skills/learn-pass.md`
- `agent-skills/memory-review.md`

---

## Purpose

`/memory` shows the active, relevant memory for a topic, scope, component, or workflow.

It helps users and agents verify what the system currently believes before starting work.

---

## Trigger

```txt
/memory
/memory delivery
/memory audit
/memory mobile
/memory copy
/memory auth
/memory <component-or-topic>
```

---

## Behavior

1. Locate local `agent-memory/`.
2. Read `agent-memory/active.md`.
3. Read `agent-memory/index.md`.
4. If a topic is provided, read only the relevant topic/component file.
5. Do not load `archive.md`, `candidates.md`, or `metrics.md` unless the user explicitly asks for maintenance/review context.
6. Return a short summary of active memory.

---

## Output format

```md
## Active memory: <topic>

1. Rule / decision title
   - Scope: ...
   - Check: ...

2. Rule / decision title
   - Scope: ...
   - Check: ...
```

If no topic is provided:

```md
## Active memory overview

- delivery: ...
- audit: ...
- mobile: ...
- copy: ...
- auth: ...
```

---

## Do not output

- long evidence history;
- archived rules;
- candidates unless explicitly requested;
- metrics unless explicitly requested;
- unrelated topics;
- every file in memory.

---

## Compatibility

This command works in Codex, Claude Code, and local agents because it only reads Markdown files from `agent-memory/`.
