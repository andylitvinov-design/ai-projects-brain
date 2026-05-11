# CHECKS — ezohata-incoming-ledger

> Verification guide for finance / incoming ledger work.

## Agent Entry

Use this project for: finance, ledger, incoming payments, balances, PayPal, Wise, Яндекс, plan/fact, expenses, provider imports.

## Mandatory production debug preflight

Run this before patching any production UI/runtime/API/provider/balance issue.

1. Identify the live URL.
2. Fetch the live status endpoint.
3. Record production status, commit SHA, branch/ref, build/version, and deploy id when available.
4. Verify the hosting production alias target and deploy branch/commit.
5. Verify the canonical repo default branch HEAD.
6. Check relevant open PRs touching the suspected failing layer.
7. Classify before patching: `source ok`, `deploy/source-of-truth mismatch`, or `needs verification`.

Stop rule: if production does not contain the intended fix or is serving a stale feature branch, do not patch formulas or UI logic yet. Resolve deploy/source-of-truth mismatch first.

## Local checks

Run in canonical repo: `andylitvinov-design/finance`.

Recommended checks when available:

- `node --test tests/*.test.*`
- `bash scripts/release-guard.sh`
- `npm run build`
- targeted script/test mentioned by the changed code

If a command does not exist, report it as `needs verification` instead of inventing a replacement.

## Live checks

Production URL:

- https://ezohata-incoming-ledger.vercel.app

Key endpoints:

- `/api/status`
- `/api/audit-snapshot`
- `/api/debug-full`
- `/api/debug-analytics`
- `/api/debug-balance-reconciliation`
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

## Movement table checks

For `Движение средства`, verify the visible period table itself:

1. Find the `BALANCE` / `БАЛАНС` column.
2. Sum rows where `NUMBER` is numeric.
3. Exclude `Итого`, `%`, summary, and blank rows.
4. Compare the computed sum with rendered `Итого BALANCE`.
5. If they differ, classify as UI/client movement aggregation or deploy/source mismatch before patching providers.

Known regression fixture:

- Period: `2026-05-05..2026-05-11`
- Wrong rendered total: `-340.5000`
- Visible rows sum: `218.2244`
- Expected total: `218.2244`

## Do not

- Do not use deprecated old repo as production source.
- Do not use `reconcile-v2/` as production source unless explicitly requested.
- Do not change env/secrets.
- Do not claim provider sync works without live/provider verification.
- Do not infer current production state from code only.
- Do not patch business formulas when the live deploy does not include the inspected branch/PR.

## Report format

Return:

- production source proof;
- failing layer;
- changed files;
- checks run;
- live verification;
- risks;
- needs verification;
- whether project memory needs update.
