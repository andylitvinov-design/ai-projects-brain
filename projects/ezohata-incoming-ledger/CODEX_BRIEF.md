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
- AUTONOMY.md
- SYSTEM_MAP.md
- DATA_SCHEMA.md
- RISKS.md
- CHECKS.md if present
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

If the task is to create, rewrite, or repair a Codex `/goal` prompt for this project, read and apply `systems/codex-goal-prompt-standard.md` before writing the goal.

## Autonomy

Default mode: Production Debugger Autopilot.

Do not ask for confirmation before safe engineering actions: inspect repo/live/read-only endpoints, inspect recent PRs/commits, create branch, update files, add tests, run checks, commit/push a working branch, and open/update a PR.

Stop before secrets/env changes, destructive data changes, production migrations/backfills with `--apply`, Google Sheets row rewrites/deletes, unclear production deploys, or changing finance semantics for balance/gross/net/fee/source without proven root cause and regression tests.

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

- First prove the failing layer before patching.
- Minimal safe fix.
- Study code and data contracts first.
- Do not rewrite everything.
- Do not use legacy `reconcile-v2/` as production source.
- Treat old repos as reference only unless explicitly asked.
- Use branch -> PR -> merge where possible.
- Mark unknowns as `needs verification`.
- Distinguish code path exists, env names documented, credentials configured, and live sync verified.
- Do not claim provider sync or production behavior is fixed unless live checks were run.

## `/goal` Prompt Rules For Ezohata Debugger

When this project generates a Codex `/goal`, the goal must be an execution contract, not a vague request or a copied chat history.

Required shape:

- one concrete outcome;
- canonical repo `andylitvinov-design/finance` unless proven otherwise;
- live URL/status or `needs verification`;
- exact symptom/evidence when known;
- required source-of-truth checks before patching;
- failing-layer investigation list: provider/import, normalization, ledger save, aggregation, API route, UI render, deploy/alias, env/config;
- boundaries: do not change secrets/env values, data contracts, auth, or finance semantics without proof;
- definition of done: root cause, minimal patch, regression test/checks, live verification if production is affected;
- final report: studied files/data, root cause, failing layer, changed files, tests, PR/commit/deploy status, live verification, risks, STATE/LOG update status.

Bad `/goal` examples:

- `fix balance`
- `check everything and deploy`
- `based on previous chats, you know what to do`
- `audit all finance and repair all issues`

Good `/goal` style:

```text
/goal
Fix the May balance mismatch in `andylitvinov-design/finance` for `https://ezohata-incoming-ledger.vercel.app`.

Before patching, verify `/api/status`, `/api/audit-snapshot`, and the relevant UI/API path. Prove whether the failing layer is provider/import, ledger normalization, aggregation, API, UI render, or deploy alias.

Patch only the proven layer. Preserve amount_net/gross/fee, transfer, payout, exchange, and ledger contract semantics unless evidence proves that exact logic is wrong. Add a regression test, run project checks, and verify live if production changed.

Final report: studied files/data, root cause, failing layer, changed files, checks, PR/commit/deploy status, live verification, remaining risks, STATE.md/LOG.md update status.
```

## Task-Type Checks

For bug/data tasks:

- Find concrete code first: file, function, data contract, endpoint, or formula path.
- Check whether the issue is UI, API route, provider/import, normalization, ledger save, balance, analytics, Google Sheets, deploy source, or env configuration related.

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

- `node --test tests/*.test.*`
- `bash scripts/release-guard.sh`
- `npm run build`

Also run narrower tests for touched modules when available.
Report commands not run instead of implying they passed.

## Standard Response Required From Codex

1. Studied files
2. Failing layer / root cause
3. What was found
4. What changed
5. Changed files
6. Verification commands and results
7. Preview/live links, if checked
8. Risks
9. Data migration/backfill status, separated from runtime fix
10. What remains `needs verification`
11. Suggested STATE.md/LOG.md or project memory updates
