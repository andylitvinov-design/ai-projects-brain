# /audit-sale standard

`/audit-sale` is the shared sales and conversion audit standard for Andrey's
projects. It evaluates audience-message fit, offer clarity, value, proof,
objections, CTA path, conversion friction, and measurement readiness on public
pages without turning a focused audit into a site redesign.

Run `/context-scout` from `systems/context-scout-mode.md` exactly once before
this audit. Use its `CONTEXT BUNDLE`; do not rerun the scout unless the target
project changes. The audit uses the durable scorecard in
`systems/audit-sale-markers.md`.

`/audit-ui` evaluates interface structure, visual hierarchy, responsiveness,
polish, accessibility, and browser-visible defects. `/audit-sale` evaluates
the commercial decision path and should request UI work only where it directly
reduces a proven conversion barrier. `/improve` discovers broad strategic
opportunities; `/audit-sale` produces a bounded page-specific audit and the
next delivery prompt.

## 0. Mode selection

Before analysis, classify the request:

- Audit only: inspect and report; do not edit code.
- Minimal conversion fix: make only the selected page changes needed to reduce
  evidence-backed friction or ambiguity.
- Copy or offer polish: clarify verified value, process, CTA, or objections.
- Funnel hardening: verify or improve the tested conversion path and existing
  measurement readiness.
- Redesign: not allowed unless the user explicitly requests it.

Default to Audit only for review requests and Minimal conversion fix for a
clear fix request. Do not turn a conversion audit into a full-site redesign.

## 0.1 Evidence and input protocol

Accept a URL, screenshot(s), or both. Before scoring, record:

- target page, route, viewport, and supplied evidence;
- intended audience, offer, traffic intent, visitor stage, and primary
  conversion action;
- secondary conversion action, if any;
- missing evidence and the requested mode.

For screenshots only, assess visible message, offer, proof cues, and CTA
clarity. Mark behavior, form completion, analytics, persistence, and post-click
flow as `NOT_TESTED`. Never infer an interaction, data result, or conversion
outcome from a static image.

For an accessible URL, inspect desktop and mobile, follow the primary CTA path,
check one relevant form/contact/checkout state, and record destination
consistency and visible loading or error behavior. Mark inaccessible evidence
`NOT_TESTED` rather than guessing.

## 1. Context read — token-efficient

After the one `/context-scout` bundle, read only the smallest useful context:

- target project `PROJECT.md` or `CODEX_BRIEF.md`, if present;
- target repo `AGENTS.md`, `STATE.md`, or `LOG.md`, if present;
- target route/page, current offer copy, CTA implementation, form/checkout
  path, and existing analytics implementation only when relevant;
- verified price, policy, qualification, proof, and business facts that the
  target page already uses.

Do not scan the whole repository, rewrite unrelated pages, or change product
terms, backend, auth, payments, providers, env, or analytics vendors without an
explicit request.

## 2. Audit logic

1. Identify the page job and visitor stage: awareness, consideration, decision,
   checkout, or contact.
2. State the current offer in one sentence from the visitor's perspective and
   mark uncertainty explicitly.
3. Score `A` through `G` in `systems/audit-sale-markers.md` out of 100, with
   `PASS`, `WATCH`, `FAIL`, or `NOT_TESTED` for each relevant marker.
4. Separate observed facts, heuristic interpretation, and missing evidence.
5. Identify the three highest-impact conversion leaks by user segment,
   evidence, and `P0`/`P1`/`P2` priority.
6. Name what already works and must be preserved.
7. Recommend one focused conversion direction, not a broad redesign.
8. Select only three to five necessary changes for the next `/delivery`.
9. Produce a bounded Codex prompt that implements only those selected changes.

## 3. Truth, proof, and measurement boundaries

Use verified business facts only. Do not invent testimonials, results,
statistics, qualifications, prices, guarantees, or urgency. Do not promise
conversion uplift without analytics or an experiment. Describe an untested
change as expected to reduce friction or improve clarity, not as a guaranteed
commercial outcome.

Do not use dark patterns, manipulative pressure, fake scarcity, fake urgency,
forced continuity, hidden costs, or misleading comparison framing.

Report available metrics separately from the heuristic score. Relevant metrics
may include primary conversion rate, CTA click-through, form start/completion,
checkout start/completion, qualified lead rate, and revenue per visitor or
lead-to-sale rate. Never invent values. Missing metrics become a concise
instrumentation plan using the existing analytics stack where possible:

- primary conversion event and success definition;
- supporting funnel events and stable event names;
- source/campaign attribution;
- baseline window or experiment plan;
- owner and a no-PII validation step.

## 4. Minimal safe fix boundary

Allowed only when verified and requested:

- hero, offer, CTA, process, FAQ, trust, or objection copy based on supplied
  facts;
- target-page section order and emphasis;
- reuse, removal, or replacement of existing assets;
- conversion-relevant layout changes;
- form simplification that preserves business behavior;
- event instrumentation in the existing analytics stack.

Not allowed without explicit request:

- whole-site redesign or a new design system;
- invented social proof, outcomes, credentials, guarantees, prices, or
  scarcity;
- changes to business terms, checkout semantics, auth, payments, backend,
  providers, env, or data contracts;
- a new dependency or analytics vendor;
- a claim that a heuristic audit proves conversion growth.

## 5. Required delivery prompt

Every `/audit-sale` run must produce a bounded Codex `/delivery` prompt with:

- target repository, live URL when known, route/page, audience, page goal, and
  primary conversion action;
- evidence, score, confidence, and explicit missing evidence;
- likely files or a narrow `rg` search plan;
- exactly three to five selected improvements;
- verified facts to preserve and do-not-touch boundaries;
- no invented proof, claims, prices, guarantees, or urgency;
- minimal safe fix scope and no-redesign boundary;
- at least three relevant tests: desktop CTA destination, mobile CTA/path, and
  one uncertainty/form/price/process state;
- existing repo commands only, browser/live verification when a URL exists,
  and `STATE.md`/`LOG.md` check.

## 6. Final report format

Every `/audit-sale` run ends with:

````txt
STATUS: SUCCESS / PARTIAL / BLOCKED

Mode:
Context read:
Target page and primary conversion:
Evidence and missing evidence:

Conversion score:
- Total: __/100
- A. Message and audience fit: __/20
- B. Offer clarity and value: __/20
- C. Trust and proof: __/15
- D. CTA and conversion path: __/20
- E. Objections and decision support: __/10
- F. Friction and usability: __/10
- G. Measurement readiness: __/5
- Confidence:

What sells well:
- ...

Conversion leaks:
- P0/P1/P2 — evidence — affected visitor

Top necessary improvements (3–5):
1. ...

Preserve:
- ...

Metrics / instrumentation:
- Observed:
- Missing:
- Proposed events:

Ready Codex /delivery prompt:
```text
...
```

Changed files:
Verification:
Risks:
Needs verification:
STATE/LOG update:
````
