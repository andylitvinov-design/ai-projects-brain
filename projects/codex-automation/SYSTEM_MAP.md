# Codex Automation System Map

Last updated: 2026-07-02

Purpose: one compact map of what is actually automated around Codex, where it lives, how it is triggered, how to verify it, and what still needs local verification.

For ChatGPT Automation status checks and "did it run?" questions, first use
`projects/codex-automation/CHATGPT_AUTOMATIONS_RUNBOOK.md` before debugging
Codex Cloud, Slack, Cloudflare, or local bridge surfaces.

For automation role boundaries, first use
`projects/codex-automation/AGENT_ROLES.md`. The role map is a documented
contract, not proof of current ChatGPT Automation UI state.

## 0. Scheduler ownership

ChatGPT Automations are the main scheduler for recurring agent work. Codex-side
automations are secondary and must not duplicate ChatGPT Automations. A
Codex-side automation is allowed only when it has an explicit reason, frequency,
owner, stop condition, and token-risk note. Do not add hourly Codex loops unless
the hourly cadence is explicitly justified as operational safety work.

Ponytail Gate is recorded as a rule/gate in `systems/agent-rules.md`; it is not
installed as a plugin, dependency, global service, or separate automation.

Expected ChatGPT Automation architecture:

| Automation | Schedule | Purpose | Scheduler owner |
|---|---|---|---|
| Morning System Upgrade | Daily 08:30 Europe/Kyiv | Memory Upgrade, daily Self-Harness Review, Codex efficiency report, Ponytail Gate / Lazy Senior Check, instruction-bloat check, workflow weakness mining | ChatGPT Automations |
| PR Merge Sweep | Daily 08:30 Europe/Kyiv | Check open/recently merged PRs, safely merge low-risk ready PRs, detect wrong-base merges, salvage safe hunks onto fresh `main`, verify UI default-state regressions | ChatGPT Automations |
| Daily Improve Sweep | Daily 09:00 Europe/Sarajevo / Europe/Podgorica context | Growth Lab: Prototyper + Grower strategic improvement planning for active projects, with delivery-ready plans and Ponytail Gate before proposing implementation | ChatGPT Automations |
| Codex Delivery Loop | Daily 12:00 Europe/Kyiv | Find unfinished delivery tasks, branches without PRs, blocked statuses, failed CI, undeployed/unverified changes, forgotten worktrees/branches, and delivery recovery needs | ChatGPT Automations |
| Weekly Agent Harness Review | Sunday 10:00 Europe/Kyiv | Expanded 7-day self-harness learning pass: repeated agent errors, `/save`, instruction cleanup, prompt corrections, and Ponytail cleanup findings | ChatGPT Automations |
| Weekly Live Safe Sweep | Monday 09:00 Europe/Sarajevo / Europe/Podgorica context | Weekly `/safe` pass for live/public project security and UX checks, with minimal safe fixes only | ChatGPT Automations |

Role ownership summary:

| Automation / Mode | Primary role | Secondary role | Boundary |
|---|---|---|---|
| Daily Improve / Daily Improve Sweep | Prototyper | Grower | Growth Lab: concept cards, project cards, ranked opportunities, ready prompts; no product mutation. |
| Morning System Upgrade | Sweeper | Maintainer | Morning half of the cleanup loop; safe harness/docs/rules/registry fixes only. |
| Evening Architecture Review | Sweeper | Maintainer | Evening half of the cleanup loop; repeated-failure analysis and morning handoff. |
| PR Merge Sweep | Maintainer | Builder | Safe PR merge/recovery only with checks and readiness proof. |
| Codex Delivery Loop | Builder | Maintainer | Unfinished delivery recovery and exact next delivery work. |
| Weekly Live Safe Sweep | Maintainer | Sweeper | Weekly live/public safety and UX pass; no broad rewrite. |
| /audit-fin | Maintainer | Sweeper | Finance correctness and deterministic repair prompts; no unsafe financial mutation. |

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

## 2. Local Codex automations audit on 2026-06-30

Checked fallback base `/Users/andriilitvinov/.codex/automations`; `CODEX_HOME`
was not set in the shell environment. Only automation names, schedules, memory
timestamps, and non-secret purpose snippets were inspected.

