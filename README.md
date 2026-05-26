# AI Projects Brain

This repository is the raw-text context base for ChatGPT and Codex agents working on Andrii Litvinov's active projects.

It is intentionally public and text-first so agents can read current project context through `raw.githubusercontent.com` links without GitHub authentication.

## Agent Dispatcher Layer

This repo now has a lightweight dispatcher layer so agents can quickly identify the right project and avoid scanning unrelated repositories.

### Start here

- Agent start guide: [START-HERE-FOR-AGENTS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md)
- Project dispatcher index: [projects/index.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects/index.md)
- Current focus: [CURRENT-FOCUS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/CURRENT-FOCUS.md)
- Production debug protocol: [systems/production-debug-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md)
- Project capsule standard: [systems/project-capsule-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-capsule-standard.md)
- Claude Code prompt standard: [systems/claude-code-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md)
- Codex goal prompt standard: [systems/codex-goal-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md)

### Agent workflow

1. Read `START-HERE-FOR-AGENTS.md`.
2. Open `projects/index.md`.
3. Identify the correct `project_key`.
4. Read only the selected project capsule.
5. If the task is to create a prompt for Claude Code, read `systems/claude-code-prompt-standard.md` and the selected project's `CLAUDE_CODE_PROMPTS.md` if present.
6. If the task is to create, rewrite, or repair a Codex `/goal`, read `systems/codex-goal-prompt-standard.md` and make the goal a short execution contract.
7. If production/live state matters, read `systems/production-debug-protocol.md` and the selected project `CHECKS.md`, `RISKS.md`, and `DEBUG_LOG.md` before patching.
8. If code work is needed, open the canonical repo from the project record.
9. If production state matters, verify the listed live checks/endpoints.
10. Keep unknowns as `needs verification`.
11. Do not change secrets/env values.

### Current routing examples

- Finance, ledger, PayPal, Wise, Яндекс, balance, plan/fact → `ezohata-incoming-ledger`.
- Codex Links, Slack bridge, dispatch, Codex Cloud, commands → `codex-links`.
- Dashboards, thinking, daily changes, management reports → `brain-management`.
- Reiki Yggdrasil, masters, profile, admin, Supabase → `reiki-yggdrasil`.
- Artefacts / артефакты / marketplace → `artefacts`.
- Project memory / agent dispatcher / project index → `ai-projects-brain`.

## Claude Code Prompt Rule

When Andrey asks ChatGPT to create a Claude Code prompt, ChatGPT must use this rule before writing the prompt:

1. Read or apply `systems/claude-code-prompt-standard.md`.
2. If the request is about a specific project, also read `projects/<project_key>/CLAUDE_CODE_PROMPTS.md` when present.
3. Write prompts in low-token staged mode: `/clear`, one task, diagnose first, narrow scope, no broad repo scan, no full audit, no unrelated refactor, no long pasted history.
4. Split large work into separate prompts: diagnose → inspect → minimal patch → test → verify.

## Codex `/goal` Prompt Rule

When Andrey asks ChatGPT, Agent-Projector, Debugger, or another agent to create or repair a Codex `/goal`, the agent must use this rule before writing the goal:

1. Read or apply `systems/codex-goal-prompt-standard.md`.
2. Make `/goal` a short execution contract, not a long chat summary.
3. Include one concrete outcome, source of truth, context to read first, investigation scope, boundaries, definition of done, checks, and final report format.
4. For production debugger work, require source-of-truth checks and proof of failing layer before patching.
5. Do not write vague goals like `fix everything`, `audit all`, `deploy everything`, or `based on previous chats, you know what to do`.

## Project Memory System

This repo is the shared project memory layer for ChatGPT, Agent-Projector, and Codex. It identifies the canonical project, stores safe public context, and keeps unknowns explicit with `needs verification`.

### Where to inspect projects

