# Risks - brain-management

## Critical Risks

- Reporting stale data.
- Mixing sibling repos into the management boundary.
- Skipping the fixed morning report sequence.

## Data Risks

- Unknown or stale data must stay marked as needs
  verification.
- Data contracts need verification before schema changes.

## Deploy Risks

- Cloudflare Pages
- Deploy source and branch need verification before
  production work.
- GitHub Actions may fail before the first repository step and expose
  `steps=null` with unavailable `BlobNotFound` logs. Repeated pre-step
  failures are an external CI-reachability blocker, not evidence that the
  branch code is invalid or safe to merge. Preserve the exact head SHA,
  avoid duplicate recovery PRs, and hand the existing PR to PR Delivery
  Sweep until required checks can run or a repository-policy-approved
  deterministic replacement is available.

## Security Risks

- Environment variables are names only. Values must never be
  stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Morning report publish/API verification can fail on
  codex-links.pages.dev DNS/network reachability.
- Agents sometimes verify dashboard JSON from the wrong root
  path.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow
  mappings.
- Do not change production without explicit instruction.
