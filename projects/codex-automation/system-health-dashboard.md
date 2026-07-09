# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-09.
Update owners: Evening Architecture Review and Morning System Upgrade.

Live dashboard:

```txt
https://brain-management.pages.dev/system-health-dashboard/
```

Canonical dashboard source:

```txt
projects/codex-automation/system-health-dashboard.md
```

Machine-readable source mirror:

```txt
projects/codex-automation/system-health-dashboard.json
```

Live brain-management data mirror:

```txt
system-health-dashboard/data/current-system-health-dashboard.json
```

## Purpose

This dashboard tracks the health of Andrey's agent/Codex operating system as a daily management table.

Every Morning System Upgrade and Evening Architecture Review should update or reference this dashboard and include the live dashboard URL in the final report when repository access is available.

## Update rules

- Evening writes diagnosis: current score, yesterday score, change, evidence, what should be done tomorrow.
- Morning writes implementation result: what was done today, score after the applied upgrade, confidence, and what Evening must verify.
- Do not invent numbers. If evidence is missing, use `unknown` and create the next measurement action.
- Do not inflate `Provider/live readiness` from documentation-only changes. Provider/live readiness rises only from provider/live proof.
- Use confidence labels: `high`, `medium`, `low`, `unknown`.
- Keep the dashboard compact; detailed explanations belong in the Morning/Evening reports and ledgers.
- The GitHub markdown is the durable source-of-truth; the brain-management route is the live public dashboard surface.

## Current dashboard

| Metric / parameter | Today | Yesterday | Change | Confidence | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Provider/live readiness | unknown | unknown | unknown | unknown | Live dashboard route created; provider/live score must be filled only from provider/live proof. | Evening: identify exact provider/live blockers and avoid score inflation from docs-only work. |
| False success protection | unknown | unknown | unknown | unknown | Live dashboard route created; Morning/Evening now must show before/after health changes. | Morning: connect latest provider/live false-success evidence to a score and handoff. |
| Delivery completion quality | unknown | unknown | unknown | unknown | Live dashboard route created; no delivery evidence scored in this initial baseline. | Evening: compare completed work versus code-only/report-only completion. |
| User pain repetition | unknown | unknown | unknown | unknown | User requested a live dashboard rather than GitHub markdown; live route was added to brain-management. | Evening: score whether reports include live dashboard link and real metric table. |
| Loop closure | unknown | unknown | unknown | unknown | Live dashboard route created to close Morning ↔ Evening feedback loop. | Morning: update dashboard after applied upgrades; Evening: verify claimed deltas. |
| Validation evidence | unknown | unknown | unknown | unknown | Live dashboard route created; validation score must use raw local/CI/check evidence when available. | Morning: run or hand off validator evidence and record score impact. |
| Regression/replay coverage | unknown | unknown | unknown | unknown | Live dashboard route created; no new replay coverage scored here. | Evening: check whether today's failure classes have prompt/replay/fixture coverage. |
| Rule lifecycle health | unknown | unknown | unknown | unknown | Live dashboard route created; lifecycle status should now include dashboard adoption. | Morning: mark rules candidate/active/revised/deprecated only with evidence. |
| Automation noise / duplication | unknown | unknown | unknown | unknown | Live dashboard route created; no duplicate automation changes scored here. | Evening: check whether dashboard replaces repetitive report sections rather than adding noise. |
| Active project momentum | unknown | unknown | unknown | unknown | Live dashboard route created as cross-cycle management surface. | Daily Improve/Evening: ensure active projects have clear next routes and no stalled blockers. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | unknown |
| Scored metrics coverage | 0/10 |
| Strongest metric | unknown |
| Weakest metric | unknown |
| Biggest improvement today | Live dashboard route created; numeric baseline pending evidence. |
| Main blocker | No prior scored baseline yet. Next Evening Review should establish the first evidence-backed baseline. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-09 | Manual upgrade | Created live dashboard route in brain-management after Andrey requested that dashboard be a live link, not only GitHub markdown. | Morning/Evening must now update/link `https://brain-management.pages.dev/system-health-dashboard/`. |

## Expected report link format

Morning and Evening reports should include:

```txt
Dashboard: https://brain-management.pages.dev/system-health-dashboard/
```
