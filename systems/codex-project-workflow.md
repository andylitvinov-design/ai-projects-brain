# Codex Project Workflow

## 0. Use autonomous project execution by default

- Read and apply `systems/autonomous-project-executor.md` before project work.
- Read and apply `systems/codex-token-efficiency.md` to keep context,
  tools, reports, and handoffs small without weakening verification.
- For ChatGPT-written prompts that Andrey will send to `/delivery`, read and
  apply `systems/chatgpt-delivery-prompt-standard.md`.
- Work autonomously by default: do not ask unnecessary questions before
  safe read-only, docs, planning, diagnosis, or minimal patch-scope work.
- If information is missing or uncertain, mark it as `needs verification`
  and continue with the safest useful next action.
- Ask the user only before risky actions such as deletion, secrets/env
  changes, merge to `main`, production deploy, external publishing,
  financial/account/access changes, irreversible changes, large rewrites,
  or materially risky target selection.

## 0.1 ChatGPT -> Codex routing

Use these routes before writing or sending execution prompts:

1. Abstract task -> `/planner` -> clarified task -> ChatGPT technical
   `/delivery` prompt -> Andrey sends to `/delivery`.
2. Clear task -> ChatGPT technical `/delivery` prompt -> Andrey sends to
   `/delivery`.
3. Large strategic task -> `/supergoal` -> milestones -> optional `/planner`
   for unclear or risky milestones -> ChatGPT technical `/delivery` prompt ->
   Andrey sends to `/delivery`.

`/planner` is ChatGPT-side task formulation. It asks clarifying questions,
defines source of truth, success criteria, allowed and forbidden actions,
verification, risks, stop conditions, and the context/token budget before a
final delivery prompt is written.

`/delivery` is Codex execution mode. Codex should not execute planner output
until Andrey sends a final `/delivery` prompt.

`/audit` is inspection mode for existing code, data, PRs, sites, calculations,
or production behavior. It is not prompt QA.

`/supergoal` manages large multi-stage objectives across sessions, repos, PRs,
or milestones.

Clear tasks should not be slowed down by `/planner`. Abstract, risky, or unclear
tasks should use `/planner` first. Do not create `/prompt-audit`; ChatGPT
delivery prompts must be technically strong by default.

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
- For Codex prompts, follow `systems/chatgpt-delivery-prompt-standard.md`.
  Include repo, goal, context to read first, exact files or areas or search
  strategy, source of truth, minimal safe fix, what not to change, proof before
  patching, checks/tests, risks, final report format, token-efficiency
  constraints, and `STATE.md`/`LOG.md` update check.

## 5. Task-specific investigation

For bug tasks:

- Find concrete code first: file, component/function, endpoint, line, or pattern.
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
- Before switching to or basing work on a local default branch, inspect
  `git worktree list`. A branch such as `main` may already be checked
  out in another worktree.
- If git reports `fatal: 'main' is already used by worktree at ...`,
  do not treat it as a user blocker and do not ask the user to manually
  repair the worktree. Create a new isolated temp worktree or temp clone
  from `origin/<default-branch>` and continue the safe task there.
- Prefer creating task branches directly from the remote base in a temp
  worktree when the current checkout is dirty, on another task branch,
  or the local default branch is occupied:
  `git worktree add -b "$BRANCH" "$WORKTREE" "origin/$DEFAULT_BRANCH"`.
- When handing terminal commands to the user, avoid partial snippets.
  Provide a complete fresh-terminal script that includes setup,
  worktree/branch creation, patching, checks, commit, push, PR, and final
  status.
- For long scripts containing nested Python, JSX, JSON, markdown, or
  quotes, wrap the full script in a file-writing heredoc and then run it,
  for example `cat > /tmp/task.sh <<'BASH' ... BASH` followed by
  `bash /tmp/task.sh`. This prevents partial paste errors such as
  `zsh: parse error near ')'`.
- If the user shows `heredoc>` or repeated pasted script tails, stop
  giving long heredoc scripts for that task. Use the smallest possible
  continuation command, direct GitHub/API actions, or a previously created
  worktree/branch instead.
- If a temp worktree already contains the intended patch, continue from
  that worktree. Do not recreate or reapply the same patch unless the
  worktree is missing or corrupted.
- If checks fail because a local binary is missing, for example
  `sh: vite: command not found`, install dependencies in that worktree
  with `npm ci` or `npm install` before changing code.
- If a PR becomes conflicted because `main` moved after the branch was
  pushed, prefer rebasing the existing branch and updating the existing
  PR instead of opening duplicate PRs. A compact recovery command is often
  enough: `cd "$WORKTREE" && git fetch origin --prune && git rebase
  origin/main -X theirs && npm ci && npm run check && git push
  --force-with-lease origin "$BRANCH"`.
- After rebasing and force-pushing, check PR mergeability and CI, then
  merge the same PR when it is green.
- Record terminal failures and recovery in the report: partial heredoc
  paste, occupied default branch, missing dependency install, conflicted
  PR, rebase/force-with-lease recovery, and final CI/merge status.

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
