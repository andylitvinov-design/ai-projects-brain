# Agent/Codex System Health Dashboard

**Metric model:** `adaptive_portfolio_project_goal_v1`  
**Last updated:** `2026-07-18T20:07:42+02:00`  
**Evening result:** `APPLIED_UPGRADE`  
**Public publication state:** `STALE`

## Status

**APPLIED_UPGRADE**

## Main upgrade applied this evening

**`observable_publication_recovery_dispatch`** — The receipt-aware recovery watchdog now retries stale snapshots every two hours and requires a concrete canonical publisher workflow run after dispatch.

The 07:35 canonical and mirror snapshots were identical, but retry commits had no observable Actions status and Netlify still served the prior deploy. Treating an accepted dispatch as recovery evidence left a blind gap between request and actual publisher execution.

## Changed files / prompts / automations

- `brain-management/.github/workflows/recover-stale-system-health-dashboard.yml`
- `brain-management/tests/dashboard-publication-watchdog.test.mjs`
- `systems/evening-upgrade-runtime-contract.md`
- `projects/codex-automation/pending-dashboard-upgrade.json`
## Portfolio Health change

State **NEEDS_ATTENTION**; active 10; observed 4; blocked 3.
Strongest change: Brain Management recovery now produces run-bound evidence and retries missed publication triggers without becoming a second deployer.
Largest risk: Provider/live proof and observed commercial KPI sources remain incomplete across several active projects.

## Project Health matrix change

| Project | Execution | Product Value | Business Growth | Standards | Reliability | Learning | State |
|---|---|---|---|---|---|---|---|
| Ezohata | WATCH | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| EzoHata Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| Legacy Finance / Incoming Ledger | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| Psitherapy | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| Reiki Yggdrasil | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | WATCH | UNKNOWN | WATCH |
| Codex Links | WATCH | WATCH | NOT_APPLICABLE | WATCH | WATCH | WATCH | WATCH |
| Brain Management | PASS | WATCH | NOT_APPLICABLE | WATCH | PASS | PASS | IMPROVING |
| Toronto Tantra | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| AI Projects Brain | PASS | WATCH | NOT_APPLICABLE | PASS | WATCH | PASS | IMPROVING |
| Psihotavr | UNKNOWN | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | NEEDS_VERIFICATION |

### Selected project drilldowns

- **AI Projects Brain:** IMPROVING; reliability WATCH; learning PASS.
- **Brain Management:** IMPROVING; reliability PASS; learning PASS.
- **EzoHata Finance:** BLOCKED; reliability BLOCKED; learning WATCH.

## Goal-pyramid change

1. **Efficiency and System Intelligence**
   - Execution quality and completion: `task_success_rate`, `live_completion_rate`, `false_success_rate`, `correct_abstention_rate`
   - Speed and delivery flow: `lead_time_to_live`, `deployment_frequency`, `rework_rate`
   - Autonomy and resource use: `verification_retry_rate`, `duplicate_scan_rate`, `avoidable_handoff_rate`, `context_retry_cost`
2. **Business Growth and Professional Value**
   - Product and user value: `product_delivery_rate`, `user_pain_recurrence_rate`
   - Commercial outcomes: `business_growth_outcomes`
   - Professional delivery and live reliability: `change_fail_rate`, `failed_deployment_recovery_time`, `provider_live_readiness_ratio`, `publication_freshness`, `rollback_readiness_ratio`
3. **Continuous Self-Development**
   - Validation and accumulated knowledge: `eval_pass_rate`, `evidence_completeness`, `failure_class_coverage`
   - Rule and automation lifecycle: `rule_lifecycle`, `scheduler_health`

## Agent evidence ingested

- ezohata / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- psihotavr / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- psitherapy / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- reiki-yggdrasil / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- torontotantra / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- ezohata-finance / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- legacy-finance / /audit-sales: **NOT_TESTED**, unknown/unknown, confidence high.
- ai-projects-brain / /upgrade-publication: **PASS**, 22/22, confidence high.

