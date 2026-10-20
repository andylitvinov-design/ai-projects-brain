# ТЗ Holistic House — 2026-10-20

Часовой пояс America/Toronto. Документ содержит задачи для разработки после проверки фактов. Production: https://holistichouse.vercel.app; code andylitvinov-design/books; branch codex/public-book-library; Vercel READY deployed SHA 5ed3544dd471461ea4d3b9a1258d73c3d37ef199. VS Lab: NEEDS_VERIFICATION.

## P1 — публичные тесты, effort S
URL: /en/tests, /ru/tests, /es/tests. Source: app/[locale]/tests/page.tsx и data/seo.js. Ожидается реальный GET 200, title, H1, canonical, hreflang, присутствие трёх URL в sitemap.xml и запрет /client в robots.txt. Источник содержит реализацию; живой браузер пока не проверен. Issue books #306.

## P1 — подтверждённая заявка, effort M
URL: /en/services и /en/services/free-situation-review (также RU/ES). Source: app/[locale]/services/page.tsx. Путь: гостевая страница → добровольная консультация → подтверждённый enquiry в CRM. Открытие мессенджера не является заявкой. Критерий: отсутствие дубликатов и передачи приватных ответов в аналитику. Issues books #990, #991.

## P1 — ссылка испанских тестов, effort S
URL: /es/services. В source ссылка tests теперь /es/tests вместо вчерашнего /es/client. Статус SOURCE-FIXED, но browser navigation NEEDS_VERIFICATION. Issue books #990.

## P2 — OG locale, effort S
URL: /es/services. В generateMetadata источник задаёт en_CA для испанской страницы. Желаемый ES og:locale es_ES при сохранении EN/RU. Критерий: unit test трёх локалей и живой HTML после release. Issues #306/#230.

## P2 — заголовки тестового кабинета, effort S
URL: /ru/client/tests и /es/client/tests. Статичный английский title при noindex. Желаемая локализация title с сохранением noindex/nofollow. Issue #230.

## Ограничения
Реально проверен только robots.txt: HTTP 200. Другие HTML URL, sitemap, Core Web Vitals, заявки и GA4 не проверены. GSC Wizard сообщает subscription_required. Платные API, клиентские данные, публикации и изменения production не входят в аудит. аудит ChatGPT — Gemini/Mistral не запрашивались.

[Подробный аудит](2026-10-20-audit.md).
