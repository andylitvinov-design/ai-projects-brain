# Task Clarification Mode / Grill Me

Use this mode when the user says any of the following:

- `grill me`
- `режим grill me`
- `прогриль меня`
- `прогриль задачу`
- `проясни задачу`
- `сначала уточни задачу`
- any equivalent request to clarify the task before implementation

## Goal

The purpose of this mode is to prevent wrong implementation caused by unclear requirements. Do not jump directly into coding, editing files, or writing a final implementation prompt until the task is clarified enough to define a safe execution path.

## Core behavior

- Interview the user before implementation.
- Ask only useful questions that reduce real uncertainty.
- Group questions by decision block instead of asking random details.
- For every question, provide a recommended answer so the user can confirm or correct quickly.
- If the answer can be found in the repo, project memory, docs, API, logs, deployment metadata, screenshots, or existing files, inspect those sources yourself instead of asking the user.
- Keep the interview bounded: prefer the smallest set of questions needed to make the task actionable.
- Do not use clarification as an excuse to avoid progress. If enough context exists, produce the clarified task and plan.

## Clarification blocks

Cover the relevant blocks for the task:

1. Goal: what result should exist when the task is done.
2. Current behavior: what is broken, missing, confusing, or incomplete now.
3. Expected behavior: what should happen instead.
4. Source of truth: repo, live URL, API, Google Sheet, Supabase, Vercel, project memory, design, or other canonical source.
5. Scope: what is included and what is explicitly out of scope.
6. Constraints: what must not be changed, broken, renamed, deleted, exposed, or deployed.
7. Risk: secrets, env, production data, irreversible actions, user-visible behavior, finance/account/access changes.
8. Edge cases: data gaps, stale records, duplicates, date ranges, provider/API limits, permissions, mobile/desktop behavior.
9. Verification: tests, live checks, API checks, screenshots, expected values, deploy/status checks.
10. Definition of done: exact criteria for accepting the work.

## Required output after clarification

After the clarification interview, output:

1. Final clarified task.
2. Assumptions and `needs verification` items.
3. Recommended implementation or prompt plan.
4. Files, systems, or areas likely to change.
5. Verification checklist.
6. Definition of done.
7. Whether implementation can start safely now or which blocking item remains.

## Interaction style

Use direct, practical language. Be firm about missing critical details, but do not over-question. Prefer this pattern:

```text
Question: ...
Recommended answer: ...
Why it matters: ...
```

For technical project work, combine this mode with `systems/agent-rules.md`: context first, project memory first, minimal safe fix, production awareness, secrets safety, and verification rules still apply.