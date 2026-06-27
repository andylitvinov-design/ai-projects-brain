# AGENTS.md

## Agent memory router

Before `/delivery`, `/audit`, `/save`, `/memory`, or `/memory-review`:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Read only relevant topic/component files.
5. Do not load archive unless resolving conflicts or running `/memory-review`.

For `/save`, use `.codex/skills/save/SKILL.md` if present.
For `/memory`, use `.codex/skills/memory/SKILL.md` if present.

Do not load the whole instruction tree by default.
