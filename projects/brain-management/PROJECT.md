# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Needs Attention, Trends, projects, and the installable web/PWA client.

## 2. Live URLs

- canonical web production and installable PWA: https://brain-management.vercel.app
- canonical Needs Attention data: https://brain-management.vercel.app/api/needs-attention
- canonical operational data: https://brain-management.vercel.app/api/data
- canonical Trends data: https://brain-management.vercel.app/api/trends
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

Canonical source contains the approved six-button v45 shell: Overview, Tasks, Agents, Trends, Projects and Metrics; four aggregate scores are restored on Overview and the full Agents productivity surface is present.

As of 2026-07-30 evening verification, canonical production is not healthy: `/` returns HTTP 200 but serves the literal local-file pointer `@/mnt/data/brain-final/index.html`; `/api/data`, `/api/needs-attention`, `/api/trends`, `/api/strategic-priorities`, the manifest and service worker return 404. This is `MERGED_WAITING_DEPLOY`, not `LIVE_VERIFIED` and not `BLOCKED_BY_OWNER`.

Recovery PR `brain-management#153` merged dependency-closed release export logic at `084e3cdd85fed3258ccbd6fb426798d0d9c718b3`. GitHub Actions runs failed before job setup with zero executed steps, so no current-main-bound exact artifact or new canonical deployment was produced. Another partial manual deployment is forbidden.

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

- Canonical production currently points to an invalid local-file placeholder deployment and omits all required APIs/PWA assets.
- GitHub Actions may fail before checkout/job setup; a zero-step infrastructure failure is not source validation and must not be represented as a product test failure.
- Direct deployments may drift from repository `main`; verify deployed static assets, routes, APIs and source SHA after every release.
- Brain Management API currently has no dedicated write endpoint for Evening Delivery Closure receipts; focused repository handoffs remain the fallback when production APIs are unavailable.
- Finance links must mirror `ezohata-finance/src/lib/product/routes.ts`; guessed routes are forbidden.

## 9. Recent Durable Changes

- 2026-07-25: Vercel mapping was recorded, but the former separate-mobile mapping is now superseded.
- 2026-07-25: Needs Attention, Trends and Finance navigation were added to management surfaces.
- 2026-07-29: direct-deploy source parity became an active governance rule.
- 2026-07-29: repeated exact-source omissions established recursive transitive dependency closure as a release requirement.
- 2026-07-30: approved v45 Overview/Agents UI restored in source.
- 2026-07-30: repository release exporter changed to one source-attributable dependency-closed canonical release root.
- 2026-07-30: permanent production mapping corrected to one repository, one `main` branch, one Vercel project and one canonical web/PWA origin.

## 10. Next Actions

- Generate a dependency-closed exact-source artifact from current `brain-management/main`, bound to SHA `084e3cdd85fed3258ccbd6fb426798d0d9c718b3` or a later canonical main SHA.
- Deploy that exact artifact through the existing Vercel project `brain-management`.
- Independently verify real HTML, all five required APIs, six routes, four Overview aggregates, full Agents UI, 24 metrics grouped 11/8/5, Trends sources/history/deltas, Projects links, manifest, service worker, mobile behavior and runtime errors.
- Keep the chain `MERGED_WAITING_DEPLOY` until all production checks pass.
- Add a supported operational closure-write path when safe, without duplicating formulas or durable project memory.

## 11. Risks

- Reporting HTTP 200, READY, merge or deployment as `LIVE_VERIFIED` without checking actual behavior and APIs.
- Reintroducing the three-mode AI/Wallet/Business shell, Attention as the third bottom tab, or a separate mobile production project.
- Publishing an ad hoc partial source bundle or a bundle without exact source SHA and transitive runtime dependency evidence.
- Treating a missing GitHub Vercel token as an Andrey blocker.
- Duplicating financial calculations or exposing protected finance data.
- Mixing routine operational telemetry into durable memory.

## 12. Rules for Codex and Automations

- Read `systems/management-control-plane-contract.md` and `systems/live-upgrade-delivery-contract.md` first.
- Treat `andylitvinov-design/brain-management:main`, Vercel project `brain-management`, and https://brain-management.vercel.app as the only canonical production mapping.
- Never require a separate mobile production project or GitHub `VERCEL_TOKEN` to close the canonical deployment chain.
- Verify web/PWA APIs and actual delivered assets, not only deployment state.
- Preserve the six fixed bottom routes in order: overview, tasks, agents, trends, projects, metrics.
- For Finance navigation, read `ezohata-finance/src/lib/product/routes.ts`; never invent route names.
- Do not copy protected balances, transactions, session cookies or secret values into Brain Management.
- Preserve one implementation owner and persist unresolved carryover precisely.

## 13. Verification Status

- canonical repo and branch: confirmed
- canonical Vercel project and origin: confirmed
- separate mobile project required: no
- GitHub Vercel token required from Andrey: no
- current-main source recovery: merged at `084e3cdd85fed3258ccbd6fb426798d0d9c718b3`
- canonical production root: rejected, local-file pointer
- canonical production required APIs: rejected, 404
- manifest/service worker: rejected, 404
- v45 UI source contract: confirmed in source, not production-verified
- terminal state: `MERGED_WAITING_DEPLOY`
- exact finance balances: protected by owner session and intentionally not duplicated
- operational closure receipt ingestion API: not yet supported
