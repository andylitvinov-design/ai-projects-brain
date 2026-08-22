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

## Current portfolio baseline

Baseline date: 2026-08-03.

This is a source-level heuristic baseline. The automation runtime could not resolve the listed public domains, so clean desktop/mobile browser state, keyboard/focus behavior, CTA completion, Core Web Vitals, analytics, provider-backed persistence, and production source parity remain `NOT_TESTED` or `NEEDS_VERIFICATION` unless repository evidence explicitly proves the code path.

| Project | Repo | Production URL | Score | Confidence | Evidence state | Main next question |
|---|---|---|---:|---|---|---|
| Ezohata | `andylitvinov-design/ezohata` | `https://ezohata.vercel.app` | 68 | medium-low | SOURCE_INSPECTED / LIVE_NOT_TESTED | Can trust and product-fit support catch up with the already clear Telegram order path? |
| Psihotavr | `andylitvinov-design/psihotavr` | `https://psihotavr.vercel.app` | 40 | very low | MEMORY_ONLY / REPO_AND_LIVE_NEEDS_VERIFICATION | Is the current public collector and Telegram-first path actually usable on the canonical production deployment? |
| Psitherapy | `andylitvinov-design/report` | `https://psitherapy.vercel.app` | 63 | medium-low | SOURCE_INSPECTED / LIVE_NOT_TESTED | Is the public intake and specialist-request path truthful, persistent, and valuable before login? |
| Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | `https://reiki-yggdrasil.vercel.app` | 38 | low | DOCS_INSPECTED / DOMAIN_AND_LIVE_NEEDS_VERIFICATION | Which one public course/master/profile journey is canonical, and on which production domain? |
| TorontoTantra | `andylitvinov-design/torontotantra` | `https://torontotantra.vercel.app` | 75 | medium | SOURCE_INSPECTED / LIVE_NOT_TESTED | Does joining Telegram lead predictably to registration, payment, and a reserved place? |
| EzoHata Finance | `andylitvinov-design/ezohata-finance` | `https://ezohata-finance.vercel.app` | 43 | low | DOCS_INSPECTED / OWNER_AND_LIVE_BLOCKED | Does the owner-only login/onboarding clearly communicate the next decision and distinguish this app from legacy finance? |
| Legacy Finance | `andylitvinov-design/finance` | `https://ezohata-incoming-ledger.vercel.app` | 36 | low | DOCS_INSPECTED / LIVE_NOT_TESTED | Is the legacy/reference role visible inside the product, with a clear route to the new finance system? |

Scores use the full 100-point denominator. `NOT_TESTED` markers receive no points; therefore these scores are conservative evidence scores, not forecasts of commercial performance.

## 2026-08-03 portfolio audit

### Portfolio discovery

Included:

- Ezohata
- Psihotavr
- Psitherapy
- Reiki Yggdrasil
- TorontoTantra
- EzoHata Finance
- Legacy Finance / Incoming Ledger

Excluded from scoring:

- Brain Management and Codex Links: internal operations/infrastructure rather than public sales or lead funnels.
- AI Projects Brain: no public conversion surface.
- Codex Links MyPortal: finance/provider surface with unverified canonical repository mapping.
- Body Explore and Business Mysteries: public links were discovered from TorontoTantra source, but canonical repo, production source, and active-status mapping are not yet verified.

### Sales Change Map

This is the first completed weekly portfolio run, so all site findings are `NEW`. There is no previous score delta and no revenue inference.

| Project | A | B | C | D | E | F | G | Total | Change label |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Ezohata | 18 | 16 | 6 | 18 | 5 | 5 | 0 | 68 | NEW_BASELINE |
| Psihotavr | 10 | 10 | 4 | 10 | 4 | 2 | 0 | 40 | NEW_BASELINE |
| Psitherapy | 16 | 16 | 6 | 15 | 5 | 5 | 0 | 63 | NEW_BASELINE |
| Reiki Yggdrasil | 10 | 9 | 5 | 8 | 4 | 2 | 0 | 38 | NEW_BASELINE |
| TorontoTantra | 18 | 19 | 10 | 17 | 9 | 2 | 0 | 75 | NEW_BASELINE |
| EzoHata Finance | 15 | 12 | 7 | 6 | 3 | 0 | 0 | 43 | NEW_BASELINE |
| Legacy Finance | 12 | 10 | 5 | 5 | 2 | 2 | 0 | 36 | NEW_BASELINE |

### Ezohata

