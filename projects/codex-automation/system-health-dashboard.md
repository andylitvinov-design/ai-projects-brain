# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-11 Morning System Upgrade.
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
| Provider/live readiness | unknown | unknown | unknown | unknown | No provider/live mutation or new proof. [Psihotavr #168](https://github.com/andylitvinov-design/psihotavr/issues/168) and [Finance #614](https://github.com/andylitvinov-design/finance/issues/614) remain open. | Keep status blocked until provider/config/data/deploy/live behavior proof exists. |
| False success protection | 63/100 estimated | 60/100 estimated | +3 | high | Added and CI-validated a regression that rejects registry-only scheduler health, unsafe recurring-loop disable, and duplicate replacement. | Evening: verify the rule continues to block false healthy-loop claims in a later real drift/prevention case. |
| Delivery completion quality | 62/100 estimated | 61/100 estimated | +1 | high | PR #101 contains one coherent safe harness change; failed run #46 was diagnosed from raw evidence, fixed narrowly, and run #47 passed. | Preserve the failure→root cause→fix→green evidence chain; keep post-merge-main proof separate. |
| User pain repetition | 55/100 estimated | 55/100 estimated | 0 | low | The run applied the exact Evening handoff rather than only reporting it; no new user-correction artifact was observed. | Continue reporting concrete changed files, CI evidence, live scheduler state, and blockers. |
| Loop closure | 74/100 estimated | 70/100 estimated | +4 | high | Evening's top blocker was implemented; live Automations confirms exactly one enabled Morning System Upgrade and the expected Morning run was observed. | Evening: verify the recurring schedule remains enabled after this successful run. |
| Validation evidence | 75/100 estimated | 74/100 estimated | +1 | high | [Run #47](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29144466323) passed all four validators and uploaded a four-file raw evidence artifact. | Verify final PR/head CI and keep PR validation distinct from post-merge-main validation. |
| Regression/replay coverage | 72/100 estimated | 68/100 estimated | +4 | high | Coverage increased to 7 prompt regressions, 6 replay cases, 6 fixtures, and 14 deterministic samples; the new liveness fixture passed. | Keep the new behavior rule candidate until later operational prevention evidence exists. |
| Rule lifecycle health | 62/100 estimated | 60/100 estimated | +2 | high | Added the narrow required-loop liveness guardrail and validated it, but did not prematurely promote it to active behavior. | Evening: decide whether candidate status remains correct; promote only with repeated or real prevention evidence. |
| Automation noise / duplication | 68/100 estimated | 62/100 estimated | +6 | high | Registry now separates intended state, live enabled state, expected run observed, and latest outcome. Live check found one enabled Morning loop and no duplicate. | Recheck uniqueness and enabled state after completion; do not create replacement automations. |
| Active project momentum | 50/100 estimated | 50/100 estimated | 0 | low | Product/provider blockers stayed routed to exact issues; harness progress was not misreported as project/provider progress. | Route Psihotavr through `/delivery` + `/safe` or `/audit-ui`; route Finance through `/audit-fin`. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | 65/100 estimated across 9/10 scored metrics |
| Yesterday | 62/100 estimated |
| Change | +3 estimated |
| Strongest metric | Validation evidence at 75/100: four raw validator logs prove the new contract and fixture pass. |
| Weakest metric | Provider/live readiness remains unknown; active project momentum remains 50/100. |
| Biggest improvement today | Automation noise / duplication: 62 → 68 after evidence-ladder protection and live uniqueness verification. |
| Main blocker | Scheduler liveness now has structural and deterministic proof, but still needs later real prevention evidence; Psihotavr and Finance remain provider/live blocked. |

## Applied upgrade evidence

- [PR #101 — Protect recurring automation scheduler liveness](https://github.com/andylitvinov-design/ai-projects-brain/pull/101)
- [Failed diagnostic run #46](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29144392885): caught an overbroad negation matcher; artifact remained available.
- [Passing run #47](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29144466323): all four validators passed.
- [Run #47 artifact](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29144466323/artifacts/8246272809): four raw log files.
- Live Automations check: exactly one enabled Morning System Upgrade; no duplicate active Morning schedule.

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-11 | Morning System Upgrade | Implemented scheduler-liveness prompt/replay/fixture coverage, registry evidence ladder, validator protection, live uniqueness check, and CI recovery from run #46 to passing run #47. | False success 60→63; delivery 61→62; loop closure 70→74; validation 74→75; regression/replay 68→72; rule lifecycle 60→62; automation noise/liveness 62→68; overall 62→65. |
| 2026-07-10 | Evening Architecture Review | Verified Morning deltas, fetched a second successful raw CI job/artifact, discovered registry/live scheduler drift, and re-enabled the existing Morning schedule. | Validation 72→74; automation noise/liveness 50→62; overall 60→62. |
| 2026-07-10 | Morning System Upgrade | Added one local+CI evidence runner, protected its contract, updated the workflow, fetched raw logs/artifact, and merged PR #98. | Validation 55→72; false-success 55→60; delivery 55→60; loop closure 65→70; regression/replay 65→68; rule lifecycle 55→60. |
