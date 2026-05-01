# codex-links-myportal

## 1. Purpose

Clean-room Cloudflare Pages inbox and finance sync app with PayPal,
Plaid, Wise, and Binance provider ingestion.

## 2. Live URLs

- production: https://codex-links-myportal.pages.dev
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and any secondary live URLs
  need verification.

## 3. Repositories

- canonical repo: needs verification
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond the listed inventory
  need verification.

## 4. Hosting / Deploy

- provider: Cloudflare Pages
- project name: Cloudflare Pages project codex-links-myportal
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status

Local checkout has no remote configured and is dirty. Cloudflare Pages
app has token-gated /api/finance/sync and finance import helpers.

## 6. Important Files

- functions/api/finance/sync.js
- functions/api/finance/plaid.js
- functions/\_lib/finance.js
- functions/\_lib/security.js
- public/finance-import.html
- public/td-easyweb-import.html
- wrangler.jsonc

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- LINKS_EXECUTOR_TOKEN
- FINANCE_CONNECT_TOKEN
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- PAYPAL_API_BASE
- PLAID_CLIENT_ID
- PLAID_SECRET
- PLAID_API_BASE
- WISE_API_TOKEN
- WISE_PROFILE_ID
- WISE_API_BASE
- BINANCE_API_KEY
- BINANCE_SECRET_KEY
- BINANCE_API_BASE

## 8. Known Issues

- Repo remote mapping needs verification.
- Dirty local checkout should not be touched for unrelated repo
  creation.
- Provider code path is not the same as live credential verification.
- Binance history has API window limits.

## 9. Recent Tasks

- Added PayPal, Wise balances/statements, Binance, Plaid/TD import
  helpers, and /api/finance/sync provider selection.

## 10. Next Actions

- Establish canonical remote or mark as local-only.
- Verify live Cloudflare secrets before claiming provider sync works.

## 11. Risks

- Leaking finance secrets.
- Overwriting dirty local changes.
- Confusing configured code with live provider access.

## 12. Rules for Codex

- Do not touch the dirty myportal checkout for unrelated tasks.
- Use temp clone/workdir.
- Store only env names, never values.

## 13. Verification Status

- repo mapping: needs verification
- live mapping: listed in inventory; live behavior needs verification
  before claims
- env status: names only; values and completeness need verification
- deploy status: hosting listed; deploy source needs verification
- data flow: needs verification
- needs verification: unconfirmed repo, live, deploy, env, and data-flow
  details.
