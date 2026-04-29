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

## Raw Files For ChatGPT

- [projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- [projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- [agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)
- [codex-debug.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-debug.md)
- [codex-build.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/codex-build.md)
- [chatgpt-agent-instructions.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/prompts/chatgpt-agent-instructions.md)

## ChatGPT Agent Usage

Raw links:

- projects.md: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)
- projects.json: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)
- agent rules: [https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)

Instruction:

"Если задача связана с проектами, сначала прочитай projects.md,
при необходимости используй projects.json,
затем извлеки релевантный проект и используй данные."

## Safety Rules

- This repo may list environment variable names, but it must never contain real tokens, keys, client secrets, refresh tokens, cookies, or private credentials.
- Unknown or stale data must be marked as `unknown` or `needs verification`.
- Production and preview targets must be distinguished when known.
- Agents should update this repo after meaningful repo, hosting, deployment, or workflow changes.
