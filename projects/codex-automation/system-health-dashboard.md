# Agent/Codex System Health Dashboard

**Metric model:** `observable_outcomes_v2`  
**Last updated:** `2026-07-14T07:30:00+02:00`  
**Morning result:** `APPLIED_UPGRADE`  
**Public publication state:** `STALE` — LIVE is withheld until the public timestamp equals canonical and the deploy has a source branch and commit.

- **Canonical JSON:** `projects/codex-automation/system-health-dashboard.json`
- **Publication trace:** `projects/codex-automation/system-health-dashboard-publication-trace.json`
- **Mirror JSON:** `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`
- **Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/

## Main upgrade applied this morning

**`publication_trace_closure_contract`** — stale or source-unmapped dashboard deployments now fail deterministic publication validation instead of being counted as verified LIVE evidence.

### Why this mattered

The previous dashboard counted an API-upload Netlify deployment from **2026-07-11** as `deploy_identified=verified` even though it predated the current snapshot and had neither branch nor source commit. That made publication appear to be 3/4 when the reproducible state was only 2/4.

## Applied upgrades

| Upgrade | Applied change | Validation |
| --- | --- | --- |
| Publication trace validator | Requires one `publication_attempt_id`, canonical/mirror commit and blob SHAs, deploy identity, source branch/commit and public timestamp proof. | Deterministic contract validation. |
| Regression suite | Added six tests for stale deploys, missing attempt IDs, missing source mapping, timestamp mismatch and valid LIVE evidence. | 6/6 local tests passed. |
| CI coverage | Added publication tests to the harness evidence runner and made `tests/**` trigger the validator workflow. | GitHub PR CI required before merge. |

## Metric impact after upgrade

| Metric | Before | After | Change | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Publication Freshness | `NEEDS_VERIFICATION`, 3/4 | **STALE**, 2/4 | Corrected downward | Deploy `6a5207d064f1feba62676b5e` predates snapshot; branch and commit absent. | High |
| Eval Pass Rate | 5/5 | **8/8** | +3 bounded checks | Dashboard schema, publication contract and six regression tests. | High |
| Avoidable Handoff Rate | 0/1 | **0/3** | +2 safe tasks executed directly | Validator, tests and CI wiring completed in this run. | High |
| Scheduler Health | Stale Evening title in evidence | **Current title verified** | Evidence corrected | One Morning System Upgrade and one Evening Architecture Upgrade; zero duplicates. | High |

## System Intelligence Gain

Observed changes only; no maturity score was invented.

| Change class | Count |
| --- | ---: |
| Rules improved | 1 |
| Validators added or tightened | 1 |
| Deterministic tests added | 6 |
| Replay cases added or improved | 0 |
| Behavior fixtures added or improved | 0 |
| Duplicate instructions removed | 0 |
| Publication evidence fields added | 7 |
| Automation contracts improved | 0 |
| Dashboard/registry/schema improvements | 1 |

## Critical SLOs

| SLO | State | Observed | Target |
| --- | --- | --- | --- |
| Zero critical false success | **PASS** | 0 unsupported claims | 0 |
| Dashboard publication | **STALE** | 2/4 stages | 4/4 in the same run |
| Scheduler uniqueness | **PASS** | 2/2 enabled; 0 duplicates | one Morning + one Evening |
| Provider/live gate | **PASS** | 0 unsupported provider-success claims | current live proof required |

## Publication ladder

| Stage | Status | Evidence |
| --- | --- | --- |
| `canonical_updated` | **verified** | Canonical JSON blob `9ee384a3886fd4fdda259682ae2b2599b79e3279`; commit `34c60bbd652dd50d9cd2d77b4864134acfe2e810`. |
| `mirror_synced` | **verified** | Identical mirror blob `9ee384a3886fd4fdda259682ae2b2599b79e3279`; commit `fde7b0b0ffa211d6ae6373c5dddd02cfc6a84981`. |
| `deploy_identified` | **stale** | Netlify deploy `6a5207d064f1feba62676b5e`, published `2026-07-11T09:07:37.194Z`, API upload, no branch/source commit. |
| `live_verified` | **needs verification** | Current public `last_updated` was not proven equal to canonical. |

## Momentum

**Status: `SYSTEM_HEAVY`**. The three lanes remain independent.

| Lane | State | Observed | Next action |
| --- | --- | --- | --- |
| Product Delivery | **INSUFFICIENT_DATA** | unknown | Instrument selected task → deploy → production-proof pairs. |
| System Improvement | **ACTIVE** | 3 safe upgrades | Require green PR CI and retain publication trace. |
| Business Growth | **NOT_INSTRUMENTED** | unknown | Register one KPI source, owner and cadence. |

## Six-domain refresh

### 1. Product and business outcomes

- Product Delivery Rate: `unknown` — selected/live denominator missing.
- Business Growth Outcomes: `not_instrumented`.
- User Pain Recurrence: numerator `2`; denominator `unknown`.

### 2. Software delivery flow

Lead Time to Live, Deployment Frequency, Change Fail Rate, Recovery Time and Rework Rate remain `unknown` because complete accepted/deploy/live/repair pairs are not instrumented.

### 3. Live reliability

- Provider/Live Readiness Ratio: `unknown`; provider-surface denominator missing.
- Publication Freshness: **STALE**.
- Rollback Readiness: `not_applicable` for this non-live harness run.

### 4. Agent quality

- False Success: 0 unsupported claims; ratio not applicable at 0/0.
- Eval Pass Rate: **8/8** bounded checks.
- Correct Abstention: **5/5** missing-evidence cases remained unknown, stale or needs verification.

### 5. Efficiency and flow

- Verification Retry Rate: **0/8**.
- Duplicate Scan Rate: **0/8**.
- Avoidable Handoff Rate: **0/3**.
- Context/Retry Cost: `unknown`; stable counters are not available.

### 6. Governance and learning

- Evidence Completeness: **408/408** required metric fields.
- Failure-Class Coverage: **9/9** recurring classes structurally covered.
- Rule Lifecycle: `candidate=9; active=0`; promotion evidence remains incomplete.
- Scheduler Health: **2/2**, zero Morning/Evening duplicates.

## Exact risky-work handoff

`/safe` — repair the Netlify publication path without exposing or changing secret values. Required final evidence: deploy ID, branch, source commit SHA, public `last_updated`, `live_verified_at`, and proof that the public timestamp equals canonical. Until then, keep the dashboard `STALE`.

## Validation evidence

- Dashboard JSON parse and schema-v5 requirements: **PASS**.
- 24 metrics × 17 required fields: **408/408 PASS**.
- Canonical/mirror blob identity: **PASS**.
- Publication contract regression tests: **6/6 PASS locally**.
- GitHub Actions on the focused PR: **pending at snapshot time**.

## What did not improve and why

- Product Delivery remains unknown because no complete production-outcome denominator exists.
- Business Growth remains uninstrumented.
- Provider readiness remains unknown because the active-surface inventory is incomplete.
- The public dashboard remains STALE because this run did not mutate provider/deploy configuration.

## Evening verification questions

1. Did final PR CI pass on the exact merged commit?
2. Does the publication trace retain reachable canonical and mirror commit SHAs?
3. Was a new source-mapped production deployment created?
4. Does public `last_updated` exactly equal `2026-07-14T07:30:00+02:00`?
