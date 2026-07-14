# Code Access — Psihotavr

## Canonical access

- repository: https://github.com/andylitvinov-design/psihotavr
- canonical branch: `main`
- production URL: https://psihotavr.vercel.app
- hosting provider: Vercel; current project/deployment metadata must be verified before production claims

## Read-first files

1. Repository `AGENTS.md`, `README.md`, `STATE.md`, and `LOG.md` when present.
2. `package.json` and `vercel.json`.
3. The route/component/data files directly involved in the task.
4. Current open/recent PRs and current `main` before creating work.

## Delivery rules

- Work from fresh `main` on a focused branch.
- Reuse an existing relevant PR when possible.
- Historical PRs merged into non-main branches are not production evidence.
- Salvage only current safe hunks; never merge a stale feature branch wholesale.
- Run available test, typecheck, lint, and build commands on the final commit.
- For UI changes, verify clean session, legacy persisted state, clicked state, desktop, and mobile.
- For live claims, identify deploy ID, source branch, source commit, alias, and observed route behavior.

## Restricted boundaries

Do not read, print, copy, or commit secret values. Environment-variable names may be documented, but provider configuration, auth/payment changes, production data, irreversible migrations, and billing/account changes require the appropriate safe/provider workflow.

## Known access uncertainty

Current Vercel source commit, authenticated admin/cabinet access, backend persistence, and external provider readiness are `needs verification` until fresh evidence is recorded.
