# ТЗ Holistic House на 2026-10-22

Только разрешённый read-only QA без клиентских данных и платных API.

1. P1: Проверить живые EN/RU/ES routes homepage/services/tests/academy, robots.txt, sitemap.xml, HTTP/DOM/canonical/hreflang с реальными evidence; источник books@596741c4627f3cc75a6ae8def8bdc39081ba230a; issue books#306.
2. P1: Проверить без персональных данных и без production транзакций последовательность consent → committed enquiry → CRM readback; issues books#990/#991. Клик не равен лиду.
3. P1: В рамках PR books#1491 проверить Google report save в разрешённой тестовой сессии, не путать OAuth и сохранение.
4. P1: books#1519 — связать rule-based homepage dialog с подтверждёнными курсами, оценить результаты, не выдумывать продажи.
5. P2: локализовать private EN/RU/ES tests title, сохраняя noindex; issue books#230.

Статус: Vercel READY — не живой HTTP; реальные Web Vitals и браузерные E2E не выполнены. Gemini/Mistral не запрашивались. VS Lab NEEDS_VERIFICATION.
