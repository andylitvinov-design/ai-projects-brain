# /audit-ui standard

`/audit-ui` is the shared UI audit, polish, and hardening standard for
Andrey's projects. Use it for visual/product UI work without turning a narrow
fix into a redesign.

It starts with `/context-scout` from `systems/context-scout-mode.md`, then reads
only the smallest useful UI context. `/context-scout` preflight runs first before
any UI critique, plan, edit, or auto-fix.

It uses the durable scorecard in `systems/audit-ui-markers.md`. That scorecard
makes `/audit-ui` act in three roles at once: **consultant** (fit to product and
user goal), **analyst** (evidence and reproducible defects), and **editor**
(concrete, coherent improvements and a delivery-ready prompt).

## 0. Mode selection

Before changing code, classify the task:

- Audit only: inspect and report; no code changes.
- Minimal fix: small CSS, layout, or component changes in the target area.
- Polish pass: small visual improvements after behavior already works.
- Hardening pass: edge cases, states, responsiveness, and accessibility basics.
- Redesign: not allowed unless the user explicitly requests redesign.

Default to Minimal fix when the user asks to fix UI. Default to Audit only when
the user asks to inspect, review, or audit. Never silently escalate to redesign.

## 0.1 Evidence and input protocol

Accept a live URL, a screenshot, or both. Do not pretend a screenshot proves
interactive, persisted, auth, or data-backed behavior.

Before critique, record:

- target route/screen and viewport;
- supplied evidence: URL, screenshot(s), or both;
- user moment, page goal, and primary action;
- whether the requested outcome is audit, polish, fix, or redesign;
- missing evidence that prevents a reliable judgment.

Use the marker statuses and priorities from `systems/audit-ui-markers.md`.
A screenshot-only audit may give visual direction and a ready prompt, but it
must mark behavioral claims `NOT_TESTED`.

## 1. Context read - token-efficient

Read only the minimum relevant context:

- target project `PROJECT.md` or `CODEX_BRIEF.md`, if present;
- target repo `AGENTS.md`, if present;
- `STATE.md` or `LOG.md`, if present;
- target route, page, or component files;
- existing design tokens, CSS variables, theme files, and shared components;
- existing data flow only for the affected UI;
- admin/content persistence files only when the visible defect depends on saved
  content, uploaded assets, product classification, categories, video links, or
  other data-backed UI.

Do not scan the whole repo unless the target file cannot be identified. Reuse
existing tokens and components before inventing new styles.

## 2. Project design context

Before judging aesthetics, identify the project UI brief from existing docs when
present:

- `DESIGN.md`
- `PRODUCT.md`
- `CODEX_UI_BRIEF.md`
- `PROJECT.md`
- `README.md`

If no brief exists, infer a temporary one and mark it `needs verification`:

```txt
Audience:
Product type:
Brand lane:
Tone:
Visual density:
Motion intensity:
Design variance:
Anti-references:
Existing components/tokens:
```

Do not impose generic SaaS aesthetics on every project.

## 2.1 Design-editor deliverable

Every audit must translate judgment into an executable direction:

1. **Diagnosis:** the three highest-impact marker failures with evidence and
   user impact.
2. **Recommended direction:** one named visual/editorial direction that fits
   this specific project; explain what to preserve and what to remove.
3. **Options:** two compact alternatives only when they represent a real
   product or brand trade-off. Do not create decorative variants.
4. **Delivery prompt:** a ready, bounded prompt with target route, evidence,
   likely files or a search plan, do-not-touch rules, acceptance criteria,
   three relevant test cases, commands, and STATE/LOG check.

For audit-only work, do not edit code; still provide the delivery prompt. For
a fix/polish request, apply only the approved minimal safe scope after the
diagnosis.

## 3. Critique layer - visual taste

Check and report:

- hierarchy: primary, secondary, and tertiary attention;
- composition: clear screen structure and grouping;
- spacing rhythm: consistent gaps, sections, and breathing room;
- typography: scale, line-height, weight, and wrapping;
- CTA clarity: primary action is obvious and reachable;
- density: enough information without clutter;
- emotional fit: the UI matches the user moment;
- brand fit: the screen feels specific to the project;
- visual noise: borders, shadows, badges, icons, gradients, and decoration.

## 4. Anti-slop detectors

Flag these as defects unless the project intentionally uses them:

