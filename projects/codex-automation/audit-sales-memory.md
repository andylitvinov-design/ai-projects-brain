# Audit Sales Memory

Persistent longitudinal memory for the weekly `/audit-sales` portfolio review and the Sales Audit Intelligence framework update.

## Rules

- Read before every portfolio sales audit and every Sales Audit Intelligence upgrade.
- Compare each site with the previous saved state.
- Label major findings `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED`.
- Store heuristic scores only as audit history, never as proof of revenue or conversion change.
- Never store secret values, provider payloads, private analytics, personal data, customer messages, or financial records.
- Preserve verified strengths and resolved findings instead of deleting history silently.
- Keep one compact current portfolio table and a short dated history.
- `/audit-sales` is canonical. `/audit-sale` is only a deprecated compatibility alias and never owns a separate scorecard, memory, validator, regression, or automation.

## Current portfolio snapshot

Snapshot date: 2026-08-17.

This run verified canonical Vercel project/deployment metadata and rendered the public sites in a clean desktop browser at 1363×936. It followed desktop keyboard focus through the primary controls, inspected direct CTA destinations, tested Ezohata catalog → cart plus reload persistence, and checked Psitherapy `/demo` and Reiki `/masters` / `/profile`. Mobile rendering, field Core Web Vitals, authenticated/provider-backed completion, analytics delivery, and real Telegram/WhatsApp message completion remain `NOT_TESTED`. Telegram public landing pages could not be rendered in this browser because its gateway reported a certificate-clock error; the on-site href destinations were still observed directly.

Scores use the full 100-point denominator. Score deltas are heuristic evidence deltas, never revenue or conversion-rate claims.

| Project | Repo | Production URL / source | A | B | C | D | E | F | G | Total | Prior | Delta | Change | Confidence |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Toronto Tantra | `andylitvinov-design/torontotantra` | `torontotantra.vercel.app`; `main@ab36c222` | 18 | 19 | 10 | 17 | 9 | 4 | 0 | 77 | 75 | +2 | CHANGED_EVIDENCE | high desktop / medium overall |
| Business Mysteries | shared TorontoTantra source family; production metadata maps SHA `fdbf748c` to that repo | `businessmysteries.vercel.app`; exact project build path needs verification | 20 | 17 | 9 | 18 | 8 | 4 | 0 | 76 | 74 | +2 | CHANGED_EVIDENCE | medium-high |
| Body Explore | shared TorontoTantra source family | `bodyexplore.vercel.app`; deployment has no Git metadata | 19 | 17 | 9 | 18 | 8 | 4 | 0 | 75 | 73 | +2 | CHANGED_EVIDENCE | medium-high |
| Psychic Alchemy | repo mapping `NEEDS_VERIFICATION` | `psychicalchemy.vercel.app`; CLI/static deployment without repo metadata | 19 | 17 | 9 | 17 | 7 | 4 | 0 | 73 | 71 | +2 | CHANGED_EVIDENCE | medium visible page / low source confidence |
| Ezohata | `andylitvinov-design/ezohata` | `ezohata.vercel.app`; `main@578af333` | 18 | 16 | 6 | 18 | 5 | 7 | 0 | 70 | 68 | +2 | CHANGED_EVIDENCE | medium-high |
| Psitherapy | `andylitvinov-design/report` | `psitherapy.vercel.app`; CLI `main@7ebcd789`, `gitDirty:1` | 16 | 16 | 6 | 15 | 5 | 2 | 0 | 60 | 63 | -3 | CHANGED_FAILURE_EVIDENCE | medium |
| Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | canonical alias still `production@b8c312ee` | 10 | 9 | 5 | 8 | 4 | 2 | 0 | 38 | 38 | 0 | CHANGED_FAILURE_EVIDENCE | medium-low |

### Verification-only / excluded from current public-sales scoring

| Project | Current classification | Change |
|---|---|---|
| Psihotavr | `https://psihotavr.vercel.app` renders Vercel `DEPLOYMENT_NOT_FOUND`; no project appears in the accessible Vercel inventory | CHANGED_EVIDENCE; prior 40 retained as history, current score withheld |
| EzoHata Finance | owner/internal finance tool | SUPERSEDED for public-sales scoring |
| Legacy Finance / Incoming Ledger | internal legacy finance ledger | SUPERSEDED for public-sales scoring |
| Brain Management, Codex Links, AI Projects Brain, Codex Links MyPortal | internal/control-plane/provider utilities | UNCHANGED exclusions |

## 2026-08-17 portfolio audit

### Sales Change Map

