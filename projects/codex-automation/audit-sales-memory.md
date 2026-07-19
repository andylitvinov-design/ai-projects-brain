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

No weekly portfolio `/audit-sales` run has completed yet.

| Project | Repo | Production URL | Previous score | Evidence state | Top known sales question |
|---|---|---|---:|---|---|
| Ezohata | `andylitvinov-design/ezohata` | `https://ezohata.vercel.app` | — | NOT_TESTED | Does the catalog clearly convert interest into a Telegram or order action? |
| Psihotavr | `andylitvinov-design/psihotavr` | `https://psihotavr.vercel.app` | — | NOT_TESTED | Is the stable Telegram-first path clear and trustworthy? |
| Psitherapy | `andylitvinov-design/report` | `https://psitherapy.vercel.app` | — | NOT_TESTED | Does the public intake create value before login? |
| Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | `https://reiki-yggdrasil.vercel.app` | — | NOT_TESTED | Is one course or profile journey understandable and completable? |
| TorontoTantra | `andylitvinov-design/torontotantra` | `https://torontotantra.vercel.app` | — | NOT_TESTED | Does the site turn interest into a community or event lead? |
| EzoHata Finance | `andylitvinov-design/ezohata-finance` | `https://ezohata-finance.vercel.app` | — | NOT_TESTED | Does the owner workflow communicate the next decision clearly? |
| Legacy Finance | `andylitvinov-design/finance` | `https://ezohata-incoming-ledger.vercel.app` | — | NOT_TESTED | Is the legacy/reference role explicit to users and agents? |

## Current durable principles

- `/audit-sales` is the only canonical sales audit mode.
- `/audit-sale` is a deprecated compatibility alias only.
- Heuristic score changes are not conversion-rate or revenue evidence.
- Provider-dependent paths remain `BLOCKED` or `NEEDS_VERIFICATION` without live proof.
- Every site audit must preserve what already sells well and produce one bounded Codex prompt.
- Screenshot evidence cannot prove keyboard operation, focus, target-size compliance, post-click behavior, Core Web Vitals, or analytics.
- Decision-critical cost, eligibility, timing, format, continuity, and post-CTA expectations must be visible before meaningful commitment.
- Primary-path performance uses current field evidence when available; lab/manual evidence without field data may support `WATCH`, not an unqualified field-performance `PASS`.

## Latest intelligence review

### 2026-07-19 — accepted marker changes: 3; temporary candidates accepted: 0

Sources reviewed:

| Source | Type | Evidence used |
|---|---|---|
| W3C, WCAG 2.2 and Understanding documents, updated 2026-02-11 | Normative accessibility standard | Keyboard operation, visible/unobscured focus, name/role/value, status/error support, and minimum pointer target size/spacing. |
| web.dev, Web Vitals and Core Web Vitals thresholds | Current platform performance guidance | Field measurement at the 75th percentile; good thresholds LCP `<=2.5s`, INP `<=200ms`, CLS `<=0.1`; field and lab evidence must not be conflated. |
| Baymard, 2026 cart-abandonment statistics using 2025 reasons data | Established ecommerce UX/CRO research | Hidden or late extra costs, inability to see total cost, trust gaps, forced account creation, long checkout, and site errors are observable abandonment barriers. |
| Baymard, checkout form-field research, updated 2024–2025 | Established ecommerce UX research | Perceived effort is driven strongly by fields users must consider; ask only what is needed and explain required data. |
| Google Analytics 4 recommended events and lead/ecommerce funnel guidance, accessed 2026-07-19 | Current analytics platform guidance | `generate_lead`, `form_start`, `form_submit`, `begin_checkout`, `purchase`, and related events are implementation vocabulary, not proof of correct tracking or business outcome. |
| ONS/GOV.UK user-needs and transaction guidance, accessed 2026-07-19 | Established service/content design guidance | Clear user need, upfront eligibility/context, predictable next steps, minimal cognitive load, and evidence-based wording improve task completion and trust. |

Accepted principles:

1. **Refine B4: decision-critical expectations before commitment.** Supported by Baymard checkout evidence and GOV.UK transaction guidance. It converts hidden/late price, eligibility, timing, format, continuity, and next-step ambiguity into a concrete barrier without requiring every service to publish a fixed price.
2. **Refine F1: operable primary path.** Supported by WCAG 2.2. Mobile appearance alone is insufficient; keyboard operation, understandable control names, visible/unobscured focus, no trap, and target-size/spacing risk are now explicit.
3. **Refine F3: performance and stability evidence.** Supported by web.dev. A `PASS` requires current field evidence plus no observed blocker; repeatable lab/manual evidence without field data is `WATCH`; visual impression is `NOT_TESTED`.

Rejected candidates:

- **Generic industry conversion-rate benchmark:** rejected because benchmarks are context-sensitive, easy to misuse as promises, and do not identify a page-specific observable barrier.
- **Urgency/countdown optimization marker:** rejected because urgency is already covered and a new marker would reward manipulation or fake scarcity.
- **“GA4 event exists” as a pass for measurement or outcomes:** rejected because code/tag presence does not prove event delivery, deduplication, attribution, or business impact.
- **AI-search / GEO visibility:** rejected as a trend signal, not yet a cross-site conversion barrier with a stable PASS/WATCH/FAIL contract.

Regression/replay/fixture coverage:

- Added durable failure class `audit-sales-screenshot-evidence-overclaim`.
- It blocks a sales audit from scoring keyboard/accessibility, performance, or post-click disclosure `PASS` from screenshot-only evidence.
- It requires `/audit-sales`, `NOT_TESTED`, `decision-critical`, `keyboard`, and `Core Web Vitals` in the safe sample.
- `/audit-sale` remains alias-only and has no separate fixture.

Accepted durable marker refinements: 3.
Accepted temporary candidates: 0.

No temporary candidate was accepted, so no 90-day expiry entry is active.

## History

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
