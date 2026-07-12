# Upgrade Cycle Metrics Contract

Status: active metric model v2 for ChatGPT/Codex recurring automations.
Last updated: 2026-07-12.

## Purpose

Measure whether Andrey's agent/Codex system produces reliable live outcomes with low rework, not whether reports look comprehensive.

The model is informed by:

- DORA software-delivery metrics: lead time, deployment frequency, change fail rate, recovery time, rework;
- SPACE: performance, activity, satisfaction, collaboration, efficiency and flow must not collapse into one number;
- Google SRE: observable SLI/SLO, freshness, error budget and rollback evidence;
- AI evaluation practice: task-success rate, eval pass rate, false-success rate, failure severity and reproducibility;
- NIST AI RMF: continuous measurement, evidence, risk ownership and post-deployment monitoring.

## Core principles

1. Prefer observed counts, ratios, durations and states over estimated `0-100` scores.
2. Every numeric metric requires a numerator, denominator, measurement period and evidence source.
3. Missing evidence is `unknown`, never `0`.
4. A merged PR is not a live result.
5. A single overall score is navigation only and must never hide a failed critical SLO.
6. System Improvement must not compensate for missing Product Delivery or Business Growth.
7. Compare a project with itself over time; do not use DORA metrics to rank unlike projects.
8. Keep the smallest metric set that changes decisions.

## Metric hierarchy

### A. Product and business outcomes

#### Product Delivery Rate

```txt
numerator: user-visible tasks merged and live-verified in the period
denominator: user-visible tasks selected for delivery in the period
unit: percent and count
period: rolling 7 days
```

Only counts when the expected user flow is verified in production. Issues, prompts, docs, branches and PR creation alone do not count.

#### Business Growth Outcomes

Track observed outcomes separately rather than inventing one score:

```txt
offers shipped
funnels or campaigns launched
qualified leads
orders or paid conversions
conversion rate
revenue or confirmed payments
retention/repeat use when available
```

If the project has no instrumented business KPI, report `not instrumented` and create one exact instrumentation action.

#### User Pain Recurrence Rate

```txt
numerator: repeated user corrections for an already-addressed failure class
denominator: completed user requests in the period
unit: percent and count
period: rolling 7 days
```

Examples: still not live, design still poor, why did you not do it yourself, only checked but did not change anything.

### B. Software delivery flow

Use DORA-compatible observed measures:

#### Lead Time to Live

```txt
start: accepted implementation task or first delivery commit
end: production verification timestamp
unit: median hours/days
period: rolling 7 and 30 days
```

#### Deployment Frequency

```txt
count: verified production deployments
unit: deployments per 7 days
```

#### Change Fail Rate

```txt
numerator: production changes requiring rollback, hotfix or user-visible repair
denominator: verified production changes
unit: percent
```

#### Failed Deployment Recovery Time

```txt
start: failure detected
end: production restored and verified
unit: median duration
```

#### Rework Rate

```txt
numerator: reopened tasks, repeated fixes or unplanned repair attempts
denominator: delivery attempts
unit: percent and count
```

### C. Live reliability and provider readiness

#### Provider/Live Readiness Ratio

Maintain a stable inventory of provider-dependent production surfaces.

```txt
numerator: surfaces with all required provider/live proofs current
denominator: active provider-dependent production surfaces
unit: percent and count
```

A surface is ready only when applicable evidence exists for:

- repo and production branch;
- source commit and deploy ID;
- current live route;
- auth/OAuth/provider availability;
- storage/database persistence and RLS/policy proof;
- payment/webhook/provider proof;
- rollback target;
- evidence timestamp within its freshness window.

#### Publication Freshness

```txt
state: LIVE / STALE / BLOCKED / NEEDS_VERIFICATION
freshness lag: public snapshot timestamp - canonical snapshot timestamp
SLO: public equals canonical in the same Morning/Evening run
```

#### Rollback Readiness Ratio

```txt
numerator: live changes with source commit, prior stable target and rollback instructions
denominator: live changes in the period
unit: percent
```

### D. Agent quality and safety

#### Task Success Rate

```txt
numerator: tasks completed to the requested outcome without repeated user correction
denominator: attempted user tasks
unit: percent and count
```

Report separately:

- first-pass success;
- success after recovery;
- blocked with correct abstention;
- incomplete/false done.

#### Live Completion Rate

```txt
numerator: tasks requiring live proof that obtained live proof
denominator: tasks requiring live proof
unit: percent
```

#### False Success Rate

```txt
numerator: SUCCESS/DONE claims later shown to lack required evidence
denominator: SUCCESS/DONE claims
unit: percent and count
SLO: 0 critical false-success claims
```

