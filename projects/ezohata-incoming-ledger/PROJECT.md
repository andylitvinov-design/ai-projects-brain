# ezohata-incoming-ledger

## 1. Purpose

Production finance/ledger dashboard for EzoHata incoming orders, payments, transfers, expenses, balances, provider imports, and analytics.

## 2. Canonical repo and live URL

- canonical repo: `andylitvinov-design/ezohata-incoming-ledger`
- production URL: `https://ezohata-incoming-ledger.vercel.app`
- hosting: Vercel
- source of truth for code work: repository root on `main`
- issue roadmap: `https://github.com/andylitvinov-design/ezohata-incoming-ledger/issues/49`

Do not use stale folders, old branches, or older finance/reconcile repos as production source unless live deploy/source is proven first.

## 3. Current production model

The current production flow is legacy manual finance tabs, not a proven ledger-v2 `amount_net` contract.

Known legacy source areas:

- `fact`
- `Расходы`
- `Переводы`
- `Остатки`
- `Комиссии`
- public source CSV used for movement/source rows
- provider imports: PayPal, Wise, Binance, browser-oriented TD Bank helpers

Likely balance source of truth: private Google Sheet tab `Остатки`.

Legacy balance headers:

```text
дата, канал, сумма, валюта, курс, сумма_usd, комментарий
```

## 4. Debug endpoints

Use these as the default first probes before patching:

```text
/api/status
/api/debug-health
/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD
/api/audit-snapshot?from=YYYY-MM-DD&to=YYYY-MM-DD
/api/debug-analytics?from=YYYY-MM-DD&to=YYYY-MM-DD
/api/debug-balance-reconciliation?from=YYYY-MM-DD&to=YYYY-MM-DD
```

Recommended first live check:

```bash
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

## 5. UI debug mode

Normal UI should not show debug tools.

Debug tools are available only with:

```text
?debug=1
```

In debug mode, the browser can copy a full debug snapshot combining browser state and `/api/debug-full`.

## 6. Money invariants

- `Сумма оплачена` display should be positive.
- Internal paid value may be signed.
- `paidTotalDisplay = abs(paidTotalSigned)`.
- `orders70Percent = ordersTotal * 0.7`.
- `payRemainingSigned = orders70Percent - paidTotalDisplay`.
- `payRemainingDisplay = abs(payRemainingSigned)` for UI display.
- Do not change balance or payout semantics unless the failing layer is proven.

## 7. Provider error rule

Provider routes must convert non-JSON provider/platform responses into structured JSON errors with a short redacted excerpt.

Do not expose raw HTML, raw `SyntaxError`, bearer tokens, client secrets, refresh tokens, cookies, or full provider pages.

Known state:

- PayPal has text/non-JSON handling and redaction.
- Binance has text/non-JSON handling and redaction.
- Wise was hardened to read text first and return redacted non-JSON context.
- TD Bank route/file mapping needs verification.

## 8. Root-cause debugging rule

First prove the failing layer before patching.

Layer chain:

```text
UI → API route → provider/import → normalization → ledger save → balance → analytics
```

For runtime/API bugs, capture:

```text
endpoint URL
method
status
content-type
first 300 chars of body
how code parses response
current deploy commit/source of truth
recent PRs touching the layer
```

## 9. Verification commands

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build # if package.json defines it
```

## 10. Recent debugger work

Recent merged app work established debugger infrastructure:

- debug protocol and docs
- `/api/status`
- `/api/debug-health`
- `/api/debug-full`
- `/api/audit-snapshot` with summary formulas
- `/api/debug-analytics` with public source CSV period guard
- `/api/debug-balance-reconciliation` with `Остатки` source discovery
- browser full debug copy helper behind `?debug=1`
- paid total display sign fix
- Wise non-JSON provider hardening

## 11. Remaining risks

- Full balance reconciliation from private `Остатки` rows still needs browser state or safe credential path.
- Private manual finance rows are not fully available to server endpoints without auth.
- `amount_net` is not proven in the current legacy flow.
- Provider route coverage for TD Bank needs verification.
- Live endpoint responses should be checked before claiming current production behavior.

## 12. Next actions

- Use `/api/debug-full` as default first probe for future bugs.
- Improve private/browser balance reconciliation when a concrete balance discrepancy appears.
- Continue provider hardening only after locating exact route/source.
- Keep this memory updated after meaningful Ezohata Ledger PRs.
