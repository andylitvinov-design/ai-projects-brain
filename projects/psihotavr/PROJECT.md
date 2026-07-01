# psihotavr

## 1. Purpose

Psihotavr Vite/React site for mandala catalog sales, AI-video hub,
admin/content tools, Telegram-first order flow, and future customer
cabinet/admin account features.

## 2. Live URLs

- production: https://psihotavr.vercel.app
- preview: needs verification
- admin: https://psihotavr.vercel.app/admin/mandalas
- needs verification: preview deployment mappings and any secondary live URLs.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/psihotavr
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: old Claude/Codex branches can contain useful hunks but are
  not canonical production unless merged into `main`.

## 4. Hosting / Deploy

- provider: Vercel
- project name: psihotavr
- deploy source: needs verification before every production claim
- branch: main unless repo/deploy metadata proves otherwise
- deploy rules: verify live deployment source after merges and before claiming
  production is fixed.

## 5. Current Status

Active public Vite/React catalog/admin/cart site. The current no-cost backend
path should prefer Telegram order submission and repo/GitHub-backed content
workflows. Google/Supabase cabinet and cart/orders RLS replacement PRs exist but
must remain blocked until backend, auth, migration, and live RLS gates are
verified.

## 6. Important Files

- package.json
- vercel.json
- src/App.tsx
- src/main.tsx
- src/lib/mandalaServices.ts
- src/pages/MandalaCatalogPage.tsx
- src/pages/CartPage.tsx
- src/pages/AdminMandalasPage.tsx
- src/pages/AdminVideoFormPage.tsx
- src/lib/aiVideoGeneration.ts
- src/server/videoProviders/videoProviderService.ts
- api/ai-videos/generate.ts
- api/ai-videos/status.ts

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_ADMIN_EMAILS
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- GITHUB_TOKEN
- ADMIN_TOKEN
- HEYGEN_API_KEY
- SYNTHESIA_API_KEY
- D_ID_API_KEY

## 8. Known Issues

- Supabase free active project limit blocks a dedicated Psihotavr Supabase
  backend for now.
- Google/Firebase/Supabase auth experiments can confuse agents; verify the
  selected backend before editing auth code.
- Mandala catalog/card/admin work has had live/default-state regressions.
- Some historical PRs were merged into non-main branches and did not reach
  production.
- LocalStorage-only admin content is not persistent across devices.
- Vercel Git auto-deploy/source can drift and needs live verification.

## 9. Recent Tasks

- Restored `/mandalas` grid behavior and checked 2/4-column UI paths.
- Added AI-video homepage hub and admin video generation boundaries.
- Normalized legacy relative mandala image URLs.
- Added/synced mini-mandala services and photos from catalog data.
- Created replacement Google auth/cabinet and cart/orders PRs, but left them
  blocked on backend/live verification gates.

## 10. Next Actions

- Keep Psihotavr as a first-class active project in daily sweeps.
- Verify Vercel deployment source and browser behavior before claiming live
  fixes.
- Prefer the no-Supabase Telegram order flow until a backend is available.
- Keep auth/orders PRs blocked unless provider, migration, RLS, admin, and user
  live gates are proven.
- Preserve Excel-derived mandala services and article/catalog separation.

## 11. Risks

- Breaking the live catalog, admin, cart, or AI-video hub.
- Losing Excel-derived mandala services or image mappings.
- Merging wrong-base PRs that never reach `main`.
- Default-state/localStorage regressions in `/mandalas`.
- Leaking API/provider secrets.
- Mixing Firebase and Supabase auth assumptions.
- Claiming production completion without browser/live proof.

## 12. Rules for Codex

- Treat `main` as canonical production branch unless repo/deploy metadata proves
  otherwise.
- Do not carry old Claude/Codex branches wholesale; salvage current hunks only.
- For `/mandalas`, verify clean session, legacy localStorage, and clicked 4-column
  state when layout/default behavior is touched.
- Do not merge auth/orders migrations without proven backend/auth/RLS gates.
- Do not commit secrets, env values, provider credentials, or private URLs.
- Prefer minimal, route-scoped changes and preserve existing live catalog content.

## 13. Verification Status

- repo mapping: verified as https://github.com/andylitvinov-design/psihotavr
- live mapping: production URL known; each deployment source still needs fresh
  verification before production claims
- env status: names only; values/completeness need verification
- deploy status: Vercel project known; source commit/branch must be checked per run
- data flow: Telegram/no-backend flow preferred; Supabase/Firebase flows blocked
  until explicit live gates pass
- needs verification: preview URLs, authenticated admin/cabinet behavior, and any
  backend data persistence path.