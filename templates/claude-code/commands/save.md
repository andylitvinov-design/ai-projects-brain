# /save — Durable Agent Memory

Use this command when the user wants to save an important lesson, correction, rule, product decision, workflow lesson, or durable preference from the current task into project memory.

Canonical brain specs:

```txt
agent-skills/save.md
agent-skills/save-runtime.md
```

## Trigger examples

```txt
/save
занеси в память
запомни
память:
ошибка:
правило:
решение:
```

## Runtime protocol

1. Locate the current project root.
2. Locate or create `./agent-memory/`.
3. Read:
   - `agent-memory/active.md`
   - `agent-memory/index.md`
   - relevant topic/component files
4. Extract the durable lesson from the user's message.
5. Classify the lesson:
   - mistake
   - rule
   - product_decision
   - ux_decision
   - user_preference
   - workflow_lesson
   - component_note
6. Assign memory type:
   - procedural
   - semantic
   - episodic
7. Upsert, do not append blindly.
8. Merge duplicates.
9. Replace contradictions.
10. Ensure active memory includes:
    - Apply when
    - Check
    - Failure if ignored
11. Report what was saved or why nothing was saved.

## Standard memory structure

```txt
agent-memory/
  active.md
  index.md
  archive.md
  mistakes.md
  topics/
    delivery.md
    audit.md
    mobile.md
    ux.md
    copy.md
    auth.md
  component-notes/
```

## Core behavior

`/save` is a memory governance operator:

```txt
filter -> classify -> route -> merge/replace -> verify -> prevent bloat
```

Never use `/save` as a raw transcript dump.

## Final response

```md
Saved to memory.

Action: created / updated / merged / replaced / archived / candidate / not_saved
Type: ...
Memory type: procedural / semantic / episodic
Scope: ...
Files updated:
- ...

Future agents should apply this when:
- ...

Check:
- ...
```

If the message is one-time only:

```md
Not saved as durable memory because this looks like a one-time task detail.
```
