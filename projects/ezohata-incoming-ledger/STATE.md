# Project State — ezohata-incoming-ledger

## Current production identity

- Canonical repo: `andylitvinov-design/ezohata-incoming-ledger`
- Production URL: `https://ezohata-incoming-ledger.vercel.app`
- Hosting: Vercel
- Source of truth: repo root on `main`

Do not use old/stale repo mappings or legacy folders without proving current deploy source first.

## Current debugger baseline

The project now has production debugger infrastructure:

```text
/api/status
/api/debug-health
/api/debug-full?from=&to=
/api/audit-snapshot?from=&to=
/api/debug-analytics?from=&to=
/api/debug-balance-reconciliation?from=&to=
```

Default first probe for bugs:

```bash
curl -i 'https://ezohata-incoming-ledger.vercel.app/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD'
```

## Current data model

- Current production flow is legacy manual finance tabs.
- Ledger-v2 `amount_net` is not proven in production.
- Likely balance source: private Google Sheet tab `Остатки`.
- Full server-side balance reconciliation needs browser state or a safe credential path.

## Recent completed work

- Debug protocol/docs and AGENTS rules.
- Runtime observability endpoints.
- `/api/debug-full` aggregator.
- Audit summary with paid/pay remaining formulas.
- Analytics period guard using public source CSV.
- Browser full debug helper behind `?debug=1`.
- Paid total display sign fix.
- Wise non-JSON provider hardening.

## Current high-priority risks

- Full private `Остатки` reconciliation still needs verification.
- `amount_net` contract remains unproven in legacy flow.
- TD Bank route mapping needs verification.
- Always verify live deploy/source before patching.

## Next actions

- Use `/api/debug-full` first for user bug reports.
- If balance differs, request/collect `?debug=1` full browser debug JSON.
- For analytics bugs, inspect `/api/debug-analytics` row splits and browser state.
- For provider bugs, check provider structured errors and route-specific response parsing.

## Verification commands

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build # if package.json defines it
```
