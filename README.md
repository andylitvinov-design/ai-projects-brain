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
- `/save` durable memory skill: [agent-skills/save.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/agent-skills/save.md)
- `/save` runtime helper: [tools/save_memory.py](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/tools/save_memory.py)
- `/save` compatibility check: [agent-skills/save-compatibility-check.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/agent-skills/save-compatibility-check.md)

### Agent workflow

1. Read `START-HERE-FOR-AGENTS.md`.
2. Open `projects/index.md`.
3. Identify the correct `project_key`.
4. Read only the selected project capsule.
5. If the task is to create a prompt for Claude Code, read `systems/claude-code-prompt-standard.md` and the selected project's `CLAUDE_CODE_PROMPTS.md` if present.
6. If the task is to create, rewrite, or repair a Codex `/goal`, read `systems/codex-goal-prompt-standard.md` and make the goal a short execution contract.
7. If production/live state matters, read `systems/production-debug-protocol.md` and the selected project `CHECKS.md`, `RISKS.md`, and `DEBUG_LOG.md` before patching.
8. If the task is `/save`, `память:`, `ошибка:`, `правило:`, or `решение:`, read `agent-skills/save.md` and use `tools/save_memory.py` against the target project root.
9. If code work is needed, open the canonical repo from the project record.
10. If production state matters, verify the listed live checks/endpoints.
11. Keep unknowns as `needs verification`.
12. Do not change secrets/env values.

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

## `/save` Durable Memory Rule

When Andrey asks to save an important lesson or uses `/save`, `память:`, `ошибка:`, `правило:`, or `решение:`, agents must use the shared `/save` protocol:

1. Read or apply `agent-skills/save.md`.
2. Use `tools/save_memory.py` against the target project root when filesystem access is available.
3. Treat `/save` as upsert, not append.
4. Save only reusable, scoped, checkable lessons.
5. Keep project-specific memory inside that project's `/agent-memory` folder.
6. Use `tools/install_save_memory.py --project-root /path/to/project` to install Codex and Claude Code adapters into project repos.

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
- `/save` durable memory skill: [agent-skills/save.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/agent-skills/save.md)
- Expanded standard: [systems/project-memory-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-memory-standard.md)
- Project capsule standard: [systems/project-capsule-standard.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/project-capsule-standard.md)
- Codex update protocol: [systems/codex-project-update-protocol.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-update-protocol.md)

### How Agent-Projector and ChatGPT use it

1. Read `START-HERE-FOR-AGENTS.md` first.
2. Use `projects/index.md` to select a `project_key`.
3. Read only the matching `projects/<slug>/PROJECT.md` and adjacent capsule files.
4. If creating a Claude Code prompt, read `systems/claude-code-prompt-standard.md` and project-local `CLAUDE_CODE_PROMPTS.md` when present.
5. If creating or repairing a Codex `/goal`, read `systems/codex-goal-prompt-standard.md`.
