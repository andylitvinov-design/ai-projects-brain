# CHECKS — council

> Verification guide for SIA Council local MVP app.

## Agent Entry

Use this project for: council, SIA Council, local MVP app, council Next.js app.

## Current verification status

- Repo: `andylitvinov-design/council`.
- Repo is private, active, not archived.
- Default branch is `codex/agent-work`.
- README on default branch is standard create-next-app text.
- Product-specific app status needs verification.

## First checks

Before changes:

1. Confirm branch: default is `codex/agent-work`.
2. Inspect `package.json`.
3. Inspect app structure, especially `app/page.tsx`.
4. Check for repo-local `AGENTS.md`, `STATE.md`, or docs.
5. Verify deploy target if production is mentioned.

## Local checks

Run only confirmed commands from `package.json`.

Likely Next.js commands may exist, but must be verified before use:

- `npm run dev`
- `npm run build`
- `npm run lint`
- tests if present

## Live checks

Live URL is not confirmed.

If production/preview is in scope:

- verify hosting provider;
- verify deploy source branch;
- verify live URL;
- verify latest commit/branch.

## Do not

- Do not assume `main` is the active branch.
- Do not claim live app status without deploy verification.
- Do not treat generic create-next-app README as product spec.
- Do not change env/secrets.

## Report format

Return:

- branch used;
- repo files inspected;
- package/build commands found;
- changed files;
- checks run;
- live/deploy status;
- needs verification.
