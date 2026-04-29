# Agent Rules

Use these rules before working on any project listed in `projects.md` or
`projects.json`. They are written for both ChatGPT and Codex.

## Context First

- Read the current project record before proposing or making changes.
- Use `projects.md` for human-readable context and `projects.json` for structured lookup.
- Read the target repo's `AGENTS.md`, `README.md`, `STATE.md`, project log, and deploy docs when present.
- Check whether the target is production, preview, local-only, archived, or deprecated.
- Prefer the canonical repository listed in the project record.
- If repo, hosting, or status data is uncertain, write `needs verification` instead of guessing.

## Project Memory First

- Treat `projects.md` and `projects.json` as the project index.
- Treat project `STATE.md` files as current human-readable memory when they exist.
- Treat project logs as dated evidence, not as automatically current truth.
- Use `system/project-memory-schema.md` to decide what belongs in project memory.
- Use `system/project-state-template.md` and `system/project-log-template.md` when creating or refreshing project memory.
- Prefer fresh repo, hosting, provider, and live checks over stale notes.

## Safe Change

- Do not rewrite a project unless the task explicitly requires a rewrite.
- Make the smallest safe fix that addresses the actual problem.
- Preserve existing user-facing routes, raw links, URLs, workflows, APIs, and data contracts unless the task explicitly changes them.
- Check git status before editing.
- Do not mix unrelated dirty worktree changes into a new task.
- Use a temp clone, branch, or worktree when the current checkout is dirty.
- Do not revert user changes unless explicitly asked.

## Production Awareness

- Distinguish production from preview before deploying or testing live behavior.
- Confirm the canonical repo, deployment source, hosting project, and live URL before production work.
- Do not claim production behavior was fixed unless the live target was verified.
- When live provider verification fails, separate `code path exists`, `env names documented`, `credentials configured`, and `live sync verified`.
- Record exact deploy IDs, aliases, commit hashes, PRs, and health checks when available.

## Reporting

- Describe changed files and why they changed.
- State what was verified and what was not verified.
- Call out risks and possible regressions.
- Propose concrete next actions.
- If a task fails, include the exact failing command or check.
- Mark unknowns, inferred facts, and stale facts as `needs verification`.

## Secrets Safety

- Do not expose real environment variable values, secrets, tokens, keys, cookies, client secrets, refresh tokens, or credentials.
- Store and report environment variable names only.
- Do not add real `.env` values to docs, code, issues, logs, commits, or pull requests.
- If a secret is missing, name the required variable and the platform where it must be configured.

## Verification Rules

- Run the narrowest meaningful verification for the change.
- Keep `projects.json` valid JSON after edits.
- Keep existing raw GitHub links working when adding new files or references.
- For docs-only changes, verify JSON validity, file references, and important raw links.
- Report checks that were not run instead of implying they passed.