- Toronto Tantra, Body Explore, Business Mysteries, Psychic Alchemy and Ezohata: `CHANGED_EVIDENCE`. Rendered desktop and keyboard evidence adds two F-category navigation/exit points; this is not a conversion outcome.
- Ezohata: the catalog → add-to-cart → cart path is now observed. A 15 USD item persisted after reload; the order form asks for Telegram, keeps email optional, and no order/message was submitted.
- Psitherapy: `CHANGED_FAILURE_EVIDENCE`. The visible `/demo` link resolves to the same login screen and links back to itself. Draft PR #130 exists but is not live; F falls from 5 to 2.
- Reiki Yggdrasil: `CHANGED_FAILURE_EVIDENCE`. `/masters` visibly exposes raw `Failed to fetch`; signed-out `/profile/orders` is safe. Draft PR #504 is not on the production branch.
- Psihotavr: `CHANGED_EVIDENCE`. The expected URL now proves a Vercel 404 rather than merely failing connector lookup. It remains verification-only.
- All sites: measurement readiness remains 0/5 because no live event delivery, deduplication, attribution or business-success evidence was found.

### Toronto Tantra — 77/100

- Audience / action: Toronto adults considering Tantric Tarot Constellations; join the Toronto Tantra Telegram group.
- Preserve: concrete program, Downtown Toronto, 3–4 hours, group cap, fee, consent/fully-clothed/18+ boundaries, facilitator identity, FAQ.
- Leaks: `UNCHANGED P1` exact date still deferred; `UNCHANGED P1` joining Telegram does not state whether a place is reserved or how payment/confirmation works; `UNCHANGED P2` no verified registration analytics or consented proof.
- Recommendations: clarify Telegram → reply → payment → reserved-place sequence; state response time; publish exact date beside CTAs when confirmed; add only consented proof; instrument privacy-safe click and confirmed-registration events.
- Prompt: `/delivery` in `andylitvinov-design/torontotantra`; preserve safety and verified fee facts; add the exact registration contract, response timing, confirmed date when available, consented evidence, and privacy-safe measurement; verify desktop/mobile, keyboard/focus/target size, Telegram destination and live source.
- Needs verification: mobile, Telegram landing/completion, field CWV, analytics.

### Business Mysteries — 76/100

- Audience / action: business owners, team leaders, freelancers and professionals; contact Andrey via Telegram/WhatsApp.
- Preserve: clear four-part program, practical next-step framing, reflective/no-guarantee and no-financial-advice boundaries.
- Leaks: `UNCHANGED P1` date/venue/duration/fee absent; `UNCHANGED P1` atmospheric imagery is not real proof; `UNCHANGED P2` no contact→registration measurement.
- Recommendations: publish verified event facts or mark them pending; explain response/reservation sequence; add only consented real evidence; preserve non-predictive framing; instrument privacy-safe lead/registration events.
- Prompt: `/delivery` only after proving the separate Vercel project build path from the TorontoTantra repo; implement the five changes above and verify desktop/mobile, keyboard/focus, external links and live source.
- Needs verification: exact build path, mobile, external landing/completion, CWV, analytics.

### Body Explore — 75/100

- Audience / action: Toronto visitors seeking gentle body-awareness and boundaries work; contact Andrey via Telegram/WhatsApp.
- Preserve: fully clothed, optional touch/partner work, reversible consent, no-pressure and non-medical boundaries.
- Leaks: `UNCHANGED P1` date/venue/theme/fee deferred; `UNCHANGED P1` facilitator/event proof is thin; `UNCHANGED P2` no contact→registration measurement.
- Recommendations: surface verified event facts or pending labels; explain response/reservation sequence; add verified facilitator credentials; add only consented event proof; instrument privacy-safe lead events.
- Prompt: `/delivery` after source-parity proof; preserve all consent boundaries and add the four decision/trust/measurement improvements, with desktop/mobile and external-link verification.
- Needs verification: source commit, mobile, Telegram/WhatsApp completion, CWV, analytics.

### Psychic Alchemy — 73/100

- Audience / action: Russian-speaking visitors considering individual online support; describe their situation in Telegram.
- Preserve: one dominant CTA, four-step process, deliverables, two-week review, facilitator identity and visible medical disclaimer.
- Leaks: `UNCHANGED P1` price/duration/payment/response time absent; `UNCHANGED P1` diagnostic/cause language risks medical over-certainty; `CONFIRMED P1` FAQ asks visitors to send what worries them and what they tried without a data-minimization/privacy notice.
- Recommendations: disclose verified commercial facts; make hypotheses explicitly exploratory/non-diagnostic; add a privacy/data-minimization note before Telegram; add only verified evidence; instrument lead events without health/message payload.
- Prompt: `/planner` for `psychicalchemy.vercel.app`; first resolve the canonical repo, then prepare the five bounded changes above without changing treatment or promising outcomes.
- Needs verification: repo/source, mobile, external completion, policy, CWV, analytics.

