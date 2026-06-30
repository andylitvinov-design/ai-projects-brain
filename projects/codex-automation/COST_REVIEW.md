# Codex Automation Cost Review

Last updated: 2026-06-30

Purpose: estimate value, daily cost risk, and recommended operating policy for the user's Codex automation surfaces.

This review is based on repository-visible automation and `projects/codex-automation/SYSTEM_MAP.md`. It does not include local Mac cron/launchd, Cloudflare dashboard env state, ChatGPT/Codex UI Routines, or actual provider billing exports. Those remain `needs verification`.

## 1. Executive summary

Current confirmed design is mostly safe from uncontrolled daily spend:

- `brain-management` Codex workflow is `workflow_dispatch`, not scheduled cron.
- `codex-links` command bridge is API-triggered, not a confirmed background generator.
- Delivery timeline and reports API are mostly read/write infrastructure with low idle cost.
- Potential cost risk comes from explicit command execution routes: Slack-backed Codex Cloud, direct OpenAI cloud, GitHub Actions `openai/codex-action@v1`, and any local bridge runner.
- The biggest unknown is local automation on `air-andrii.lan`, especially daily backups, local bridge polling, and any local Codex scripts.

Recommended policy:

- Keep command bridge, delivery timeline, mobile-run API, and daily backups.
- Keep direct OpenAI route disabled or non-default unless intentionally needed.
- Keep `openai/codex-action@v1` behind explicit `workflow_dispatch` only.
- Add lightweight cost/status dashboard later, but do not rewrite runtime now.

## 2. Cost scale

Cost is expressed in approximate условные единицы (у.е.) per day.

- `0`: no meaningful daily cost while idle.
- `0-0.2`: very low infrastructure/read-only cost.
- `0-1`: low, usually Cloudflare/GitHub/free-tier style usage, depends on traffic.
- `1-5`: moderate if launched several times or if prompts are large.
- `5+`: can become expensive with frequent generation, long prompts, loops, or repeated failures.
- `unknown`: needs local/provider verification.

This is an operational estimate, not a billing statement.

## 3. Confirmed automations and cost table

| Automation | Trigger | Scheduled? | Can spend tokens/API? | Value | Risk | Estimated cost/day | Recommendation |
|---|---|---:|---:|---:|---:|---:|---|
| Codex command bridge | Web/API command POST | No confirmed cron | Indirectly, if routed to execution | 9/10 | 5/10 | `0-1` idle/traffic cost | Keep. Central control plane. Add cost counters later. |
| Slack-backed Codex Cloud route | Command routed to Slack mode | No confirmed cron | Yes, through Codex actor/Cloud path | 9/10 | 7/10 | `0` idle, `1-5+` active | Keep, but require explicit project target and final status capture. |
| Local bridge fallback | Fallback or explicit local mode | needs verification | Yes, if local runner executes Codex/Claude/scripts | 7/10 | 7/10 | `unknown`, likely `0-2` if controlled | Keep as fallback only. Verify local polling interval and logs. |
| Direct OpenAI cloud route | Command routed to direct cloud | No confirmed cron | Yes, uses `OPENAI_API_KEY` when configured | 5/10 | 8/10 | `0` idle, `1-10+` active | Limit. Do not make default for repo-changing tasks unless needed. |
| Claude bridge route | Requested Claude mode | needs verification | Yes, if bridge exists and runs Claude | 4/10 | 6/10 | `unknown` | Mark needs verification. Keep disabled/non-default until runner is proven. |
| Delivery timeline | Browser/API GET | No | No generation; read-only status | 8/10 | 2/10 | `0-0.2` | Keep. High observability value, low cost. |
| Reports surface | Browser/API GET/POST | No | No generation by itself | 6/10 | 2/10 | `0-0.2` | Keep. It stores/displays reports, not a runner. |
| codex-save diagnostics/remediation | Operator UI action | No confirmed cron | Yes if remediation creates real commands | 7/10 | 6/10 | `0` idle, `1-3+` active | Keep manual-only. Add warnings before real remediation. |
| Brain mobile-run API | Dashboard/mobile launch request | No | Indirectly dispatches workflow | 8/10 | 5/10 | `0-0.5` API/KV cost | Keep. It is a good explicit launch gate. |
| Mobile Dashboard Launch workflow | GitHub `workflow_dispatch` | No | Yes, runs `openai/codex-action@v1` | 9/10 | 8/10 | `0` idle, `1-10+` per active day | Keep manual/API-triggered only. Never add cron without budget guard. |
| Dashboard data refresh | Manual/script run | needs verification | Usually no generation unless script calls models | 7/10 | 3/10 | `0-1` | Keep. Verify whether it calls any model/API. |
| Daily Codex backups | Likely local scheduled job | needs local verification | Usually no model generation; may use Git/GitHub | 8/10 | 5/10 | `0-1`, unknown if heavy | Keep, but verify schedule, scope, and sensitive-data handling. |

## 4. Value ranking

### Highest value

1. `Mobile Dashboard Launch workflow` — creates branch/draft PR from dashboard recommendations.
2. `Codex command bridge` — central command control plane.
3. `Slack-backed Codex Cloud route` — likely main no-local-laptop execution route.
4. `Brain mobile-run API` — safe launch gate from dashboard.
5. `Daily Codex backups` — safety net against losing work.

