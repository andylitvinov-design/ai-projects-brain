# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-10 Morning System Upgrade.
Update owners: Evening Architecture Review and Morning System Upgrade.

Live dashboard:

```txt
https://brain-management.pages.dev/system-health-dashboard/
```

Canonical dashboard source: `projects/codex-automation/system-health-dashboard.md`

Machine-readable source: `projects/codex-automation/system-health-dashboard.json`

Live data mirror: `system-health-dashboard/data/current-system-health-dashboard.json`

## Purpose

This dashboard tracks the daily health of Andrey's agent/Codex operating system. Scores change only when evidence supports the affected metric. Provider/live readiness changes only from provider/live proof.

## Current dashboard

| Metric / parameter | Today | Yesterday | Change | Confidence | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Provider/live readiness | unknown | unknown | unknown | unknown | No provider/product/live mutation or proof; `psihotavr#168` and `finance#614` remain blockers. | Keep blocked until provider/env/data/deploy/live behavior proof exists. |
| False success protection | 60/100 estimated | 55/100 estimated | +5 | high | Unified runner contract is protected by `validate-agentic-prompts.mjs`; raw CI job log and artifact prove the guard executed. | Evening: confirm the post-merge main run preserves the same contract. |
| Delivery completion quality | 60/100 estimated | 55/100 estimated | +5 | high | [PR #98](https://github.com/andylitvinov-design/ai-projects-brain/pull/98) was validated, artifact-backed, and merged as `d559499`. | Keep exact changed files, raw validation, and blockers in every completion report. |
| User pain repetition | 55/100 estimated | 55/100 estimated | 0 | low | Report and dashboard remain concrete; no new user-correction evidence was observed. | Continue linking live dashboard, changed files, validation, and exact blockers. |
| Loop closure | 70/100 estimated | 65/100 estimated | +5 | high | Evening's single-runner handoff was consumed, implemented, CI-validated, and merged. | Evening: verify today's delta and rank the next safe system issue. |
| Validation evidence | 72/100 estimated | 55/100 estimated | +17 | high | [CI run #40](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075418092) passed all four validators; raw job logs were fetched and artifact `agent-harness-validation-evidence` contains four log files. | Fetch/check the post-merge main artifact; keep raw-output and live-proof states separate. |
| Regression/replay coverage | 68/100 estimated | 65/100 estimated | +3 | high | CI raw output proves 6 prompt regressions, 5 replay cases, and 5 behavior fixtures / 11 samples passed deterministic checks. | Keep behavior rules candidate until live model/automation prevention evidence exists. |
| Rule lifecycle health | 60/100 estimated | 55/100 estimated | +5 | high | Promoted only the structural sub-rule `validation-evidence-reproducibility-local-plus-ci`; behavior rules remain candidate. | Evening: verify promotion from raw logs; do not promote provider/live behavior rules. |
| Automation noise / duplication | 50/100 estimated | 50/100 estimated | 0 | low | No automation was created or duplicated. | Compare live prompts with registry when available; avoid duplicate schedulers. |
| Active project momentum | 50/100 estimated | 50/100 estimated | 0 | low | Provider/product tickets remain exact but no live progress was proven. | Route Psihotavr through `/delivery` + `/safe`/`/audit-ui`; Finance through `/audit-fin`. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | 60/100 estimated across 9/10 scored metrics |
| Yesterday | 56/100 estimated |
| Change | +4 estimated |
| Strongest metric | Validation evidence: four raw CI validator outputs and the artifact are now available. |
| Weakest metric | Provider/live readiness remains unknown/blocked. |
| Biggest improvement today | Validation evidence: 55 → 72 estimated, high confidence. |
| Main blocker | Provider/live proof for Psihotavr #168 and Finance #614 remains missing. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-10 | Morning System Upgrade | Added one local+CI evidence runner, protected its contract, updated the workflow, fetched successful raw job logs and artifact, and merged PR #98. | Validation evidence 55→72; false-success protection 55→60; delivery 55→60; loop closure 65→70; regression/replay 65→68; rule lifecycle 55→60. |
| 2026-07-09 | Evening Architecture Review | Corrected validation confidence to low because artifact capture existed but raw output was unavailable. | Produced the exact single-runner handoff consumed today. |
| 2026-07-09 | Morning System Upgrade | Added CI raw-evidence artifact capture and validator protection. | Moved evidence from workflow-defined to artifact-capture-defined. |

## Evidence

- Applied upgrade: [PR #98](https://github.com/andylitvinov-design/ai-projects-brain/pull/98)
- Raw CI run: [Agent Harness Validators #40](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075418092)
- Artifact: [agent-harness-validation-evidence](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075418092/artifacts/8220506285)
