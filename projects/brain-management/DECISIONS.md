# DECISIONS — brain-management

> Architecture decisions and guardrails for Brain Management.

## Canonical project

- Canonical repo: `andylitvinov-design/brain-management`.
- Canonical production and installable Apple/Android PWA target: https://brain-management.vercel.app.
- Canonical Vercel project: `brain-management` in team `super10`.
- A separate `brain-management-mobile-production` environment/project is superseded and must not be required or recreated for ordinary publication.
- Netlify, Cloudflare, and separate mobile mappings are legacy unless an explicit verified rollback says otherwise.

## Control-plane boundary

- `brain-management` owns current metrics, immutable daily snapshots, action queues, chain state, Needs Attention, Trends, operational publication, and the installable PWA.
- `ai-projects-brain` owns durable mappings, decisions, risks, lessons, and governance.
- Daily operational receipts must not be copied into durable memory unless they prove a lasting state change or reusable lesson.

## Finance boundary

- `ezohata-finance` is the only source of truth for balances, transactions, FX, reconciliation, auth, and financial formulas.
- Brain Management may expose public deployment/provider status and links into the authenticated Finance product.
- It must not duplicate private amounts, session state, or financial calculations.
- Finance navigation must mirror `ezohata-finance/src/lib/product/routes.ts`; guessed paths are forbidden.

## Deploy and verification

- Web, API, and PWA publish through the same existing Vercel `brain-management` project.
- GitHub `VERCEL_TOKEN` is not canonical infrastructure for ordinary publication. A stale workflow requiring it is a non-canonical workflow defect, not an Andrey-only blocker.
- Merge and Vercel READY are technical evidence, not terminal user proof.
- Root HTTP 200 alone is insufficient.
- `LIVE_VERIFIED` requires the intended production behavior plus every required API/route/asset to work after deploy.
- Direct/connector deployments require a repository-owned manifest or build output, source SHA binding, runtime file completeness, and deployed source/schema parity.
- One evidence-based recovery attempt is allowed before carryover.

## Data source

- Canonical operational API: `https://brain-management.vercel.app/api/data`.
- Needs Attention API: `https://brain-management.vercel.app/api/needs-attention`.
- Trends API: `https://brain-management.vercel.app/api/trends`.
- Strategic-priorities API: `https://brain-management.vercel.app/api/strategic-priorities`.
- The same production origin serves the installable PWA and safe Finance navigation/status.

## Secrets

- Environment-variable names may be listed; values must never be stored.
- Google OAuth credentials, session secrets, finance data, and provider secrets remain protected.
- Do not request or expose a GitHub Vercel token as a workaround for canonical connected-project publication.

## Main formula

**Brain Management has one canonical repository, one existing Vercel project, and one production/PWA origin; durable state is stored in AI Projects Brain, and protected financial calculations remain exclusively in EzoHata Finance.**
