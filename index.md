# AI Projects Brain — карта существующей базы

> **Единый навигационный вход** для агентов и человека. Это ссылки на оригинальные файлы и папки, а не второй проектный реестр. Подробный исторический обзор: [INDEX.md](INDEX.md).

## Быстрые маршруты

| Что ищем | Где читать |
| --- | --- |
| Проект по названию, alias или репозиторию | [Проекты: диспетчер](projects/index.md) → [активный реестр](projects/portfolio-registry.json) → выбранная папка |
| Правила для нового агента | [START-HERE-FOR-AGENTS.md](START-HERE-FOR-AGENTS.md) → [AGENTS.md](AGENTS.md) |
| Память Agent Commander | [START_HERE.md](projects/agent-commander/START_HERE.md) → [STATE.md](projects/agent-commander/STATE.md) → [TASK_CONTEXT.md](projects/agent-commander/TASK_CONTEXT.md) |
| PR / CI / Merge / LIVE | [GLOBAL_PR_ONE_PUBLISH_V1](systems/pr-one-publish-standard.md) → [проверки Commander](projects/agent-commander/CHECKS.md) |
| Решения, повторные ошибки и обучение | [решения Commander](projects/agent-commander/DECISIONS.md) → [риски Commander](projects/agent-commander/RISKS.md) → [общая память агентов](agent-memory/index.md) |

## Разделы, которые уже существуют

| Раздел | Что хранится | Основная ссылка |
| --- | --- | --- |
| **projects/** | Проектные капсулы: паспорт, состояние, архитектура, решения, тесты, лог. Agent Commander — одна из капсул, а не отдельная база. | [projects/index.md](projects/index.md), [Agent Commander](projects/agent-commander/START_HERE.md), [Holistic House](projects/holistic-house/PROJECT.md) |
| **systems/** | Общие правила безопасности, проектной памяти, планирования, Codex и единой PR-публикации. | [agent-rules.md](systems/agent-rules.md), [project-capsule-standard.md](systems/project-capsule-standard.md), [pr-one-publish-standard.md](systems/pr-one-publish-standard.md) |
| **agent-memory/** | Общая память об ошибках, воспроизводимых практиках и обучении агентов, без привязки к одному проекту. | [index.md](agent-memory/index.md), [active.md](agent-memory/active.md) |
| **agent-skills/** | Набор уже созданных навыков обновления памяти, анализа ошибок, улучшения агентов. | [memory.md](agent-skills/memory.md), [learn-pass.md](agent-skills/learn-pass.md) |
| **governance/** | Цели, владение автоматизациями, текущие контрольные снимки, эффективность, уроки. | [INDEX.md](governance/INDEX.md), [CURRENT.md](governance/CURRENT.md), [AUTOMATIONS.md](governance/AUTOMATIONS.md) |
| **knowledge/** | Короткие связи между концептами; пилотная, неканоническая подсказка к оригиналам. | [knowledge/index.md](knowledge/index.md) |
| **prompts/** | Примеры и инструкции для ChatGPT/Codex, которые переиспользуются между проектами. | [chatgpt-agent-instructions.md](prompts/chatgpt-agent-instructions.md), [codex-build.md](prompts/codex-build.md) |
| **templates/** | Шаблоны паспорта проекта, безопасности, задачи, системной карты и брифа. | [PROJECT.template.md](templates/PROJECT.template.md), [task-intake-template.md](templates/task-intake-template.md) |
| **scripts/ + tests/** | Валидаторы, индексаторы, фикстуры, проверка целостности знаний. | [validate-projects-brain.mjs](scripts/validate-projects-brain.mjs), [sync-project-index.mjs](scripts/sync-project-index.mjs), [тесты](tests/) |
| **tools/** | Существующие инструменты AI Council и Holistic Browser Agent; они не заменяют базу памяти. | [ai-council-chat](tools/ai-council-chat/), [holistic-browser-agent](tools/holistic-browser-agent/) |
| **andrey-system/ + system/** | Ранее подготовленные системные инструкции/шаблоны, не новая структура Commander. | [andrey-system/README.md](andrey-system/README.md), [system/README.md](system/README.md) |
| **data/** и корневые **projects.json / projects.md** | Исторические/генерируемые индексы для совместимости, потенциально устаревшие. | [data/project-index.json](data/project-index.json), [projects.json](projects.json), [projects.md](projects.md) |
| **.codex/ + .github/** | Кодекс-отчётность и существующие GitHub workflows; не переносить в проектные капсулы. | [CLOUD_TASK_REPORTING.md](.codex/CLOUD_TASK_REPORTING.md), [workflows](.github/workflows/) |

## Как работать, не плодя копии

1. Начать с [правил агентов](START-HERE-FOR-AGENTS.md) и [диспетчера проектов](projects/index.md), определить один `project_key`.
2. Открывать **только нужную** проектную папку, например [Agent Commander](projects/agent-commander/START_HERE.md). Контекст задачи — [TASK_CONTEXT.md](projects/agent-commander/TASK_CONTEXT.md), проверка — [CHECKS.md](projects/agent-commander/CHECKS.md), решения — [DECISIONS.md](projects/agent-commander/DECISIONS.md).
3. Общие алгоритмы оставлять в [systems/](systems/) и [agent-memory/](agent-memory/index.md): в `projects/agent-commander/` хранить лишь проектные особенности и **ссылки** на общие правила.
4. Текущие PR/CI/деплой проверять по свежим источникам, а не по датированным `STATE.md` или старому `portfolio-registry.json`; неизвестное обозначать `needs verification`.
5. Приватные чаты, клиентские данные, токены, финансовую/медицинскую информацию в этот публичный репозиторий не записывать.

**Дополнительно:** [README.md](README.md) — описание репозитория; [INDEX.md](INDEX.md) — подробная прежняя карта; [CURRENT-FOCUS.md](CURRENT-FOCUS.md) — датированный фокус.
