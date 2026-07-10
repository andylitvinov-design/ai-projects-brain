# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-10 Evening Architecture Review.
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
| Provider/live readiness | unknown | unknown | unknown | unknown | No new provider/live proof. [Psihotavr #168](https://github.com/andylitvinov-design/psihotavr/issues/168) and [Finance #614](https://github.com/andylitvinov-design/finance/issues/614) remain open. | Keep status blocked until provider/config/data/deploy/live behavior proof exists. |
| False success protection | 60/100 estimated | 60/100 estimated | 0 | high | Morning's evidence-runner claim is supported by raw CI logs. Evening also caught a registry/live scheduler mismatch instead of treating the loop as healthy from docs alone. | Add a regression that blocks “automation active” claims when the required live schedule is disabled or unverified. |
| Delivery completion quality | 61/100 estimated | 60/100 estimated | +1 | high | PR #98 and the dashboard/ledger update in PR #99 both received successful raw CI runs and artifacts. Post-merge push-run evidence is still not retrievable. | Preserve PR/CI/artifact evidence and distinguish PR validation from post-merge-main validation. |
| User pain repetition | 55/100 estimated | 55/100 estimated | 0 | low | Reports remain concrete and linked; no new durable user-correction artifact was added tonight. | Add a narrow status rule for retryable provider/network errors versus terminal blockers when the next confirmed example is captured. |
| Loop closure | 70/100 estimated | 70/100 estimated | 0 | high | Morning consumed the prior handoff. Evening found the Morning scheduler disabled and restored the existing daily schedule without creating a duplicate. | Make required-loop liveness a checked part of Morning/Evening completion. |
| Validation evidence | 74/100 estimated | 72/100 estimated | +2 | high | [Run #42](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075603213) also passed the unified runner and uploaded a four-file artifact after the dashboard/metrics changes. | Add a retrievable post-merge-main run check or explicitly record connector limitation; never infer it from a PR run. |
| Regression/replay coverage | 68/100 estimated | 68/100 estimated | 0 | high | Six prompt regressions, five replay cases, five behavior fixtures and eleven deterministic samples remain mapped and CI-passing. | Add scheduler-liveness drift as a new candidate regression/replay/fixture class. |
| Rule lifecycle health | 60/100 estimated | 60/100 estimated | 0 | high | `validation-evidence-reproducibility-local-plus-ci` remains supported by raw evidence. Scheduler-liveness protection starts as candidate only. | Promote scheduler-liveness protection only after the new regression/fixture passes and a later run proves it detects drift. |
| Automation noise / duplication | 62/100 estimated | 50/100 estimated | +12 | high | Live automations were checked: no duplicate active core loops were found; the disabled Morning System Upgrade was re-enabled on its existing schedule. | Add registry/live state and missed-run evidence so a required automation cannot silently stop while docs still say active. |
| Active project momentum | 50/100 estimated | 50/100 estimated | 0 | low | Provider tickets remain exact, but neither open blocker gained live proof today. | Route Psihotavr through `/delivery` + `/safe` or `/audit-ui`; route Finance through `/audit-fin`. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | 62/100 estimated across 9/10 scored metrics |
| Yesterday | 60/100 estimated |
| Change | +2 estimated |
| Strongest metric | Validation evidence: two successful raw CI runs and downloadable four-file artifacts support the unified runner. |
| Weakest metric | Provider/live readiness remains unknown; active project momentum remains 50/100. |
| Biggest improvement today | Automation noise / duplication and liveness: 50 → 62 after live-state verification and scheduler repair. |
| Main blocker | Required automation liveness was not represented in the registry evidence model, while Psihotavr and Finance still lack provider/live proof. |

## Morning Health Delta Verification

| Morning claim | Evening decision | Current evening score | Reason |
| --- | --- | ---: | --- |
| Provider/live readiness stays unknown | accepted | unknown | No provider/live evidence appeared. |
| False success protection 55 → 60 | accepted | 60 | Unified runner contract and raw CI output support the change. |
| Delivery completion quality 55 → 60 | accepted, then +1 | 61 | PR #99 also passed the same raw evidence path; post-merge push proof remains unavailable. |
| User pain repetition 55 → 55 | accepted | 55 | No new durable correction artifact was recorded. |
| Loop closure 65 → 70 | accepted with repair | 70 | Prior handoff was consumed, but the next Morning schedule had become disabled and was restored tonight. |
| Validation evidence 55 → 72 | accepted, then +2 | 74 | Run #42 and its artifact independently repeated the four-validator evidence path. |
| Regression/replay coverage 65 → 68 | accepted | 68 | Existing mapped fixtures passed; no new failure class was added. |
| Rule lifecycle health 55 → 60 | accepted | 60 | Only the structural reproducibility rule is active; behavior/provider rules remain candidate. |
| Automation noise 50 → 50 | corrected upward | 62 | Live state was checked, no duplicate core loops were found, and the disabled Morning schedule was restored. |
| Active project momentum 50 → 50 | accepted | 50 | Provider issues remain open without new proof. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-10 | Evening Architecture Review | Verified Morning deltas, fetched a second successful raw CI job/artifact, discovered registry/live scheduler drift, and re-enabled the existing Morning System Upgrade schedule. | Validation 72→74; automation noise/liveness 50→62; overall 60→62. |
| 2026-07-10 | Morning System Upgrade | Added one local+CI evidence runner, protected its contract, updated the workflow, fetched successful raw job logs and artifact, and merged PR #98. | Validation 55→72; false-success protection 55→60; delivery 55→60; loop closure 65→70; regression/replay 65→68; rule lifecycle 55→60. |
| 2026-07-09 | Evening Architecture Review | Corrected validation confidence to low because artifact capture existed but raw output was unavailable. | Produced the exact single-runner handoff consumed on 2026-07-10. |

## Evidence

- Applied runner upgrade: [PR #98](https://github.com/andylitvinov-design/ai-projects-brain/pull/98)
- First raw CI evidence: [run #40](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075418092)
- Dashboard/metrics validation: [run #42](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075603213)
- Run #42 artifact: [agent-harness-validation-evidence](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29075603213/artifacts/8220573543)
