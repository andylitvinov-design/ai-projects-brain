# CHECKS — codex-links

> Verification guide for Codex Links / command bridge work.

## Agent Entry

Use this project for: Codex Links, Slack bridge, Codex Cloud, dispatch, command lifecycle, delivery timeline, reports, codex-save diagnostics.

## Local checks

Run in canonical repo: `andylitvinov-design/codex-links`.

Recommended checks when available:

- `npm test`
- `npm run build`
- project-specific lint/check command if present
- targeted tests for changed functions/routes

If command is absent, report `needs verification`.

## Production / live checks

Live URL:

- https://codex-links.pages.dev

Check when relevant:

- command creation flow;
- dispatch mode behavior;
- delivery timeline;
- reports API/surface;
- `public/version.json` alignment;
- Cloudflare Pages deploy source;
- Slack delivery only when Slack changes are in scope.

## Version checks

For production-facing UI/app changes, keep aligned when applicable:

- `public/version.json`
- `public/index.html`
- `public/app.js`

## codex-save checks

For `codex-save/` changes:

- verify diagnostics page loads;
- verify remediation side effects are understood;
- confirm it creates commands and does not push directly to `main`;
- verify KV/binding assumptions if Cloudflare behavior is changed.

## Do not

- Do not change secrets/env values.
- Do not trigger real commands unintentionally.
- Do not confuse Cloud plumbing fixes with account/worker linkage being verified.
- Do not claim Slack/Codex Cloud delivery works without live confirmation.

## Report format

Return:

- changed files;
- local checks;
- live checks;
- version alignment status;
- command side-effect risks;
- needs verification.
