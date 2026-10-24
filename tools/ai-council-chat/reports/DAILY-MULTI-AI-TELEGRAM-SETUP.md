## 2026-10-20: genuine independent Gemini/Mistral inference moved to ONE HH Vercel project

**Source of truth for all provider keys and the existing owner Telegram bot:** [Holistic House Vercel Production environment variables](https://vercel.com/super10/codex-public-book-library/settings/environment-variables). The existing bot has already been paired and accepted one Telegram test. DO NOT request or copy its bot token/private chat ID to GitHub or AI Council Vercel.

**GitHub Actions now runs archive-only with NO provider secrets:** scans public HTML/HTTP (24 URLs or fewer), writes a verified-source public JSON bundle and deterministic technical task draft to [Issue #242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242). No Gemini/Mistral API call is made in GitHub. New JSON is compact but complete and parseable, unlike the earlier 10,000-character truncation. GitHub's source report correctly says models NOT_AVAILABLE because it deliberately does not call them.

**Actual model responses and Telegram delivery** happen in the existing Holistic House server-side Council cron at **21:00 UTC** (17:00 EDT / 16:00 EST), moved later to avoid GitHub queue delays. The server reads the verified GitHub public evidence and runs the two independent model reviews concurrently, then appends the original deterministic HTML/HTTP tech spec in ONE .md attachment sent via owner bot. Genuine models are named only if the respective verified provider response arrives. The report is cached in the existing private forced-RLS day receipt before Telegram send; no duplicate provider requests on delivery retry.

**Only three Vercel variables required to activate real AI responses:**

- `HH_COUNCIL_GEMINI_API_KEY` (Sensitive, Production) from [Google AI Studio](https://aistudio.google.com/apikey) with a confirmed **Free Tier** project.
- `HH_COUNCIL_GEMINI_FREE_TIER_CONFIRMED=true` (Plain, Production), set true **only** when owner has verified project/account Free Tier. Never infer from API key presence; Google may bill paid projects.
- `HH_COUNCIL_OPENROUTER_API_KEY` (Sensitive, Production) from [OpenRouter](https://openrouter.ai/settings/keys). Uses only `mistralai/*:free` current zero-priced models with explicit `max_price=0` + `allow_fallbacks=false` + `usage.cost===0`; no paid Mistral API.

No paid models, automatic fallback, client data, diagnosis, private test records or bot credentials are involved. Gemini/Mistral key setup is **not completed** until the owner provides keys securely. If absent, Telegram receives an honest public-only HTML draft, not fake AI analysis. To request an immediate verified archived daily report after setup, sign in to [HH /admin/telegram-setup](https://holistichouse.vercel.app/admin/telegram-setup) and click **Send Gemini + Mistral audit now**, which shares the same durable day receipt with the cron and cannot create duplicates.

Previous steps below describing model API secrets in GitHub and old 15:00 UTC Council schedule are **superseded**.

---

# Holistic House Telegram — один сервис для подключения бота

Статус: **код обновляется, реальная доставка @Andydotbot ещё не проверена**.
Владелец: **@AndyTherapist**. Бот: **@Andydotbot**.
Путь к настройкам бота ОДИН:

**[Vercel Holistic House → Environment Variables](https://vercel.com/super10/codex-public-book-library/settings/environment-variables)**

## Что сделать владельцу один раз

1. [@BotFather](https://t.me/BotFather) → `/mybots` → **@Andydotbot** → **API Token** → скопировать действующий токен (без Revoke). По скриншоту /start уже был отправлен боту Dot; новый бот не нужен.
2. Скопировать **свой числовой Telegram chat ID**, полученный безопасно после /start. Альтернатива — [@userinfobot](https://t.me/userinfobot) (сторонний бот, не передавать ему токен BotFather).
3. Вставить в **тот же проект Vercel**, Environment = **Production**, type = Encrypted/Sensitive:
   - `HH_PRACTICE_TG_BOT_TOKEN` = токен @Andydotbot;
   - `HH_PRACTICE_TG_CHAT_ID` = numeric ID приватного чата @AndyTherapist.
4. Переменная `HH_PRACTICE_TG_ENABLED` уже присутствует со значением `false`. Оставить выключенной до безопасной проверки владельца и тестовой доставки, затем оператор включает и проверяет производство после релиза.

**Не вводить токен и chat ID ни в GitHub Secrets, ни в Vercel AI Council.** Не отправлять токен в ChatGPT, issue или переписки. Понадобится новая Production deployment после обновления env.

## Что сделано автоматически

- Код Holistic House хранит BotFather token/numeric chat только в своём Production backend. Сервер проверяет Bot API `getMe` (@Andydotbot), `getChat` (private @AndyTherapist) и `getWebhookInfo`, не сбрасывая чужой webhook, и отклоняет несовпадающую личность.
- Один отдельный случайный 64-символьный **межсерверный** relay key настроен непосредственно через Vercel в Holistic House (`HH_COUNCIL_TG_RELAY_KEY`) и AI Council (`COUNCIL_TELEGRAM_RELAY_KEY`). Владелец не должен его копировать.
- AI Council с защищённым owner access key проксирует `probe` и `report` через серверный `https://holistichouse.vercel.app/api/internal/telegram-hub`. Telegram Bot Token в браузер, GitHub или AI Council Vercel не передаётся. Опция пересылки ответа через нативное «Поделиться» в Telegram по-прежнему доступна без ключей.
- GitHub Actions в 09:15 **America/Toronto** собирает публичный HTML/HTTP аудит, опциональные Gemini/Mistral обзоры при подтверждённом бесплатном доступе, и сохраняет отчёт в [Issue #242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242). GitHub **не отправляет Telegram, не содержит Telegram-токена или chat ID**.
- Holistic House в 15:00 UTC (11:00 EDT/10:00 EST; с возможным 1-часовым отклонением Vercel Hobby) читает **только комментарии github-actions[bot]** из публичного Issue #242, проверяет даты и маркеры, затем доставляет файл через свои Telegram credentials. Рядом работает существующий ежедневный отчёт статистики My Practice в 13:00 UTC, а housekeeping cron в 05:00 UTC не изменён.
- Закрытая таблица `app_private.council_telegram_deliveries` обеспечивает уникальные daily receipts и повторную попытку после сбоя без повторного запроса к ИИ. Для таблицы есть FORCE RLS, прямого чтения `anon`/`authenticated` нет.
- Автоматический Muse личного агента по-прежнему недоступен: в отчёте честный `MANUAL_ONLY`. Модель Meta Muse Spark не равна личному агенту и может быть платной.

## Что ещё отдельно от Telegram

Для **настоящих** автоматических ответов Gemini/Mistral потребуются действующие бесплатные модельные API ключи. В настоящее время GitHub Actions использует отдельно `GEMINI_API_KEY` / `OPENROUTER_API_KEY` или `MISTRAL_API_KEY`. **Это не Telegram credentials.** Без них GitHub всё равно может сохранить ограниченный фактический публичный HTML-аудит с техзаданием, но не будет выдумывать ответы моделей и не вызовет платные fallback. Можно оптимизировать хранение модельных ключей отдельно; они не нужны для одноразового подключения Telegram.

## Проверка

1. После настройки двух owner credentials в Holistic House Vercel — Production deployment `READY`.
2. AI Council owner-only `probe` после доступа к private owner key проверяет реального бота и private chat, не отправляя сообщения и не меняя webhook.
3. Под контролем владельца выставить `HH_PRACTICE_TG_ENABLED=true`, затем `COUNCIL_TELEGRAM_ENABLED=true` и проверить **одно** реальное `sendDocument` с подтверждённым chat ID.
4. Для статистики запустить один защищённый daily cron и повторить: ожидается `already_claimed`. Для сайта проверить архивный Council отчёт, затем центральную отправку и запись в private DB без дубликата.
5. Не считать Bot API accepted подтверждением чтения получателем.

## Отключение и откат

`HH_PRACTICE_TG_ENABLED=false` + redeploy останавливает **все три вида Telegram-отправки** через центральный шлюз: My Practice, Council ручной и ежедневные аудит/ТЗ. Он не удаляет отчёты в GitHub. Для полного отключения архива остановить отдельно GitHub workflow. Никаких массовых маркетинговых рассылок или клиентских данных через этот шлюз.

### Технические ссылки

- [Holistic House: gateway](https://github.com/andylitvinov-design/books/blob/codex/public-book-library/app/api/internal/telegram-hub/route.js)
- [Holistic House: archive delivery](https://github.com/andylitvinov-design/books/blob/codex/public-book-library/app/api/internal/council-archive-telegram/route.js)
- [AI Council server relay](https://github.com/andylitvinov-design/ai-projects-brain/blob/main/tools/ai-council-chat/api/telegram-deliver.js)
- [GitHub Actions archive](https://github.com/andylitvinov-design/ai-projects-brain/actions/workflows/daily-gemini-telegram.yml)
