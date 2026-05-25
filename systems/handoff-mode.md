# Handoff Mode

Use this mode when the user says:

- `сделай handoff`
- `подготовь handoff`
- `передай следующему агенту`
- `обнови HANDOFF.md`
- `чтобы новый агент продолжил без пересказа переписки`

## Purpose

Handoff Mode preserves the working state between sessions and agents. The next agent should be able to continue without reading the entire chat.

## What to capture

Capture only useful operational knowledge:

1. Goal: what the task is trying to achieve.
2. Current status: what is done now.
3. Decisions made: important choices and why.
4. Changed files or areas.
5. Verified checks and results.
6. Known problems, blockers, risks, and `needs verification` items.
7. Source of truth: repo, live URL, API, sheet, Supabase, Vercel, docs, screenshots.
8. Next steps: the exact next action for the following agent.

## Rules

- Be concise and concrete.
- Do not include secrets or real env values.
- Do not paste noisy logs unless a specific error is important.
- Separate facts from assumptions.
- Prefer links to canonical files, PRs, commits, deploys, and endpoints.
- If updating a repo file, prefer `HANDOFF.md`, `STATE.md`, or `LOG.md` according to project conventions.
- If no file update is requested or available, output a copyable handoff block in the final response.

## Output template

```md
# HANDOFF

## Goal

## Current Status

## Decisions

## Changed Files / Areas

## Verification

## Risks / Needs Verification

## Source of Truth

## Next Steps
```

## Default prompt snippet

```text
Use Handoff Mode.
Summarize the task so the next agent can continue without reading the full chat.
Include goal, current status, decisions, changed files, verification, risks, source of truth, and next steps.
Do not include secrets.
```