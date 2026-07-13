# Agent/Codex System Health Dashboard

**Metric model:** `observable_outcomes_v2`  
**Last updated:** `2026-07-13T10:06:11+03:00`  
**Public publication state:** `NEEDS_VERIFICATION` — LIVE is withheld until the public JSON timestamp equals canonical.

- **Canonical JSON:** `projects/codex-automation/system-health-dashboard.json`
- **Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/
- **Mirror JSON:** `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`

## Critical SLOs

| SLO | State | Observed | Target | Evidence |
| --- | --- | --- | --- | --- |
| zero_critical_false_success | **PASS** | 0 critical claims | 0 critical false-success claims | Morning run actions and final-status gate |
| dashboard_publication_4_of_4 | **NEEDS_VERIFICATION** | 3/4 verified stages | 4/4 publication stages verified in the same run | Canonical GitHub files, mirror GitHub file, Netlify deploy metadata and attempted public fetch |
| scheduler_unique_morning_evening | **PASS** | 2/2 intended schedules enabled; 0 duplicates schedules | Exactly one enabled Morning and one enabled Evening schedule; zero duplicates | ChatGPT Automations registry |
| provider_live_gate | **PASS** | No provider/live SUCCESS claim state | Provider/live-dependent work remains blocked until current live proof | Dashboard publication and provider-readiness decisions |

**Decision:** publication is not LIVE. The system has 3/4 publication stages evidenced; `live_verified` is missing.

## Momentum

**Status:** `SYSTEM_HEAVY`. Product Delivery, System Improvement and Business Growth are evaluated independently and are never averaged for decisions.

| Lane | State | Observed outcome | Period | Evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| product_delivery | **INSUFFICIENT_DATA** | unknown | rolling 7 days | No complete selected-task and live-verification ledger | Instrument selected user-visible tasks and production verification. |
| system_improvement | **ACTIVE** | 3 safe upgrades applied | current run | Schema-v5 dashboard migration, validator contract upgrade and new regression fixture | Verify CI and public publication without inventing evidence. |
| business_growth | **NOT_INSTRUMENTED** | unknown | rolling 7 days | No instrumented offers, leads, orders, conversions, revenue or retention source | Choose one active project and instrument one business KPI. |

## Six-domain metrics

### 1. Product and business outcomes

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Product Delivery Rate | **unknown** | unknown | unknown | percent and count | rolling 7 days | UNKNOWN | No stable selected-task denominator or complete production-verification ledger was available in this run. | Instrument selected user-visible tasks and production verification timestamps in the delivery outcome ledger. |
| Business Growth Outcomes | **not_instrumented** | — | — | offers/leads/orders/conversions/revenue | current run and rolling 7 days | NOT_INSTRUMENTED | No instrumented offer, funnel, qualified-lead, order, conversion, revenue or retention evidence was available in canonical project memory for this run. | Choose one active project and record one concrete KPI source, owner and update cadence. |
| User Pain Recurrence Rate | **unknown** | 1 | unknown | percent and count | rolling 7 days | UNKNOWN | Canonical dashboard carried one repeated completion correction; completed-request denominator is not instrumented. | Store completed user requests and repeated-correction events by failure class. |

### 2. Software delivery flow

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Lead Time to Live | **unknown** | unknown | unknown | median hours | rolling 7 and 30 days | UNKNOWN | Accepted-task and production-verification timestamps are not stored as a complete pair. | Add accepted_at, first_delivery_commit_at and live_verified_at to the delivery outcome ledger. |
| Deployment Frequency | **unknown** | unknown | 7 | verified deployments per 7 days | rolling 7 days | UNKNOWN | No complete cross-project inventory of verified production deployments was available; the Netlify dashboard deploy is not a product deployment. | Record provider deploy ID, source commit, branch and live verification for each production deployment. |
| Change Fail Rate | **unknown** | unknown | unknown | percent | rolling 7 and 30 days | UNKNOWN | Verified production-change denominator and rollback/hotfix numerator are not instrumented. | Log each verified production change and whether it required rollback, hotfix or user-visible repair. |
| Failed Deployment Recovery Time | **unknown** | unknown | unknown | median hours | rolling 30 days | UNKNOWN | Failure-detected and production-restored timestamp pairs are not instrumented. | Capture failure_detected_at and production_restored_at for failed deployments. |
| Rework Rate | **unknown** | 1 | unknown | percent and count | rolling 7 days | UNKNOWN | One repeated completion correction is observed; total delivery-attempt denominator is not instrumented. | Store delivery attempts, reopen events and repeated fixes in one ledger. |

