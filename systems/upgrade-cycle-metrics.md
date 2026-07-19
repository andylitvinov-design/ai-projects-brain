# Upgrade Cycle Metrics Contract

Status: active.
Last updated: 2026-07-19.

This metrics contract is subordinate to `systems/live-upgrade-delivery-contract.md`. When instructions conflict, the live delivery contract wins.

## Purpose

Measure whether Andrey's Agent/Codex operating system:

1. selects the highest-value safe work;
2. completes it through verified production behavior;
3. reduces carryover, rework and owner dependency;
4. improves products and operations more often than it improves its own reporting machinery;
5. learns from confirmed failures without creating meta-work loops.

## Health model

```text
Portfolio Health
  -> Project Health
    -> Goal
      -> Sector
        -> Metric
          -> Evidence
```

There is no overall decision score across unlike projects. Critical guardrails override summaries.

## Measurement rules

1. Prefer observed counts, ratios, durations, currency and explicit states.
2. Every numeric metric requires numerator, denominator, period, unit and source.
3. Missing evidence is `unknown`; non-applicable is `NOT_APPLICABLE`.
4. A task, prompt, issue, branch, PR, merge, deployment or receipt is not a live outcome.
5. Compare each project with itself over time.
6. Audit agents provide readiness evidence, not invented business outcomes.
7. Preserve metric IDs and history. Changed definitions must be marked `SUPERSEDED`.
8. Success terminology follows `systems/live-upgrade-delivery-contract.md` exclusively.

## Project Health sectors

Each active project may use applicable sectors:

- `Execution`: completion, lead time, rework, false success.
- `Product Value`: user journey, usable functionality, pain removed.
- `Business Growth`: observed leads, orders, revenue, attendance, savings or other registered KPI.
- `Standards`: applicable `/audit-ui`, `/audit-sales`, `/audit-fin`, accessibility, security and engineering checks.
- `Reliability`: live readiness, freshness, change failures, recovery and rollback.
- `Learning`: accepted findings implemented, recurrence prevention and replay coverage.

## Canonical daily and rolling-seven-day metrics

### Primary outcome

`Verified Live Upgrade Count`

Count of useful upgrade chains ending `LIVE_VERIFIED` during the period.

### Live Completion Rate

```text
selected chains ending LIVE_VERIFIED / all selected chains
```

### Carryover Count

Unresolved selected chains at cycle close.

### Median Cycle Time

Median minutes from candidate selection to `LIVE_VERIFIED`.

### Product Upgrade Ratio

```text
verified PRODUCT + OPERATIONAL upgrades / all verified upgrades
```

### Infrastructure Upgrade Ratio

```text
verified INFRASTRUCTURE upgrades / all verified upgrades
```

The rolling policy is no more than one infrastructure upgrade for every three product or operational upgrades, unless a proven P0/P1 infrastructure defect blocks multiple projects.

### Regression Rate

```text
verified upgrades with a confirmed regression / verified upgrades
```

### Owner Blocker Count

Count of chains ending `BLOCKED_BY_OWNER`.

### Autonomous Recovery Rate

```text
recoverable failed chains restored automatically / all recoverable failed chains
```

### Supporting metrics

- false-success critical count;
- failed-deployment recovery time;
- provider/live readiness ratio;
- evidence completeness;
- scheduler uniqueness and health;
- context/retry cost when observable.

## Candidate-selection evidence

Every selected candidate records the canonical 1-5 rubric values:

- impact;
- urgency;
- completion probability;
- risk;
- calculated priority;
- carryover status;
- category: PRODUCT, OPERATIONAL or INFRASTRUCTURE.

The calculation and tie-break rules are defined in `systems/live-upgrade-delivery-contract.md`.

## Audit-agent evidence

Structured assessments publish:

```text
project_id
agent
sector
observed_at
status: PASS | WATCH | FAIL | BLOCKED | NOT_TESTED
applicable_checks
passed_checks
finding_count
critical_finding_count
evidence_refs
summary
recommended_action
confidence
```

Audit evidence cannot be converted into revenue, conversion or verified user impact without observed outcome data.

## Upgrade evidence record

Use the complete schema in `systems/live-upgrade-delivery-contract.md`. At minimum retain:

```text
upgrade_id
project_id
source_cycle
summary
category
candidate_score
carryover_from
terminal_state
technical_evidence
user_evidence
blocker
next_automatic_action
started_at
verified_at
cycle_time_minutes
regression_detected
recovery_attempted
```

## Critical guardrails

- zero critical false-success claims;
- only the four canonical terminal states;
- technical proof and user proof remain separate;
- provider/live work stays incomplete without current production evidence;
- exactly one enabled Morning System Upgrade and one enabled Evening Delivery Closure;
- risky production/auth/payment/billing/data/secret work uses an explicit safe route;
- unresolved carryover is processed before new work;
- no mandatory harness/dashboard change per run;
- infrastructure ratio limit is enforced.

## Cycle responsibilities

### Morning Task Sweep

Discover, reconcile and rank unresolved chains. Persist at most three candidates. It is not a parallel architecture-upgrade run.

### Daily Strategic Priorities

Maintain Big Goals and contribute at most three scored strategic candidates. It does not implement, merge or deploy.

### Morning System Upgrade

Own primary delivery: carryover first, at most three chains, full safe ladder through production verification, evidence persistence and metrics update.

### Evening Delivery Closure

Own verification, one recovery attempt, minimal safe repair, regression detection, carryover persistence and next-morning handoff. It may perform a system/harness improvement only when evidence and the infrastructure ratio permit it.

### Dashboard Publication Watch

Observe and recover the dashboard publication chain without becoming a second deployer. Publication machinery is supporting infrastructure and does not count as a product upgrade.

## Compact reporting

Report only:

1. `LIVE VERIFIED` with project, production URL and proof.
2. `NOT CLOSED` with failed stage and next automatic action.
3. `OWNER ACTION` with one exact action and direct link.
4. daily and rolling-seven-day metrics.

Commits, validators, schemas and receipts appear only when they prove a delivered result or explain a blocker.
