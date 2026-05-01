# Risks - ezohata-incoming-ledger

## Critical Risks

- Breaking Google Sheets OAuth.
- Breaking provider import routes.
- Breaking manual finance formulas.
- Using the wrong Vercel deploy source.

## Data Risks

- Unknown or stale data must stay marked as
  needs verification.
- Data contracts need verification before schema
  changes.

## Deploy Risks

- Vercel project ezohata-incoming-ledger
- Deploy source and branch need verification
  before production work.

## Security Risks

- Environment variables are names only. Values
  must never be stored.
- Private repo and provider data may be
  sensitive.

## Agent/Codex Risks

- Legacy reconcile-v2/ and old repo can mislead
  agents into using the wrong production source.
- Provider imports depend on configured Vercel
  env variables.
- Older ledger behavior has sensitive rules
  around Остатки, Расходы, СТАЛО, now,
  transfers, and payout math.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or
  data-flow mappings.
- Do not change production without explicit
  instruction.
- Do not use legacy reconcile-v2 as production
  source.
