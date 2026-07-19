# /audit-sales conversion markers

Version: 1.1
Owner: `/audit-sales` shared standard
Last intelligence review: 2026-07-19

## Purpose

This is the durable 100-point scorecard for a sales and conversion audit of a public page. Use it with `systems/audit-sales.md`. It evaluates the visitor's ability to understand, trust, and take the next honest step; it is not a visual redesign brief and it does not prove revenue or conversion uplift.

Score a marker only from supplied evidence. Use `NOT_TESTED` rather than guessing about behavior, post-click steps, accessibility, performance, analytics, or outcomes.

## Scorecard

### A. Message and audience fit — 20

- Target audience is recognizable — 5
- Problem or desired outcome is explicit — 5
- Page matches likely traffic intent — 5
- Language is concrete and audience-specific — 5

### B. Offer clarity and value — 20

- What is offered is clear — 5
- Outcome or value is concrete — 5
- Scope, deliverables, or process is understandable — 5
- Decision-critical cost, eligibility, timing, format, and post-CTA expectations are disclosed before commitment — 5

### C. Trust and proof — 15

- Credibility, identity, or authority — 4
- Testimonials, cases, examples, or evidence — 4
- Risk reversal, boundaries, guarantees, or limitations — 4
- Contact, business legitimacy, or policy signals — 3

### D. CTA and conversion path — 20

- One primary CTA is dominant — 5
- CTA wording states next action or value — 5
- CTA appears at the right moments — 4
- CTA-to-completion path is short and predictable — 4
- Secondary CTA supports uncertainty without competing — 2

### E. Objections and decision support — 10

- Key objections are answered — 4
- Who it is and is not for is clear — 2
- FAQ, process, timing, or format reduces uncertainty — 2
- Urgency or scarcity is truthful and non-manipulative — 2

### F. Friction and usability — 10

- Primary conversion path is operable on mobile and by keyboard, with identifiable controls, visible focus, and usable target size/spacing — 3
- Forms, checkout, or contact ask only what is needed — 3
- Primary-path loading, responsiveness, visual stability, assets, errors, and interactions do not block completion — 2
- Navigation and exits support the goal — 2

### G. Measurement readiness — 5

- Primary conversion event is defined — 2
- Funnel events can be measured — 1
- Source or campaign attribution is possible — 1
- Baseline or experiment plan exists — 1

## Durable marker decision contracts

These three marker refinements are durable from version 1.1. They make existing failure classes observable without changing category weights or the 100-point total.

### B4. Decision-critical expectations before commitment — 5

- `PASS` — relevant cost or price expectation, eligibility/prerequisites, timing/format, and what happens after the CTA are available before payment, booking, account creation, or another meaningful commitment.
- `WATCH` — the next action is predictable, but one low-risk detail is deferred or a service legitimately requires a quote/consultation and states that clearly.
- `FAIL` — fees, eligibility, timing, format, renewal/continuity, data requirements, or the actual next step are hidden, contradictory, or revealed only after commitment.
- `NOT_TESTED` — the downstream step is inaccessible, screenshot-only evidence cannot show the disclosure point, or the required business facts are unavailable.

### F1. Operable primary conversion path — 3

- `PASS` — the primary action and one relevant completion state work on mobile and by keyboard; controls expose an understandable name/purpose; focus is visible and not obscured; there is no keyboard trap; pointer targets meet WCAG 2.2 minimum size or a documented spacing/equivalent-control exception.
- `WATCH` — completion remains possible, but one non-blocking focus, naming, spacing, or mobile ergonomics issue adds effort.
- `FAIL` — the primary action cannot be identified or activated, keyboard/mobile users cannot complete the path, focus is lost/obscured, an interaction trap exists, or adjacent undersized targets create a material activation risk.
- `NOT_TESTED` — no live/browser evidence exists. A screenshot never proves keyboard, focus, target-size, or completion behavior.

### F3. Primary-path performance and stability — 2

- `PASS` — current field data for the audited route meets the web.dev “good” Core Web Vitals thresholds at the 75th percentile on the relevant device class, and no blocking error or interaction failure is observed.
- `WATCH` — field data is unavailable but repeatable lab plus manual interaction evidence shows no blocker, or one metric is in “needs improvement” without an observed completion failure.
- `FAIL` — field evidence is poor, or loading, interaction latency, layout shift, asset failure, crash, or error blocks or materially disrupts the primary action.
- `NOT_TESTED` — no reliable field, lab, or manual interaction evidence is available. Visual impression alone is not performance evidence.

Current web.dev “good” thresholds used by this contract are LCP `<= 2.5s`, INP `<= 200ms`, and CLS `<= 0.1`, evaluated at the 75th percentile. Refresh the thresholds from web.dev before changing them.

## Score interpretation

- 85–100: strong conversion foundation; optimize with evidence and experiments.
- 70–84: credible path with material leaks to address.
- 50–69: weak sales path; several P1 fixes are likely needed.
- Below 50: message, offer, or path is not sales-ready.

Never treat a high score as proof of sales or a lower score as a revenue forecast.

## Status and priority model

Every relevant marker receives one status:

- `PASS` — evidence supports the pass condition.
- `WATCH` — adequate but ambiguous, incomplete, or vulnerable.
- `FAIL` — evidence shows a material gap.
- `NOT_TESTED` — no reliable evidence is available.

Prioritize only with evidence:

- `P0` — primary CTA/path is broken, a misleading claim is present, purchase or contact is impossible, or a severe trust/mobile/accessibility blocker exists.
- `P1` — likely major conversion leak that should be addressed next.
- `P2` — lower-risk optimization opportunity.

## Evidence and safety rules

- Screenshot-only evidence may assess visible message, value, trust cues, CTA placement, and visible disclosure. Mark keyboard/focus behavior, target size, form completion, analytics, persistence, Core Web Vitals, and every post-click flow `NOT_TESTED`.
- For a URL, inspect desktop and mobile plus the primary CTA path, one relevant contact/form/checkout state, destination consistency, keyboard operation, visible focus, target-size risk, current performance evidence when available, and visible errors.
- Separate observed analytics from interpretation. Recommended analytics events are implementation guidance, not proof that tracking is working or that conversions improved.
- Do not invent benchmarks, conversion rates, testimonials, results, statistics, qualifications, prices, guarantees, or urgency.
- Missing business metrics must become an instrumentation plan: primary event, supporting funnel events, attribution, baseline, owner, validation step, and a no-sensitive-payload check.
- Do not use dark patterns, manipulative pressure, fake urgency, fake scarcity, hidden costs, or hidden decision-critical information.
