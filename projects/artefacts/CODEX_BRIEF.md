# Codex Brief - artefacts

## Project Identity

- repo: https://github.com/andylitvinov-design/artefacts
- live URL: needs verification
- hosting: needs verification
- target branch: needs verification
- production source: needs verification
- purpose: Artefacts marketplace MVP

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

Then inspect the Artefacts repo itself:

- AGENTS.md if present
- README.md
- STATE.md or project-state.md if present
- LOG.md if present
- package.json or equivalent package/deploy config
- deploy config: Vercel, Cloudflare, Netlify, Docker, or other if present
- src/app/pages/components or framework-specific route folders

## Rules

- Minimal safe fix.
- Study repo-local code/docs first.
- Do not rewrite everything.
- Do not publish secrets.
- Store env variable names only, never values.
- Mark unknowns as `needs verification`.
- Distinguish production, preview, local, archived, and deprecated targets.
- Do not apply patterns from `ezohata`, `codex-links`, or `reiki-yggdrasil` without confirming they fit this repo.
- Do not claim live behavior, hosting, env completeness, or data flow until directly verified.

## First Inventory Checklist

Before implementation work, verify and record:

- actual framework: needs verification
- package manager: needs verification
- build command: needs verification
- dev command: needs verification
- test/lint commands: needs verification
- live URL: needs verification
- hosting provider/project: needs verification
- deploy source and branch: needs verification
- pages/routes: needs verification
- artefact data source: needs verification
- auth/admin model: needs verification
- env variable names: needs verification
- design/mockup source: needs verification
- MVP scope already implemented: needs verification
- known broken flows: needs verification

## Task-Type Checks

For bug tasks:

- Find concrete code first: file, component/function, line or pattern.
- Avoid generic hypotheses until the relevant code is located.

For design/UX tasks:

- Compare current UI, layout, spacing, typography, colors, cards, buttons, forms, navigation, mobile, and desktop behavior.
- Identify whether a design/mockup exists before changing visuals.

For marketplace MVP tasks:

- Verify product/artifact model before changing UI.
- Verify source of artefact data before adding filters, checkout, catalog, or admin flows.
- Keep scope minimal and avoid introducing unconfirmed ecommerce/payment assumptions.

## Verification Commands

Run only commands confirmed by repo-local docs/package config. If not found, report `needs verification`.

Suggested checks once commands are confirmed:

- install/check package manager command
- lint if available
- test if available
- build if available
- preview or local smoke test if available

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
