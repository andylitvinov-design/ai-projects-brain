# Risks — PsiTrends

## Critical

- Wrong repository chosen for public source, operations or coordination.
- Production mutation without a fresh backup, exact before-state and rollback.
- Public behavior treated as exact source-SHA proof.

## Data and security

- Joomla/MySQL content and live environment exports may contain sensitive data and secrets.
- Backup bundles stay private and outside Git.
- Privacy/analytics changes require independent review and consent verification.

## Delivery

- Preserve EN/RU counterpart routes and legacy content.
- Purge only scoped caches; do not use a global Redis flush.
- Verify desktop, genuine mobile, source artifact and rollback after release.
- User-visible release without an assigned same-source metric receives zero dashboard effect credit.

## Identity

- `sales`, `psitrends-ops` and `psitrends-work` are one project topology, not three products.
- Historical `psitrends.pages.dev` is not canonical production.
