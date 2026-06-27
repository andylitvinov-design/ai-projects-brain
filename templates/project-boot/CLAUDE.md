# CLAUDE.md

## Agent memory router

Before delivery, audit, save, memory, memory-review, or learn-pass work:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Load only scoped topic/component memory.
5. Do not load archive by default.
6. Do not load candidates/metrics unless running `/learn-pass` or `/memory-review`.

For `/save`, use `.claude/commands/save.md` if present.
For `/memory`, use `.claude/commands/memory.md` if present.
For `/memory-review`, use `.claude/commands/memory-review.md` if present.
For `/learn-pass`, use `.claude/commands/learn-pass.md` if present.

Do not load the whole instruction tree by default.
