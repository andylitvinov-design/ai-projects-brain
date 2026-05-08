# CHECKS — artefacts

> Verification guide for Artefacts site / marketplace work.

## Agent Entry

Use this project for: artefacts, артефакты, marketplace, artefact site, product/card/content structure.

## Current verification status

- Repo: `andylitvinov-design/artefacts`.
- Live URL: `needs verification`.
- Hosting: `needs verification`.

## Required first checks

Before making code or production claims:

1. Inspect repo-local `README.md`.
2. Inspect repo-local `AGENTS.md` if present.
3. Inspect repo-local `STATE.md` / docs if present.
4. Verify package/build/deploy config.
5. Verify live URL / hosting source.

## Local checks

Run only after repo inspection confirms commands:

- `npm test` if present;
- `npm run build` if present;
- lint/typecheck if present;
- content/UI checks relevant to changed files.

Do not invent missing commands.

## Live checks

Live checks are `needs verification` until canonical hosting is confirmed.

When confirmed, verify:

- landing/home page;
- artefact catalog/card rendering;
- mobile layout;
- form/payment/contact flows if present;
- deployment source and latest commit.

## Do not

- Do not apply patterns from `codex-links`, `finance`, or `reiki-yggdrasil` without inspecting this repo.
- Do not assume Vercel/Cloudflare hosting until verified.
- Do not store payment/provider secrets.
- Do not claim marketplace flows work without live checks.

## Report format

Return:

- repo inspection results;
- changed files;
- local checks;
- live URL/hosting verification;
- risks;
- needs verification.
