# /audit-ui design markers

Version: 1.2  
Last reviewed: 2026-07-20  
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
| Responsive composition and reflow | 390px mobile, desktop, tablet when layout changes, and a 320 CSS px equivalent / zoomed viewport | Non-exempt content reflows without two-dimensional page scrolling, clipped text, hidden primary actions, or a source-order mismatch; text enlargement remains usable. |
| States and feedback | Default, hover/focus, selected, loading, empty, error, success | States are distinct, recoverable, and the clean-session default is verified before clicked state. |
| Accessibility and input | Contrast, focus visibility/obscuration, target size/spacing, keyboard, motion | Focused components remain visible above sticky or overlay layers; pointer targets are at least 24 by 24 CSS px or satisfy a documented spacing/equivalent/inline exception; controls retain contrast and do not depend on hover, drag, or motion alone. |
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
- **Controlled translucency and material depth** — use glass, blur, or
  transparent surfaces only for clear layer/navigation hierarchy. Test the
  worst-case underlying image or color: text and controls retain contrast,
  key media keeps its intended saturation, and an opaque/reduced-transparency
  presentation remains usable. Do not wash a whole content area or product
  image in a pale overlay merely to imitate a platform style.
- **Purposeful motion** — use only to explain state or continuity, must respect
  `prefers-reduced-motion`, and must not delay the main task.

## Research baseline

The durable constraints are WCAG 2.2 and Web Vitals guidance, not trend
articles: [WCAG 2.2](https://www.w3.org/TR/WCAG22/),
[W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html),
[W3C Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[W3C Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html),
[W3C Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
[accessible responsive design](https://web.dev/articles/accessible-responsive-design),
and [Web Vitals](https://web.dev/articles/vitals).

Current design signals are reviewed as optional evidence. The 2026 baseline now
includes [Figma's web-design trends](https://www.figma.com/resource-library/web-design-trends/),
[Adobe's 2026 design trends](https://www.adobe.com/express/learn/blog/design-trends-2026),
and Apple's [Materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials)
and [Liquid Glass accessibility behavior](https://developer.apple.com/videos/play/wwdc2025/219/).

## Change log

| Date | Change | Reason |
|---|---|---|
| 2026-07-20 | v1.2: made focus obscuration and target-size/spacing checks explicit in the accessibility marker. | W3C WCAG 2.2 provides observable AA checks for sticky/overlay layers and 24 by 24 CSS px targets or documented exceptions; current Figma/Apple material signals add no safer replacement for existing trend candidates. |
| 2026-07-16 | v1.1: strengthened responsive composition with 320 CSS px reflow/zoom proof; replaced vague texture candidate with testable controlled translucency/material depth. | W3C and web.dev establish reflow/source-order requirements; Apple, Figma, and Adobe show material/translucency and expressive visual systems are current signals, while contrast and opaque fallbacks remain safety gates. |
| 2026-07-12 | Created v1.0 core scorecard and three trend candidates. | Separates durable UX quality from fashion-driven suggestions. |
