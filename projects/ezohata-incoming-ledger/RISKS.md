# Risks - ezohata-incoming-ledger

## Critical Risks

- Breaking Google Sheets OAuth.
- Breaking provider import routes.
- Breaking manual finance formulas.
- Breaking ledger data contract or balance/channel analytics.
- Using the wrong Vercel deploy source.
- Confusing canonical `andylitvinov-design/finance` with old/deprecated repositories.

## Data Risks

- Unknown or stale data must stay marked as `needs verification`.
- Data contracts need verification before schema changes.
- Manual finance formulas have sensitive rules around `Остатки`, `Расходы`, `СТАЛО`, `now`, transfers, payouts, fees, exchange, and channel math.
- Provider data may have gross/net/fee semantics. Do not change these without tests and clear evidence.
- Do not claim provider sync works live when only code paths or env names are present.

## Deploy Risks

- Hosting is listed as Vercel project `ezohata-incoming-ledger`.
- Deploy source and branch need verification before production work.
- Production alias can point to the wrong project or commit if not checked.
- Preview and production must be distinguished before live claims.
- Use `/api/status`, `/api/audit-snapshot`, commit/deploy metadata, or documented health checks when available.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Known env names include PayPal, Wise, Google, and OpenAI variables listed in PROJECT.md.
- Provider credentials, OAuth tokens, refresh tokens, private keys, and raw private financial payloads must not be exposed in docs, logs, issues, commits, or PRs.

## Agent/Codex Risks

- Legacy `reconcile-v2/` and old repo can mislead agents into using the wrong production source.
- Provider imports depend on configured Vercel env variables.
- Treating `code path exists` as `credentials configured` or `live sync verified`.
- Skipping `npm test`, `npm run build`, or `npm run release-guard` before PR.
- Updating UI without checking underlying finance aggregation/data contract.
- Rewriting finance logic instead of making a minimal safe fix.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, deploy source, or data-flow mappings.
- Do not change production without explicit instruction.
- Do not use legacy `reconcile-v2/` as production source.
- Do not treat old repositories as production source unless explicitly verified.
