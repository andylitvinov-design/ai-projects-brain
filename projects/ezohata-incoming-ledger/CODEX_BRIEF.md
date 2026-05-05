# Codex Brief - ezohata-incoming-ledger

## Project Identity

- repo: https://github.com/andylitvinov-design/finance
- live URL: https://ezohata-incoming-ledger.vercel.app
- hosting: Vercel project `ezohata-incoming-ledger`
- target branch: needs verification
- production source: `andylitvinov-design/finance`
- deprecated/old source risk: old `andylitvinov-design/ezohata-incoming-ledger` and legacy `reconcile-v2/` must not be used as production source unless explicitly verified
- purpose: Web app for EzoHata incoming payments, expenses, fact data, balances, provider imports, and channel analytics

## Before Starting

Read project memory first:

- PROJECT.md
- SYSTEM_MAP.md
- DATA_SCHEMA.md
- RISKS.md
- CODE_ACCESS.md if present
- DATA_SAMPLES.md if present
- DEBUG_LOG.md if present
- this CODEX_BRIEF.md

Then inspect the canonical finance repo itself:

- AGENTS.md if present
- README.md
- STATE.md or project-state.md if present
- LOG.md if present
- package.json
- Vercel/deploy config
- index.html
- config.js
- finance.js
- google-auth.js
- google-sheets.js
- sheet-config.json
- api/paypal-transactions.js
- api/wise-transactions.js
- scripts/release-guard.sh

## Protected Data And UX

Do not break:

- Google Sheets OAuth/read flows
- provider import routes
- manual finance formulas
- ledger data contract
- balances/channel analytics
- payout/transfer/exchange semantics
- Vercel production deploy source
- `/api/status` and audit/snapshot style endpoints if present

## Env Names Only

Known env names include:

- EZOHATA_V2_APPS_SCRIPT_URL
- EZOHATA_LEGACY_MANUAL_FINANCE_URL
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- PAYPAL_ENVIRONMENT
- PAYPAL_MCP_CLIENT_ID
- PAYPAL_MCP_REFRESH_TOKEN
- WISE_API_TOKEN
- WISE_PROFILE_ID
- WISE_API_BASE
- OPENAI_API_KEY
- OPENAI_EXPENSE_MODEL

Never print or store env values.

## Rules

- Minimal safe fix.
- Study code and data contracts first.
- Do not rewrite everything.
- Do not use legacy `reconcile-v2/` as production source.
- Treat old repos as reference only unless explicitly asked.
- Use branch -> PR -> merge where possible.
- Mark unknowns as `needs verification`.
- Distinguish code path exists, env names documented, credentials configured, and live sync verified.
- Do not claim provider sync or production behavior is fixed unless live checks were run.

## Task-Type Checks

For bug/data tasks:

- Find concrete code first: file, function, data contract, endpoint, or formula path.
- Check whether the issue is Google Sheets, provider import, ledger aggregation, UI rendering, deploy source, or env configuration related.

For finance/provider tasks:

- Preserve gross/net/fee semantics where present.
- Preserve transfer/payout/exchange rules.
- Keep manual ledger source-of-truth rules intact.
- Avoid changing provider APIs without tests or explicit evidence.

For production checks:

- Verify canonical repo and production alias before claiming live behavior.
- Use `/api/status`, `/api/audit-snapshot`, commit/deploy metadata, or documented health checks when available.

## Verification Commands

Expected checks from project memory:

- npm test
- npm run build
- npm run release-guard

Also run narrower tests for touched modules when available.
Report commands not run instead of implying they passed.

## Standard Response Required From Codex

1. Studied files
2. What was found
3. What changed
4. Changed files
5. Verification commands and results
6. Preview/live links, if checked
7. Risks
8. What remains `needs verification`
9. Suggested STATE.md/LOG.md or project memory updates
