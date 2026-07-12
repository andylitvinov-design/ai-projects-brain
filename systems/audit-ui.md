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
```
