# Data Schema — ezohata-incoming-ledger

## Current contract status

Current production is legacy manual finance tabs. A ledger-v2 `amount_net` contract is not proven in production.

Treat `amount_net` as `needs verification` unless a concrete v2 ledger source is found and reconciled.

## Core source areas

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

## Legacy balance source

Likely source of truth:

```text
Остатки
```

Headers:

```text
дата, канал, сумма, валюта, курс, сумма_usd, комментарий
```

## Legacy transfer rows

Headers:

```text
дата перевода, кто, сумма, валюта, канал куда, курс, сумма в долларах
```

## Legacy expense rows

Rows are stored by date/category and channel columns.

Known categories include:

```text
now
serviceIncome
business
flat
food
fun
study
travel
exchange
```

## Legacy money rows / analytics rows

Common fields:

```text
channel
now
nowUsd
serviceIncome
business
flat / house
food
fun
study
travel / travelFun
total
exchange
totalUsd
```

## Provider entry fields

Provider import rows should preserve:

```text
id
date
channel
direction
localAmount
currency
usdAmount
suggestedCategory
organization
confidence
source
sourceTransactionId
feeAmount
feeCurrency
```

Provider direction/sign semantics must not be changed without proof.

## Money invariants

```text
paidTotalDisplay = abs(paidTotalSigned)
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

`Сумма оплачена` is displayed positive even if the source/internal value is signed.

## Debug snapshot contracts

`/api/audit-snapshot` exposes a `summary` section with safe values or `needs_verification`.

`/api/debug-analytics` may use public source CSV for period row splits but must not fake money totals.

`/api/debug-balance-reconciliation` identifies likely source `Остатки`, but full private sheet reconciliation needs browser state or a safe credential path.

## Provider error contract

Provider non-JSON responses must become structured JSON or clear route errors with short redacted excerpts.

Do not expose:

```text
raw HTML
raw SyntaxError
Bearer tokens
client secrets
refresh tokens
cookies
full provider pages
```
