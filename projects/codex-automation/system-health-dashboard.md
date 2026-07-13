# Agent/Codex System Health Dashboard

**Metric model:** `observable_outcomes_v2`  
**Last updated:** `2026-07-13T21:12:00+02:00`  
**Public publication state:** `NEEDS_VERIFICATION` — LIVE is withheld until public JSON timestamp equals canonical.

- **Canonical JSON:** `projects/codex-automation/system-health-dashboard.json`
- **Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/
- **Mirror JSON:** `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`

## Critical SLOs

| SLO | State | Observed | Target |
| --- | --- | --- | --- |
| zero critical false success | **PASS** | 0 critical claims | 0 |
| dashboard publication | **NEEDS_VERIFICATION** | 3/4 stages | 4/4 same run |
| scheduler uniqueness | **PASS** | 2/2 enabled; 0 duplicate Morning/Evening titles | one Morning + one Evening |
| provider/live gate | **PASS** | 0 unsupported success claims | current live proof required |

## Morning claim verification

| Morning claim | Evening decision | Evidence | Remaining gap |
| --- | --- | --- | --- |
| `delivery_routine_edit_guardrail` applied | **ACCEPTED** | Matching replay, prompt and behavior fixtures exist; routine edits are separated from `HOST_APPROVAL_REQUIRED`. | No final-commit CI run returned. |
| `observable_metrics_behavior_replay` applied | **ACCEPTED** | Pass/fail samples reject fake zero denominators and composite Product/System/Growth decisions. | Behavior runner was not re-executed in this Evening runtime. |
| Coverage aligned at 9 replay / 10 prompt / 9 fixtures / 30 samples | **ACCEPTED** | Current canonical files contain those counts and all 9 replay classes have behavior fixtures. | Rule lifecycle remains candidate-heavy. |
| Four local deterministic checks passed | **INSUFFICIENT EXTERNAL EVIDENCE** | Morning records 4/4 local checks. GitHub returned no workflow runs and no combined statuses for commit `8271a1322e26f24ec78d3defe9c3494dec63b647`. | Run final-commit GitHub Actions evidence. |
| Dashboard publication completed | **CORRECTED** | Canonical/mirror evidence exists and Netlify deploy `6a5207d064f1feba62676b5e` is ready. | Deploy predates the snapshot and has no source commit/branch; live timestamp equality is unproven. |

## Momentum

**Status:** `SYSTEM_HEAVY`. Product Delivery, System Improvement and Business Growth remain independent and are never averaged.

| Lane | State | Observed | Next action |
| --- | --- | --- | --- |
| Product Delivery | **INSUFFICIENT_DATA** | unknown | Instrument selected tasks, deploy identity and production proof. |
| System Improvement | **ACTIVE** | 3 Morning upgrades structurally verified | Close CI and publication evidence. |
| Business Growth | **NOT_INSTRUMENTED** | unknown | Instrument one project KPI with source, owner and cadence. |

