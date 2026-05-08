# DECISIONS — codex-links

> Architecture decisions and guardrails for Codex Links.

## Canonical project

- Canonical repo: `andylitvinov-design/codex-links`.
- Related `codex-save/` is an operational diagnostics/remediation subproject under the same repo unless verified otherwise.

## Command lifecycle

- Preserve command lifecycle semantics.
- Distinguish command creation, dispatch, delivery, status/timeline, and report rendering.
- Do not bypass safety tokens or admin/write token checks.

## Dispatch modes

- Slack-backed Codex Cloud is the primary production command delivery path when configured.
- Local bridge/direct OpenAI paths are secondary or optional modes.
- Do not claim Cloud delivery is live unless worker/account/linkage has been verified.

## Version alignment

- Production UI releases should keep version triplet aligned when applicable:
  - `public/version.json`
  - `public/index.html`
  - `public/app.js`

## codex-save

- `codex-save` diagnostics/remediation creates operational commands; it does not directly push to `main`.
- Treat remediation as side-effectful.

## Secrets

- Never store `LINKS_WRITE_TOKEN`, `ADMIN_TOKEN`, Slack tokens, bridge secrets, OpenAI keys, Cloudflare tokens, or real env values.
- Env names may be documented; values must not.

## Main formula

**Do not confuse code path with live routing. Preserve command lifecycle, version alignment, token safety, and explicit dispatch-mode boundaries.**
