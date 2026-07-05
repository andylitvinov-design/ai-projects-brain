# ezohata

## Purpose
Clean-room EzoHata Vite/React + TypeScript storefront foundation for mandala catalog, cart/favorites, customer cabinet, admin shell, and future provider integrations.

## Canonical repo
- Repo: `andylitvinov-design/ezohata`
- Production branch: `main` unless repository/deploy metadata proves otherwise.
- Live URL: needs verification.
- Hosting: needs verification, likely future Vercel or equivalent.

## Current status
- New private repository detected during Codex Delivery Loop.
- PR #1 `Phase 1 clean-room Ezohata foundation` exists as the first clean-room foundation PR.
- Treat this as a separate project from `psihotavr` and from finance `ezohata-incoming-ledger`.
- Do not copy old Psihotavr code wholesale into this repo.

## Important files
- `package.json`
- `vite.config.*`
- `src/main.*`
- `src/App.*`
- `src/pages/*`
- `src/lib/*`
- `src/styles/*`
- `supabase/*` if present
- `vercel.json` if present

## Env variable names only
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SALEBOT_API_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- exact production env names need verification

## Known issues / needs verification
- Live URL and hosting source are not yet verified.
- Provider endpoints for Supabase, SaleBot, PayPal, private image buckets, and admin persistence are deferred unless proven in repo.
- PR #1 is draft / foundation work and should not be treated as production-ready without checks.
- GitHub workflow coverage for PR #1 needs verification.

## Rules for Codex
- Read this file before touching `andylitvinov-design/ezohata`.
- Do not confuse this project with `psihotavr` or `ezohata-incoming-ledger` finance.
- Do not expose, request, or commit secrets; use env names only.
- Prefer minimal safe fixes and branch -> PR workflow.
- Before merge readiness claim, run or verify: `npm run typecheck`, `npm run lint`, `npm run build`.
- If adding Supabase, payment, SaleBot, auth, or persistence behavior, require provider/live proof before calling it complete.

## Next actions
1. Confirm live hosting and deployment source.
2. Review PR #1 for clean-room boundaries and deferred provider gates.
3. Add/update `projects.md` and `projects.json` project index entries if this PR only lands the project passport first.
4. Add `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, and `CODEX_BRIEF.md` as implementation details become stable.
