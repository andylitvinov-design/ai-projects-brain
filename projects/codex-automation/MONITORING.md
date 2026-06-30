# Codex Automation Monitoring

Last updated: 2026-06-30

Purpose: turn Codex automation from a list of possible routes into a measurable system: what ran, why it ran, whether it was manual or scheduled, and what it likely cost.

This document is an operating contract. It avoids secret values and can be used by Codex, local scripts, dashboard code, or manual audit reports.

## 1. Core questions

The monitoring system must answer:

1. What automations exist?
2. Which automations are currently active?
3. Which automations can start by themselves?
4. Which automations ran last week and the week before?
5. How many runs were manual/API-triggered/scheduled/fallback?
6. Which runs could spend Codex/OpenAI/Claude tokens?
7. Estimated cost by week in условные единицы (у.е.).
8. Which routes are risky or looping?

## 2. Source hierarchy

Use the strongest available source first:

1. Provider billing/export if available.
2. GitHub Actions run records for `openai/codex-action@v1` workflows.
3. `codex-links` command records from delivery/commands storage.
4. Cloudflare logs/analytics for command endpoints.
5. Local `air-andrii.lan` cron/launchd logs for backup/local bridge.
6. Manual run ledger entries.
7. Estimated cost class from route and run type.

If a source is missing, report `needs verification` instead of guessing.

## 3. Run ledger record

Every automation run should be normalized into this shape:

```json
{
  "id": "run_2026-05-06_example",
  "automation": "mobile-dashboard-launch",
  "route": "github-codex-action",
  "trigger": "workflow_dispatch",
  "triggered_by": "manual-api",
  "scheduled": false,
  "repo": "andylitvinov-design/brain-management",
  "project_key": "brain-management",
  "source": "github-actions",
  "source_url": "",
  "started_at": "2026-05-06T00:00:00.000Z",
  "finished_at": "2026-05-06T00:10:00.000Z",
  "status": "completed",
  "final_state": "pr_ready",
  "can_spend_tokens": true,
  "cost_class": "medium",
  "estimated_cost_ue": 3,
  "input_size_class": "medium",
  "retry_count": 0,
  "fallback_count": 0,
  "notes": "No secret values."
}
```

Required fields:

- `id`
- `automation`
- `route`
- `trigger`
- `scheduled`
- `repo`
- `source`
- `started_at`
- `status`
- `can_spend_tokens`
- `cost_class`
- `estimated_cost_ue`

## 4. Cost class defaults

Use these defaults only when exact billing is not available.

| Route | Idle cost | Per-run default | Notes |
|---|---:|---:|---|
| `delivery-read` | 0 | 0.01 | Read-only status/API. |
| `reports-read-write` | 0 | 0.02 | Storage/display only. |
| `cloudflare-command-ingest` | 0 | 0.05 | Queues command but does not necessarily execute it. |
| `slack-codex-cloud` | 0 | 2.00 | Estimate for Codex Cloud via Slack run; adjust with actual data. |
| `direct-openai` | 0 | 5.00 | Higher risk because it uses API key; replace with billing export when available. |
| `github-codex-action` | 0 | 3.00 | GitHub workflow + Codex action estimate. |
| `local-bridge` | unknown | 1.00 | Needs local verification; depends on what runner does. |
| `claude-bridge` | unknown | 2.00 | Needs runner/billing verification. |
| `dashboard-refresh` | 0 | 0.10 | If no model calls. |
| `daily-backup` | 0 | 0.10 | If Git/GitHub only, no model calls. |

## 5. Weekly summary record

Weekly summaries should use Monday-Sunday UTC unless otherwise specified.

```json
{
  "week_start": "2026-04-27",
  "week_end": "2026-05-03",
  "currency": "UE",
  "total_estimated_cost_ue": 0,
  "confirmed_cost_ue": null,
  "estimated_cost_ue": 0,
  "unknown_cost_runs": 0,
  "run_count": 0,
  "scheduled_run_count": 0,
  "manual_run_count": 0,
  "token_spending_run_count": 0,
  "by_automation": [],
  "needs_verification": []
}
```