Audit evidence is readiness only; no business impact inferred.

## Daily Intelligence

Indicators 24; history 1/30; score unknown.

## Metric lifecycle changes

- `business_growth_outcomes`: **needs_revision** — Project KPI sources remain absent.
- `provider_live_readiness_ratio`: **needs_revision** — Provider-surface numerator remains unknown.
- `context_retry_cost`: **candidate** — No stable counter source exists.
- `rule_lifecycle`: **watch** — Promotion evidence remains incomplete.

## Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | Twice-daily recovery accepted a dispatch without proving that a canonical publisher run was created. | Two-hour off-peak recovery records a concrete publisher run ID and URL or fails with unobserved-dispatch evidence. | dispatch_to_run_observability_added | brain-management PR #44, merge e022b733, 4 watchdog regressions | high |
| False Success Rate | AI Projects Brain | Efficiency and System Intelligence | Execution quality and completion | HTTP dispatch acceptance could be reported as recovery activity despite no observable publisher execution. | Dispatch acknowledgement, observed publisher run and matching LIVE receipt are three distinct evidence stages. | recovery_evidence_ladder_tightened | Evening runtime contract and observable recovery artifact contract | high |
| Avoidable Handoff Rate | Brain Management | Efficiency and System Intelligence | Autonomy and resource use | A missed push or repository dispatch could leave the snapshot stale until manual investigation. | Repeated off-peak recovery retries stale snapshots and surfaces the exact publisher run identity automatically. | manual_recovery_window_reduced | recovery schedule and run-observation gate | high |

## System Intelligence Gain

- rules_improved: **1**
- validators_added_or_tightened: **1**
- deterministic_checks_added: **4**
- replay_cases_added_or_improved: **1**
- behavior_fixtures_added_or_improved: **1**
- duplicate_instructions_removed: **0**
- evidence_fields_added: **2**
- automation_contracts_improved: **2**
- dashboard_registry_schema_improvements: **0**
- project_records_instrumented: **2**

## Critical guardrails

- zero_critical_false_success: **PASS** — 0 / 0
- dashboard_publication_4_of_4: **STALE** — 2/4 / 4/4 same run
- scheduler_unique_morning_evening: **PASS** — 2/2; duplicates=0 / 1 Morning + 1 Evening; 0 duplicates
- provider_live_gate: **PASS** — 0 / 0 unsupported live claims
- audit_score_not_health: **PASS** — 0 / 0 observed projects from heuristic scores

## Publication ladder

- canonical_updated: **verified** — 2026-07-18T20:07:42+02:00
- mirror_synced: **verified** — 2026-07-18T20:07:42+02:00
- deploy_identified: **stale** — 2026-07-17T05:22:33.420Z; deploy 6a59bc16f349e3e190a47208; source 2ab6f1e1d8b3a6bb2c5781e178882ccf744ccb62; branch main; Verified deploy predates the new evening snapshot.
- live_verified: **needs_verification** — Public timestamp and UI must be rechecked after this snapshot is deployed.

## Exact risky-work handoffs

- No risky-work handoff is currently registered.

## Validation evidence

- **24/24 PASS**; failed 0.
- Checks: 22 existing adaptive-dashboard checks; upgrade-record applier regression; exact-snapshot workflow topology regression.
- CI status: workflow_expected_then_verified.
- Canonical snapshot timestamp: 2026-07-18T20:07:42+02:00.

## What remains unknown, not applicable or blocked

- The post-merge production recovery run and its publisher run identity are not yet independently accessible from this execution environment.
- The new 20:07:42 snapshot remains STALE until a matching public timestamp and immutable receipt are verified.
- Observed leads, orders, revenue, attendance and conversion remain unknown without registered KPI sources.
- Provider readiness remains blocked or needs verification for Ezohata, EzoHata Finance, Psitherapy and Psihotavr.
- Context/Retry Cost still lacks a stable non-secret counter source.

