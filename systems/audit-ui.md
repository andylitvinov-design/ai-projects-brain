# /audit-ui standard

`/audit-ui` is the shared UI audit, polish, and hardening standard for
Andrey's projects. Use it for visual/product UI work without turning a narrow
fix into a redesign.

It starts with `/context-scout` from `systems/context-scout-mode.md`, then reads
only the smallest useful UI context.

## 0. Mode selection

Before changing code, classify the task:

- Audit only: inspect and report; no code changes.
- Minimal fix: small CSS, layout, or component changes in the target area.
- Polish pass: small visual improvements after behavior already works.
- Hardening pass: edge cases, states, responsiveness, and accessibility basics.
- Redesign: not allowed unless the user explicitly requests redesign.

Default to Minimal fix when the user asks to fix UI. Default to Audit only when
the user asks to inspect, review, or audit. Never silently escalate to redesign.

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
- forms, validation, buttons, and tap targets;
- loading, empty, error, and success states;
- long text wrapping;
- image aspect ratios;
- overflow and truncation;
- sticky elements and footer behavior;
- keyboard focus and basic accessibility;
- performance regressions and layout shift;
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
tablet: when the UI has tablet-specific layout risk
```

Minimum scenarios:

1. Target page loads and primary content is visible.
2. Mobile layout has no horizontal overflow and no hidden primary actions.
3. One interactive state is checked: hover, focus, open, submit, loading, error,
   or empty.
4. For stateful UI, clean-session default is checked before clicked-state.
5. For legacy persisted UI, old storage keys are checked or explicitly marked
   `needs verification`.

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

UI defects found:
- Taste:
- Structure:
- Polish:
- Hardening:

Changed files:
- ...

Verification:
- Desktop:
- Mobile:
- Tablet:
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
