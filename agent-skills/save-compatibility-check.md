# /save compatibility check

This document defines how to verify that `/save` works across projects, Codex, and Claude Code.

## Components

Canonical skill spec:

```txt
agent-skills/save.md
```

Runtime helper:

```txt
tools/save_memory.py
```

Project installer:

```txt
tools/install_save_memory.py
```

Smoke tests:

```txt
tests/test_save_memory.py
```

---

## What “works across all projects” means

A project is compatible when it has:

```txt
/agent-memory/active.md
/agent-memory/index.md
/agent-memory/mistakes.md
/agent-memory/archive.md
/agent-memory/topics/*.md
/agent-memory/component-notes/
```

and at least one agent entrypoint:

```txt
AGENTS.md or AGENTS.save-memory.md          # Codex / general agent adapter
.claude/commands/save.md                    # Claude Code slash command
.claude/skills/save/SKILL.md                # Claude Code skill context
```

The project does not need to redefine the whole `/save` theory. It should link back to this brain repo and store only local memory.

---

## Install into a project

From a local clone of `ai-projects-brain`:

```bash
python tools/install_save_memory.py --project-root /path/to/project
```

This is idempotent:

- existing memory files are not overwritten;
- existing `AGENTS.md` gets a marked snippet only once;
- if no `AGENTS.md` exists, `AGENTS.save-memory.md` is created;
- Claude Code command/skill files are created if missing.

---

## Runtime use

From any project root:

```bash
python /path/to/ai-projects-brain/tools/save_memory.py \
  --project-root . \
  --message "/save
ошибка: агент опять сделал длинный текст
правильно: клиентские тексты должны быть короче
область: UX / copy"
```

Expected behavior:

```txt
Saved to memory.
Action: created or updated
Files updated: /agent-memory/...
```

Weak one-time signal example:

```bash
python /path/to/ai-projects-brain/tools/save_memory.py \
  --project-root . \
  --message "сделай эту кнопку чуть выше"
```

Expected behavior:

```txt
Not saved as durable memory.
```

---

## Codex compatibility

Codex reads repository instructions through `AGENTS.md`.

The installer ensures one of these exists:

```txt
AGENTS.md with <!-- agent-memory-save:start --> snippet
AGENTS.save-memory.md companion
```

Codex-compatible behavior:

1. User says `/save ...`.
2. Codex reads AGENTS memory instruction.
3. Codex runs or follows `tools/save_memory.py`.
4. Project-local `/agent-memory` is updated.
5. Codex reports created/updated/replaced/not_saved.

Codex does not need Claude-specific files.

---

## Claude Code compatibility

Claude Code reads slash commands and skills from `.claude`.

The installer creates:

```txt
.claude/commands/save.md
.claude/skills/save/SKILL.md
```

Claude-compatible behavior:

1. User invokes `/save` in Claude Code.
2. Claude Code reads `.claude/commands/save.md`.
3. The command points to the canonical brain spec and runtime helper.
4. Claude Code updates project-local `/agent-memory`.
5. Claude Code reports created/updated/replaced/not_saved.

---

## Smoke test

Run from `ai-projects-brain` root:

```bash
python tests/test_save_memory.py
```

Expected output:

```txt
PASS test_creates_memory_tree
PASS test_weak_one_time_signal_not_saved
PASS test_upsert_updates_similar_memory
```

---

## Project rollout checklist

For each active project repo:

```bash
python /path/to/ai-projects-brain/tools/install_save_memory.py --project-root /path/to/project
python /path/to/ai-projects-brain/tools/save_memory.py --project-root /path/to/project --message "/save
правило: test save memory adapter works
область: delivery workflow" --dry-run
```

Then verify:

```txt
[ ] /agent-memory exists
[ ] AGENTS.md or AGENTS.save-memory.md exists
[ ] .claude/commands/save.md exists
[ ] .claude/skills/save/SKILL.md exists
[ ] dry-run returns created/updated/not_saved without error
```

---

## Known active projects to check first

Based on current brain/project conventions:

```txt
reiki-yggdrasil
report / psitherapy
finance
```

These should be installed first, because they use `/delivery`, `/audit`, Codex, and Claude Code workflows most actively.

---

## Important boundaries

- This does not require product UI changes.
- This does not require model fine-tuning.
- This does not store secrets.
- This should not save every task.
- Project repos store local concrete memory; `ai-projects-brain` stores the shared mechanism.
