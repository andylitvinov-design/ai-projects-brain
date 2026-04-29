# AI Projects Brain

This repository is the raw-text context base for ChatGPT and Codex agents working on Andrii Litvinov's active projects.

It is intentionally public and text-first so agents can read current project context through `raw.githubusercontent.com` links without GitHub authentication.

## How To Use

1. Start with the human-readable project database:
   [raw projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
2. Use the machine-readable version when an agent needs structured lookup:
   [raw projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
3. Apply the shared agent rules before changing production systems:
   [raw agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
4. Use the project memory schema and templates when creating or refreshing project state:
   [raw project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-memory-schema.md)

## Raw Files For ChatGPT

- [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- [agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- [project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-memory-schema.md)
- [project-state-template.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-state-template.md)
- [project-log-template.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-log-template.md)
- [codex-project-workflow.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/codex-project-workflow.md)
- [codex-debug.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-debug.md)
- [codex-build.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-build.md)
- [chatgpt-agent-instructions.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/chatgpt-agent-instructions.md)

## ChatGPT Agent Usage

Raw links:

- projects.md: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- projects.json: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- agent rules: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- memory schema: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-memory-schema.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/project-memory-schema.md)
- Codex workflow: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/codex-project-workflow.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/system/codex-project-workflow.md)

Instruction:

"Если задача связана с проектами, сначала прочитай projects.md,
при необходимости используй projects.json,
затем прочитай agent-rules.md и project-memory-schema.md,
извлеки релевантный проект и используй данные."

## Memory Model

- Human-readable central memory lives in `projects.md`.
- Machine-readable central memory lives in `projects.json`.
- Shared rules and templates live in `systems/` and `system/`.
- Project-specific human memory should live in the target repo, usually `STATE.md` and `LOG.md` or `docs/project-log.md`.
- Machine consumers should use `projects.json.raw_files` to discover raw links.

## How ChatGPT Should Read The Base

1. Read `projects.md` for project boundaries, status, risks, and current notes.
2. Read `projects.json` when structured lookup or exact raw links are needed.
3. Read `systems/agent-rules.md` before giving operational advice.
4. Read `system/project-memory-schema.md` when updating project memory.
5. Mark all unknown or stale facts as `needs verification`.

## How Codex Should Work With Projects

1. Read the matching project record in this repo.
2. Read `systems/agent-rules.md` and `system/codex-project-workflow.md`.
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