### 3. Live reliability

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Provider/Live Readiness Ratio | **unknown** | unknown | unknown | percent and count | current inventory | UNKNOWN | No stable denominator of active provider-dependent production surfaces exists. Known provider-dependent blockers remain evidence-only until live proof. | Create a provider-surface registry with one row per active production surface and required proof timestamps. |
| Publication Freshness | **NEEDS_VERIFICATION** | — | — | state and lag | same Morning run | CRITICAL_SLO_NOT_MET | Canonical and mirror are being refreshed in this run; current public JSON could not be fetched. Existing Netlify deploy 6a5207d064f1feba62676b5e is ready but predates this snapshot and has no source commit/branch. | Deploy the refreshed mirror and compare the public JSON last_updated field with the canonical timestamp. |
| Rollback Readiness Ratio | **unknown** | 0 | 0 | percent and count | current run | NOT_APPLICABLE | No live-verified production changes occurred in this run; the ratio is undefined at denominator zero. Prior stable canonical and mirror blob SHAs are retained for revert. | When publication becomes live, record deployed commit, prior stable commit and tested revert instruction. |

### 4. Agent quality

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Task Success Rate | **unknown** | unknown | unknown | percent and count | rolling 7 days | UNKNOWN | Attempted-task and outcome classification ledger is incomplete. | Classify each attempted task as first-pass success, recovery success, correct block or incomplete/false done. |
| Live Completion Rate | **unknown** | unknown | unknown | percent | rolling 7 days | UNKNOWN | Tasks requiring live proof and tasks obtaining live proof are not stored as a complete pair. | Add requires_live_proof and live_verified fields to the delivery outcome ledger. |
| False Success Rate | **not_applicable** | 0 | 0 | percent and count | current run | PASS | This run made zero SUCCESS/DONE claims before required evidence and explicitly withheld LIVE publication status. | Keep the publication and provider gates blocking success until current live proof exists. |
| Eval Pass Rate | **100** | 3 | 3 | percent and count | current run | PASS | Local deterministic checks: JSON parse, schema-v5 dashboard validator, and canonical/mirror identity validator. | Rerun in GitHub Actions after the canonical commit and record the workflow result. |
| Correct Abstention Rate | **100** | 2 | 2 | percent and count | current run | PASS | Two decision-critical evidence gaps were encountered and correctly reported: current public timestamp and provider-readiness denominator. | Preserve abstention until public and provider evidence is current. |

### 5. Efficiency and flow

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Verification Retry Rate | **0** | 0 | 3 | percent and count | current run | PASS | Three verification sequences were used: canonical GitHub source, live/public fetch path, and Netlify deploy metadata. No avoidable repeated verification sequence was counted. | Instrument retry reason and evidence gained for each future verification sequence. |
| Duplicate Scan Rate | **0** | 0 | 4 | percent and count | current run | PASS | Four bounded scans were performed: metric contract, dashboard snapshot, scheduler registry, and publication/deploy evidence; none repeated a broad scan with no new evidence. | Keep scan IDs and evidence deltas in future automation logs. |
| Avoidable Handoff Rate | **0** | 0 | 1 | percent and count | current run | PASS | One safe direct-execution opportunity existed for harness/dashboard changes and was executed directly rather than handed off. | Use handoffs only for product/provider/risky work outside the automation boundary. |
| Context/Retry Cost | **unknown** | — | — | tokens/currency/retries | current run | UNKNOWN | Token usage, context growth and provider/API retry cost are not exposed as a stable machine-readable source. | Add non-sensitive counters for tool calls, retries and context size to automation outcome records. |

### 6. Governance and learning

