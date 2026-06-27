# Instruction Router — Access and Load Rules Without Context Bloat

This document defines a clear instruction access scheme for any project.

Goal:

```txt
instructions are easy to find
agents load what they need
agents do not overload context
rules remain maintainable
```

---

## Core model

Use a 5-layer instruction system:

```txt
Layer 0 — boot instructions
Layer 1 — command adapters
Layer 2 — active project memory
Layer 3 — scoped topic/component memory
Layer 4 — archive/history
```

Agents should load from top to bottom only as needed.

---

## Layer 0 — boot instructions

Small files that can be read at the beginning of every serious agent task.

Examples:

```txt
AGENTS.md
CLAUDE.md
.codex/skills/*/SKILL.md
.claude/commands/*.md
```

Boot instructions must be short.

They should not contain all rules.

They should tell the agent where to look.

Recommended content:

```md
## Agent memory router

For any /delivery, /audit, /save, /memory, or /memory-review task:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Load only relevant topic/component memory.
5. Do not load archive unless resolving conflicts or running /memory-review.
```

---

## Layer 1 — command adapters

Command adapters define how to handle a specific command.

Examples:

```txt
.codex/skills/save/SKILL.md
.codex/skills/memory/SKILL.md
.codex/skills/memory-review/SKILL.md
.claude/commands/save.md
.claude/commands/memory.md
.claude/commands/memory-review.md
```

These files should be loaded only when the relevant command is invoked.

Examples:

```txt
/save -> load save adapter + agent-memory active/index
/memory -> load memory adapter + active/index
/memory-review -> load memory-review adapter + active/index/topics/archive as needed
/delivery -> load delivery rules + active/index + scoped memory
/audit -> load audit rules + active/index + scoped memory
```

---

## Layer 2 — active project memory

File:

```txt
agent-memory/active.md
```

This is the only memory file that may be loaded often.

It must stay compact:

```txt
30–50 active rules maximum
```

It should contain only high-value rules that apply often.

Every active rule must include:

```txt
Apply when
Check
Failure if ignored
```

---

## Layer 3 — scoped topic/component memory

Topic files:

```txt
agent-memory/topics/delivery.md
agent-memory/topics/audit.md
agent-memory/topics/mobile.md
agent-memory/topics/ux.md
agent-memory/topics/copy.md
agent-memory/topics/auth.md
```

Component files:

```txt
agent-memory/component-notes/<Component>.md
```

Load these only when relevant.

Examples:

```txt
mobile UX task -> active.md + index.md + topics/mobile.md + topics/ux.md
copy task -> active.md + index.md + topics/copy.md
orders task -> active.md + index.md + component-notes/Orders.md if present
save task -> active.md + index.md + relevant target files
```

---

## Layer 4 — archive/history

Files:

```txt
agent-memory/archive.md
agent-memory/mistakes.md
```

Do not load by default.

Load them only when:

```txt
running /memory-review
checking if a bug is repeated
resolving conflicts
understanding why a rule exists
```

---

## Load budget

Agents should follow this approximate budget:

```txt
Always load:
- boot file
- active.md
- index.md

Usually load:
- 1–3 topic/component files

Rarely load:
- archive.md
- full mistakes.md
- all topic files
```

Hard rule:

```txt
Never load the whole instruction tree by default.
```

---

## Task scope detection

Before loading scoped memory, classify the task:

```txt
workflow: delivery | audit | save | memory | memory-review
area: UX | copy | mobile | auth | deploy | backend | data | component
component/page: optional
risk: low | medium | high
```

Then load only matching files.

---

## Instruction source of truth

Global mechanism lives in:

```txt
ai-projects-brain/agent-skills/
```

Project-specific memory lives in:

```txt
project/agent-memory/
```

Do not copy all global theory into every project.

Each project should include only:

```txt
small boot reference
local agent-memory
local command adapters when needed
```

---

## Required project files

Every active project should have:

```txt
AGENTS.md or equivalent Codex boot reference
CLAUDE.md or equivalent Claude boot reference
agent-memory/active.md
agent-memory/index.md
agent-memory/topics/
agent-memory/component-notes/
```

Command adapters are recommended:

```txt
.codex/skills/save/SKILL.md
.codex/skills/memory/SKILL.md
.codex/skills/memory-review/SKILL.md
.claude/commands/save.md
.claude/commands/memory.md
.claude/commands/memory-review.md
```

---

## Boot reference templates

### AGENTS.md snippet

```md
## Agent memory router

Before `/delivery`, `/audit`, `/save`, `/memory`, or `/memory-review`:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Identify task scope.
4. Read only relevant topic/component files.
5. Do not load archive unless resolving conflicts or running `/memory-review`.

For `/save`, use `.codex/skills/save/SKILL.md` if present.
For `/memory`, use `.codex/skills/memory/SKILL.md` if present.
For `/memory-review`, use `.codex/skills/memory-review/SKILL.md` if present.
```

### CLAUDE.md snippet

```md
## Agent memory router

Before delivery/audit/save/memory work:

1. Read `agent-memory/active.md`.
2. Read `agent-memory/index.md`.
3. Load only scoped topic/component memory.
4. Do not load archive by default.

For `/save`, use `.claude/commands/save.md` if present.
For `/memory`, use `.claude/commands/memory.md` if present.
For `/memory-review`, use `.claude/commands/memory-review.md` if present.
```

---

## Success criteria

The scheme works when:

```txt
all important instructions are discoverable
common rules live in brain
project rules live in project memory
agents load only relevant memory
active.md stays compact
archive is not loaded by default
/save writes through upsert
/memory-review prevents bloat
/delivery reports Applied memory
```
