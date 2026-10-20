# Holistic House — ежедневный AI Council (Gemini + Mistral + Muse) → @Andydotbot

## Прямая настройка на iPhone (20 октября 2026)

**Подтверждено:** владелец уже отправлял /start боту Dot. Не надо создавать нового бота или автоматически сбрасывать его токен. Все ссылки ниже ведут к существующим аккаунтам, однако права владельца требуются для доступа.

1. **BotFather / токен:** https://t.me/BotFather → отправить `/mybots` → выбрать **@Andydotbot** → **API Token** → **Copy**. Не нажимать **Revoke** и не публиковать токен в ChatGPT, GitHub, issue, SMS или screenshots.
2. **Ваш numeric chat ID:** https://t.me/userinfobot → Start → скопировать только номер **Id** своего аккаунта, открытого как @AndyTherapist. Это сторонний справочный бот, он не должен получать токен BotFather. Альтернатива — защищённый read-only Bot API preflight через уже настроенный сервер, без стороннего бота.
3. **Первое защищённое хранилище:** https://vercel.com/super10/codex-public-book-library/settings/environment-variables → Add:
   - `HH_PRACTICE_TG_BOT_TOKEN` = **скопированный BotFather Token**;
   - `HH_PRACTICE_TG_CHAT_ID` = **скопированный цифровой Id**;
   - Environment: **Production**, скрытый тип **Encrypted/Sensitive**, без `NEXT_PUBLIC_`. `HH_PRACTICE_TG_ENABLED=false` уже предусмотрен до подтверждения. После сохранения нужно новое Production deployment, этим занимается интеграционный оператор.
4. **Совет ИИ / отдельный Vercel:** https://vercel.com/super10/ai-council-chat/settings/environment-variables → те же значения под именами `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Отдельный `COUNCIL_TELEGRAM_ACCESS_KEY` в этом окружении уже создаётся безопасным оператором; не заменять его BotFather token! Переключатель `COUNCIL_TELEGRAM_ENABLED=false` сохраняется до подтверждения Bot API.
5. **Ежедневный аудит GitHub Actions:** https://github.com/andylitvinov-design/ai-projects-brain/settings/secrets/actions → New repository secret с **теми же** значениями `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Это другое защищённое хранилище: Vercel не передаёт значения в GitHub автоматически. Ключи `GEMINI_API_KEY` / `OPENROUTER_API_KEY` добавлять отдельно только после проверки бесплатного проекта/API и лимитов.
6. **Флаги GitHub:** https://github.com/andylitvinov-design/ai-projects-brain/settings/variables/actions → `COUNCIL_DAILY_TELEGRAM_ENABLED=true` **только когда Telegram идентичность и бесплатные ключи проверены**. Альтернатива Gemini-only — `GEMINI_TELEGRAM_ENABLED`, не запускать две рассылки одновременно.

### Почему AI Council probe безопаснее

Кнопка **«Проверить подключение (без отправки)»** в https://ai-council-chat.vercel.app, после ввода отдельного 32+-символьного owner access key, вызывает официальный Telegram Bot API: `getMe`, `getChat` и `getWebhookInfo`. Сервер проверяет **@Andydotbot** и **private chat @AndyTherapist** по числовому ID. Проверка работает даже когда `COUNCIL_TELEGRAM_ENABLED=false`. Она не читает старые сообщения, не вызывает getUpdates, не меняет webhook, не отправляет документ и не возвращает числовой ID/токен браузеру. Неверный бот/чат блокирует реальную доставку. Наличие webhook не мешает исходящей отправке и не означает его разрешение менять.

Для ручной отправки владелец может показать сохранённый `COUNCIL_TELEGRAM_ACCESS_KEY` в разрешённом Vercel UI и скопировать в настройки AI Council; он хранится только в памяти открытой вкладки и не должен быть публичным. Реальное получение сообщения подтверждается отдельно после Bot API sendDocument.

