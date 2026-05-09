# System Map — ezohata-incoming-ledger

## Production identity

- Production URL: `https://ezohata-incoming-ledger.vercel.app`
- Canonical repo: `andylitvinov-design/ezohata-incoming-ledger`
- Hosting: Vercel
- Source of truth for code work: repo root on `main`

## Debug-first flow

```text
User report / screenshot
→ /api/status
→ /api/debug-health
→ /api/debug-full?from=&to=
→ /api/audit-snapshot?from=&to=
→ /api/debug-analytics?from=&to=
→ /api/debug-balance-reconciliation?from=&to=
→ prove failing layer
→ minimal patch
```

## Runtime layer chain

```text
UI → API route → provider/import → normalization → ledger save → balance → analytics
```

First prove the failing layer before patching.

## Data flow

```text
Google Sheets private manual finance tabs
+ public source CSV
+ provider APIs / browser imports
→ API routes and browser state
→ legacy manual finance rows
→ movement/orders/payouts/analytics tables
→ UI metric cards and tabs
```

## Current data model

The current production app is legacy manual finance tabs, not a proven ledger-v2 `amount_net` contract.

Known source areas:

```text
fact
Расходы
Переводы
Остатки
Комиссии
public source CSV
```

Likely balance source of truth:

```text
Остатки
```

Legacy balance headers:

```text
дата, канал, сумма, валюта, курс, сумма_usd, комментарий
```

## Debug endpoints

```text
/api/status
/api/debug-health
/api/debug-full
/api/audit-snapshot
/api/debug-analytics
/api/debug-balance-reconciliation
```

## Provider areas

```text
PayPal REST/MCP
Wise API
Binance API
TD Bank browser/import helper — route mapping needs verification
```

Provider non-JSON rule:

```text
HTML/plain text/auth/platform provider errors must become structured JSON with short redacted excerpt.
```

## UI debug mode

- Normal URL: no debug tools.
- `?debug=1`: debug tools are visible.
- Full debug helper can copy browser state + `/api/debug-full` response.

## Critical invariants

```text
paidTotalDisplay = abs(paidTotalSigned)
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

## Remaining unknowns

- Full private-sheet balance reconciliation from `Остатки`: needs browser state or safe credential path.
- `amount_net` ledger-v2 contract in production: not proven.
- TD Bank route mapping: needs verification.
