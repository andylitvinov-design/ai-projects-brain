# codex-save

## 1. Purpose

Operator-facing diagnostics/remediation site for codex-links.

## 2. Live URLs

- production: https://codex-save-cjb.pages.dev
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and any secondary live URLs need verification.

## 3. Repositories

- canonical repo: https://github.com/andylitvinov-design/codex-links
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond the listed inventory need verification.

## 4. Hosting / Deploy

- provider: Cloudflare Pages
- project name: Cloudflare Pages project codex-save
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status

Related subproject under codex-links/codex-save.

## 6. Important Files

- codex-save/README.md
- codex-save/package.json
- codex-save/public/

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

- SAVE_STORE
- LINKS_WRITE_TOKEN
- ADMIN_TOKEN

## 8. Known Issues

- Remediation creates real codex-links agent commands; it does not push directly to main.

## 9. Recent Tasks

- Diagnostics and remediation UX added to codex-links.

## 10. Next Actions

- Verify live project and KV binding before changing remediation flows.

## 11. Risks

- Triggering real commands unintentionally.

## 12. Rules for Codex

- Treat as operational tooling for codex-links.
- Verify command side effects.

## 13. Verification Status

- repo mapping: listed in inventory; current source still needs verification before production work
- live mapping: listed in inventory; live behavior needs verification before claims
- env status: names only; values and completeness need verification
- deploy status: hosting listed; deploy source needs verification
- data flow: needs verification
- needs verification: unconfirmed repo, live, deploy, env, and data-flow details.
