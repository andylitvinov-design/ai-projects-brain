# CHECKS — brain-management

> Verification guide for the single canonical Brain Management web/API/PWA surface.

## Agent Entry

Use this project for current metrics, daily snapshots, delivery evidence, management reports, Needs Attention, Trends, mobile/PWA behavior, and safe Finance navigation.

## Canonical targets

- repo: `andylitvinov-design/brain-management`
- production and installable PWA: https://brain-management.vercel.app
- Vercel project: `brain-management`
- Finance source product: https://ezohata-finance.vercel.app

A separate mobile project/environment or GitHub `VERCEL_TOKEN` is not required canonical infrastructure for ordinary publication.

## Source checks

When available run:

- `npm test`
- targeted Node tests for changed routes/components
- syntax/build checks present in the repository
- verify changed source on current `main`
- verify the repository-owned deployment manifest/build output includes every required static, API, history, and configuration file

No CI statuses means `checks absent`, not `checks passed`.

## Canonical production checks

Verify on `https://brain-management.vercel.app`:

- `/` returns HTTP 200 and contains the current navigation/assets;
- `/api/data` returns the current schema, exactly 24 metrics, canonical project count, assignments, and current handoffs;
- `/api/needs-attention` returns only genuine owner-only blockers or true stalls;
- `/api/trends` returns the Monday set, exact source links, daily movement, and weekly history;
- `/api/strategic-priorities` or its current equivalent returns the current assignment state;
- `manifest.webmanifest` is reachable and uses standalone display;
- `sw.js` is reachable and carries the intended cache version;
- no runtime-error clusters appear after release.

Root HTTP 200 alone is not sufficient.

## Apple/Android PWA checks

Verify from the same canonical origin:

- the current shell loads on narrow and desktop layouts;
- manifest/install metadata is present;
- iPhone/Android safe-area padding and narrow-screen layout are usable;
- there is no page-level horizontal overflow;
- Overview, Tasks, Agents, Attention, Trends, Projects, Metrics, Wallet, and Business routes remain reachable as applicable;
- source/project/unblock links remain tappable;
- `/api/data`, `/api/needs-attention`, `/api/trends`, `/api/strategic-priorities`, and `/api/finance-status` are current and schema-compatible;
- the deployed artifact contains the intended runtime/API contract, not merely a READY deployment.

## Finance checks

Read `andylitvinov-design/ezohata-finance/src/lib/product/routes.ts` before verifying Finance links.

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

Verify `/api/finance-status` is public/read-only. Exact balances and audit snapshots may require the owner Google session and must not be copied into Brain Management.

## Deployment-source parity checks

For direct, connector, or Build Output publication verify:

1. artifact source is current canonical `main` or an explicitly recorded runtime-equivalent commit;
2. the repository-owned manifest/build output is used rather than an ad hoc partial file list;
3. every required API/runtime/history/static file is present;
4. source SHA or artifact digest is recorded;
5. the canonical alias points to the intended deployment;
6. required production routes and behavior are verified independently after deploy.

Missing API/runtime files or unknown source parity map to `MERGED_WAITING_DEPLOY`, never `LIVE_VERIFIED`.

## Closure checks

For an implementation chain verify separately:

- source/PR/merge evidence;
- production deploy ID and source/artifact binding;
- production asset/API behavior;
- mobile and desktop relevance;
- runtime errors;
- regression and one recovery attempt;
- terminal state: `LIVE_VERIFIED`, `MERGED_WAITING_DEPLOY`, `BLOCKED_BY_OWNER`, or `NO_SAFE_UPGRADE`.

## Do not

- Do not use a separate mobile, legacy Netlify, or Cloudflare URL as current proof.
- Do not request GitHub `VERCEL_TOKEN` configuration for ordinary canonical publication.
- Do not count merge, READY, or root HTTP 200 as user proof.
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
