# Psihotavr

## Purpose

Historical project identity for the mandala/catalog site, article/collection content, Telegram-first orders, admin/content workflows and past AI-video experiments.

## Current identity state — 2026-08-08

Status: `IDENTITY_UNRESOLVED`.

The previously recorded mapping `andylitvinov-design/psihotavr` is no longer safe to treat as canonical:

- current GitHub owner enumeration returned 30 accessible repositories and did **not** include `psihotavr`;
- direct repository lookup for `andylitvinov-design/psihotavr` returned `404 Not Found`;
- the current connected Vercel team inventory did not expose a `psihotavr` project;
- `https://psihotavr.vercel.app` remains a historical URL in memory, but current source/deployment ownership was not proven in this reconciliation.

Do not infer that the product was deleted, moved, or retired. The correct durable conclusion is `NEEDS_VERIFICATION` for canonical repository and live/provider mapping.

## Historical mapping — reference only

- historical repository: `andylitvinov-design/psihotavr`
- historical canonical branch: `main`
- historical production URL: https://psihotavr.vercel.app
- historical stack: Vite/React with mandala catalog/admin/cart and AI-video experiments

These facts are useful for identification and salvage, but they are not current code-routing authority until reverified.

## Historical verification risks

- Some historical work was merged into non-production branches, so `merged=true` was never sufficient by itself.
- Default-state/localStorage regressions affected the `/mandalas` grid; clean-session and legacy-storage checks are still relevant if the project is recovered.
- Auth/storage/order/provider experiments must remain blocked until the current backend and source are proven.
- Telegram-first order behavior should not be replaced by an inferred backend flow.

## Historical important-file map

Use only after the canonical repository is re-established:

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

## Environment variable names — historical only

Never store values. Names previously associated with the project included `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAILS`, Firebase identifiers, `ADMIN_TOKEN`, and AI-video provider keys. Do not assume any of them are still current.

## Reverification gate

Before any code, deployment or business-KPI action:

1. Prove the current canonical repository or replacement source.
2. Prove canonical production branch.
3. Prove provider project/domain ownership and latest production source commit.
4. Confirm whether the historical URL is current, redirected, retired or replaced.
5. Re-read repo-local instructions and current file structure; do not apply the historical file map blindly.
6. Verify clean-session/default state and mobile behavior before claiming production recovery.

## Do not

- create or edit an unrelated repository merely to satisfy the historical identity;
- treat the 404 as proof of deletion/retirement;
- claim current live state from the remembered domain alone;
- credit Psihotavr toward current business/source coverage until identity and collector evidence are restored;
- expose old provider secrets or copy historical auth assumptions into a new source.

## Next durable action

Resolve the canonical source identity first. Once a repository/provider mapping is proven, update this capsule and the ten-project overlay together in one reconciliation.