## Evening verification questions

- Did the merge-triggered recovery workflow observe and record a new canonical publisher run for the 20:07:42 snapshot?
- Did the canonical publisher produce a READY content deploy whose source commit contains the identical mirror blob?
- Does the public receipt bind the 20:07:42 snapshot, content deploy and required Portfolio, Project and Goal UI checks?
- Does the next healthy recovery run no-op rather than create a duplicate deploy?


<!-- EVENING_UPGRADE:evening-architecture-2026-07-15-exact-snapshot-publisher -->
## Evening Architecture Upgrade — 2026-07-15

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Exact Snapshot Publisher Contract | AI Projects Brain | Continuous Self-Development | Rule and automation lifecycle | publisher regenerated Morning snapshot | 1/1 controlled exact-snapshot path | ownership_separated | workflow topology regression + upgrade-record applier | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | old deploy 6a5207; 2/4 STALE | previous snapshot recovered; new snapshot 2/4 pending | production_recovered_snapshot_specific_gate_preserved | workflow #28 + READY deploy 6a573e142b93890e6f8d61a9 | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | 22/22 | 24/24 | denominator+2 | upgrade-record and exact-snapshot workflow regressions | high |
| Scheduler Health | AI Projects Brain | Continuous Self-Development | Rule and automation lifecycle | 2/2; duplicates=0 | 2/2; duplicates=0 | verified_again | live automation registry | high |

### Evening verification questions

1. Did the Morning record remain labeled Morning in JSON, Markdown and activity history?
2. Did canonical and mirror finish with identical blobs after the controlled write?
3. Did the new snapshot receive a READY content deploy and receipt deploy from the exact mirror commit?
4. Did public timestamp equality and Portfolio, Project and Goal UI verification complete for the new snapshot?


<!-- MORNING_UPGRADE:morning-2026-07-17-complete-cycle-identity -->
## Morning System Upgrade — 2026-07-17

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| False Success Rate | AI Projects Brain | Efficiency and System Intelligence | Execution quality and completion | Morning snapshot status and history were correct but publication_attempt_id still used evening-. | All controlled Morning evidence layers use Morning identity, including publication_attempt_id and generated trace. | cross_layer_cycle_identity_completed | wrapper repair plus regression assertion for /^morning-/ | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | 25/25 checks without an explicit trace-prefix assertion | 25/25 checks with cycle-prefix coverage inside the cycle-aware regression | assertion_scope_expanded | tests/dashboard-cycle-upgrade-record.test.mjs | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | Previous snapshot has exact mirror identity; new trace repair is not yet public | 07:46 snapshot enters exact mirror, content deploy, UI verification and immutable receipt publication | new_snapshot_publication_required | repository-dispatch exact-snapshot contract | high |

### Evening verification questions

1. Does the final publication trace use a morning- publication_attempt_id?
2. Are canonical and mirror blobs identical for the 07:46 snapshot?
3. Does the READY receipt deploy identify the exact mirror commit containing that blob?
4. Do public timestamp equality and Portfolio, Project and Goal UI checks pass for the 07:46 snapshot?


<!-- MORNING_UPGRADE:morning-2026-07-17-cycle-neutral-publication-evidence -->
## Morning System Upgrade — 2026-07-17

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| False Success Rate | AI Projects Brain | Efficiency and System Intelligence | Execution quality and completion | Morning identifiers were correct but shared metric and trace descriptions still referred to an Evening snapshot. | Morning-specific content remains Morning and shared trace language is cycle-neutral across all generated evidence. | cross_layer_evidence_consistency_completed | cycle-aware trace builder plus metric and trace regression assertions | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | 25/25 checks with Morning attempt-ID coverage | 25/25 checks with Morning metric text and cycle-neutral trace coverage | assertion_scope_expanded | tests/dashboard-cycle-upgrade-record.test.mjs | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | Latest proven receipt deploy predates the final evidence-consistent snapshot | 07:53 snapshot enters exact mirror, content deploy, public UI verification and immutable receipt publication | new_snapshot_publication_required | cycle-aware trace-only workflow and repository dispatch | high |

