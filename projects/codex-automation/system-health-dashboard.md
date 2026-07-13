# Agent/Codex System Health Dashboard

**Metric model:** `observable_outcomes_v2`  
**Last updated:** `2026-07-13T11:05:00+03:00`  
**Public publication state:** `NEEDS_VERIFICATION` — LIVE is withheld until public JSON timestamp equals canonical.

- **Canonical JSON:** `projects/codex-automation/system-health-dashboard.json`
- **Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/
- **Mirror JSON:** `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`

## Critical SLOs

| SLO | State | Observed | Target |
| --- | --- | --- | --- |
| zero critical false success | **PASS** | 0 critical claims | 0 |
| dashboard publication | **NEEDS_VERIFICATION** | 3/4 stages | 4/4 same run |
| scheduler uniqueness | **PASS** | 2/2 enabled; 0 duplicates | one Morning + one Evening |
| provider/live gate | **PASS** | 0 unsupported success claims | live proof required |

## Momentum

**Status:** `SYSTEM_HEAVY`. The three lanes are independent and are never averaged.

| Lane | State | Observed | Next action |
| --- | --- | --- | --- |
| Product Delivery | **INSUFFICIENT_DATA** | unknown | Instrument selection and live verification. |
| System Improvement | **ACTIVE** | 3 safe upgrades | Verify CI and publication. |
| Business Growth | **NOT_INSTRUMENTED** | unknown | Instrument one project KPI. |

## Six-domain metrics

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Product Delivery Rate | **unknown** | unknown | unknown | percent and count | rolling 7 days | UNKNOWN | Selected-task/live-proof ledger incomplete. | Add selected_for_delivery_at, deploy_id, source_commit_sha and live_verified_at. |
| Business Growth Outcomes | **not_instrumented** | — | — | offers/leads/orders/conversions/revenue | rolling 7 days | NOT_INSTRUMENTED | No canonical business KPI source. | Select one project, KPI source, owner and cadence. |
| User Pain Recurrence Rate | **unknown** | 2 | unknown | percent and count | rolling 7 days | UNKNOWN | Two repeated completion-friction corrections; completed-request denominator missing. | Record completed requests and corrections by failure class. |
| Lead Time to Live | **unknown** | unknown | unknown | median hours | rolling 7 and 30 days | UNKNOWN | Accepted/live timestamp pairs missing. | Add accepted_at, first_delivery_commit_at and live_verified_at. |
| Deployment Frequency | **unknown** | unknown | 7 | verified deployments per 7 days | rolling 7 days | UNKNOWN | Cross-project verified deploy inventory incomplete. | Record deploy ID, commit, branch and live proof. |
| Change Fail Rate | **unknown** | unknown | unknown | percent | rolling 7 and 30 days | UNKNOWN | Verified-change and repair denominators missing. | Log every verified change and repair outcome. |
| Failed Deployment Recovery Time | **unknown** | unknown | unknown | median hours | rolling 30 days | UNKNOWN | Failure/restoration timestamp pairs missing. | Capture failure_detected_at and production_restored_at. |
| Rework Rate | **unknown** | 2 | unknown | percent and count | rolling 7 days | UNKNOWN | Two repeated corrections; delivery-attempt denominator missing. | Store attempts, reopens and repeated fixes. |
| Provider/Live Readiness Ratio | **unknown** | unknown | unknown | percent and count | current inventory | UNKNOWN | Active provider-surface denominator undefined. | Create provider-surface registry with proof timestamps. |
| Publication Freshness | **NEEDS_VERIFICATION** | — | — | state and lag | current run | CRITICAL_SLO_NOT_MET | Canonical and mirror refreshed; old Netlify deploy identified; public timestamp unproven. | Deploy refreshed mirror and compare public last_updated. |
| Rollback Readiness Ratio | **not_applicable** | 0 | 0 | percent and count | current run | NOT_APPLICABLE | No live-verified production change in this run. | On live deploy, record current/prior commit and revert steps. |
| Task Success Rate | **unknown** | unknown | unknown | percent and count | rolling 7 days | UNKNOWN | Attempted-task outcome ledger incomplete. | Classify first-pass, recovery, correct block and incomplete. |
| Live Completion Rate | **unknown** | unknown | unknown | percent | rolling 7 days | UNKNOWN | Requires-live and live-verified task pairs missing. | Add requires_live_proof and live_verified. |
| False Success Rate | **not_applicable** | 0 | 0 | percent and count | current run | PASS | No unsupported SUCCESS/DONE/LIVE claim in this run. | Keep provider/publication gates blocking unsupported success. |
| Eval Pass Rate | **100** | 4 | 4 | percent and count | current run | PASS | Cross-map, behavior replay, schema and mirror-identity checks passed locally. | Confirm GitHub Actions on final commit. |
| Correct Abstention Rate | **100** | 3 | 3 | percent and count | current run | PASS | Public timestamp, provider denominator and product denominator gaps were reported unknown/unverified. | Preserve abstention until evidence exists. |
| Verification Retry Rate | **0** | 0 | 4 | percent and count | current run | PASS | Four bounded verification sequences; no avoidable repeat. | Record retry reason and evidence gained. |
| Duplicate Scan Rate | **0** | 0 | 5 | percent and count | current run | PASS | Five bounded scans; none repeated without new evidence. | Keep scan IDs and evidence deltas. |
| Avoidable Handoff Rate | **0** | 0 | 1 | percent and count | current run | PASS | One safe direct harness task was executed directly. | Hand off only risky/product/provider work. |
| Context/Retry Cost | **unknown** | — | — | tokens/currency/retries | current run | UNKNOWN | Stable machine-readable token/context/provider-cost data unavailable. | Add non-sensitive tool/retry/context counters. |
| Evidence Completeness | **100** | 408 | 408 | percent and field count | current snapshot | PASS | 24 metrics × 17 required fields present. | Keep schema-v5 validation. |
| Failure-Class Coverage | **100** | 9 | 9 | percent and count | current registry | PASS | Nine replay classes have matching prompt and behavior fixtures. | Add only evidenced classes with pass/fail samples. |
| Rule Lifecycle | **candidate=9; active=0; needs_revision=unknown; superseded=unknown** | — | — | rule counts | current registry | CANDIDATE_HEAVY | Nine candidate classes; promotion evidence incomplete. | Add reviewed_at and evidence references. |
| Scheduler Health | **100** | 2 | 2 | percent and count | current live registry | PASS | Exactly one enabled Morning and one enabled Evening; zero duplicate titles. | Recheck in Evening run. |

