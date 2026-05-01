# codex-links

## 1. Purpose

Cloudflare Pages inbox, delivery timeline,
reports surface, Slack-backed Codex Cloud
command bridge, and codex-save
diagnostics/remediation app.

## 2. Live URLs

- production: https://codex-links.pages.dev
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and
  any secondary live URLs need verification.

## 3. Repositories

- canonical repo:
  https://github.com/andylitvinov-design/codex-links
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond
  the listed inventory need verification.

## 4. Hosting / Deploy

- provider: Cloudflare Pages
- project name: Cloudflare Pages projects
  codex-links and related codex-save
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status

Public repo. Production command delivery is
primarily Slack-backed Codex Cloud with local
bridge/direct OpenAI paths as secondary or
optional modes.

## 6. Important Files

- functions/api/commands.js
- functions/api/delivery.js
- functions/api/reports.js
- functions/\_lib/dispatch.js
- functions/\_lib/reports.js
- public/app.js
- public/version.json
- wrangler.toml/jsonc
- codex-save/

## 7. Environment Variable Names

Only names are listed. Values must never be
stored here.

- LINKS_WRITE_TOKEN
- ADMIN_TOKEN
- COMMAND_DISPATCH_MODE
- OPENAI_API_KEY
- CLOUD_BRIDGE_BASE_URL
- CLOUD_BRIDGE_SHARED_SECRET
- SLACK_BOT_TOKEN
- SLACK_CODEX_DISPATCH_TOKEN
- SLACK_SIGNING_SECRET
- SLACK_CODEX_CHANNEL_ID
- SLACK_CODEX_USER_ID
- SLACK_CODEX_MENTION

## 8. Known Issues

- Cloud delivery can be fixed in repo while
  external worker/account linkage remains
  blocked.
- Release deploys require version triplet
  alignment.
- DNS/network reachability can block report
  verification.

## 9. Recent Tasks

- Open PR #148 fix: pass Slack
  url_private_download into Codex Cloud photo
  prompt.
- Open PR #137 Restore GitHub auto-sync push.

## 10. Next Actions

- Verify open PR status before new work.
- Confirm live Cloudflare behavior after
  production-facing changes.

## 11. Risks

- Breaking command lifecycle.
- Breaking Slack delivery.
- Breaking report rendering.
- Breaking Cloudflare KV contracts.
- Breaking codex-save diagnostics.

## 12. Rules for Codex

- Keep public/version.json, public/index.html,
  and public/app.js build version aligned.
- Distinguish cloud plumbing from worker/account
  linkage.
- Verify live behavior when production-facing.

## 13. Verification Status

- repo mapping: listed in inventory; current
  source still needs verification before
  production work
- live mapping: listed in inventory; live
  behavior needs verification before claims
- env status: names only; values and
  completeness need verification
- deploy status: hosting listed; deploy source
  needs verification
- data flow: needs verification
- needs verification: unconfirmed repo, live,
  deploy, env, and data-flow details.
