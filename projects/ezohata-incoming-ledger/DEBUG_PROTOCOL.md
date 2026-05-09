# Debug Protocol — ezohata-incoming-ledger

## Core rule

First prove the failing layer before patching.

Layer chain:

```text
UI → API route → provider/import → normalization → ledger save → balance → analytics
```

Do not patch downstream layers until the upstream layer is checked or explicitly marked `needs verification`.

## Default live probes

```bash
curl -i https://ezohata-incoming-ledger.vercel.app/api/status
curl -i https://ezohata-incoming-ledger.vercel.app/api/debug-health
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD'
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/audit-snapshot?from=YYYY-MM-DD&to=YYYY-MM-DD'
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-analytics?from=YYYY-MM-DD&to=YYYY-MM-DD'
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-balance-reconciliation?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

For every runtime/API issue capture:

```text
URL
method
status
content-type
first 300 chars of body
JSON parse result
current deploy commit/source
recent PRs touching the layer
```

## UI/debug mode

Normal UI should be clean. Debug tools appear only with:

```text
?debug=1
```

Use the full debug copy helper in debug mode when UI/browser state is required.

## Money invariants

```text
paidTotalDisplay = abs(paidTotalSigned)
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

Do not change `Оплатить`, paid totals, balance, or profit semantics without a proven failing layer.

## Balance rule

Likely legacy balance source is private sheet `Остатки` with headers:

```text
дата, канал, сумма, валюта, курс, сумма_usd, комментарий
```

Server endpoints cannot fully prove private `Остатки` rows without browser state or a safe credential path.

## Provider error rule

Provider HTML/plain-text/auth/platform errors must be structured and redacted. Do not expose raw HTML, raw `SyntaxError`, tokens, secrets, cookies, or full provider pages.

## Minimal patch rules

- Do not change secrets/env.
- Prefer max 3 key files per PR unless justified.
- Add regression tests near the changed layer.
- Do not rewrite architecture.
- Do not change finance semantics during observability work.

## Required checks

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build # if package.json defines it
```

## Report format

```text
failing layer
confidence
evidence for
evidence against
changed files
checks
risks
live verification
next action
```
