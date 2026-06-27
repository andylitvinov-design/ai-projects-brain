# Agent Memory Rollout Control

This file defines how to roll out the instruction router and agent memory system across projects.

The goal is to avoid a situation where the brain kit exists but active projects do not actually load it.

---

## Rollout principle

Each project must have a small boot router, local memory, and self-learning support.

Minimum installed project state:

```txt
AGENTS.md or Codex boot reference
CLAUDE.md or Claude Code boot reference
agent-memory/active.md
agent-memory/index.md
agent-memory/topics/
agent-memory/component-notes/
agent-memory/candidates.md
agent-memory/metrics.md
.codex/skills/save/SKILL.md
.codex/skills/learn-pass/SKILL.md
.claude/commands/save.md
.claude/commands/learn-pass.md
```

Recommended full state:

```txt
.codex/skills/memory/SKILL.md
.codex/skills/memory-review/SKILL.md
.claude/commands/memory.md
.claude/commands/memory-review.md
```

---

## Installation command

From a project root:

```bash
BRAIN_DIR=../ai-projects-brain bash ../ai-projects-brain/tools/install-save-memory.sh
```

If the project already has `AGENTS.md` or `CLAUDE.md`, the installer must not overwrite it. Merge the router snippet manually.

---

## Project verification checklist

For each project:

- [ ] `AGENTS.md` exists or equivalent Codex boot reference exists.
- [ ] `CLAUDE.md` exists or equivalent Claude boot reference exists.
- [ ] Boot reference tells agents to read `agent-memory/active.md` and `agent-memory/index.md`.
- [ ] Boot reference tells agents to load only relevant topic/component memory.
- [ ] Boot reference tells agents not to load candidates/metrics except during `/learn-pass` or `/memory-review`.
- [ ] `agent-memory/active.md` exists.
- [ ] `agent-memory/index.md` exists.
- [ ] `agent-memory/topics/` exists.
- [ ] `agent-memory/component-notes/` exists.
- [ ] `agent-memory/candidates.md` exists.
- [ ] `agent-memory/metrics.md` exists.
- [ ] `.codex/skills/save/SKILL.md` exists.
- [ ] `.codex/skills/learn-pass/SKILL.md` exists.
- [ ] `.claude/commands/save.md` exists.
- [ ] `.claude/commands/learn-pass.md` exists.
- [ ] `/save` is treated as upsert, not append.
- [ ] `/learn-pass` creates candidates/metrics instead of polluting active memory.
- [ ] `/delivery` reports `Applied memory` and `Learning Pass` when relevant.
- [ ] `/audit` checks repeated known mistakes when relevant.

---

## Functional smoke tests

Run in a safe branch:

1. `/memory` should show active memory without loading archive.
2. `/save` should create or update a durable rule.
3. Repeating the same `/save` with similar wording should update the existing rule, not duplicate it.
4. `/learn-pass` should create or update a candidate/metric after meaningful work.
5. `/memory-review` should identify duplicates/conflicts and keep `active.md` compact.
6. `/delivery` should mention `Applied memory` and `Learning Pass` in the final report when relevant.

---

## Active project rollout table

Update this table during rollout.

| Project | Boot router | agent-memory | Self-learning files | Codex adapters | Claude adapters | Smoke tested | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| ai-projects-brain | yes | partial | yes | templates | templates | partial | canonical source |
| reiki-yggdrasil | partial | yes | yes | yes | yes | pending | AGENTS merge pending |
| report | partial | yes | yes | yes | yes | pending | AGENTS merge pending |
| finance | partial | yes | yes | yes | yes | pending | boot smoke pending |
| codex-links | partial | yes | yes | yes | yes | pending | boot smoke pending |
| active-projects-ops | partial | yes | yes | yes | yes | pending | boot smoke pending |

---

## Completion criteria

Rollout is complete for a project when:

```txt
agent can discover instructions
agent does not load the whole tree
/save works as upsert
/learn-pass creates candidates/metrics
/memory can inspect active memory
/memory-review can compact memory
/delivery and /audit use scoped memory
```

---

## Do not

- Do not copy all brain docs into every project.
- Do not overwrite project-specific AGENTS.md / CLAUDE.md.
- Do not load archive/candidates/metrics by default.
- Do not treat raw chat logs as active memory.
- Do not keep contradictory active rules.
