# Risks - ezohata-incoming-ledger

## Critical Risks

- Breaking Google Sheets OAuth.
- Breaking provider import routes.
- Breaking manual finance formulas.
- Breaking ledger data contract or balance/channel analytics.
- Using the wrong Vercel deploy source.
- Confusing canonical `andylitvinov-design/finance` with old/deprecated repositories.
- Patching code before proving production source of truth.

## Data Risks

- Unknown or stale data must stay marked as `needs verification`.
- Data contracts need verification before schema changes.
- Manual finance formulas have sensitive rules around `Остатки`, `Расходы`, `СТАЛО`, `now`, transfers, payouts, fees, exchange, and channel math.
- Provider data may have gross/net/fee semantics. Do not change these without tests and clear evidence.
- Do not claim provider sync works live when only code paths or env names are present.

## Deploy Risks

- Hosting is listed as Vercel project `ezohata-incoming-ledger`.
- Deploy source and branch need verification before production work.
- Production alias can point to the wrong project, stale feature branch, or old commit if not checked.
- Preview and production must be distinguished before live claims.
- Use `/api/status`, `/api/audit-snapshot`, commit/deploy metadata, or documented health checks when available.
- If production is not serving the inspected branch/commit, classify the issue as `deploy/source-of-truth mismatch` and stop formula/UI patching until deployment is aligned.

## Known Incident Risks

### Movement total stale source risk

- Pattern: `Движение средства` visible rows under `BALANCE` do not match the rendered `Итого` row.
- Example: visible rows sum `218.2244`, rendered total `-340.5000`.
- Primary prevention: verify production deploy source first, then enforce visible-row total in movement aggregation/render.
- Guard: regression fixture must assert `-340.5000 -> 218.2244` for period `2026-05-05..2026-05-11`.

### Open fix not deployed risk

- Pattern: a PR contains the intended fix but live production still shows old behavior.
- Prevention: every live bug report must include PR status, merge status, deploy commit, and production branch/ref before any new patch.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Known env names include PayPal, Wise, Google, and OpenAI variables listed in PROJECT.md.
- Provider credentials, OAuth tokens, refresh tokens, private keys, and raw private financial payloads must not be exposed in docs, logs, issues, commits, or PRs.

## Agent/Codex Risks

- Legacy `reconcile-v2/` and old repo can mislead agents into using the wrong production source.
- Provider imports depend on configured Vercel env variables.
- Treating `code path exists` as `credentials configured` or `live sync verified`.
- Skipping `node --test tests/*.test.*`, `bash scripts/release-guard.sh`, or `npm run build` before PR.
- Updating UI without checking underlying finance aggregation/data contract.
- Rewriting finance logic instead of making a minimal safe fix.
- Debugging screenshots without checking production commit/branch.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, deploy source, or data-flow mappings.
- Do not change production without explicit instruction.
- Do not use legacy `reconcile-v2/` as production source.
- Do not treat old repositories as production source unless explicitly verified.
- Do not patch business formulas when production is serving a stale branch or does not include the intended fix.