| Metric | Value | Numerator | Denominator | Unit | Period | Status | Source | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Evidence Completeness | **100** | 408 | 408 | percent and field count | current dashboard snapshot | PASS | 24 metric records × 17 required fields; all required fields are present. Unknown evidence remains explicitly unknown rather than omitted. | Keep the validator enforcing required fields and explicit unknown values. |
| Failure-Class Coverage | **100** | 8 | 8 | percent and count | current canonical replay registry | PASS | After this run, failure-replay-cases.json contains 8 candidate failure classes and prompt-regression-tests.json contains at least one matching deterministic test for each class. | Add a class only when a new repeated failure is evidenced, then add its deterministic fixture. |
| Rule Lifecycle | **candidate=8; active=0; needs_revision=unknown; superseded=unknown** | — | — | rule counts by lifecycle state | current canonical replay registry | CANDIDATE_HEAVY | Eight failure classes are marked candidate after adding the observable-metrics evidence regression. No canonical evidence was found that promotes them to active rules or classifies revision/supersession counts. | Add lifecycle state transitions with evidence references and reviewed_at timestamps. |
| Scheduler Health | **100** | 2 | 2 | percent and count | current live automation registry | PASS | Automations registry at 2026-07-13 shows exactly one enabled Morning System Upgrade and one enabled Evening Architecture Review; active duplicates for these titles = 0. | Recheck enabled counts and duplicate titles in the Evening run. |

## Applied safe upgrades

1. **observable_outcomes_v2_dashboard** — `schema` — Replaced decision-making 0-100 estimates with 24 observed count/ratio/duration/state metrics and explicit unknown values.
2. **dashboard_schema_v5_validator** — `validator` — Enforces metric model, field completeness, independent momentum lanes, publication gates and identical canonical/mirror snapshots.
3. **observable_metric_regression_fixture** — `regression` — Adds a machine-readable failure class against invented denominators, fake zeros and decision-making legacy scores.

## Publication evidence ladder

| Stage | Status | Timestamp / deploy | Evidence |
| --- | --- | --- | --- |
| canonical_updated | **verified** | 2026-07-13T10:06:11+03:00 | Schema-v5 observable_outcomes_v2 snapshot updated in this run. |
| mirror_synced | **verified** | 2026-07-13T10:06:11+03:00 | Mirror is written with the byte-equivalent JSON snapshot in this run. |
| deploy_identified | **verified** | 2026-07-11T09:07:37.194Z | A ready production deploy is identified, but it predates this snapshot and has no Git source commit or branch. |
| live_verified | **needs_verification** | — | Public fetch was unavailable in this run; LIVE is withheld. |

`LIVE` requires all four stages verified and `live_verified.timestamp == canonical_snapshot_timestamp`.

## Missing instrumentation and exact handoffs

1. **Delivery outcome ledger lacks selected-task, accepted-at, deploy and live-verification pairs.**  
   Handoff: Add selected_for_delivery_at, first_delivery_commit_at, deploy_id, source_commit_sha, branch, requires_live_proof, live_verified_at, outcome_class and rework_events to each delivery record.
2. **Provider-dependent production surface denominator is undefined.**  
   Handoff: Create a provider-surface registry with one row per active surface and current proof timestamps for repo/branch, deploy, route, provider, persistence/RLS, payment/webhook when applicable and rollback target.
3. **Business outcomes are not instrumented.**  
   Handoff: Select one active project and record one KPI source with offer/campaign, qualified leads, orders, conversion rate, revenue or retention plus owner and update cadence.
4. **Retry/context cost is not machine-readable.**  
   Handoff: Store non-sensitive tool-call, retry-reason, duplicate-scan, context-size and provider-cost counters per automation run.

## Validation evidence

- Deterministic samples: **3/3 passed**; failures: **0**.
- `python -m json.tool system-health-dashboard.json`
- `node scripts/validate-system-health-dashboard.mjs --file system-health-dashboard.json`
- `node scripts/validate-system-health-dashboard.mjs --file system-health-dashboard.json --mirror current-system-health-dashboard.json`
- CI: `needs_verification_after_commit`.

## Evening verification questions

- Did GitHub Actions validate schema v5 on the final canonical commit?
- Does the mirror remain byte-equivalent to canonical after all commits?
- Was a new Netlify deploy created from the refreshed mirror, and what deploy ID/source commit/branch does it report?
- Does the public JSON last_updated equal 2026-07-13T10:06:11+03:00 exactly?
- Did any Product Delivery or Business Growth outcome become observable without counting issues, prompts, docs or routing?

## Current blockers

- Public JSON timestamp equality with canonical is not currently proven.
- Provider/live readiness denominator is undefined.
- Product-delivery, lead-time, deployment, rework and business-growth denominators are not fully instrumented.

## Result

`APPLIED_UPGRADE` — three safe system upgrades were applied. Publication remains `NEEDS_VERIFICATION` rather than falsely reported LIVE.
