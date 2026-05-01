# AI Projects Brain

This repository is the raw-text context base for ChatGPT and Codex agents working on Andrii Litvinov's active projects.

It is intentionally public and text-first so agents can read current project context through `raw.githubusercontent.com` links without GitHub authentication.

## Project Memory System

This repo is the shared project memory layer for ChatGPT, Agent-Projector, and Codex. It identifies the canonical project, stores safe public context, and keeps unknowns explicit with `needs verification`.

### Where to inspect projects

- Human inventory: [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- Machine inventory: [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- Generated index: [data/project-index.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/data/project-index.json)
- Per-project memory: `projects/<slug>/PROJECT.md` and adjacent files
- Agent rules: [systems/agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- Expanded standard: [systems/project-memory-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-standard.md)
- Codex update protocol: [systems/codex-project-update-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-update-protocol.md)

### How Agent-Projector and ChatGPT use it

1. Read `projects.md` to choose the project boundary.
2. Use `projects.json` or `data/project-index.json` for structured lookup.
3. Read the matching `projects/<slug>/PROJECT.md`.
4. Read `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `CODE_ACCESS.md`, `RISKS.md`, and `CODEX_BRIEF.md` when deeper project context is needed.
5. Treat private repo access, live deploy state, credentials, and unverified mappings as `needs verification`.

### How Codex updates memory

After meaningful work, Codex should update the relevant project folder when facts change:

- `PROJECT.md` for status, repo, hosting, env names, important files, or next actions.
- `SYSTEM_MAP.md` for flow or runtime changes.
- `DATA_SCHEMA.md` for schema or data-contract changes.
- `DEBUG_LOG.md` for debugging evidence and fixes.
- `RISKS.md` for new risks or guardrails.

Run `node scripts/validate-projects-brain.mjs` before PR. If the index is stale, run `node scripts/sync-project-index.mjs`.

### How to add a new project

1. Add the project record to `projects.json`.
2. Add the human summary to `projects.md`.
3. Create `projects/<slug>/` from the templates in `templates/`.
4. Mark unknown values as `needs verification`.
5. Run the sync and validation scripts.

### Secret safety

This repo may list environment variable names, but it must never contain real tokens, keys, client secrets, refresh tokens, cookies, or private credentials. Do not store real env values in project docs, samples, debug logs, JSON, issues, commits, or PRs.

Level 2 `STATE.md` and `LOG.md` files may still exist for older project memory and should be preserved.

## How To Use

1. Start with the human-readable project database:
   [raw projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
2. Use the machine-readable version when an agent needs structured lookup:
   [raw projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
3. Apply the shared agent rules before changing production systems:
   [raw agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
4. Use the project memory schema and templates when creating or refreshing project state:
   [raw project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md)

## Raw Files For ChatGPT

- [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- [project-index.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/data/project-index.json)
- [agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- [project-memory-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-standard.md)
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

- projects.md: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- projects.json: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- agent rules: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- memory schema: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-schema.md)
- Codex workflow: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md)

Instruction:

"Если задача связана с проектами, сначала прочитай projects.md,
при необходимости используй projects.json,
затем прочитай agent-rules.md и project-memory-schema.md,
извлеки релевантный проект и используй данные."

## Memory Model

- Human-readable central memory lives in `projects.md`.
- Machine-readable central memory lives in `projects.json`.
- Shared rules and templates live in `systems/`.
- Project-specific human memory should live in the target repo, usually `STATE.md` and `LOG.md` or `docs/project-log.md`.
- Machine consumers should use `projects.json.raw_files` to discover raw links.

## How ChatGPT Should Read The Base

1. Read `projects.md` for project boundaries, status, risks, and current notes.
2. Read `projects.json` when structured lookup or exact raw links are needed.
3. Read `systems/agent-rules.md` before giving operational advice.
4. Read `systems/project-memory-schema.md` when updating project memory.
5. Mark all unknown or stale facts as `needs verification`.

## How Codex Should Work With Projects

1. Read the matching project record in this repo.
2. Read `systems/agent-rules.md` and `systems/codex-project-workflow.md`.
3. Open the canonical repo from the project record.
4. Read repo-local `AGENTS.md`, `README.md`, `STATE.md`, project log, and deploy docs when present.
5. Check git status before editing.
6. Run the narrowest meaningful verification.
7. Report changed files, checks, risks, and next actions.

## Safety Rules

- This repo may list environment variable names, but it must never contain real tokens, keys, client secrets, refresh tokens, cookies, or private credentials.
- Unknown or stale data must be marked as `unknown` or `needs verification`.
- Production and preview targets must be distinguished when known.
- Agents should update this repo after meaningful repo, hosting, deployment, or workflow changes.