### Ezohata — 70/100

- Audience / action: mandala buyers; browse catalog, add to cart, order through Telegram.
- Preserve: clean-room architecture, taxonomy, protected previews/private originals, Telegram-first checkout and persisted cart.
- Leaks: `UNCHANGED P1` trust/proof trails catalog mechanics; `UNCHANGED P1` practical fit/deliverable/post-order expectations are thin; `UNCHANGED P2` measurement unproven.
- Recommendations: add verified who-for/practical-use/exact-deliverable support; add creator/contact/policy trust; explain response/post-order sequence; instrument privacy-safe catalog/add/cart/order events.
- Prompt: `/delivery` in `andylitvinov-design/ezohata`; preserve clean-room and Telegram-first boundaries, implement the four improvements, and verify clean desktop/mobile, keyboard/focus, empty/invalid/persisted cart, Telegram destination and live source.
- Needs verification: mobile, required-field invalid state, Telegram completion, provider persistence, CWV, analytics.

### Psitherapy — 60/100

- Audience / action: visitors seeking self-analysis, reports or specialist support; authenticate through Google.
- Preserve: concise value statement, clear Google login purpose, large keyboard-focusable primary control, health/report privacy boundaries.
- Leaks: `CONFIRMED P1` `/demo` is a broken self-loop in production; `UNCHANGED P1` specialist-request persistence remains unproven; `UNCHANGED P1` pre-login deliverable and health/AI/privacy expectations remain too thin.
- Recommendations: ship and live-verify the bounded demo-link fix; prove truthful persistence before success copy; make the pre-login deliverable concrete; keep non-diagnostic/privacy boundaries beside intake; instrument events without answers or identifiers.
- Prompt: `/safe` in `andylitvinov-design/report`; verify PR #130 or equivalent on production, reconcile `gitDirty:1`, prove intake/specialist persistence and privacy gates, then produce one bounded `/delivery` prompt.
- Needs verification: production tree parity, login/auth, persistence, mobile, CWV, analytics.

### Reiki Yggdrasil — 38/100

- Audience / action: learners, clients and masters; no single dominant public conversion journey.
- Preserve: RU-first product, public/private separation, accepted layout boundaries, Supabase/RLS safety constraints.
- Leaks: `CONFIRMED P1` master discovery shows raw `Failed to fetch`; `UNCHANGED P1` no primary public journey; `UNCHANGED P1` auth/order/course persistence unproven.
- Recommendations: release and live-verify the safe `/masters` error-state fix through the normal branch path; choose one primary audience/journey; explain pre-auth value/scope/access; define measurement only after live journey proof.
- Prompt: `/planner` in `andylitvinov-design/reiki-yggdrasil`; account for production branch `b8c312ee` and pending PR #504, choose course/master/profile as the primary journey, define pre-auth value and provider-proof gates, and return one bounded `/delivery` prompt without changing RLS/roles/storage.
- Needs verification: release parity, mobile, auth/RLS/storage, course access, CWV, analytics.

### Psihotavr — verification-only

- Observed: canonical expected URL returns `404 DEPLOYMENT_NOT_FOUND`; accessible Vercel inventory contains no Psihotavr project.
- Prompt: `/safe` for `andylitvinov-design/psihotavr`; prove active/retired state, canonical repo/project/branch/commit, and one catalog→Telegram path. If active, restore only the verified existing production mapping; if retired, mark `SUPERSEDED` with no score or metric credit.
- Do not touch: legacy catalog/image mappings, Telegram-first behavior, providers, or architecture before source proof.

### Measurement and highest-leverage candidate

No scored site has verified analytics delivery. The only current action that can change an existing Brain dashboard raw input without changing a formula is Psihotavr production reconciliation:

- metric: `business_growth_outcomes`;
- baseline: `4/6` accepted public-evidence projects, score `66.7`; Psihotavr is `COLLECTOR_ERROR HTTP 404`;
- conditional effect if Psihotavr is confirmed active and safely restored: `4/6 → 5/6`, `66.7 → 83.3` (+16.6);
- if retired or unproven: zero effect; denominator and formula remain unchanged.
- candidate persisted in Brain Management Daily Strategic Priorities handoff; next audit must reconcile candidate → implementation → live proof → actual metric effect.

### Verification matrix

