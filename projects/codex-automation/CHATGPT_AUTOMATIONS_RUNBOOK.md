# ChatGPT Automations Runbook

Last updated: 2026-07-12.

Purpose: reduce false alarms and repeated debugging loops around ChatGPT Automations, especially when a run happened but the result is not visible in the current chat.

## 1. Source of truth

Use ChatGPT Automations metadata as the scheduler source of truth for recurring agent work. Do not infer a missed run only from the absence of a visible answer in the current conversation.

For each automation check:

- `is_enabled`
- `schedule`
- `default_timezone`
- `last_run_time`
- `next_run_time`
- `conversation_id`
- whether notifications/email are enabled in the automation runtime

`last_run_time` can be stored as UTC. Convert it to the automation timezone before deciding whether the run was late, missed, or successful.

## 2. Expected current recurring ChatGPT automations

These are expected active scheduler-owned loops. Re-verify from Automations before changing this list.

| Automation | Expected cadence | Expected owner | Notes |
|---|---|---|---|
| Morning System Upgrade | daily 08:30 Europe/Kyiv | ChatGPT Automations | system memory/rules/harness improvement, daily Self-Harness Review, Ponytail audit lens, efficiency signals |
| PR Merge Sweep | daily 08:30 Europe/Kyiv | ChatGPT Automations | active PR/delivery sweep, safe merge candidates, wrong-base merge detection |
| Daily Improve Sweep | daily 09:00 Europe/Sarajevo / Europe/Podgorica context | ChatGPT Automations | read-only strategic improvement planning |
| Codex Delivery Loop | daily 12:00 Europe/Kyiv | ChatGPT Automations | unfinished delivery work, blocked PRs, failed checks, forgotten branches/worktrees |
| Weekly Agent Harness Review | Sunday 10:00 Europe/Kyiv | ChatGPT Automations | expanded 7-day self-harness review: repeated agent errors, `/save`, instruction cleanup, Ponytail cleanup findings |
| Weekly Live Safe Sweep | Monday 09:00 Europe/Sarajevo / Europe/Podgorica context | ChatGPT Automations | weekly `/safe` pass for live/public project security and UX |\n| UI Design Intelligence | Monday and Thursday 07:00 Europe/Podgorica | ChatGPT Automations | research and update the evidence-backed `/audit-ui` scorecard; docs-only PR, no product mutation |

## 3. Visibility rule

A scheduled automation can run successfully without producing a visible message in the current chat when:

- the automation belongs to a different `conversation_id`;
- notifications are disabled;
- the prompt contains a guard such as "if already completed today, do nothing";
- the run emits no user-facing update because there is no new finding;
- another same-day one-off/manual sweep already completed the same work.

Therefore, when Andrey asks "why did it not run?", answer from `last_run_time`, schedule, timezone, and conversation visibility. Do not start by debugging Codex Cloud, Slack, Cloudflare, or local bridge unless the ChatGPT Automation metadata shows no run or an actual failure.

## 4. Missed-run decision tree

1. List Automations.
2. Find the exact title.
3. If `is_enabled=false`, report that it is disabled and do not assume scheduler failure.
4. If `last_run_time` is present for the expected date after timezone conversion, report that the run happened and explain visibility conditions.
5. If `last_run_time` is stale and `next_run_time` is null or impossible, treat scheduler state as `needs verification`.
6. If the run is missing but the task is safe and useful, run the work once manually or leave a ready `/delivery` prompt, depending on the task boundary.
7. Do not create duplicate recurring automations during a scheduled run.

## 5. Self-harness ownership

Daily self-harness learning belongs inside `Morning System Upgrade`. It should review recent agent errors, missed `/save`, weak prompts, overengineering, and repeated misunderstandings, then save only durable lessons.

The Sunday `Weekly Agent Harness Review` is the expanded version. It should group the previous 7 days of failures into patterns, tighten or link existing instructions, clean duplicate rules, and create focused PRs or `/delivery` prompts for changes that are too broad for the daily run.

Do not create additional self-harness automations unless there is a distinct owner, cadence, stop condition, and non-duplicate reason.

## 6. Codex-side automation boundary

ChatGPT Automations own recurring agent scheduling by default. Codex-side automations are allowed only when all of these are documented:

- reason
- frequency
- owner
- stop condition
- token-risk note
- why it is not a duplicate of an existing ChatGPT Automation

Do not add or keep hourly Codex loops unless the hourly cadence is explicitly justified as operational safety work.

## 7. Report format for automation-status checks

Use this compact format:

```text
Status: ran / missed / disabled / needs verification
Automation:
Expected local time:
Observed last_run_time:
Timezone conversion:
Visible in current chat: yes/no/needs verification
Likely reason if user did not see it:
Action taken:
Next action:
```

## 8. Safety notes

- Never expose secret values from env, Cloudflare, Slack, GitHub, or local bridge config.
- Do not trigger real command/delivery flows just to check whether a scheduled ChatGPT Automation ran.
- Do not disable a recurring automation unless it is fully completed, duplicate, unsafe, or explicitly superseded.
- Mark local-machine cron/launchd details as `needs verification` unless checked on the Mac that owns them.
