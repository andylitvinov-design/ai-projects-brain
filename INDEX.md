# AI Projects Brain — Master Index

> Главная точка входа для человека и ИИ. Этот файл должен оставаться коротким, актуальным и ссылаться на канонические источники, а не дублировать их.

## 1. Найти проект

- Human project catalog: `projects/index.md`
- Machine-readable catalog: `projects.json`
- Extended inventory: `projects.md`
- Generated/search-oriented index: `data/project-index.json`

Поиск проекта всегда начинается с `projects/index.md` или `projects.json`, затем открывается только capsule выбранного проекта.

## 2. Память конкретного проекта

Для каждого активного проекта предпочтительна структура:

- `projects/<slug>/PROJECT.md` — паспорт, canonical repo, live URL, статус и назначение.
- `projects/<slug>/CODEX_BRIEF.md` — короткая навигация для Codex.
- `projects/<slug>/STATE.md` — только текущее подтверждённое состояние.
- `projects/<slug>/SYSTEM_MAP.md` — архитектура и связи.
- `projects/<slug>/CHECKS.md` — точные проверки.
- `projects/<slug>/RISKS.md` — production, auth, data и operational risks.
- `projects/<slug>/DECISIONS.md` — устойчивые решения и причины.
- `projects/<slug>/LOG.md` — датированная история, не текущая истина.

Не каждый файл обязателен для каждого проекта. Отсутствующие ключевые файлы фиксируются в еженедельном аудите.

## 3. Управляющий контур ИИ-системы

- `governance/INDEX.md` — карта второго контура.
- `governance/CURRENT.md` — текущее состояние ИИ-системы.
- `governance/GOALS.md` — цели и приоритеты.
- `governance/AUTOMATIONS.md` — действующие автоматизации, владельцы и дубли.
- `governance/EFFICIENCY.md` — метрики эффективности и token/context health.
- `governance/WEEKLY-LEARNINGS.md` — ключевые ошибки, уроки и изменения по неделям.

## 4. Общие системные правила

- `START-HERE-FOR-AGENTS.md` — диспетчерский вход.
- `systems/agent-rules.md` — общие правила.
- `systems/codex-project-workflow.md` — рабочий процесс Codex.
- `systems/codex-token-efficiency.md` — минимальный контекст и бюджет.
- `systems/codex-efficiency-telemetry.md` — измерение исполнения.
- `systems/weekly-brain-refresh.md` — субботнее обновление базы и индексов.

## 5. Быстрый поиск

Ищи в таком порядке:

1. Название, URL или repo в `projects/index.md` / `projects.json`.
2. Текущее состояние в `projects/<slug>/STATE.md`.
3. Архитектуру в `SYSTEM_MAP.md`.
4. Проверки в `CHECKS.md`.
5. Решения в `DECISIONS.md`.
6. Историю только при необходимости — в `LOG.md`.
7. Общесистемные ошибки и эффективность — в `governance/`.

## 6. Freshness contract

Еженедельное субботнее обновление должно:

- сверить каталог с доступными GitHub-репозиториями и активной работой;
- добавить отсутствующие проекты или пометить `needs verification`;
- обновить status, canonical repo, live target и ключевые блокеры;
- убрать расхождения между human и machine indexes;
- обновить управляющий контур;
- проверить битые ссылки, дубли, устаревшие маршруты и слишком длинные briefs;
- записать дату последнего успешного обновления и непроверенные источники.

Правило: полнота каталога не должна достигаться ценой выдуманных данных. Неуверенные факты маркируются `needs verification`.