- Desktop rendered at 1363×936: PASS for seven scored roots.
- Desktop keyboard/focus: primary controls expose visible focus; mobile remains NOT_TESTED, so F1 is not passed.
- Ezohata catalog → cart + reload persistence: PASS; no order/message submitted.
- Psitherapy `/demo`: FAIL self-loop.
- Reiki `/masters`: FAIL raw internal error; signed-out profile state is safe.
- Telegram/WhatsApp landing/completion: NOT_TESTED due browser certificate-clock gateway error; href destinations observed.
- Field CWV, mobile visual state, real registration/payment, auth/RLS/storage and analytics: NOT_TESTED.

## 2026-08-10 portfolio audit

### Portfolio discovery and source status

Confirmed public conversion sites this run:

- `Toronto Tantra` — Vercel project `torontotantra`; canonical domain returned HTTP 200. Current production deployment is from `andylitvinov-design/torontotantra`, branch `main`, commit `ab36c222ed579109018a447e594f523f25306da3`.
- `Ezohata` — Vercel project `ezohata`; canonical domain returned HTTP 200. Current production deployment is from `andylitvinov-design/ezohata`, branch `main`, commit `578af333c2d7c842d777c753a3105063e0403563`.
- `Psitherapy` — Vercel project `psitherapy`; canonical domain returned HTTP 200. Current production deployment identifies `andylitvinov-design/report`, branch `main`, commit `07a95bc7d2a6794fc0dd085be4a67117a784d012`; Vercel metadata also reports `gitDirty: 1`, so exact built-tree parity remains `NEEDS_VERIFICATION`.
- `Reiki Yggdrasil` — canonical domain returned HTTP 200 and serves the current app shell. Public conversion route, auth/provider completion, and production source commit were not fully proven in this run.
- `Body Explore` — separate Vercel project and canonical domain returned HTTP 200. Merged TorontoTantra repository history contains the Body Explore implementation/delivery work; exact current separate-project source parity remains `NEEDS_VERIFICATION`.
- `Business Mysteries` — separate Vercel project and canonical domain returned HTTP 200. Merged TorontoTantra repository history contains Business Mysteries landing work; exact current separate-project source parity remains `NEEDS_VERIFICATION`.
- `Psychic Alchemy` — separate Vercel project and canonical domain returned HTTP 200. Deployment metadata does not identify a Git repository, so canonical repo/source commit remain `NEEDS_VERIFICATION`.

Psihotavr remains explicitly tracked but is not treated as confirmed active production this week: its canonical URL could not be fetched and no `psihotavr` project appears in the accessible Vercel team inventory.

### Sales Change Map

- `Toronto Tantra`: `UNCHANGED` score; live evidence now confirms the visible program, FAQ, facilitator identity, fee structure, consent/safety boundaries, and Telegram CTA. The unresolved registration-sequence leak remains.
- `Ezohata`: `UNCHANGED` score; canonical production/source mapping is now stronger, but the server fetch only exposes the Vite shell, so product/cart behavior remains unproven.
- `Psitherapy`: `UNCHANGED` score; canonical production/source mapping is now stronger, while client-rendered intake/login/persistence remains unproven.
- `Reiki Yggdrasil`: `CHANGED_EVIDENCE`; the canonical `reiki-yggdrasil.vercel.app` URL now demonstrably serves the app, partially resolving the prior domain-identity uncertainty. The lack of one clear public conversion journey remains.
- `Body Explore`: `NEW` public conversion site.
- `Business Mysteries`: `NEW` public conversion site.
- `Psychic Alchemy`: `NEW` public conversion site.
- `EzoHata Finance` and `Legacy Finance`: `SUPERSEDED` as public-sales scoring targets; keep them in owner/internal product audits rather than compare them with public marketing funnels.

### Toronto Tantra — 75/100 — UNCHANGED

- Audience/offer/action: adults in Toronto interested in Tarot as an archetypal language and embodied group practice; learn the program and join the Toronto Tantra Telegram group for event updates/registration information.
- Preserve: explicit audience; no-experience-needed FAQ; fully clothed and voluntary participation boundaries; educational/non-medical framing; facilitator identity/training; duration, location, group size, fee, transfer conditions; consistent Telegram CTA.
- Top leaks:
  - `UNCHANGED P1`: exact event date is still deferred to Telegram (`second half of September`, Sunday evening).
  - `UNCHANGED P1`: `Join Telegram` still does not state whether joining reserves a place, how payment occurs, or what response/registration sequence follows.
  - `UNCHANGED P2`: no verified funnel analytics or consented past-event proof was observed.
- Ranked recommendations:
  1. State explicitly whether Telegram membership reserves a place.
  2. Publish the registration/payment sequence and expected response timing before the CTA.
  3. When confirmed, put the exact event date next to every registration CTA.
  4. Add only consented, verifiable past-event evidence.
  5. Define privacy-safe `outbound_telegram_click` and `confirmed_registration` measurement without participant messages or personal data.