- random purple or blue gradients as default style;
- cards nested inside cards without structural reason;
- generic rounded icon tiles above every heading;
- gray text on colored backgrounds with weak contrast;
- too many borders and shadows at once;
- random blobs, glows, or bokeh decoration;
- unrelated emoji or icon decoration;
- desktop-only layout decisions;
- inconsistent radii, spacing, button styles, or card styles;
- decorative animation that slows task completion.

## 5. Audit layer - structure and correctness

Check:

- desktop layout;
- mobile layout;
- tablet layout when relevant;
- navigation clarity;
- forms, completion friction, authentication assistance, validation and error
  recovery, buttons, and tap targets;
- loading, empty, error, and success states;
- long text wrapping;
- image aspect ratios;
- overflow and truncation;
- sticky elements and footer behavior;
- keyboard focus and basic accessibility;
- color-independent status, validation, selection, link, and chart meaning, plus
  non-text contrast for essential UI boundaries and graphical objects;
- clean-session render integrity, critical asset/data delivery, runtime errors,
  interaction responsiveness, and layout shift;
- default state, persisted state, and clicked/selected state for stateful UI.

## 6. Polish layer - interface feel

Only apply polish when it is small and safe. Prefer:

- `text-wrap: balance` for headings;
- `text-wrap: pretty` for readable prose where useful;
- `font-variant-numeric: tabular-nums` for balances, prices, counters, and dashboards;
- optical alignment for icons, text, pills, and buttons;
- concentric radius for nested surfaces;
- reduced noisy borders and subtle depth where appropriate;
- consistent image outline or depth treatment;
- clear hover, focus, and active states;
- interruptible CSS transitions for hover and state changes;
- purposeful enter or exit animation only when it clarifies state;
- `prefers-reduced-motion` support when adding motion.

Do not add animation libraries or UI dependencies unless already used and truly
necessary.

## 7. Hardening layer - edge cases

Test or reason through:

- very long titles and descriptions;
- missing images and broken image URLs;
- empty datasets;
- one item only;
- many cards or list items;
- slow loading and failed requests;
- permission or auth blocked states;
- password-manager, paste, autofill, one-time-code, and repeated-entry behavior
  when forms or authentication are in scope;
- small mobile width;
- large desktop width;
- localization and text expansion;
- currency or number alignment where relevant;
- legacy `localStorage` / `sessionStorage` values that may preserve old UI
  behavior after a requested default changes.

## 8. Browser verification

If the target repo has a dev server, preview, or live URL, verify visually.

Minimum viewports:

```txt
desktop: about 1365x900
mobile: about 390x844 or 390x900
reflow: 320 CSS px equivalent, or a 1280px viewport at 400% zoom when feasible
tablet: when the UI has tablet-specific layout risk
```

Minimum scenarios:

1. In a clean session, the target page reaches a non-empty, correctly styled
   render in a supported real browser. HTTP 200 alone is not proof: confirm the
   approved navigation and required primary/summary content are present, no
   fatal console/runtime error stops rendering, and critical HTML/CSS/JS/data
   resources return the expected content type without auth/protected-preview
   redirects or a stale shell/data-version mismatch.
2. Mobile layout has no horizontal overflow and no hidden primary actions.
3. Non-exempt content reflows at a 320 CSS px equivalent without page-level
   two-dimensional scrolling; zoom/text enlargement does not hide content or
   reorder keyboard navigation away from the visual flow.
4. Tab through the page with sticky headers/footers and persistent overlays
   open. The focused component is not fully hidden, and its focus indicator
   remains distinguishable against any blur, dimming, or translucent layer.
5. Pointer targets are at least 24 by 24 CSS px, or each undersized target has a
   documented WCAG spacing/equivalent/inline/user-agent/essential exception.
6. Inspect status, validation, selection, links, trend direction, and chart
   series without relying on hue: each color-coded meaning has a visible text,
   icon, shape, pattern, position, or direct-label cue. Essential control
   boundaries, states, focus indicators, and graphical objects have at least
   3:1 contrast against adjacent colors where WCAG applies, or the exception is
   documented; data visualizations retain labels/legends and an accessible
   textual or tabular equivalent when needed.
8. Trigger one validation error and one dynamic update when those states exist.
   The error is identified in text and associated with or linked to its field;
   success, result, waiting, progress, and error status messages are exposed to
   assistive technology without unnecessary focus movement or duplicate chatter.
