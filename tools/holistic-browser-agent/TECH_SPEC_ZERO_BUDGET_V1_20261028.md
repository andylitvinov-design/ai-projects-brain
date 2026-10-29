# Holistic Browser Agent (HBA) — ТЗ v1.0 · Zero-Budget

**Дата:** 2026-10-28 (America/Toronto)  
**Статус:** SPEC / READY FOR BOUNDED MVP IMPLEMENTATION. Архитектурное ТЗ, не реализованный и не развёрнутый продукт.  
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
