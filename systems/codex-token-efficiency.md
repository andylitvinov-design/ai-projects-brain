# Codex Token Efficiency Program

Use this file with `systems/agent-rules.md` and `systems/codex-project-workflow.md`.
The goal is not to skip project memory. The goal is to read the smallest useful context first, expand only when blocked, and finish with verification and memory updates.

## 1. Program stages

### Stage 1 — Policy layer

- Add a shared token-efficiency policy in this file.
- Link it from the main Codex workflow and agent rules.
- Keep the policy short enough to be read often.

### Stage 2 — Template layer

- Add short templates for `AGENTS.md`, `CODEX_BRIEF.md`, task intake, and session summaries.
- Keep repo `AGENTS.md` files short; target 200 lines or less.
- Move project details into `CODEX_BRIEF.md`, `STATE.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, and `RISKS.md`.

### Stage 3 — Repo rollout

Audit the high-impact repos first:

1. `ai-projects-brain`
2. `brain-management`
3. `codex-links`
4. `finance` / `ezohata-incoming-ledger`

For each repo, check:

- whether `AGENTS.md` exists and is short;
- whether `CODEX_BRIEF.md` exists;
- whether `STATE.md` and `LOG.md` exist;
- whether exact verification commands are documented;
- whether deprecated repos and production targets are clearly separated;
- whether there is a clear stop condition.

### Stage 4 — Dashboard layer

Add or expose token-efficiency signals in `brain-management`:

- `broad_repo_scan`
- `repeated_file_reads`
- `missing_codex_brief`
- `missing_state_log`
- `long_final_report`
- `no_compact_summary`
- `unnecessary_tool_use`
- `wrong_repo_context`
- `no_exact_failing_command`
- `skipped_verification`

### Stage 5 — Continuous improvement

After each significant Codex task:

- check whether the task wasted context;
- update `STATE.md` or `LOG.md` if project facts changed;
- add a short improvement note when a repeated token-waste pattern appears.

## 2. Task size levels

### Tiny task

Examples: docs wording, one small prompt, one known file.

Read:

- project record from `projects.md`;
- `CODEX_BRIEF.md` or `STATE.md` if available;
- the exact file requested.

Do not read full repo memory unless blocked.

### Small task

Examples: one bug, one UI copy change, one endpoint check.

Read:

- project record from `projects.md`;
- `CODEX_BRIEF.md`;
- `STATE.md` / `LOG.md` if present;
- exact implementation files and nearest tests.

Do not start with a full repo scan.

### Medium task

Examples: feature patch, schema adjustment, dashboard change.

Read additionally:

- `SYSTEM_MAP.md` if relevant;
- `DATA_SCHEMA.md` if data/contracts are involved;
- `RISKS.md` if present;
- relevant tests and deploy docs.

### Large task

Examples: architecture, long debug loop, production incident, cross-repo flow.

Full project memory is allowed, but Codex must:

- state why broader context is needed;
- keep notes short;
- avoid rereading unchanged files;
- create a session summary before switching direction.

## 3. Context budget rules

- Start narrow; expand only when blocked.
- Prefer `CODEX_BRIEF.md` over long `README.md` when available.
- Use search/grep to locate exact files before opening large files.
- Do not read the whole repo first.
- Do not reread unchanged files without a reason.
- Do not mix sibling repos unless the project record says they are connected.
- Mark missing or uncertain context as `needs verification` and continue with the safest useful plan.

## 4. Tool budget rules

- Do not use browser, Playwright, screenshots, live checks, or external MCP/tools unless the task requires them.
- For docs-only tasks, verify files and links; do not perform live deploy checks unless links are part of the task.
- For production claims, live verification is required when possible.
- If a tool or live check fails, record the exact failing command/check.

## 5. Compact and session summary triggers

Create or propose a session summary before:

- switching to a new major task;
- after a long debugging loop;
- when repeated checks or rereads begin;
- before a new chat/session handoff;
- before context becomes too large to keep reliable.

The summary should capture only:

- target repo and branch;
- goal;
- files already studied;
- findings;
- changes made;
- checks run and failures;
- remaining risks;
- next exact action.

## 6. Repo instruction size rule

- Keep repo `AGENTS.md` short; target 200 lines or less.
- `AGENTS.md` should route Codex to the correct memory files and safety rules.
- Do not duplicate long project docs inside `AGENTS.md`.
- Put operational detail into `CODEX_BRIEF.md`, `STATE.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `RISKS.md`, or `LOG.md`.

## 7. Final report rule

For normal tasks, report only:

- studied files;
- what was found;
- what changed;
- changed files;
- checks run;
- checks not run;
- risks / `needs verification`;
- `STATE.md` / `LOG.md` update status.

Avoid long narratives unless the user asks for analysis.

## 8. Stop condition

A Codex task is complete only when:

- the minimal fix is implemented or a clear no-change diagnosis is given;
- checks were run or explicitly marked not run;
- changed files are listed;
- risks are listed;
- `STATE.md` / `LOG.md` update need is checked;
- the next action is concrete.

## 9. Non-goals

- Do not weaken Context First.
- Do not weaken Project Memory First.
- Do not weaken Production Awareness.
- Do not weaken Secrets Safety.
- Do not skip verification to save tokens.
- Do not make Claude-only features mandatory for Codex unless clearly marked as Claude-only.
