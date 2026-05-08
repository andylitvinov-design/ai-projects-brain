# council

## 1. Purpose

SIA Council local MVP app. Repository currently appears to be a Next.js app bootstrapped with create-next-app.

## 2. Agent Entry

Use this project when the user mentions:

- council;
- SIA Council;
- local MVP app;
- council Next.js app.

Read order:

1. `PROJECT.md`
2. `CHECKS.md` if present
3. repo-local `README.md`
4. repo-local `package.json` if present
5. hosting/deploy config if present

## 3. Live URLs

- production: needs verification
- preview: needs verification
- admin: needs verification

## 4. Repositories

- canonical repo: https://github.com/andylitvinov-design/council
- repo visibility: private
- repo status: active, not archived
- default branch: `codex/agent-work`
- code search index: not indexed according to GitHub inventory
- deprecated repo: needs verification
- related repos: needs verification

## 5. Hosting / Deploy

- provider: needs verification
- project name: needs verification
- deploy source: needs verification
- branch: `codex/agent-work` is default branch per GitHub metadata; production branch needs verification
- deploy rules: needs verification

## 6. Current Status

- Private active repo exists.
- README on default branch is the standard create-next-app README.
- Project appears to be early/local MVP stage; exact app-specific state needs verification.

## 7. Important Files

Confirmed from README:

- `app/page.tsx` is the default Next.js edit point mentioned by README.

Needs verification:

- `package.json`
- app structure beyond default README
- repo-local `STATE.md` / `AGENTS.md`
- deploy config

## 8. Environment Variable Names

Only names are listed. Values must never be stored here.

- needs verification

## 9. Known Issues

- Default branch is `codex/agent-work`, not `main`.
- README is generic create-next-app, so product-specific implementation status is unclear.
- Live/deploy mapping is not confirmed.

## 10. Recent Tasks

- needs verification

## 11. Next Actions

1. Inspect `package.json` and app structure on default branch.
2. Verify whether app has repo-local `STATE.md` or `AGENTS.md`.
3. Verify deploy target, if any.
4. Clarify whether `codex/agent-work` should remain default or be merged/renamed.

## 12. Risks

- Assuming production deploy exists.
- Assuming `main` is the working branch when default is `codex/agent-work`.
- Treating generic create-next-app README as product specification.

## 13. Rules for Codex

- Verify branch before editing.
- Use the repository default branch unless user specifies another branch.
- Do not claim live app status without deploy verification.
- Do not change env/secrets.

## 14. Verification Status

- repo mapping: verified from GitHub metadata
- repo status: private/active/not archived verified from metadata
- default branch: `codex/agent-work` verified from metadata
- README: standard create-next-app README verified on default branch
- live/deploy mapping: needs verification
- env status: needs verification
- product-specific state: needs verification