| Codex automation | Schedule found | Last observed memory timestamp | Purpose summary | Duplicate / token-risk classification | Action |
|---|---|---:|---|---|---|
| `codex-delivery-loop` | `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU;BYHOUR=8,9,10,11,12;BYMINUTE=0` | 2026-06-30 09:03 CEST | Unfinished delivery work across active local projects | Duplicate of ChatGPT `Codex Delivery Loop`; high-frequency five-runs-per-day risk | Disable/archive or convert to manual; ChatGPT 12:00 scheduler owns this workflow |
| `codex-delivery-loop-now` | `FREQ=DAILY;COUNT=1;BYHOUR=12;BYMINUTE=0` | 2026-06-30 16:18 CEST | One-count immediate delivery-loop pass | Duplicate of ChatGPT `Codex Delivery Loop`, but memory says it completed on 2026-06-30 | Keep inactive/archived after the one-count run; do not turn it into a recurring loop |
| `daily-upgrade-review` | Daily 07:00 | 2026-06-24 09:18 CEST | Management morning report and dashboard/report publish | Overlaps ChatGPT `Morning System Upgrade` unless kept as a data-refresh implementation step | Move scheduling to ChatGPT or justify as non-model dashboard publish with owner/stop condition |
| `daily-thinking-snapshot` | Daily 23:55 | 2026-04-18 14:08 CEST | Dashboard thinking audit snapshot refresh | Possible overlap with Morning System Upgrade memory/workflow mining | Re-justify or move into ChatGPT-owned morning upgrade pipeline |
| `finance-ezohata-daily-audit` | Daily 09:30, 10:30, 11:30 retry window | 2026-06-24 09:32 CEST | Finance project daily risk/PR/worktree audit | Daily Codex-side audit; potential overlap with PR Merge Sweep and Codex Delivery Loop | Disable or reduce unless explicit owner/frequency/token-risk note is added |
| `psitherapy-reports-daily-audit` | Daily 09:30, 10:30, 11:30 retry window | 2026-06-24 09:33 CEST | Reports project daily audit | Daily Codex-side audit; potential overlap with PR Merge Sweep and Codex Delivery Loop | Disable or reduce unless explicit owner/frequency/token-risk note is added |
| `reiki-yggdrasil-daily-audit` | Daily 09:30, 10:30, 11:30 retry window | 2026-06-24 09:32 CEST | Reiki Yggdrasil project daily audit | Daily Codex-side audit; potential overlap with PR Merge Sweep and Codex Delivery Loop | Disable or reduce unless explicit owner/frequency/token-risk note is added |
| `weblinks-daily-audit` | Monday 09:00 | 2026-05-25 09:02 CEST | Weekly weblinks drift/secrets audit | May overlap Weekly Live Safe Sweep for safety/UX checks, but narrower secrets/docs scope | Keep only if documented as weekly specialized secret-safe audit |
| `recent-upgrades-backup` | Daily 21:30 | 2026-06-23 21:32 CEST | Backup changed eligible projects | Not a ChatGPT duplicate if it is Git/backup-only | Keep if backup-only and token risk stays low; document owner/stop condition |
| `weblinks-encrypted-backup` | Daily 09:05 | 2026-05-14 09:41 CEST | Encrypted backup of private weblinks data | Not a ChatGPT duplicate; blocked on missing local secret in memory | Keep disabled/blocked until secret boundary is resolved; do not expose secret values |
| `skill-progression-map` | Daily 22:00 | 2026-05-15 22:09 CEST | Chooses one branch/project improvement and implements it | High token/code-change risk; duplicates delivery-style work | Disable unless explicitly re-approved with owner, stop condition, and token-risk budget |
| `critical-ram-guard` | Hourly | 2026-04-18 14:11 CEST | Silent local memory-pressure guard | Hourly loop, but operational safety and normally silent | Keep only with explicit operational-safety justification; otherwise reduce cadence |

## 3. Confirmed dispatch modes

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

## 4. What is not confirmed

- No GitHub-visible cron/schedule was confirmed for `brain-management` mobile-run workflow; it is `workflow_dispatch`.
- The daily backup schedule is not visible from GitHub. README says the repo is managed automatically from `air-andrii.lan`, but exact cron/launchd/script needs local verification.
- Claude bridge runner existence and health needs verification.
- Cloudflare production env completeness needs verification from Cloudflare dashboard or live API behavior.
- Codex UI/Routines tasks, if any, are not visible from GitHub repository inspection.

## 5. Local verification checklist for `air-andrii.lan`

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

## 6. Minimal debugging sequence

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

## 7. Codex prompt for local-only verification

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

## 8. Stop condition

This map is good enough when:

- every Codex automation has a named trigger;
- every automation has a runner and repo/location;
- env values are not stored;
- local-only items are marked `needs verification`;
- Codex can debug a stuck automation without scanning all repos.
