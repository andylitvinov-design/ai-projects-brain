# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Needs Attention, Trends, and the installable Apple/Android PWA.

## 2. Live URLs

- canonical production and installable PWA: https://brain-management.vercel.app
- web Needs Attention: https://brain-management.vercel.app/#/attention
- Finance hub: https://brain-management.vercel.app/#/wallet
- legacy separate mobile, Netlify, and Cloudflare URLs: historical only; do not use for current production verification or new publication work.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/brain-management
- durable memory: `andylitvinov-design/ai-projects-brain`
- Finance source of truth: `andylitvinov-design/ezohata-finance`

`ai-projects-brain` is durable project/governance memory, not the runtime dashboard. `ezohata-finance` owns financial formulas, balances, reconciliation, auth, and private finance data; Brain Management provides safe navigation and read-only public status only.

## 4. Hosting / Deploy

- provider: Vercel
- canonical Vercel project: `brain-management`
- production team: `super10`
- canonical source branch: `andylitvinov-design/brain-management/main`
- web, API, and installable Apple/Android PWA are one deployment surface at `brain-management.vercel.app`.
- do not require or create a separate `brain-management-mobile-production` environment or separate mobile Vercel project.
- GitHub `VERCEL_TOKEN` is not required canonical infrastructure for ordinary publication. A stale workflow that depends on it is superseded deployment plumbing, not an owner blocker.
- direct or connector deployments require exact source-manifest/build-output evidence, source SHA binding, runtime/API completeness, and post-deploy behavior verification.

## 5. Current Status

The canonical production site and installable PWA are live on the existing Vercel `brain-management` project. The current shell includes AI, Wallet, and Business sections with internal Overview, Tasks, Agents, Attention, Trends, Projects, and Metrics routes. Required operational APIs are published from the same deployment artifact.

## 6. Important Files

- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `sw.js`
- `api/data.js`
- `api/needs-attention.js`
- `api/trends.js`
- `api/strategic-priorities.js`
- `api/finance-status.js`
- `api/morning-task-sweep.js`
- `api/evening-delivery-closure-result.js`
- `history/`
- repository-owned Vercel source/build manifest files

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

- Direct/artifact deployments can omit runtime files unless the repository-owned manifest/build output is used and verified.
- Operational closure endpoints must be included in the exact production artifact; repository presence alone is not live proof.
- Brain Management must not duplicate balances or private transactions. It may expose public provider/status metadata and authenticated links only.
- Old reports and workflows may still mention a separate mobile project or GitHub `VERCEL_TOKEN`; treat those references as superseded unless a verified rollback explicitly restores them.

## 9. Recent Durable Changes

- 2026-07-25: Vercel became the canonical provider.
- 2026-07-25: Needs Attention, Trends, and Finance navigation were added.
- 2026-07-28: web/API/PWA were consolidated on the existing `brain-management` Vercel project and `brain-management.vercel.app`.
- 2026-07-28: exact-source Build Output publication verified `/`, `/api/data`, `/api/needs-attention`, `/api/trends`, strategic priorities, standalone manifest, service worker, and zero runtime errors.

## 10. Next Actions

- Keep every required API/runtime/history file in the repository-owned publication manifest/build output.
- Include the latest operational handoff endpoints in each canonical artifact.
- Keep Finance route links synchronized with `ezohata-finance` and preserve the owner-session boundary.
- Remove or clearly mark stale separate-mobile/token-backed workflows as non-canonical.

## 11. Risks

- Reporting merge, READY, or root HTTP 200 as `LIVE_VERIFIED` while required APIs or behavior are absent.
- Partial direct-deploy bundles drifting from canonical `main`.
- Reintroducing a separate mobile publication owner or false GitHub-token owner blocker.
- Duplicating financial calculations or exposing protected Finance data.
- Mixing daily operational telemetry into durable memory.

## 12. Rules for Codex

- Read `systems/management-control-plane-contract.md` and `systems/live-upgrade-delivery-contract.md` first.
- Treat `brain-management.vercel.app` as the single current web/API/PWA production surface.
- Verify required APIs and delivered assets, not only deployment state or the root page.
- Use the connected existing Vercel `brain-management` project for publication; do not ask Andrey to configure a GitHub `VERCEL_TOKEN` for ordinary deploys.
- For Finance navigation, read `ezohata-finance/src/lib/product/routes.ts`; never invent route names.
- Do not copy protected balances, transactions, session cookies, or secret values into Brain Management.
- Preserve one implementation owner and persist unresolved carryover precisely.

## 13. Verification Status

- canonical repo: confirmed
- canonical Vercel project: `brain-management`
- production/PWA URL: https://brain-management.vercel.app
- `/`, `/api/data`, `/api/needs-attention`, `/api/trends`, and strategic-priorities data: verified HTTP 200 on 2026-07-28
- standalone PWA manifest and current service worker: verified
- runtime errors after final recovery: none observed
- exact Finance balances: protected by owner session and intentionally not duplicated
- separate mobile Vercel project/environment: superseded, not canonical
