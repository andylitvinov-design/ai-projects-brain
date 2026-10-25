# Последний аудит Holistic House / VS Lab

**Дата:** 2026-10-25 · America/Toronto. Доказательный read-only ChatGPT (GPT-6) аудит. Gemini/Mistral **не запрашивались**.

- [Полный аудит 2026-10-25](2026-10-25-audit.md)
- [Русское приоритетное ТЗ 2026-10-25](2026-10-25-chatgpt-prompt.md)
- [Предыдущий аудит 2026-10-24](2026-10-24-audit.md)
- [Telegram canonical queue #242](https://github.com/andylitvinov-design/ai-projects-brain/issues/242)

**Production VERIFIED metadata:** https://holistichouse.vercel.app → andylitvinov-design/books@78cae80995439223b6169de4d87cedda686f9f3b · ref codex/public-book-library · Vercel dpl_7G51ycp4t6LNHa3dHLuL8DVBpk1M READY. Новый deployment f18af... во время проверки BUILDING (не production). Это не live HTTP/E2E.

**NEW:** sitemap extractor 622 URL против 689 вчера (-67), гипотеза динамического/cached расхождения, нужен raw XML. ES canonical/OG/hreflang **реализованы в deployed source** `app/es/services/page.tsx` и `lib/spanish-metadata.ts`, но live raw HTML не проверен. Metricool YouTube 149 подписчиков за неполный 2026-10-25 против 148 вчера — не лиды.

**Топ-3:** P1 подтвердить sitemap delta, P1 safety [books PR #1531](https://github.com/andylitvinov-design/books/pull/1531) (OPEN/DRAFT, не live), P1 consented lead [issues #990/#985](https://github.com/andylitvinov-design/books/issues/990). Save report [PR #1491](https://github.com/andylitvinov-design/books/pull/1491) OPEN, не проверено E2E. VS Lab NEEDS_VERIFICATION. GSC Wizard ранее BLOCKED subscription_required.

**Telegram:** только один проверенный авторский комментарий даты в issue #242 — очередь для существующего cron в 21:00 UTC. Наличие комментария не доказывает доставку (Bot API accepted и приватный receipt отдельно). Gmail выключен. Без платных моделей/AI-видео/деплоев/секретов/клиентских данных.
