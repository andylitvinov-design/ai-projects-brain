# Data Schema - ezohata-incoming-ledger

## 1. Main Data Entities

- ledger row
- provider transaction
- fee record
- payout/payment record
- dashboard aggregate
- exchange-rate-derived amount
- needs verification

## 2. Canonical Fields

| field      | meaning                              | source                        | required           | notes                                                            |
| ---------- | ------------------------------------ | ----------------------------- | ------------------ | ---------------------------------------------------------------- |
| gross      | original gross payment amount        | ledger/provider import        | needs verification | exact current field name needs verification                      |
| fee        | provider or processing fee           | ledger/provider import        | needs verification | provider-like rails require verification when fee/net is missing |
| net        | amount after fee                     | ledger/provider import        | needs verification | may equal gross only for direct/no-fee payments when verified    |
| amount_usd | normalized USD amount                | ledger or derived calculation | needs verification | exchange handling needs verification                             |
| exchange   | exchange rate or conversion metadata | ledger/config/provider        | needs verification | exact contract needs verification                                |

## 3. Data Contracts

- Ledger is the source of truth for visible
  finance analytics unless a newer verified
  source replaces it.
- gross, fee, and net relationships must not be
  guessed for provider-like rails.
- Exact current schema and formulas need
  verification before changing production
  behavior.

## 4. Storage

- Google Sheets: needs verification
- JSON/config files: needs verification
- Provider APIs: names listed in inventory; live
  access needs verification

## 5. Derived Data

- net may derive from gross minus fee when the
  row contract confirms it.
- amount_usd may derive from source amount and
  exchange when the conversion contract confirms
  it.
- Dashboard aggregates derive from ledger rows;
  exact current path needs verification.

## 6. Validation Rules

- Do not accept missing fee/net for
  provider-like rails without verification.
- Preserve sensitive rules around balances,
  expenses, transfers, and payout math.
- Exact required fields need verification.

## 7. Migration Notes

- Do not use legacy reconcile-v2 as production
  source.
- Keep sheet-config.json, release version, and
  live deploy source aligned.
- Exact schema migration steps need
  verification.