### Evening verification questions

1. Does the final trace use a morning- attempt ID and contain no incorrect Evening wording?
2. Are canonical and mirror blobs identical for the 07:53 snapshot?
3. Does a READY receipt deploy identify the exact mirror commit containing that blob?
4. Do public timestamp equality and Portfolio, Project and Goal UI checks pass for the 07:53 snapshot?


<!-- MORNING_UPGRADE:morning-2026-07-17-dashboard-markdown-core-sync -->
## Morning System Upgrade — 2026-07-17

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Evidence Completeness | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | Canonical JSON was current while the mutable Markdown core retained an obsolete deploy ID, timestamp, validation count and publication ladder. | Eight mutable Markdown evidence sections are regenerated from the exact canonical JSON on every publication run while historical appendices remain unchanged. | markdown_core_json_sync_enforced | deterministic synchronizer, idempotence test and stale-evidence regression | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | 25/25 deterministic checks | 28/28 deterministic checks | denominator+3 | three dashboard Markdown core synchronization regressions | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | The latest verified receipt deploy covers the prior snapshot and the Markdown core was internally stale. | The 08:20 exact snapshot enters mirror, content deploy, UI verification and immutable receipt publication with a synchronized human evidence surface. | new_exact_snapshot_publication_required | exact-snapshot workflow plus Markdown-core synchronization gate | high |

### Evening verification questions

1. Does the canonical Markdown core show the same last_updated, deploy evidence, validation count and publication state as the canonical JSON?
2. Are canonical and mirror JSON blobs identical for the 08:20 snapshot?
3. Does a READY receipt deploy identify the exact mirror commit containing the 08:20 blob?
4. Do public timestamp equality and Portfolio, Project and Goal UI checks pass for the 08:20 snapshot?


<!-- EVENING_UPGRADE:evening-2026-07-17-receipt-aware-self-healing-publication -->
## Evening Architecture Upgrade — 2026-07-17

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | The exact 08:20 mirror existed, but its retry commit had no observable workflow run or check and Netlify still served the prior READY deploy. | A twice-daily and manual receipt-aware watchdog checks the exact public timestamp and immutable receipt, then dispatches the sole canonical publisher only when recovery is required. | self_healing_dispatch_fallback_added | brain-management PR #43, merge 0d1e370, three watchdog contract regressions | high |
| False Success Rate | AI Projects Brain | Efficiency and System Intelligence | Execution quality and completion | A retry commit or dispatch request could be mistaken for recovered publication despite absent current receipt and UI proof. | The runtime contract explicitly keeps the snapshot STALE until public timestamp equality, valid receipt and required Portfolio/Project/Goal UI proof exist. | retry_is_not_live_evidence | trigger-independent recovery contract plus exact-snapshot regression | high |
| Avoidable Handoff Rate | Brain Management | Efficiency and System Intelligence | Autonomy and resource use | A missed publication trigger could require Andrey to open Actions and manually run the workflow. | GitHub-native scheduled recovery can dispatch the canonical publisher without owner interaction; effect remains unmeasured until the first observed recovery run. | manual_recovery_path_automated | watchdog workflow schedule, workflow_dispatch and no-op/dispatch gates | medium |

### Ranked Morning handoff

1. **brain-management / Business Growth and Professional Value / Professional delivery and live reliability:** Verify that the watchdog or normal trigger produced a current content deploy and matching immutable receipt for the exact Evening snapshot; keep STALE if any link is missing. Expected metric effect: Publication Freshness STALE 2/4 to LIVE 4/4 only after exact receipt and UI proof.
2. **portfolio / Business Growth and Professional Value / Commercial outcomes:** Register one observed KPI source, owner and cadence for the highest-priority commercial project. Expected metric effect: Business Growth Outcomes not_instrumented to observed for one project.
3. **ai-projects-brain / Efficiency and System Intelligence / Autonomy and resource use:** Instrument Context/Retry Cost only after a stable non-secret counter source exists. Expected metric effect: Context/Retry Cost candidate/unknown to measurable without invented data.

