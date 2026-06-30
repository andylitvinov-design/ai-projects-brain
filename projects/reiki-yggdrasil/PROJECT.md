# reiki-yggdrasil

## 1. Purpose

Reiki Yggdrasil Vite/React platform with public learning UI,
master cabinet, public masters catalog, and admin
moderation.

## 2. Live URLs

- production: https://reiki-yggdrasil.vercel.app
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and any
  secondary live URLs need verification.

## 3. Repositories

- canonical repo:
  https://github.com/andylitvinov-design/reiki-yggdrasil
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond the listed
  inventory need verification.

## 4. Hosting / Deploy

- provider: Vercel
- project name: Vercel, Vite build
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status

Public Vite/Supabase MVP with /, /profile, /masters, and
/profile/admin.

## 6. Important Files

- src/App.jsx
- src/main.jsx
- src/index.css
- src/pages/ProfilePage.jsx
- src/pages/MastersPage.jsx
- src/pages/AdminPage.jsx
- src/lib/supabaseClient.js
- supabase/migrations/20260428_master_cabinet_mvp.sql
- vercel.json

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_ADMIN_EMAIL

## 8. Known Issues

- Supabase credentials and seeded data require live
  verification.
- Vercel GitHub App access can block import/deploy
  visibility.
- Layout changes can accidentally collapse the accepted
  three-column desktop structure.

## 9. Recent Tasks

- Added /profile, /masters, /profile/admin, Supabase
  schema/seed, RU-first i18n-ready structure, and
  route-based app split.

## 10. Next Actions

- Verify Supabase env values and live auth/profile flow
  before claiming end-to-end completion.

## 11. Risks

- Breaking existing home page.
- Breaking RU default interface.
- Breaking route rewrites.
- Breaking Supabase auth/data flows.
- Breaking the three-column layout.

## 12. Rules for Codex

- Preserve the existing home page.
- Keep RU default.
- Prefer additive route/module changes.
- Do not collapse the accepted three-column layout without
  explicit reason.
- For `/improve`, use `systems/improve-mode.md`: keep the sweep read-only,
  focus on route/auth/profile/admin risks, Supabase data-flow gaps, accepted
  UX constraints, missing verification, and admin moderation flow.

## 13. Verification Status

- repo mapping: listed in inventory; current source still
  needs verification before production work
- live mapping: listed in inventory; live behavior needs
  verification before claims
- env status: names only; values and completeness need
  verification
- deploy status: hosting listed; deploy source needs
  verification
- data flow: needs verification
- needs verification: unconfirmed repo, live, deploy, env,
  and data-flow details.
