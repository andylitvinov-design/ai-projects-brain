# Holistic House — готовый к реализации бриф Codex/команде, 2026-10-19
Содержательная доказательная база: [аудит 2026-10-19](2026-10-19-audit.md). **ChatGPT GPT-6; Gemini/Mistral не запрашивались.** В качестве единственного baseline SOURCE использовать deployment SHA [`fe775f20fe11814681b9bfebe17a5b75db42d098`](https://github.com/andylitvinov-design/books/commit/fe775f20fe11814681b9bfebe17a5b75db42d098), репозиторий `andylitvinov-design/books`, ветка `codex/public-book-library`; не работать на repo default `codex/bootstrap-books` вместо целевой ветки.

## 1. P1: HH-ES-TEST-CTA (NEW, effort S)
**Факт:** [`components/services-studio-offers.tsx`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/components/services-studio-offers.tsx) выдаёт `/es/client` для карточки бесплатных тестов в `/es/services`, EN/RU используют `/{locale}/client/tests`. Есть `app/[locale]/client/tests/page.tsx`, но не найден `app/[locale]/client/page.tsx`. **Live status / redirect не измеряли; не заявляй HTTP 404 без проверки.**
**Задача:** протестируй реальный route/UX в preview и production read-only; направь ES CTA в сознательно выбранный working tests entry (обычно `/es/client/tests` для «начать тест» либо `/es/tests` для information hub). Убери необъяснённое ES-исключение, сохраняй локаль, не индексируй личные данные. **Приёмка:** EN/RU/ES переходы и mobile 320–390px реальные; noindex client не изменён; никакой guest auth regression. Привяжи к существующему [#990](https://github.com/andylitvinov-design/books/issues/990), не заводи дубль.

## 2. P1: HH-TESTS-PUBLIC-VERIFY (FIXED_IN_DEPLOYED_SOURCE, effort S)
**Факт:** [`app/[locale]/tests/page.tsx`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/app/%5Blocale%5D/tests/page.tsx) содержит публичный EN/RU/ES hub (H1/title/canonical/hreflang), [`data/seo.js`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/data/seo.js) содержит 3 public tests sitemap entries, `/client` закрыт robots. Старый аудит 18 октября о *missing public hub* устарел для exact production source.
**Задача:** не создавать новый hub. Собери реальные HTTP response + final URL + extracted SEO для `/en/tests`, `/ru/tests`, `/es/tests`, `/robots.txt`, `/sitemap.xml`, проверь индексируемую страницу и раздельный private tests path; сравни prod и source. **Приёмка:** три 200 без редиректа на `/client`, hreflang и sitemap; client remain noindex. При отсутствии браузера ставь `NOT_TESTED`, не делай фиктивный зелёный чек.

## 3. P2: HH-ES-OG-LOCALE (NEW, effort S)
**Факт:** [`app/[locale]/services/page.tsx`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/app/%5Blocale%5D/services/page.tsx) задаёт `openGraph.locale = locale === "ru" ? "ru_RU" : "en_CA"`; для ES неверно.
**Задача:** добавить ES `es_ES`, оставить EN `en_CA`, RU `ru_RU`; предпочтительно использовать общий безопасный helper при доказанной нужде. Регрессионный тест для generated metadata EN/RU/ES с `og:locale`, title/canonical/hreflang. **Приёмка:** source unit/metadata pass и server-rendered HTML preview; не менять критические SEO aliases; существующий [#306](https://github.com/andylitvinov-design/books/issues/306).

## 4. P2: HH-RU-TESTS-TITLE (OLD, effort S)
**Факт:** [`app/[locale]/client/tests/page.tsx`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/app/%5Blocale%5D/client/tests/page.tsx) задаёт English-only `title: Test Explorer | Holistic House` для EN/RU/ES.
**Задача:** `generateMetadata` с locale-specific title: EN current, RU «Тесты и самонаблюдение | Holistic House», ES «Explorador de tests | Holistic House»; сохранить **`robots: { index:false,follow:false }`** и no-referrer. **Приёмка:** title каждого языка корректен без регрессии результатов, auth и роботов.

## 5. P1: HH-SALES-FUNNEL (EXISTING, effort M)
В актуальном [`app/[locale]/services/page.tsx`](https://github.com/andylitvinov-design/books/blob/fe775f20fe11814681b9bfebe17a5b75db42d098/app/%5Blocale%5D/services/page.tsx) уже стоят `ServicesConversionHero`, `ServicesStudioOffers`, `PublicConsultationCta`. Реально проверь цену и тип сессии, бесплатный письменный разбор, optional paid CTA, мобильную воронку, клики и правильную регистрацию лидов без личных ответов в UTM/analytics. Отмечай точные данные, не объявляй успешной отправкой открытие WhatsApp. Работа уже учтена в [#990](https://github.com/andylitvinov-design/books/issues/990), [#991](https://github.com/andylitvinov-design/books/issues/991); не создавать дубль. Поддержать privacy hold GA4, пока не проверены consent/no-PII.

## Недоступные сегодня проверки
Ни один живой HTTP-код, raw DOM, мобильный скриншот, реальные Web Vitals, реальные оплаты, CRM, GSC/GA4 latest НЕ получен. GSC Wizard возвращает **subscription_required**; платные подключения не использовать. VS Lab **NEEDS_VERIFICATION**. При публикации видео соблюдать [#218](https://github.com/andylitvinov-design/ai-projects-brain/issues/218) и [#219](https://github.com/andylitvinov-design/ai-projects-brain/issues/219); не расходовать credits.

## Порядок реализации и безопасность
1. До code-change в разрешённом браузере воспроизвести ES CTA; если точный redirect уже работает, зафиксировать и не создавать ложный дефект.
2. Исправить локальную ссылку и метаданные маленьким PR в `books`; добавить тесты; прогнать существующие lint/unit/build/SEO checks без затрат.
3. Сделать preview UI/HTTP проверки; production менять **только по отдельной явно разрешённой процедуре**. Не менять/слать клиентские данные, не проводить транзакции, не запускать оплату GSC/HeyGen/Ads.
4. Отдельно собрать live доказательства для public tests и CRM funnel; отмечать `source-fixed` отдельно от `production-verified`.
