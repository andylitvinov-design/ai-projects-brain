# CHECKS — psitrends

> Verification guide for the multi-repository PsiTrends project.

## Agent entry

Use this project for `psitrends`, `PsiTrends`, `psitrends.com`, the public site,
its release operations, or its acquisition/editorial coordination.

## Resolve the repository by role

- Public client/content source and release QA: `andylitvinov-design/sales`, branch
  `codex/bootstrap-sales`.
- Sanitized production operations, backup and rollback tooling:
  `andylitvinov-design/psitrends-ops`.
- Coordination, catalog, editorial and acquisition work:
  `andylitvinov-design/psitrends-work`.
- Canonical production: https://psitrends.com, running Joomla on Hetzner.
- `https://psitrends.pages.dev` is historical/noncanonical evidence, not the
  current production target.

Do not treat an operations or coordination repository as a separate product.

## Before a change

1. Select the repository that owns the requested surface.
2. Read that repository's `AGENTS.md`, README and release instructions.
3. Record the pre-change production state and a rollback point.
4. For content/client changes, confirm the exact source file and deployment
   path from `sales` to Joomla.
5. For server work, use only the sanitized procedures in `psitrends-ops`; do
   not copy credentials, live databases, private backups or user data.

## Required checks

- Verify the canonical root and representative EN/RU routes on
  https://psitrends.com.
- Check navigation, responsive overflow, assets, canonical URLs and hreflang
  where the change touches them.
- For a release, record source branch/SHA, backup reference, applied files,
  cache purge scope, production re-read and rollback result.
- Keep the exact currently deployed source SHA as `NEEDS_VERIFICATION` until a
  release record or provider evidence binds it to production.

## Do not

- Do not publish to the historical Pages alias as if it were canonical.
- Do not invent npm/framework commands for the Joomla production site.
- Do not change secrets, production data or financial records.
- Do not claim a live or metric effect from a repository change without a
  canonical production re-read and attributable source evidence.

## Report format

Return the selected repository and role, source branch/SHA, changed files,
checks, production evidence, rollback state and remaining verification gaps.
