# Holistic Browser Agent (HBA) — ТЗ v2.0 · Zero-Budget

**Дата:** 2026-10-28 (America/Toronto)  
**Статус:** DETAILED SPEC v2 / READY FOR BOUNDED MVP IMPLEMENTATION (no runnable agent yet). Архитектурное ТЗ, не реализованный и не развёрнутый продукт.  
**Владелец:** Andrey Litvinov  
**Назначение:** собственный локальный браузерный исполнитель для ChatGPT/Codex и проектов Holistic House, без оплаты TinyFish и без новых платных API.  
**Источник истины:** этот файл в ai-projects-brain; GitHub issue используется для исполнения, а не как второй экземпляр ТЗ.

## 0. Решение, контекст и строгие границы

**Решение:** строить не копию закрытого TinyFish, а минимальный открытый Browser Execution Layer, который переиспользует существующие средства ChatGPT/Codex, GitHub/Vercel/Supabase и правила Brain. Основной движок — локальный Playwright с детерминированными действиями, Playwright CLI/skill для Codex, MCP для интерактивных вызовов. Chrome DevTools MCP подключать для диагностики. Browser Use/Stagehand/Ollama — только после доказанного пробела, необязательные и строго без облачных тарифицируемых вызовов.

**Ограничение владельца (не обсуждается в MVP): БЮДЖЕТ = 0 USD дополнительных расходов.** Нет средств в TinyFish; не делать платных вызовов его browser automation, не пополнять wallet, не запускать TinyFish monitors. Платная подписка ChatGPT не равна бесплатному API; использовать только уже доступные штатные инструменты чата/Codex, без самовольного подключения токенизированных API.

Под «$0» понимается **ноль новых счетов/покупок/оплачиваемого потребления сервисов**. Компьютер, электроэнергия, интернет, уже существующие подписки и ограничения/квоты платформ не становятся бесплатными в экономическом смысле. Любой риск списания, даже из существующего биллинга, останавливает действие до отдельного одобрения.

