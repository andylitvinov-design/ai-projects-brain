# active-projects-ops

## 1. Purpose

Safe, browser-friendly repo for active non-core-code projects that should be easy to resume from desktop and phone.

## 2. Agent Entry

Use this project when the user mentions:

- active-projects-ops;
- active ops/content projects;
- sales landing pages under this repo;
- system-optimization dashboard under this repo;
- ezohata ops/docs hub under this repo.

Read order:

1. repo-local `README.md`
2. relevant subfolder `STATE.md` if present
3. relevant subfolder `README.md` / docs
4. project capsule files here

## 3. Included subprojects

Confirmed from repo README:

- `sales/` — static landing pages and related docs
- `system-optimization/` — static-first audit dashboard
- `ezohata/` — ops/docs hub for the live Magento site

## 4. Live URLs

Confirmed from repo README:

- `sales`: https://sales-bwa-photo.pages.dev/
- `ezohata`: https://ezohata.com/

Needs verification:

- `system-optimization` live/deploy status
- preview/admin mappings
- exact deploy source for each subproject

## 5. Repositories

- canonical repo: https://github.com/andylitvinov-design/active-projects-ops
- repo visibility: private
- repo status: active, not archived
- default branch: `main`
- code search index: not indexed according to GitHub inventory
- deprecated repo: needs verification
- related repos: needs verification

## 6. Hosting / Deploy

- `sales`: Cloudflare Pages URL confirmed from README; deploy source needs verification
- `ezohata`: live Magento site URL confirmed from README; repo is docs/ops hub, not necessarily Magento code source
- `system-optimization`: static-first, no public deploy required in first pass per README

## 7. Current Status

Shared repo for active non-core-code projects. It is not one product per root. Agents must choose the relevant subfolder first.

## 8. Important Files

Confirmed:

- root `README.md`
- `sales/` folder
- `system-optimization/` folder
- `ezohata/` folder

Needs verification:

- subfolder `STATE.md` files
- subfolder deploy/config files
- repo-local `AGENTS.md`

## 9. Environment Variable Names

Only names are listed. Values must never be stored here.

- needs verification

## 10. Known Issues

- Shared repo, not one project per root.
- Easy to mix `sales`, `system-optimization`, and `ezohata` contexts.
- `ezohata` here is ops/docs hub for live Magento site, not automatically the live application source.

## 11. Next Actions

1. Inspect relevant subfolder before changes.
2. Verify deploy source for `sales` and any static pages.
3. Verify whether `system-optimization` has a deploy target.
4. Keep subproject boundaries explicit in any report.

## 12. Risks

- Mixing independent project contexts.
- Treating root repo as a single app.
- Confusing `ezohata/` docs hub with production Magento source.
- Claiming deployment status without checking hosting source.

## 13. Rules for Codex

- Do not assume one repo equals one product.
- Read subfolder docs first.
- Keep edits scoped to the named subproject.
- Do not change env/secrets.
- Report subfolder changed, not just repo name.

## 14. Verification Status

- repo mapping: verified from GitHub metadata and repo README
- subprojects: verified from repo README
- `sales` live URL: listed in README, behavior/deploy source needs verification
- `ezohata` live URL: listed in README, source boundary needs verification
- root `STATE.md`: not found during verification
- deploy status: needs verification
- env status: needs verification
