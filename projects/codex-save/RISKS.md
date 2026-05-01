# Risks - codex-save

## Critical Risks

- Triggering real commands unintentionally.

## Data Risks

- Unknown or stale data must stay marked as needs verification.
- Data contracts need verification before schema changes.

## Deploy Risks

- Cloudflare Pages project codex-save
- Deploy source and branch need verification before production work.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Remediation creates real codex-links agent commands; it does not push directly to main.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow mappings.
- Do not change production without explicit instruction.
