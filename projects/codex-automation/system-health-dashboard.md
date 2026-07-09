# Agent/Codex System Health Dashboard

Status: active dashboard.
Last updated: 2026-07-09.
Update owners: Evening Architecture Review and Morning System Upgrade.

Canonical dashboard link:

```txt
projects/codex-automation/system-health-dashboard.md
```

Machine-readable mirror:

```txt
projects/codex-automation/system-health-dashboard.json
```

## Purpose

This dashboard tracks the health of Andrey's agent/Codex operating system as a daily management table.

Every Morning System Upgrade and Evening Architecture Review should update or reference this dashboard and include a clickable GitHub link to the updated file in the final report when repository access is available.

## Update rules

- Evening writes diagnosis: current score, yesterday score, change, evidence, what should be done tomorrow.
- Morning writes implementation result: what was done today, score after the applied upgrade, confidence, and what Evening must verify.
- Do not invent numbers. If evidence is missing, use `unknown` and create the next measurement action.
- Do not inflate `Provider/live readiness` from documentation-only changes. Provider/live readiness rises only from provider/live proof.
- Use confidence labels: `high`, `medium`, `low`, `unknown`.
- Keep the dashboard compact; detailed explanations belong in the Morning/Evening reports and ledgers.

## Current dashboard

| Metric / parameter | Today | Yesterday | Change | Confidence | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Provider/live readiness | unknown | unknown | unknown | unknown | Dashboard created; provider/live score must be filled only from provider/live proof. | Evening: identify exact provider/live blockers and avoid score inflation from docs-only work. |
| False success protection | unknown | unknown | unknown | unknown | Dashboard created; Morning/Evening now must show before/after health changes. | Morning: connect latest provider/live false-success evidence to a score and handoff. |
| Delivery completion quality | unknown | unknown | unknown | unknown | Dashboard created; no delivery evidence scored in this initial baseline. | Evening: compare completed work versus code-only/report-only completion. |
| User pain repetition | unknown | unknown | unknown | unknown | User requested dashboard-style metrics; request converted into durable dashboard contract. | Evening: score whether reports answer Andrey's repeated request for real changes and numbers. |
| Loop closure | unknown | unknown | unknown | unknown | Dashboard created to close Morning ↔ Evening feedback loop. | Morning: update dashboard after applied upgrades; Evening: verify claimed deltas. |
| Validation evidence | unknown | unknown | unknown | unknown | Dashboard created; validation score must use raw local/CI/check evidence when available. | Morning: run or hand off validator evidence and record score impact. |
| Regression/replay coverage | unknown | unknown | unknown | unknown | Dashboard created; no new replay coverage scored here. | Evening: check whether today's failure classes have prompt/replay/fixture coverage. |
| Rule lifecycle health | unknown | unknown | unknown | unknown | Dashboard created; lifecycle status should now include dashboard adoption. | Morning: mark rules candidate/active/revised/deprecated only with evidence. |
| Automation noise / duplication | unknown | unknown | unknown | unknown | Dashboard created; no duplicate automation changes scored here. | Evening: check whether dashboard replaces repetitive report sections rather than adding noise. |
| Active project momentum | unknown | unknown | unknown | unknown | Dashboard created as cross-cycle management surface. | Daily Improve/Evening: ensure active projects have clear next routes and no stalled blockers. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | unknown |
| Scored metrics coverage | 0/10 |
| Strongest metric | unknown |
| Weakest metric | unknown |
| Biggest improvement today | Dashboard contract created; numeric baseline pending evidence. |
| Main blocker | No prior scored baseline yet. Next Evening Review should establish the first evidence-backed baseline. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-09 | Manual upgrade | Created dashboard contract after Andrey requested a dashboard with today/yesterday/change/done/tomorrow columns. | Dashboard initialized; Morning/Evening must update/link it going forward. |

## Expected report link format

Morning and Evening reports should include:

```txt
Dashboard: https://github.com/andylitvinov-design/ai-projects-brain/blob/main/projects/codex-automation/system-health-dashboard.md
```
