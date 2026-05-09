# Ezohata Ledger

## Canonical repo

- Repo: `andylitvinov-design/ezohata-incoming-ledger`
- Production: `https://ezohata-incoming-ledger.vercel.app`
- Source of truth for code work: repo root on `main`.
- Do not use stale folders/branches as production source.

## Purpose

Finance/ledger dashboard for EzoHata incoming money, orders, payments, transfers, expenses, balances, analytics, and provider imports.

## Current architecture notes

- Current production flow is legacy manual finance tabs, not a proven ledger-v2 `amount_net` contract.
- Likely balance source of truth: private Google Sheet tab `Остатки`.
- Legacy balance headers: `дата`, `канал`, `сумма`, `валюта`, `курс`, `сумма_usd`, `комментарий`.
- Public source CSV is used as safe read-only source for movement/source rows.
- Provider imports include PayPal, Wise, Binance, and browser-oriented TD Bank flows.

## Debug endpoints

- `/api/status`
- `/api/debug-health`
- `/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `/api/audit-snapshot?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `/api/debug-analytics?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `/api/debug-balance-reconciliation?from=YYYY-MM-DD&to=YYYY-MM-DD`

## UI debug mode

- Normal UI must not show debug tools.
- Debug tools are available with `?debug=1`.
- Full debug copy helper is available in debug mode.

## Money invariants

- `Сумма оплачена` display should be positive.
- Internal paid value may be signed.
- `paidTotalDisplay = abs(paidTotalSigned)`.
- `orders70Percent = ordersTotal * 0.7`.
- `payRemainingSigned = orders70Percent - paidTotalDisplay`.
- `payRemainingDisplay = abs(payRemainingSigned)` for UI display.
- Do not change balance semantics without proving source/layer.

## Debugger rule

First prove the failing layer before patching.

Layer chain:

`UI → API route → provider/import → normalization → ledger save → balance → analytics`

## Verification commands

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build # if package.json defines it
```

## Live checks

```bash
curl -i https://ezohata-incoming-ledger.vercel.app/api/status
curl -i https://ezohata-incoming-ledger.vercel.app/api/debug-health
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

## Remaining high-value work

- Full live verification of `/api/debug-full` responses.
- Stronger analytics period guard for private manual finance rows.
- Full balance reconciliation from `Остатки` / browser state.
- Provider hardening for any remaining routes with non-JSON responses.
