# Risks - reiki-yggdrasil

## Critical Risks

- Breaking existing home page.
- Breaking RU default interface.
- Breaking route rewrites.
- Breaking Supabase auth/data flows.
- Breaking the three-column layout.

## Data Risks

- Unknown or stale data must stay marked as
  needs verification.
- Data contracts need verification before schema
  changes.

## Deploy Risks

- Vercel, Vite build
- Deploy source and branch need verification
  before production work.

## Security Risks

- Environment variables are names only. Values
  must never be stored.
- Private repo and provider data may be
  sensitive.

## Agent/Codex Risks

- Supabase credentials and seeded data require
  live verification.
- Vercel GitHub App access can block
  import/deploy visibility.
- Layout changes can accidentally collapse the
  accepted three-column desktop structure.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or
  data-flow mappings.
- Do not change production without explicit
  instruction.
