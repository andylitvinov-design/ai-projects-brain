# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Needs Attention, Trends, projects, and the installable web/PWA client.

## 2. Live URLs

- canonical web production and installable PWA: https://brain-management.vercel.app
- canonical Needs Attention data: https://brain-management.vercel.app/api/needs-attention
- canonical operational data: https://brain-management.vercel.app/api/data
- canonical Trends data: https://brain-management.vercel.app/api/trends
- canonical Strategic Priorities data: https://brain-management.vercel.app/api/strategic-priorities
- canonical Agent Productivity data: https://brain-management.vercel.app/api/agent-productivity
- legacy `brain-management-mobile`, Netlify, Cloudflare, preview and deployment-specific URLs: historical or diagnostic only; never use them as the final publication target unless an explicit rollback evidence chain names one.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/brain-management
- canonical production branch: `main`
- durable memory: `andylitvinov-design/ai-projects-brain`
- Finance source of truth: `andylitvinov-design/ezohata-finance`

`ai-projects-brain` is durable project/governance memory, not the runtime dashboard. `ezohata-finance` owns financial formulas, balances, reconciliation, auth, and private finance data; Brain Management provides safe links and read-only public status only.

## 4. Hosting / Deploy

- provider: Vercel
- production team: `super10`
- single canonical project: `brain-management`
- single canonical production site/PWA: https://brain-management.vercel.app
- a separate `brain-management-mobile` or `brain-management-mobile-production` project is not required and must not be introduced as the final publication target;
- GitHub `VERCEL_TOKEN` is not a required owner action for the canonical delivery path; missing token references are superseded workflow defects, not Needs Attention items;
- connector-driven or hand-assembled deployments must satisfy the direct-deploy source-parity gate: exact current-main SHA, repository-owned dependency-closed manifest, all runtime routes/assets/config, deploy mapping, and independent production verification;
- canonical APIs include `/api/data`, `/api/needs-attention`, `/api/trends`, `/api/strategic-priorities`, and `/api/agent-productivity`.

## 5. Current Status

Canonical production was recovered and independently verified on 2026-07-31. The root serves real HTML with the approved six-button shell in order: Overview, Tasks, Agents, Trends, Projects and Metrics. Overview exposes four aggregate cards, Agents is present, `/api/data` publishes 24 canonical metrics, `/api/trends` publishes ten 20-day trends, `/api/agent-productivity` publishes seven agent cards, the manifest has six shortcuts, and service worker cache `brain-management-v65` is reachable.

The previous recovery chain is terminal `LIVE_VERIFIED`, supported by `brain-management/history/handoffs/2026-07-31-evening-delivery-closure.json` and commit `57236f79df140d8433ee29270ace101274405ed4`.

A new bounded runtime contract regression was discovered on 2026-08-01: `/api/needs-attention` and `/api/strategic-priorities` return HTTP 200 with the application HTML shell and `text/html` instead of their required JSON contracts. This is not an owner blocker and does not reopen the completed production-recovery chain. It requires a separately ranked non-UI implementation chain with JSON/content-type regression tests and production verification.

## 6. Important Files

- `index.html`
- `app.js`
- `compat-live-data.js`
- `agent-productivity-ui.js`
- `metrics-goals.js`
- `dashboard-enhancements.js`
- `automation-orientation-ui.js`
- `styles.css`
- `attention.css`
- `priorities.css`
- `manifest.webmanifest`
- `sw.js`
- `mobile-contract.json`
- `scripts/build-mobile-release-bundle.mjs`
- `api/data.js`
- `api/needs-attention.js`
- `api/trends.js` or the current consolidated rewrite target
- `api/strategic-priorities.js`
- `api/agent-productivity.js`
- `api/hobby-snapshots.js`
- `lib/history.js`

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

`VERCEL_TOKEN` is not part of the required canonical owner-action contract for this project.

## 8. Known Issues

