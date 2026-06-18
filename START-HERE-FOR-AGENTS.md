# START HERE FOR AGENTS

> Главный диспетчерский вход для ChatGPT/Codex/Agent-Projector.  
> Цель: быстро определить проект, прочитать минимум релевантного контекста и не трогать лишние репозитории.

## 0. Стандарт качества мышления

Перед дебагом, созданием промптов, управлением Codex/ботами, PR review или production-работой агент должен применять общий стандарт качества:

- Agent Thinking Quality Standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-thinking-quality-standard.md
- Bot Quality Standard Usage Guide: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/bot-quality-standard-usage.md
- Production Debug Protocol: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md
- Delivery Auth Boundary Standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/delivery-auth-boundary-standard.md
- Claude Code Prompt Standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md
- Codex Goal Prompt Standard: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-goal-prompt-standard.md

Короткое правило: **сначала доказать failing layer, затем делать минимальное безопасное действие.**

Если задача касается `/delivery`, production verification, live-check, Google OAuth, Supabase/private auth или кабинетов за логином, агент обязан применять `systems/delivery-auth-boundary-standard.md`: ожидаемый auth-boundary не является ошибкой delivery; допустимый финал — `STATUS: SUCCESS_WITH_AUTH_LIMITATION`.

Если пользователь просит создать промпт для Claude Code, ChatGPT обязан сначала применить `systems/claude-code-prompt-standard.md`: low-token режим, одна задача, staged workflow, `/clear`, без broad repo scan, без полного аудита и без длинного стартового контекста.

Если пользователь просит создать или исправить Codex `/goal`, Debugger goal, autonomous repair goal или production fix goal, ChatGPT/Agent-Projector обязан сначала применить `systems/codex-goal-prompt-standard.md`: `/goal` должен быть коротким execution contract, а не длинным отчётом, чатом или vague-задачей.

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
   - `CLAUDE_CODE_PROMPTS.md` если задача — создать или оптимизировать промпт для Claude Code
5. Если задача про код — открыть canonical GitHub repo из `PROJECT.md` или `projects/index.md`.
6. Если задача про production — проверить live URL, `/api/status`, `/api/audit-snapshot` или другие checks, если они указаны.
7. Если production/live проверка упирается только в ожидаемый Google/Supabase/private auth-boundary, не считать это ошибкой: применить `STATUS: SUCCESS_WITH_AUTH_LIMITATION` при наличии safe proof по стандарту.
8. Если данных нет — писать `needs verification`, не угадывать.

## 2. Что нельзя делать

- Не менять secrets/env values.
- Не добавлять реальные токены, ключи, cookies, refresh tokens.
- Не запрашивать и не использовать реальные Google/Supabase/private auth credentials для проверки live кабинетов.
- Не путать похожие репозитории.
- Не использовать legacy/deprecated repo как production source без явного подтверждения.
- Не делать вывод о live-состоянии только по коду.
- Не смешивать разные проекты в одну задачу.
- Не создавать для Claude Code огромные промпты “проверь всё / исправь всё / задеплой всё” вместо staged workflow.
- Не создавать для Codex `/goal` расплывчатые задачи “исправь всё / проверь всё / задеплой всё”; `/goal` должен иметь один результат, source of truth, boundaries и definition of done.

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
6. `systems/delivery-auth-boundary-standard.md` — обязательный общий стандарт для `/delivery`, live verification и auth-gated production checks.
7. `systems/claude-code-prompt-standard.md` — обязательный общий стандарт, когда нужно написать промпт для Claude Code.
8. `systems/codex-goal-prompt-standard.md` — обязательный общий стандарт, когда нужно написать или исправить Codex `/goal`.
9. `projects/<project_key>/CLAUDE_CODE_PROMPTS.md` — проектные правила для Claude Code промптов, если такой файл есть.
10. Repo-local `README.md`, `AGENTS.md`, `STATE.md`, tests, deploy docs.
11. Live endpoints / deploy status, если задача про production.

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

Для `/delivery` формула: **ожидаемый auth-boundary не равен ошибке; public/login/deploy/local-or-code proof могут дать `STATUS: SUCCESS_WITH_AUTH_LIMITATION`.**

Для Claude Code промптов формула отдельная: **сначала `claude-code-prompt-standard.md` → затем проектный `CLAUDE_CODE_PROMPTS.md` → затем короткий staged prompt: diagnose → inspect → patch → test → verify.**

Для Codex `/goal` формула отдельная: **сначала `codex-goal-prompt-standard.md` → затем проектный capsule/CODEX_BRIEF → затем короткий execution contract: one outcome → source of truth → investigation scope → boundaries → definition of done → checks → final report.**