7. When a form or authentication flow exists, inspect labels, field purpose,
   input type, and autocomplete semantics. In one same-process flow, previously
   entered information is auto-populated or selectable unless a documented
   exception applies. Sign-in permits paste and password-manager/autofill help;
   one-time codes can be assisted where supported; no step requires solving,
   recalling, or manually transcribing a cognitive test without an alternative,
   assistance mechanism, or documented WCAG exception.
9. One interactive state is checked: hover, focus, open, submit, loading, error,
   or empty. The interaction reaches visible feedback without an obvious
   long-task freeze; use field or lab INP evidence when it is available.
10. For stateful UI, clean-session default is checked before clicked-state.
11. For legacy persisted UI, old storage keys are checked or explicitly marked
    `needs verification`.
12. If translucency, glass, or blur is used, inspect its worst-case background:
    contrast, image color fidelity, and an opaque/reduced-transparency fallback
    must remain usable.

If browser verification cannot run, say exactly why and provide manual
verification steps. Do not claim live is fixed unless live or preview was
actually checked.

## 8.1 Stateful and admin-content verification

Use this whenever the UI bug involves saved user/admin state, filters, layout
switches, uploaded files, product/service/category classification, video links,
cart state, or generated content.

Required verification bundle:

1. Clean session: no cookies/localStorage/sessionStorage; expected default is
   visible immediately.
2. Legacy persisted state: old keys or saved selections do not keep the old
   unwanted behavior unless the user explicitly chose that behavior again.
3. Clicked/selected state: verify only after the clean default and legacy state
   are proven.
4. Admin/content round trip: when the UI depends on admin data, verify the
   editing/upload/select/save action, persistence after refresh, and the public
   card/page that consumes the saved data.
5. Data source: if admin changes disappear, prove whether the app is reading
   Supabase, localStorage fallback, static seed data, build-time assets, or a
   provider/API response before patching.
6. Screenshot parity: when Andrey supplies screenshots, compare the actual
   viewport and route to the screenshot symptom; if reproduction is blocked,
   say what exact route/state/auth/data is missing.

Do not claim a UI/content fix is complete from only a clicked happy path, a
single admin screen, or a code-path inspection. The user-visible default and the
saved source of truth must both be accounted for.

## 9. Minimal safe fix rules

Allowed:

- target-area CSS and layout fixes;
- small component markup changes;
- reuse of existing tokens and components;
- missing states only where directly relevant;
- copy clarity when UI meaning is unclear.

Not allowed without explicit user request:

- whole-app redesign;
- new design system;
- large component rewrite;
- new dependency;
- env, secrets, auth, backend, or dispatch changes;
- changing data semantics;
- hiding problems instead of fixing layout.

## 10. Checks and commands

Run only commands that exist in the target repo, such as:

```bash
npm run lint
npm test
npm run build
npm run typecheck
```

Also run a search confirming this brain standard exists after updating
`ai-projects-brain`. If commands do not exist, report them as `not present`.

## 10.1 Trend use

Treat current design trends as candidate ideas, not universal requirements.
Use the gate and expiry rules in `systems/audit-ui-markers.md`. A trend may
influence the recommended direction only when it improves this page's goal
without reducing clarity, accessibility, performance, or brand specificity.

## 11. Final report format

Every `/audit-ui` run must end with:

```txt
STATUS: SUCCESS / PARTIAL / BLOCKED

Mode:
- Audit only / Minimal fix / Polish pass / Hardening pass / Redesign requested

Context read:
- ...

Target UI:
- route/page/component

Marker scoreboard:
- PASS:
- WATCH:
- FAIL (P0/P1/P2):
- NOT_TESTED:

Evidence:
- URL / screenshot / viewport:
- Missing evidence:

UI defects found:
- Consultant diagnosis:
- Analyst evidence:
- Editor direction:

Recommended direction:
- Preserve:
- Change:
- Why it fits:

Ideas / alternatives:
- A (recommended):
- B (only if materially different):

Ready /delivery prompt:
```text
...
```

Changed files:
- ...

Verification:
- Desktop:
- Mobile:
- Tablet:
- Render integrity:
- Reflow/zoom:
- Translucency/material contrast (when used):
- Focus not obscured:
- Target size/spacing:
- Errors/status announcements:
- Color-independent meaning/non-text contrast:
- Form completion/authentication:
- Clean-session default:
- Legacy persisted state:
- Clicked/selected state:
- Admin/content round trip:
- Commands:

Risks:
- ...

Needs verification:
- ...

STATE/LOG update:
- updated / not present / skipped with reason
```