## Six-domain metrics

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Product Delivery Rate | **unknown** | unknown | unknown | percent/count | rolling 7 days | UNKNOWN | Complete selected-task/live-proof pairs are missing. | Add selection, commit, deploy and live timestamps. |
| Business Growth Outcomes | **not_instrumented** | — | — | offers/leads/orders/conversions/revenue | rolling 7 days | NOT_INSTRUMENTED | No canonical KPI source. | Register one KPI source, owner and cadence. |
| User Pain Recurrence Rate | **unknown** | 2 | unknown | percent/count | rolling 7 days | UNKNOWN | Two corrections recorded; completed-request denominator missing. | Record completed requests and correction classes. |
| Lead Time to Live | **unknown** | unknown | unknown | median hours | rolling 7/30 days | UNKNOWN | Accepted/live timestamp pairs missing. | Add `accepted_at`, first commit and `live_verified_at`. |
| Deployment Frequency | **unknown** | unknown | 7 | verified deploys/7d | rolling 7 days | UNKNOWN | Cross-project verified deploy inventory incomplete. | Record deploy ID, branch, commit and live proof. |
| Change Fail Rate | **unknown** | unknown | unknown | percent | rolling 7/30 days | UNKNOWN | Verified-change and repair pairs missing. | Log each verified change and repair outcome. |
| Failed Deployment Recovery Time | **unknown** | unknown | unknown | median hours | rolling 30 days | UNKNOWN | Failure/restoration pairs missing. | Capture failure and restoration timestamps. |
| Rework Rate | **unknown** | 2 | unknown | percent/count | rolling 7 days | UNKNOWN | Two corrections; attempt denominator missing. | Store attempts, reopens and repeated fixes. |
| Provider/Live Readiness Ratio | **unknown** | unknown | unknown | percent/count | current inventory | UNKNOWN | Provider-surface denominator undefined. | Create a provider-surface registry. |
| Publication Freshness | **NEEDS_VERIFICATION** | — | — | state/lag | current run | CRITICAL_SLO_NOT_MET | Old API-upload deploy identified; current public timestamp unproven. | Create a source-mapped deploy or current live probe. |
| Rollback Readiness Ratio | **not_applicable** | 0 | 0 | percent/count | current run | NOT_APPLICABLE | No live change this run. | Record prior stable target on the next live deploy. |
| Task Success Rate | **unknown** | unknown | unknown | percent/count | rolling 7 days | UNKNOWN | Attempted-task outcome ledger incomplete. | Classify first-pass, recovery, correct block and incomplete. |
| Live Completion Rate | **unknown** | unknown | unknown | percent | rolling 7 days | UNKNOWN | Requires-live/live-verified pairs missing. | Add `requires_live_proof` and `live_verified`. |
| False Success Rate | **not_applicable** | 0 | 0 | percent/count | current run | PASS | No unsupported SUCCESS/DONE/LIVE claim. | Keep critical gates. |
| Eval Pass Rate | **100** | 5 | 5 | percent/count | current run | PASS | Five bounded dashboard payload checks passed. | Run repository evidence runner in CI. |
| Correct Abstention Rate | **100** | 4 | 4 | percent/count | current run | PASS | Four missing-evidence cases stayed unknown/unverified. | Preserve abstention. |
| Verification Retry Rate | **0** | 0 | 8 | percent/count | current run | PASS | Eight distinct verification sequences; no avoidable retry. | Store verification IDs and evidence deltas. |
| Duplicate Scan Rate | **0** | 0 | 8 | percent/count | current run | PASS | Eight scans produced distinct evidence. | Keep scan IDs. |
| Avoidable Handoff Rate | **0** | 0 | 1 | percent/count | current run | PASS | Safe dashboard/handoff updates were executed directly. | Route only provider/product/risky work. |
| Context/Retry Cost | **unknown** | — | — | tokens/currency/retries | current run | UNKNOWN | Stable cost source unavailable. | Add non-sensitive counters. |
| Evidence Completeness | **100** | 408 | 408 | percent/fields | current snapshot | PASS | 24 metrics × 17 required fields. | Keep schema-v5 validation. |
| Failure-Class Coverage | **100** | 9 | 9 | percent/count | current registry | PASS | 9 replay classes, 10 prompt regressions, 9 fixtures, 30 samples. | Re-run behavior evidence on final commit. |
| Rule Lifecycle | **candidate=9; active=0; needs_revision=unknown; superseded=unknown** | — | — | counts | current registry | CANDIDATE_HEAVY | Promotion evidence incomplete. | Add lifecycle review evidence. |
| Scheduler Health | **100** | 2 | 2 | percent/count | live registry | PASS | Exactly one enabled Morning and one enabled Evening; 0 duplicates. | Recheck every Evening. |

## Publication evidence ladder

| Stage | Status | Evidence |
| --- | --- | --- |
| canonical_updated | **verified** | Evening snapshot timestamp `2026-07-13T21:12:00+02:00` |
| mirror_synced | **verified** | Identical JSON payload written to `brain-management`. |
| deploy_identified | **verified** | Netlify deploy `6a5207d064f1feba62676b5e`, published `2026-07-11T09:07:37.194Z`, source `api`, branch/commit absent. |
| live_verified | **needs_verification** | Current public `last_updated` could not be fetched and matched. |

## Ranked Morning handoff

**Priority 1: `publication-trace-closure-instrumentation`**

Largest critical gap: dashboard publication remains **3/4** because `live_verified` cannot be tied to the current canonical and mirror snapshot.

Safe Morning scope:

1. Add `publication_attempt_id`, canonical/mirror commit SHAs, deploy ID, source commit/branch, public `last_updated`, and `live_verified_at` to the publication trace.
2. Fail validation when a deploy predates canonical, or an automatic-publication claim lacks source commit/branch.
3. Emit one exact `/delivery /safe` ticket for the existing Netlify site; do not mutate provider state from Morning Upgrade.

Expected effect: publication freshness becomes reproducible and canonical/mirror updates cannot be mistaken for LIVE.

Evening verification question: can one trace prove canonical commit, mirror commit, deploy ID/source commit, and public `last_updated` for the same publication attempt?

## Missing instrumentation

1. Publication trace closure fields listed above.
2. Delivery selection/commit/deploy/live/outcome/rework pairs.
3. Provider-surface registry with proof freshness and rollback target.
4. One business KPI with source, owner, period and cadence.
5. Non-sensitive tool-call, retry, scan, context-size and provider-cost counters.

## Validation evidence

- JSON parse: **PASS**
- 24 metrics × 17 required fields: **PASS**
- Unique metric IDs: **PASS**
- Publication-state consistency: **PASS**
- Canonical/mirror payload identity before write: **PASS**
- Repository evidence runner: **not run in this runtime**
- GitHub Actions on final commit: **NEEDS_VERIFICATION**

## Result

`VERIFIED_WITH_CORRECTIONS` — three Morning structural upgrades are accepted; final-commit CI remains insufficiently evidenced; publication remains `NEEDS_VERIFICATION`.