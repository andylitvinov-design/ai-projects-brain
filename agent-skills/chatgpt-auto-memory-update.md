# ChatGPT Auto Memory Update

## Purpose

When a user reports that an agent made a repeatable error, ChatGPT should update project memory without waiting for an explicit `/save`.

This closes the gap between manual `/save` and real self-learning.

## Trigger

Run this rule when the user says that something was wrong, repeated, not applied, or should have been remembered.

Examples:

- user reports a regression;
- user says the agent already had a rule but ignored it;
- user says memory should have been updated automatically;
- user points to a false success or missed verification;
- user reports that a post-task error happened.

## Behavior

1. Identify the project or repo from the conversation.
2. Decide whether the lesson is reusable.
3. If reusable, update project memory immediately when tools allow it.
4. Prefer scoped memory files over `active.md`:
   - concrete failure -> `agent-memory/mistakes.md`;
   - workflow rule -> `agent-memory/topics/delivery.md` or `agent-memory/topics/audit.md`;
   - UX/product rule -> relevant topic/component file;
   - weaker lesson -> `agent-memory/candidates.md`;
   - rule performance issue -> `agent-memory/metrics.md`.
5. Use upsert: merge or replace similar memory instead of duplicating it.
6. If writing is not possible, provide a patch-ready memory update and state that it was not written.

## Required response section

After an automatic update, include:

```md
## Auto memory update

Detected lesson:
- ...

Files updated:
- ...

Future rule:
- ...

Still needs:
- ...
```

## Do not

- Do not wait for `/save` when the user clearly reports a reusable error.
- Do not claim memory was updated unless a file was actually changed.
- Do not write one-time task details into active memory.
- Do not load archive/candidates/metrics by default outside memory work.

## Relation to commands

- `/save` = explicit user-directed memory save.
- `/learn-pass` = agent reflection after meaningful work.
- This rule = automatic memory update when the user reports a reusable error in chat.
