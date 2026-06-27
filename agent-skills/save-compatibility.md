# /save Compatibility

`/save` is compatible across projects and agents when it uses only repo-local Markdown files and normal git edits.

## Shared requirements

- Memory lives in `agent-memory/`.
- Common logic lives in `ai-projects-brain`.
- Project repos store only local lessons and decisions.
- `/save` uses upsert, not append.
- Similar rules are merged.
- Conflicting rules are replaced or narrowed.
- Active rules are small, scoped, and checkable.

## Project check

Each project should have:

- `agent-memory/active.md`
- `agent-memory/index.md`
- `agent-memory/mistakes.md`
- `agent-memory/topics/`
- `agent-memory/component-notes/`

Active memory should stay under 50 rules.

Every active rule must include:

- `Apply when`
- `Check`
- `Failure if ignored`

## Codex check

Codex works with `/save` when the project has either:

- `.codex/skills/save/SKILL.md`; or
- task instructions that link to `ai-projects-brain/templates/codex/skills/save/SKILL.md`.

Codex must:

- read `agent-memory/active.md` before work;
- read scoped topic memory only when relevant;
- update memory through PR/file edits;
- report `Applied memory` after `/delivery`;
- treat `/save` as upsert.

## Claude Code check

Claude Code works with `/save` when the project has either:

- `.claude/commands/save.md`; or
- `CLAUDE.md` that links to `ai-projects-brain/templates/claude-code/commands/save.md`.

Claude Code must:

- read `agent-memory/active.md` before work;
- read scoped topic memory only when relevant;
- update memory through file edits;
- report `Applied memory` after delivery tasks;
- treat `/save` as upsert.

## Functional checks

A project passes when:

- new durable memory can be created;
- similar memory updates an existing item;
- conflicting memory replaces or narrows old active rules;
- one-time edits are not saved;
- delivery tasks report applied memory;
- audit tasks detect repeated mistakes;
- memory review prevents bloat.