<!-- STRATEGIC_GOAL_SCOREBOARD:1 -->
## Portfolio Strategic Scoreboard

| Project | Big Goal | Yesterday | Today | Daily Delta | Evidence | Next Quality Threshold |
|---|---|---:|---:|---:|---|---|
| Ezohata | A trusted bilingual esoteric-commerce platform with complete catalog parity, excellent mobile discovery, secure owner administration, durable orders and uploads, and measured conversion. | 58% | 58% | +0 pp | BLOCKED | Prove one production owner journey: Google login to admin change or upload to public visibility to order handoff. |
| EzoHata Finance | A trustworthy owner-only financial control system with reconciled history, current provider balances, explainable movements, secure sessions, and zero synthetic accounting. | 59.5% | 59.5% | +0 pp | BLOCKED | Prove a production owner session and reconcile imported totals plus current provider balances in one evidence run. |
| Legacy Finance / Incoming Ledger | A stable and clearly bounded legacy ledger that remains reliable during transition and has an explicit migration, archival, or retirement decision. | 56.5% | 56.5% | +0 pp | NEEDS_VERIFICATION | Choose and document retained reference, migration source, or retired archive, with parity and rollback evidence. |
| Psitherapy | A polished therapeutic self-analysis product with a coherent workbook, secure production identity, durable progress, safe boundaries, and clear paid-support pathways. | 53.5% | 53.5% | +0 pp | BLOCKED | Complete a reversible Firebase preview cutover proving login, saved progress and the core intake journey before production. |
| Reiki Yggdrasil | A coherent and trustworthy Reiki training and practitioner platform with excellent live journeys, safe administration, and measured inquiries or bookings. | 43.5% | 43.5% | +0 pp | NEEDS_VERIFICATION | Run one full product, live and conversion audit and establish the first observed inquiry or booking KPI. |
| Codex Links | A safe multi-project command and approval bridge with explicit human approval, correct routing, complete delivery evidence, and low retry cost. | 56.2% | 56.2% | +0 pp | NEEDS_VERIFICATION | Rebase the stacked approval chain, obtain a fully green suite, and prove one approved proposal to Codex command to delivery result. |
| Brain Management | A live and trustworthy command and observability surface showing current portfolio health, strategic progress, Daily Intelligence, and exact source-to-deploy evidence. | 82.5% | 82.5% | +0 pp | NEEDS_VERIFICATION | Prove one watchdog-triggered recovery with a matching public timestamp, source commit, content deploy, receipt and visible scoreboards. |
| Toronto Tantra | A premium and concise event-program ecosystem with excellent mobile experience, reliable publishing, clear safety and trust, and measured conversion of qualified Toronto interest. | 65.2% | 65.2% | +0 pp | NEEDS_VERIFICATION | Instrument qualified interest to conversation to confirmed registration across the three programs. |
| AI Projects Brain | A self-improving portfolio operating system that preserves strategic goals, selects highest-leverage work, validates delivery, learns from failures, and maintains truthful evidence. | 83% | 85% | +2 pp | PROVEN | Connect the proof-gated observation layer to current provider readiness, public receipts, observed conversion and retry-cost collectors. |
| Psihotavr | A clearly governed legacy production platform whose source, live build, data and auth state, and retirement or coexistence role are explicitly proven. | 50.8% | 50.8% | +0 pp | BLOCKED | Prove the canonical live source and decide coexistence, migration, or retirement with preservation and rollback evidence. |

## System Intelligence Scoreboard

