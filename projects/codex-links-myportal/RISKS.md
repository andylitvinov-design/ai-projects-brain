# Risks - codex-links-myportal

## Critical Risks

- Leaking finance secrets.
- Overwriting dirty local changes.
- Confusing configured code with live provider access.

## Data Risks

- Unknown or stale data must stay marked as needs verification.
- Data contracts need verification before schema changes.

## Deploy Risks

- Cloudflare Pages project codex-links-myportal
- Deploy source and branch need verification before production work.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Repo remote mapping needs verification.
- Dirty local checkout should not be touched for unrelated repo
  creation.
- Provider code path is not the same as live credential verification.
- Binance history has API window limits.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow mappings.
- Do not change production without explicit instruction.
- Do not store finance secrets.
