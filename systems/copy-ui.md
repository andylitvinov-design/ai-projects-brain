# /copy-ui standard

`/copy-ui` is the shared screenshot/screen-recording to working UI reproduction standard for Andrey's projects.

Use it when the user supplies a visual reference and wants the current repository to reproduce that interface as closely as practical without inventing new product decisions.

`/copy-ui` is implementation-first. `/audit-ui` remains audit/polish-first. Both share the same visual-reference verification loop.

## 0. Scope and defaults

Default behavior:

- work inside the current repository;
- preserve the existing framework, architecture, data semantics, auth, routes, and build/deploy model;
- reuse existing design tokens and shared components when they can reproduce the reference accurately;
- do not create a separate demo project unless the target repository cannot reasonably host the requested screen;
- do not redesign or add UI that is absent from the reference;
- do not introduce a new dependency when existing browser/render tooling is sufficient.

A screenshot is the visual source of truth for visible appearance only. A screen recording may also be used as evidence for interaction sequence, state transitions, and animation. Do not infer backend behavior, persistence, auth, or data contracts from pixels alone.

## 1. Inputs

Accept one or more of:

- screenshot(s);
- screen recording;
- Figma/exported visual reference;
- existing page URL plus a target reference;
- route/component hint.

Record before editing:

```txt
Reference(s):
Target route/component:
Reference viewport/aspect ratio:
Target repository/framework:
Interactive evidence available: yes/no
Unknowns that affect parity:
```

If exact viewport is unknown, infer the closest practical viewport from the image dimensions and report that assumption.

## 2. Context scout

Run `/context-scout` first and read only the smallest useful slice:

- target repo `AGENTS.md`, `PROJECT.md`, `CODEX_BRIEF.md`, `STATE.md`, or `LOG.md` when present;
- target route/page/component;
- shared layout and relevant reusable components;
- theme/design tokens/global CSS;
- asset locations;
- package scripts and existing browser/test tooling.

Do not scan the whole repository unless the target cannot be located.

## 3. Visual Reference Engine

Use this shared loop for `/copy-ui` and reference-aware `/audit-ui`:

1. Analyze the reference.
2. Identify the target route/component and the smallest implementation scope.
3. Implement or adjust the UI.
4. Run the application using repository-native commands.
5. Render the target in a real browser at a matching viewport.
6. Capture a screenshot of the implementation.
7. Compare implementation vs reference.
8. Rank discrepancies by visual impact.
9. Fix the highest-impact discrepancies.
10. Repeat render -> screenshot -> compare -> fix until remaining differences are minor, blocked by missing evidence/assets, or outside the approved scope.

Compare in this order:

1. macro geometry and section placement;
2. dimensions and proportions;
3. spacing/padding/gaps;
4. typography and wrapping;
5. image crop/position/aspect ratio;
6. colors/backgrounds;
7. borders, radii, shadows, separators;
8. alignment and optical offsets;
9. interactive states and animation when evidence exists;
10. small decorative details.

Do not stop after the first approximate implementation when browser verification is available.

## 4. screenshot-to-code adapter

`abi/screenshot-to-code` may be used as an optional visual reverse-engineering helper, especially for an initial structural draft or screen-recording interpretation.

Rules:

- treat generated code as evidence/draft, not as architecture authority;
- adapt output to the current repository instead of replacing the repository's stack;
- preserve existing component boundaries and design tokens where useful;
- never require the external tool when native image analysis plus browser verification is enough;
- do not add API keys, paid providers, environment variables, or a new runtime service without explicit approval;
- if the repo already includes compatible screenshot-to-code tooling, reuse it;
- if it is not installed, the agent may consult the public repository/approach, but should avoid adding it as a production dependency unless it materially improves the task and the dependency change is approved.

## 5. Implementation rules

Reproduce visible details as faithfully as practical:

- layout/grid/flex structure;
- proportions and element sizing;
- spacing;
- typography hierarchy, weight, line-height, and wrapping;
- color and background treatment;
- image placement/crop;
- borders/radii/shadows;
- buttons, inputs, navigation, cards, lists, tables, and overlays;
- responsive behavior that can be evidenced or safely inferred.

Extract repeating UI into reusable components when repetition is real. Do not over-componentize one-off decorative fragments just to satisfy an abstraction preference.

If the reference uses unavailable proprietary fonts/assets, use the closest legal/existing project asset and report the remaining difference rather than fabricating or scraping restricted files.

## 6. Interaction and screen-recording mode

When a screen recording is supplied, reproduce only interactions demonstrated or otherwise required by the product:

- hover/focus/pressed/open states;
- menus/modals/drawers;
- navigation sequence;
- transitions;
- loading/result/error state changes;
- motion timing and direction where observable.

Prefer CSS/native framework motion already present in the repo. Respect `prefers-reduced-motion`. Do not add an animation dependency for cosmetic parity alone.

## 7. Responsive verification

Primary parity is checked at the reference viewport.

Then ensure the implementation does not regress the repository's supported layouts. At minimum when relevant:

```txt
reference viewport: exact/closest inferred size
desktop sanity: about 1365x900
mobile sanity: about 390x844 or 390x900
```

Do not force desktop screenshot geometry onto mobile. Preserve intent and hierarchy using the project's responsive conventions.

## 8. Completion gate

`STATUS: SUCCESS` requires, when technically available:

- target route renders successfully;
- implementation screenshot captured at matching viewport;
- at least one explicit reference comparison after the initial implementation;
- significant visual differences corrected or documented;
- no new fatal console/runtime errors;
- critical assets load;
- existing build/type/lint/test checks relevant to touched files pass, or failures are reported accurately;
- unrelated routes/components were not intentionally changed.

If browser/render tooling cannot run, use `PARTIAL` and state exactly what remains unverified.

## 9. Relationship to /audit-ui

Use `/copy-ui` when the requested outcome is reproduction of a supplied reference.

Use `/audit-ui` when the requested outcome is critique, hardening, polish, or defect discovery.

When `/audit-ui` receives a reference screenshot, it must invoke the Visual Reference Engine in comparison mode. Audit-only mode reports mismatches; fix/polish mode may correct them within its normal minimal-safe-fix boundary.

`/audit-ui` must not silently become a full `/copy-ui` rebuild. If achieving parity requires reconstructing substantial portions of the target screen, route that work to `/copy-ui`.

## 10. Final report

Every `/copy-ui` run ends with:

```txt
STATUS: SUCCESS / PARTIAL / BLOCKED

Context read:
- ...

Reference:
- screenshot / recording / URL
- viewport

Target:
- repository
- route/page/component

Changed files:
- ...

Visual comparison:
- major mismatches corrected
- remaining differences
- blocked differences and why

Interaction parity:
- verified / not supplied / not tested

Verification:
- reference viewport screenshot
- desktop/mobile sanity where relevant
- console/runtime
- build/lint/type/test commands

Architecture impact:
- reused components/tokens
- dependencies added: none / list + reason

STATE/LOG update:
- updated / not present / skipped with reason
```
