# Codex Brief - <project-name>

## Project Identity

- repo: needs verification
- live URL: needs verification
- hosting: needs verification
- target branch: needs verification
- production source: needs verification

## Before Starting

Read project memory first:

- PROJECT.md
- SYSTEM_MAP.md
- DATA_SCHEMA.md
- RISKS.md
- CODE_ACCESS.md if present
- DATA_SAMPLES.md if present
- DEBUG_LOG.md if present
- this CODEX_BRIEF.md

Then read repo-local context in the target repo:

- AGENTS.md if present
- README.md
- STATE.md or project-state.md if present
- LOG.md if present
- package/deploy config
- relevant src/app/pages/components files

## Rules

- Minimal safe fix.
- Study code first.
- Do not rewrite everything.
- Do not publish secrets.
- Store env variable names only, never values.
- Mark unknowns as `needs verification`.
- Distinguish production, preview, local, archived, and deprecated targets.
- Preserve accepted routes, UX, data flows, APIs, and deployment targets unless explicitly asked.
- Run the narrowest meaningful checks.
- Report changed files, checks, risks, and what was not verified.

## Task-Type Checks

For bug tasks:

- Find concrete code first: file, component/function, line or pattern.
- Avoid generic hypotheses until the relevant code is located.

For design/UX tasks:

- Compare current UI, layout, spacing, typography, colors, cards, buttons, forms, navigation, mobile, and desktop behavior.
- Preserve accepted layouts unless the task explicitly changes them.

For quality/site audits:

- Check primary user scenarios, routes, forms, console/runtime errors when possible, responsiveness, texts/CTA, production vs preview, and auth/data flows where relevant.

## Project-Specific Rules

- needs verification

## Verification Commands

- npm test if available
- npm run build if available
- npm run lint if available
- project-specific guard scripts if listed
- docs/schema validation scripts if this is a memory-only change

## Standard Response Required From Codex

1. Studied files
2. What was found
3. What changed
4. Changed files
5. Verification commands and results
6. Preview/live links, if checked
7. Risks
8. What remains `needs verification`
9. Suggested STATE.md/LOG.md or project memory updates
