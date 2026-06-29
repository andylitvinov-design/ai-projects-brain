# AGENTS.md

## Agent memory router

Before `/delivery`, `/audit`, `/save`, `/memory`, `/memory-review`, `/learn-pass`, or `/upgrade`:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Read only relevant topic/component files.
5. Do not load archive unless resolving conflicts or running `/memory-review`.
6. Do not load candidates/metrics/harness proposal files unless running `/learn-pass`, `/memory-review`, or `/upgrade`.

For `/save`, use `.codex/skills/save/SKILL.md` if present.
For `/memory`, use `.codex/skills/memory/SKILL.md` if present.
For `/memory-review`, use `.codex/skills/memory-review/SKILL.md` if present.
For `/learn-pass`, use `.codex/skills/learn-pass/SKILL.md` if present.
For `/upgrade`, use `.codex/skills/upgrade/SKILL.md` if present.

Do not load the whole instruction tree by default.
