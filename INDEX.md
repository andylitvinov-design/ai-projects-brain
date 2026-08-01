# AI Projects Brain — Master Index

> Главная точка входа для человека и ИИ. Файл остаётся коротким и ссылается на канонические источники вместо дублирования их содержимого.

Last reconciled: `2026-08-01`

## 1. Найти проект

- Current human routing index: `projects/index.md`
- Current machine-readable active overlay: `projects/portfolio-registry.json`
- Detailed project capsules: `projects/<slug>/PROJECT.md`
- Historical extended inventory: `projects.md`
- Historical machine database: `projects.json`
- Generated/search-oriented legacy index: `data/project-index.json`

Поиск текущего активного проекта начинается с `projects/index.md` или `projects/portfolio-registry.json`, затем открывается capsule выбранного проекта. `projects.md`, `projects.json` и `data/project-index.json` используются для исторической непрерывности и помечены `needs_revision`, пока не пройдут полевую сверку.

## 2. Память конкретного проекта

Предпочтительная структура:

- `PROJECT.md` — назначение, canonical repo/live, статус и durable boundaries.
- `CODEX_BRIEF.md` — короткая навигация для Codex.
- `STATE.md` — только текущее подтверждённое состояние.
- `SYSTEM_MAP.md` — архитектура и связи.
- `CHECKS.md` — точные проверки.
- `RISKS.md` — production, auth, data и operational risks.
- `DECISIONS.md` — устойчивые решения и причины.
- `LOG.md` — датированная история, не текущая истина.

Не каждый файл обязателен. Отсутствующие ключевые capsules фиксируются как `needs verification`, а не заполняются догадками.

## 3. Управляющий контур

- `governance/INDEX.md` — карта durable governance.
- `governance/CURRENT.md` — текущее состояние системы.
- `governance/GOALS.md` — цели, владельцы и next actions.
- `governance/AUTOMATIONS.md` — роли, ownership и overlap checks.
- `governance/EFFICIENCY.md` — недельные и текущие efficiency signals.
- `governance/WEEKLY-LEARNINGS.md` — агрегированные ошибки и уроки.

`brain-management` остаётся operational control plane; `ai-projects-brain` остаётся durable source of truth.

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
2. Durable current project state — `projects/<slug>/PROJECT.md` и `STATE.md`.
3. Архитектура — `SYSTEM_MAP.md`.
4. Проверки — `CHECKS.md`.
5. Решения — `DECISIONS.md`.
6. История — `LOG.md` только при необходимости.
7. Общесистемная эффективность, ownership и уроки — `governance/`.

## 6. Freshness contract

Weekly Brain Refresh должен:

- сверять current active overlay с доступными GitHub/live evidence;
- исправлять canonical repo/live/status и aliases;
- добавлять подтверждённые активные проекты или помечать `needs verification`;
- устранять дубли идентичности и stale sync state;
- агрегировать недельные уроки, не копируя daily receipts;
- обновлять compact human/machine routing;
- сохранять legacy inventories до безопасной полевой сверки;
- фиксировать непроверенные источники.

Полнота не достигается ценой выдуманных данных. Более свежая verified live/GitHub evidence и project capsule имеют приоритет над stale legacy index.