- Measurement gap: G remains 0/5; event presence/delivery/deduplication is not proven.
- Prompt route: `/delivery`.
- Ready prompt: `/delivery` in `andylitvinov-design/torontotantra`: preserve all consent, fully-clothed, educational/non-medical and verified fee conditions; clarify whether Telegram reserves a place, show exact registration/payment/response sequence, surface the confirmed date beside CTAs when known, add only consented proof, and add privacy-safe Telegram-click/registration measurement seams. Verify desktop/mobile CTA visibility, keyboard/focus/target-size, one Telegram destination state, and live source before completion.
- Do not touch: consent/optional participation boundaries, participant privacy, unsupported outcomes, provider configuration.
- Needs verification: real Telegram destination/completion, keyboard/focus, mobile visual state, CWV, analytics.

### Body Explore — 73/100 — NEW

- Audience/offer/action: Toronto visitors seeking a gentle body-awareness, emotions, boundaries, and connection workshop; read the program, then contact Andrey through Telegram or WhatsApp.
- Preserve: clear non-pressure framing; fully clothed and consent-based boundaries; no required touch/partner participation; clear three-part program and event flow; educational/non-medical limitation; dual contact channel.
- Top leaks:
  - `NEW P1`: date, venue, theme and other registration details are deferred to personal contact/Telegram; fee and exact event timing are not visible.
  - `NEW P1`: there is no verified past-event proof/testimonial, and the facilitator block is less specific than the program/safety explanation.
  - `NEW P2`: no evidence of contact-click to registration completion measurement.
- Ranked recommendations:
  1. Publish verified date/venue/duration/fee before meaningful commitment whenever those facts exist; otherwise state exactly which details are pending.
  2. Explain what happens after Telegram/WhatsApp contact, expected response timing, and what actually reserves a place.
  3. Add only verified facilitator credentials and consented past-event evidence.
  4. Define privacy-safe Telegram/WhatsApp click and confirmed-registration events without message text or identifiers.
- Measurement gap: G 0/5.
- Prompt route: `/delivery` after confirming the separate Body Explore production source is the intended TorontoTantra source.
- Ready prompt: `/delivery` for the Body Explore surface: first verify `bodyexplore.vercel.app` source parity with the intended `andylitvinov-design/torontotantra` main source; then add verified event facts or clearly marked pending details, explain the exact contact-to-reservation sequence/response time, add only verified facilitator/event proof, and add privacy-safe contact-click/registration measurement seams. Preserve consent, fully-clothed, no-required-touch and non-medical framing.
- Do not touch: safety/consent boundaries, participant privacy, unsupported therapeutic outcomes.
- Needs verification: source parity, real Telegram/WhatsApp destination, mobile/browser, keyboard, CWV, analytics.

### Business Mysteries — 74/100 — NEW

- Audience/offer/action: Toronto business owners, team leaders, freelancers and professionals bringing one real business/project/career/income question; read the full program and contact Andrey through Telegram/WhatsApp.
- Preserve: audience segmentation; concrete four-lens program; practical next-step orientation; explicit statement that the work is reflective/exploratory and not legal, financial, accounting or investment advice; no guaranteed business outcomes.
- Top leaks:
  - `NEW P1`: registration-critical event facts remain deferred: date, venue, duration and fee are not visible.
  - `NEW P1`: visible photography is illustrative/stock rather than evidence of past workshops or outcomes; no verified cases/testimonials are present.
  - `NEW P2`: no evidence of lead-source/contact-to-registration measurement.
- Ranked recommendations:
  1. Publish verified event date/venue/duration/fee before commitment, or clearly label each pending fact.
  2. Explain the Telegram/WhatsApp response and reservation sequence.
  3. Add only verifiable, consented evidence from actual workshops/clients; keep stock imagery clearly atmospheric rather than proof.
  4. Keep business/market/income language explicitly reflective, never predictive or guaranteed.
  5. Add privacy-safe contact-click and confirmed-registration measurement.
- Measurement gap: G 0/5.
- Prompt route: `/delivery` after source-parity verification.
- Ready prompt: `/delivery` for `businessmysteries.vercel.app`: first verify the intended TorontoTantra source/deployment mapping; then surface verified event facts, explain the contact-to-reservation process, add only consented real-world proof, preserve the no-guarantee/no-financial-advice boundary, and add privacy-safe lead/registration measurement. Verify desktop/mobile, keyboard/focus/target-size, external links, and live source.
- Do not touch: disclaimer boundaries, participant/client privacy, unsupported financial/business predictions.
- Needs verification: exact source parity, external CTA completion, browser/mobile, accessibility, CWV, analytics.

