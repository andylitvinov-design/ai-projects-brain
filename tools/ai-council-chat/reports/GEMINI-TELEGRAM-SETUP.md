# Holistic House — ежедневные отчёты Gemini в Telegram

Решение **без дополнительных ежедневных Git-коммитов и Vercel-деплоев**.

## Как работает

- Расписание GitHub Actions: ежедневно **09:15 America/Toronto** (DST-aware), после существующего аудита ChatGPT в 09:00.
- Анонимный HTML/HTTP-аудит до 24 публичных EN/RU/ES страниц и sitemap. Личный кабинет, закрытые URL, API, формы и реальная браузерная скорость не проверяются. Это **не** полноценный Lighthouse/UX browser audit.
- **Один** запрос Gemini Developer API модели **gemini-3.8-flash** в день Торонто. На Paid Tier может стоить денег, поэтому нужно подтвердить Free Tier.
- Отчёт и фактический JSON-архив сохраняются одним комментарием за дату в [GitHub Issue #242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242). Комментарии не запускают сборку Vercel.
- Полный Markdown-отчёт отправляется в Telegram Bot API как вложение (.md) со ссылкой на комментарий архива.
- После успешного ответа Telegram Bot API тот же GitHub-комментарий помечается как доставленный. Повторный запуск не вызывает второй раз Gemini и не отправляет уже помеченный отчёт. Система пробует повторно отправить до трёх недоставленных отчётов за последние 7 дней.

Отдельные ChatGPT-отчёты и их LATEST.md не изменяются.

## Однократное безопасное подключение

Владелец должен добавить эти секреты самостоятельно — **не присылать токены в переписку, GitHub Issue или код**.

1. [Google AI Studio](https://aistudio.google.com/apikey) — создать API key для Gemini Developer API. Сначала проверить, что Google API project действительно **Free Tier**, а не Paid Tier. Сам скрипт **не может отключить биллинг** Google; при ошибках квоты нет платного fallback.
2. [Telegram @BotFather](https://t.me/BotFather) — создать/выбрать бота, получить BOT TOKEN. Написать боту /start со своего аккаунта, чтобы он мог отвечать. Выяснить числовой Telegram chat ID через Bot API getUpdates только приватно. Для группы добавить бота с правом отправлять сообщения.
3. Открыть [GitHub Actions Secrets](https://github.com/andylitvinov-design/ai-projects-brain/settings/secrets/actions) и создать **Repository Secrets**:
   - GEMINI_API_KEY — ключ Google AI Studio;
   - TELEGRAM_BOT_TOKEN — секрет Telegram-бота;
   - TELEGRAM_CHAT_ID — числовой ID Telegram-чата.
   Эфемерный GITHUB_TOKEN выдаётся самим GitHub Actions; вручную создавать его не нужно.
4. Проверить и слить [PR #241](https://github.com/andylitvinov-design/ai-projects-brain/pull/241) в default branch main. **Только после merge GitHub включает cron**. Запустить один ручной Actions → Holistic House Gemini audit → Telegram → Run workflow.
5. Проверить реальное сообщение с Markdown-документом в Telegram, ссылку на GitHub Issue #242 и отметку доставки в комментарии. До этой проверки не утверждать, что рассылка работает.

## Ошибки и ограничения

Если не хватает любого секрета, workflow останавливается без вызова Gemini. При 403/429/5xx Gemini нет платного fallback и нет автоматического цикла повторных генераций. Ошибка отправки Telegram сохраняет оригинальный отчёт в GitHub и не помечает доставку — возможна безопасная повторная попытка. Если Telegram отправил файл, а обновление комментария GitHub упало, может возникнуть повторная отправка при следующем запуске (проверить логи). Секреты, chat IDs и Telegram message IDs не записываются в issue. Публичные данные сайта в открытом GitHub Issue могут содержать только публичный текст, поэтому никакие защищённые страницы не читаются.

Github Actions cron может стартовать немного позже 09:15. Единственные ежедневные сетевые операции — HTTP-скан, один Gemini API вызов и GitHub issue / Telegram Bot API. Никаких новых Git-коммитов или Vercel-деплоев из-за архива Gemini.
