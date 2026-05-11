# DEBUG_PLAYBOOK — ezohata-incoming-ledger

This playbook is the first stop for production debugging of the Ezohata Incoming Ledger app.

## Project routing

Use this playbook for reports about:

- balance;
- movement / `Движение средства`;
- fact / plan / analytics;
- PayPal, Wise, Яндекс, Monobank, TD Bank, Binance imports;
- manual finance workbook;
- Vercel production deployment;
- Google Sheets OAuth for editing manual tabs.

## Production source-of-truth preflight

Before patching any live bug, collect and report:

1. Live URL: `https://ezohata-incoming-ledger.vercel.app/`.
2. `/api/status` response:
   - status;
   - commit SHA;
   - branch/ref;
   - build/version;
   - Google read status if present.
3. Vercel production deployment:
   - deploy id;
   - branch/ref;
   - commit SHA;
   - production alias target.
4. GitHub:
   - canonical repo;
   - default branch HEAD;
   - open PRs touching the failing layer.
5. Classification:
   - `source ok`;
   - `deploy/source-of-truth mismatch`;
   - `needs verification`.

If production is serving a stale feature branch or a commit that does not include the relevant PR, fix/deploy source first.

## Live debug commands

Use the live app endpoints when available:

```bash
curl -s https://ezohata-incoming-ledger.vercel.app/api/status
curl -s 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=2026-05-05&to=2026-05-11'
curl -s 'https://ezohata-incoming-ledger.vercel.app/api/debug-analytics?from=2026-05-05&to=2026-05-11'
```

If browser state is required, use debug mode and inspect:

```js
const values = state.data?.tabs?.movement?.values || [];
const header = values[0] || [];
const balanceIndex = header.findIndex((cell) => /balance|баланс/i.test(String(cell || "")));
const totalRow = values.slice(1).find((row) => /итого/i.test(String(row?.[0] || "")));
const visibleSum = values
  .slice(1)
  .filter((row) => /^\d+$/.test(String(row?.[0] || "").trim()))
  .reduce((sum, row) => sum + Number(String(row?.[balanceIndex] || 0).replace(",", ".")), 0);
console.log({ balanceIndex, totalBalance: totalRow?.[balanceIndex], visibleSum });
```

## Movement total invariant

For `Движение средства`:

- the rendered `Итого` row under `BALANCE` must equal the sum of visible numeric `NUMBER` rows for the selected period;
- rows after `Итого` and `%` must not be included;
- if visible rows sum differs from the total row, the failing layer is UI/client movement aggregation or deploy/source mismatch until proven otherwise.

Known incident fixture:

```text
Period: 2026-05-05..2026-05-11
Visible BALANCE rows sum: 218.2244
Wrong rendered total: -340.5000
Expected rendered total: 218.2244
```

## Google OAuth button rule

Google OAuth controls are expected only on manual/editing tabs:

- `manualFinance` / fact;
- `expenseAccounting`;
- `savings`;
- `orders`.

`Движение средства` is server-loaded and does not require Google OAuth. Do not treat hidden Google controls on movement as a regression unless the product requirement changes.

## Provider/import checks

For PayPal, Wise, bank, Monobank, TD, Binance:

- prove REST/OAuth response;
- check provider permissions;
- check env var presence by name only, never values;
- inspect fallback path REST -> MCP when relevant;
- keep `sourceTransactionId`, `direction`, `gross`, `fee`, `net`, `amount_net`, `amount_usd`, and `source` semantics stable;
- non-JSON provider responses must become structured `{ ok:false, error }` responses.

## Minimal safe fix policy

- Patch no more than 3 key files without explicit reason.
- Prefer final render/aggregation guard for UI total bugs.
- Do not rewrite finance architecture.
- Add regression tests using the exact screenshot/incident fixture.
- Separate runtime fix from data migration/backfill.

## Required checks before PR or deploy

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build
```

If a command is absent in the target repo, report it as `needs verification` rather than inventing a replacement.

## Definition of Done for production bugs

- failing layer proven;
- production source-of-truth proven;
- minimal patch merged;
- regression tests added;
- production deployed from expected branch/commit;
- live verification screenshot or endpoint output captured;
- `DEBUG_LOG.md`, `RISKS.md`, and `CHECKS.md` updated when the incident creates a new guardrail.
