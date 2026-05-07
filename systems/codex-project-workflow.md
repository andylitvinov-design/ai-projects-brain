# Codex Project Workflow

## 0. Use autonomous project execution by default

- Read and apply `systems/autonomous-project-executor.md` before project work.
- Work autonomously by default: do not ask unnecessary questions before
  safe read-only, docs, planning, diagnosis, or minimal patch-scope work.
- If information is missing or uncertain, mark it as `needs verification`
  and continue with the safest useful next action.
- Ask the user only before risky actions such as deletion, secrets/env
  changes, merge to `main`, production deploy, external publishing,
  financial/account/access changes, irreversible changes, large rewrites,
  or materially risky target selection.

## 1. Read context first

Read shared project memory before repo-local implementation work:

- Read `projects.md`.
- Read `projects.json`.
- Read `systems/agent-rules.md`.
- Read `systems/autonomous-project-executor.md`.
- Read `systems/project-memory-standard.md` when available.
- Read the matching `projects/<slug>/PROJECT.md`.
- Read `projects/<slug>/CODEX_BRIEF.md` when available.
- Read `projects/<slug>/SYSTEM_MAP.md` when available.
- Read `projects/<slug>/DATA_SCHEMA.md` when available.
- Read `projects/<slug>/RISKS.md` when available.

Then read repo-local context in the target repository:

- Read `AGENTS.md` if present.
- Read `README.md`.
- Read `STATE.md` or `project-state.md` if present.
- Read `LOG.md` if present.
- Read package, deploy, and route/component files relevant to the task.

## 2. Identify target project

- Match by project name, URL, repo, live URL, or user wording.
- Prefer the canonical repository listed in the project record.
- If two or more repos/live targets are plausible, mark the target as `needs verification` or ask before production work.
- If the target is unclear, mark `needs verification`.

## 3. Confirm production source

- Do not assume an old repo is still active.
- Verify repo URL and hosting.
- Distinguish production, preview, local, archived, and deprecated targets.
- Do not claim production behavior was fixed unless the live target was verified.
- Separate `code path exists`, `env names documented`, `credentials configured`, and `live sync verified`.

## 4. Plan minimal safe change

- Do not rewrite the whole project.
- Use the smallest safe fix.
- Preserve accepted UX and business logic.
- Preserve user-facing routes, APIs, data contracts, raw links, deployment targets, and auth/data flows unless explicitly changed by the task.
- For Codex prompts, include repo, goal, context to read first, exact files or areas, minimal safe fix, what not to change, checks/tests, risks, final report format, and `STATE.md`/`LOG.md` update check.

## 5. Task-specific investigation

For bug tasks:

- Find concrete code first: file, component/function, endpoint, line, or pattern.
- Do not start with broad hypotheses before locating the relevant implementation.

For design/UX tasks:

- Compare current UI, layout, spacing, typography, colors, cards, buttons, forms, navigation, mobile, and desktop behavior.
- Preserve accepted layouts unless the task explicitly changes them.

For quality/site audits:

- Check primary user scenarios, routes, forms, console/runtime errors when possible, responsiveness, texts/CTA, production vs preview, and auth/data flows where relevant.

## 6. Implement

- Branch -> commit -> PR where possible.
- Keep changes focused.
- Do not expose secrets.
- Do not store real environment variable values.
- Do not mix unrelated dirty worktree changes into the task.
- Do not revert user changes unless explicitly asked.

## 7. Verify

- Run available tests.
- Run build.
- Run lint if available.
- Run project-specific guard scripts if listed.
- For docs-only memory changes, verify JSON validity, raw links, and generated indexes when scripts exist.
- Check live URL only when relevant and possible.
- Report checks that were not run instead of implying they passed.

## 8. Report

- Studied files.
- What was found.
- What changed.
- Changed files.
- Checks run.
- Checks not run.
- Preview/live links, if checked.
- Risks.
- What still needs verification.
- Next action.

## 9. Memory Update Loop

- Read current `STATE.md` when present.
- Summarize what changed.
- Propose `STATE.md` update.
- Append or propose `LOG.md` entry.
- Update project memory files when meaningful implementation facts changed.
- Mark uncertain items as `needs verification`.
- Ask user to confirm memory update only when changes are significant,
  risky, or cannot be safely committed in the same task.
