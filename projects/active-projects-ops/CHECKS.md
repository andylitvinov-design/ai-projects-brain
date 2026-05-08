# CHECKS — active-projects-ops

> Verification guide for the shared active ops/content repo.

## Agent Entry

Use this project for: active-projects-ops, sales static pages, system-optimization static dashboard, ezohata ops/docs hub.

## First checks

This is a shared repo. Before changes:

1. Identify the subproject: `sales/`, `system-optimization/`, or `ezohata/`.
2. Read root `README.md`.
3. Read subfolder docs / `STATE.md` if present.
4. Verify live/deploy target for that subproject.

## Known live links from README

- `sales`: https://sales-bwa-photo.pages.dev/
- `ezohata`: https://ezohata.com/
- `system-optimization`: static-first; public deploy not required in first pass per README.

## Local checks

Run only commands confirmed in the relevant subfolder.

Do not invent commands at repo root.

For static HTML/content changes:

- inspect changed HTML/CSS/MD files;
- verify links and asset paths;
- if live URL exists, verify live rendering after deploy.

## Do not

- Do not treat root repo as one product.
- Do not mix `sales`, `system-optimization`, and `ezohata` contexts.
- Do not assume `ezohata/` is the Magento production codebase.
- Do not change secrets/env values.

## Report format

Return:

- selected subproject;
- changed files;
- local/static checks;
- live link checked if available;
- deployment/source assumptions;
- needs verification.
