# ChatGPT Delivery Prompt Standard

Every ChatGPT-written prompt that Andrey will send to `/delivery` must be specific enough for Codex to execute without repo confusion, broad guessing, unsafe rewrites, private credential exposure, or unnecessary context waste.

This standard is the default. Do not create a separate `/prompt-audit` mode or a manual prompt-checking workflow.

## Routing rule

- Clear tasks: ChatGPT writes a technically strong `/delivery` prompt directly.
- Abstract, risky, or unclear tasks: use `/planner` first, then write the `/delivery` prompt after the task is clarified.
- Large strategic tasks: use `/supergoal` for milestones, optional `/planner` for unclear or risky milestones, then a technical `/delivery` prompt.

ChatGPT writes prompts for Andrey. Codex executes only through `/delivery`.

## Required prompt structure

Every `/delivery` prompt should include the sections below. Omit a section only when it is clearly irrelevant, and mark unknowns as `needs verification`.

### 1. Repo

- canonical repository URL or local path;
- project name or slug;
- production/live URL if relevant;
- production impact: none, preview-only, or live-facing.

### 2. Goal

- one concrete outcome;
- definition of done;
- what must be true when Codex reports completion.

### 3. Read first

- relevant project memory from `projects.md`, `projects.json`, or `projects/<slug>/PROJECT.md`;
- repo-local `AGENTS.md`;
- `CODEX_BRIEF.md` when available;
- `README.md`, `STATE.md`, `LOG.md`, deploy docs, or issue text when relevant;
- exact source docs the user named.

### 4. Exact files, functions, or search strategy

- list exact files/functions/components/routes when known;
- if unknown, write `exact files need verification`;
- include a narrow search strategy such as specific `rg` patterns, route names, API names, data keys, UI labels, or test names.

### 5. Source of truth

Name the source that decides correctness: business rule, schema, API contract, live behavior, issue text, design, sheet, fixture, migration, or existing accepted UI behavior.

### 6. Do

- precise allowed actions;
- smallest safe implementation scope;
- expected docs or memory updates.

### 7. Do not

- no broad rewrite unless explicitly requested;
- no unrelated file churn;
- no private credentials or sensitive access values;
- no deprecated repo or old live target unless explicitly requested;
- no destructive git commands or user-change reverts.

### 8. Minimal safe fix

- prefer the smallest reversible change that solves the stated problem;
- preserve routes, APIs, data contracts, auth, deployment targets, and accepted behavior unless the prompt explicitly changes them.

### 9. Proof before patching

- state which failing layer should be proven first: live endpoint, DOM/browser path, deploy/source state, test, data contract, or code path;
- include the exact failing command/check when known;
- if not known, say how Codex should find it before patching.

### 10. Verification commands

List the narrowest meaningful checks: focused test, lint/check command, build command, release guard, audit command, docs grep, or live URL check when production behavior is claimed.

If a check depends on auth, provider access, private configuration, or production deploy, say so.

### 11. Token-efficiency constraints

- read the smallest useful context first;
- prefer `CODEX_BRIEF.md` over long onboarding docs when available;
- use `rg` and narrow line ranges before opening large files;
- do not scan the whole repo first unless exact files cannot be found;
- do not reread unchanged files without a reason;
- summarize findings before expanding context;
- keep final reports compact while preserving verification evidence.

### 12. Risks / needs verification

Call out uncertainty explicitly, including uncertain repo, branch, live URL, production source, auth/provider access, live deploy state, finance/account/data sensitivity, risky migrations, irreversible actions, or broad UI behavior changes.

### 13. STATE/LOG update

- check whether `STATE.md`, `LOG.md`, `project-state.md`, or equivalent project memory exists;
- update it when the change creates durable project facts;
- if not updated, report why.

### 14. Final report format

Codex must report studied files, changed files, what changed, checks run, checks not run, risks, needs verification, `STATE.md` / `LOG.md` update status, branch, PR, commit, deploy/live status when the repo requires it, and next action.

## Prompt quality checklist

Before giving Andrey a `/delivery` prompt, ChatGPT should verify that it includes repo and goal, exact files or a search strategy, checks, risks and `needs verification`, `STATE.md` / `LOG.md` instruction, token-efficiency constraints, and no sensitive access values.
