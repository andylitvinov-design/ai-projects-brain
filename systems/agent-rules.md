# Agent Rules

Use these rules before working on any project listed in
`projects.md` or `projects.json`. They are written for both
ChatGPT and Codex.

## Shared Agent Modes

- Read and apply `systems/agent-modes.md` as the index of callable
  modes for Andrey's projects.
- Explicit user mode triggers override default autonomous behavior
  unless safety, secrets, or risky-action rules require a pause.
- If several modes are requested, combine them in this order:
  task clarification, disciplined execution, implementation or
  research, verification, then handoff/memory update.
- Available callable modes:
  - `systems/task-clarification-mode.md` for Grill Me / task
    clarification.
  - `systems/superpowers-mode.md` for disciplined context -> plan ->
    minimal change -> verification execution.
  - `systems/handoff-mode.md` for transferring state to the next
    agent/session.
  - `systems/playwright-verification-mode.md` for browser/UI checks.
  - `systems/skill-creator-mode.md` for packaging repeatable workflows
    into reusable skills.
  - `systems/recent-research-mode.md` for Last 30 Days / fresh public
    research.
- Do not make Obsidian the default memory source. The canonical project
  memory is GitHub `ai-projects-brain`. Use Obsidian only when the user
  explicitly asks to save or sync notes into a vault.

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

## Task Clarification Mode / Grill Me

- Read and apply `systems/task-clarification-mode.md` whenever the
  user asks to clarify the task before implementation, including
  phrases such as `grill me`, `режим grill me`, `прогриль меня`,
  `прогриль задачу`, `проясни задачу`, or `сначала уточни задачу`.
- In this mode, do not jump directly into coding, file edits, final
  implementation prompts, or broad plans before clarifying the goal,
  source of truth, scope, constraints, risks, verification, and
  definition of done.
- Ask only useful questions that reduce real uncertainty, group them
  by decision block, and provide a recommended answer for each
  question so the user can confirm or correct quickly.
- If the answer can be found in the repo, project memory, docs, API,
  logs, deployment metadata, screenshots, or existing files, inspect
  those sources yourself instead of asking the user.
- After clarification, output the final clarified task, assumptions and
  `needs verification` items, implementation or prompt plan, likely
  files/areas, verification checklist, and definition of done.

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

## Link Formatting

- All user-facing links must be clickable markdown links in
  the form `[descriptive label](https://example.com)`.
- Do not provide bare/raw URLs as the main link format in
  ChatGPT answers, Codex prompts, reports, PR comments,
  issue comments, project memory, or handoff notes.
- For live site, preview, screenshot, GitHub, Vercel,
  Lovable, documentation, and raw file references, always
  provide a descriptive clickable label.
- If a raw URL is needed for copy-paste, include it only as
  an additional fenced code block after the clickable link.
- Prefer live/preview/production links over internal editor
  or workspace links. Mark internal-only links clearly when
  no public/live link is available.

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
