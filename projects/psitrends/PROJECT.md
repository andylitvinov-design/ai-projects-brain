# psitrends

## 1. Purpose

PsiTrends project / site. Exact app structure still needs verification.

## 2. Agent Entry

Use this project when the user mentions:

- psitrends;
- PsiTrends site;
- psitrends.pages.dev.

Read order:

1. `PROJECT.md`
2. `CHECKS.md` if present
3. repo-local files if available
4. Cloudflare deploy source when production is in scope

## 3. Live URLs

- production: https://psitrends.pages.dev
- preview: needs verification
- admin: needs verification

## 4. Repositories

- canonical repo: https://github.com/andylitvinov-design/psitrends-work
- repo visibility: private
- repo status: active, not archived
- default branch: `main`
- code search index: not indexed according to GitHub inventory
- deprecated repo: needs verification
- related repos: needs verification

## 5. Hosting / Deploy

- provider: Cloudflare Pages
- project name: `psitrends`
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 6. Current Status

- Repo exists and is active/private.
- Production URL is listed as Cloudflare Pages target.
- Root `README.md` and root `package.json` were not found during verification, so project structure needs deeper repo inspection.

## 7. Important Files

- needs verification

## 8. Environment Variable Names

Only names are listed. Values must never be stored here.

- needs verification

## 9. Known Issues

- Repo-to-hosting mapping still needs verification from Cloudflare deploy source.
- Root README/package absent; project may have subfolder structure or static content.
- Code search index is not enabled, so agents may need direct file inspection.

## 10. Next Actions

1. Inspect repository tree / root files.
2. Verify Cloudflare Pages deploy source.
3. Identify build/static framework if any.
4. Add `CHECKS.md` and `DECISIONS.md` once project structure is known.

## 11. Risks

- Incorrect repo/live URL mapping.
- Assuming framework/build commands that do not exist.
- Claiming production behavior without Cloudflare verification.

## 12. Rules for Codex

- Treat live deploy source as `needs verification` until confirmed.
- Do not invent build commands.
- Do not change env/secrets.

## 13. Verification Status

- repo mapping: partially verified from GitHub metadata
- live URL: listed in inventory, behavior needs verification
- root README/package: not found
- env status: needs verification
- deploy source: needs verification
- data flow: needs verification