#### Eval Pass Rate

```txt
numerator: passing deterministic prompt/replay/behavior samples
denominator: executed samples
unit: percent and count
```

Also record failure severity: critical, high, medium, low.

#### Correct Abstention Rate

```txt
numerator: evidence-missing cases correctly reported as unknown/blocked/needs-verification
denominator: cases where required evidence was missing
unit: percent
```

### E. Efficiency and flow

#### Verification Retry Rate

```txt
numerator: avoidable repeated verification attempts
denominator: verification sequences
unit: percent and count
```

#### Duplicate Scan Rate

```txt
numerator: repeated broad scans that produced no new evidence
denominator: scans
unit: percent and count
```

#### Handoff Rate

```txt
numerator: tasks transferred to another agent/run after safe direct execution was available
denominator: tasks where direct safe execution was available
unit: percent
```

#### Context/Cost

Record when available:

```txt
model/tool retries
avoidable reruns
context growth or token/cost estimate
provider/API cost caused by retries
```

Do not invent missing cost data.

### F. Governance and learning

#### Evidence Completeness Ratio

```txt
numerator: required evidence fields present
denominator: required evidence fields
unit: percent
```

#### Failure-Class Coverage

```txt
numerator: active recurring failure classes covered by regression/replay/behavior fixtures
denominator: active recurring failure classes
unit: percent and count
```

Fixture count alone is not quality. Also show eval pass rate and last execution timestamp.

#### Rule Lifecycle Ratio

```txt
candidate rules
active rules with repeated evidence
rules needing revision
superseded/deprecated rules
```

A rule is promoted only after repeated operational evidence or a documented high-severity prevention case.

#### Scheduler Health

```txt
intended recurring schedules enabled / intended recurring schedules
active duplicate schedules
missed expected runs
```

SLO: exactly one enabled instance of every intended recurring automation and zero duplicates.

## Momentum model

Do not average Product Delivery, System Improvement and Business Growth into a decision-making score.

Show them as three independent outcome lanes:

1. Product Delivery: Product Delivery Rate, Live Completion Rate, lead time and verified deployments.
2. System Improvement: applied harness upgrades, eval coverage/pass rate, evidence completeness and reliability improvements.
3. Business Growth: observed offers, campaigns, leads, conversions, revenue and retention.

A compact `momentum_status` may be:

```txt
BALANCED
SYSTEM_HEAVY
DELIVERY_HEAVY
GROWTH_HEAVY
STALLED
INSUFFICIENT_DATA
```

Current status is `SYSTEM_HEAVY` when System Improvement is strong but Product Delivery and Business Growth lack comparable observed outcomes.

## Overall health presentation

The dashboard must show:

1. Critical SLO violations first.
2. Six domain summaries.
3. Raw metrics with numerator, denominator, unit, period and source.
4. Unknown/not-instrumented fields.
5. Optional legacy navigation score, clearly labelled `legacy_estimate`, until enough observed data exists.

Do not average unknown values. Do not let an overall score override:

- a critical false-success event;
- failed live/provider readiness;
- stale publication;
- a broken finance/auth/payment flow;
- missing rollback proof for a risky production change.

## Morning responsibilities

Morning System Upgrade must:

1. Apply 1-3 safe high-leverage system changes.
2. Refresh observed metrics from available evidence.
3. Never fabricate a denominator.
4. Record which metric was affected and why.
5. Convert missing instrumentation into one exact handoff.
6. Update canonical dashboard JSON/Markdown and mirror.
7. Verify scheduler liveness and publication stages.

## Evening responsibilities

Evening Architecture Review must:

1. Verify Morning claims.
2. Refresh observed counts, ratios, durations and SLO states.
3. Correct unsupported estimates.
4. Identify the largest critical SLO gap or bottleneck.
5. Produce one ranked Morning handoff.
6. Preserve historical unknown values rather than backfilling guesses.

## Required dashboard fields

Every measurable metric record must include:

```txt
id
domain
name
type: count | ratio | duration | state | currency
value
numerator
denominator
unit
period
source
confidence
status
previous_value
change
target_or_slo
interpretation
next_action
```

Fields not applicable may be `null`; evidence-missing values must be `unknown`, not zero.

## References

- DORA metrics: https://dora.dev/guides/dora-metrics-four-keys/
- SPACE framework: https://queue.acm.org/detail.cfm?id=3454124
- Google SRE SLOs: https://sre.google/sre-book/service-level-objectives/
- OpenAI evaluation guidance: https://platform.openai.com/docs/guides/evals
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
