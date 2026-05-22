# Codex Project Workflow

## 0. Use autonomous project execution by default

- Read and apply `systems/agent-thinking-quality-standard.md` before
  debugging, prompt writing, production fixes, project memory updates,
  dashboard/observability work, or Codex task management.
- Read and apply `systems/autonomous-project-executor.md` before project work.
- Read and apply `systems/codex-token-efficiency.md` to keep context,
  tools, reports, and handoffs small without weakening verification.
- Work autonomously by default: do not ask unnecessary questions before
  safe read-only, docs, planning, diagnosis, or minimal patch-scope work.
- If information is missing or uncertain, mark it as `needs verification`
  and continue with the safest useful next action.
- Ask the user only before risky actions such as deletion, secrets/env
  changes, merge to `main`, production deploy, external publishing,
  financial/account/access changes, irreversible changes, large rewrites,
  or materially risky target selection.

## 1. Read context first, but start with the smallest useful set

Context First still applies, but Codex should not open every possible file
for every task. Use the task size levels in `systems/codex-token-efficiency.md`:

- tiny tasks: project record + `CODEX_BRIEF.md` or `STATE.md` + exact file;
- small tasks: project record + `CODEX_BRIEF.md` + `STATE.md`/`LOG.md` + exact implementation files;
- medium tasks: add relevant `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, tests, and deploy docs;
- large tasks: full project memory is allowed, but summarize before expanding further.

Read shared project memory before repo-local implementation work, expanding only
when the task needs it:

- Read `projects.md`.
- Read `projects.json` when the target project is listed or repo/live mapping matters.
- Read `systems/agent-rules.md`.
- Read `systems/agent-thinking-quality-standard.md` when quality, debugging, prompting, Codex management, or production safety matters.
- Read `systems/autonomous-project-executor.md`.
- Read `systems/codex-token-efficiency.md`.
- Read `systems/project-memory-standard.md` when available and relevant.
- Read the matching `projects/<slug>/PROJECT.md`.
- Read `projects/<slug>/CODEX_BRIEF.md` when available.
- Read `projects/<slug>/SYSTEM_MAP.md` when relevant.
- Read `projects/<slug>/DATA_SCHEMA.md` when data/contracts are involved.
- Read `projects/<slug>/RISKS.md` when risk or production behavior is involved.

Then read repo-local context in the target repository:

- Read `AGENTS.md` if present.
- Prefer `CODEX_BRIEF.md` over long `README.md` when available.
- Read `README.md` when onboarding, commands, deploy, or missing brief require it.
- Read `STATE.md` or `project-state.md` if present.
- Read `LOG.md` if present and recent history matters.
- Read package, deploy, and route/component files relevant to the task.
- Use search/grep to locate exact files before opening large files.
- Do not start with a full repo scan unless exact files cannot be found.

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
- For Codex prompts, include repo, goal, context to read first, exact files or areas, minimal safe fix, what not to change, checks/tests, risks, final report format, token-efficiency constraints, and `STATE.md`/`LOG.md` update check.
- For debugging prompts, include: `First prove the failing layer before patching.`

## 5. Task-specific investigation

For bug tasks:

- Find concrete code first: file, component/function, endpoint, line, or pattern.
- Prove the failing layer before patching.
- Do not start with broad hypotheses before locating the relevant implementation.
- Do not reread unchanged files without a reason.

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

- Run the narrowest meaningful verification for the change.
- Run available tests.
- Run build.
- Run lint if available.
- Run project-specific guard scripts if listed.
- For docs-only memory changes, verify JSON validity, raw links, and generated indexes when scripts exist.
- Check live URL only when relevant and possible.
- Do not use browser, Playwright, screenshots, live checks, or external MCP/tools unless the task requires them.
- Report checks that were not run instead of implying they passed.

## 8. Report

Keep normal Codex reports short. Include:

- Studied files.
- What was found.
- What changed.
- Changed files.
- Checks run.
- Checks not run.
- Preview/live links, if checked.
- Risks.
- What still needs verification.
- `STATE.md` / `LOG.md` update status.
- Next action.

Avoid long narratives unless the user asks for analysis.

## 9. Memory Update Loop

- Read current `STATE.md` when present.
- Summarize what changed.
- Propose `STATE.md` update.
- Append or propose `LOG.md` entry.
- Update project memory files when meaningful implementation facts changed.
- Mark uncertain items as `needs verification`.
- Ask user to confirm memory update only when changes are significant,
  risky, or cannot be safely committed in the same task.

## 10. Compact / session handoff

Use `templates/session-summary-template.md` before compacting, switching to a
new chat/session, changing major direction after a long debug loop, or handing
off work to another agent. The summary should replace rereading long chat
history, not replace project memory.