| Big Goal | Yesterday | Today | Daily Delta | Evidence | Next Quality Threshold |
|---|---:|---:|---:|---|---|
| Consistently choose the highest-leverage work, execute safe improvements end-to-end, learn from failures, reduce rework, and prove live outcomes without false success. | 76.8% | 79.8% | +3 pp | PROVEN | Add stable provider, public-live, commercial-outcome and context/retry collectors with explicit owners and cadences. |

Percentages are conservative weighted progress values from the canonical project-specific rubrics. Missing evidence is never counted as success.
<!-- /STRATEGIC_GOAL_SCOREBOARD -->


<!-- MORNING_UPGRADE:morning-receipt-bound-live-proof-2026-07-18 -->
## Morning System Upgrade — 2026-07-18

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Publication Freshness | brain-management | Business Growth and Professional Value | Professional delivery and live reliability | READY deploy plus timestamp/UI proof | Receipt-bound snapshot, mirror commit, content deploy and UI proof | false-LIVE ambiguity removed | Morning automation contract and production receipt schema | high |
| Rule Lifecycle | ai-projects-brain | Continuous Self-Development | Rule and automation lifecycle | LIVE rule did not explicitly distinguish receipt deploy from content deploy | LIVE rule distinguishes and binds both deploy roles | automation contract tightened | Morning System Upgrade prompt | high |

### Evening verification questions

1. Does the public receipt snapshot_timestamp equal 2026-07-18T07:35:00+02:00?
2. Does the receipt content_deploy.source_commit_sha identify the latest brain-management mirror commit?
3. Does the receipt content_deploy.deploy_id identify the verified content deploy rather than the later receipt deploy?
4. Do all required receipt checks and visible Portfolio Health, project selection and goal pyramid checks pass?


<!-- EVENING_UPGRADE:evening-architecture-2026-07-18-observable-publication-recovery -->
## Evening Architecture Upgrade — 2026-07-18

### Validation

- **24/24 deterministic checks expected and required before merge/publication.**
- Exact-snapshot publisher topology is enforced.
- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.

### Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | Twice-daily recovery accepted a dispatch without proving that a canonical publisher run was created. | Two-hour off-peak recovery records a concrete publisher run ID and URL or fails with unobserved-dispatch evidence. | dispatch_to_run_observability_added | brain-management PR #44, merge e022b733, 4 watchdog regressions | high |
| False Success Rate | AI Projects Brain | Efficiency and System Intelligence | Execution quality and completion | HTTP dispatch acceptance could be reported as recovery activity despite no observable publisher execution. | Dispatch acknowledgement, observed publisher run and matching LIVE receipt are three distinct evidence stages. | recovery_evidence_ladder_tightened | Evening runtime contract and observable recovery artifact contract | high |
| Avoidable Handoff Rate | Brain Management | Efficiency and System Intelligence | Autonomy and resource use | A missed push or repository dispatch could leave the snapshot stale until manual investigation. | Repeated off-peak recovery retries stale snapshots and surfaces the exact publisher run identity automatically. | manual_recovery_window_reduced | recovery schedule and run-observation gate | high |

### Ranked Morning handoff

1. **brain-management / Business Growth and Professional Value / Professional delivery and live reliability:** Verify the recovery artifact, observed publisher run, READY content deploy, matching public timestamp, immutable receipt and visible Portfolio/Project/Goal UI for the 20:07:42 snapshot. Expected metric effect: Publication Freshness 2/4 STALE -> 4/4 LIVE only with exact receipt proof
2. **portfolio / Business Growth and Professional Value / Commercial outcomes:** Register one observed KPI source with owner, bounded period and cadence for the highest-priority commercial project. Expected metric effect: Business Growth Outcomes unknown -> first observed project KPI
3. **ai-projects-brain / Efficiency and System Intelligence / Autonomy and resource use:** Add Context/Retry Cost only after a stable non-secret collector exists. Expected metric effect: Context/Retry Cost candidate -> measurable active metric
