# Agent Rules

Use these rules before working on any project listed in `projects.md` or `projects.json`.

## Context First

- Read the current project record before proposing or making changes.
- Check whether the target is production, preview, local-only, archived, or deprecated.
- Prefer the canonical repository listed in the project record.
- If repo, hosting, or status data is uncertain, say `needs verification` instead of guessing.

## Change Safely

- Do not rewrite a project unless the task explicitly requires a rewrite.
- Make the smallest safe fix that addresses the actual problem.
- Preserve existing user-facing routes, URLs, workflows, and data contracts unless the task explicitly changes them.
- Do not mix unrelated dirty worktree changes into a new task.
- Use a temp clone or worktree when the current checkout is dirty.

## Production Awareness

- Distinguish production from preview before deploying or testing live behavior.
- Verify required environment variable names before debugging provider failures.
- Do not expose real environment variable values, secrets, tokens, keys, cookies, or credentials.
- When live provider verification fails, separate `code path exists` from `credentials configured` and `live sync verified`.

## Reporting

- Describe changed files and why they changed.
- State what was verified and what was not verified.
- Call out risks and possible regressions.
- Propose concrete next actions.
- If a task fails, include the exact failing command or check.
