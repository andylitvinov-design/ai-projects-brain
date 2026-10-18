# Holistic House — Gemini → Telegram (ежедневный аудит)

## Назначение

Дополнение к существующему аудиту ChatGPT в 09:00 America/Toronto. GitHub Actions ежедневно в **09:15 America/Toronto** (DST-aware) выполняет независимый запрос **Gemini 3.8 Flash**, сохраняет публичное техническое ТЗ и отправляет полный Markdown-файл в Telegram-бота.

- Копия отчёта: tools/ai-council-chat/reports/YYYY-MM-DD-gemini-audit.md
- Проверенные HTTP/HTML-данные: tools/ai-council-chat/reports/evidence/YYYY-MM-DD-gemini.json
- Последняя версия: tools/ai-council-chat/reports/GEMINI-LATEST.md
- Отметка об отправке: tools/ai-council-chat/reports/delivery/YYYY-MM-DD-telegram.json

Существующие ChatGPT-отчёты и их LATEST.md **не изменяются**. Максимум 24 анонимные публичные страницы EN/RU/ES, включая ключевые маршруты и выборку sitemap. Без личного кабинета, API/private, платежей, редактирования сайта, Vercel cron, платного fallback и просмотра персональных данных. Время HTTP-заголовков не равно загрузке страницы; полноценные browser/SEO/UX/Web Vitals проверки остаются за другими аудитами.

## Перед запуском: три GitHub Actions Secrets

Владелец должен выполнить эти действия самостоятельно; **секреты не отправлять в ChatGPT и не коммитить в репозиторий**.

1. Получить Gemini API key в [Google AI Studio](https://aistudio.google.com/apikey). **Проверить**, что проект Google использует именно API Free Tier, а не Paid Tier. У модели gemini-3.8-flash есть бесплатные квоты, но на Paid Tier вызовы могут тарифицироваться. Скрипт не может узнать/изменить настройки биллинга Google.
2. Создать или выбрать Telegram-бота в [@BotFather](https://t.me/BotFather), получить BOT TOKEN (секрет), затем открыть бота и отправить ему /start. Получить числовой chat ID из Telegram getUpdates с использованием токена только приватно. Для группы добавить бота и разрешить доставку.
3. Создать три **Repository Secrets** по адресу [GitHub Actions secrets](https://github.com/andylitvinov-design/ai-projects-brain/settings/secrets/actions):
   - GEMINI_API_KEY — ключ Google AI Studio
   - TELEGRAM_BOT_TOKEN — секрет Telegram BotFather
   - TELEGRAM_CHAT_ID — числовой ID личного или группового чата

## Активация

После проверки PR и Google Free Tier **слить PR в default branch main**. До merge расписание не выполняется: GitHub Actions расписание запускает workflow только из default branch. Запустить вручную Actions → Holistic House Gemini audit → Telegram → Run workflow и убедиться, что действительно пришло сообщение с .md вложением. До такого подтверждения отправка НЕ считается настроенной или протестированной.

## Поведение при сбоях

- Нет секретов: работа останавливается до вызова Gemini/Telegram.
- Gemini HTTP 429/403/ошибка: нет платного переключения модели, ложного отчёта или спама повторами.
- Не удалось отправить: созданный отчёт остаётся в GitHub без отметки о доставке; максимум три неприсланных отчёта повторно отправятся при следующем успешном запуске.
- Повторный запуск в тот же день не пересоздаёт отчёт и не расходует второй API вызов; доставленные отчёты отмечаются и пропускаются.
- Точная минута 09:15 — целевая, GitHub может задержать запуск.
- Для записи отчётов в main GitHub Actions требуется разрешение contents:write; если main запрещает Actions push, workflow завершится до отправки, потребуется отдельное санкционированное изменение публикации архива.
- Коммиты отчётов имеют маркер [skip ci], но реальное поведение автосборок стороннего хостинга нужно проверять отдельно.

Политика стоимости: не включать платные модели и планы без отдельного разрешения; не добавлять новые Vercel deployment и не создавать дублирующие ChatGPT scheduled tasks.
