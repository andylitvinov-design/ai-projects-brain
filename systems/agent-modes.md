# Agent Modes

This file is the shared index of callable agent modes for Andrey's projects.
Use it together with `systems/agent-rules.md`.

## Mode priority

1. Safety and secrets rules always win.
2. Project context rules always apply for project work.
3. Explicit user mode trigger wins over default autonomous behavior.
4. If several modes are requested, combine them in this order:
   - `grill-me` / task clarification
   - `superpowers` / disciplined execution
   - implementation or research mode
   - verification mode
   - handoff / memory update

## Canonical mode concept docs

- `/safe` concept and idea backlog: `systems/safe-concept.md`
- `/safe` routing matrix: `systems/safe-routing.md`

## Available modes

| Mode | Trigger examples | Use when | Source file |
| --- | --- | --- | --- |
| Safe | `/safe`, `режим safe`, `проверь безопасность`, `чтобы пользователь не видел ошибок` | A project needs privacy, API-cost, bot-protection, auth, headers, frontend runtime-error, and user-facing error-safety checks. Route first with `systems/safe-routing.md`; add durable new ideas to `systems/safe-concept.md`. | `systems/safe-mode.md` |
| Grill Me / Task Clarification | `grill me`, `прогриль задачу`, `проясни задачу` | Requirements are unclear and must be clarified before implementation. | `systems/task-clarification-mode.md` |
| Superpowers | `используй superpowers`, `строгий режим`, `сначала план и проверка` | The task needs disciplined context -> plan -> minimal edits -> verification. | `systems/superpowers-mode.md` |
| Handoff | `сделай handoff`, `передай следующему агенту`, `обнови HANDOFF.md` | A future agent must continue without rereading the full chat. | `systems/handoff-mode.md` |
| Playwright Verification | `проверь через playwright`, `проверь браузером`, `desktop/mobile` | UI, forms, routes, buttons, auth, uploads, or responsive behavior must be verified in a browser. | `systems/playwright-verification-mode.md` |
| Skill Creator | `создай skill`, `упакуй workflow`, `сделай reusable process` | A repeated process should become a reusable skill/workflow. | `systems/skill-creator-mode.md` |
| Last 30 Days / Recent Research | `last30days`, `свежий ресерч`, `за последние 30 дней` | Fresh tools, releases, products, GitHub discussions, APIs, or market options may have changed recently. | `systems/recent-research-mode.md` |

## Default behavior without an explicit mode

- For normal project work, use `systems/agent-rules.md` and `systems/autonomous-project-executor.md`.
- For unclear tasks, proactively use the light version of Grill Me: ask only the minimum necessary questions, with recommended answers.
- For UI changes, include browser verification in the plan even when Playwright is not explicitly requested.
- For long or multi-session tasks, produce a handoff summary at the end.

## Obsidian note

Do not make Obsidian the default memory source. The canonical project memory is GitHub `ai-projects-brain`.
Use Obsidian only when the user explicitly asks to save or sync notes into a vault.
