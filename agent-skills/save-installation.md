# Installing Agent Memory in Any Project

This guide explains how to connect the reusable memory loop to any project repo, Codex task, or Claude Code workspace.

Canonical files:

- `agent-skills/save.md`
- `agent-skills/save-runtime.md`
- `agent-skills/learn-pass.md`
- `agent-skills/memory.md`
- `agent-skills/memory-review.md`
- `templates/codex/skills/save/SKILL.md`
- `templates/codex/skills/learn-pass/SKILL.md`
- `templates/claude-code/commands/save.md`
- `templates/claude-code/commands/learn-pass.md`
- `templates/project-agent-memory/active.md`
- `templates/project-agent-memory/index-template.md`
- `templates/project-agent-memory/candidates.md`
- `templates/project-agent-memory/metrics.md`

---

## Project installation

In a project repo, create:

```txt
agent-memory/
  active.md
  index.md
  archive.md
  mistakes.md
  candidates.md
  metrics.md
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
templates/project-agent-memory/candidates.md -> agent-memory/candidates.md
templates/project-agent-memory/metrics.md -> agent-memory/metrics.md
```

Create empty topic/component/archive/mistake files if missing.

---

## Codex installation

Recommended project-local locations:

```txt
.codex/skills/save/SKILL.md
.codex/skills/learn-pass/SKILL.md
```

Codex tasks should read the project boot file, then `agent-memory/active.md` and `agent-memory/index.md`, then only scoped memory.

If `ai-projects-brain` is available, use these as canonical references:

```txt
agent-skills/save-runtime.md
agent-skills/learn-pass.md
agent-skills/memory-review.md
```

If those files are not locally available, copied `SKILL.md` files contain the minimal protocol.

---

## Claude Code installation

Recommended project-local locations:

```txt
.claude/commands/save.md
.claude/commands/learn-pass.md
```

Also add a short reference in project `CLAUDE.md`:

```md
## Agent memory router

For save/memory/review/learn-pass work, load the matching `.claude/commands/*` file and update `agent-memory/` using upsert, not append.
Do not load archive/candidates/metrics unless running `/learn-pass` or `/memory-review`.
```

---

## Boot router snippet

Add a compact router to `AGENTS.md` or equivalent:

```md
## Agent memory router

Before `/delivery`, `/audit`, `/save`, `/memory`, `/memory-review`, or `/learn-pass`:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Read only relevant topic/component files.
5. Do not load archive unless resolving conflicts or running `/memory-review`.
6. Do not load candidates/metrics unless running `/learn-pass` or `/memory-review`.
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

And report this at the end when relevant:

```md
## Applied memory
- ...

## Learning Pass
- New candidates / updated metrics / no durable lesson
```

Do not save every task automatically. Use `/learn-pass` for weak lessons and `/save` for explicit durable user-directed memory.

---

## Audit integration

Any `/audit` skill should:

```txt
1. Read active memory
2. Read relevant scoped memory
3. Check whether the issue repeats a known mistake
4. Mention repeat/conflict in the audit result
5. Add a candidate only when the lesson is reusable but not strong enough for active memory
```

---

## Compatibility rule

The memory system must rely only on plain repo files:

```txt
Markdown files
Git commits / PRs
No hidden chat memory
No proprietary database
No agent-specific storage
```

This is what makes it work across Codex, Claude Code, local terminal agents, and GitHub issue-driven tasks.

---

## Verification after installation

Run these checks in each project:

1. `/save` can create/update a durable lesson.
2. `/save` updates a similar existing lesson instead of duplicating.
3. `/save` marks conflicting old rules as `replaced`.
4. `/learn-pass` can create/update `candidates.md` and `metrics.md`.
5. `/memory-review` can merge duplicates, promote candidates, archive weak items, and keep `active.md` compact.
6. `/delivery` reads active/scoped memory before work.
7. `/delivery` reports applied memory and learning pass results after work.
8. `/audit` detects repeated known mistakes.

---

## Non-goals

This installation does not fine-tune a model.

It does not create hidden cross-project memory.

It creates a transparent, versioned, repo-local memory layer that any agent can read and update.
