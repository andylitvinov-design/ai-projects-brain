# codex-automation

## 1. Purpose

Shared project-memory map for the user's Codex automation infrastructure: command routing, Slack-backed Codex Cloud, local bridge fallback, dashboard-triggered Codex runs, GitHub Actions Codex runs, reports surfaces, and local daily backups.

This project exists to reduce token waste: agents should read this memory before re-discovering how Codex automations are wired.

## 2. Live URLs

- codex-links production: https://codex-links.pages.dev
- brain-management production: https://brain-management.pages.dev
- backup repo: not applicable
- needs verification: live runtime health must be checked before claiming any automation is currently healthy.

## 3. Repositories

- command bridge / inbox / reports: https://github.com/andylitvinov-design/codex-links
- management dashboard / mobile-run: https://github.com/andylitvinov-design/brain-management
- daily backup storage: https://github.com/andylitvinov-design/codex-daily-backups
- project memory: https://github.com/andylitvinov-design/ai-projects-brain

## 4. Hosting / Deploy

- codex-links: Cloudflare Pages
- brain-management: Cloudflare Pages
- codex-daily-backups: GitHub repository, local automation source needs verification
- ai-projects-brain: GitHub repository

## 5. Current Status

Confirmed from repository code and project memory:

- `codex-links` contains the command bridge and dispatch routing logic.
- `brain-management` contains the mobile-run API and GitHub workflow dispatch integration.
- `brain-management` contains a GitHub Actions workflow that runs `openai/codex-action@v1` and creates a draft PR.
- `codex-daily-backups` is described as automatically managed from `air-andrii.lan`; exact local cron/launchd/script is not visible from GitHub and needs verification.

## 6. Important Files

### codex-links

- `functions/api/commands.js`
- `functions/api/delivery.js`
- `functions/api/reports.js`
- `functions/_lib/dispatch.js`
- `functions/_lib/reports.js`
- `public/app.js`
- `public/version.json`
- `wrangler.toml` / `wrangler.jsonc`
- `codex-save/`

### brain-management

- `functions/api/mobile-run.js`
- `functions/_lib/mobile-run.js`
- `.github/workflows/mobile-dashboard-launch.yml`
- `.github/codex/prompts/mobile-dashboard-launch.md`
- `dashboard-thinking/data/current-thinking-audit.json`
- `dashboard-thinking/data/current-daily-upgrade.json`
- `dashboard-thinking/data/current-daily-changes.json`
- `dashboard-codex-efficiency/data/observed-audit.json`

### codex-daily-backups

- `README.md`
- local automation files: needs verification on `air-andrii.lan`

## 7. Environment Variable Names

Only names are listed. Values must never be stored here.

### codex-links

- `LINKS_WRITE_TOKEN`
- `ADMIN_TOKEN`
- `COMMAND_DISPATCH_MODE`
- `OPENAI_API_KEY`
- `CLOUD_BRIDGE_BASE_URL`
- `CLOUD_BRIDGE_SHARED_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_CODEX_DISPATCH_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_CODEX_CHANNEL_ID`
- `SLACK_CODEX_USER_ID`
- `SLACK_CODEX_MENTION`

### brain-management mobile-run / GitHub dispatch

- `MOBILE_LAUNCH_KEY`
- `STATUS_CALLBACK_SECRET`
- `MOBILE_RUNS`
- `GH_REPO_OWNER`
- `GH_REPO_NAME`
- `GH_WORKFLOW_FILE`
- `GH_WORKFLOW_REF`
- `GH_WORKFLOW_PAT`
- GitHub Actions secret: `OPENAI_API_KEY`

### codex-daily-backups

- needs verification locally; do not infer or expose secrets.

## 8. Known Issues

- Agents can confuse `codex-links` command routing with `brain-management` mobile-run workflow dispatch.
- `reports` APIs store/display reports; they do not necessarily execute Codex.
- `delivery` API displays state; it does not itself launch a new Codex run.
- `codex-daily-backups` automation likely lives outside GitHub on `air-andrii.lan`; GitHub repo inspection alone is insufficient.
- Direct OpenAI cloud route requires `OPENAI_API_KEY`; ChatGPT subscription/Codex Cloud routing through Slack is a separate path.
- Live Cloudflare behavior can differ from repo code if deployment/env is stale.

## 9. Next Actions

- Verify local backup automation on `air-andrii.lan` using the script/checklist in `SYSTEM_MAP.md`.
- Add a small dashboard block in `brain-management` showing automation health: mobile-run, latest GitHub workflow, bridge status, latest backup timestamp.
- Keep this map updated whenever dispatch modes, workflows, bridge routes, or backup scripts change.

## 10. Risks

- Leaking env values or backup contents.
- Triggering real remediation/command flows unintentionally.
- Assuming a workflow is scheduled when it is only `workflow_dispatch`.
- Claiming a bridge is live without Cloudflare/runtime verification.
- Re-reading entire repos instead of this memory map.

## 11. Rules for Codex

- Read this file and `SYSTEM_MAP.md` before debugging Codex automation.
- Never store secret values.
- Label unverified local-machine details as `needs verification`.
- Prefer minimal safe documentation/dashboard changes before runtime rewrites.
- For any production-facing change, verify live API/Pages behavior separately.

## 12. Verification Status

- repo mapping: confirmed from project memory and GitHub inventory
- live mapping: listed in project memory; runtime health needs verification
- env status: names only; values/completeness need verification
- deploy status: Cloudflare/GitHub paths identified; current deployed versions need verification
- local backup automation: needs verification on `air-andrii.lan`
