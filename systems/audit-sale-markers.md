# /audit-sale conversion markers

Version: 1.0
Owner: `/audit-sale` shared standard

## Purpose

This is the durable 100-point scorecard for a sales and conversion audit of a
public page. Use it with `systems/audit-sale.md`. It evaluates the visitor's
ability to understand, trust, and take the next honest step; it is not a visual
redesign brief and it does not prove revenue or conversion uplift.

Score a marker only from supplied evidence. Use `NOT_TESTED` rather than
guessing about behavior, post-click steps, analytics, or outcomes.

## Scorecard

Score each item from zero to its weight, then report the weighted total out of
100. A heuristic score is an expert assessment, not business-performance data.

### A. Message and audience fit — 20

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| Target audience is recognizable | 5 | A likely visitor can tell who the page is for. |
| Problem or desired outcome is explicit | 5 | The page names a concrete need, gain, or decision context. |
| Page matches likely traffic intent | 5 | The message fits the search, referral, ad, or returning-visitor intent that is evidenced. |
| Language is concrete and audience-specific | 5 | Copy avoids generic claims that could apply to any business. |

### B. Offer clarity and value — 20

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| What is offered is clear | 5 | The visitor can name the product, service, consultation, or next step. |
| Outcome or value is concrete | 5 | Value is described without unsupported promises. |
| Scope, deliverables, or process is understandable | 5 | The page explains what happens after the CTA at an appropriate level. |
| Price or next-step expectations are sufficiently clear | 5 | Relevant cost, qualification, or contact expectations do not create avoidable uncertainty. |

### C. Trust and proof — 15

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| Credibility, identity, or authority | 4 | The business or person is identifiable with verified context. |
| Testimonials, cases, examples, or evidence | 4 | Proof is specific, attributable when appropriate, and already evidenced. |
| Risk reversal, boundaries, guarantees, or limitations | 4 | The page makes only truthful commitments and sets honest limits. |
| Contact, business legitimacy, or policy signals | 3 | A visitor can verify a legitimate way to continue or get support. |

### D. CTA and conversion path — 20

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| One primary CTA is dominant | 5 | The desired next action is not competing with equal-weight alternatives. |
| CTA wording states next action or value | 5 | The label is specific enough to set an honest expectation. |
| CTA appears at the right moments | 4 | A visitor can act after understanding the offer and when ready later on the page. |
| CTA-to-completion path is short and predictable | 4 | Tested steps have no surprising destination, blocker, or unnecessary detour. |
| Secondary CTA supports uncertainty without competing | 2 | A lower-commitment path helps hesitant visitors without diluting the primary action. |

### E. Objections and decision support — 10

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| Key objections are answered | 4 | Evidence-based copy addresses the main reasons a visitor may not proceed. |
| Who it is and is not for is clear | 2 | Qualification reduces avoidable bad-fit leads or purchases. |
| FAQ, process, timing, or format reduces uncertainty | 2 | Decision support is available before a high-friction commitment. |
| Urgency or scarcity is truthful and non-manipulative | 2 | Any time limit or availability claim is real, relevant, and verifiable. |

### F. Friction and usability — 10

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| Mobile conversion path works | 3 | The tested mobile path keeps the primary CTA usable and visible. |
| Forms, checkout, or contact ask only what is needed | 3 | The next step avoids unnecessary fields and effort. |
| Performance, assets, errors, and interactions do not block | 2 | Tested journey has no conversion-blocking technical failure. |
| Navigation and exits support the goal | 2 | Choices do not distract from or abandon the primary journey. |

### G. Measurement readiness — 5

| Marker | Weight | Pass condition |
| --- | ---: | --- |
| Primary conversion event is defined | 2 | The business can name the event that represents the page goal. |
| Funnel events can be measured | 1 | Meaningful CTA, start, submit, or completion steps have a plan or implementation. |
| Source or campaign attribution is possible | 1 | Relevant acquisition source can be connected to the conversion path. |
| Baseline or experiment plan exists | 1 | A future change can be compared with a defined baseline or experiment. |

## Score interpretation

- 85–100: strong conversion foundation; optimize with evidence and experiments.
- 70–84: credible path with material leaks to address.
- 50–69: weak sales path; several P1 fixes are likely needed.
- Below 50: message, offer, or path is not sales-ready.

Never treat a high score as proof of sales or a lower score as a revenue
forecast.

## Status and priority model

Every relevant marker receives one status:

- `PASS` — evidence supports the pass condition.
- `WATCH` — adequate but ambiguous, incomplete, or vulnerable.
- `FAIL` — evidence shows a material gap.
- `NOT_TESTED` — no reliable evidence is available.

Prioritize only with evidence:

- `P0` — primary CTA/path is broken, a misleading claim is present, purchase or
  contact is impossible, or a severe trust/mobile blocker exists.
- `P1` — likely major conversion leak that should be addressed next.
- `P2` — lower-risk optimization opportunity.

## Evidence and safety rules

- Screenshot-only evidence may assess visible message, value, trust cues, and
  CTA placement. Mark behavior, form completion, analytics, persistence, and
  every post-click flow `NOT_TESTED`.
- For a URL, inspect desktop and mobile plus the primary CTA path, one relevant
  contact/form/checkout state, destination consistency, and visible errors when
  access permits.
- Separate observed analytics from interpretation. Do not invent benchmarks,
  conversion rates, testimonials, results, statistics, qualifications, prices,
  guarantees, or urgency.
- Missing business metrics must become an instrumentation plan: primary event,
  supporting funnel events, attribution, baseline, owner, and validation step.
- Do not use dark patterns, manipulative pressure, fake urgency, fake scarcity,
  or hidden decision-critical information.
