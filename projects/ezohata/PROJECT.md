# ezohata

## 1. Purpose

Clean-room Ezohata storefront/site rebuild for mandalas, collections, articles, cart, favorites, cabinet, admin, and future production integrations.

## 2. Live URLs

- production: https://ezohata.vercel.app
- preview: needs verification
- admin: `/admin` route exists in Phase 1 scope; live behavior needs verification.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/ezohata
- repo visibility: private
- default branch: `main`
- related repos: `andylitvinov-design/psihotavr` is a behavior/reference source only, not a code-copy source.

## 4. Hosting / Deploy

- provider: Vercel
- project name: `ezohata`
- framework: Vite
- branch: `main` unless deploy metadata proves otherwise
- deploy source: needs verification
- production deployment/domain/source proof: needs verification

## 5. Current Status

Active new clean-room Vite + React + TypeScript project. Phase 1 foundation is implemented in repo docs. Live/deploy/provider readiness still needs verification.

## 6. Important Files

- `README.md`
- `package.json`
- `vercel.json`
- `src/app`
- `src/components`
- `src/features`
- `src/lib`
- `src/styles`
- `scripts/check-client-bundle-secrets.mjs`
- `src/app/routes.test.ts`

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`
- `VITE_PAYPAL_CLIENT_ID`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SALEBOT_WEBHOOK_TOKEN`
- `SALEBOT_CRM_URL`
- `SALEBOT_CRM_SECRET`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`

## 8. Known Issues

- Live Vercel production deployment/source/domain needs verification.
- Phase 1 uses mock typed catalog data and localStorage fallbacks.
- Supabase auth/persistence, real admin CRUD, private image storage, SaleBot sync, PayPal capture/webhooks, catalog migration, and production env wiring are deferred.
- Clean-room rule must be preserved: do not copy old Psihotavr UI components, CSS, class structure, or hotfix architecture.

## 9. Recent Tasks

- 2026-07-06: Added to Daily Improve strategic analysis as an active project.
- Project repository and Vercel project discovered: `andylitvinov-design/ezohata` and Vercel project `ezohata`.

## 10. Next Actions

- Verify Vercel production deployment, domain `https://ezohata.vercel.app`, source branch, and commit.
- Inspect repo-local `AGENTS.md`, `STATE.md`, `LOG.md`, and `CODEX_BRIEF.md` when present before delivery.
- Run `npm run typecheck`, `npm run build`, `npm run lint`, `npm run test`, `npm run test:routes`, and `npm run check:client-bundle-secrets` before PR/merge.
- Create Daily Improve and PR Sweep cards for Ezohata with provider/live readiness clearly marked.

## 11. Risks

- Claiming live success without proven Vercel production deployment/domain/source.
- Accidentally copying Psihotavr code instead of rebuilding clean-room.
- Exposing server-only values in Vite client code.
- Treating localStorage/mock fallback as production persistence.
- Breaking route foundations for `/`, `/mandalas`, `/mandalas/:slug`, `/cart`, `/favorites`, `/cabinet`, and `/admin`.

## 12. Rules for Codex

- Use `andylitvinov-design/ezohata` as the canonical repo.
- Treat `main` as canonical production branch unless repo/deploy metadata proves otherwise.
- Preserve clean-room implementation policy.
- Do not copy old Psihotavr React UI components, CSS files, class structure, or hotfix architecture.
- Provider/live readiness is mandatory before SUCCESS for Supabase, SaleBot, PayPal, admin persistence, uploads, auth, storage, or production persistence.
- Use env names only; never print values.

## 13. Verification Status

- repo mapping: verified from GitHub metadata and repo README/package metadata.
- live mapping: URL provided by user; Vercel project `ezohata` exists.
- deploy source branch/commit: needs verification.
- production deployment/domain: needs verification.
- env status: names documented; configuration readiness needs verification.
- data flow: Phase 1 mock/localStorage fallback; real providers deferred.
