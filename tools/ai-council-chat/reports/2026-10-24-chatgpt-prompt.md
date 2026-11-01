# Holistic House — приоритетное русское ТЗ по аудиту — 2026-10-24

**Контекст:** только сформулировать последующую работу, без авто-merge, публикации, нового деплоя, рекламы, платежей, приватных данных и платных AI API. Текущий production: https://holistichouse.vercel.app → andylitvinov-design/books, ref codex/public-book-library, Vercel READY @ **a7397fd34f7b5eb7bda049b12968af0b1639e32b**; GitHub default codex/bootstrap-books не использовать для доказательства live. [Источник полного аудита](2026-10-24-audit.md).

## Приоритет / ожидаемый результат

1. **P1 — SAFETY — EXISTING [PR #1531](https://github.com/andylitvinov-design/books/pull/1531), M/HIGH risk.** Сценарий business→urgent в текстовом и simulated-voice режиме EN/RU/ES всегда показывает срочную безопасную реакцию до рекомендаций услуг. Согласовать PR с deployed ref и провести честный автоматизированный + разрешенный browser регресс; не выдавать test script или PR за production E2E. PASS: ни одного offer перед safety. Не merge в рамках аудита.

2. **P1 — VERIFIED ENQUIRY/CONSENT — EXISTING [#990](https://github.com/andylitvinov-design/books/issues/990), [#985](https://github.com/andylitvinov-design/books/issues/985), L/HIGH risk.** Разделить impression, messenger click, draft, consented lead persisted, verified enquiry, confirmed booking, paid. Договориться об owner-side идемпотентном readback на искусственном тестовом аккаунте. PASS: один consent→одна запись; click без согласия не становится лидом; никаких реальных клиентских данных.

3. **P2 — SEO/ES QA — NEEDS_VERIFICATION, S–M/MEDIUM risk.** /es/services и /es/tests через public extractor показали title/H1, но не canonical/OG при наличии на /en/services. НЕЛЬЗЯ утверждать отсутствие meta до raw GET/Next metadata на deployed SHA. Испанская /es/services/free-situation-review содержит кириллицу в извлеченных review/media блоках; выяснить видимость, права и локализацию. PASS: self canonical/OG/hreflang/JSON-LD там, где нужны, проверено raw HTML + разрешенным просмотром; только согласованные отзывы видимы по релевантному языку. Работать внутри действующих задач, без новых дублей.

4. **P1 — report save — EXISTING [PR #1491](https://github.com/andylitvinov-design/books/pull/1491), M/HIGH privacy risk.** Проверить с разрешенным фиктивным отчетом кнопку EN/RU/ES «Save my report» → явное согласие → Google sign-in → saved state и повторное открытие на мобильном 320–430px. PASS: частные данные доступны только разрешенному владельцу и нет сохранения без consent. PR OPEN; никакого live утверждения.

5. **P2 — UTM/Meta attribution — EXISTING [issue #988](https://github.com/andylitvinov-design/books/issues/988), [PR #1821](https://github.com/andylitvinov-design/books/pull/1821), M/MEDIUM risk.** Проверить allowlist источников fb/ig, устранение приватных query и запрет click→lead подмены. Отдельная авторизация нужна для запуска кампаний или analytics; в этом аудите всё OFF.

## Актуальные VERIFIED источники и не подтвержденное

- Сегодня Vercel canonical alias dpl_GBDQ32cKHz5D9r7JFBTy1ApsYfYf, READY, sha a7397fd; вчера sha 8477d67. HTML extractor прочитал EN/RU/ES homepage, services, tests, Academy, free written review, robots/sitemap и дополнительные локализованные страницы. Sitemap **689 записей** против **684** вчера; НЕ 689 проиндексированных.
- Local runtime DNS NameResolutionError и web.open недоступность — блокеры аудитора, а не доказательство 5xx сайта. Успешные extractor pages не дают гарантированный raw HTTP 200; browser E2E, Web Vitals, auth, CRM, платежи, GSC coverage НЕ ПРОВЕРЕНЫ. GSC Wizard previously BLOCKED subscription_required, не платить.
- Marketing: verified тексты «from €50» EN/RU/ES, €50/30 и €100/60 в ES services; messenger click не лид. Metricool YouTube subscribers 148 на 2026-10-23 и неполный 2026-10-24, без доказанного сайта/лидов.
- VS Lab: **NEEDS_VERIFICATION** — отсутствует подтвержденный отдельный сайт/repo в registry. ChatGPT GPT-6 — эта проверка; **Gemini/Mistral НЕ ЗАПРАШИВАЛИСЬ**; #218/#219 запрещают платную генерацию/публикацию AI-видео без явного одобрения.
- Архив Telegram: **только** GitHub issue [#242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242) c ежедневным HH-CHATGPT-DAILY маркером и последующий существующий HH cron 21:00 UTC. Комментарий/READY ≠ Bot API accepted, никаких писем Gmail или дополнительных cron/bot.