### Psychic Alchemy — 71/100 — NEW

- Audience/offer/action: Russian-speaking visitors considering an individual online personal-growth/support format; understand the method and write to Andrey in Telegram with their situation.
- Preserve: one clear Telegram action; online/two-week follow-up expectations; four-step process; concrete deliverable framing; visible facilitator identity; explicit statement that the method does not replace medical diagnosis or prescribed treatment.
- Top leaks:
  - `NEW P1`: price, session duration, payment terms and expected response time are not visible before contact.
  - `NEW P1`: words such as `диагностика`, `причина` and personalized support can sound more medically determinative than the disclaimer allows; the page should keep claims clearly exploratory/non-diagnostic.
  - `NEW P1`: no privacy/policy signal or verified case/example evidence is visible; visitors are invited to describe potentially sensitive concerns in Telegram.
- Ranked recommendations:
  1. Disclose verified session duration, price/payment expectations and response time before commitment when available.
  2. Tighten scope language so psychological/Usin hypotheses are clearly exploratory and never presented as medical diagnosis or a proven cause of a health condition.
  3. Add a short privacy/data-minimization note before asking visitors to describe sensitive concerns in Telegram.
  4. Add only verified credentials and consented examples/evidence; never promise health outcomes.
  5. Define privacy-safe Telegram click and consultation-confirmed measurement with no health/sensitive message payload.
- Measurement gap: G 0/5.
- Prompt route: `/planner` until the canonical Git repository/source is identified.
- Ready prompt: `/planner` for `https://psychicalchemy.vercel.app`: resolve canonical repo/source first, then prepare a bounded delivery that adds verified price/session/response expectations, strengthens non-diagnostic exploratory wording, adds a data-minimization/privacy note before Telegram contact, uses only verified credentials/evidence, and defines privacy-safe lead measurement. Do not change medical treatment, prescribe substances, collect health message content, or promise outcomes.
- Do not touch: private health details, medical treatment, unsupported efficacy claims, provider/secrets.
- Needs verification: canonical repo/source, mobile/browser, external CTA completion, privacy policy, accessibility, CWV, analytics.

### Ezohata — 68/100 — UNCHANGED

- Audience/offer/action: people browsing mandalas/materials; find a relevant product, inspect protected previews, add to cart, use Telegram-first ordering.
- Preserve: clear catalog positioning in production metadata, clean-room boundary, protected previews/private originals, category distinctions, Telegram-first checkout mechanics and duplicate-submit safeguards already evidenced in source history.
- Top leaks:
  - `UNCHANGED P1`: trust/proof remains thinner than catalog/order mechanics.
  - `UNCHANGED P1`: practical product fit, deliverable and post-order expectations need stronger verified explanation.
  - `UNCHANGED P2`: measurement remains unproven.
- Ranked recommendations:
  1. Add verified `who it is for / practical use / what you receive` decision support on product surfaces.
  2. Add verified creator/contact/policy trust signals.
  3. Explain response time and post-order sequence near checkout.
  4. Define privacy-safe catalog-view/add-to-cart/checkout-start/order-success events.
- Measurement gap: G 0/5.
- Prompt route: `/delivery` only after client-rendered clean-session path is inspected.
- Ready prompt: `/delivery` in `andylitvinov-design/ezohata`: preserve clean-room architecture, protected previews, taxonomy and Telegram-first ordering; strengthen product-fit/deliverable and verified trust signals, clarify response/post-order expectations, and add privacy-safe funnel event seams. Verify clean desktop/mobile, keyboard/focus/target-size, one cart/order/error/success state, Telegram destination, and production source commit before completion.
- Needs verification: rendered catalog/cart, Telegram completion, provider persistence, browser/mobile, CWV, analytics.

### Psitherapy — 63/100 — UNCHANGED

- Audience/offer/action: visitors seeking self-analysis, intake/report, or specialist consultation; start intake or leave a specialist request.
- Preserve: prior source-evidenced package ladder, repeated intake CTA, test duration/status labels, empty states, and distinction between self-analysis and specialist help.
- Top leaks:
  - `UNCHANGED P1`: specialist-request persistence remains unproven; success copy must never outrun durable save evidence.
  - `UNCHANGED P1`: client-rendered pre-login value and intake behavior were not inspectable from the live HTML shell.
  - `UNCHANGED P1`: health/AI limitations, practitioner identity, privacy and evidence need to remain stronger than automated-interpretation claims.
