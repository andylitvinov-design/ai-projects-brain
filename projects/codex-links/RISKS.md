# Risks - codex-links

## Critical Risks

- Breaking command lifecycle.
- Breaking Slack delivery.
- Breaking report rendering.
- Breaking Cloudflare KV contracts.
- Breaking codex-save diagnostics.

## Data Risks

- Unknown or stale data must stay marked as needs
  verification.
- Data contracts need verification before schema changes.

## Deploy Risks

- Cloudflare Pages projects codex-links and related
  codex-save
- Deploy source and branch need verification before
  production work.

## Security Risks

- Environment variables are names only. Values must never be
  stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Cloud delivery can be fixed in repo while external
  worker/account linkage remains blocked.
- Release deploys require version triplet alignment.
- DNS/network reachability can block report verification.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow
  mappings.
- Do not change production without explicit instruction.
