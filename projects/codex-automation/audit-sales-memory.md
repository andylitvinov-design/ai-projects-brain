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

Snapshot date: 2026-08-10.

This run had live HTTP access to confirmed Vercel public surfaces, but not a full interactive browser. Visible server-rendered/static content and hosting/source metadata can therefore support message, offer, trust, CTA-structure, and decision-support evidence. Keyboard/focus, target-size compliance, real Telegram/WhatsApp completion, client-rendered SPA states, Core Web Vitals, analytics delivery, auth/provider persistence, and post-message registration/payment remain `NOT_TESTED` or `NEEDS_VERIFICATION` unless separately proven.

Scores use the full 100-point denominator. `NOT_TESTED` markers receive no points. Score deltas are heuristic evidence deltas, never revenue or conversion-rate claims.

| Project | Repo | Production URL | A | B | C | D | E | F | G | Total | Prior | Delta | Change | Confidence / evidence |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Toronto Tantra | `andylitvinov-design/torontotantra` | `https://torontotantra.vercel.app` | 18 | 19 | 10 | 17 | 9 | 2 | 0 | 75 | 75 | 0 | UNCHANGED | medium-high; LIVE_HTTP_200 + production source mapped |
| Body Explore | shared `andylitvinov-design/torontotantra` source family; exact separate deploy parity needs verification | `https://bodyexplore.vercel.app` | 19 | 17 | 9 | 18 | 8 | 2 | 0 | 73 | — | — | NEW | medium-high visible-page evidence; CTA completion not tested |
| Psychic Alchemy | repo mapping `NEEDS_VERIFICATION` | `https://psychicalchemy.vercel.app` | 19 | 17 | 9 | 17 | 7 | 2 | 0 | 71 | — | — | NEW | medium-high visible-page evidence; source repo unknown |
| Business Mysteries | shared `andylitvinov-design/torontotantra` source family; exact separate deploy parity needs verification | `https://businessmysteries.vercel.app` | 20 | 17 | 9 | 18 | 8 | 2 | 0 | 74 | — | — | NEW | medium-high visible-page evidence; CTA completion not tested |
| Ezohata | `andylitvinov-design/ezohata` | `https://ezohata.vercel.app` | 18 | 16 | 6 | 18 | 5 | 5 | 0 | 68 | 68 | 0 | UNCHANGED | medium; LIVE_HTTP_200 + production source mapped; SPA content not rendered by fetch |
| Psitherapy | `andylitvinov-design/report` | `https://psitherapy.vercel.app` | 16 | 16 | 6 | 15 | 5 | 5 | 0 | 63 | 63 | 0 | UNCHANGED | medium; LIVE_HTTP_200 + Vercel source mapped; SPA content not rendered by fetch |
| Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | `https://reiki-yggdrasil.vercel.app` | 10 | 9 | 5 | 8 | 4 | 2 | 0 | 38 | 38 | 0 | CHANGED_EVIDENCE | low-medium; canonical URL now returns app shell, conversion journey still unclear |

### Verification-only / excluded from current public-sales scoring

| Project | Previous state | Current classification | Change |
|---|---|---|---|
| Psihotavr | 40 / very-low confidence | Vercel project not present in accessible team inventory and canonical URL could not be fetched; current public production remains `NEEDS_VERIFICATION` | UNCHANGED blocker; current score not re-issued |
| EzoHata Finance | 43 / owner-only | owner/internal finance decision tool, not a public lead/sales funnel | SUPERSEDED for public-sales scoring; retain history only |
| Legacy Finance / Incoming Ledger | 36 / owner dashboard | internal legacy finance ledger, not a public lead/sales funnel | SUPERSEDED for public-sales scoring; retain history only |
| Brain Management | excluded | internal operational dashboard | UNCHANGED exclusion |
| Codex Links | excluded | internal command/dispatch infrastructure | UNCHANGED exclusion |
| AI Projects Brain | excluded | no public conversion surface | UNCHANGED exclusion |
| Codex Links MyPortal | excluded | repository mapping still unverified; provider/finance utility | UNCHANGED exclusion |

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

Accepted principles:

1. Refined B4 for decision-critical expectations before commitment.
2. Refined F1 for keyboard/mobile operability, visible focus, understandable controls and target-size risk.
3. Refined F3 so field evidence is required for an unconditional performance `PASS`.

Rejected candidates: generic conversion benchmarks; urgency/countdown optimization; event-code presence as proof of measurement; AI-search/GEO as a durable conversion marker.

Regression coverage: `audit-sales-screenshot-evidence-overclaim` prevents screenshot/source-only evidence from claiming accessibility, performance or downstream-flow `PASS`. `/audit-sale` remains alias-only.

## History

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
