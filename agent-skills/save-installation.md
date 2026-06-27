# Installing /save in Any Project

This guide explains how to connect the reusable `/save` memory loop to any project repo, Codex task, or Claude Code workspace.

Canonical files:

- `agent-skills/save.md`
- `agent-skills/save-runtime.md`
- `templates/codex/skills/save/SKILL.md`
- `templates/claude-code/commands/save.md`
- `templates/project-agent-memory/active.md`
- `templates/project-agent-memory/index-template.md`

---

## Project installation

In a project repo, create:

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

Copy:

```txt
templates/project-agent-memory/active.md -> agent-memory/active.md
templates/project-agent-memory/index-template.md -> agent-memory/index.md
```

Create empty topic files if missing.

---

## Codex installation

In repos that support Codex skills, copy:

```txt
templates/codex/skills/save/SKILL.md
```

into the repo's Codex skills location.

Recommended project-local location:

```txt
.codex/skills/save/SKILL.md
```

Codex tasks should also be instructed to read:

```txt
agent-skills/save-runtime.md
```

from `ai-projects-brain` when available.

If the runtime file is not locally available, the copied `SKILL.md` contains the minimal protocol.

---

## Claude Code installation

For Claude Code, copy:

```txt
templates/claude-code/commands/save.md
```

into the project's Claude command location:

```txt
.claude/commands/save.md
```

Also add a short reference in the project `CLAUDE.md`:

```md
## /save memory loop

When the user invokes `/save`, read `.claude/commands/save.md` and update `agent-memory/` using upsert, not append.
```

---

## Delivery integration

Any `/delivery` skill should do this before implementation:

```txt
1. Read agent-memory/active.md
2. Read agent-memory/index.md
3. Identify task scope
4. Read relevant topic/component memory only
```

And report this at the end:

```md
## Applied memory
- ...

## Possible new lessons
- ...

## Saved lessons
- ...
```

Do not save every task automatically.

Only save when explicit `/save` or strong save score exists.

---

## Audit integration

Any `/audit` skill should:

```txt
1. Read active memory
2. Read relevant scoped memory
3. Check whether the issue repeats a known mistake
4. Mention repeat/conflict in the audit result
5. Suggest /save candidate only when durable
```

---

## Compatibility rule

The `/save` system must rely only on plain repo files:

```txt
Markdown files
Git commits / PRs
No hidden chat memory
No proprietary database
No agent-specific storage
```

That is what makes it work across:

```txt
Codex
Claude Code
local terminal agents
GitHub issue-driven tasks
```

---

## Verification after installation

Run these checks in each project:

1. `/save` can create `agent-memory/` if missing.
2. `/save` can add a new durable lesson.
3. `/save` updates a similar existing lesson instead of duplicating.
4. `/save` marks conflicting old rules as `replaced`.
5. `/delivery` reads active memory before work.
6. `/delivery` reports applied memory after work.
7. `/audit` detects repeated known mistakes.
8. `/memory-review` is triggered when active memory grows too large or conflicts appear.

---

## Non-goals

This installation does not fine-tune a model.

It does not create hidden cross-project memory.

It creates a transparent, versioned, repo-local memory layer that any agent can read and update.
