# /audit-sales standard

`/audit-sales` is the single canonical sales and conversion audit mode for Andrey's projects. The old singular command `/audit-sale` is accepted only as a compatibility alias and must route here; it is not a separate standard.

Run `/context-scout` exactly once before the audit. Use `systems/audit-sales-markers.md` as the durable 100-point scorecard.

## Scope

`/audit-sales` evaluates:

- audience-message fit;
- offer clarity and value;
- trust and proof;
- objections and decision support;
- CTA and conversion path;
- friction and usability;
- measurement readiness.

It does not replace `/audit-ui`, `/safe`, `/audit-fin`, `/planner`, or `/delivery`.

## Evidence protocol

Accept a URL, screenshots, or both. Record target page, route, viewport, intended audience, offer, visitor stage, primary conversion action, secondary action, evidence available, and missing evidence.

For screenshots only, score visible message, offer, proof cues, and CTA clarity. Mark behavior, form completion, analytics, persistence, checkout, and post-click flow `NOT_TESTED`.

For an accessible URL, inspect desktop and mobile, follow the primary CTA, test one relevant form/contact/cart/checkout/Telegram/WhatsApp state, and record destination consistency, loading, and errors. Mark inaccessible behavior `NOT_TESTED` rather than guessing.

## Audit logic

1. Identify the page job and visitor stage.
2. State the offer in one sentence from the visitor's perspective.
3. Score categories A–G from `systems/audit-sales-markers.md`.
4. Separate observed fact, heuristic interpretation, analytics evidence, and missing evidence.
5. Identify the three highest-impact conversion leaks with `P0`, `P1`, or `P2` priority.
6. Name what already works and must be preserved.
7. Recommend one focused conversion direction.
8. Select exactly three to five necessary changes.
9. Produce one bounded ready Codex prompt routed to `/delivery`, `/audit-ui`, `/safe`, or `/planner`.

## Truth and safety boundaries

Use verified business facts only. Do not invent testimonials, results, statistics, qualifications, prices, guarantees, scarcity, urgency, or conversion rates. Do not promise conversion uplift without analytics or an experiment.

Do not use dark patterns, manipulative pressure, fake scarcity, fake urgency, hidden costs, forced continuity, or misleading comparison framing.

Provider-dependent auth, payment, checkout, CRM, storage, admin persistence, uploads, webhooks, and production persistence remain `BLOCKED` or `NEEDS_VERIFICATION` without provider/live proof.

## Measurement readiness

Keep observed metrics separate from the heuristic score. When metrics are missing, propose only:

- primary conversion event and success definition;
- supporting funnel events;
- source/campaign attribution;
- baseline window or experiment plan;
- owner and no-PII validation step.

## Persistent memory

Weekly portfolio audits must read and update `projects/codex-automation/audit-sales-memory.md` when GitHub write access exists.

- Compare every site with the previous saved state.
- Label findings `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED`.
- Historical heuristic scores are comparison aids, not proof of revenue change.
- Never save secrets, provider payloads, private analytics, personal data, customer messages, or financial records.
- If memory cannot be updated, return an exact patch and `MEMORY_UPDATE_BLOCKED`.

## Required Codex prompt

Every run must produce one ready prompt containing:

- repo, live URL, route, audience, page goal, and primary conversion action;
- evidence, score, confidence, and missing evidence;
- exactly three to five selected improvements;
- preserved strengths and do-not-touch boundaries;
- existing repo checks only;
- desktop/mobile CTA verification;
- one form/contact/cart/price/process uncertainty state;
- live proof when a production URL exists;
- `STATE.md`/`LOG.md` check.

## Final report

```txt
STATUS: SUCCESS / PARTIAL / BLOCKED
Mode:
Target page and primary conversion:
Evidence and missing evidence:
Score A–G and total /100:
Confidence:
What sells well:
Top 3 conversion leaks:
Top 3–5 necessary improvements:
Preserve:
Metrics / instrumentation:
Ready Codex prompt:
Verification:
Risks:
Needs verification:
Memory update:
```
