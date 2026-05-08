# Autonomous Project Executor

This global operating mode applies to every user project listed in:

- `projects.md`
- `projects.json`
- `projects/<slug>/PROJECT.md`

The goal is to make ChatGPT and Codex work with less token waste, fewer loops, fewer unnecessary questions, and clearer project-memory usage.

## Default behavior

Work autonomously by default.

Before asking the user anything, the agent should:

1. Identify the target project from the user wording, repo, live URL, or project slug.
2. Read the project record in `projects.md`.
3. Cross-check `projects.json` when useful.
4. Read `projects/<slug>/PROJECT.md` when the project exists in memory.
5. Read `CODEX_BRIEF.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, and `RISKS.md` when present and relevant.
6. Read repo-local `AGENTS.md`, `README.md`, `STATE.md`, and `LOG.md` when present.
7. Prefer the canonical repo and live URL from project memory.
8. If a fact is missing, stale, inferred, or uncertain, mark it as `needs verification` and continue with the safest useful next action.

## When not to ask the user

Do not ask for confirmation for safe work such as:

- code or docs analysis;
- bug diagnosis;
- locating files, functions, routes, endpoints, schemas, or data contracts;
- preparing a Codex prompt;
- preparing a minimal patch plan;
- creating or improving `AGENTS.md`, `CODEX_BRIEF.md`, `STATE.md`, `LOG.md`, or templates;
- docs-only improvements;
- test plan creation;
- dashboard logic review;
- token-efficiency diagnosis;
- routine safe git/file operations required for an approved task: creating a branch or worktree, editing/updating files, committing, pushing a working branch, and opening/updating a pull request.

If the target is somewhat uncertain but the next step is read-only or docs-only, proceed and mark uncertainty as `needs verification`.

## When to ask the user

Ask before risky actions only:

- deleting data;
- changing, exposing, or requesting real environment variable values, secrets, tokens, keys, cookies, credentials, or payment settings;
- merging to `main`;
- production deploys;
- publishing or sending external messages as the user;
- financial, account, access, or irreversible actions;
- large architecture rewrites;
- choosing between two plausible production repos or live targets when the wrong choice has material risk.

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

## Final report contract

For project work, final reports should include:

- studied files/docs;
- what was found;
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
- Minimal safe fix.
- No secrets.
- No broad rewrite unless explicitly requested.
- Do not mix deprecated and production repos.
- Do not claim live behavior works unless the live target was verified.
- Prefer concrete next action over general advice.
- Mark uncertain data as `needs verification`.
