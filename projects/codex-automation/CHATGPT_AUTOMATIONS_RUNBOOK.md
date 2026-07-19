# ChatGPT Automations Runbook

Last scheduler snapshot verified: 2026-07-19.

Purpose: reduce false alarms, stale scheduler maps, duplicate automations, and repeated debugging loops when a run happened but its result is not visible in the current chat.

## 1. Source of truth

Use live ChatGPT Automations metadata as the scheduler source of truth for recurring agent work. Do not infer current scheduler state from this file, the automation prompt registry, old reports, or the absence of a visible answer in the current conversation.

For each automation check:

- `is_enabled`;
- exact title;
- `schedule`;
- `default_timezone`;
- `last_run_time`;
- `next_run_time` when available;
- `conversation_id` when available;
- notification/email state;
- recurring, one-time, or condition-watch semantics.

`last_run_time` can be stored as UTC. Convert it to the automation timezone before deciding whether the run was late, missed, or successful.

Static scheduler tables are historical snapshots only. When live access exists, compare the live list with this snapshot and report drift. Do not silently repair drift by creating a duplicate automation.

## 2. Last verified recurring scheduler snapshot

Observed from live ChatGPT Automations on 2026-07-19. Re-verify before using these times operationally.

| Automation | Observed cadence | Purpose |
|---|---|---|
| PR Merge Sweep | daily 06:30 Europe/Podgorica | safe PR recovery, merge, wrong-base and stale-branch detection |
| Morning Task Sweep | daily 06:45 Europe/Podgorica | reconcile unfinished Codex/cloud/local-visible delivery chains and create missing PRs |
| Daily Strategic Improve & Apply | daily 07:00 Europe/Podgorica | portfolio Big Goals, deterministic strategic deltas, exactly three safe high-leverage changes |
| Morning System Upgrade | daily 07:30 Europe/Podgorica | applied harness/dashboard/validator improvements and publication handoff |
| Dashboard Publication Watch | daily 08:30 and 20:30 Europe/Berlin, condition watch | verify canonical -> mirror -> workflow -> Netlify -> public UI and repair safe publication drift |
| Evening Architecture Upgrade | daily 20:00 Europe/Uzhgorod | architecture metrics, one structural upgrade, Morning handoff, publication verification |
| Sales Audit Intelligence | Sunday 08:00 Europe/Podgorica, flexible | update the canonical `/audit-sales` framework only |
| Weekly Live Safe Sweep | Sunday 09:00 Europe/Sarajevo | live/public security and UX sweep with minimal safe fixes |
| Weekly Agent Harness Review | Sunday 10:00 Europe/Kyiv | seven-day failure mining, delivery-proof audit, stabilization and durable harness updates |
| Portfolio Sales Audit | Monday 09:00 Europe/Podgorica | run `/audit-sales` across active public sites and preserve longitudinal findings |
| UI Design Intelligence | Monday and Thursday 07:00 Europe/Podgorica | evidence-backed `/audit-ui` marker maintenance |

Legacy names in older maps such as `Daily Improve Sweep`, `Evening Architecture Review`, or a recurring `Codex Delivery Loop` are not current scheduler proof. Resolve by live title and schedule before acting.

## 3. Canonical role boundaries

- PR Merge Sweep owns PR/merge recovery.
- Morning Task Sweep owns unfinished task-chain reconciliation and automatic missing-PR creation.
- Daily Strategic Improve & Apply owns portfolio strategy and exactly three safe high-leverage changes.
- Morning System Upgrade owns morning harness implementation.
- Evening Architecture Upgrade owns evening architecture diagnosis plus one primary safe structural upgrade.
- Dashboard Publication Watch owns post-cycle publication observation and safe recovery, not dashboard business-content generation.
- Weekly Agent Harness Review owns seven-day pattern extraction and the stabilization gate.
- Sales and UI intelligence loops maintain their audit frameworks; portfolio audits inspect sites but do not mutate product code without a separate authorized delivery route.

Do not let two automations own the same publication writer, PR sweep, or strategy write path.

## 4. Visibility rule

A scheduled automation can run successfully without producing a visible message in the current chat when:

- it belongs to another conversation;
- notifications are disabled;
- its prompt suppresses healthy/no-change output;
- another same-day run already completed equivalent work;
- a condition-watch found no alert condition.

When Andrey asks why something did not run, answer from live metadata first. Do not begin with Codex Cloud, Slack, Cloudflare, Netlify, or local-bridge debugging unless scheduler evidence shows a missing/failed run or the automation's own task requires those providers.

## 5. Missed-run and drift decision tree

1. List live automations.
2. Match the exact current title; check known legacy names only as aliases.
3. Confirm `is_enabled`, schedule, timezone, and run semantics.
4. Convert `last_run_time` to the configured timezone.
5. If the expected run occurred, report that it ran and explain visibility conditions.
6. If the live schedule differs from this snapshot, report `SCHEDULER_MAP_DRIFT` and update the docs through one focused PR when safe.
7. If the automation is missing but an equivalent current automation exists, reuse it; do not create a duplicate.
8. If the run is missing and the task is safe and useful, perform one manual recovery or update the existing automation, depending on the task boundary.
9. Do not create a new recurring automation during a scheduled automation run.

## 6. Self-harness and stabilization ownership

Daily self-harness learning belongs inside Morning System Upgrade. It reviews recent agent errors, missed `/save`, weak prompts, overengineering, and repeated misunderstandings, then saves only durable lessons.

The Weekly Agent Harness Review is the expanded seven-day pass. It must read `systems/harness-stabilization-gate.md` and apply it when the same harness chain produces two post-merge regression PRs in 24 hours or three related PRs in 72 hours.

When stabilization triggers:

- freeze unrelated feature additions for that chain;
- reuse one existing PR or create one consolidated stabilization PR;
- run the full affected safe path;
- require one clean scheduled/production-equivalent cycle before `STABILIZED_VERIFIED`;
- do not award progress from architecture-only evidence while runtime stabilization is still pending.

Do not create additional self-harness automations without a distinct owner, cadence, stop condition, and non-duplicate reason.

## 7. Codex-side automation boundary

ChatGPT Automations own recurring agent scheduling by default. A Codex-side automation requires documented:

- reason;
- frequency;
- owner;
- stop condition;
- token-risk note;
- proof that it does not duplicate an existing ChatGPT Automation.

Do not keep high-frequency model loops merely as retry windows. Operational, credential-free health guards may use tighter cadence only when the safety reason and no-op behavior are explicit.

## 8. Compact report format

```text
Status: ran / missed / disabled / drifted / needs verification
Automation:
Expected local time:
Observed live schedule:
Observed last_run_time:
Timezone conversion:
Visible in current chat: yes/no/needs verification
Map drift: none / exact difference
Action taken:
Next action:
```

## 9. Safety notes

- Never expose secret values from env, provider, Slack, GitHub, or local bridge configuration.
- Do not trigger real delivery flows merely to test scheduler liveness.
- Do not disable a healthy recurring automation because one run succeeded.
- Do not create a replacement automation while an equivalent one exists.
- Mark local-machine cron/launchd state `needs verification` unless checked on the owning machine.
