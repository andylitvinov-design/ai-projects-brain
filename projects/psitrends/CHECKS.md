# CHECKS — psitrends

> Verification guide for PsiTrends project work.

## Agent Entry

Use this project for: psitrends, PsiTrends site, psitrends.pages.dev.

## Current verification status

- Repo: `andylitvinov-design/psitrends-work`.
- Repo is private, active, not archived.
- Live URL listed in project inventory: https://psitrends.pages.dev.
- Root `README.md` and root `package.json` were not found during verification.
- Cloudflare Pages deploy source still needs verification.

## First checks

Before code/content changes:

1. Inspect repository tree.
2. Identify whether project is static, app, or subfolder-based.
3. Verify Cloudflare Pages deploy source.
4. Find actual build/config files.
5. Confirm whether live URL maps to this repo.

## Local checks

Run only commands found in the repo.

Do not invent:

- `npm run build`
- `npm test`
- framework-specific commands

unless confirmed by repo files.

## Live checks

When production is in scope:

- open https://psitrends.pages.dev;
- verify Cloudflare Pages project deploy source;
- verify latest deployed commit/branch if accessible;
- verify key pages after identifying project structure.

## Do not

- Do not assume repo-to-live mapping is confirmed.
- Do not invent build commands.
- Do not change env/secrets.
- Do not claim live behavior without Cloudflare verification.

## Report format

Return:

- repo tree findings;
- framework/build findings;
- live mapping status;
- changed files;
- checks run;
- needs verification.