### Medium value

- `Delivery timeline` — does not execute work, but prevents blind debugging.
- `codex-save diagnostics/remediation` — useful but can create real commands.
- `Dashboard data refresh` — useful for management visibility.

### Lower / unproven value

- `Direct OpenAI cloud route` — useful as fallback, but cost-risky.
- `Claude bridge route` — not valuable until runner health and use case are proven.

## 5. Cost risk ranking

### Highest cost risk

1. `Mobile Dashboard Launch workflow` if launched repeatedly with large prompts.
2. `Direct OpenAI cloud route` if set as default and used for repo-changing tasks.
3. `Slack-backed Codex Cloud route` if it loops or fails to capture final answers.
4. `Local bridge fallback` if local polling/runner retries too aggressively.

### Medium cost risk

- `codex-save remediation` because it may generate real repair commands.
- `Dashboard data refresh` if it starts calling model APIs in the future.

### Low cost risk

- `Delivery timeline`.
- `Reports surface`.
- Passive command storage while idle.

## 6. Recommended keep / limit / disable

| Automation | Action | Reason |
|---|---|---|
| Codex command bridge | Keep | Core routing layer. |
| Slack-backed Codex Cloud route | Keep with guardrails | Main cloud execution route; needs project targeting and answer reconciliation. |
| Local bridge fallback | Keep fallback only | Useful emergency route, but local state needs verification. |
| Direct OpenAI cloud route | Limit / non-default | Potential direct API spend. Use only when intentionally chosen. |
| Claude bridge route | Needs verification | Do not rely on it until runner is confirmed. |
| Delivery timeline | Keep | Low-cost observability. |
| Reports surface | Keep | Low-cost report storage/display. |
| codex-save remediation | Keep manual-only | Real side effects; operator confirmation should be explicit. |
| Brain mobile-run API | Keep | Good launch gate. |
| Mobile Dashboard Launch workflow | Keep workflow_dispatch only | High value, high cost if abused; no cron. |
| Dashboard data refresh | Keep | Useful if it only refreshes JSON/dashboard state. |
| Daily Codex backups | Keep, verify locally | Valuable but local schedule/scope unknown. |

## 7. Daily budget policy

Recommended default daily budget envelope:

| Category | Suggested daily budget | Notes |
|---|---:|---|
| Passive infra/status/report reads | `0-0.5 у.е.` | Delivery, reports, dashboard reads. |
| Dashboard refresh / backup | `0-1 у.е.` | Should stay low if no model calls. |
| Explicit Codex execution | `0-10 у.е.` | Depends on number/size of tasks. |
| Emergency/debug day | `10-25 у.е.` | Only when deliberately fixing production/bridge failures. |

Operating rule:

- No scheduled Codex generation without a budget cap.
- No direct OpenAI route as default unless there is a clear reason.
- Every execution route should write: command id/request id, route, started_at, finished_at, final_status, and rough cost class.
- ChatGPT Automations are the default scheduler. Do not keep or create a
  Codex-side automation when a ChatGPT automation already owns the workflow.
- A Codex-side schedule needs explicit reason, frequency, owner, stop condition,
  and token-risk note. Hourly schedules need an operational-safety justification.
- `codex-delivery-loop`, `codex-delivery-loop-now`, and `skill-progression-map`
  are the clearest disable/archive candidates from the 2026-06-30 local audit.

## 8. Local verification for `air-andrii.lan`

Needs local run. Do not paste secret values.

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
ps aux | grep -Ei 'codex|backup|bridge|brain-management|codex-links|claude' | grep -v grep || true

echo "== Likely local automation files =="
find "$HOME" -maxdepth 4 -type f 2>/dev/null \
  \( -iname '*codex*' -o -iname '*backup*' -o -iname '*bridge*' -o -iname '*claude*' \) \
  | grep -Ev 'Library/Caches|node_modules|\.git/' \
  | head -200

echo "== Recent backup repo commits =="
if [ -d "$HOME/codex-daily-backups/.git" ]; then
  git -C "$HOME/codex-daily-backups" log --oneline --decorate -10
else
  echo "needs verification: $HOME/codex-daily-backups not found"
fi
```

Expected local report:

```text
Local Codex automation cost verification
- host:
- checked at:
- cron entries found:
- launchd services found:
- running bridge/backup processes:
- backup repo path:
- latest backup commit:
- estimated local cost/day:
- cost risks:
- disable/limit recommendations:
- needs verification:
```

## 9. What to measure next

Add these fields to future command/run records if practical:

- `route`: `slack-codex-cloud`, `direct-openai`, `local-bridge`, `claude-bridge`, `github-codex-action`
- `trigger`: `manual`, `api`, `workflow_dispatch`, `cron`, `fallback`
- `repo`
- `project_key`
- `started_at`
- `finished_at`
- `final_status`
- `input_size_class`: `small`, `medium`, `large`
- `cost_class`: `free/idle`, `low`, `medium`, `high`, `unknown`
- `retry_count`
- `fallback_count`

This is enough to build a dashboard without exposing billing secrets.

## 10. Stop condition

This cost review is good enough when:

- every known automation has value/risk/cost class;
- scheduled vs manual trigger is explicit;
- expensive routes are manual or guarded;
- local unknowns are marked `needs verification`;
- no secret values are stored.
