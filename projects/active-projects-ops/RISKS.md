# Risks - active-projects-ops

## Critical Risks
- Mixing independent project contexts.

## Data Risks
- Unknown or stale data must stay marked as needs verification.
- Data contracts need verification before schema changes.

## Deploy Risks
- needs verification
- Deploy source and branch need verification before production work.

## Security Risks
- Environment variables are names only. Values must never be stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks
- Shared repo, not necessarily one project per root.

## Do Not Do
- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow mappings.
- Do not change production without explicit instruction.
