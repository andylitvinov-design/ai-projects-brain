# Codex Automation System Map

Last updated: 2026-05-05

Purpose: one compact map of what is actually automated around Codex, where it lives, how it is triggered, how to verify it, and what still needs local verification.

## 1. Automation surfaces

| Automation | Trigger | Runner | Repo | Key files | Output | Type | Verification |
|---|---|---|---|---|---|---|---|
| Codex command bridge | Web/API command POST | Cloudflare Pages Functions | `andylitvinov-design/codex-links` | `functions/api/commands.js`, `functions/_lib/dispatch.js` | queued/dispatched/answered/failed command state | API-triggered | POST a safe test command; then read `/api/delivery` or UI timeline |
| Slack-backed Codex Cloud route | Command routed to Slack mode | Cloudflare Function + Slack channel + Codex actor | `andylitvinov-design/codex-links` | `functions/api/commands.js`, `functions/_lib/dispatch.js`, `functions/_lib/slack.js` | Slack thread, Codex response, command state | API-triggered / external Slack actor | Confirm `SLACK_*` env names configured; send non-mutating test; verify thread ack/reply |
| Local bridge fallback | Command routing fallback or explicit local mode | Local machine bridge | `codex-links` + local machine | repo side: `functions/api/commands.js`; local files need verification | command picked up locally | API-triggered + local runner | needs verification on local machine; check running bridge process/logs |
| Direct OpenAI cloud route | Command routed to direct cloud | Cloudflare Function using OpenAI key | `andylitvinov-design/codex-links` | `functions/api/commands.js`, `functions/_lib/openai-cloud.js`, `functions/_lib/dispatch.js` | cloud response or failure | API-triggered | Confirm `OPENAI_API_KEY` is configured; run safe prompt; verify delivery state |
| Claude bridge route | Command requested as Claude mode | Cloudflare Function + Claude bridge | `andylitvinov-design/codex-links` | `functions/api/commands.js`, `functions/_lib/dispatch.js` | command routed to Claude bridge | API-triggered | needs verification: confirm local/remote Claude bridge runner exists |
| Delivery timeline | Browser/API GET | Cloudflare Pages Function | `andylitvinov-design/codex-links` | `functions/api/delivery.js` | status, active commands, messages, reports | read-only API | GET delivery snapshot; check active command filtering |
| Reports surface | Browser/API GET/POST | Cloudflare Pages Function | `andylitvinov-design/codex-links` | `functions/api/reports.js`, `functions/_lib/reports.js` | stored/recent/public reports | API-triggered storage | GET public/recent reports; POST only with auth token |
| codex-save diagnostics/remediation | Operator UI action | Cloudflare Pages app + command bridge | `andylitvinov-design/codex-links` | `codex-save/`, command bridge files | diagnostics or real remediation command | UI/API-triggered | Verify side effects before pressing remediation; treat as real command source |
| Brain mobile-run API | Dashboard/mobile launch request | Cloudflare Pages Function | `andylitvinov-design/brain-management` | `functions/api/mobile-run.js`, `functions/_lib/mobile-run.js` | `queued` record in `MOBILE_RUNS`, GitHub workflow dispatch | UI/API-triggered | POST valid payload with `MOBILE_LAUNCH_KEY`; read request status |
| Mobile Dashboard Launch workflow | GitHub `workflow_dispatch` | GitHub Actions + `openai/codex-action@v1` | `andylitvinov-design/brain-management` | `.github/workflows/mobile-dashboard-launch.yml`, `.github/codex/prompts/mobile-dashboard-launch.md` | branch `codex/mobile-run/<requestId>`, draft PR, callback status | workflow_dispatch, not cron | Check latest workflow run; verify draft PR or failed callback |
| Dashboard data refresh | Manual/script run | Node script / repo workflow needs verification | `andylitvinov-design/brain-management` | `scripts/refresh-management-dashboards.js`, `dashboard-thinking/data/*.json` | refreshed dashboard JSON snapshots | needs verification | Run the script if available; verify generated JSON timestamps |
| Daily Codex backups | Local scheduled job likely on `air-andrii.lan` | Local cron/launchd/script | `andylitvinov-design/codex-daily-backups` | GitHub repo README; local scripts need verification | backup commits/snapshots | likely scheduled local automation | needs local verification; GitHub repo alone does not show schedule |

## 2. Confirmed dispatch modes

From `codex-links/functions/_lib/dispatch.js`:

- `local-bridge`
- `cloud`
- `slack-codex-cloud`
- `claude-bridge`

Executor route labels:

- `bridge`
- `cloud-via-slack`
- `direct-openai`
- `claude`

