# Risks - codex-daily-backups

## Critical Risks

- Accidentally exposing private/sensitive data.

## Data Risks

- Unknown or stale data must stay marked as needs verification.
- Data contracts need verification before schema changes.

## Deploy Risks

- GitHub repository
- Deploy source and branch need verification before production work.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Sensitive projects may be encrypted-only or skipped from plaintext
  backups.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow mappings.
- Do not change production without explicit instruction.
