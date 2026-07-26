# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Needs Attention, Trends, and the Apple/PWA mobile client.

## 2. Live URLs

- canonical web production: https://brain-management.vercel.app
- canonical Apple/PWA production: https://brain-management-mobile.vercel.app
- web Needs Attention: https://brain-management.vercel.app/needs-attention
- mobile Finance hub: https://brain-management-mobile.vercel.app/#/finance
- legacy Netlify/Cloudflare URLs: historical only; do not use for current production verification unless a rollback explicitly targets them.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/brain-management
- durable memory: `andylitvinov-design/ai-projects-brain`
- Finance source of truth: `andylitvinov-design/ezohata-finance`

`ai-projects-brain` is durable project/governance memory, not the runtime dashboard. `ezohata-finance` owns financial formulas, balances, reconciliation, auth, and private finance data; Brain Management mobile only provides a safe hub and read-only status proxy.

## 4. Hosting / Deploy

- provider: Vercel
- web project: `brain-management`
- mobile project: `brain-management-mobile`
- production team: `super10`
- mobile deployment can be direct-file/API deployed and therefore requires explicit source-to-deploy evidence; a READY deployment alone is not source proof.
- canonical web APIs include `/api/data` and `/api/needs-attention`.
- mobile APIs proxy canonical web data and EzoHata Finance public status without copying protected finance data.

## 5. Current Status

Web and mobile production are live on Vercel. The Apple/PWA client has dedicated Overview, Tasks, Needs Attention, Finance, Trends, Projects, and Metrics sections. Finance links must mirror `ezohata-finance/src/lib/product/routes.ts`; guessed routes are forbidden.

## 6. Important Files

- `index.html`
- `app.js`
- `styles.css`
- `attention.js`
- `finance.js`
- `manifest.webmanifest`
- `sw.js`
- `api/data.js`
- `api/needs-attention.js`
- `api/finance-status.js`
- `tests/needs-attention.test.mjs`
- `tests/mobile-finance.test.mjs`

## 7. Environment Variable Names

Only names may be stored. Values must never be copied to memory or dashboard output.

- `MOBILE_LAUNCH_KEY`
- `STATUS_CALLBACK_SECRET`
- `MOBILE_RUNS`
- `GH_REPO_OWNER`
- `GH_REPO_NAME`
- `GH_WORKFLOW_FILE`
- `GH_WORKFLOW_REF`
- `GH_WORKFLOW_PAT`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_AUTH_SESSION_SECRET`
- `GOOGLE_AUTH_ALLOWED_EMAILS`
- `GOOGLE_AUTH_ALLOWED_DOMAIN`

## 8. Known Issues

- Direct mobile deployments may drift from repository `main`; verify deployed static assets and route contracts after every release.
- Brain Management API currently has no dedicated write endpoint for Evening Delivery Closure receipts; Daily Dashboard Update remains the publication owner.
- The durable registry previously pointed to Netlify/Cloudflare and required this correction.
- Mobile Finance must not duplicate balances or private transactions. It may expose public provider/status metadata and authenticated links only.

## 9. Recent Durable Changes

- 2026-07-25: Vercel web/mobile mapping verified and made canonical.
- 2026-07-25: Needs Attention and Trends published in the management surfaces.
- 2026-07-25: Finance hub added to Apple/PWA.
- 2026-07-25: evening verification found guessed Finance paths and recovered them by synchronizing all 14 canonical `PRODUCT_ROUTES`; production deployment verified after the repair.

## 10. Next Actions

- Add a supported operational closure-write path so Evening Delivery Closure can persist terminal evidence without editing metric formulas.
- Keep mobile route-contract regression tests aligned with `ezohata-finance`.
- Prefer repo-backed deployment or persist exact direct-deploy bundle provenance.

## 11. Risks

- Reporting READY/merge as LIVE_VERIFIED without checking production behavior.
- Mobile direct-deploy drift from GitHub source.
- Duplicating financial calculations or exposing protected finance data.
- Using legacy Netlify/Cloudflare URLs for current verification.
- Mixing daily operational telemetry into durable memory.

## 12. Rules for Codex

- Read `systems/management-control-plane-contract.md` and `systems/live-upgrade-delivery-contract.md` first.
- Treat `brain-management.vercel.app` and `brain-management-mobile.vercel.app` as the current live surfaces.
- Verify web/mobile API responses and actual delivered assets, not only deployment state.
- For Finance navigation, read `ezohata-finance/src/lib/product/routes.ts`; never invent route names.
- Do not copy protected balances, transactions, session cookies, or secret values into Brain Management.
- Preserve one implementation owner and persist unresolved carryover precisely.

## 13. Verification Status

- canonical repo: confirmed
- web production: confirmed, Vercel
- mobile production: confirmed, Vercel
- mobile Finance status proxy: confirmed HTTP 200
- mobile canonical Finance route list: confirmed in production after recovery
- runtime errors after recovery: none observed
- exact finance balances: protected by owner session and intentionally not duplicated
- operational closure receipt ingestion: needs supported Brain Management write path
