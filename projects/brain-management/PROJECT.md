# brain-management

## 1. Purpose

Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Trends, projects, and the installable web/PWA client.

## 2. Canonical targets

- production web/PWA: https://brain-management.vercel.app
- repository: `andylitvinov-design/brain-management`
- production branch: `main`
- provider/project: Vercel team `super10`, project `brain-management`
- durable memory: `andylitvinov-design/ai-projects-brain`
- Finance source of truth: `andylitvinov-design/ezohata-finance`

Legacy Netlify, Cloudflare, separate-mobile, preview and deployment-specific URLs are historical or diagnostic only. They are not canonical publication targets.

## 3. Canonical operational APIs

- `/api/data`
- `/api/needs-attention`
- `/api/trends`
- `/api/strategic-priorities`
- `/api/agent-productivity`

HTTP 200 is insufficient: each API must return the required JSON body and content type.

## 4. Current durable state — 2026-08-01

Canonical production is `LIVE_VERIFIED`.

Verified evidence:

- real production HTML at the canonical Vercel origin;
- exactly six fixed bottom routes in order: Overview, Tasks, Agents, Trends, Projects, Metrics;
- four Overview aggregate cards;
- 24 canonical metrics;
- ten Trends over the 20-day analysis window;
- seven agent-productivity cards;
- all five canonical operational APIs return parseable JSON;
- manifest contains six shortcuts;
- service worker cache `brain-management-v67` is reachable;
- no `[object Object]`, three-mode shell, unapproved visual redesign, or runtime-error cluster;
- fresh public business-KPI evidence covers `4/6` applicable commercial projects without changing the formula.

Primary evidence:

- `brain-management/history/handoffs/2026-07-31-evening-delivery-closure.json`;
- `brain-management/history/handoffs/2026-08-01-morning-system-upgrade.json`;
- `brain-management/history/handoffs/2026-08-01-daily-dashboard-update.json`;
- Brain Management PR #161, merge `92cec78d0ee474ef53db904ec97abe5521a5824f`;
- dashboard publication receipt commit `1e297dfb9b0dc7bc4a327319107b27db47c706a8`.

## 5. Closed durable incident

The 2026-08-01 auxiliary JSON-route regression is closed.

Before repair, `/api/needs-attention` and `/api/strategic-priorities` returned the HTML application shell. PR #161 reused existing functions to remain within the Vercel Hobby function limit, added a focused JSON-contract test, and moved canonical API readiness from `3/5` to `5/5`. The first implementation would have created 14 functions and was correctly rejected; the final implementation stayed within the 12-function budget and was live verified.

This incident established a reusable rule: verify body, content type and parseability, not status code alone.

## 6. Current operational blockers

- `provider_live_readiness_ratio` remains `0/4`, owned by `Owner Verification`: a current owner-session smoke and one read-only Wise or YooMoney journey are still required in EzoHata Finance.
- Product delivery, task success and live completion remain a shared `1/4` input. A single concrete denominator item and canonical implementation repository must be selected before creating an implementation chain.
- Public business-KPI coverage is `4/6`; EzoHata Finance is auth protected and Psihotavr produced a collector error. Visitors, target clicks and inquiries remain `NOT_INSTRUMENTED` where no real source exists.
- A supported operational closure-write endpoint is still absent; focused repository handoffs remain the fallback.

## 7. Important files

- `index.html`, `app.js`, `styles.css`
- `agent-productivity-ui.js`, `metrics-goals.js`, `dashboard-enhancements.js`
- `manifest.webmanifest`, `sw.js`, `mobile-contract.json`
- `scripts/build-mobile-release-bundle.mjs`
- operational API files and shared snapshot routes
- `lib/history.js`

## 8. Deployment and UI guardrails

- Use one repository, one `main` branch, one Vercel project and one canonical web/PWA origin.
- Do not require a separate mobile project or GitHub `VERCEL_TOKEN`.
- Direct deployments require current-main source binding, a dependency-closed manifest, complete runtime routes/assets, and independent production verification.
- Preserve the six-button UI and four Overview aggregates unless Andrey explicitly approves a new contract.
- Never restore the `ИИ / Кошелёк / Бизнес` shell or Attention as a bottom tab.
- Finance calculations and protected data stay in `ezohata-finance`; Brain Management exposes safe links and public status only.

## 9. Environment variable names

Only names may be stored; values must never enter durable memory.

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

## 10. Next durable actions

1. Keep the current live contract stable while future honest daily snapshots accumulate.
2. Select one concrete existing deliverable for the shared `1/4` delivery-conversion input; preserve one implementation owner.
3. Complete the EzoHata Finance owner-session/read-only provider proof without copying protected finance data.
4. Add metric-level evidence references and a supported operational closure-write path when safe.

## 11. Verification status

- canonical repo/branch/origin: confirmed
- production terminal state: `LIVE_VERIFIED`
- six bottom routes: confirmed
- four Overview aggregates: confirmed
- `/api/data`: 200 JSON, 24 metrics
- `/api/trends`: 200 JSON, ten trends, 20-day window
- `/api/agent-productivity`: 200 JSON, seven agents
- `/api/needs-attention`: 200 parseable JSON
- `/api/strategic-priorities`: 200 parseable JSON
- manifest shortcuts: six
- service worker: `brain-management-v67`
- runtime error cluster: none in the verified deployment
- exact private finance balances: intentionally not duplicated