- Audience/offer/action: people exploring mandalas and related materials; browse catalog, compare previews, add to cart, submit a Telegram-first order.
- Preserve: clear catalog finder; explicit Telegram checkout expectation; visible total and order code; only Telegram plus optional email requested; loading, success, error, empty-cart, and duplicate-submit guard code exists.
- Top leaks:
  - `NEW P1`: trust/proof is thin in the inspected homepage and checkout source.
  - `NEW P1`: product outcome, fit, deliverable, and practical use are less concrete than the catalog structure and ordering mechanics.
  - `NEW P2`: no measurement evidence for catalog view, add-to-cart, checkout start, successful order, or direct Telegram fallback.
- Recommended changes: add product-fit and deliverable blocks; add verified creator/business/contact/policy signals; explain response time and post-order process near checkout; instrument privacy-safe funnel events.
- Prompt route: `/delivery`.
- Do not touch: clean-room boundary, protected preview approach, collection/mandala/article distinction, Telegram-first flow, private originals, provider configuration.

### Psihotavr

- Audience/offer/action: mandala catalog users; intended Telegram-first order and inquiry path.
- Preserve: legacy catalog content, image mappings, taxonomy distinctions, and Telegram-first behavior when verified.
- Top leaks:
  - `NEW P1`: current canonical repo/live/retirement state and public collector behavior are unproven.
  - `NEW P1`: the main CTA and Telegram completion path could not be inspected.
  - `NEW P1`: trust, decision support, and current provider boundaries are not evidenced.
- Recommended changes: first prove canonical source and clean-session behavior; verify one catalog-to-Telegram journey; make the order/contact next step explicit; add only verified trust/process signals; define funnel events after the path is proven.
- Prompt route: `/safe` before any conversion change.
- Do not touch: Excel-derived catalog data, image mappings, Telegram-first order path, auth/provider experiments, legacy branches.

### Psitherapy

- Audience/offer/action: visitors seeking self-analysis, AI-guided intake, reports, or a specialist consultation; start first intake or leave a specialist request.
- Preserve: clear package ladder and prices in source; repeated intake CTA; test duration/status labels; empty states; clear distinction between self-analysis and specialist help.
- Top leaks:
  - `NEW P1`: source copy can say a specialist request was saved while the booking section is still being connected; durable persistence is not proven.
  - `NEW P1`: public value and eligibility before login/cabinet entry are not yet proven in live state.
  - `NEW P1`: health/AI limitations, practitioner identity, privacy, and evidence signals are weaker than the breadth of offered interpretation.
- Recommended changes: make booking-state language strictly truthful to actual persistence; add a public pre-login value/process summary; place non-diagnostic AI/health boundaries and verified practitioner identity near intake; explain what each package produces; instrument intake and lead events without health payloads.
- Prompt route: `/safe` because truthful persistence and health-copy boundaries come before optimization.
- Do not touch: user data, provider settings, auth configuration, report contents, medical claims, private analytics.

### Reiki Yggdrasil

- Audience/offer/action: learners, clients, and masters using public learning, masters catalog, profile/cabinet, services, and courses.
- Preserve: RU-first experience, accepted desktop structure, public masters concept, authenticated private content boundaries.
- Top leaks:
  - `NEW P1`: production identity is fragmented across `reiki-yggdrasil.vercel.app`, target `mentalica.vercel.app`, and staging `2mentalica.vercel.app`.
  - `NEW P1`: no single canonical public conversion journey is defined across learning, master discovery, profile, services, and courses.
  - `NEW P1`: auth, access, orders, course invitations, and Supabase persistence require live proof.
- Recommended changes: resolve canonical public domain/source first; choose one primary public journey; explain who the platform is for and the next step before login; expose verified course/service scope and access expectations; define adoption events after live proof.
- Prompt route: `/planner`.
- Do not touch: Supabase policies, production domain aliases, private storage, course access, admin roles, accepted three-column layout.

### TorontoTantra

- Audience/offer/action: adults interested in Tarot archetypes, embodied group practice, and constellations; join Telegram for event updates and registration information.
- Preserve: clear audience and format; fully clothed/18+/consent boundaries; FAQ; facilitator background; duration, location, group size, fee, transfer policy, and non-therapy disclaimer.
- Top leaks:
  - `NEW P1`: exact date and the actual reservation/payment step are deferred to Telegram.
  - `NEW P1`: joining Telegram does not explicitly say whether a place is reserved or what happens next.
  - `NEW P2`: proof of past events and measurement of Telegram-to-registration completion are absent from inspected source.
- Recommended changes: state that Telegram membership does or does not reserve a place; publish the exact registration sequence and response timing; add verified past-event evidence or participant feedback only when consented and true; add a privacy-safe outbound Telegram click and confirmed-registration measurement plan.
- Prompt route: `/delivery`.
- Do not touch: consent/optional-touch boundaries, fully clothed framing, educational/non-therapy disclaimer, verified prices, participant privacy.

### EzoHata Finance

