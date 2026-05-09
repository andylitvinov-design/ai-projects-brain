# Codex Brief — ezohata-incoming-ledger

## Project identity

- Repo: `andylitvinov-design/ezohata-incoming-ledger`
- Production URL: `https://ezohata-incoming-ledger.vercel.app`
- Hosting: Vercel
- Production source: repo root on `main`
- Roadmap issue: `https://github.com/andylitvinov-design/ezohata-incoming-ledger/issues/49`

Do not use stale repo mappings, old branches, or legacy folders as production source unless deploy/source is proven first.

## Core rule

First prove the failing layer before patching.

Layer chain:

```text
UI → API route → provider/import → normalization → ledger save → balance → analytics
```

## Start every debug task with source-of-truth checks

Use these first:

```bash
curl -i https://ezohata-incoming-ledger.vercel.app/api/status
curl -i https://ezohata-incoming-ledger.vercel.app/api/debug-health
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

Then, if needed:

```bash
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/audit-snapshot?from=YYYY-MM-DD&to=YYYY-MM-DD'
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-analytics?from=YYYY-MM-DD&to=YYYY-MM-DD'
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-balance-reconciliation?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

For each live/API check capture:

```text
URL
method
status
content-type
first 300 chars of body
JSON parse result
commit/source metadata
```

## Current data model

Current production model is legacy manual finance tabs. Do not assume a ledger-v2 `amount_net` contract exists in production.

Known legacy tabs/sources:

```text
fact
Расходы
Переводы
Остатки
Комиссии
public source CSV
provider imports
browser debug state
```

Likely balance source:

```text
Остатки
```

Legacy balance headers:

```text
дата, канал, сумма, валюта, курс, сумма_usd, комментарий
```

## Money invariants

```text
paidTotalDisplay = abs(paidTotalSigned)
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

`Сумма оплачена` should display positive. Do not change the `Оплатить` formula without proving the calculation layer is wrong.

## UI debug mode

Normal URL: no debug controls.

Debug tools are available only with:

```text
?debug=1
```

Use full debug copy in debug mode when a bug depends on browser state or visible UI cards.

## Provider rules

Provider non-JSON responses must become structured/clear JSON errors with short redacted excerpts. Do not expose raw HTML, raw SyntaxError, tokens, secrets, cookies, or full provider pages.

Known state:

- PayPal: text/non-JSON handling and redaction present.
- Binance: text/non-JSON handling and redaction present.
- Wise: text/non-JSON handling and redaction present.
- TD Bank: route mapping needs verification.

## Files to inspect first

```text
AGENTS.md
api/status.js
api/debug-health.js
api/debug-full.js
api/audit-snapshot.js
api/debug-analytics.js
api/debug-balance-reconciliation.js
api/paypal-transactions.js
api/wise-transactions.js
api/binance-transactions.js
index.html
finance.js
google-sheets.js
balance-debug-helper.js
full-debug-helper.js
paid-total-display-sign-fix.js
```

## Constraints

- Do not change secrets/env values.
- Do not rewrite architecture.
- Do not change finance semantics unless root cause is proven.
- Do not change balance logic while working on observability.
- Prefer max 3 key files per PR unless justified.
- Add regression tests near the changed layer.

## Required checks

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build # if package.json defines it
```

If a check cannot be run, report it as not run. Do not imply it passed.

## Standard Codex output

```text
failing layer
confidence
evidence for
evidence against
changed files
checks run
risks
live verification commands/results
remaining needs verification
next recommended PR
```
