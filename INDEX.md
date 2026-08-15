# AI Projects Brain — Master Index

> Главная точка входа для человека и ИИ. Индексы остаются короткими и направляют к каноническим durable-источникам вместо копирования состояния.

Last reconciled: `2026-08-15`

## 1. Найти проект

- Current human routing: `projects/index.md`
- Current machine active overlay: `projects/portfolio-registry.json`
- Current compact machine catalog + repository inventory: `projects.json`
- Search-oriented machine index: `data/project-index.json`
- Detailed capsules: `projects/<slug>/PROJECT.md`
- Human catalog summary: `projects.md`

Поиск активного проекта начинается с `projects/index.md` или `projects/portfolio-registry.json`, затем открывается capsule. Текущая GitHub-инвентаризация содержит 30 доступных owner repositories; она хранится отдельно от 10-проектного active overlay, чтобы вспомогательные, backup и bootstrap repositories не становились активными продуктами автоматически.

## 2. Память конкретного проекта

- `PROJECT.md` — назначение, canonical repo/live, текущий durable status и boundaries.
- `STATE.md` — только подтверждённое текущее состояние.
- `SYSTEM_MAP.md` — архитектура и связи.
- `CHECKS.md` — точные проверки.
- `RISKS.md` — production/auth/data/operational risks.
- `DECISIONS.md` — устойчивые решения и причины.
- `LOG.md` — датированная история, не текущая истина.
- `CODEX_BRIEF.md` — короткая навигация для Codex.

Неподтверждённые repo/live/provider факты остаются `NEEDS_VERIFICATION`; историческая ссылка не считается текущей canonical mapping без свежей reachability evidence.

## 3. Управляющий контур

- `governance/INDEX.md` — карта durable governance.
- `governance/CURRENT.md` — что подтверждено сейчас.
- `governance/GOALS.md` — цели, владельцы и next actions.
- `governance/AUTOMATIONS.md` — фактические scheduler roles, ownership и gaps.
- `governance/EFFICIENCY.md` — immutable weekly scorecards и текущая evidence-backed synthesis.
- `governance/WEEKLY-LEARNINGS.md` — агрегированные ошибки, причины и reusable lessons.
- `governance/durable-root-cause-candidate-2026-08-15.json` — один machine-readable кандидат для следующего ranking scan.

`brain-management` остаётся operational control plane. `ai-projects-brain` остаётся durable source of truth. Operational stale/fail-closed state не переписывается здесь как healthy только потому, что более ранний deployment когда-то был `LIVE_VERIFIED`.

## 4. Общие правила

- `START-HERE-FOR-AGENTS.md`
- `systems/management-control-plane-contract.md`
- `systems/agent-rules.md`
- `systems/codex-project-workflow.md`
- `systems/codex-token-efficiency.md`
- `systems/codex-efficiency-telemetry.md`
- `systems/weekly-brain-refresh.md`

## 5. Быстрый поиск

1. Название, alias, URL или repo — `projects/index.md` / `projects/portfolio-registry.json`.
2. Полный owner-repository inventory — `projects.json` / `data/project-index.json`.
3. Durable current project state — `projects/<slug>/PROJECT.md` и `STATE.md`.
4. Архитектура/проверки — `SYSTEM_MAP.md` / `CHECKS.md`.
5. Решения/история — `DECISIONS.md` / `LOG.md`.
6. System ownership, goals, efficiency and lessons — `governance/`.

## 6. Freshness and identity contract

Weekly Brain Refresh должен:

- сверять active overlay с текущей GitHub/live/provider evidence;
- отдельно перечислять доступные repositories и активные product identities;
- исправлять stale repo/live/status aliases без повышения uncertainty до факта;
- переводить недоступную historical mapping в `NEEDS_VERIFICATION`, а не сохранять её как active canonical fact;
- считать production verification time-bound: если operational guard позже fail-closed, durable CURRENT должен отражать деградацию;
- сверять фактический scheduler с durable automation registry;
- агрегировать недельные уроки, не копируя daily receipts;
- сохранять предыдущие версии через Git history и capsules;
- не превращать diagnostic/probe deployment projects в canonical products.

Evidence precedence: verified live behavior → current GitHub/provider evidence → immutable Brain Management history → capsule → routing/index metadata.