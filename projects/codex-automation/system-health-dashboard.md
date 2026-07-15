# Agent/Codex System Health Dashboard

**Metric model:** `adaptive_portfolio_project_goal_v1`  
**Last updated:** `2026-07-15T20:00:21+02:00`  
**Evening result:** `APPLIED_UPGRADE`  
**Public publication state:** `STALE`

## Status

**APPLIED_UPGRADE**

## Main upgrade applied this evening

**`exact_snapshot_publisher_ownership`** — Separated dashboard snapshot generation from publication so CI cannot overwrite Evening evidence with a hard-coded Morning snapshot.

The publisher called the Morning generator on every relevant push and embedded a fixed obsolete Netlify deploy. That could erase a newer Evening result, create write races, and keep Publication Freshness permanently STALE even after a verified production recovery.

## Changed files / prompts / automations

- `scripts/apply-dashboard-upgrade-record.mjs`
- `.github/workflows/publish-system-health-dashboard.yml`
- `tests/dashboard-upgrade-record.test.mjs`
- `tests/dashboard-publisher-exact-snapshot.test.mjs`
- `systems/evening-upgrade-runtime-contract.md`
- `projects/codex-automation/pending-dashboard-upgrade.json`
## Portfolio Health change

State **NEEDS_ATTENTION**; active 10; observed 4; blocked 3.
Strongest change: Brain Management publication recovered: the production workflow is green, the current Netlify deploy is READY, and public timestamp/UI checks passed.
Largest risk: Provider/live evidence and observed business KPI sources remain missing across several active projects.

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
| Daily Intelligence Publication Pipeline | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | writer only | 1/1 PASS | publication_integrated | workflow + blob identity | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation and accumulated knowledge | 11/11 | 22/22 | denominator+11 | validation set | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery and live reliability | STALE 2/4 | STALE 2/4 | canonical refreshed; public unchanged | deploy 6a5207d064f1feba62676b5e old/unmapped | high |
| Scheduler Health | AI Projects Brain | Continuous Self-Development | Rule and automation lifecycle | 2/2 | 2/2 | verified_again | automation registry | high |

## System Intelligence Gain

- rules_improved: **1**
- validators_added_or_tightened: **1**
- deterministic_checks_added: **5**
- replay_cases_added_or_improved: **0**
- behavior_fixtures_added_or_improved: **0**
- duplicate_instructions_removed: **0**
- evidence_fields_added: **18**
- automation_contracts_improved: **1**
- dashboard_registry_schema_improvements: **1**
- project_records_instrumented: **1**

## Critical guardrails

- zero_critical_false_success: **PASS** — 0 / 0
- dashboard_publication_4_of_4: **STALE** — 2/4 / 4/4 same run
- scheduler_unique_morning_evening: **PASS** — 2/2; duplicates=0 / 1 Morning + 1 Evening; 0 duplicates
- provider_live_gate: **PASS** — 0 / 0 unsupported live claims
- audit_score_not_health: **PASS** — 0 / 0 observed projects from heuristic scores

## Publication ladder

- canonical_updated: **verified** — 2026-07-15T07:51:30+02:00
- mirror_synced: **verified** — blob identity gate
- deploy_identified: **stale** — old source-unmapped Netlify deploy
- live_verified: **needs_verification**

## Exact risky-work handoffs

1. **brain-management → /safe:** No current source-mapped deploy or public timestamp equality. Evidence: deploy ID, branch, source SHA, public timestamp and visible Portfolio/Project/Goal UI
2. **ezohata → /safe:** Provider-dependent persistence unverified. Evidence: owner session and live persistence proof
3. **ezohata-finance → /audit-fin:** Origin, signed session, migration parity and balances unproven. Evidence: non-secret reconciled evidence

## Validation evidence

- **22/22 PASS**; canonical/mirror identity is blocking.
- Three goals preserved; publication remains STALE.

## What remains unknown, not applicable or blocked

- Public dashboard remains STALE.
- Product Delivery Rate remains unknown.
- Business Growth Outcomes remain not_instrumented.
- Provider readiness numerator remains unknown.
- Context/Retry Cost remains unknown.
- Current /audit-ui and /audit-fin evidence remains NOT_TESTED.
- Psihotavr source/retirement remains NEEDS_VERIFICATION.

## Evening verification questions

- Are canonical and mirror blobs identical?
- Did all 22 checks pass on final main?
- Was a source-mapped Netlify deploy created?
- Does public timestamp equal canonical and show Portfolio Health, project selection and goal pyramid?


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

### Ranked Morning handoff

1. **brain-management / Business Growth and Professional Value / Professional delivery and live reliability:** Verify the Evening snapshot publication ladder and record the new deploy/public timestamp proof without regenerating canonical business fields. Expected metric effect: Publication Freshness STALE 2/4 -> LIVE 4/4 when independently proven.
2. **portfolio / Business Growth and Professional Value / Commercial outcomes:** Register one observed KPI source, owner and cadence for the highest-priority active commercial project. Expected metric effect: Business Growth Outcomes not_instrumented -> observed or explicitly blocked.
3. **ai-projects-brain / Efficiency and System Intelligence / Autonomy and resource use:** Add stable non-secret counters for context/retry cost only if a trustworthy source exists. Expected metric effect: Context/Retry Cost candidate/unknown -> measurable or retained unknown with stronger evidence.