- Ranked recommendations:
  1. Show saved/success state only after proven durable persistence.
  2. Make pre-login process/value and deliverables concrete.
  3. Keep non-diagnostic AI/health and privacy boundaries beside intake.
  4. Define privacy-safe intake-start/intake-complete/lead-success events without health answers.
- Measurement gap: G 0/5.
- Prompt route: `/safe` before conversion changes because persistence and health-data boundaries are gating evidence.
- Ready prompt: `/safe` in `andylitvinov-design/report`: prove the live intake/specialist-request persistence path and truthful success states; verify pre-login value, non-diagnostic health/AI boundaries and privacy; then return one bounded conversion `/delivery` prompt. Do not expose report/health data or change auth/provider configuration.
- Needs verification: current rendered UX, login, persistence, form submit, provider state, mobile/accessibility, CWV, analytics; Vercel deployment metadata reports `gitDirty: 1`.

### Reiki Yggdrasil — 38/100 — CHANGED_EVIDENCE

- Audience/offer/action: learners, clients and masters across learning, master discovery, profile/cabinet, services and course surfaces.
- Preserve: RU-first product, public/private separation, accepted layout boundaries and Supabase/RLS safety constraints.
- Resolved/changed evidence:
  - `RESOLVED`: `https://reiki-yggdrasil.vercel.app` is demonstrably serving the current app shell; the canonical URL itself is no longer merely hypothetical.
- Top leaks:
  - `UNCHANGED P1`: no single primary public conversion journey is established across learning/master/profile/course surfaces.
  - `UNCHANGED P1`: auth/access/order/course persistence remains provider-dependent and unproven.
  - `UNCHANGED P2`: measurement readiness remains unproven.
- Ranked recommendations:
  1. Choose one primary public journey and primary CTA before redesign.
  2. Explain audience/value/next step before authentication.
  3. Show verified course/service scope, access and post-CTA expectations.
  4. Define adoption events only after live journey proof.
- Measurement gap: G 0/5.
- Prompt route: `/planner`.
- Ready prompt: `/planner` in `andylitvinov-design/reiki-yggdrasil`: use the now-confirmed canonical `reiki-yggdrasil.vercel.app` surface, select one public conversion journey (course, master discovery or profile), define what value/eligibility/access must be visible before login, and produce one implementation-ready `/delivery` prompt. Do not change RLS, storage, roles, redirects or production aliases without provider/live proof.
- Needs verification: rendered route selection, auth/RLS/storage, course access, browser/mobile/accessibility, CWV, analytics.

### Psihotavr — verification-only — prior 40 retained as history

- Current classification: `NEEDS_VERIFICATION`, not a confirmed active production funnel this week.
- Evidence: no `psihotavr` project is present in the accessible Vercel team inventory, and `https://psihotavr.vercel.app` could not be fetched through the Vercel connector.
- Change label: `UNCHANGED` blocker; do not infer outage or retirement from connector absence alone.
- Ready prompt: `/safe` in `andylitvinov-design/psihotavr`: prove canonical hosting/project/source branch and one clean-session catalog-to-Telegram path before any sales optimization. If production/retirement cannot be proved, return `NEEDS_VERIFICATION` and do not redesign.
- Do not touch: legacy catalog data, image mappings, Telegram-first behavior, auth/provider experiments.

## Cross-site reusable patterns — 2026-08-10

1. Measurement readiness remains the weakest common category: no site has verified analytics delivery, deduplication and business-success definition in this run.
2. Telegram/WhatsApp are common lead boundaries, but a visible contact link is not proof of registration, reservation, payment or response-time behavior.
3. Program/service pages often explain the experience better than the decision-critical event facts. Date, venue, duration, fee and what reserves a place should be surfaced when verified and relevant.
4. Safety/limitation language is a real trust asset across personal-growth sites and should be preserved rather than traded for stronger unsupported promises.
5. Real proof is scarce. Stock/atmospheric images are not testimonials or outcome evidence; only consented and verifiable evidence should affect trust scoring.
6. Source/deploy provenance still matters: a live domain can be reachable while exact repo/build parity remains uncertain.

## Verification matrix — 2026-08-10

- Canonical HTTP 200 observed: Toronto Tantra, Body Explore, Business Mysteries, Psychic Alchemy, Ezohata, Psitherapy, Reiki Yggdrasil.
- Current production repo/branch/commit explicitly observed from Vercel: Toronto Tantra, Ezohata, Psitherapy.
- Server-rendered/static sales content observed: Toronto Tantra, Body Explore, Business Mysteries, Psychic Alchemy.
- SPA shell only observed: Ezohata, Psitherapy, Reiki Yggdrasil.
- Desktop visual browser state: `NOT_TESTED`.
- Mobile visual browser state: `NOT_TESTED`.
- Keyboard/focus/target size: `NOT_TESTED`.
- Telegram/WhatsApp real completion: `NOT_TESTED`; no messages were sent.
- Registration/payment/booking persistence: `NOT_TESTED`.
- Core Web Vitals field data: `NOT_TESTED`.
- Analytics delivery/deduplication/attribution: `NOT_TESTED`.
- Private provider/auth/RLS state: `NOT_TESTED` or `BLOCKED` where applicable.

