# Holistic House — ChatGPT implementation brief / audit prompt — 2026-10-23

Дата: 2026-10-23 (America/Toronto). **Только read-only audit, рекомендации/ТЗ.** Это описание возможной последующей работы, **НЕ авторизация релиза, merge, платного API, рекламы или работы с клиентскими данными**.

## Verified baseline

- Public production: https://holistichouse.vercel.app, Vercel project codex-public-book-library; READY deployment dpl_Ap2XnEpR6bbjiFNaTiei3tWDPnHX at exact sha **8477d67f64f0353e7ba744c1967f296e75a2f713** on **codex/public-book-library**. GitHub andylitvinov-design/books default codex/bootstrap-books is NOT deployment source.
- Main AI Council: andylitvinov-design/ai-projects-brain/main; Vercel ai-council-chat.vercel.app READY at f3b1c8c32336748f3b8159bf4b665dbb8faac9ac. Gemini and Mistral were **not queried** in this ChatGPT audit.
- Public extractor read EN/RU/ES homepage, services, tests, Academy and free situation review; raw GET/client-side browser automation not completed. /robots.txt and /sitemap.xml publicly extracted (684 URL entries); this is not indexed coverage.
- Metricool aggregates: YouTube 148 subscribers on 2026-10-23 vs 147 on 2026-10-21; not a site conversion metric. GSC Wizard **BLOCKED subscription_required**, do not subscribe or retry paid API.

## Priority tasks (continue existing issues and PRs; avoid duplicates)

1. **P1 · HH-2026-10-23-01 · Safety decision precedence**. https://github.com/andylitvinov-design/books/pull/1531 is OPEN, **NOT live**. After a business question, urgent statement must route before sales matching (EN/RU/ES + simulated voice). PASS: no offer precedes safety text in unit and authorized hydrated production browser checks after approved release. Effort M, risk high; no auto merge.
2. **P1 · HH-2026-10-23-02 · Verified CRM intake**. Reuse https://github.com/andylitvinov-design/books/issues/990 and https://github.com/andylitvinov-design/books/issues/985. Preserve consent ledger and owner-only RLS. Differentiate click, prepared messenger, committed/consented contact, verified enquiry, booked and payment-received; no health info or test answers in analytics/UTM. Source click counters: https://github.com/andylitvinov-design/books/blob/8477d67f64f0353e7ba744c1967f296e75a2f713/components/service-funnel-tracking.tsx . PASS: single idempotent lead after consent, no saved lead without consent, no click-as-lead. Effort L, privacy risk high; only authorized test account, never run real transactions.
3. **P2 · HH-2026-10-23-03 · Multilingual SEO parity**. Public extractor returned canonical + OG at /en/services and /ru/services but not /es/services or /en/tests and /es/tests; could be extractor limitations, mark NEEDS_VERIFICATION. First raw GET head; only then repair page-level Next Metadata with reciprocal hreflang, canonical, OG/Twitter and valid schema where relevant. PASS: inspect exact production HTML and metadata for EN/RU/ES, no private route indexation. Effort S–M, low-medium risk.
4. **P2 · HH-2026-10-23-04 · Optional redirect for bare routes**. TinyFish reported 404 for /services, /tests and /academy; /en equivalents accessible. Confirm users/referrers actually need aliases, then simple 308 redirects to localized pages, preserving SEO. Tie into #990 instead of new duplicate. PASS: redirect without loops and without touching client/admin. Effort S, low risk.
5. **P2 · HH-2026-10-23-05 · Save my report test**. https://github.com/andylitvinov-design/books/pull/1491 remains OPEN. Google login is not the persisted report. Authorized test only: consent→Google→save intent→commit→owner readback, access denied for others, mobile 320–430px. PASS: saved report exists after reload in owner cabinet; no private data disclosed. Effort M, high auth risk.

## Four required audit dimensions and checks

A. Tech: EN/RU/ES public routes, permitted GET/read-only, robots, production SHA; do not confuse Vercel READY, source tests, browser interaction. No fake 200/5xx/console/CWV.
B. Conversion: free text assessment and personal paid sessions (€50/30m and €100/60m only when directly verified) on same journey; separate messenger click from confirmed CRM and paid consultation, avoid medical guarantees/testimonial invention.
C. SEO: /robots.txt, /sitemap.xml, multilingual metadata and reciprocity. Google indexing and GSC unavailable/NOT_TESTED.
D. Promotion: Metricool real aggregates only; public-analytics.ts at deployed source has PUBLIC_ANALYTICS_AVAILABLE=false, do not enable pixel/GA4 without opt-in privacy review. No validated paid campaigns, ad costs, leads or attribution; Toronto local SEO only recommendation.

## Acceptance and release boundaries

- Every task includes original URL/ref/sha, observed fact, reproduction, user scenario, impact, risk, effort and PASS/FAIL.
- Follow safe branch/PR review via separate authorization. All output here is an advisory brief; audit itself must not modify production, sessions, CRM, client info, analytics configuration or ads.
- AI video requires explicit approve-to-generate and approve-to-publish per https://github.com/andylitvinov-design/ai-projects-brain/issues/218 and https://github.com/andylitvinov-design/ai-projects-brain/issues/219 .
- VS Lab = NEEDS_VERIFICATION; confirmed site/repo absent from the registry reviewed.
- Delivery mode: do not send Gmail. One idempotent owner-authored YYYY-MM-DD marker comment on https://github.com/andylitvinov-design/ai-projects-brain/issues/242 , only after complete marker/author scan, then independently verify readback; actual Telegram receipt requires server evidence. Existing source cron /api/internal/council-archive-telegram 0 21 * * * UTC, not instant.
- Model provenance: **аудит ChatGPT — Gemini/Mistral не запрашивались**.

Full audit: [2026-10-23-audit.md](2026-10-23-audit.md).
