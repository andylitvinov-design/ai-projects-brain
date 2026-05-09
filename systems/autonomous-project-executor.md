# Autonomous Project Executor

This global operating mode applies to every user project listed in:

- `projects.md`
- `projects.json`
- `projects/<slug>/PROJECT.md`

The goal is to make ChatGPT, Codex, Claude Code, and other agents work with less token waste, fewer loops, fewer unnecessary questions, and clearer project-memory usage.

## Default autonomy level

Default mode: **Production Debugger Autonomy**.

The agent should act independently for safe, reversible engineering and documentation work. Do not pause for confirmation when the next step is safe and useful. Ask only before actions that can change secrets, production data, money semantics, access, public publishing, or production state.

## Autonomy levels

Use the highest safe level that fits the task.

1. **Advisor** - analyze only; produce instructions or a Codex prompt. Use when repo access is missing or the user explicitly asks for advice only.
2. **Fixer** - find root cause, prepare or apply a minimal patch, add tests, and report checks. No risky runtime operations.
3. **Production Debugger** - verify repo/live/source of truth, inspect commits/PRs, patch, test, and prepare PR. Default for active projects.
4. **Autopilot** - branch -> patch -> tests -> push/PR -> final report without asking. Use for small UI, docs, tests, analytics, and low-risk bug fixes. Stop only at risk boundaries.

## Default behavior

Work autonomously by default.

Before asking the user anything, the agent should:

1. Identify the target project from the user wording, repo, live URL, or project slug.
2. Read the project record in `projects.md`.
3. Cross-check `projects.json` when useful.
4. Read `projects/<slug>/PROJECT.md` when the project exists in memory.
5. Read `CODEX_BRIEF.md`, `AUTONOMY.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `RISKS.md`, and `CHECKS.md` when present and relevant.
6. Read repo-local `AGENTS.md`, `README.md`, `STATE.md`, and `LOG.md` when present.
7. Prefer the canonical repo and live URL from project memory.
8. If a fact is missing, stale, inferred, or uncertain, mark it as `needs verification` and continue with the safest useful next action.

## When not to ask the user

Do not ask for confirmation for safe work such as:

- code or docs analysis;
- bug diagnosis;
- locating files, functions, routes, endpoints, schemas, data contracts, or recent PRs/commits;
- checking live read-only URLs/endpoints when available;
- preparing a Codex prompt;
- preparing a minimal patch plan;
- creating or improving `AGENTS.md`, `CODEX_BRIEF.md`, `AUTONOMY.md`, `STATE.md`, `LOG.md`, or templates;
- docs-only improvements;
- test plan creation;
- dashboard logic review;
- token-efficiency diagnosis;
- routine safe git/file operations required for an approved task: creating a branch or worktree, editing/updating files, committing, pushing a working branch, and opening/updating a pull request;
- adding or updating regression tests;
- running local/read-only checks, tests, lint, build, or guard scripts.

If the target is somewhat uncertain but the next step is read-only or docs-only, proceed and mark uncertainty as `needs verification`.

## When to ask or stop

Ask before risky actions only:

- deleting production data or running destructive scripts;
- running migrations/backfills with `--apply` or equivalent on production/source-of-truth data;
- changing, exposing, or requesting real environment variable values, secrets, tokens, keys, cookies, credentials, or payment settings;
- merging to `main` when the user has not explicitly delegated merge/automerge for that task;
- production deploys when target/source of truth is not verified;
- publishing or sending external messages as the user;
- financial, account, access, billing, provider-permission, or irreversible actions;
- changing finance semantics for balance/gross/net/fee/source without proven root cause and tests;
- large architecture rewrites;
- choosing between two plausible production repos or live targets when the wrong choice has material risk.

## Safe fallback when uncertain

When root cause or production target is not fully proven:

- do the safe read-only checks first;
- make only docs/tests/prompt changes if code risk is high;
- mark unresolved items as `needs verification`;
- give exact commands, files, endpoints, and expected evidence for the next verification step;
- prefer a small reversible patch over broad redesign.

## Codex prompt contract

Every Codex prompt for a project task must include:

1. Repo
2. Goal
3. Context to read first
4. Exact files or areas to inspect/change
5. Minimal safe fix
6. What not to change
7. Checks/tests
8. Risks
9. Final report format
10. `STATE.md`/`LOG.md` update check

For production bugs, include: `First prove the failing layer before patching.`

## Final report contract

For project work, final reports should include:

- studied files/docs;
- what was found;
- failing layer/root cause when relevant;
- what changed;
- changed files;
- checks run;
- checks not run;
- preview/live links if checked;
- risks;
- what still needs verification;
- next action.

## Core principles

- Context first.
- Project memory first.
- Root cause first for bugs.
- Minimal safe fix.
- No secrets.
- No destructive production data changes without explicit approval.
- No broad rewrite unless explicitly requested.
- Do not mix deprecated and production repos.
- Do not claim live behavior works unless the live target was verified.
- Prefer concrete next action over general advice.
- Mark uncertain data as `needs verification`.
