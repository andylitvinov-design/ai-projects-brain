# /audit-ui design markers

Version: 1.0  
Last reviewed: 2026-07-12  
Owner: `/audit-ui` shared standard

## Purpose

This is the compact scorecard for a professional design-consultant,
design-analyst, and design-editor pass. It is a judgment framework, not a
template generator. The project brief and user goal always outrank a generic
trend.

Use it with `systems/audit-ui.md`. Score only what is visible or reproducible;
otherwise use `NOT_TESTED`, not a guess.

## Reading order and severity

1. Identify the user moment, commercial/content goal, brand lane, and one
   primary action.
2. Record evidence from the supplied URL, screenshot, or target viewport before
   proposing a solution.
3. Mark each relevant item as `PASS`, `WATCH`, `FAIL`, or `NOT_TESTED`.
4. Prioritize `P0` (blocks task, accessibility, trust, or mobile use), then
   `P1` (meaningful clarity/conversion/brand loss), then `P2` polish.

Do not invent a numeric total when the evidence is incomplete. A compact
scoreboard plus the three highest-impact defects is more useful.

## Core markers

| Marker | What to inspect | Pass condition |
|---|---|---|
| Intent and audience | User moment, page job, primary action | The visual emphasis supports one clear next action and the intended audience. |
| Hierarchy | First screen, scan path, heading/CTA priority | A user can name the page purpose and primary action within a quick scan. |
| Composition and rhythm | Grouping, alignment, whitespace, section cadence | Sections have a deliberate structure; spacing is consistent and gives important content room. |
| Typography and editorial clarity | Scale, line length, wrapping, contrast, labels | Type carries the content hierarchy; no accidental wraps, cramped controls, or decorative overload. |
| Brand specificity | Tone, image language, color, material, copy | The screen feels native to the product, not a generic SaaS or AI-generated template. |
| Surface discipline | Cards, borders, shadows, radii, effects | Surfaces show hierarchy rather than card-inside-card, arbitrary glow, or competing decoration. |
| Image and media direction | Crop, aspect ratio, loading state, relation to copy | Media is purposeful, consistently framed, and does not obscure text or distort the promise. |
| Primary journey and CTA | Navigation, CTA placement, form/cart/checkout path | The main action is visible, understandable, reachable, and does not compete with equal-weight actions. |
| Responsive composition | 390px, desktop, tablet when layout changes | No horizontal overflow, clipped text, hidden primary action, or desktop-only decision. |
| States and feedback | Default, hover/focus, selected, loading, empty, error, success | States are distinct, recoverable, and the clean-session default is verified before clicked state. |
| Accessibility and input | Contrast, focus, target size, keyboard, motion | Controls retain visible focus and usable contrast; interaction does not depend on hover, drag, or motion alone. |
| Performance and stability | Image/font reservation, layout shift, interaction cost | The visual solution avoids avoidable CLS, heavy decorative JS, and delayed primary interaction. |
| Trust and content integrity | Price, status, permissions, source-backed content | Critical labels/data are legible, current-looking, and not visually disguised or misleading. |

## Anti-pattern flags

Escalate as a defect unless the project brief explicitly asks for it:

- generic purple/blue gradient, bokeh, glow, or blob used as a substitute for
  brand direction;
- stacked cards, excessive pills, borders, and shadows that hide hierarchy;
- decorative icon tiles or emoji that add no meaning;
- motion that delays reading, interaction, or recovery;
- trend styling that reduces contrast, responsive readability, focus visibility,
  input usability, or loading stability;
- recommendation based only on a screenshot when state/data behavior is the
  actual risk.

## Trend intake gate

Trends are optional hypotheses, never mandatory markers. Add or promote one
only when all gates pass:

1. Evidence: at least two credible current sources, including one primary,
   standards, platform, or established design source where available.
2. Fit: a concrete benefit for this product, audience, and page goal.
3. Safety: no regression to accessibility, responsive layout, performance, or
   content clarity.
4. Testability: an observable pass/fail condition and a small implementation
   path without a new dependency unless already justified.
5. Novelty: it is not already covered by a core marker or an existing project
   token/component.

Trend candidates expire after 90 days unless renewed with evidence. Never
change a core marker solely because a trend report says it is fashionable.

### Current candidates

- **Expressive editorial typography** — use only when it strengthens the
  page's story and keeps mobile wrapping, contrast, and readability intact.
- **Intentional texture/materiality** — use as a restrained brand cue, not
  decorative noise or an excuse for low contrast.
- **Purposeful motion** — use only to explain state or continuity, must respect
  `prefers-reduced-motion`, and must not delay the main task.

## Research baseline

The durable constraints are WCAG 2.2 and Web Vitals guidance, not trend
articles: [WCAG 2.2](https://www.w3.org/TR/WCAG22/),
[W3C quick reference](https://www.w3.org/WAI/WCAG22/quickref/), and
[Web Vitals](https://web.dev/articles/vitals). The initial editorial signal was
reviewed against [Figma's 2026 web-design trends](https://www.figma.com/resource-library/web-design-trends/).

## Change log

| Date | Change | Reason |
|---|---|---|
| 2026-07-12 | Created v1.0 core scorecard and three trend candidates. | Separates durable UX quality from fashion-driven suggestions. |