## Current durable principles

- `/audit-sales` is the only canonical sales audit mode.
- `/audit-sale` is a deprecated compatibility alias only.
- Heuristic score changes are not conversion-rate or revenue evidence.
- Provider-dependent paths remain `BLOCKED` or `NEEDS_VERIFICATION` without live proof.
- Every site audit must preserve what already sells well and produce one bounded Codex prompt.
- Screenshot/source/HTTP evidence cannot prove keyboard operation, focus, target-size compliance, post-click behavior, Core Web Vitals, analytics, or provider persistence.
- Decision-critical cost, eligibility, timing, format, continuity and post-CTA expectations must be visible before meaningful commitment when relevant.
- Primary-path performance uses current field evidence when available; lab/manual evidence without field data may support `WATCH`, not an unqualified field-performance `PASS`.

## Latest intelligence review

### 2026-07-19 — accepted marker changes: 3; temporary candidates accepted: 0

Sources reviewed: W3C WCAG 2.2; web.dev Core Web Vitals guidance; Baymard checkout and form-effort research; Google Analytics 4 recommended events; ONS/GOV.UK user-needs and transaction guidance.

Accepted durable marker refinements: 3
Accepted temporary candidates: 0

Rejected durable candidates include:

- Generic industry conversion-rate benchmark
- AI-search / GEO visibility
Accepted principles:

1. Refined B4 for decision-critical expectations before commitment.
2. Refined F1 for keyboard/mobile operability, visible focus, understandable controls and target-size risk.
3. Refined F3 so field evidence is required for an unconditional performance `PASS`.

Rejected candidates: generic conversion benchmarks; urgency/countdown optimization; event-code presence as proof of measurement; AI-search/GEO as a durable conversion marker.

Regression coverage: `audit-sales-screenshot-evidence-overclaim` prevents screenshot/source-only evidence from claiming accessibility, performance or downstream-flow `PASS`. `/audit-sale` remains alias-only.

## History

### 2026-08-17

- Completed the third weekly canonical `/audit-sales` review with rendered desktop and keyboard evidence.
- Confirmed Ezohata catalog → cart and reload persistence without submitting an order.
- Confirmed Psitherapy `/demo` self-loop and Reiki `/masters` raw error on production.
- Proved Psihotavr currently returns Vercel `DEPLOYMENT_NOT_FOUND`; withheld a current sales score.
- Updated heuristic evidence scores only; no revenue or conversion outcome was claimed.
- Persisted one conditional Psihotavr recovery candidate for `business_growth_outcomes`; no formula change or metric credit was claimed.
- No product code, deploy, provider configuration, payment, message, issue or PR was created or changed.


### 2026-08-10

- Completed the second weekly portfolio `/audit-sales` review.
- Added three newly confirmed public conversion sites: Body Explore, Business Mysteries and Psychic Alchemy.
- Confirmed current live HTTP surfaces for seven scored sites.
- Confirmed current Vercel production source commits for Toronto Tantra, Ezohata and Psitherapy.
- Preserved prior scores where sales evidence did not materially change; improved evidence confidence instead of inventing score uplift.
- Reclassified new and legacy Finance as owner/internal rather than public-sales comparison targets.
- Kept Psihotavr as verification-only without claiming outage or retirement.
- No product code, deploy, provider configuration, data, payment, message, issue or product PR was created or changed.

### 2026-08-03

- Completed the first weekly portfolio `/audit-sales` baseline for seven canonical projects.
- Source/docs only; live browser and public-domain access were unavailable.
- Historical scores: Ezohata 68, Psihotavr 40, Psitherapy 63, Reiki Yggdrasil 38, Toronto Tantra 75, EzoHata Finance 43, Legacy Finance 36.
- Added one bounded improvement direction per site.

### 2026-07-19

- Upgraded scorecard to version 1.1 without changing the 100-point total.
- Refined exactly three durable markers: B4, F1 and F3.
- Added concrete `PASS` / `WATCH` / `FAIL` / `NOT_TESTED` contracts and deterministic regression validation.

### 2026-07-13

- Created the persistent sales-audit memory.
- Unified the canonical command under `/audit-sales`.
- Added initial active-site baseline with all scores `NOT_TESTED`.
