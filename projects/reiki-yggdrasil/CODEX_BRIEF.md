# Codex Brief - reiki-yggdrasil

## Project Identity

- repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- live URL: https://reiki-yggdrasil.vercel.app
- hosting: Vercel, Vite build
- target branch: needs verification
- production source: listed in inventory; deploy source still needs verification before production claims
- purpose: Reiki Yggdrasil Vite/React platform with public learning UI, master cabinet, public masters catalog, and admin moderation

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

Then inspect the Reiki repo itself:

- AGENTS.md if present
- README.md
- STATE.md or project-state.md if present
- LOG.md if present
- package.json
- vercel.json
- supabase/migrations/20260428_master_cabinet_mvp.sql
- src/App.jsx
- src/main.jsx
- src/index.css
- src/pages/ProfilePage.jsx
- src/pages/MastersPage.jsx
- src/pages/AdminPage.jsx
- src/lib/supabaseClient.js

## Protected Routes And UX

Do not break:

- `/`
- `/profile`
- `/masters`
- `/profile/admin`
- existing home page
- RU-default interface
- Vercel route rewrites
- Supabase auth/data flows
- accepted desktop three-column layout
- designer-approved structure, spacing, cards, buttons, forms, and navigation unless explicitly changed by the task

## Env Names Only

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_ADMIN_EMAIL

Never print or store env values.

## Rules

- Minimal safe fix.
- Study code first.
- Do not rewrite everything.
- Prefer additive route/module changes.
- Do not publish secrets.
- Mark unknowns as `needs verification`.
- Distinguish production, preview, and local behavior.
- Do not claim end-to-end auth/profile/admin completion unless live Supabase behavior was verified.
- Do not collapse the accepted three-column desktop layout without explicit reason.

## Task-Type Checks

For bug tasks:

- Find concrete code first: file, component/function, line or pattern.
- Check whether the issue is route, CSS/layout, Supabase client, migration, or Vercel rewrite related.

For design/UX tasks:

- Compare current UI, layout, spacing, typography, colors, cards, buttons, forms, navigation, mobile, and desktop behavior.
- Always check desktop three-column layout and mobile responsiveness.
- Preserve RU-first copy unless the task explicitly changes language.

For quality/site audits:

- Check `/`, `/profile`, `/masters`, `/profile/admin`.
- Check primary learner, master profile, masters catalog, and admin moderation flows where possible.
- Check production vs preview before claiming live status.

## Verification Commands

Use repo-local commands from package.json. Expected checks may include:

- npm install or npm ci if needed
- npm run build
- npm run lint if available
- npm test if available
- local route smoke test if available
- live route check only when relevant and possible

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