- `/api/needs-attention` and `/api/strategic-priorities` currently fall through to the HTML application shell instead of returning JSON.
- Direct deployments may drift from repository `main`; verify deployed static assets, routes, APIs and source SHA after every release.
- Brain Management API currently has no dedicated write endpoint for automation closure receipts; focused repository handoffs remain the fallback.
- Finance links must mirror `ezohata-finance/src/lib/product/routes.ts`; guessed routes are forbidden.
- `projects/index.md` and `projects/portfolio-registry.json` must remain synchronized with this capsule and current verified production evidence.

## 9. Recent Durable Changes

- 2026-07-25: Vercel mapping was recorded, but the former separate-mobile mapping is now superseded.
- 2026-07-25: Needs Attention, Trends and Finance navigation were added to management surfaces.
- 2026-07-29: direct-deploy source parity became an active governance rule.
- 2026-07-29: repeated exact-source omissions established recursive transitive dependency closure as a release requirement.
- 2026-07-30: approved Overview/Agents UI restored in source and permanent production mapping corrected to one repository, one `main` branch, one Vercel project and one canonical web/PWA origin.
- 2026-07-31: dependency-closed production recovered and independently verified; publication freshness moved to 100 without a formula change.
- 2026-08-01: two auxiliary JSON routes were found to be incorrectly served by the HTML fallback and were separated into a new implementation candidate rather than reopening the completed recovery chain.

## 10. Next Actions

- Rank the bounded `/api/needs-attention` and `/api/strategic-priorities` JSON-route repair against other safe non-UI candidates.
- If selected, restore explicit JSON responses and content types, add regression tests that reject HTML fallback bodies, deploy through the canonical Vercel project, and verify both routes in production.
- Keep the six-button UI contract, four Overview aggregates, Agents surface, 24 metrics, ten trends, manifest and service worker unchanged while repairing API routing.
- Add a supported operational closure-write path when safe, without duplicating formulas or durable project memory.

## 11. Risks

- Reporting HTTP 200 as success when the response body or content type violates the required API contract.
- Reintroducing the three-mode AI/Wallet/Business shell, Attention as the third bottom tab, or a separate mobile production project.
- Publishing an ad hoc partial source bundle or a bundle without exact source SHA and transitive runtime dependency evidence.
- Treating a missing GitHub Vercel token as an Andrey blocker.
- Duplicating financial calculations or exposing protected finance data.
- Mixing routine operational telemetry into durable memory.

## 12. Rules for Codex and Automations

- Read `systems/management-control-plane-contract.md` and `systems/live-upgrade-delivery-contract.md` first.
- Treat `andylitvinov-design/brain-management:main`, Vercel project `brain-management`, and https://brain-management.vercel.app as the only canonical production mapping.
- Never require a separate mobile production project or GitHub `VERCEL_TOKEN` to close the canonical deployment chain.
- Verify web/PWA APIs and actual delivered assets, response bodies and content types, not only status codes or deployment state.
- Preserve the six fixed bottom routes in order: overview, tasks, agents, trends, projects, metrics.
- For Finance navigation, read `ezohata-finance/src/lib/product/routes.ts`; never invent route names.
- Do not copy protected balances, transactions, session cookies or secret values into Brain Management.
- Preserve one implementation owner and persist unresolved carryover precisely.

## 13. Verification Status

- canonical repo and branch: confirmed
- canonical Vercel project and origin: confirmed
- separate mobile project required: no
- GitHub Vercel token required from Andrey: no
- production root: HTTP 200 real HTML
- approved bottom navigation: six routes confirmed
- Overview aggregates: four confirmed
- `/api/data`: HTTP 200 JSON, 24 metrics
- `/api/trends`: HTTP 200 JSON, ten trends, 20-day window
- `/api/agent-productivity`: HTTP 200 JSON, seven agents
- manifest: HTTP 200, six shortcuts
- service worker: HTTP 200, cache `brain-management-v65`
- `/api/needs-attention`: rejected, HTTP 200 HTML fallback instead of JSON
- `/api/strategic-priorities`: rejected, HTTP 200 HTML fallback instead of JSON
- completed production-recovery terminal state: `LIVE_VERIFIED`
- new auxiliary-route chain: `READY_FOR_STRATEGIC_RANKING`
- exact finance balances: protected by owner session and intentionally not duplicated
- operational closure receipt ingestion API: not yet supported
