# CHECKS — ezohata-incoming-ledger

> Verification guide for finance / incoming ledger work.

## Agent Entry

Use this project for: finance, ledger, incoming payments, balances, PayPal, Wise, Яндекс, plan/fact, expenses, provider imports.

## Local checks

Run in canonical repo: `andylitvinov-design/finance`.

Recommended checks when available:

- `npm test`
- `npm run build`
- `npm run release-guard`
- targeted script/test mentioned by the changed code

If a command does not exist, report it as `needs verification` instead of inventing a replacement.

## Live checks

Production URL:

- https://ezohata-incoming-ledger.vercel.app

Key endpoints:

- `/api/status`
- `/api/audit-snapshot`
- `/api/paypal-transactions` when PayPal behavior is changed
- `/api/wise-transactions` when Wise behavior is changed

## Audit checks

For audit snapshot, inspect at minimum:

- `ok`
- `project`
- `period`
- `schema.ledger_contract`
- `schema.source_of_truth`
- `summary.ledger_rows`
- `summary.unknown_source_rows`
- `balances.fallback_amount_rows`
- PayPal gross/net/fee fields when PayPal is in scope
- exchange `amount_usd` warnings when exchange is in scope
- `warnings`

## UI checks

When UI tables are touched, verify selected date range is respected:

- analytics / plan / fact;
- movement / transfers;
- provider rows;
- Wise / PayPal / Яндекс values;
- profit / real expense / plan expense calculations.

Prefer audit endpoint over screenshot-only reasoning when available.

## Do not

- Do not use deprecated old repo as production source.
- Do not use `reconcile-v2/` as production source unless explicitly requested.
- Do not change env/secrets.
- Do not claim provider sync works without live/provider verification.
- Do not infer current production state from code only.

## Report format

Return:

- changed files;
- checks run;
- live verification;
- risks;
- needs verification;
- whether project memory needs update.