- Agent start guide: [START-HERE-FOR-AGENTS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md)
- Project dispatcher index: [projects/index.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects/index.md)
- Current focus: [CURRENT-FOCUS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/CURRENT-FOCUS.md)
- Human inventory: [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- Machine inventory: [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- Generated index: [data/project-index.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/data/project-index.json)
- Per-project memory: `projects/<slug>/PROJECT.md` and adjacent files
- Agent rules: [systems/agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- Production debug protocol: [systems/production-debug-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md)
- Claude Code prompt standard: [systems/claude-code-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md)
- Codex goal prompt standard: [systems/codex-goal-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md)
- Expanded standard: [systems/project-memory-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-standard.md)
- Project capsule standard: [systems/project-capsule-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-capsule-standard.md)
- Codex update protocol: [systems/codex-project-update-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-update-protocol.md)

### How Agent-Projector and ChatGPT use it

1. Read `START-HERE-FOR-AGENTS.md` first.
2. Use `projects/index.md` to select a `project_key`.
3. Read only the matching `projects/<slug>/PROJECT.md` and adjacent capsule files.
4. If creating a Claude Code prompt, read `systems/claude-code-prompt-standard.md` and project-local `CLAUDE_CODE_PROMPTS.md` when present.
5. If creating or repairing a Codex `/goal`, read `systems/codex-goal-prompt-standard.md`.
6. Use `projects.json` or `data/project-index.json` only when structured lookup is needed.
7. Read `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `CODE_ACCESS.md`, `RISKS.md`, `CODEX_BRIEF.md`, `CHECKS.md`, and `DECISIONS.md` when deeper project context is needed.
8. For production bugs, read `systems/production-debug-protocol.md` before patching and prove production source of truth first.
9. Treat private repo access, live deploy state, credentials, and unverified mappings as `needs verification`.

### How Codex updates memory

After meaningful work, Codex should update the relevant project folder when facts change:

- `PROJECT.md` for status, repo, hosting, env names, important files, or next actions.
- `STATE.md` for current focus, active issues, next actions, and needs verification.
- `SYSTEM_MAP.md` for flow or runtime changes.
- `DATA_SCHEMA.md` for schema or data-contract changes.
- `CHECKS.md` for verification commands, live endpoints, and manual checks.
- `DECISIONS.md` for architecture choices that should not be re-litigated.
- `DEBUG_LOG.md` for debugging evidence and fixes.
- `RISKS.md` for new risks or guardrails.
- `LOG.md` for short chronological updates.

Run `node scripts/validate-projects-brain.mjs` before PR. If the index is stale, run `node scripts/sync-project-index.mjs`.

### How to add a new project

1. Add the project record to `projects.json`.
2. Add the human summary to `projects.md`.
3. Add a dispatcher row to `projects/index.md`.
4. Create `projects/<slug>/` from the templates in `templates/` and the project capsule standard.
5. Mark unknown values as `needs verification`.
6. Run the sync and validation scripts.

### Secret safety

This repo may list environment variable names, but it must never contain real tokens, keys, client secrets, refresh tokens, cookies, or private credentials. Do not store real env values in project docs, samples, debug logs, JSON, issues, commits, or PRs.

Level 2 `STATE.md` and `LOG.md` files may still exist for older project memory and should be preserved.

## How To Use

1. Start with the agent dispatcher:
   [START-HERE-FOR-AGENTS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md)
2. Use the project dispatcher index:
   [projects/index.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects/index.md)
3. Check current priorities:
   [CURRENT-FOCUS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/CURRENT-FOCUS.md)
4. Fall back to the human-readable project database:
   [raw projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
5. Use the machine-readable version when an agent needs structured lookup:
   [raw projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
6. Apply the shared agent rules before changing production systems:
   [raw agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
7. For Claude Code prompts, apply the prompt standard:
   [raw claude-code-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md)
8. For Codex `/goal` prompts, apply the goal prompt standard:
   [raw codex-goal-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md)
9. For production/live bugs, apply the production debug protocol before patching:
   [raw production-debug-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md)
10. Use the project memory schema and templates when creating or refreshing project state:
   [raw project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md)

## Raw Files For ChatGPT

- [START-HERE-FOR-AGENTS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md)
- [projects/index.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects/index.md)
- [CURRENT-FOCUS.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/CURRENT-FOCUS.md)
- [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- [project-index.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/data/project-index.json)
- [agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- [production-debug-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md)
- [claude-code-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md)
- [codex-goal-prompt-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md)
- [project-memory-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-standard.md)
- [project-capsule-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-capsule-standard.md)
- [codex-project-update-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-update-protocol.md)
- [project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md)
- [project-state-template.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-state-template.md)
- [project-log-template.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-log-template.md)
- [codex-project-workflow.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md)
- [codex-debug.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-debug.md)
- [codex-build.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-build.md)
- [chatgpt-agent-instructions.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/chatgpt-agent-instructions.md)
- [chatgpt-agent-projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/chatgpt-agent-projects.md)

## ChatGPT Agent Usage

Raw links:

- start guide: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md
- project index: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects/index.md
- current focus: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/CURRENT-FOCUS.md
- projects.md: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md
- projects.json: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json
- agent rules: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md
- Claude Code prompt standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md
- Codex goal prompt standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md
- production debug protocol: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md
- memory schema: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md
- Codex workflow: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md

Instruction:

"Если задача связана с проектами, сначала прочитай START-HERE-FOR-AGENTS.md, затем projects/index.md, определи project_key, прочитай только capsule выбранного проекта, затем agent-rules.md и нужные project docs. Если пользователь просит создать промпт для Claude Code, обязательно прочитай claude-code-prompt-standard.md и проектный CLAUDE_CODE_PROMPTS.md, если он есть. Если пользователь просит создать или исправить Codex /goal, обязательно прочитай codex-goal-prompt-standard.md. Для production bugs обязательно прочитай production-debug-protocol.md и докажи live source of truth перед patch. Не меняй secrets/env. Unknowns mark as needs verification."

## Memory Model

- Dispatcher entry lives in `START-HERE-FOR-AGENTS.md`.
- Fast project routing lives in `projects/index.md`.
- Current top priorities live in `CURRENT-FOCUS.md`.
- Human-readable central memory lives in `projects.md`.
- Machine-readable central memory lives in `projects.json`.
- Shared rules and templates live in `systems/`.
- Claude Code prompt standard lives in `systems/claude-code-prompt-standard.md`.
- Codex goal prompt standard lives in `systems/codex-goal-prompt-standard.md`.
- Project-specific Claude Code prompt rules live in `projects/<slug>/CLAUDE_CODE_PROMPTS.md` when present.
- Project-specific memory should live in `projects/<slug>/` and, when needed, in the target repo.
- Machine consumers should use `projects.json.raw_files` or `projects/index.md` to discover raw links.

## How ChatGPT Should Read The Base

1. Read `START-HERE-FOR-AGENTS.md`.
2. Read `projects/index.md`.
3. Identify the target `project_key`.
4. Read only the matching project capsule.
5. Read `systems/agent-rules.md` before operational advice.
6. If creating a Claude Code prompt, read `systems/claude-code-prompt-standard.md` and project-local `CLAUDE_CODE_PROMPTS.md` when present.
7. If creating or repairing a Codex `/goal`, read `systems/codex-goal-prompt-standard.md`.
8. For production bugs, read `systems/production-debug-protocol.md` and the project `CHECKS.md`, `RISKS.md`, `DEBUG_LOG.md`.
9. Read `systems/project-memory-schema.md` or `systems/project-capsule-standard.md` when updating project memory.
10. Mark all unknown or stale facts as `needs verification`.

## How Codex Should Work With Projects

1. Read the matching project record in this repo.
2. Read `systems/agent-rules.md`, `systems/production-debug-protocol.md`, and `systems/codex-project-workflow.md`.
3. Open the canonical repo from the project record.
4. Read repo-local `AGENTS.md`, `README.md`, `STATE.md`, project log, and deploy docs when present.
5. Check production source of truth before patching live bugs.
6. Check git status before editing.
7. Run the narrowest meaningful verification.
8. Report changed files, checks, risks, and next actions.

## Safety Rules

- This repo may list environment variable names, but it must never contain real tokens, keys, client secrets, refresh tokens, cookies, or private credentials.
- Unknown or stale data must be marked as `unknown` or `needs verification`.
- Production and preview targets must be distinguished when known.
- Agents should update this repo after meaningful repo, hosting, deployment, or workflow changes.