---


**Состояние:** реализация в `ai-projects-brain`. Telegram LIVE не подтверждён без реального Bot API сообщения. Не добавлять API-ключи в GitHub Issues, чаты, код или файлы отчётов.

## Одна существующая автоматизация

Используется уже существующий файл `.github/workflows/daily-gemini-telegram.yml`, без нового cron:

- **09:15 America/Toronto** ежедневно; автоматический переход на EST/EDT.
- Проверка не более 24 публичных страниц EN/RU/ES через безопасные анонимные HTTP GET. Персональные кабинеты, CRM, клиентские записи, приватные файлы, cookie, платежи не читаются.
- Включение **нового режима** требует GitHub Repository Variable `COUNCIL_DAILY_TELEGRAM_ENABLED=true`; если она выключена, существующий legacy `GEMINI_TELEGRAM_ENABLED=true` оставляет прежнюю Gemini-only логику без одновременного второго запуска.
- Независимые запросы Gemini и Mistral — только при проверенной бесплатной модели/подтверждённом владельцем Free/Experiment Tier. Платный fallback отключён. Максимум Gemini 2 обращения (анализ и сводное ТЗ) + Mistral 1 обращение (если доступен).
- Детерминистические проверки title/description/H1/lang/HTTP status формируют минимальное полезное ТЗ, даже когда API провайдеров не подключены. Нельзя называть такой отчёт результатом Gemini или Mistral.
- Личный **Muse**: доступен только ручной импорт в существующий AI Council. Никакого подтверждённого API к пользовательскому персональному Muse нет. Meta Model API Muse Spark — другая, платная модель (даже Contributor pay-as-you-go). Не запускать её и не выдавать за персональный Muse.
- В **одном** отчёте: статусы каждого ИИ, отдельные исходные ответы, независимый черновик ТЗ (когда Gemini доступен), проверенные HTML-кандидаты со ссылками и критериями приёмки, ограничения методов.
- По одному датированному публичному комментарию в [Issue #242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242) с фактическими проверками. Архив НЕ создаёт Git-коммит/Vercel деплой. В Telegram через **@Andydotbot** отправляется .md вложение + короткое пояснение/ссылка. Повторная доставка без повторной генерации, как в существующем режиме.
- Исторические уже доставленные Gemini-отчёты того же дня защищены от новой дубль-рассылки.
- Сгенерированные задачи НИКОГДА сами не merge/deploy сайт или не публикуют медицинскую информацию.

## Однократная защищённая настройка

В [GitHub Repository Secrets](https://github.com/andylitvinov-design/ai-projects-brain/settings/secrets/actions) добавить **только через защищённый интерфейс**:

| Secret | Предназначение |
|---|---|
| `TELEGRAM_BOT_TOKEN` | существующий bot @Andydotbot, получить приватно через [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | числовой ID приватного чата с @AndyTherapist (не строка `@AndyTherapist`), узнать через Bot API приватно после `/start` |
| `GEMINI_API_KEY` | ключ Google AI Studio, только при подтверждённом Free Tier |
| `MISTRAL_API_KEY` | опционально: Mistral Experiment, только после подтверждения бесплатного проекта |
| `OPENROUTER_API_KEY` | альтернатива для Mistral: динамически проверенная `mistralai/*:free`, все цены каталога ноль и API `usage.cost === 0` |

**GitHub Variables (не Secrets):**
- `COUNCIL_DAILY_TELEGRAM_ENABLED=true` — включает единый ежедневный отчёт (не переключает billing).
- `GEMINI_FREE_TIER_CONFIRMED=true` — только когда владелец проверил бесплатный проект Google (при отсутствии Gemini будет честно `NOT_AVAILABLE`).
- `MISTRAL_EXPERIMENT_CONFIRMED=true` — только когда бесплатный Experiment подтверждён. Альтернативный OpenRouter путь работает лишь при подтверждённой нулевой стоимости каждой модели.
- Старый `GEMINI_TELEGRAM_ENABLED` можно оставить; при включённом Council новом режиме legacy-отправка не дублируется.

**Важно:** GitHub Actions **не способен гарантировать**, что владелец позже не изменит Google/Mistral биллинг. При риске платы выключите соответствующую переменную. Для OpenRouter guard требует реальную проверку цены и подтверждение нулевого результата; при несоответствии не принимает модельный ответ.

### Telegram owner handshake

1. Открыть [@Andydotbot](https://t.me/Andydotbot) под аккаунтом [@AndyTherapist](https://t.me/AndyTherapist) и нажать **Start** / отправить `/start`.
2. Приватно получить numeric chat ID (например, через Bot API `getUpdates` при отсутствии конкурирующего webhook); не вставлять bot token/chat ID в открытый issue/чат.
3. В Secret settings добавить значения. Telegram bot должен иметь право отправки в выбранный чат.
4. Запустить [GitHub Actions workflow](https://github.com/andylitvinov-design/ai-projects-brain/actions/workflows/daily-gemini-telegram.yml) вручную, branch `main`, только после настроек.
5. Проверить полученный .md, дату Торонто, отдельные реальные ответы и `NOT_AVAILABLE`, статус Bot API, отметку `HH-COUNCIL-TELEGRAM-SENT` в Issue #242.
6. Второй запуск в тот же день НЕ должен повторно вызывать модели/слать Telegram.

Отсутствующие секреты Telegram блокируют доставку; наличие `@username` не заменяет numeric chat ID.

**Вместе со статистикой кабинета мастера:** можно использовать один и тот же бот `@Andydotbot` и один и тот же числовой `chat_id` для ежедневного AI Council и My Practice. Но это ДВА защищённых места настройки: GitHub Actions Secrets (AI Council) и Vercel Production env проекта `codex-public-book-library` (`HH_PRACTICE_TG_BOT_TOKEN`, `HH_PRACTICE_TG_CHAT_ID`, `HH_PRACTICE_TG_ENABLED`). Секреты не синхронизируются автоматически и не должны храниться в коде. Настраивать и проверять каждую доставку отдельно.


## Проверка без расходов и реальных провайдеров

```bash
node --check tools/ai-council-chat/scripts/daily-council-providers.mjs
node --check tools/ai-council-chat/scripts/daily-multi-ai-telegram.mjs
node --test tools/ai-council-chat/tests/daily-gemini-telegram.test.mjs tools/ai-council-chat/tests/daily-multi-ai-telegram.test.mjs
```

Проверяются fail-closed, модельная принадлежность, 0$ catalog/cost, отсутствие платных fallback, честный Muse MANUAL_ONLY, Toronto/DST, idempotency, retry при Telegram сбое, отсутствие дублирования старого Gemini режима. CI не делает реальных ИИ/Telegram вызовов.

## Что не подтверждено до end-to-end

- Наличие Google Free Tier, Mistral Experiment и их API keys в GitHub Secrets;
- доступность конкретного `gemini-3.8-flash` и текущих Mistral free моделей на дату реального запуска;
- реальная отправка .md владельцу через @Andydotbot;
- автоматическая интеграция **персонального** Muse (нет проверенного API, требуется отдельный продуктовый доступ и разрешение стоимости/приватности).

## Безопасность/откат

`COUNCIL_DAILY_TELEGRAM_ENABLED=false` прекращает новый режим без удаления исторического Gemini workflow. Если legacy переменная включена, старый Gemini-only путь может продолжать рассылку — отключите оба флага, если нужно полностью остановить все сообщения. Никаких client-specific данных и секретов в issue, Telegram отчёт или JS bundle. Отказ Telegram не вызывает повторную генерацию модели. При разрыве между подтверждением Bot API и пометкой комментария возможна повторная доставка; при диагностике сверить дату/архив до ручного re-run.
