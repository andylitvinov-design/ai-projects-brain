# Agent/Codex System Health Dashboard

**Canonical dashboard:** https://github.com/andylitvinov-design/ai-projects-brain/blob/main/projects/codex-automation/system-health-dashboard.md  
**Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/ — `NEEDS_VERIFICATION`

**Last updated:** 2026-07-12 23:20 Europe/Kyiv  
**Metric model:** `observable_outcomes_v2`  
**Contract:** `systems/upgrade-cycle-metrics.md`

## Critical SLOs

| SLO | Current | Target | Status |
| --- | --- | --- | --- |
| Critical false-success claims | 0 observed in current cycle | 0 | PASS |
| Dashboard publication freshness | 3/4 stages verified | 4/4 in same run | NEEDS_VERIFICATION |
| Scheduler uniqueness | 1 Morning + 1 Evening; 0 duplicates | exactly one enabled of each | PASS |

Critical SLO failures override every aggregate or legacy score.

## 1. Product and business outcomes

| Metric | Current | Numerator / denominator | Period | Target | Next action |
| --- | --- | --- | --- | --- | --- |
| Product Delivery Rate | unknown | not instrumented | rolling 7 days | ≥70% selected tasks live-verified | Record selected user-visible tasks and live completions |
| Business Growth Outcomes | not instrumented | offers, leads, orders, conversion, revenue | rolling 7/30 days | at least one measured outcome per growth cycle | Instrument one KPI in one active project |
| User Pain Recurrence Rate | unknown; 1 repeated correction observed | 1 / unknown | rolling 7 days | <10%; zero repeated critical pain | Count completed requests and repeated corrections |

## 2. Software delivery flow

| Metric | Current | Period | Target | Next action |
| --- | --- | --- | --- | --- |
| Lead Time to Live | unknown | rolling 7/30 days | trend downward | Store task acceptance and production verification timestamps |
| Deployment Frequency | unknown | rolling 7 days | measured per active project | Record verified production deploys |
| Change Fail Rate | unknown | rolling 30 days | trend downward | Record verified changes and repair-required changes |
| Failed Deployment Recovery Time | unknown | rolling 30 days | trend downward | Capture failure detection and recovery timestamps |
| Rework Rate | unknown; 1 repeated request observed | rolling 7 days | <15% | Count delivery attempts, reopens and repeated fixes |

## 3. Live reliability and provider readiness

| Metric | Current | Numerator / denominator | Target | Next action |
| --- | --- | --- | --- | --- |
| Provider/Live Readiness Ratio | unknown | inventory missing | 100% active production surfaces | Create stable provider surface inventory |
| Publication Freshness | NEEDS_VERIFICATION | 3 / 4 stages | LIVE in same run | Complete issue #33 and match public timestamp to canonical |
| Rollback Readiness Ratio | unknown; current dashboard deploy partial | unknown | 100% risky live changes | Record source commit, prior stable deploy and rollback target |

## 4. Agent quality and safety

| Metric | Current | Numerator / denominator | Target | Next action |
| --- | --- | --- | --- | --- |
| Task Success Rate | unknown | not instrumented | ≥85% without repeated correction | Record first-pass, recovery, abstention and incomplete outcomes |
| Live Completion Rate | unknown | not instrumented | ≥90% | Tag live-dependent tasks and store live proof result |
| False Success Rate | 0 critical observed | 0 / unknown | 0 critical | Count all SUCCESS/DONE claims and reversals |
| Eval Pass Rate | 26/26 expected behavior | 26 / 26 | 100% required samples | Rerun after prompt/guard changes |
| Correct Abstention Rate | unknown; one correct NEEDS_VERIFICATION classification | 1 / unknown | 100% missing-evidence cases | Count all evidence-missing decisions |

## 5. Efficiency and flow

| Metric | Current | Target | Next action |
| --- | --- | --- | --- |
| Verification Retry Rate | unknown | trend downward | Record avoidable retries and verification sequences |
| Duplicate Scan Rate | unknown | <10% | Record scans and whether they produced new evidence |
| Avoidable Handoff Rate | unknown; one signal observed | trend downward | Count tasks where safe direct execution was available |
| Context and Retry Cost | not instrumented | measured | Add non-sensitive retry and rerun counters |

## 6. Governance and learning

| Metric | Current | Numerator / denominator | Target | Next action |
| --- | --- | --- | --- | --- |
| Evidence Completeness Ratio | unknown | not formalized | 100% completed claims | Define required evidence fields by task class |
| Failure-Class Coverage | 7 mapped; total unknown | 7 / unknown | 100% recurring classes | Maintain active failure-class inventory |
| Rule Lifecycle State | publication guard candidate | n/a | no stale/duplicate active rules | Promote after second independent operational case |
| Scheduler Health | 2/2 intended enabled; 0 duplicates | 2 / 2 | 100%; 0 duplicates; 0 missed runs | Recheck after every run |

## Momentum

**Status: `SYSTEM_HEAVY`**

- **Product Delivery:** unknown; not instrumented.
- **System Improvement:** strong; metric contract and dashboard were upgraded.
- **Business Growth:** not instrumented.

System Improvement no longer compensates for missing Product Delivery or Business Growth. No averaging is used for decisions.

## Legacy navigation score

`69/100` remains temporarily visible only as `legacy_estimate` for continuity. It is deprecated for decisions and is overridden by critical SLOs and observed metrics.

## Publication evidence ladder

| Stage | Status | Evidence |
| --- | --- | --- |
| canonical_updated | verified | schema v5 snapshot at `2026-07-12T23:20:00+03:00` |
| mirror_synced | pending sync | brain-management mirror must receive schema v5 |
| deploy_identified | verified | existing Netlify deploy `6a5207d064f1feba62676b5e`; API source; branch/commit absent |
| live_verified | needs verification | public timestamp/source-mapped deploy not proven |

## Top actions

1. Instrument selected-task, attempted-task and live-dependent-task denominators.
2. Complete brain-management issue #33 and prove public timestamp equals canonical.
3. Create provider-dependent surface inventory with proof states and freshness windows.
4. Instrument one business KPI in one active project.