- Audience/offer/action: Andrey as the owner; authenticate and use the new finance system for verified records and decisions.
- Preserve: owner-only framing, immutable evidence, explicit no-invented-balancing rule, server-verified Google identity, signed HttpOnly session, separation from Supabase Auth.
- Top leaks:
  - `NEW P1`: this is not a public sales funnel, and the public/login surface must clearly state owner-only access and purpose.
  - `NEW P1`: next-step onboarding and readiness after login are not inspectable and provider journeys remain blocked.
  - `NEW P2`: no adoption/decision-success measurement evidence exists.
- Recommended changes: make owner-only status and new-vs-legacy distinction explicit; add a post-login readiness/next-action checklist; expose provider readiness without secrets; define owner workflow success events that contain no financial payloads.
- Prompt route: `/planner`.
- Do not touch: financial records, provider credentials, Supabase data, reconciliation logic, login configuration, legacy evidence.

### Legacy Finance

- Audience/offer/action: Andrey using the legacy incoming-ledger dashboard for payments, expenses, balances, and provider imports.
- Preserve: canonical repo/status endpoints, source-of-truth diagnostics, discrepancy visibility, finance invariants, read-only legacy-repo boundary.
- Top leaks:
  - `NEW P1`: the legacy/reference role may be clear in documentation but is not proven visible inside the product.
  - `NEW P1`: the relationship and migration path to EzoHata Finance are not proven in the user interface.
  - `NEW P2`: no adoption or decision-completion measurement evidence exists.
- Recommended changes: add a visible non-alarming legacy/reference banner when appropriate; provide a clear link and comparison to the new finance app; identify which workflows remain authoritative here; define no-financial-payload usage events; verify one current provider and one manual-data journey before any stronger claim.
- Prompt route: `/planner`.
- Do not touch: financial data, Google Sheets, provider tokens, balance formulas, release source lock, deprecated repo boundary.

## Current durable principles

- `/audit-sales` is the only canonical sales audit mode.
- `/audit-sale` is a deprecated compatibility alias only.
- Heuristic score changes are not conversion-rate or revenue evidence.
- Provider-dependent paths remain `BLOCKED` or `NEEDS_VERIFICATION` without live proof.
- Every site audit must preserve what already sells well and produce one bounded Codex prompt.
- Screenshot or source-only evidence cannot prove keyboard operation, focus, target-size compliance, post-click behavior, Core Web Vitals, analytics, or production persistence.
- Decision-critical cost, eligibility, timing, format, continuity, and post-CTA expectations must be visible before meaningful commitment.
- Primary-path performance uses current field evidence when available; lab/manual evidence without field data may support `WATCH`, not an unqualified field-performance `PASS`.

## Latest intelligence review

### 2026-07-19 — accepted marker changes: 3; temporary candidates accepted: 0

Sources reviewed: W3C WCAG 2.2; web.dev Core Web Vitals guidance; Baymard checkout and form-effort research; Google Analytics 4 recommended events; ONS/GOV.UK user-needs and transaction guidance.

Accepted principles:

1. Refined B4 for decision-critical expectations before commitment.
2. Refined F1 for keyboard/mobile operability, visible focus, understandable controls, and target-size risk.
3. Refined F3 so field evidence is required for an unconditional performance `PASS`.

Rejected candidates: generic conversion benchmarks; urgency/countdown optimization; event-code presence as proof of measurement; AI-search/GEO as a durable conversion marker.

Regression coverage: `audit-sales-screenshot-evidence-overclaim` prevents screenshot/source-only evidence from claiming accessibility, performance, or downstream-flow `PASS`. `/audit-sale` remains alias-only.

## History

### 2026-08-03

- Completed the first weekly portfolio `/audit-sales` baseline for seven canonical projects.
- Inspected canonical project memory and accessible repository source/docs.
- Live browser, keyboard, Core Web Vitals, analytics, source-commit parity, and provider completion remained unavailable and were marked `NOT_TESTED` or `NEEDS_VERIFICATION`.
- Added one bounded improvement prompt direction per site.
- No product code, deploy, provider configuration, data, payment, message, issue, or product PR was created or changed.

### 2026-07-19

- Upgraded scorecard to version 1.1 without changing the 100-point total.
- Refined exactly three durable markers: B4, F1, and F3.
- Added concrete `PASS` / `WATCH` / `FAIL` / `NOT_TESTED` contracts.
- Added current source review, accepted/rejected rationale, canonical automation contract, and deterministic regression validation.
- Preserved all product sites and provider/config/data boundaries; no site audit or product change was performed.

### 2026-07-13

- Created the persistent sales-audit memory.
- Unified the canonical command under `/audit-sales`.
- Added initial active-site baseline with all scores `NOT_TESTED`.
