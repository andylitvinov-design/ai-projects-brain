# Agent/Codex System Health Dashboard

**Status:** active canonical dashboard. Public publication state: `STALE` until the live snapshot timestamp matches canonical.

**Last updated:** 2026-07-12 10:05 Europe/Podgorica.

- **Canonical metrics:** [GitHub dashboard](https://github.com/andylitvinov-design/ai-projects-brain/blob/main/projects/codex-automation/system-health-dashboard.md)
- **Public dashboard:** [brain-management system health](https://brain-management.netlify.app/system-health-dashboard/)
- **Machine source:** `projects/codex-automation/system-health-dashboard.json`

## Overall health

| Parameter | Current value |
| --- | --- |
| Overall score | **69/100 estimated** |
| Previous score | 67/100 estimated |
| Change | **+2** |
| Scored core metrics | 9/10 |
| Strongest | Loop closure and Validation evidence — 81/100 |
| Weakest scored | User pain repetition — 52/100 |
| Unscored | Provider/live readiness — unknown |
| Public freshness | **STALE** |

## Core health metrics

| Metric | Today | Yesterday | Change | Confidence | Done today | Tomorrow action |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Provider/live readiness | unknown | unknown | 0 | high | Kept unscored; harness evidence was not converted into live readiness | Define denominator and close one provider proof gap |
| False success protection | 70 | 66 | **+4** | high | Publication remains STALE until all stages agree | Verify the next publication end-to-end |
| Delivery completion quality | 68 | 67 | +1 | high | Recorded merge → raw evidence → dashboard → handoff closure | Require the same closure chain |
| User pain repetition | 52 | 52 | 0 | medium | Applied safe changes directly | Track observed repeated corrections |
| Loop closure | 81 | 79 | **+2** | high | Completed diagnosis → implementation → validation → dashboard → handoff | Evening verifies deltas and selects next blocker |
| Validation evidence | 81 | 78 | **+3** | high | Preserved raw validator evidence | Separate PR CI from post-merge-main CI |
| Regression/replay coverage | 75 | 72 | **+3** | high | Verified 8 regressions, 7 replays, 7 fixtures, 26 samples | Add only distinct new failure classes |
| Rule lifecycle health | 66 | 64 | +2 | medium | Retained publication rule as candidate | Promote after a second operational case |
| Automation noise / duplication | 72 | 72 | 0 | high | Verified one enabled Morning schedule and no duplicate | Recheck after every run |
| Active project momentum | 56 | 56 | 0 | medium | Did not count docs or routing as product progress | Close one provider/deployment blocker |

## Operational indicators

These indicators do not inflate the core score until a stable numeric denominator exists.

| Indicator | Current | Target | Next action |
| --- | --- | --- | --- |
| Dashboard freshness | **STALE** | LIVE within the same Morning/Evening run | Sync mirror, deploy, verify public timestamp |
| Publication trace completeness | **2/4 stages verified** | 4/4 | Verify canonical, mirror, deploy and live stages |
| Scheduler liveness | 1 enabled Morning schedule; no duplicate | exactly 1 enabled | Check live scheduler at end of every run |
| Validation reproducibility | 6 raw validator classes | all required validators with raw evidence | Keep logs and artifact references current |
| Rework / recovery rate | unknown | measured daily | Count reopened tasks, repeated fixes and failed attempts |
| Automation hidden cost | unknown | measured daily | Count retries, duplicate scans and avoidable reruns |
| Rollback / blast-radius readiness | unknown | proved for live changes | Record rollback evidence for provider/live delivery |

## Deterministic aggregate

```txt
aggregate_method: arithmetic_mean_of_numeric_core_metrics
unknown_metric_policy: exclude_from_numeric_mean_and_report_in_coverage
score_sum: 621
numeric_metric_count: 9
metric_count_total: 10
coverage: 9/10
reported_score: 69
yesterday_score: 67
delta: +2
```

## Publication evidence ladder

A dashboard-changing run is not publication-complete until the public snapshot timestamp matches canonical.

| Stage | Status | Current evidence |
| --- | --- | --- |
| canonical_updated | verified | Canonical JSON and Markdown updated on 2026-07-12 |
| mirror_synced | pending sync | brain-management mirror must receive the same snapshot |
| deploy_identified | verified | Existing Netlify deploy identified; automatic Git source commit remains unproven |
| live_verified | stale | Last verified public snapshot predates canonical |

`SUCCESS` requires all four stages to be verified. A code commit, mirror update, or manual deploy alone is not live success.

## Mandatory update contract

Both **Morning System Upgrade** and **Evening Architecture Review** must, whenever the dashboard changes:

1. Update this Markdown and the canonical JSON.
2. Sync the `brain-management` mirror when repository access exists.
3. Verify deploy identity and public snapshot timestamp.
4. Report `LIVE`, `STALE`, `BLOCKED`, or `NEEDS_VERIFICATION`.
5. Put the clickable dashboard link at the top of the final report.
6. Never invent scores; use `unknown` when evidence is missing.

## Current blockers

- Automatic GitHub → Netlify publication is not yet proven by branch and source commit.
- Psihotavr #168 still needs provider/live proof.
- Finance #614 still needs strict finance verification and provider balance resolution.
