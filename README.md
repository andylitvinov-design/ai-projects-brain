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
- UI audit standard: [systems/audit-ui.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-ui.md)
- Sales audit standard: [systems/audit-sales.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-sales.md)
- Sales audit scorecard: [systems/audit-sales-markers.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-sales-markers.md)

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

- Finance, ledger, PayPal, Wise, Яндекс, balance, plan/fact → `ezohata-incoming-ledger` or the explicitly named new Finance target.
- Codex Links, Slack bridge, dispatch, Codex Cloud, commands → `codex-links`.
- Dashboards, thinking, daily changes, management reports → `brain-management`.
- Reiki Yggdrasil, masters, profile, admin, Supabase → `reiki-yggdrasil`.
- Artefacts / артефакты / marketplace → `artefacts`.
- Project memory / agent dispatcher / project index → `ai-projects-brain`.

## Command rule

Before `/planner`, `/delivery`, `/audit`, `/audit-ui`, `/audit-sales`, `/audit-fin`, `/critic`, or `/improve`, run the read-only context scout from `systems/context-scout-mode.md`.

`/audit-sales` is the only canonical sales/conversion audit mode. `/audit-sale` is accepted only as a compatibility alias and must route to `/audit-sales`.

## Project Memory System

This repo is the shared project memory layer for ChatGPT, Agent-Projector, and Codex. It identifies the canonical project, stores safe public context, and keeps unknowns explicit with `needs verification`.

### Core files

- `projects.md` — human-readable project database.
- `projects.json` — machine-readable project database.
- `data/project-index.json` — generated index.
- `projects/<slug>/PROJECT.md` and adjacent capsule files — per-project memory.
- `systems/agent-rules.md` — shared rules.
- `systems/active-skill-map.md` — command visibility and routing source of truth.
- `systems/audit-sales.md` — canonical sales audit contract.
- `systems/audit-sales-markers.md` — canonical weighted scorecard.
- `projects/codex-automation/audit-sales-memory.md` — longitudinal portfolio audit memory.

### Updating memory

After meaningful work, update the relevant project folder when facts change. Run `node scripts/validate-projects-brain.mjs` before PR. If the generated index is stale, run `node scripts/sync-project-index.mjs`.

Never store real tokens, keys, client secrets, refresh tokens, cookies, private credentials, provider payloads, personal data, customer messages, or financial records in this repository.

## Raw command files

- [agent-modes.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-modes.md)
- [active-skill-map.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/active-skill-map.md)
- [context-scout-mode.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/context-scout-mode.md)
- [audit-ui.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-ui.md)
- [audit-sales.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-sales.md)
- [audit-sales-markers.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-sales-markers.md)
- [audit-fin-mode.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/audit-fin-mode.md)
- [improve-mode.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/improve-mode.md)