Important distinction:

- `cloud-via-slack` / `slack-codex-cloud` is not the same as direct OpenAI API execution.
- direct OpenAI cloud requires `OPENAI_API_KEY`.
- Slack-backed Codex Cloud requires Slack env and a valid Codex actor/channel setup.
- local bridge requires a local runner outside GitHub/Cloudflare.

## 3. What is not confirmed

- No GitHub-visible cron/schedule was confirmed for `brain-management` mobile-run workflow; it is `workflow_dispatch`.
- The daily backup schedule is not visible from GitHub. README says the repo is managed automatically from `air-andrii.lan`, but exact cron/launchd/script needs local verification.
- Claude bridge runner existence and health needs verification.
- Cloudflare production env completeness needs verification from Cloudflare dashboard or live API behavior.
- Codex UI/Routines tasks, if any, are not visible from GitHub repository inspection.

## 4. Local verification checklist for `air-andrii.lan`

Run locally on the Mac that manages backups/bridges. Do not paste secret values into reports.

```bash
set -euo pipefail

echo "== Host =="
hostname || true

echo "== Date =="
date

echo "== Cron entries =="
crontab -l 2>/dev/null || echo "no user crontab or access denied"

echo "== LaunchAgents containing codex/backup/bridge =="
find "$HOME/Library/LaunchAgents" -maxdepth 1 -type f 2>/dev/null \
  | grep -Ei 'codex|backup|bridge|brain|links' \
  | while read -r f; do echo "--- $f"; sed -E 's/(TOKEN|SECRET|KEY|PASSWORD|PAT)[^<\" ]*/REDACTED/g' "$f"; done || true

echo "== launchctl services =="
launchctl list 2>/dev/null | grep -Ei 'codex|backup|bridge|brain|links' || true

echo "== Running processes =="
ps aux | grep -Ei 'codex|backup|bridge|brain-management|codex-links' | grep -v grep || true

echo "== Likely local automation files =="
find "$HOME" -maxdepth 4 -type f 2>/dev/null \
  \( -iname '*codex*' -o -iname '*backup*' -o -iname '*bridge*' \) \
  | grep -Ev 'Library/Caches|node_modules|\.git/' \
  | head -200

echo "== Recent backup repo commits =="
if [ -d "$HOME/codex-daily-backups/.git" ]; then
  git -C "$HOME/codex-daily-backups" log --oneline --decorate -10
else
  echo "needs verification: $HOME/codex-daily-backups not found"
fi
```

Expected report format:

```text
Local Codex automation verification
- host:
- checked at:
- cron entries found:
- launchd services found:
- running bridge/backup processes:
- backup repo path:
- latest backup commit:
- risks:
- needs verification:
```

## 5. Minimal debugging sequence

When a Codex automation seems stuck:

1. Identify the surface:
   - command bridge?
   - Slack route?
   - local bridge?
   - direct OpenAI route?
   - mobile-run workflow?
   - daily backup?

2. Check source of truth:
   - `codex-links`: command/delivery/reports APIs.
   - `brain-management`: `MOBILE_RUNS` record and GitHub Actions run.
   - `codex-daily-backups`: local cron/launchd and latest commit.

3. Do not start with repo-wide reading.
   Read only the key files listed in the table.

4. Capture exact failure:
   - endpoint
   - command id / request id
   - workflow run id
   - failing command
   - status before/after

5. Apply minimal safe fix:
   - docs/state if ambiguity;
   - dashboard status if visibility gap;
   - runtime patch only when a specific failing path is confirmed.

## 6. Codex prompt for local-only verification

Use this when GitHub/Cloudflare inspection is insufficient:

```text
You are verifying local Codex automations on my Mac. Do not print or store secret values.

Goal:
Find active local automation related to Codex, backups, codex-links bridge, brain-management, and daily backup jobs.

Run the local verification script from `projects/codex-automation/SYSTEM_MAP.md` section "Local verification checklist for air-andrii.lan".

Rules:
- Redact env values and tokens.
- Do not modify files.
- Do not stop services.
- Do not trigger real Codex commands.
- Report only: cron entries, launchd services, running processes, likely scripts, backup repo path, latest backup commit.
- Mark unknowns as `needs verification`.

Final report:
- automation name
- trigger type
- local file/service path
- last observed run if visible
- safe verification command
- risks
- needs verification
```

## 7. Stop condition

This map is good enough when:

- every Codex automation has a named trigger;
- every automation has a runner and repo/location;
- env values are not stored;
- local-only items are marked `needs verification`;
- Codex can debug a stuck automation without scanning all repos.
