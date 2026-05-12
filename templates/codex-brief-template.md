# CODEX_BRIEF.md Template

Use this file as the fastest safe entry point for Codex. Keep it short.
Target length: 80-160 lines.

```md
# CODEX_BRIEF — <project name>

## Purpose

- What this project does in 2-4 bullets.

## Canonical repo and live target

- Repo: <owner/name>
- Live URL: <url or not applicable>
- Hosting: <Vercel / Cloudflare Pages / other>
- Production source: <branch/project/deploy source>
- Deprecated/old repos: <list or none>

## Start here

Read in this order:

1. `AGENTS.md`
2. `CODEX_BRIEF.md`
3. `STATE.md`
4. `LOG.md` only if recent history matters
5. Exact files for the task

Do not start with a full repo scan.

## Key files

- `path` — why it matters
- `path` — why it matters

## Common tasks and exact areas

- Task type: files/functions to inspect first
- Task type: files/functions to inspect first

## Verification commands

- `command` — when to run
- `command` — when to run

## Production verification

- `command/url/check` — when production behavior is claimed

## Known risks

- Risk / boundary
- Risk / boundary

## Token efficiency rules

- Start from this brief, `STATE.md`, and exact files.
- Expand to `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, or `RISKS.md` only when needed.
- Do not use browser/live checks unless production behavior or links are part of the task.
- Keep final report short: studied, found, changed, checks, risks, STATE/LOG.

## Stop condition

The task is done only when:

- minimal fix or no-change diagnosis is complete;
- checks are run or explicitly marked not run;
- changed files are listed;
- risks are listed;
- `STATE.md` / `LOG.md` update need is checked.
```
