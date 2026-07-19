# /audit-sales standard

`/audit-sales` is the single canonical sales and conversion audit mode for Andrey's projects. The old singular command `/audit-sale` is accepted only as a deprecated compatibility alias and must route here; it is not a separate standard, scorecard, memory, validator, or automation.

Run `/context-scout` from `systems/context-scout-mode.md` exactly once before the audit. Use `systems/audit-sales-markers.md` as the durable 100-point scorecard.

## Scope

`/audit-sales` evaluates:

- audience-message fit;
- offer clarity and value;
- trust and proof;
- objections and decision support;
- CTA and conversion path;
- friction, accessibility, and usability;
- primary-path performance and stability;
- measurement readiness.

It does not replace `/audit-ui`, `/safe`, `/audit-fin`, `/planner`, or `/delivery`.

## Evidence protocol

Accept a URL, screenshots, or both. Record target page, route, viewport, intended audience, offer, visitor stage, primary conversion action, secondary action, evidence available, and missing evidence.

For screenshots only, score visible message, offer, proof cues, CTA clarity, and visible decision-critical disclosure. Mark keyboard/focus behavior, target size, form completion, analytics, persistence, checkout, Core Web Vitals, and every post-click flow `NOT_TESTED`.

For an accessible URL:

1. inspect desktop and mobile;
2. follow the primary CTA;
3. test one relevant form/contact/cart/checkout/Telegram/WhatsApp state;
4. verify destination consistency, loading, visible errors, and the post-CTA expectation;
5. test the primary path by keyboard, including visible/unobscured focus and no keyboard trap;
6. inspect actionable target-size/spacing risk;
7. use current field performance evidence when available, otherwise label repeatable lab/manual evidence separately;
8. mark inaccessible behavior `NOT_TESTED` rather than guessing.

## Audit logic

1. Identify the page job and visitor stage.
2. State the offer in one sentence from the visitor's perspective.
3. Score categories A–G from `systems/audit-sales-markers.md`.
4. Apply the durable marker decision contracts for decision-critical expectations, accessible primary operation, and primary-path performance.
5. Separate observed fact, heuristic interpretation, analytics evidence, field/lab performance evidence, and missing evidence.
6. Identify the three highest-impact conversion leaks with `P0`, `P1`, or `P2` priority.
7. Name what already works and must be preserved.
8. Recommend one focused conversion direction.
9. Select exactly three to five necessary changes.
10. Produce one bounded ready Codex prompt routed to `/delivery`, `/audit-ui`, `/safe`, or `/planner`.

## Truth and safety boundaries

Use verified business facts only. Do not invent testimonials, results, statistics, qualifications, prices, guarantees, scarcity, urgency, or conversion rates. Do not invent or apply generic conversion benchmarks as page-specific evidence. Do not promise conversion uplift without analytics or an experiment.

Do not use dark patterns, manipulative pressure, fake scarcity, fake urgency, hidden costs, forced continuity, or misleading comparison framing. Decision-critical cost, eligibility, timing, format, renewal/continuity, data requirements, and the actual post-CTA step must not be hidden until after commitment.

Provider-dependent auth, payment, checkout, CRM, storage, admin persistence, uploads, webhooks, and production persistence remain `BLOCKED` or `NEEDS_VERIFICATION` without provider/live proof.

## Accessibility and performance evidence

- Use WCAG 2.2 as the normative accessibility reference.
- A screenshot cannot prove keyboard operation, focus behavior, target-size compliance, form errors, or completion.
- For primary controls, check name/purpose, keyboard operation, visible and unobscured focus, no trap, and WCAG 2.2 target-size/spacing requirements.
- For performance, prefer current field data for the audited route and relevant device class.
- Use web.dev's current Core Web Vitals definitions and thresholds. If field evidence is unavailable, lab/manual evidence may support `WATCH`, not an unqualified field-performance `PASS`.
- Never convert a Lighthouse or PageSpeed score into a promised conversion result.

## Measurement readiness

Keep observed metrics separate from the heuristic score. When metrics are missing, propose only:

- primary conversion event and success definition;
- supporting funnel events;
- error/abandonment states where relevant;
- source/campaign attribution;
- baseline window or experiment plan;
- owner and no-sensitive-payload validation step.

Platform-recommended events such as GA4 `generate_lead`, `form_start`, `form_submit`, `begin_checkout`, and `purchase` are naming/implementation guidance. Their presence in code or a tag manager is not proof that events arrive correctly, deduplicate correctly, or represent business outcomes. Validate measurement in the narrowest available analytics/debug view without storing personal or sensitive payloads.

## Intelligence update gate

Sales Audit Intelligence may change at most three durable markers or temporary trend candidates per run.

A candidate is accepted only when it:

1. is supported by credible evidence, preferably two sources;
2. maps to an observable decision or conversion barrier;
3. does not introduce manipulation, fake urgency, unsupported proof, accessibility loss, or performance regression;
4. has a concrete `PASS` / `WATCH` / `FAIL` / `NOT_TESTED` check;
5. does not duplicate an existing marker;
6. is useful across at least two active sites or is explicitly project-specific.

Temporary candidates expire after 90 days unless refreshed. Every intelligence run updates `projects/codex-automation/audit-sales-memory.md` with sources, accepted/rejected candidates, rationale, regression coverage, and exact validation evidence. If no candidate passes, record `NO_MARKER_CHANGE`.

## Persistent memory

Weekly portfolio audits and Sales Audit Intelligence runs must read and update `projects/codex-automation/audit-sales-memory.md` when GitHub write access exists.

- Compare every site with the previous saved state.
- Label findings `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED`.
- Historical heuristic scores are comparison aids, not proof of revenue change.
- Never save secrets, provider payloads, private analytics, personal data, customer messages, or financial records.
- If memory cannot be updated, return an exact patch and `MEMORY_UPDATE_BLOCKED`.

## Required Codex prompt

Every site-audit run must produce one ready prompt containing:

- repo, live URL, route, audience, page goal, and primary conversion action;
- evidence, score, confidence, and missing evidence;
- exactly three to five selected improvements;
- preserved strengths and do-not-touch boundaries;
- existing repo checks only;
- desktop/mobile CTA verification;
- keyboard/focus/target-size verification for the primary path;
- one form/contact/cart/price/process uncertainty state;
- performance evidence state;
- live proof when a production URL exists;
- `STATE.md`/`LOG.md` check.

## Final report

```txt
STATUS: SUCCESS / PARTIAL / BLOCKED
Mode:
Target page and primary conversion:
Evidence and missing evidence:
Score A–G and total /100:
Marker statuses:
Confidence:
What sells well:
Top 3 conversion leaks:
Top 3–5 necessary improvements:
Preserve:
Accessibility / performance:
Metrics / instrumentation:
Ready Codex prompt:
Verification:
Risks:
Needs verification:
Memory update:
```
