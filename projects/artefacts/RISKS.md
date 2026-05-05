# Risks - artefacts

## Critical Risks

- Unknown private project context.
- Live URL, hosting, deploy source, framework, and branch are not confirmed.
- Applying patterns from `ezohata`, `codex-links`, or `reiki-yggdrasil` without repo-local verification can create the wrong architecture.
- Marketplace/payment/admin assumptions can easily be wrong until the actual Artefacts MVP scope is inspected.

## Data Risks

- Unknown or stale data must stay marked as `needs verification`.
- Artefact data source needs verification before schema or UI changes.
- Data contracts need verification before schema changes.
- Do not assume Supabase, CMS, static JSON, Google Sheets, or provider APIs unless confirmed from repo-local files.
- Do not store private customer, payment, seller, or provider data in memory files.

## Deploy Risks

- Deploy source and branch need verification before production work.
- Hosting provider/project needs verification.
- Preview vs production must be distinguished before claiming live behavior.
- Do not deploy or change production without explicit instruction and verified deployment target.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Private repo and provider data may be sensitive.
- Payment, checkout, contact, admin, or provider credentials must not be inferred or exposed.

## Agent/Codex Risks

- Starting implementation before reading repo-local AGENTS.md/README/STATE/LOG/package/deploy config.
- Reporting guessed framework, routes, data source, hosting, env names, or live status as confirmed.
- Expanding scope from marketplace MVP into a full ecommerce rewrite.
- Rewriting the project instead of making minimal safe fixes.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, framework, schema, payment, or data-flow mappings.
- Do not change production without explicit instruction.
- Do not copy assumptions from sibling projects without verification.
