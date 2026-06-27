# /save — Durable Agent Memory

Use this skill when the user wants to save an important lesson, correction, rule, product decision, workflow lesson, or durable preference from the current task into project memory.

Canonical brain specs:

```txt
agent-skills/save.md
agent-skills/save-runtime.md
```

## Trigger

Run this skill when the user writes:

```txt
/save
save this
занеси в память
запомни
память:
ошибка:
правило:
решение:
```

Also treat strong repeat signals as possible save candidates:

```txt
опять
снова
я уже просил
как раньше
верни как было
не надо так
всегда
никогда
во всём проекте
```

## Required behavior

1. Read `agent-skills/save-runtime.md` if available through `ai-projects-brain`, otherwise follow this file.
2. Locate or create local `./agent-memory/` in the current project.
3. Extract the durable lesson.
4. Classify it as mistake / rule / product decision / UX decision / user preference / workflow lesson / component note.
5. Assign memory type: procedural / semantic / episodic.
6. Upsert, do not append blindly.
7. Merge duplicates.
8. Mark superseded rules as `replaced`.
9. Ensure active memory has `Apply when`, `Check`, and `Failure if ignored`.
10. Report what was created / updated / merged / replaced.

## Local memory structure

Create this if missing:

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

## Save rule

`/save` is **upsert, not append**.

Search before writing:

```txt
same scope + similar lesson
same scope + contradictory lesson
same component/page
same workflow rule
same stable user preference
```

Then choose:

```txt
create / update / merge / replace / archive / candidate / not_saved
```

## Final response format

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

## Do not save

Do not save one-time small visual tweaks, temporary experiments, exact pixel changes, raw emotional reactions, or normal task requirements that do not imply a future reusable rule.
