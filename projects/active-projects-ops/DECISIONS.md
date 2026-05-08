# DECISIONS — active-projects-ops

> Architecture decisions and guardrails for the shared active ops/content repo.

## Boundary

- This repo is a shared workspace, not one product.
- Included subprojects confirmed from README:
  - `sales/`
  - `system-optimization/`
  - `ezohata/`

## Live links

- `sales` live link is listed as https://sales-bwa-photo.pages.dev/.
- `ezohata` live link is listed as https://ezohata.com/.
- `system-optimization` is static-first and does not require public deploy in first pass per README.

## Source separation

- `ezohata/` here is an ops/docs hub for live Magento site, not automatically the Magento application source.
- Do not use this repo for finance/incoming-ledger tasks.

## Workflow

- Choose subproject first.
- Read subfolder docs before editing.
- Keep changes narrow and browser-friendly.
- For static pages, prefer simple text/HTML edits.

## Main formula

**Subproject first. Root repo is only the container. Do not mix sales, system-optimization, and ezohata contexts.**
