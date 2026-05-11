# Token-Efficient AGENTS.md Template

Use this template for repo-level `AGENTS.md` files.
Target length: 200 lines or less.
Do not duplicate long project memory here; link to it.

```md
# AGENTS.md — <project name>

## Role

Codex works as a minimal safe project executor for this repo.

## Start here

1. Read this `AGENTS.md`.
2. Read `CODEX_BRIEF.md` if present.
3. Read `STATE.md` if present.
4. Read `LOG.md` only if recent history matters.
5. Open exact files for the task.

Do not start with a full repo scan.

## Project boundary

- Canonical repo: <owner/name>
- Live URL: <url / not applicable>
- Hosting: <platform>
- Production source: <branch/project>
- Deprecated or reference-only repos: <list>

If repo/live mapping is uncertain, mark `needs verification` before production work.

## Context budget

- Tiny task: brief + exact file.
- Small task: brief + state/log + exact files/tests.
- Medium task: add system/data/risk docs when relevant.
- Large task: broader memory allowed, but summarize before expanding again.

## Safety

- Do not expose secrets or env values.
- Use env variable names only.
- Do not delete, deploy, merge to `main`, change env/secrets, or publish externally unless explicitly allowed.
- Do not revert user changes unless explicitly asked.

## Implementation rules

- Minimal safe fix only.
- Preserve accepted UX, routes, APIs, data contracts, auth, and deploy targets unless the task explicitly changes them.
- Do not mix unrelated dirty worktree changes into the task.
- Use a branch/worktree for edits.

## Verification

Run the narrowest meaningful checks:

- `<command>` — for code changes
- `<command>` — for build
- `<command>` — for release/guard if relevant

Report checks not run with reason.
Do not claim live production behavior unless live target was verified.

## Reporting

Final report must include:

- studied files;
- found;
- changed;
- changed files;
- checks run;
- checks not run;
- risks / `needs verification`;
- `STATE.md` / `LOG.md` update status;
- next action.

Keep it short.

## Memory update

Before finishing, check whether `STATE.md` or `LOG.md` need updates.
If project facts changed, propose or apply the update according to task scope.
```
