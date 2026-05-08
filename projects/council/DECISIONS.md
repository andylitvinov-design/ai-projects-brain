# DECISIONS — council

> Architecture decisions and guardrails for SIA Council local MVP app.

## Current boundary

- Canonical repo: `andylitvinov-design/council`.
- Default branch is `codex/agent-work`, not `main`.
- Product-specific state is not yet confirmed.

## Branch rule

- Verify branch before editing.
- Use default branch unless user explicitly requests another branch.
- Do not assume production branch equals `main`.

## Project state

- README is generic create-next-app, so it is not enough to understand product requirements.
- Inspect app files and any repo-local state/docs before implementation.

## Deployment

- No live URL is confirmed.
- Do not claim deployment status without verifying hosting provider and deploy source.

## Main formula

**Council is an early/private Next.js MVP candidate. Verify branch, app structure, and deploy target before making product or production claims.**
