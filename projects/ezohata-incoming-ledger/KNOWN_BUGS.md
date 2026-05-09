# Known Bugs / Risks — ezohata-incoming-ledger

## Current debugger baseline

Use `/api/debug-full?from=&to=` as the first machine-readable probe for future bugs.

## Critical known risks

### Balance source not fully server-proven

Likely source of truth:

```text
Остатки
```

But the server cannot fully prove private `Остатки` rows without browser state or a safe credential path.

Severity: critical  
Layer: balance / ledger save

### `amount_net` is not proven in current legacy flow

Current production model is legacy manual finance tabs. Do not assume ledger-v2 `amount_net` contract exists in production.

Severity: critical  
Layer: balance / data contract

### Paid total sign display

`Сумма оплачена` should display positive even if internal/source value is signed.

Invariant:

```text
paidTotalDisplay = abs(paidTotalSigned)
```

Severity: medium  
Layer: UI display

### Pay remaining formula

Invariant:

```text
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

Severity: high  
Layer: analytics / UI display

### Analytics period leak risk

Old class of bugs: selected week in UI but calculations use all-time totals.

Use:

```text
/api/debug-analytics?from=&to=
```

Check:

```text
rowsInsidePeriod
rowsOutsidePeriod
allTimeLeakDetected
fieldsUsingAllTime
```

Severity: high  
Layer: analytics / UI

### Provider non-JSON errors

Provider HTML/plain text/auth/platform responses must not surface as raw HTML or `Unexpected token ...`.

Known state:

- PayPal hardened.
- Binance hardened.
- Wise hardened.
- TD Bank route mapping needs verification.

Severity: high  
Layer: provider/import

### Deploy/source mismatch

Always verify current deploy commit before patching.

Use:

```text
/api/status
/api/debug-health
```

Severity: high  
Layer: deploy/source of truth

## Stale source risks

Do not use stale branches, old folders, or older repo mappings without proving current production source.

Canonical code repo now:

```text
andylitvinov-design/ezohata-incoming-ledger
```
