# Psihotavr

## Purpose

Public Vite/React site for mandala catalog sales, article and collection content, Telegram-first orders, admin/content workflows, and AI-video experiments.

## Canonical mapping

- repository: `andylitvinov-design/psihotavr`
- canonical branch: `main`
- production URL: https://psihotavr.vercel.app
- hosting: Vercel project mapping requires current deploy verification before a live claim

## Current state

Psihotavr remains an active public project. Historical work was sometimes merged into non-production branches, so `merged=true` alone is insufficient. For production-facing changes, confirm that the relevant commit reached `main`, identify the current Vercel deployment source, and verify the default user state in a clean browser session.

The preferred order path remains Telegram-first unless a backend-backed order flow has current provider, persistence, policy, and live evidence. Supabase/Firebase/auth/payment experiments must remain blocked until those gates are proven.

## Important files

- `package.json`
- `vercel.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/lib/mandalaServices.ts`
- `src/pages/MandalaCatalogPage.tsx`
- `src/pages/CartPage.tsx`
- `src/pages/AdminMandalasPage.tsx`
- `src/pages/AdminVideoFormPage.tsx`
- `src/lib/aiVideoGeneration.ts`
- `api/ai-videos/generate.ts`
- `api/ai-videos/status.ts`

## Environment variable names

Names only; values must never be stored here:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAILS`
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `GITHUB_TOKEN`
- `ADMIN_TOKEN`
- `HEYGEN_API_KEY`
- `SYNTHESIA_API_KEY`
- `D_ID_API_KEY`

## Verification gates

1. Fresh `main` and duplicate/wrong-base PR check.
2. Available tests, typecheck, lint, and build.
3. For UI state: clean session, legacy storage, clicked state, desktop, and mobile.
4. For production: deploy ID, branch, source commit, route evidence, and timestamp.
5. For auth, storage, orders, payments, or providers: configuration, persistence/policy, live behavior, and rollback proof.

## Do not

- carry an old feature branch wholesale onto `main`;
- expose secret values or private provider payloads;
- claim LIVE from merge or a READY deployment alone;
- replace the Telegram-first order path without proven backend readiness;
- lose Excel-derived catalog content, image mappings, or the distinction between services, collections, and articles.