## Applied safe upgrades

1. **delivery_routine_edit_guardrail** — mapped the redundant `/delivery` confirmation failure into prompt, replay and executable behavior coverage; host-enforced dialogs remain `HOST_APPROVAL_REQUIRED`.
2. **observable_metrics_behavior_replay** — added pass/fail behavior samples rejecting fake zero denominators and composite Product/System/Growth scores.
3. **harness_coverage_alignment** — aligned 9 replay cases, 10 prompt regressions, 9 behavior fixtures and 30 saved samples.

## Publication evidence ladder

| Stage | Status | Evidence |
| --- | --- | --- |
| canonical_updated | **verified** | `2026-07-13T11:05:00+03:00` |
| mirror_synced | **verified** | Identical JSON snapshot written. |
| deploy_identified | **verified** | Netlify `6a5207d064f1feba62676b5e`, published 2026-07-11, no source commit/branch. |
| live_verified | **needs_verification** | Public timestamp equality is unproven. |

## Missing instrumentation and exact handoffs

1. Add delivery selection, commit, deploy, live-proof, outcome and rework fields to the delivery ledger.
2. Create a provider-surface registry with current proof timestamps and rollback targets.
3. Instrument one business KPI for one active project with source, owner and cadence.
4. Store non-sensitive tool-call, retry, scan, context and provider-cost counters.

## Validation evidence

- Local deterministic checks: **4/4 passed**.
- Behavior replay: **9 fixtures, 30 samples** — 16 expected pass, 14 expected fail.
- Dashboard schema: **PASS**.
- Canonical/mirror identity: **PASS**.
- GitHub Actions: `needs_verification_after_commit`.

## Evening verification questions

- Did GitHub Actions pass on the final commit?
- Is the mirror still identical to canonical?
- Was a new source-mapped Netlify deploy created?
- Does public `last_updated` equal `2026-07-13T11:05:00+03:00`?
- Did Product Delivery or Business Growth become observable without counting docs, issues or prompts?

## Result

`APPLIED_UPGRADE` — three safe system upgrades were applied. Publication remains `NEEDS_VERIFICATION`.
