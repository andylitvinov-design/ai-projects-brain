# DECISIONS — psitrends

> Architecture decisions and guardrails for PsiTrends.

## Current boundary — 2026-09-26

PsiTrends is one project identity with three repositories separated by role:

- `andylitvinov-design/sales` is the public client/content source and release
  QA repository; the relevant branch is `codex/bootstrap-sales`.
- `andylitvinov-design/psitrends-ops` owns sanitized Joomla/Hetzner operations,
  backups, release and rollback procedures.
- `andylitvinov-design/psitrends-work` owns coordination, catalog, editorial
  and acquisition work and is not a runnable production application.

Canonical production is https://psitrends.com on Joomla/Hetzner.
`https://psitrends.pages.dev` is a historical, noncanonical alias.

## Durable decisions

- The new operations repository does not create an eleventh operational
  project identity.
- Repository selection is task-role based; no single repository is allowed to
  impersonate the whole project topology.
- Production work requires a before-state, backup/rollback reference, scoped
  application and canonical post-release re-read.
- The exact source SHA currently deployed to production remains
  `NEEDS_VERIFICATION`; reachable pages alone do not prove source attribution.
- Documentation or repository topology changes are `NO_DIRECT_METRIC_EFFECT`.

## Secrets and private data

- Keep credentials, production databases, private backups and user data out of
  all repositories and durable memory.
- Store only sanitized procedures, paths, environment variable names and
  evidence references.

## Main formula

**One PsiTrends identity, role-specific repositories, one canonical Joomla
production target, and no live/effect claim without attributable production
evidence.**
