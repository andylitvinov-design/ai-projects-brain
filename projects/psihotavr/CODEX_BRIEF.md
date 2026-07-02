# Codex Brief - psihotavr

## Project Identity

- repo: https://github.com/andylitvinov-design/psihotavr
- live URL: https://psihotavr.vercel.app
- hosting: Vercel project `psihotavr`
- Vercel project id: `prj_s0Ki9R2dHqVaFEjSM6Zzcms6fJ7M`
- target branch: `main`
- production source: confirmed 2026-07-02 via Vercel deployment metadata:
  `andylitvinov-design/psihotavr`, branch `main`, commit
  `415a2ab636a6123066c1d5b2270e83126d6dbe18`, source `git`, target
  `production`, state `READY`
- purpose: Vite/React mandala catalog, admin/content tools, cart/Telegram order
  flow, AI-video hub, and future cabinet/admin account features

## Before Starting

Read project memory first:

- `PROJECT.md`
- `SYSTEM_MAP.md`
- `DATA_SCHEMA.md`
- `RISKS.md`
- `CODE_ACCESS.md`
- `DATA_SAMPLES.md`
- `DEBUG_LOG.md`
- this `CODEX_BRIEF.md`

Then inspect the repo itself:

- `AGENTS.md` if present
- `CLAUDE.md` if present
- `package.json`
- `vercel.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/lib/mandalaServices.ts`
- `src/pages/MandalaCatalogPage.tsx`
- `src/pages/CartPage.tsx`
- `src/pages/AdminMandalasPage.tsx`
- `src/pages/AdminVideoFormPage.tsx`
- AI-video API/provider files when relevant

## Protected Flows

Do not break:

- public catalog and service cards;
- mandala/service image mappings;
- admin mandala search/edit/upload/delete/show-hide flow;
- cart and Telegram order request flow;
- PayPal/payment UI handoff;
- AI-video hub/admin generation;
- mobile layout and default state;
- live route rewrites and Vercel deployment.

## Env Names Only

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

Never print or store env values.

## Rules

- Minimal safe fix.
- Study current code first.
- Do not rewrite architecture for narrow bugs.
- Treat `main` as canonical production branch.
- Re-check Vercel deployment metadata before every production claim, because a
  newer deployment may supersede the confirmed commit.
- Do not carry old branches wholesale; salvage only safe current hunks.
- Mark unknowns as `needs verification`.
- For product-code/risky changes found during `/upgrade`, create a `/delivery`,
  `/audit-fin`, `/audit-ui`, or `/safe` handoff instead of editing directly.

## Task-Type Checks

For catalog/admin bugs:

- verify service/article/collection classification;
- verify selected file, upload action, save action, persistence, and refreshed
  visible card;
- verify sorting of updated/new/photo-backed services when in scope.

For UI bugs:

- verify desktop and mobile;
- verify clean session;
- verify legacy localStorage/sessionStorage;
- verify clicked-state only after default state is proven.

For auth/cart/payment/backend work:

- verify provider/backend setup before editing;
- do not merge auth/orders migrations without provider, migration, RLS, admin,
  user, and live gates.

## Verification Commands

Use repo-local commands from `package.json`. Expected checks may include:

- `npm install` or `npm ci` if needed;
- `npm run typecheck` if present;
- `npm run build`;
- project verification scripts such as mandala/catalog checks when present;
- browser/live verification for production-facing UI.

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
