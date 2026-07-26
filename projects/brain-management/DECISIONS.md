# DECISIONS — brain-management

> Architecture decisions and guardrails for Brain Management.

## Canonical project

- Canonical repo: `andylitvinov-design/brain-management`.
- Canonical web live target: https://brain-management.vercel.app.
- Canonical Apple/PWA live target: https://brain-management-mobile.vercel.app.
- Netlify and Cloudflare mappings are legacy unless an explicit rollback says otherwise.

## Control-plane boundary

- `brain-management` owns current metrics, immutable daily snapshots, action queues, chain state, Needs Attention, Trends, and operational publication.
- `ai-projects-brain` owns durable mappings, decisions, risks, lessons, and governance.
- Daily operational receipts must not be copied into durable memory unless they prove a lasting state change or reusable lesson.

## Finance boundary

- `ezohata-finance` is the only source of truth for balances, transactions, FX, reconciliation, auth, and financial formulas.
- The mobile Finance hub may expose public deployment/provider status and links into the authenticated Finance product.
- It must not duplicate private amounts, session state, or financial calculations.
- Mobile Finance navigation must mirror `ezohata-finance/src/lib/product/routes.ts`; guessed paths are forbidden.

## Deploy and verification

- Merge and Vercel READY are technical evidence, not terminal user proof.
- LIVE_VERIFIED requires the production asset/API/route behavior to be checked after deploy.
- Direct mobile deployments require explicit bundle/deployment evidence because they can drift from repository `main`.
- One evidence-based recovery attempt is allowed before carryover.

## Data source

- Canonical web operational API: `https://brain-management.vercel.app/api/data`.
- Needs Attention API: `https://brain-management.vercel.app/api/needs-attention`.
- Mobile proxies these canonical operational sources and EzoHata Finance `/api/status`.

## Secrets

- Environment-variable names may be listed; values must never be stored.
- Google OAuth credentials, session secrets, finance data, and provider secrets remain protected.

## Main formula

**Current operational state is published by Brain Management; durable state is stored in AI Projects Brain; protected financial calculations remain exclusively in EzoHata Finance.**
