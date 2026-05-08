# START HERE FOR AGENTS

> Главный диспетчерский вход для ChatGPT/Codex/Agent-Projector.  
> Цель: быстро определить проект, прочитать минимум релевантного контекста и не трогать лишние репозитории.

## 1. Как работать агенту

1. Сначала читать этот файл.
2. Потом открыть `projects/index.md`.
3. Найти нужный `project_key` по словам пользователя.
4. Читать только файлы этого проекта:
   - `PROJECT.md`
   - `STATE.md` если есть
   - `SYSTEM_MAP.md`
   - `CODEX_BRIEF.md`
   - `LOG.md` если есть
   - `CHECKS.md` / `DECISIONS.md` если есть
5. Если задача про код — открыть canonical GitHub repo из `PROJECT.md` или `projects/index.md`.
6. Если задача про production — проверить live URL, `/api/status`, `/api/audit-snapshot` или другие checks, если они указаны.
7. Если данных нет — писать `needs verification`, не угадывать.

## 2. Что нельзя делать

- Не менять secrets/env values.
- Не добавлять реальные токены, ключи, cookies, refresh tokens.
- Не путать похожие репозитории.
- Не использовать legacy/deprecated repo как production source без явного подтверждения.
- Не делать вывод о live-состоянии только по коду.
- Не смешивать разные проекты в одну задачу.

## 3. Что можно делать автономно

Если задача явно про код или документы и нет запрета:

- create branch;
- update file;
- push;
- create PR;
- add docs/checks;
- update project memory.

Не спрашивать отдельного подтверждения для `create branch / push / update file`, если действие в безопасном scope и не затрагивает secrets/env.

## 4. Как выбирать источник истины

Приоритет:

1. `projects/index.md` — быстрый диспетчер и project_key.
2. `projects/<project_key>/PROJECT.md` — паспорт проекта.
3. `projects/<project_key>/STATE.md` — текущее состояние, если есть.
4. `projects/<project_key>/SYSTEM_MAP.md` — архитектура.
5. `projects/<project_key>/CHECKS.md` — как проверять.
6. Repo-local `README.md`, `AGENTS.md`, `STATE.md`, tests, deploy docs.
7. Live endpoints / deploy status, если задача про production.

`projects.md`, `projects.json`, `data/project-index.json` остаются дополнительными human/machine inventories.

## 5. Типы проектов

Использовать `type` из `projects/index.md`:

- `app` — приложение, нужны код, проверки, deploy.
- `site` — сайт, важны UI/content/deploy.
- `course` — курс/обучение, важны структура, контент, UX.
- `method` — методология/знания, важны тексты и структура.
- `infra` — инфраструктура, routing, bridge, agents, dashboards.
- `archive` — не трогать без явного запроса.

## 6. Agent Entry rule

Если пользователь пишет про:

- психотерапевт, терапевтический агент, Profile, профиль Andrey → `psychotherapist`.
- финансы, ledger, PayPal, Wise, Яндекс, баланс, план/факт → `ezohata-incoming-ledger`.
- Codex Links, Slack bridge, Codex Cloud, dispatch, commands → `codex-links`.
- dashboard, thinking, daily changes, management reports → `brain-management`.
- Reiki Yggdrasil, masters, profile, admin, Supabase → `reiki-yggdrasil`.
- artefacts, артефакты, marketplace → `artefacts`.
- сама база проектов, память, Project Brain → `ai-projects-brain`.

## 7. После выполнения задачи

После значимой работы:

1. Сообщить changed files.
2. Сообщить checks/verification.
3. Сообщить risks/needs verification.
4. Предложить или выполнить обновление project memory:
   - `STATE.md`
   - `LOG.md`
   - `CHECKS.md`
   - `DECISIONS.md`

## 8. Главная формула

**Сначала project_key → потом только его capsule → потом repo/live checks → затем минимальное безопасное действие → затем memory update.**
