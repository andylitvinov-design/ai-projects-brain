# /audit-sales conversion markers

Version: 1.0
Owner: `/audit-sales` shared standard

## Purpose

This is the durable 100-point scorecard for a sales and conversion audit of a public page. Use it with `systems/audit-sales.md`. It evaluates the visitor's ability to understand, trust, and take the next honest step; it is not a visual redesign brief and it does not prove revenue or conversion uplift.

Score a marker only from supplied evidence. Use `NOT_TESTED` rather than guessing about behavior, post-click steps, analytics, or outcomes.

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
- Price or next-step expectations are sufficiently clear — 5

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

- Mobile conversion path works — 3
- Forms, checkout, or contact ask only what is needed — 3
- Performance, assets, errors, and interactions do not block — 2
- Navigation and exits support the goal — 2

### G. Measurement readiness — 5

- Primary conversion event is defined — 2
- Funnel events can be measured — 1
- Source or campaign attribution is possible — 1
- Baseline or experiment plan exists — 1

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

- `P0` — primary CTA/path is broken, a misleading claim is present, purchase or contact is impossible, or a severe trust/mobile blocker exists.
- `P1` — likely major conversion leak that should be addressed next.
- `P2` — lower-risk optimization opportunity.

## Evidence and safety rules

- Screenshot-only evidence may assess visible message, value, trust cues, and CTA placement. Mark behavior, form completion, analytics, persistence, and every post-click flow `NOT_TESTED`.
- For a URL, inspect desktop and mobile plus the primary CTA path, one relevant contact/form/checkout state, destination consistency, and visible errors when access permits.
- Separate observed analytics from interpretation. Do not invent benchmarks, conversion rates, testimonials, results, statistics, qualifications, prices, guarantees, or urgency.
- Missing business metrics must become an instrumentation plan: primary event, supporting funnel events, attribution, baseline, owner, and validation step.
- Do not use dark patterns, manipulative pressure, fake urgency, fake scarcity, or hidden decision-critical information.