## 6. Active automation definition

An automation is **active** if at least one of these is true:

- it has a scheduled trigger: cron, launchd, GitHub `schedule`, Cloudflare Cron Trigger, external scheduler;
- it has a currently running process;
- it has queued/running commands;
- it has run in the last 24 hours;
- it has an enabled webhook/event trigger that reacts without user action.

An automation is **manual/API-triggered but idle** if it exists and works, but only runs after a user/API/dashboard command.

## 7. Current confirmed active-state rules

Repository-visible state:

- `brain-management` mobile dashboard workflow is `workflow_dispatch`, not confirmed scheduled.
- `codex-links` command bridge is API-triggered, not confirmed scheduled.
- `delivery` and `reports` APIs are passive unless called.
- `codex-daily-backups` is likely scheduled locally, but needs local verification on `air-andrii.lan`.
- ChatGPT/Codex UI Routines are not visible from GitHub and need UI/provider verification.

Scheduler ownership rule:

- ChatGPT Automations are the default scheduler for Morning System Upgrade, PR
  Merge Sweep, Codex Delivery Loop, and Weekly Live Safe Sweep.
- Codex-side automations must not duplicate those four workflows.
- Any Codex-side automation must record explicit reason, frequency, owner, stop
  condition, and token-risk note.
- Hourly Codex-side automation is a high-frequency loop and needs explicit
  operational-safety justification.
- Ponytail Gate is a documented rule/gate, not a plugin, dependency, global
  install, or separate scheduler.

Local audit snapshot from 2026-06-30:

- `codex-delivery-loop` duplicates ChatGPT `Codex Delivery Loop` and is scheduled
  five times daily; disable/archive or convert to manual.
- `codex-delivery-loop-now` is a one-count 12:00 delivery-loop duplicate that
  completed on 2026-06-30; keep inactive/archived after the one-shot run.
- `daily-upgrade-review` overlaps Morning System Upgrade unless kept only as a
  non-model data-refresh/publish implementation step.
- `finance-ezohata-daily-audit`, `psitherapy-reports-daily-audit`, and
  `reiki-yggdrasil-daily-audit` overlap PR/delivery sweep purposes and need
  explicit re-justification or disabling/reduction.
- `skill-progression-map` is a high token/code-change risk and duplicates
  delivery-style work; disable unless explicitly re-approved.
- `critical-ram-guard` is hourly; keep only as explicitly justified silent
  operational safety work, otherwise reduce cadence.

## 8. Weekly cost calculation algorithm

For a requested date range:

1. Collect run records from all available sources.
2. Normalize into run ledger records.
3. Filter by `started_at` inside the week.
4. Sum `estimated_cost_ue`.
5. Separately count runs where `estimated_cost_ue` is null/unknown.
6. Report confirmed billing separately if available.
7. Never treat missing logs as zero spend unless the source is confirmed complete.

## 9. Minimum dashboard fields

A monitoring dashboard should show:

- last updated
- active scheduled automations count
- active running automations count
- queued/running commands count
- last week estimated cost
- previous week estimated cost
- unknown-cost runs count
- high-risk routes enabled
- needs verification items

## 10. Recommended alert rules

Alert or highlight red if:

- any scheduled automation can spend tokens and has no budget cap;
- any run has `retry_count > 2`;
- any route falls back more than once;
- `direct-openai` becomes default route;
- weekly estimated cost exceeds `10 у.е.` without manual approval;
- unknown-cost runs are present for more than 7 days;
- local backup has not produced a visible commit/snapshot for more than 3 days.

## 11. Local verification remains required

To answer actual spend, these sources still need data:

- OpenAI/Codex billing or usage export, if direct API is used.
- GitHub Actions run history for `mobile-dashboard-launch.yml`.
- `codex-links` command storage export for last two weeks.
- Local `air-andrii.lan` cron/launchd/process check.
- Cloudflare dashboard/env status if route health is being audited.

Until then, weekly spend must be reported as `not measurable from current repository data` rather than guessed.
