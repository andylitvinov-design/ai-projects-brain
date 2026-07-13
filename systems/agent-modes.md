# Agent Modes

This file is the shared index of callable agent modes for Andrey's projects.
Use it together with `systems/agent-rules.md` and `systems/active-skill-map.md`.

`systems/active-skill-map.md` is the visibility/routing source of truth: it decides which commands are primary user-facing commands, which modes are secondary tools, and which behaviors are internal guardrails. Do not advertise or add a new top-level mode before checking that map.

## Mode priority

1. Safety and secrets rules always win.
2. Project context rules always apply for project work.
3. Explicit user mode trigger wins over default autonomous behavior.
4. If several modes are requested, combine them in this order:
   - `/context-scout` read-only preflight
   - `/planner` when the task itself is still abstract, risky, or unclear
   - `grill-me` / task clarification
   - `superpowers` / disciplined execution
   - implementation or research mode
   - verification mode
   - handoff / memory update

## Canonical mode concept docs

- Active visibility/routing map: `systems/active-skill-map.md`
- `/safe` concept and idea backlog: `systems/safe-concept.md`
- `/safe` routing matrix: `systems/safe-routing.md`
- `/safe` frontend UX checks: `systems/safe-frontend-ux-checks.md`
- `/safe` project template: `systems/safe-project-template.md`
- `/safe` daily report schema: `systems/safe-report-schema.md`
- `/audit-ui` reusable UI audit standard: `systems/audit-ui.md`
- `/audit-sale` reusable sales and conversion audit standard: `systems/audit-sale.md`
- `/improve` strategic planning mode: `systems/improve-mode.md`

## Available modes

| Mode | Trigger examples | Use when | Source file |
| --- | --- | --- | --- |
| Context Scout | `/context-scout`, implicit preflight before `/planner`, `/delivery`, `/audit`, `/audit-ui`, `/audit-sale`, `/audit-fin`, `/critic`, `/improve` | Read-only project-aware context bundle before planning, execution, audit, UI audit, sales audit, finance audit, critique, or improvement discovery. | `systems/context-scout-mode.md` |
| Planner | `/planner`, `сформулируй задачу`, `помоги сделать точный prompt для delivery` | ChatGPT must formulate an abstract/risky/unclear task before writing a `/delivery` prompt for Andrey. | `systems/planner-mode.md` |
| Delivery | `/delivery`, `/delivery /goal`, `выполни delivery` | Codex executes a scoped task through context, implementation, checks, PR/merge/deploy proof, and final report. | `systems/delivery-loop-standard.md` |
| Audit | `/audit`, `проверь`, `сделай аудит` | Inspect existing code, data, PRs, sites, calculations, or production behavior with a verification checklist and safe deterministic fixes only. | `systems/audit-mode.md` |
| UI Audit | `/audit-ui`, `UI audit`, `audit ui`, `проверь интерфейс` | Audit or minimally fix UI taste, structure, responsive states, polish, hardening, and browser verification without a redesign unless explicitly requested. | `systems/audit-ui.md` |
| Sales Audit | `/audit-sale`, `sales audit`, `conversion audit`, `аудит продаж`, `проверь конверсию` | Audit a public page's audience-message fit, offer clarity, trust, objections, CTA path, friction, and measurement readiness without invented proof, promised uplift, dark patterns, or a redesign. | `systems/audit-sale.md` |
| Finance Audit | `/audit-fin`, `финансовый аудит`, `проверь финансы` | Audit finance/ledger data for a period, defaulting to the last 30 days, with strict balance and source-record boundaries. | `systems/audit-fin-mode.md` |
| Critic | `/critic`, `раскритикуй задачу`, `проверь prompt перед запуском` | Critique a proposed goal, task, loop, prompt, or workflow before execution and return an improved execution prompt. | `systems/critic-mode.md` |
| Improve | `/improve`, `/improve page`, `/improve branch`, `/improve quick`, `/improve reconcile` | Run read-only strategic improvement discovery and produce delivery-ready plans or GitHub issues for later execution. | `systems/improve-mode.md` |
| Safe | `/safe`, `режим safe`, `проверь безопасность`, `чтобы пользователь не видел ошибок`, `сайт не срабатывает`, `интерфейс неаккуратный` | A project needs privacy, API-cost, bot-protection, auth, headers, frontend runtime-error, user-facing error-safety, UX interaction/polish, rollback, observability, or agent-skill safety checks. Route first with `systems/safe-routing.md`; use `systems/safe-frontend-ux-checks.md` for UI; add durable new ideas to `systems/safe-concept.md`. | `systems/safe-mode.md` |
| Grill Me / Task Clarification | `grill me`, `прогриль задачу`, `проясни задачу` | Requirements are unclear and must be clarified before implementation. | `systems/task-clarification-mode.md` |
| Superpowers | `используй superpowers`, `строгий режим`, `сначала план и проверка` | The task needs disciplined context -> plan -> minimal edits -> verification. | `systems/superpowers-mode.md` |
| Handoff | `сделай handoff`, `передай следующему агенту`, `обнови HANDOFF.md` | A future agent must continue without rereading the full chat. Operational continuation only; durable lessons go through `/save`, and read-only memory lookup stays secondary. | `systems/handoff-mode.md` |
| Playwright Verification | `проверь через playwright`, `проверь браузером`, `desktop/mobile` | UI, forms, routes, buttons, auth, uploads, or responsive behavior must be verified in a browser. | `systems/playwright-verification-mode.md` |
| Skill Creator | `создай skill`, `упакуй workflow`, `сделай reusable process` | A repeated process should become a reusable skill/workflow, after checking `systems/active-skill-map.md` first. | `systems/skill-creator-mode.md` |
| Last 30 Days / Recent Research | `last30days`, `свежий ресерч`, `за последние 30 дней` | Fresh tools, releases, products, GitHub discussions, APIs, or market options may have changed recently. | `systems/recent-research-mode.md` |

## Default behavior without an explicit mode

- For normal project work, use `systems/agent-rules.md` and `systems/autonomous-project-executor.md`.
- `/planner`, `/delivery`, `/audit`, `/audit-ui`, `/audit-sale`, `/audit-fin`, `/critic`,
  and `/improve` start with `/context-scout` preflight from
  `systems/context-scout-mode.md`.
- For abstract, risky, or unclear tasks that need an execution prompt, use
  `/planner` before writing the final `/delivery` prompt.
- For clear tasks, write the technical `/delivery` prompt directly using
  `systems/chatgpt-delivery-prompt-standard.md`.
- For broad improvement discovery or issue reconciliation, use `/improve`
  before writing delivery-ready follow-up tasks.
- For system/harness/rules improvements, use `/upgrade`; do not mix it with
  product implementation unless routed into `/delivery`, `/audit-ui`,
  `/audit-fin`, or `/safe`.
- Do not create `/prompt-audit`; prompt strength is part of the default
  ChatGPT delivery prompt standard.
- For UI audit or polish work, use `systems/audit-ui.md` and include browser
  verification in the plan when a dev server, preview, or live URL is available.
- For long or multi-session tasks, produce a handoff summary at the end.

## Obsidian note

Do not make Obsidian the default memory source. The canonical project memory is GitHub `ai-projects-brain`.
Use Obsidian only when the user explicitly asks to save or sync notes into a vault.