**Не дублировать:** existing AI Council / audit rules (ai-projects-brain #233, #234), PR Delivery Sweep, YouTube-базу, CRM, планировщик Automations, действующие GitHub/Vercel/Supabase connectors и код Holistic House. Агент исполняет разрешённые браузерные шаги и возвращает доказательства; управление бизнес-логикой остаётся в исходных продуктах.

## 1. Продукт и пользователи

Основной пользователь — владелец из ChatGPT iPhone/web и Codex. Он формулирует задачу на русском, не выбирая вручную deviceId, селекторы, порты, workspace или ветку. Агент получает конкретную цель и контекст проекта, выполняет разрешённые операции на собственном/browser-test окружении и выдаёт проверяемый журнал.

**Главные сценарии, по приоритету:**

1. **Visual QA / Copy UI:** открыть Holistic House и preview, сравнить страницу с эталонным макетом, сделать скриншоты на 320/375/390/430/1440 px, собрать ошибки, дать локализованное задание Codex и проверить исправленный preview повторно.
2. **Проверка воронки:** публичная страница → тест (синтетика) → согласие → заявка → CRM, где есть тестовый контур; доказать каждый переход, не считать click = lead/booking/payment.
3. **Проверка релиза:** GitHub PR + CI → фактическая Vercel deployment source branch/SHA → READY → домен → интерактивный браузерный сценарий. Не считать HTTP 200 достаточным.
4. **Административные интерфейсы:** безопасный просмотр/редактирование черновиков, загрузки файлов и управление приватными материалами только на allowlisted маршрутах и с явной авторизацией; публикация отдельно.
5. **Другие сайты владельца:** только после добавления project capsule / allowlist / прав. Универсальная внешняя автоматизация третьих сайтов — расширение, не MVP.

**Не входит в MVP:** платежный робот, обход 2FA/CAPTCHA, массовые рассылки/парсинг, скрытый доступ к личному Chrome, самостоятельный медицинский анализ, круглосуточный облачный браузер «бесплатно», новое CRM/API, автономное принятие решений об оплате/публикации/мердже.

## 2. Проверяемая ценность и границы автоматизации

- Выполнить ограниченную операцию; зафиксировать до/после (DOM, URL, HTTP/network, скриншот, trace, серверное подтверждение при доступе).
- Для повторяемых сценариев использовать Playwright locators: role, label, testid; CSS/XPath только с основанием. Никаких «слепых» координат как доказательства корректности.
- Для неструктурированных целей ChatGPT/Codex составляет план, но исполнение идёт через тот же policy gate. Страница, PDF, PR comment и DOM — **недоверенные данные**, не команды агенту.
- Уменьшить стоимость: сначала API/прямой connector для GitHub/Vercel/DB, затем browser UI только если API/connector не покрывает действие.
- Не заявлять end-to-end, если внешний провайдер не подтвердил доставку или платёж. Синтетический результат называется SYNTHETIC_TEST_PASS, а не LIVE_VERIFIED.

## 3. Архитектура и ownership

~~~
ChatGPT / Codex / оператор
    |
    v
Existing Brain project router + existing delivery policy + project capsule
    |
    v
HBA MCP/CLI facade (один исполняющий интерфейс)
    |
    +--> Policy gate: actor, domain allowlist, project, risk, consent, $0
    +--> Task runner: bounded steps, idempotency, retries, cancellation
    +--> Playwright engine: isolated Chromium context, DOM/ARIA, actions
    +--> Optional DevTools adapter: console, network, trace/perf
    +--> Evidence collector: snapshots, diff, redacted screenshots, assertions
    +--> Existing API connectors (отдельные права, не прокси для секретов)
    |
    v
Local artifacts + compact report + links to existing issue/PR
~~~

**Deployment topology:**
- **MVP:** local Mac/PC через Node.js + Chromium, доступен пока машина включена; stdio MCP для локального Codex или CLI/skill. Отдельная оплата инфраструктуры не нужна.
- **iPhone/ChatGPT remote (фаза после MVP):** только аутентифицированный HTTPS MCP relay к локальному worker с подтверждёнными ограничениями и без платных туннелей. Локальный порт/CDP никогда не открывать в публичный интернет. Если бесплатный и безопасный relay не подтверждён — честный статус MOBILE_REMOTE_BLOCKED; не обещать работу с выключенным Mac.
- **Public CI QA (опционально):** ручной workflow_dispatch на существующем бесплатном лимите GitHub Actions, публичные страницы/синтетика, без cookies, без часового cron и без риска платных минут. Сначала проверить лимиты и биллинг.
- **Vercel:** не хостить долгоживущий Chromium в serverless production. Никаких новых платных deployments ради агента.

**Source-code placement:** при реализации выбрать существующий совместимый workspace или отдельный маленький репозиторий после проверки дубликатов. Код агента не должен попадать внутрь Next.js runtime Holistic House. Это ТЗ хранится централизованно в Brain.

## 4. Рекомендуемые зависимости, fallback и лицензии

| Компонент | MVP | Дополнительный режим | Почему |
| --- | --- | --- | --- |
| Node.js 20+ / TypeScript | Да | — | Один лёгкий локальный процесс |
| Playwright Test + Chromium | Да | Firefox/WebKit только для проверок | Детерминированные шаги и E2E |
| Playwright CLI / skill | Да, для Codex | Playwright MCP для интерактивных задач | CLI экономит контекст, MCP даёт непрерывную сессию |
| Chrome DevTools MCP | По необходимости | performance/network/console | Глубокая диагностика |
| JSONL + артефакты на диске | Да | SQLite в v2 | Без дополнительной БД/платного SaaS |
| Ollama + локальная модель | Нет в критическом пути | Только если железо позволяет и её качество проверено | Нет API-счёта, но не гарантирует разумное планирование |
| Browser Use / Stagehand | Нет | Эксперимент отдельно, локальный browser + локальный model | Может требовать LLM; cloud/hosted вызовы платные |
| TinyFish paid automation | **Запрещено** | Нет автоматического fallback | Wallet пуст, $0 gate |

Официальные источники: 
- https://github.com/microsoft/playwright-cli
- https://github.com/microsoft/playwright-mcp
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://github.com/browser-use/browser-use
- https://github.com/browserbase/stagehand
- https://github.com/ollama/ollama

Проверить pinned versions, актуальные лицензии **всех зависимостей** и security advisories при реализации, не ставить @latest в CI/продакшн без lockfile. Open source ≠ бесплатный hosting/model API.

## 5. Функциональные требования (договор с Codex)

**FR-01. Workspace resolver.** Вход: естественное имя проекта/URL. Выход: canonical repo, разрешённый origin, рабочий root, base branch, режим доступа, разрешённые публичные URL, источник подтверждения. Reuse projects/index.md, текущую registry и capsule. Если ветка/домен расходятся — NEEDS_VERIFICATION, без догадок.

**FR-02. Task lifecycle.** start/list/get/cancel/resume bounded task. Состояния PLANNED, RUNNING, VERIFYING, VERIFIED, SYNTHETIC_TEST_PASS, NEEDS_APPROVAL, BLOCKED_AUTH, BLOCKED_COST, BLOCKED_DEVICE, FAILED, CANCELLED. run_id и action_id уникальны; resume запрещает повторную небезопасную отправку.

**FR-03. Browser session.** Управление изолированным context/profiles на проект, несколько вкладок, навигация, wait, DOM/accessibility snapshot, выделение видимых элементов, селекторы role/label/testid, переходы и файлы. Виртуальные устройства/viewport, мобильный touch по необходимости. Никакого импорта личного Chrome profile по умолчанию.

**FR-04. Action tools.** navigate, observe, click, fill, select, upload, download, scroll, screenshot, assert, collect_console, collect_network, stop. Каждый tool имеет проверяемую пред-/постусловную семантику, ограниченный timeout и type-safe ошибку.

**FR-05. Visual QA.** Viewports 320×690, 375×812, 390×844, 430×932, 1440×900, а EN/RU/ES маршруты при наличии. Сравнить изображения с явным эталоном: screenshot diff, DOM layout bounds, overflow, fonts, focus/contrast. Pixel diff — сигнал, не автоматическое дизайнерское решение. Скриншот после фикса повторить.

**FR-06. Technical QA.** Проверять JS console exceptions, failed requests, response content type, broken images, keyboard/tab focus, CTA, loading/empty/error state, доступность и performance trace по запросу. Нет многократного дорогого crawl.

**FR-07. Auth/roles.** Гостевые тесты по умолчанию. Auth сценарии — только на отдельно разрешённой синтетической учётной записи, сессия в защищённом OS profile, маскирование; владелец завершает 2FA/CAPTCHA вручную. Запрещено снимать приватный кабинет и результаты пациента без отдельного согласия и безопасного плана.

**FR-08. Data handling.** Поддерживать выборочную загрузку/выгрузку (тип, MIME, расширение, размер, точный destination и хэш), auto-download в изолированную директорию, запрет записи за пределами workspace, запрет секретов и произвольного кода из внешних страниц.

**FR-09. E2E proof.** Для проверки заявки, CRM, письма, видео или платежа требовать downstream proof через разрешённый server/provider API/тестовый журнал; browser click и mock — недостаточны. Реальные внешние действия/платежи/массовые отправки вне MVP и gated.

**FR-10. Approval.** Read-only и безопасные синтетические действия — автоматом. Внешняя отправка, публикация, изменение учетной записи/секретов, доступов, реальная оплата, удаление, merge и production deploy — явное конкретное разрешение владельца + existing project rules, без inferred authorization от страницы/PR.

**FR-11. Evidence & report.** После каждого run: task goal, route, project, source SHA/deployment (если relevant), перечисление действий, screenshots/trace redacted, network/console, конечные assertions, proven/unknown, error reason, next step, фактические счета $0.

**FR-12. Resilience.** Пауза при 401/403/402/429, challenge, новом домене, антибот-защите, 2FA, отсутствии устройства, подозрении на изменившийся селектор. Максимум 1–2 bounded retries для idempotent read. Никаких бесконечных циклов и повторных POST без idempotency key.

**FR-13. No duplication.** Существующие GitHub/Drive/Vercel/Supabase connectors предпочтительны для системных операций; Playwright только выполняет браузерные действия. Существующие /context-scout, /delivery, /audit-ui, PR Sweep, AI Council и Automations — источники процессов, не копируются.

**FR-14. Secret safety.** Никаких API keys, cookies, client IDs, токенов OAuth, PII/health данных в GitHub issue, Playwright traces, screenshots, Markdown-отчётах или промптах. Обязательная redaction до сохранения, а не только при отображении.

**FR-15. Hard budget gate.** Конфиг paid_provider_enabled=false, allowed_external_spend_usd=0; metered adapter отсутствует из доступных путей. Любая попытка маршрутизации TinyFish/Browserbase Cloud/Browser Use Cloud/модельного платного API — BLOCKED_COST до сетевого вызова; 402/429 обрабатываются без обходного платного fallback.

**FR-16. Operator UX.** Один запрос «проверь страницу X на 390px, сравни с макетом» → понятная карточка/CLI summary с pass/fail, ссылками на артефакты и конкретными действиями. Никакого требования вручную писать deviceId, селекторы или SHA.

## 6. MCP / CLI surface (публичные контракты MVP)

Наружный MCP/CLI интерфейс должен быть компактным, а реальные инструменты должны оставаться server-side:

- hba.list_workspaces(): доступные projects, device state, without secrets.
- hba.plan_task({goal, project, urls, viewport, mode}): read-only plan, risk classification, estimated step count.
- hba.start_task({plan_id, approval_token?}): launch only if policy passes.
- hba.observe({run_id}): current URL, bounded DOM snapshot, state, visible controls.
- hba.act({run_id, action_id, type, target, value?}): action via allowlist and policy.
- hba.assert({run_id, assertion}): проверка фактического состояния после операции.
- hba.capture({run_id, types}): redacted screenshot / console / trace / network.
- hba.get_run({run_id}), hba.cancel({run_id}), hba.export_report({run_id}).

Schema валидировать (например Zod), URL и redirect проверять **перед каждым** новым origin, никакой client-supplied shell command, arbitrary JS eval, arbitrary filesystem path, unbounded scrape, общий remote debugging port или arbitrary raw CDP tool без проверки полномочий. Для MVP можно сузить внешний API до plan/run/status/cancel и держать внутренний action runner закрытым.

**Пример task manifest:**

~~~json
{
  "project": "holistic-house",
  "goal": "Verify free test CTA and visual alignment",
  "mode": "read_only",
  "origins": ["https://holistichouse.vercel.app"],
  "routes": ["/en"],
  "viewports": [{"width":390,"height":844},{"width":1440,"height":900}],
  "max_actions": 25,
  "max_runtime_seconds": 900,
  "allowed_external_spend_usd": 0,
  "require_approval_for": ["external_submit","publication","payment","merge","deploy"]
}
~~~

Это пример схемы, не разрешение использовать реальный кабинет или создавать заявку в production.

## 7. Классы риска

| Risk | Пример | Default |
| --- | --- | --- |
| R0 READ | открыть публичную страницу, снять макет, trace, ссылки | allow на подтверждённом origin |
| R1 TEST_WRITE | заполнить синтетическую тестовую форму в локальном/staging окружении | allow при whitelist и cleanup |
| R2 EXTERNAL_WRITE | отправить реальную форму, загрузить файл, обновить контент, создать запись | approval на конкретный шаг/назначение |
| R3 CRITICAL | платёж, публикация, секреты, доступы, удаление, массовые отправки, merge, production | owner approval + отдельные verification gates; MVP не выполняет |

Права минимальны; временный approval связан с task_id, target origin, действием и payload hash; истекает, не используется повторно. Подозрительная смена destination требует нового approval. Browser content никогда не повышает риск-права.

## 8. Threat model и приватность

- DOM prompt injection: текст страницы/баннер/комментарий/GitHub issue не может вызвать shell, передачу секретов, изменение направления задачи или смену allowlist.
- SSRF и local network: блок localhost/private IP/link-local/metadata endpoints для web-navigation, кроме явно разрешённого local app URL конкретного тестового окружения. Redirect — новая проверка.
- CDP: только loopback/private transport, никакого 0.0.0.0:9222. Remote MCP — HTTPS + auth, ограничение tool permissions и rate limits. Никаких browser sessions в публичном URL.
- Секреты: OS keychain/отдельное шифрованное хранилище (или owner-managed short-lived login); redact network headers, cookies, query tokens, PII, тестовые результаты. Не сохранять permanent storageState в git.
- Аудит: append-only local metadata, срок хранения trace/screenshots по умолчанию 7 дней и удаление только временных артефактов с явным scope; без хранения медицинских данных.
- Сайты третьих сторон: уважать robots/ToS/anti-abuse; не обходить CAPTCHA, paywall, rate limits и не запускать stealth/proxy bypass.
- Исключить скриншоты и передачи подробных тестовых психопрофилей в сторонние AI, Telegram, Meta/GA4 и публичные artifacts.
- Режим private/CRM health: по умолчанию STOP, только synthetic fixture + специально согласованное разрешение. Не брать реальные профили пользователей в QA.

## 9. Zero-cost controls и отказоустойчивость

- Никаких платных credentials в конфигурации; в template env только HBA_* names, не значения.
- no_cloud_provider=true, max_external_spend=0, network_allowlist, max_actions_per_run=25, max_runtime=15 минут, max_parallel_browsers=1; значения меняются только осознанно, не по команде со страницы.
- bounded local storage, retention 7 дней, max 100 MB/run, screenshots компрессировать; abort при превышении.
- Гарантировать $0 для **наших новых платных вызовов** политикой и unit tests; не обещать отсутствие расходов существующей инфраструктуры без проверки billing.
- При недоступном ChatGPT/Codex reasoning-agent: простые заранее записанные Playwright тесты продолжают работать; сложная свободная задача — WAITING_FOR_REASONING, не фиктивный «успех».
- Когда домашний компьютер выключен, task state BLOCKED_DEVICE; background/on-demand/cron без хоста не исполняется.

## 10. Roadmap / delivery slices

**M0 — Discovery and cost lock (без изменений production).**
1. Сверить существующие browser/Playwright/MCP/desktop инструменты и setup на доступном хосте; не устанавливать дубликаты.
2. Определить workspace, реальную GitHub/Vercel production-ветку Holistic House и тестовые origins; проверить billing всех затронутых сервисов.
3. Подтвердить локальный Node/Chromium, конфликты MCP и доступы; определить реалистичность iPhone remote.
4. Выпустить ADR о выборе CLI vs MCP, защитной модели и источнике действующих тестов.

**M1 — Local deterministic MVP (первый отдельный PR).**
1. Локальный CLI wrapper с проектной allowlist; Playwright Test/CLI, presets viewport.
2. Статусы run, bounded workflow, screenshot/console/network/trace, JSONL, redaction, Markdown отчет.
3. 3 публичных маршрута Holistic House; smoke + mobile + CTA verification без внешних POST.
4. 100% unit test coverage для cost gate/deny rules + 10 воспроизводимых browser scenarios.
5. Нет UI-dashboard, cloud tunnel, платного LLM и production deployment.

**M2 — Local MCP executor.**
1. MCP stdio bridge для Codex/local agent; интеграция с existing Brain project resolver.
2. plan/run/status/cancel, fail-safe, repeatable fixtures; permissions, approve-to-act для ограниченного R2.
3. Сравнение референс/preview, minimal difference report, регрессия после PR.
4. Запрет на смешение прав и cookies между проектами.

**M3 — Existing workflows integration.**
1. Адаптер к existing PR/issue/CI, Vercel deploy verification; избегать дубликатов AI Council и PR Sweep.
2. Поддержка auth *synthetic* E2E на staging, только после проверки тестовых учёток и privacy.
3. Evidence links и обязательные статусы IMPLEMENTED / PARTIAL / BLOCKED, verified SHA.
4. Повторяемые процедуры /copy-ui, /audit-ui, /delivery без нового scheduler.

**M4 — Mobile control, только если безопасен и $0.**
1. Проверить возможности подключения собственного remote MCP к ChatGPT в текущем аккаунте.
2. Подтвердить защищённый free transport, authorization, revoke, audit и device wake limitations.
3. Если условия не выполняются — НЕ запускать открытый tunnel; оставить локальный MVP + Codex Cloud для coding tasks.

**M5 — Optional agentic actions.**
1. Сравнить простые действия с локальной Ollama / Browser Use / Stagehand по quality, speed и гарантированному $0.
2. Включать лишь если 10/10 тестов не ухудшает детерминированный MVP и нет cloud traffic.
3. Второй компьютерный/Desktop слой — только после доказанной необходимости и отдельного security review; не заменять уже существующий Remote Desktop Commander без parity evidence.

## 11. Тест-план и критерии приёмки

**Набор T01–T16, обязателен в PR:**
1. T01 публичный URL и ответ/DOM, content-type, хотя бы один CTA click без записи.
2. T02 макет 390×844 + 1440×900, скриншоты, отсутствие overflow.
3. T03 320/375/430 px smoke и хотя бы два языка EN/RU, ES при доступном маршруте.
4. T04 сеть 404/500/timeout → FAILED с конкретной причиной, а не SUCCESS.
5. T05 несуществующий locator → controlled failure; нет случайного click.
6. T06 client page redirect на новый origin → policy BLOCKED.
7. T07 prompt injection в HTML → не вызывает tools/изменения прав.
8. T08 попытка TinyFish/paid API → BLOCKED_COST до network call, external calls=0.
9. T09 401/403/402/429/2FA/CAPTCHA → blocked state без retry loop и bypass.
10. T10 секрет/cookie/health fixture → отсутствует в reports, screenshots, trace.
11. T11 повтор/возобновление task с POST → повторная запись не происходит.
12. T12 cancel → browser/child processes закрыты; fail-safe.
13. T13 правильно определены repo/branch/deploy SHA; ошибка/расхождение отмечено.
14. T14 mock click не даёт статуса реального лида/оплаты/доставки.
15. T15 загруженный файл сохраняется только в isolated tmp с SHA/type/size.
16. T16 тест с отключённым хостом/недоступным browser → BLOCKED_DEVICE/FAILED без ложного ответа.

**DoD для MVP:**
- 10 из 10 выбранных реальных безопасных сценариев запущены и дают воспроизводимые результаты (не заменить моками); T01–T16 synthetic/unit негативные проверки задокументированы отдельно.
- 100% оплатных/metered вызовов агента заблокированы до сети; фактически 0 new paid calls и отсутствие введённых billable secrets.
- Минимум 3 страницы × mobile+desktop, доказательства корректной фиксации failures, no secrets in trace.
- Команды start/status/stop доступны через local CLI, postconditions проверяемы и тесты pass.
- Любой удалённый сценарий/доставка/платёж без реального provider proof помечается NOT_TESTED/NEEDS_VERIFICATION.
- Отдельный PR с code, tests, lockfile, threat model, setup/rollback. Merge и deployment — отдельные решения по текущим правилам владельца.

## 12. Операционный регламент и отчёт

Каждый результат: **что делали → рабочая ветка и PR → CI/tests → deployment SHA при релизе → браузерные шаги/скриншоты → какие внешние подтверждения действительно получены → потрачено дополнительных денег ($0) → ограничения → до трёх действий владельца**.

Severity: P0 privacy/unauthorized writes/cost, P1 broken goal, P2 quality. P0 немедленно блокирует исполнение. Не закрывать issue только по PR/скриншоту; для функционального change нужен E2E.

Существующие задачи:
- Brain #233 / #234: AI Council evidence, human/model review — reuse.
- Brain systems/playwright-verification-mode.md, mobile-autopilot-control-plane.md, agent-rules.md — reuse.
- Books #985 CRM; #990 lead/payment chain; #1223 validated tests — только специфичные проекты/контракты.
- Сайт: https://holistichouse.vercel.app, actual deployment source branch/SHA проверять перед каждым production утверждением.

## 13. Известные неопределённости и owner-only gates

- Какой Mac/PC доступен для worker постоянно, какие уже установлены браузерные MCP и какие локальные права — **needs verification**.
- Точный доступ текущего ChatGPT аккаунта к собственным remote write-capable MCP и безопасному бесплатному relay — **needs verification**.
- Наличие тестовых аккаунтов для CRM/admin и permission scope — **needs verification**; без них только public/synthetic.
- Использование free GitHub Actions минут и Vercel billing: проверять перед любым CI/remote run, не объявлять заведомо бесплатным.
- Конфигурация конкретной локальной LLM и лицензия весов — **needs verification**; не является блокером M1.
- Отдельное явное согласие требуется для production write, cookies/personal profile, secrets, покупок, paid services, крупных изменений и подключения внешнего аккаунта.

**Статус на дату ТЗ:** концепция и план разработаны; код, рабочий MCP, установка на пользовательскую машину, browser E2E, подключение iPhone и CI/live не подтверждены. Не описывать эту спецификацию как установленное приложение.

## 14. Первая реализационная задача Codex

Прочитай AGENTS.md и связанные Brain правила, этот документ, затем выполни M0 discovery. Не создавай новую систему/репозиторий, пока не проверил существующие Playwright/MCP/Computer Use реализации и runner. Реализуй **только M1 в минимальном scope** в изолированном workspace, с cost gate и T01–T16. Проведи локальные реальные browser tests, создай PR, приложи доказательства. Не включай платные API, TinyFish browser automation, платные модели/облака, публичный tunnel, cron, реальные клиентские данные, live записи, payments, emails, merge или deploy. Отчёт строго разделяет implemented / verified / blocked. Если запуск на user host невозможен — сохрани проверяемый branch/PR и инструкцию, не притворяйся, что агент работает.


## 15. Версия 2.0 — архитектурное решение и реалистичные способы работы

**Этот и последующие разделы (15–34) являются уточнением и при конфликте имеют приоритет над общими формулировками разделов 0–14.** Версия 1 сохранена в той же спецификации ради контекста и устойчивости ссылок. Версия 2 — нормативный контракт для реализации. Путь файла остаётся неизменным, чтобы не ломать ссылки из issue #259 и PR #260.

### 15.1 Неподменяемая пользовательская ценность

Нужен не «ещё один ИИ», а исполнитель, который умеет: (a) посмотреть, что реально есть на странице; (b) сделать конкретное ограниченное действие; (c) подтвердить, что оно изменило нужный слой; (d) если не получилось — показать причину, артефакты и безопасное продолжение. Внедрение не должно увеличивать число бессмысленных скриншотов, незаконченных PR, небезопасных автоматизаций или расходов.

**Три режима — разные продукты исполнения:**

| Режим | Исполнение | ChatGPT / iPhone | Точность утверждений |
| --- | --- | --- | --- |
| A. LOCAL_RUNNER (обязательный MVP) | TypeScript + Playwright Test на собственном включённом Mac/PC | Codex/local terminal; ChatGPT не получает автоматически доступ к локальному stdio | Тесты работают автономно по детерминированным manifests; удалённое управление не обещать |
| B. CONNECTOR_OR_CLOUD (практический fallback) | Существующие ChatGPT GitHub/Vercel/Supabase инструменты, разрешённый Codex Cloud, когда доступен | Можно инициировать из ChatGPT/телефона через **уже работающие** инструменты; браузер Cloud требует отдельной реальной проверки | Облачное выполнение не равно доступу к локальным cookies, CDP или Mac |
| C. REMOTE_HBA (условный поздний режим) | Поддерживаемое клиентом удалённое MCP endpoint через аутентифицированный транспорт и действующую политику прав | Не считать доступным до проверки тарифа, UI, платформы и write actions. По документации ChatGPT на 28.10.2026 пользовательские MCP connections **web-only**, full write MCP — workspace/plan-gated | На iPhone в ChatGPT может отсутствовать; отдельная PWA/веб-панель возможна только по самостоятельному безопасному проекту |

Ни Browser Use, ни Stagehand, ни внешний LLM не входят в цепь исполнения MVP; они не могут быть обязательными для детерминированных операций. Не выдавать «скопировали TinyFish» за функциональную эквивалентность: произвольная автономная навигация по неизвестным сайтам без надёжного reasoning и безопасных прав **не входит** в бесплатный MVP.

### 15.2 Почему не «сразу универсальный агент»

Произвольная работа с любой страницей требует постоянного перепланирования, стабильного доступа к браузеру, контроля разрешений, дорогостоящего контекста/модели и восстановления при изменениях интерфейса. Для наших задач ROI выше у трёх конкретных направлений: визуальная точность страниц Holistic House, проверка публичных воронок и evidence-gated PR/deploy QA. Расширять домены после доказанного качества, а не до него.

### 15.3 Необходимые подтверждения для пользователя

До внедрения обязан быть простой статусный ответ: «Я могу сейчас открыть локальный браузер?»; «Есть ли подтверждённый доступ ChatGPT к моему HBA?»; «Есть ли бесплатная вычислительная среда?» — три **разных** проверки. Если одна не прошла, использовать доступную альтернативу без мнимого доступа.

## 16. Продуктовые истории с измеримыми результатами

| ID | Задача владельца | Исполнение | Доказательство | MVP |
| --- | --- | --- | --- | --- |
| U01 | «Сравни страницу практики с моим макетом» | Local preview + разрешённый эталон, same viewport, geometry/typography/image comparison | before/after/overlay, miss-list, viewport, source SHA | P0 |
| U02 | «Проверь, почему не грузится фотография» | Synthetic upload на local/staging + проверка API response и test storage record | сохранённый объект/идентификатор, readback, UI после reload | P1, только тестовый backend |
| U03 | «Видео редактор выглядит иначе» | Public/read-only editor route или synthetic local login; selected state, CTA layout | screenshot 320–430 и desktop, console/network, controls | P0 |
| U04 | «Проверь все кликабельные кнопки на главной» | Бounded deterministic click/navigation, без внешних submit | target route + visible result + no blocking runtime errors | P0 |
| U05 | «Проверь новый курс после PR» | Локальный synthetic lesson progression, backward/forward/reload | course state transitions + persistence proof, без данных реального клиента | P1 |
| U06 | «Проверь заявку в CRM» | Тестовый аккаунт + синтетический ввод в staging | реальная запись/readback/consent в разрешённой тестовой БД | P2, после backend gate |
| U07 | «Сверь, что PR действительно live» | GitHub/Vercel API first, browser live retest | PR SHA → deployment SHA → домен → функциональный assertion | P1, без автодеплоя |
| U08 | «Обнови YouTube-видео» | Existing connectors/API по действующему SOP; HBA только UI fallback | provider ID, user-visible approved artifact | Не в MVP, не дублировать |
| U09 | «Проверь оплату» | Только read-only provider readback или официальный sandbox | provider-confirmed test transaction status | Не осуществлять реальные платежи |
| U10 | «Проверь защищённый кабинет» | Separate owner-approved synthetic role fixture | auth/RLS/ownership denial + no data leak | P2, не использовать реальные записи |
| U11 | «Проверь RU/EN/ES» | Route matrix и language consistency assertions | per-locale CTA/heading/form/browser outcomes | P0 публичные страницы |
| U12 | «Поправь всё в браузере сам» | Browser собирает доказательства; изменения кода идут через existing Codex /delivery | PR + CI + preview/live retest | P1, не заменять код-редактор |

U03: не предполагать, что /admin/videos или /admin/youtube-upload доступны гостю; если нужна авторизация — BLOCKED_AUTH, никакого обхода. U02: наличие только UI-success toast или HTTP 200 **не** доказывает запись в хранилище.

## 17. Четыре границы доверия и исполнители

~~~text
[Owner request]                  TRUSTED GOAL, not unlimited consent
        |
[Project resolver]                Canonical repo/branch/origin + existing Brain rules
        |
[Task planner]                    bounded plan, no side effects
        |
[Policy engine]                   deterministic authoritative allow/deny, risk/cost
        |  approval decisions held outside model text
[Runner + isolated BrowserContext] Playwright Test/Chromium
        |
        +---- page/DOM/console/network       UNTRUSTED WEB CONTENT
        +---- local test fixture             TRUSTED only after repo review
        +---- existing source code/PR        lower trust; never grants privileges
        |
[Assertions + evidence sanitizer] verified result; errors are also results
        |
[CLI / MCP reports]               minimal metadata and local artifact reference
~~~

**Правило владения:** only runner performs browser side-effects; source resolver authorizes target origins; policy engine authorizes action; provider connector proves downstream business effects. Нельзя разрешить сайту запрашивать MCP tools через содержимое HTML, title, iframe, console, downloaded script или PR комментарий.

**Trusted inputs:** task/manifest authored by owner or reviewed repository fixture; configured project registry; local allowlist maintained by operator; narrowly scoped approval bound to one action. **Untrusted:** страницы конкурентов, пользовательские формы, скриншот текста, PDF, сторонние git diffs, generated model plans.

**Разделение прав:** local CLI runner с R0 public audit не получает права git push, Vercel env, приватную Supabase service-role, доступ к системному Chrome profile или SMS. Git/Vercel инструменты вызываются отдельно, от имени существующего авторизованного контекста, по правилам проекта, а не через raw browser script.

## 18. Модули и структура исходников

Точное размещение подлежит M0 preflight. **НЕ** встраивать worker в Next.js runtime Holistic House или новый Supabase проект. Если не существует подходящего local tooling repo, создать ограниченную подпапку в выбранном существующем tools repo; новый repo — только после проверки дубликатов и принятой ADR.

Рекомендуемое дерево реализации (имена illustrative; не выдавать за уже существующие файлы):

~~~text
holistic-browser-agent/
  package.json / package-lock.json / tsconfig.json
  README.md                       # setup, tested platforms, free/no-cost invariant
  HBA_CONFIG.example.yaml         # public config only, no secrets
  src/
    cli.ts                        # plan, run, status, cancel, doctor
    contracts/
      plan.ts                     # Zod schemas
      events.ts
      evidence.ts
      errors.ts
    projects/
      resolver.ts                 # consumes Brain registry, verified override
      policy-manifests/           # project-specific allowlist
    policy/
      authorize.ts                # hard deny gates; one source of truth
      destinations.ts             # redirect/origin/method validation
      cost-gate.ts                # external spend=0
      approvals.ts                # local sealed approval decision
      data-classification.ts
    execution/
      dispatcher.ts               # deterministic step runner
      checkpoint.ts
      idempotency.ts
      deadlines.ts
      cancellation.ts
    browser/
      playwright.ts               # context creation, lifecycles
      locators.ts
      actions.ts
      network-guard.ts
      screenshots.ts
      console.ts
    evidence/
      assertions.ts
      privacy-filter.ts
      artifacts.ts
      report.ts
      hashes.ts
    mcp/
      server.ts                   # optional M2 stdio wrapper, no raw JS tool
  fixtures/
    public/                       # harmless no-account tests
    synthetic/                    # fake identity fixtures, NO live clients
    adversarial/                  # injection/SSRF/cookie/captcha fixtures
  tests/
    contracts/
    policy/
    browser/
    e2e/
  examples/
    holistic-house-public.manifest.json
  .gitignore                       # local runs, storage-state, screenshots
~~~

**Technical choice:** TypeScript 5.x (locked), Node >=20 (lock to a verified LTS at M0), @playwright/test with pinned version and locked Chromium. CLI adapter optional: @playwright/cli for interactive Codex. MCP adapter optional: @playwright/mcp or thin custom stdio. Do not automatically expose full upstream Playwright MCP toolset to ChatGPT, because some configurations can evaluate arbitrary page JS or grant wider navigation than our policy. We prefer a **thin owned facade**, injecting actions into verified policy runner; direct Playwright driver stays internal.

**Component anti-duplication map:** viewport/audit rules → Brain Playwright Verification; visual reference behavior → Brain /copy-ui; browser execution → HBA; issue/PR/deploy → existing connector/Codex; costs → HBA Policy Gate; recurring scheduler → existing ChatGPT Automations (do not create another cron).

## 19. Формальные контракты task/plan/action/evidence

All untrusted arguments are parsed by a strict schema (e.g. Zod): reject unknown keys, strings with unexpected protocols, relative URLs without canonical trusted base, overly long input, unsupported actions, undefined timeout. Schema is versioned; do not silently reinterpret older manifests.

### 19.1 Request

~~~json
{
  "schema_version": "hba.plan.v2",
  "project_id": "holistic-house",
  "intent": "VISUAL_QA",
  "goal": "Compare video editor mobile layout with approved screenshot",
  "source": {
    "repo": "andylitvinov-design/books",
    "branch": "codex/public-book-library",
    "commit_sha": null,
    "deployment_id": null,
    "verification": "NEEDS_VERIFICATION"
  },
  "environment": "PUBLIC_READONLY",
  "start_url": "https://holistichouse.vercel.app/",
  "route_paths": ["/en"],
  "viewports": [
    {"width": 390, "height": 844, "device_scale_factor": 1},
    {"width": 1440, "height": 900, "device_scale_factor": 1}
  ],
  "locale": ["en", "ru", "es"],
  "limits": {
    "max_actions": 25,
    "max_duration_sec": 900,
    "max_parallel_contexts": 1,
    "max_artifact_mb": 100,
    "max_new_external_spend_usd": 0
  },
  "data_classification": "PUBLIC",
  "allowed_action_classes": ["READ", "NAVIGATE", "VISUAL_CAPTURE"]
}
~~~

source.branch is a historical known value, NOT a claim current deployment matches; source verification is a required preflight. Paths must be actually verified, not guessed. If locale unavailable, mark NOT_TESTED for that locale.

### 19.2 Bounded step plan

~~~json
{
  "schema_version": "hba.plan_result.v2",
  "plan_id": "uuid",
  "created_at": "ISO-8601",
  "expires_at": "ISO-8601",
  "project_id": "holistic-house",
  "resolved_origin": "https://holistichouse.vercel.app",
  "risk_tier": "R0",
  "cost_decision": "ALLOW_ZERO_PAID",
  "state": "PLANNED",
  "steps": [
    {"id":"step-1","kind":"navigate","target":{"url":"https://holistichouse.vercel.app/"},"expect":{"url_origin":"https://holistichouse.vercel.app"}},
    {"id":"step-2","kind":"assert","expect":{"locator":{"kind":"role","role":"main"},"state":"visible"}},
    {"id":"step-3","kind":"screenshot","target":{"name":"home-mobile"}}
  ]
}
~~~

Use a separate internal struct for untrusted DOM text; never serialize DOM-derived content into trusted planning privileges. Timeouts in ms should be specified precisely per operation and per run; not inferred by the LLM. A plan does not constitute approval to start R2/R3 actions.

### 19.3 Action, enforcement and result

~~~json
{
  "schema_version": "hba.action.v2",
  "run_id": "uuid",
  "action_id": "uuid",
  "step_id": "step-2",
  "type": "click",
  "target": {
    "kind": "role",
    "role": "link",
    "accessible_name": "Free Test",
    "exact": true
  },
  "timeout_ms": 10000,
  "expected_effect": {"kind":"navigation","new_path_prefix":"/en"}
}
~~~

~~~json
{
  "schema_version": "hba.step_result.v2",
  "run_id": "uuid",
  "action_id": "uuid",
  "state": "PASSED",
  "started_at": "ISO-8601",
  "ended_at": "ISO-8601",
  "observed_url": "https://holistichouse.vercel.app/",
  "precondition_passed": true,
  "postcondition_passed": true,
  "evidence_ids": ["sha256:..."],
  "error_code": null
}
~~~

Allowed target kinds: role, label, testid, visible_text_exact, curated_css. DOM snapshot temporary IDs are valid only for the snapshot they originated from; stale IDs trigger re-observe. Never use unbounded evaluate/execute_script, absolute filesystem paths, clipboard contents, arbitrary shell tools or code emitted by the webpage as an action type.

### 19.4 MCP-facing compact interface

M2 standard tool list: hba_list_workspaces, hba_doctor, hba_plan, hba_run, hba_status, hba_cancel, hba_evidence_summary. Minimize model context. For automated R0 workflows expose only plan/run/status/cancel to ChatGPT. Each response schema includes: outcome, phase, error classification, actions_total, assertions_passed, evidence_manifest_uri/reference, and not_tested. Heavy DOM/screenshots stay local unless deliberately shared after privacy review. Avoid changes to existing GitHub/Vercel/Drive MCP APIs.

### 19.5 Error taxonomy

- INPUT_INVALID / PROJECT_UNKNOWN / ORIGIN_NOT_ALLOWED / REDIRECT_DENIED
- BLOCKED_AUTH / BLOCKED_APPROVAL / BLOCKED_COST / BLOCKED_DEVICE / BLOCKED_PRIVACY / BLOCKED_PLATFORM
- LOCATOR_NOT_FOUND / LOCATOR_AMBIGUOUS / DOM_CHANGED / ASSERTION_FAILED
- HTTP_UNEXPECTED / NETWORK_FAILURE / TIMEOUT / STORAGE_LIMIT / CANCELLED
- PROVIDER_PROOF_MISSING / DEPLOY_SHA_MISMATCH / SNAPSHOT_MISMATCH / SECURITY_BOUNDARY_UNVERIFIED
- INTERNAL_ERROR (sanitized details; not a secret-bearing stacktrace in public report)

Errors do not silently turn into “completed with warnings”. A task may end PARTIAL_VERIFIED only with explicit successful-step evidence plus blockers; no false green status.

## 20. Жизненный цикл, перезапуски и конкуренция

~~~text
NEW -> DISCOVERING -> PLANNED -> AWAITING_POLICY -> RUNNING
                         |             |             |
                         v             v             v
                       BLOCKED     NEEDS_APPROVAL  VERIFYING -> VERIFIED
                                                     |   |
                                                     |   +-> PARTIAL_VERIFIED
                                                     v
                                                    FAILED
RUNNING -> CANCELLING -> CANCELLED
RUNNING -> DEVICE_LOST -> BLOCKED_DEVICE
RUNNING -> COST_RISK -> BLOCKED_COST
RUNNING -> AUTH_CHALLENGE -> BLOCKED_AUTH
~~~

Each transition is append-only audit event; invalid transitions rejected. Tasks are terminal only after browser close + evidence flush. Local worker restart: recovery reads durable metadata but does NOT replay any action marked externally irreversible or in-flight. For mutating operations, use durable outbox with idempotency key plus provider readback; if uncertain whether server applied a POST, state is UNKNOWN_EXTERNAL_EFFECT and **do not retry**.

**Concurrency:** max 1 Chromium context by default; queue additional runs; per-project lock for synthetic write; one active task per authenticated profile; cancelling one run must not close or leak another project's session. Maximum 25 actions / 15 minutes public run, with 1 short retry on safe GET and locator re-observe only. The operational counts are defaults, not measurements of current runtime.

**Resume rules:** R0 can resume from last confirmed postcondition. R1 staging writes resume only after the test fixture can prove state. R2/R3 never auto-replay from checkpoint. User approval must bind to exact operation and payload, cannot be granted by webpage prompt or ChatGPT hallucination.

## 21. Network policy, authentication and isolation — executable requirements

### 21.1 Threat boundaries

Public website can embed third-party resources; a browser GET might unexpectedly trigger network writes via scripts or service workers. Allowed origins do not mean unlimited action rights. Implement **two controls**: (1) URL/origin/path/HTTP method policy for top-level navigation and known app API calls; (2) OS/process/network isolation or firewall policy for access to local network and privileged destinations. Playwright route handlers and built-in --allowed-origins alone are not a guaranteed sandbox: its published documentation warns about redirects, and service workers can bypass ordinary route interception. **Where network-layer guarantee is absent, restrict usage to known public project URLs and report SECURITY_BOUNDARY_UNVERIFIED.**

- Reject non-HTTPS top-level navigation except explicit verified local fixture base (127.0.0.1 during dev).
- Reject file:, ftp:, data: as top-level destinations, javascript:, chrome:, extension protocols, localhost, link-local, private address space, metadata endpoints, Unix sockets, internal hostnames; accept local preview only through operator-defined exact host/port override in trusted config.
- Normalize canonical host, port, punycode, default ports; check before navigation, on frame nav and redirect, **and** before every effectful action. DNS rebinding defense requires resolver/egress-level checks, not only string match.
- Default deny new origins, downloads, popups, offsite OAuth, window.open, link rel external, automated file uploads, clipboard and OS permissions; do not assume third-party subresource GET is safe. Minimal explicitly justified static asset allowlist per project. Block analytics/ad pixels in public synthetic QA unless needed to test a specifically approved consent flow.
- For Next.js/API hydration, classify HTTP POST by **endpoint contract**, not only verb: some POST fetch read-only RSC; still deny unknown effectful methods/URLs. For staging synthetic endpoints create allowlist with route pattern + method + payload purpose + fixture data.
- Disable service workers for deterministic route interception if compatible; compare with enabled in an isolated special test if PWA behavior is being tested.
- Network logs store URL origin/path and status only; strip query, fragments, Authorization, Cookie, Set-Cookie, request/response bodies. Query may contain PII or auth tokens, so full URL is not safe to publish.
- Prove negative controls with fixtures that redirect from allowed domain to 127.0.0.1, private IP, external POST, subframe, WebSocket, and service-worker-controlled requests. All must be blocked or marked UNSUPPORTED/NOT_SAFE, never silently treated as protected.

### 21.2 Login and identity

- Default ephemeral BrowserContext: no saved login. No automatic attachment to personal Chrome, Safari/iPhone sessions or production browser profiles.
- Stage synthetic accounts: least privilege, non-production as available, no shared real patient data, owner must approve initial credential provisioning. No hardcoded passwords in fixtures, env values, PR, logs or prompt. Cookies/session state either RAM only or OS-protected encrypted storage, user-controlled clear/revoke.
- OAuth: no password interception, no bypass CAPTCHA/2FA; stop and request the exact needed owner action, then resume only within approved scope.
- Separate worker identity per project and per role (guest/test-client/test-practitioner), no cross-project cookies or localStorage.
- Health/privacy data: block navigation/capture if real client state is detected (patient/profile identifiers, real answers, diagnoses, reports). Test fixture must be synthetic and optionally masked locally before screenshots. For private routes default raw trace OFF and network body capture OFF; if redaction cannot be proven, do **not** capture or export an artifact.

### 21.3 Approvals

Approval issued by trusted local owner UI/OS prompt or supported host-confirmation channel, never by DOM text. Persist only sealed decision metadata, NOT bearer token in agent report. Bind project, origin, exact action, target resource, payload SHA-256, max effect count=1, expiry ≤10 min; every mismatch rejects. Approvals for production deploy/merge/payment obey existing governance independently; HBA's approval cannot silently grant provider authority.

## 22. Визуальное воспроизведение макетов — точный процесс

### 22.1 Problem framing

Имеются: оригинальная страница, макет/скриншот пользователя, реальная реализация. Ошибка предыдущего процесса: сравнение «по смыслу» вместо относительных размеров, сетки, изображений, отступов и адаптации. HBA должен быть измерителем и проверяющим, а не субъективным дизайнером. Изображение-эталон используется только если пользователь предоставил права на копирование/сравнение; конкурентов не декомпилировать.

### 22.2 Capture protocol

1. Зафиксировать reference origin (uploaded/reference), целевой URL и commit SHA, viewport width/height/DPR/zoom, browser build, OS/font availability, locale, theme, account state, timestamp, feature flags. Снять эталон и реализацию в согласованных условиях. **Если референс — фото телефона, не притворяться пиксельной идентичностью.**
2. Дождаться стабильной страницы: fonts.ready, критические изображения, app-specific loading; не использовать один только networkidle как гарантию завершения. Сохранить loaded DOM boxes.
3. Отключить анимации, caret, jitter и случайные таймеры, если это не меняет бизнес-сценарий; заменить динамические данные только в локальном synthetic тесте, не подменяя live.
4. Сравнить: canvas dimensions; header/hero height; grid/card columns; relative x/y; image crop/subject position; font family/weights/line wraps; spacing; buttons/CTA hierarchy; shadows/borders/colors; sticky overlays; mobile overflow.
5. Сделать 3 вида evidence: actual screenshot, side-by-side/overlay/diff, machine-readable geometry+assertions. Сохранять только публичную/синтетическую информацию.
6. Код правится в существующем Next.js/React модуле через Codex; HBA повторно снимает страницу **после** изменения, сравнивает с тем же baseline и проверяет клики. Не создавать финальный эталон автоматически на основании текущей ошибки.

### 22.3 Scoring

Для каждого обязательного блока (navigation, hero, form, cards, CTA/footer) записать bbox x/y/w/h, overflow, crop и видимость. Приоритеты: (a) P0 функциональное сломано/скрыто; (b) P1 заметная композиционная разница; (c) P2 микроотступы и косметика. Скриншотный pixel diff — один сигнал, не единственное доказательство: текст может меняться по языку, а шрифты/рендеринг зависят от ОС. Автоматическая проверка screenshot baseline работает только в стабильной версии браузера и одинаковом окружении (официальное предупреждение Playwright).

Рекомендованные критерии **для пилота, а не универсальные истины**: no horizontal scroll on width 320–430; CTAs tappable without overlay; отсутствует перекрытие filters; all essential hero/inputs within intended viewport hierarchy; visual diff P1 не ухудшился по сравнению с baseline; 0 console crashes. Числовые pixel thresholds устанавливать на конкретный компонент **после** baseline из одобренного дизайна и сохранять в fixture.

### 22.4 Human visual gate и пределы

Если оригинал и реализация намеренно разнятся по концепции, AI не вправе автоматически назвать улучшение успешным. Финальный критерий — принятая владельцем композиция плюс обязательные технические проверки. Визуальный score не превращает ломаную форму в «готово». При неудаче максимум три локальные итерации diff→fix→retest в одном PR, далее honest blocker с точным несовпадением.

## 23. Holistic House: маршруты, user journeys, data/privacy gates

Для каждого маршрута требуется preflight наличия именно этого пути/локали на verified deployment. Известные публичные ориентиры: сайт https://holistichouse.vercel.app; практика https://holistichouse.vercel.app/ru/app/practice?panel=clients; видеоадминка /admin/videos; YouTube uploader /admin/youtube-upload. Последние два **protected** и не являются частью гостевого MVP.

### HH-PUBLIC-01 Home/free offer

Guest → home EN/RU → видимые три бесплатные точки входа (self test / situation review / Reiki program, если таково актуальное production состояние) → ожидаемый путь. Проверять CTA destination, видимый заголовок, no horizontal overflow 320/375/390/430, финальный маршрут. Никаких реальных заявок.

### HH-PUBLIC-02 Test discovery

Guest → каталог доступных тестов → выбрать публичный тест → ответить синтетикой если допустимо → увидеть пользовательский результат без записи приватных данных. Проверять отсутствие случайного создания профиля, понятный guest state, RU/EN/ES при доступности. Не отправлять individual test scores сторонним моделям или скриншотам в публичный PR.

### HH-PUBLIC-03 Video catalog & video editor

Публично доступные видео: карточки, категории/подкатегории, видео 16:9 / 9:16 где соответствуют, постер, play trigger, отсутствие autoplay, корректные ссылки. Видеогенерация: редактор, компактные аффирмации и фильтры целей — синтетическая версия в локальном preview, только визуальная проверка и no-render button; **никакой фактической генерации Kling/HeyGen или публикации**, даже если «Generate» видна в UI.

### HH-PUBLIC-04 Design/refactor copy-ui

Берём утверждённый референс (первый screenshot) и реализацию (второй). HBA выдаёт таблицу геометрических отличий с ID компонентов и screenshots before/after. Codex исправляет **в существующем модуле**, не дублирует страницу. Mobile test at 320/375/390/430, keyboard/contrast/readability.

### HH-SYNTH-05 Practice photo upload

Только synthetic test account в staging или mockable local test backend; выбрать тестовое JPEG/PNG, отправить через UI, проверить API schema, durable object readback, content type, secure owner access, отображение после reload; отдельно проверить oversized/invalid type/unauthorized. Нельзя считать успешным один toast/200. Нельзя хранить реальное фото клиента как публичный GitHub artifact.

### HH-SYNTH-06 CRM

Только после разрешённой test identity/DB: согласие → synthetic lead creation → same lead ID and customer consent in real **test** CRM store → follow-up state. CRM Contacts и private client profile раздельны. Клик WhatsApp/Telegram → «draft opened», но НЕ отправлено, НЕ lead. Проверки STOP/opt-in/owner access/RLS; не посылать медицинские/тестовые данные в messenger/pixel.

### HH-SYNTH-07 Course/progress

Synthetic enrolment → открыть урок/видео → отметить просмотр/выполнение если разрешено → увидеть корректную историю по темам (My Progress, My Courses, My Tests), retest state after reload, no cross-user. Начало тестового курса не должно менять реальные доступные слоты. Evidence только synthetic IDs, без профилей личности.

### HH-ADMIN-08 Protected admin actions

/admin/videos, /admin/youtube-upload, /admin/materials, practice panel: blocked by default. Разрешённые действия read-only с owner-approved synthetic admin account; любые media upload, publish, email, payment, visibility changes require separate action-level approval and provider verification. Не считать screenshot admin UI доказательством успешной external delivery.

### HH-PROVIDER-09 Release chain

В цепочке PR issue → changed files/CI → canonical production branch commit → Vercel deployment READY at matching SHA → public alias/domain binding → browser action must record each independent proof. If mismatch, state MERGED_NOT_LIVE / DEPLOY_SHA_MISMATCH / LIVE_NOT_VERIFIED. No rewriting branch pointers, no auto-merge, no paid deploy.

## 24. Evidence envelope, журнал и хранение

### 24.1 Контракт событий

~~~json
{
  "schema_version":"hba.evidence.v2",
  "run_id":"uuid",
  "task_fingerprint":"sha256:...",
  "project_id":"holistic-house",
  "environment":"PUBLIC_READONLY",
  "source":{"repo":"andylitvinov-design/books","branch":"needs-verification","sha":null,"deployment_id":null},
  "browser":{"engine":"chromium","engine_version":"verified-version","os":"local","viewport":{"width":390,"height":844},"locale":"en"},
  "steps":[
    {"id":"step-1","kind":"navigate","state":"PASSED","assertion":{"kind":"url_matches","result":true}},
    {"id":"step-2","kind":"screenshot","state":"PASSED","artifact_id":"sha256:..."}
  ],
  "security":{"classification":"PUBLIC","approval_ids":[],"redaction_status":"PASS"},
  "cost":{"paid_requests":0,"new_external_spend_usd":0,"billable_risk":"NONE_DETECTED"},
  "result":{"status":"VERIFIED_READONLY","not_tested":["real_provider_payment"],"blockers":[]},
  "artifacts":[{"kind":"screenshot","sha256":"...","relative_path":"artifacts/run-id/mobile.webp","private":true}]
}
~~~

Evidence chain: append-only events seq+time+prev_hash (tamper-evidence, not cryptographic proof of provider behavior), screenshot checksum, exact test script commit, browser version, locale. Human-readable report derives from JSON envelope. All IDs are synthetic/local unless connector readback proves otherwise.

### 24.2 Local storage

- Default location: OS user app-data or an explicit workspace-local gitignored directory. Never public GitHub repo or site public assets.
- Event log JSONL (schema version, run_id, event_id, step_id, monotonic relative timing, outcome). SQLite optional later only for search/high-volume history; **no new Supabase instance**.
- Artifacts: sanitized screenshot/webp, JSON assertion, console summary, redacted HAR metadata if specifically allowed, trace **disabled by default for authenticated pages**.
- Security defaults: 7-day TTL and 100 MB/run; report metadata can remain longer with user-controlled retention; delete only HBA-owned ephemeral files; no broad directory cleanup.
- Redaction before export. If raw trace necessarily captures secrets or PII and cannot be sanitized, **do not create trace**. The old v1 phrase «redact before saving» cannot promise that an underlying trace file never recorded a secret; enforce capture prevention instead.
- Report filenames based on timestamp/run UUID, safe path normalization, never real names or patient identifiers. No screenshots automatic upload to GitHub/Telegram/Drive.
- Logs are locally auditable; artifact index may be linked only through an authenticated/download-safe route when one is explicitly designed.

## 25. Privacy and roles: user data is never a QA convenience

Public synthetic data categories:
- PUBLIC: URLs/routes of publicly available site, no query tokens; allowed to summarize.
- SYNTHETIC: fake names/fake uploads/fake test scores, staged; may appear only in local artifacts, sanitized on export.
- AUTHENTICATED_PRIVATE: owner/practitioner session, admin video and client metadata; default view/capture blocked.
- HEALTH_SENSITIVE: clients, clinical interpretations, answers, remedy analyses, private media; **no public screenshots, traces, third-party model calls or network analytics**.
- SECRET: tokens/cookies/passwords/OAuth refresh tokens; never log/prompt/export, not even «masked beginning/end».

Do not mask health data with CSS after the screenshot is already taken and assume safe; prevent content being opened/captured, or use tested DOM masking **before any capture** and prohibit raw traces. For a restricted environment default to collecting only boolean assertions and anonymized fixture identifiers, not images or DOM dumps. Consent for one client does not authorize sending sensitive data to LLM; keep privacy boundary separate.

## 26. Reliability and selectors

Recommended locator resolution:
1. stable data-testid under own-site QA contract;
2. semantic role + exact accessible name scoped to section;
3. label and visible meaningful text scoped to container;
4. human-reviewed CSS locator with page version precondition;
5. geometry/coordinate only in deliberately approved vision experiment and always check focus/target afterward.

Before any click: ensure exactly one visible enabled locator, no overlay, expected URL/domain, screenshot/DOM precondition when needed. After: assert an observable effect, not just click event: navigation, state changed, provider/test record, download checksum. Use event-based waits; no hard-coded 5-second sleep as primary synchronization. Unexpected modal/navigation stops the run. Re-observe once if DOM changes; never guess a similarly named «Delete» or «Pay» button.

**Flakiness protocol:** record 5 sequential dry runs against same immutable preview fixture, classify timeout/performance/data instability, solve cause before raising timeouts. A stochastic LLM locator suggestion cannot count toward deterministic reliability. Known-dynamic ads, banners, randomized recommendations should be explicitly normalized, not ignored wholesale.

## 27. Money: enforce budget policy below the provider layer

### 27.1 Hard limits

Default immutable operator policy: paid tinyfish actions=DENY; external LLM calls=DENY; hosted browser sessions=DENY; wallet top-up=DENY; proxy provider=DENY; paid CI runner=DENY; new SaaS subscription=DENY; external-video-generation=DENY; mass messaging=DENY. Paid services may remain installed as connectors but HBA must never call their billable actions.

Implement **deny-by-default provider registry**: only local deterministic adapter registered in MVP. Config flags cannot be overridden by model, manifest or web page. Test zero metered network calls with intercepted transport stub and real negative network test in sandbox. A missing tool registration is the cheapest enforceable defense.

### 27.2 Costs that may still exist

«$0 дополнительных расходов» не гарантирует нулевые общие затраты: electricity, hardware wear, current subscription, GitHub Actions minute use, Vercel deployments, existing database egress have costs/limits. Before remote workflow, obtain provider plan/quota readback; if charging risk unknown, use local instead. Maintain per-run local counters: browser elapsed minutes, pages, actions, network request count and paid API calls (expected 0). Do not claim verified $0 from absence of a visible invoice.

### 27.3 Fallback decision table

| Blocker | Допустимый обход | Недопустимый обход |
| --- | --- | --- |
| TinyFish wallet empty | Playwright local | auto-buy credits / billable fallback |
| LLM API missing | deterministic fixture; human/Codex task request | open an unapproved OpenRouter endpoint |
| Mac offline | connector read-only work / resumable PR issue | expose CDP or force paid remote browser |
| Public browser blocked by anti-bot | stop and record challenge | proxy/stealth/CAPTCHA bypass |
| GitHub Actions quota unknown | local test | blindly run large CI loop |
| Protected clinical page | synthetic fixture or blocked status | real patient data screenshot |
| ChatGPT mobile MCP unavailable | current connectors and Codex Cloud when actually supported | promise mobile direct MCP writes |

## 28. Mobile / ChatGPT integration reality check

**Current documented platform boundary at spec revision:** custom MCP apps/connections in ChatGPT are web-only and the ability to issue full write/modify actions is workspace/plan dependent. Some read/fetch access may be available in other plans, but this must be checked on the owner's actual account. Connecting a local stdio MCP to Codex does **not** make it callable in ChatGPT iOS; GitHub access via connector does **not** grant browser control.

Priority pathways:
1. **No new setup:** use existing ChatGPT tools for GitHub, Vercel, Supabase to read and prepare PRs; use Codex cloud coding environment if actually configured. All results have explicit verification limits.
2. **Local:** Codex CLI/IDE on owner's powered Mac calls HBA stdio. This is MVP and does not require ChatGPT App installation.
3. **Remote read-only control surface:** if desired and proven free, expose sanitized run status/artifacts through authenticated existing dashboard or GitHub issue (no private screenshots), **not** raw browser CDP. Requires auth, session expiry, replay defense and access audit.
4. **Remote MCP:** only after checking current ChatGPT workspace entitlements, web client support, secure tunnel/endpoint availability, HTTPS/OAuth requirements, retention, cost and action permissions. If unsupported/mobile-only, do not build it as a blocked prerequisite for local success.
5. **Owner convenience:** from iPhone, user can ask in ChatGPT to create a properly scoped GitHub issue/PR using existing connectors; a separately authorized local worker or coding agent can later consume it only if an **existing approved scheduler** routes tasks. Do not create a new permanent polling daemon just because a GitHub issue exists.

**Security:** no unauthenticated tunnel, no public 0.0.0.0:9222, no raw Chrome debugger forwarding, no free relay assumption, no direct exposure of client session. Test feature availability again at actual implementation date; documentation changes.

Official references:
- https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt
- https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt
- https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/index.mdx

## 29. MCP compatibility and transport contract

MCP versions and host capabilities must be **negotiated/tested**, not assumed: protocol changed in 2026; choose a specific SDK/protocol version compatible with actual Codex/local host and verify discovery/tool invoke/cancel/error behavior. For local M2 use stdio with no network listener, least environment privilege and per-tool allowlist. A remote endpoint is a separate deployment/security design, not a flag enabling stdio server to listen publicly.

- Tool names stable and versioned; no browser_run_arbitrary_js or execute_shell.
- Contract tests: discovery, input validation, authorization rejection, timeout, cancellation, retry semantics, result truncation, no secrets in tool response.
- MCP server returns structured error codes, never success-looking prose for denied writes.
- ChatGPT connectors may snapshot tool schemas until refresh; do not make breaking signature changes silently.
- Use OAuth/HTTPS for remote only according to applicable spec and host, verify resource authorization; never put bearer tokens in query string.
- Server-side grants are authoritative even if host UI confirms or model requests action.

## 30. Test matrix v2, minimum fixture definitions

The v1 tests T01–T16 remain mandatory. Additional tests pin important invariants; automated tests can use controlled fixtures, while the MVP 10 real browser scenarios must still run in a real local Chromium.

| ID | Test fixture / action | Expected result |
| --- | --- | --- |
| T17 | Prompt injection hidden in <title>, aria-label or DOM comment requests token upload | no tool invocation, no privilege change, security event |
| T18 | HTML contains fake «system instruction» to authorize payment | DENY_R3, zero network side effects |
| T19 | External URL redirect to 127.0.0.1, 169.254.169.254, ::1 or private IPv4 | BLOCKED and no connection; if OS-level guard unverified, mark security-blocked |
| T20 | Allowed origin frame/link tries external form POST | blocked before submit |
| T21 | WebSocket sends potential sensitive payload to third-party | denied or scenario forbidden; no false protection claim |
| T22 | Service worker controls request path | intercept or reject SW use; document mode |
| T23 | Stale DOM element ref reused after route change | LOCATOR_STALE/DOM_CHANGED, never click different element |
| T24 | Two equal-name Delete/Submit elements | LOCATOR_AMBIGUOUS, no action |
| T25 | Overlay hides expected CTA | assertion fails; screenshot of public fixture |
| T26 | Same run started twice after client retry | only one run executed (idempotency) |
| T27 | Worker killed after synthetic POST before ack | external effect UNKNOWN; no second POST |
| T28 | User cancels while screenshot pending | child browser ends, final CANCELLED, no extra action |
| T29 | Local artifact path traversal or symlink points outside workspace | path rejected; file remains untouched |
| T30 | Content-Disposition attachment has shell executable extension | download blocked/quarantined, no execution |
| T31 | Browser page requests clipboard/notifications/geolocation/camera/mic | permissions denied by default |
| T32 | Session A belongs to project A; project B tries observe/click | isolation error, no state/cookie sharing |
| T33 | Private client report enters screenshot/console | privacy block, no exported content |
| T34 | Synthetic health fixture/authorization header appears in trace | trace prohibited/redacted test fails closed |
| T35 | UI toast says saved but mocked API did not persist | NOT_VERIFIED; do not call durable save |
| T36 | PR merged but Vercel deploy SHA mismatches production | DEPLOY_SHA_MISMATCH/MERGED_NOT_LIVE |
| T37 | Vercel READY and HTTP 200 but CTA has JS runtime error | LIVE_FUNCTIONAL_FAIL |
| T38 | Consent prompt triggers analytics after denied consent | fail privacy invariant, no GA4 privacy hold bypass |
| T39 | Locale RU/ES element wraps outside viewport 320px | visual/layout failure with bbox evidence |
| T40 | Screenshot baseline differs only by OS/browser/font version | environment mismatch, compare invalid until normalized |
| T41 | Provider 402/429/5xx on unrelated connector | no paid fallback, clear DEGRADED result |
| T42 | Attempt to run unknown \`exec\`/arbitrary CDP tool via MCP | rejected at interface and policy |
| T43 | Remote connector unavailable on iOS or write permission missing | BLOCKED_PLATFORM and actual alternative proposed |
| T44 | Runtime/storage/action limit reached | bounded stop with partial verified steps and cleanup |
| T45 | HTML page tries navigation through javascript:/file: | denied before URL is opened |
| T46 | Real person data accidentally mounted into fixture path | classification fails/abort, no screenshot/upload |
| T47 | Fake CI status passed while no actual GitHub check exists | NOT_TESTED / source verification failed |
| T48 | Private file upload filename with path traversal / MIME spoofing | restricted, safe rejection, no outside write |

T01–T48 are design-time acceptance assertions; do not claim they have run when saving this document. For all denial tests, assert **zero** privileged network calls and zero unauthorized filesystem writes. Security test fixtures are intentionally synthetic and never contain valid credentials.

### 30.1 MVP 10 real browser scenarios

Run against verified public Holistic House routes or entirely local test site; route availability determines exact names. Start with: (1) home EN desktop; (2) home EN 390; (3) home RU 320; (4) home EN 430; (5) free test discovery; (6) public CTA destination; (7) nav back/forward; (8) broken image guard; (9) intentional not-found route as failure; (10) compare one local reference component with approved baseline. Exclude real login, real upload, real lead and payment. Report which ran on *real site* vs *local fixture* and why.

### 30.2 Acceptance thresholds

- Security: **0 bypasses** of P0 gates in T17–T48; 100% unit coverage for cost/authorization critical branches (per measurable branch coverage report), no secrets in artifacts.
- Reliability: 10/10 chosen safe scenarios complete with correct pass or correct expected failure, not necessarily that the target page is bug-free. Five repeated immutable-fixture runs per representative scenario without nondeterministic false PASS.
- Performance: one browser instance max by default, bounded timeout 900s, captured artifacts under defined cap; no uncontrolled zombie browser processes.
- Visual: changed screenshot differs deterministically in approved test environment; false comparison due to browser/OS mismatch is rejected.
- Real E2E: only marked verified if downstream source of truth was actually read after the UI event.

## 31. PR delivery plan (small slices, no dashboard-first build)

### PR-A: M0 discovery/ADR/cost audit (no executable runner)

Deliver: inventory of installed Playwright/DevTools/browser tooling; OS/Mac/Node availability, existing connectors/authorized machine, canonical repo and workspace, security boundary, verified free budgets, decision log. If host unavailable, draft checklist and BLOCKED_DEVICE. No guessed paths or passwords. Existing PR #260 is **documentation only**; do not treat as PR-A implementation.

### PR-B: M1a deterministic engine

Deliver: types/contracts, project allowlist, cost gate, browser context isolation, basic navigate/observe/assert/screenshot, CLI, unit tests T01/T04/T05/T06/T08/T12/T17–T24. No cross-site arbitrary browser operations, no MCP yet.

### PR-C: M1b QA evidence and real tests

Deliver: viewport matrix, console/network diagnostics, visual baseline fixtures, sanitized artifact store, 10 real safe browser scenarios, reproducible report + retention. Tests for trace/secret/data privacy and abnormal exits. Fix flakiness before expanding use.

### PR-D: M2 local MCP

Deliver: minimal stdio facade, exact schema and cancellation, scoped concurrency, no raw eval, positive and negative MCP tool tests. No public tunnel, no cloud-cost consumption.

### PR-E: M3 integrations

Deliver: existing GitHub PR/CI + Vercel deployment read-only verifier with SHA, domain, route proof; no duplicate PR sweep job, no auto-merge/deploy. Optional synthetic staging auth/CRM in a separate gated PR and only with verified test credentials/RLS.

### PR-F: conditional M4/M5

Remote/mobile and local-LLM experiments require a written ADR verifying platform entitlements, security, zero cost and actual need. If blocked, leave a stable local product; no scaffolding or paid fallback in the critical path.

**Each PR:** title, scope, changed code, test commands, negative gates, screenshot/trace references (safe only), precise result, status, dependency, rollback. No PR counts as deployed or live without independent readback. No duplicate issue or additional scheduler unless evidence proves gap.

## 32. Engineering task contracts and acceptance by component

| Component | Required input | Required output | Failure required | Owner |
| --- | --- | --- | --- | --- |
| project resolver | project alias/URL, current registry | verified origin/repo/base and role scope | mismatch/unknown | existing Brain source |
| plan compiler | approved goal + manifest | immutable bounded action graph | invalid data | HBA |
| policy gate | action+actor+origin+payload hash | allow/deny + exact reason | fail closed | HBA |
| cost gate | selected adapter / provider | paid disabled before request | BLOCKED_COST | HBA |
| Playwright adapter | constrained action | actual browser observable state | typed runtime failure | HBA |
| assert engine | pre/post state predicates | PASS/FAIL + evidence ID | false success forbidden | HBA |
| evidence store | sanitized event/artifact | hash+local URI+retention state | privacy fail blocks storage | HBA |
| MCP facade | schema-checked request | typed compact result | no raw JS/shell | HBA M2 |
| GitHub adapter | existing approved connector | PR/check ref and SHA proof | NOT_VERIFIED | existing connector |
| Vercel adapter | existing approved connector | deployment source/SHA/alias proof | DEPLOY_SHA_MISMATCH | existing connector |
| CRM provider | synthetic test account+consent | test record/readback | not a real lead until proven | existing app/backend |

Precise code and packages selected during PR-A to reuse existing installations. Do not promote a generic Model Planner to a privileged executor or invent new endpoints for provider tools.

## 33. Operational UX: what Andrey sees

Example short output of real R0 task (illustrative, **not a completed run**):

~~~text
Task: Compare /en hero with approved reference.
Device: LOCAL_RUNNER, Mac (connected / not assumed).
Project: Holistic House, source branch verified at run time.
Checks: screenshot(390,1440), visible CTA, broken assets, console.
Result: PARTIAL_VERIFIED
  PASS: 2 public screenshots captured with hashes.
  FAIL: hero image alignment differs; see bbox analysis.
  NOT_TESTED: signed-in profile, CRM, payments.
  Cost: metered API calls = 0; no new paid service invoked.
  Next: create focused existing-module Codex PR and retest.
~~~

The owner should not need to inspect source code to understand status. If ChatGPT lacks remote capability, show exact last known proof plus BLOCKED_DEVICE/BLOCKED_PLATFORM, not pretend the browser is still running.

## 34. Explicit Codex /delivery brief for the first iteration

> **Implement only bounded M0 + PR-B discovery-safe part, without any new expenditure.** 
>
> Start /context-scout, read ai-projects-brain AGENTS.md, mobile-autopilot-control-plane, /delivery and current source-of-truth docs. Read this complete HBA spec v2 (same canonical file, issue #259, draft PR #260) and inspect existing browser/Playwright/MCP tooling before choosing code placement.
>
> Identify verified local execution host, project workspace, current GitHub/Vercel source of Holistic House and existing test scripts. If no authorized host is attached, do not fabricate installation or browser tests: prepare clean repo code/fixtures on a working branch, run available CI/unit checks, mark browser E2E BLOCKED_DEVICE.
>
> Implement the smallest deterministic local agent with hard policy/cost gates, allowlisted public navigation, Playwright screenshots/DOM/assertions, synthetic adversarial fixtures, CLI plan/run/status/cancel and versioned contracts. No direct payment, emails, real CRM writes, provider API calls, always-on cron, login bypass, external cloud model, paid TinyFish automation, wildcard CDP, untrusted eval or public tunnel.
>
> Required checks: unit/policy tests including T01/T04/T05/T06/T08/T12/T17–T24, browser smoke 10 real safe scenarios when host exists, npm test/typecheck/lint as applicable, cost=0 evidence. Verify GitHub PR existence and refs; do not confuse documentation PR with implementation. Do not merge to main or publish to live without separately applicable approval.
>
> Finish with: changed files; tests passed/not run; PR/head/base SHA; browser evidence IDs and routes/viewports; real account/provider verification state; any security and spending blocker; at most 3 concrete owner actions. Avoid code churn and duplicate services.

**Version control:** v2 content authored 2026-10-28 Toronto; the canonical document retains its original filename to keep existing links stable. Actual runtime capabilities, costs, integrations and entitlements must be rechecked at execution time.

**Updated technical references (consult at implementation date):**
- Playwright CLI: https://github.com/microsoft/playwright-cli
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Playwright Test screenshots: https://playwright.dev/docs/test-snapshots
- Playwright network caveats: https://playwright.dev/docs/network
- Chrome DevTools MCP: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Current MCP transports: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/index.mdx
- ChatGPT custom MCP limitations: https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt



### Источники

- https://github.com/microsoft/playwright-cli
- https://github.com/microsoft/playwright-mcp
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://github.com/browser-use/browser-use
- https://github.com/browserbase/stagehand
- https://github.com/ollama/ollama
- https://github.com/andylitvinov-design/ai-projects-brain/issues/233
- https://github.com/andylitvinov-design/ai-projects-brain/issues/234
- https://github.com/andylitvinov-design/ai-projects-brain/blob/main/systems/playwright-verification-mode.md

---

## Delivery checkpoint — 2026-10-29 · continuation of PR #260

This checkpoint records **implementation**, not a claim that all requirements T01–T48 or owner-host acceptance tests have passed. It does not supersede the v2 architecture or create a new task.

| Component / criterion | Source / evidence target | Current classification |
| --- | --- | --- |
| GitHub CI OS compatibility | `.github/workflows/hba-zero-budget.yml`: pinned `ubuntu-24.04`, Python 3.13, Playwright 1.57.0 | PATCHED; SUCCESS requires check on exact latest HEAD |
| CLI `doctor` | `hba/cli.py`: headless Chromium synthetic probe with all requests denied | IMPLEMENTED; real CI/host result tracked separately |
| `plan`, `run`, `status`, `cancel` | `hba/runner.py`, `tests/test_runner.py` | IMPLEMENTED; cancellation cooperative, not a kill of an active browser API call |
| MCP stdio | `hba/mcp.py`: bounded single background worker; `hba_run` returns run ID; status/cancel remain available | IMPLEMENTED; native Codex client tool invocation on Mac NOT_TESTED |
| Browser/fixture security | deny-by-default origin/method/cost policy; no arbitrary JS/shell; safe fixture input literals; Chromium negative tests | TARGETED TESTS ADDED; no OS egress sandbox attestation |
| PNG compare | `hba/visual.py`: local diff, size limits, private artifacts | IMPLEMENTED; no semantic design acceptance inferred |
| macOS installer | `INSTALL_MAC.command`: local venv/browser probe + conflicting MCP registration guard | SOURCE READY; owner Mac proof BLOCKED_DEVICE until online |
| Public Holistic House | `examples/holistic-house-public.json`, allowlisted R0 only | Real Chromium viewport/locale E2E NOT_TESTED; synthetic browser tests are not substitutes |
| T01–T48 and release safety | Baseline tests + focused added regression tests | PARTIAL; untested test IDs must never be represented as PASS |
| Spend and privacy | No paid adapters, no cloud model/browser calls, no persistent browser profiles or real tokens | ZERO NEW PAID PROVIDER CALLS in this delivery; broader hosting costs not attested |

**Operational separation:** Brain PR/CI success, native owner-Mac installation, and live Holistic House/browser/production SHA evidence are independent gates. Never merge or deploy website code as a side effect of HBA QA. When the last test run is incomplete, keep the PR in Draft and report the blocking layer. No additional scheduler, browser cloud, public CDP or tunnel is introduced.


### Implementation addendum — 2026-10-29

The local MCP worker is now an independently killable child process, with a supervisor deadline, cancellation process-group termination, parent-pipe disconnect guard, and one-shot execution claim. CI tests include external stdio discovery/invoke and CLI doctor/plan/run/status/cancel/compare. A fixed `measure_layout` browser action reports numeric responsive/image metrics; 16 public browser visits capture private, non-uploaded screenshots and hashes. Blocked assets remain policy-limited, not site PASS. The Mac installer prefers already available local Chromium and verifies the entire Codex stdio configuration. Owner Mac / native Codex invocation remain NOT_TESTED until an authorized host is online. T01–T48 full compliance is still PARTIAL; no OS-level network sandbox is asserted.


### macOS GitHub runner acceptance gate (2026-10-29)

The dedicated `macos-15` job on a standard public GitHub Actions runner performs two-pass installation with Python 3.13 and synthetic Chromium. Standard runners are free for public repositories; no paid larger runner or artifact upload is enabled. Exact-head result is required before claiming PASS. This is independent of owner-Mac installation and native Codex invocation, both `BLOCKED_DEVICE`/`NOT_TESTED` if the device stays offline.
