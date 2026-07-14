# Upgrade Cycle Metrics Contract

Status: active adaptive metric model for Andrey's Agent/Codex OS.
Last updated: 2026-07-14.

## Purpose

Measure whether the system:

1. executes Andrey's tasks correctly, completely, quickly and autonomously;
2. improves business and product implementation across active projects;
3. learns from real failures and becomes more capable every day.

The dashboard is a pyramid, not a flat scorecard:

```text
Portfolio Health
  -> Project Health matrix
    -> Goal
      -> Sector
        -> Metric
          -> Evidence
```

There is no decision-making overall score. Critical guardrails override summaries.

## Measurement rules

1. Prefer observed counts, ratios, durations, currency and states.
2. Every numeric metric requires numerator, denominator, period, unit and source.
3. Missing evidence or denominator is `unknown`, never zero.
4. `NOT_APPLICABLE` is different from zero and from unknown.
5. A PR, merge, issue, prompt or deploy-ready state is not a live result.
6. Compare projects with themselves over time; do not rank unlike projects with one score.
7. A metric must belong to exactly one goal and one sector in the system pyramid.
8. Project metrics may vary by project profile. Global metrics must remain few.
9. Audit agents provide evidence and readiness assessments; they do not invent revenue or conversion outcomes.
10. Metrics have lifecycle: `candidate`, `active`, `watch`, `needs_revision`, `superseded`, `retired`.

## Layer 1: Portfolio Health

Portfolio Health answers: **How healthy is Andrey's business implementation across all active projects?**

Display:

- number of active projects;
- projects with observed metrics;
- projects blocked by critical guardrails;
- strongest positive change;
- largest portfolio risk;
- project matrix by sectors.

Portfolio status is a state only:

`STRONG / IMPROVING / PARTIALLY_INSTRUMENTED / NEEDS_ATTENTION / BLOCKED / INSUFFICIENT_DATA`.

Do not average project scores.

## Layer 2: Project Health

Each project has six common sectors. A sector may be `NOT_APPLICABLE` for a project.

### 1. Execution

Can the project changes be completed correctly and verified?

Possible metrics:

- task success / first-pass acceptance;
- live completion;
- lead time to verified result;
- rework;
- false-success events.

### 2. Product Value

Does the project solve a real user problem?

Possible metrics:

- product delivery;
- user pain recurrence;
- journey completion;
- usability/conversion barriers from `/audit-ui`;
- verified user outcome.

### 3. Business Growth

Does the project create measurable economic or operational value?

Project-specific outcomes:

- qualified leads;
- orders;
- confirmed revenue;
- conversion;
- attendance and repeat attendance;
- cost or manual time reduction;
- finance accuracy and exceptions prevented.

`/audit-sales` may assess funnel and sales readiness, but only observed leads/orders/revenue confirm growth.

### 4. Standards

Does the implementation meet applicable professional standards?

Evidence may come from:

- `/audit-ui`: accessibility, responsive quality, clarity, trust, UX and conversion readiness;
- `/audit-sales`: audience, offer, trust, CTA, objections, friction and measurement readiness;
- `/audit-fin`: reconciliation, integrity, audit trail and exception handling;
- engineering/security/live validators.

Use:

`passed applicable checks / all applicable checks`.

Never create a subjective “world-class score”.

### 5. Reliability

Can users depend on the live implementation?

Metrics:

- provider/live readiness;
- publication freshness;
- change fail rate;
- recovery time;
- rollback readiness;
- auth/payment/storage/data integrity when applicable.

### 6. Learning

Does the project improve after audits, failures and user corrections?

Metrics:

- accepted findings implemented;
- verified impact of implemented findings;
- recurrence prevention;
- learning reuse;
- replay/validator protection.

## Layer 3: Agent/Codex OS goal pyramid

The existing global metric set remains the continuity source. Every metric is assigned exactly once.

### Goal 1: Efficiency and System Intelligence

#### Execution quality and completion

