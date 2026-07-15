# Agent/Codex System Health Dashboard

**Metric model:** `adaptive_portfolio_project_goal_v1`  
**Last updated:** `2026-07-15T07:51:30+02:00`  
**Morning result:** `APPLIED_UPGRADE`  
**Public publication state:** `STALE`

## Status

**APPLIED_UPGRADE**

## Main upgrade applied this morning

**`daily_intelligence_publication_pipeline`** — Integrated Daily Intelligence into canonical Markdown/JSON, exact mirror sync and publication-trace validation.

The writer was merged and CI-proven, but the first canonical/mirror snapshot still had no safe automated publication path.

## Changed files / prompts / automations

- `scripts/publish-morning-dashboard-snapshot.mjs` — snapshot, Markdown and trace orchestration.
- `tests/morning-dashboard-publication.test.mjs` — five deterministic tests.
- `scripts/run-agent-harness-validation-evidence.mjs` — active harness integration.
- `.github/workflows/publish-system-health-dashboard.yml` — validate, mirror, hash-check, commit and dispatch.

## Portfolio Health change

State **NEEDS_ATTENTION**; active 10; observed 4; blocked 5.
Strongest change: Daily Intelligence now has a deterministic canonical publication path.
Largest risk: Public Netlify deploy remains old and source-unmapped.

## Project Health matrix change

| Project | Execution | Product Value | Business Growth | Standards | Reliability | Learning | State |
|---|---|---|---|---|---|---|---|
| Ezohata | WATCH | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| EzoHata Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| Legacy Finance / Incoming Ledger | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| Psitherapy | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | BLOCKED |
| Reiki Yggdrasil | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | WATCH | UNKNOWN | WATCH |
| Codex Links | WATCH | WATCH | NOT_APPLICABLE | WATCH | WATCH | WATCH | WATCH |
| Brain Management | WATCH | WATCH | NOT_APPLICABLE | WATCH | BLOCKED | PASS | BLOCKED |
| Toronto Tantra | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| AI Projects Brain | PASS | WATCH | NOT_APPLICABLE | PASS | WATCH | PASS | IMPROVING |
| Psihotavr | UNKNOWN | WATCH | UNKNOWN | NOT_TESTED | BLOCKED | WATCH | NEEDS_VERIFICATION |

### Selected project drilldowns

- **AI Projects Brain:** IMPROVING; reliability WATCH; learning PASS.
- **Brain Management:** BLOCKED; reliability BLOCKED; learning PASS.
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
