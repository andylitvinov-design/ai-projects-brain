# CHECKS — brain-management

> Verification guide for Brain Management web and Apple/PWA surfaces.

## Agent Entry

Use this project for current metrics, daily snapshots, delivery evidence, management reports, Needs Attention, Trends, mobile/PWA behavior, and safe Finance navigation.

## Canonical targets

- repo: `andylitvinov-design/brain-management`
- web: https://brain-management.vercel.app
- mobile: https://brain-management-mobile.vercel.app
- Finance source product: https://ezohata-finance.vercel.app

## Source checks

When available run:

- `npm test`
- targeted Node tests for changed routes/components
- syntax/build checks present in the repository
- verify changed source on current `main`

No CI statuses means `checks absent`, not `checks passed`.

## Web operational checks

Verify:

- `/` returns HTTP 200;
- `/api/data` returns current schema and 24 metrics;
- `/needs-attention` and `/api/needs-attention` return expected state;
- `/trends` or the current Trends data endpoint returns current structured data;
- no runtime-error clusters after release.

## Apple/PWA checks

Verify:

- root and current `app.js` return HTTP 200;
- manifest contains standalone Apple/PWA metadata and shortcuts;
- bottom navigation includes Overview, Tasks, Needs Attention, Finance, Trends, Projects, and Metrics;
- iPhone safe-area padding and narrow-screen layout are present;
- `/api/data`, `/api/needs-attention`, `/api/trends`, and `/api/finance-status` are current and schema-compatible;
- the deployed asset contains the intended route contract, not merely a READY deploy.

## Finance checks

Read `andylitvinov-design/ezohata-finance/src/lib/product/routes.ts` before verifying mobile links.

Required current routes:

- `/`
- `/movements`
- `/balances`
- `/reconciliation`
- `/confirmations`
- `/income`
- `/expenses`
- `/transfers`
- `/exchanges-fees`
- `/integrations`
- `/imports`
- `/needs-review`
- `/export`
- `/audit`

Reject guessed obsolete paths such as `/accounts`, `/transactions`, or `/reports` unless the canonical Finance route contract later adds them.

Verify `/api/finance-status` is public/read-only. Exact balances and audit snapshots may require the owner Google session and must not be copied into the management app.

## Closure checks

For an implementation chain verify separately:

- source/PR/merge evidence;
- production deploy ID;
- production asset/API behavior;
- mobile and desktop relevance;
- runtime errors;
- regression and one recovery attempt;
- terminal state: `LIVE_VERIFIED`, `MERGED_WAITING_DEPLOY`, `BLOCKED_BY_OWNER`, or `NO_SAFE_UPGRADE`.

## Do not

- Do not use legacy Netlify/Cloudflare URLs as current proof.
- Do not count merge or READY as user proof.
- Do not copy protected Finance data or secret values.
- Do not modify score formulas to create apparent success.
- Do not store routine closure receipts in durable memory.

## Report format

Return:

- confirmed/rejected change;
- before/after input;
- PR/merge/deploy evidence;
- live route/API proof;
- recovery action;
- operational persistence state;
- durable-memory PR state;
- exact remaining next action.
