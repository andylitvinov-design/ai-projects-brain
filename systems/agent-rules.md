# Agent Rules

Use these rules before working on any project listed in
`projects.md` or `projects.json`. They are written for both
ChatGPT and Codex.

## Thinking Quality Standard

- Read and apply `systems/agent-thinking-quality-standard.md` for
  debugging, prompt writing, Codex task management, production fixes,
  project memory updates, and quality scoring.
- The core rule is: `First prove the failing layer before patching.`
- Use the standard's scoring rubric when evaluating Codex/debugger
  quality for dashboards or post-task reviews.

## Autonomous Project Executor

- Read and apply `systems/autonomous-project-executor.md` for every
  user project listed in `projects.md`, `projects.json`, or
  `projects/<slug>/PROJECT.md`.
- Work autonomously by default: identify the project, read the
  relevant project memory, inspect the smallest useful repo context,
  and produce a concrete next action without unnecessary questions.
- If data is missing, stale, inferred, or uncertain, mark it as
  `needs verification` and continue with the safest useful plan,
  prompt, patch scope, or diagnostic result.
- Ask the user only before risky actions, especially deletion,
  secrets/env changes, merge to `main`, production deploy,
  publishing/sending external messages, financial/account/access
  changes, irreversible actions, large rewrites, or materially risky
  target selection.
- Do not ask confirmation for safe read-only or docs/planning work,
  including code analysis, bug diagnosis, Codex prompts, minimal patch
  plans, project-memory templates, dashboard logic review, and
  token-efficiency diagnostics.
- Do not ask for separate confirmation or notification before routine
  safe git/file operations needed to complete an approved task:
  creating a branch/worktree, editing/updating files, committing,
  pushing a working branch, or opening/updating a pull request. Act
  autonomously unless the action crosses a risky boundary listed above.

## Context First

- Always read project context before proposing or making
  changes.
- Read the current project record in `projects.md` first.
- If the project is listed in `projects.md`, cross-check
  `projects.json`.
- Read the target repo's `AGENTS.md`, `README.md`,
  `STATE.md` or `project-state.md`, project log, and deploy
  docs when present.
- Check whether the target is production, preview,
  local-only, archived, or deprecated.
- Prefer the canonical repository listed in the project
  record.
- If repo, hosting, production source, or status data is
  uncertain, write `needs verification` instead of guessing.

## Project Memory First

- Treat `projects.md` and `projects.json` as the project
  index.
- Treat project `STATE.md` or `project-state.md` files as
  current human-readable memory when they exist.
- Treat project logs as dated evidence, not as automatically
  current truth.
- Use `systems/project-memory-schema.md` to decide what
  belongs in project memory.
- Use `systems/project-state-template.md` and
  `systems/project-log-template.md` when creating or
  refreshing project memory.
- Prefer fresh repo, hosting, provider, and live checks over
  stale notes.

## Minimal Safe Fix

- Do not rewrite a project unless the task explicitly
  requires it.
- Do not do large rewrites without a clear reason.
- Make the smallest safe fix that addresses the actual
  problem.
- Preserve existing user-facing routes, accepted UX,
  business logic, APIs, data contracts, raw links, and
  deployment targets unless the task explicitly changes
  them.
- Check git status before editing.
- Do not mix unrelated dirty worktree changes into a new
  task.
- Use a temp clone, branch, or worktree when the current
  checkout is dirty.
- Do not revert user changes unless explicitly asked.

## Production Awareness

- Distinguish production from preview before deploying or
  testing live behavior.
- Confirm the canonical repo, deployment source, hosting
  project, and live URL before production work.
- Do not use old or deprecated repos as the production
  source unless explicitly verified.
- Do not claim production behavior was fixed unless the live
  target was verified.
- When live provider verification fails, separate
  `code path exists`, `env names documented`,
  `credentials configured`, and `live sync verified`.
- Record exact deploy IDs, aliases, commit hashes, PRs, and
  health checks when available.

## Secrets Safety

- Do not expose real environment variable values, secrets,
  tokens, keys, cookies, client secrets, refresh tokens, or
  credentials.
- Store and report environment variable names only.
- Do not add real `.env` values to docs, code, issues, logs,
  commits, or pull requests.
- If a secret is missing, name the required variable and the
  platform where it must be configured.

## Verification Rules

- Run the narrowest meaningful verification for the change.
- Keep `projects.json` valid JSON after edits.
- Keep existing raw GitHub links working when adding new
  files or references.
- For docs-only changes, verify JSON validity, file
  references, and important raw links.
- Report checks that were not run instead of implying they
  passed.
- Codex must not finish project work without checking
  whether `STATE.md` or `LOG.md` need updates.

## Reporting Format

- For Codex, always report:
  - studied code or docs
  - minimal safe fix
  - checks run
  - risks
  - changed files
- Describe changed files and why they changed.
- State what was verified and what was not verified.
- Call out risks and possible regressions.
- Propose concrete next actions.
- If a task fails, include the exact failing command or
  check.
- Mark unknowns, inferred facts, and stale facts as
  `needs verification`.

## When to ask questions

- Ask a question only when the target project, production
  source, or requested action cannot be determined safely
  from context.
- Ask when two or more repos or live targets are plausible
  and the risk of choosing wrong is material.
- Ask when a required credential, environment, or external
  access check cannot be inferred or verified safely.
- Ask before risky actions listed in `systems/autonomous-project-executor.md`.
- Otherwise make the safest reasonable assumption, act, and
  state that it still may `needs verification`.

## When to mark `needs verification`

- Mark `needs verification` when data is missing, inferred,
  stale, or not confirmed in the current turn.
- Mark `needs verification` for uncertain repo mappings,
  hosting mappings, production sources, live URLs, auth
  state, deploy state, env completeness, or external
  provider health.
- Prefer explicit uncertainty over accidental false
  certainty.