- Task Success Rate
- Live Completion Rate
- False Success Rate / critical count
- Correct Abstention Rate

#### Speed and delivery flow

- Lead Time to Live
- Deployment Frequency
- Rework Rate

#### Autonomy and resource use

- Avoidable Handoff Rate
- Verification Retry Rate
- Duplicate Scan Rate
- Context/Retry Cost

### Goal 2: Business Growth and Professional Value

#### Product and user value

- Product Delivery Rate
- User Pain Recurrence Rate

#### Commercial outcomes

- Business Growth Outcomes, split into project-specific counts when evidence exists

#### Professional delivery and live reliability

- Change Fail Rate
- Failed Deployment Recovery Time
- Provider/Live Readiness Ratio
- Publication Freshness
- Rollback Readiness Ratio

### Goal 3: Continuous Self-Development

#### Validation and accumulated knowledge

- Eval Pass Rate
- Evidence Completeness
- Failure-Class Coverage

#### Rule and automation lifecycle

- Rule Lifecycle
- Scheduler Health

## Audit-agent evidence contract

Every `/audit-ui`, `/audit-sales`, `/audit-fin` or other structured assessment intended for Project Health must publish:

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

Rules:

- audit assessment is evidence, not direct business outcome;
- heuristic historical scores may be shown as navigation only;
- inaccessible behavior is `NOT_TESTED`;
- no invented conversion, revenue, testimonial, credential or impact;
- implementation impact requires after-change verification.

## Project metric record

Project-specific metrics use:

```text
project_id
sector
id
name
purpose
type
value
numerator
denominator
unit
period
source
owner
confidence
status
previous_value
change
target_or_slo
interpretation
next_action
lifecycle
```

## Critical guardrails

These are trust constraints, not progress metrics:

- zero critical false-success claims;
- publication canonical/mirror/deploy/live ladder is 4/4 in the same run;
- provider/live-dependent work stays blocked without current proof;
- exactly one enabled Morning System Upgrade and one enabled Evening Architecture Upgrade, zero duplicates;
- risky production/auth/payment/billing/data/secret work uses an explicit safe route;
- project metrics cannot claim observed health from an audit score alone.

## Morning System Upgrade responsibilities

Morning must:

1. read this contract before updating metrics;
2. refresh Portfolio Health and Project Health from current evidence;
3. update the three-goal system pyramid;
4. apply 1-3 safe real upgrades;
5. attribute each upgrade to one goal, one sector and affected projects;
6. ingest current audit-agent evidence when available;
7. preserve unknown and not-applicable states;
8. update canonical Markdown/JSON and identical mirror;
9. verify publication ladder;
10. finish `APPLIED_UPGRADE` or `NO_SAFE_UPGRADE`, never only audited.

## Evening Architecture Upgrade responsibilities

Evening must:

1. verify Morning claims and public evidence;
2. compare portfolio, project, goal and sector changes since the prior snapshot;
3. identify the highest-leverage structural weakness;
4. apply 1-3 safe harness/schema/validator/test/automation upgrades;
5. update project-health and agent-assessment evidence;
6. detect metrics needing revision, superseding or retirement;
7. preserve history and continuity mappings;
8. produce a ranked Morning handoff tied to project, goal, sector and expected metric effect.

## Dashboard presentation

The public dashboard must provide:

1. `Portfolio Health` default tab;
2. project matrix with sectors: Execution, Product Value, Business Growth, Standards, Reliability, Learning;
3. selectable project drilldown with metrics and audit evidence;
4. `System Health` tab with three goals, sectors and all global metrics assigned exactly once;
5. critical guardrails;
6. Daily Intelligence and historical deltas;
7. metric notes explaining purpose, definition and evidence;
8. no overall decision score.

## References

- DORA: https://dora.dev/guides/dora-metrics-four-keys/
- SPACE: https://queue.acm.org/detail.cfm?id=3454124
- Google SRE: https://sre.google/sre-book/service-level-objectives/
- OpenAI evals: https://platform.openai.com/docs/guides/evals
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
