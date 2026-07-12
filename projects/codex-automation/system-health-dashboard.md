# Agent/Codex System Health Dashboard

**Status:** active canonical dashboard. Public publication state: `NEEDS_VERIFICATION` until the public JSON timestamp matches canonical.

**Last updated:** 2026-07-12 22:55 Europe/Kyiv.

- **Canonical metrics:** [GitHub dashboard](https://github.com/andylitvinov-design/ai-projects-brain/blob/main/projects/codex-automation/system-health-dashboard.md)
- **Public dashboard:** [brain-management system health](https://brain-management.netlify.app/system-health-dashboard/)
- **Machine source:** `projects/codex-automation/system-health-dashboard.json`

## Overall health

| Parameter | Current value |
| --- | --- |
| Overall score | **69/100 estimated** |
| Previous score | 67/100 estimated |
| Change | **+2** |
| Scored core metrics | 9/10 |
| Strongest | Loop closure and Validation evidence — 81/100 |
| Weakest scored | User pain repetition — 50/100 |
| Unscored | Provider/live readiness — unknown |
| Public freshness | **NEEDS_VERIFICATION** |
| Publication trace | **3/4 stages verified** |

## Core health metrics

| Metric | Today | Yesterday | Change | Confidence | Evidence | Done today | Tomorrow action |
| --- | ---: | ---: | ---: | --- | --- | --- | --- |
| Provider/live readiness | unknown | unknown | 0 | high | No new provider/live proof; denominator undefined | Kept unscored | Define denominator, then close one provider proof gap |
| False success protection | 70 | 66 | **+4** | high | PR #103 merged; CI run #70 passed; LIVE still refused without current public timestamp | Accepted Morning delta; classified NEEDS_VERIFICATION | Exercise validator on a real Git-connected Netlify deploy |
| Delivery completion quality | 68 | 67 | +1 | high | Merge, CI and dashboard sync exist; issue #33 remains open | Kept external publication incomplete | Execute issue #33 through PR, merge, deploy and live proof |
| User pain repetition | 50 | 52 | **-2** | high | One repeated completion request was observed | Created exact issue/handoff and refreshed dashboard directly | Do not return another planning-only response |
| Loop closure | 81 | 79 | **+2** | high | Harness loop closed; separate deploy loop explicitly routed | Accepted Morning delta | Close Netlify publication without reopening finished harness work |
| Validation evidence | 81 | 78 | **+3** | high | PR #103 merge `779c7f7…`; workflow run #70 success | Independently verified PR and CI metadata | Attach build/deploy/live proof to issue #33 |
| Regression/replay coverage | 75 | 72 | **+3** | high | 8 regressions, 7 replays, 7 fixtures, 26 samples recorded | Accepted Morning delta | Add coverage only for a new failure class |
| Rule lifecycle health | 66 | 64 | +2 | medium | Publication rule has tests/validators and one operational case | Retained candidate status | Promote after a second independent case |
| Automation noise / duplication | 72 | 72 | 0 | high | Exactly one enabled Morning and one enabled Evening; no duplicates | Verified live scheduler state | Recheck after next Morning run |
| Active project momentum | 56 | 56 | 0 | medium | Composite of Product Delivery 45, System Improvement 88, Business Growth 35 | Split the metric into visible dimensions | Raise delivery with a live outcome and growth with a shipped business improvement |

## Momentum breakdown

The previous single momentum score hid an important imbalance. It is now an equal-weight composite:

```txt
Active project momentum = (Product Delivery + System Improvement + Business Growth) / 3
(45 + 88 + 35) / 3 = 56
```

| Dimension | Today | Yesterday | Change | Confidence | What it means | What raises it |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Product Delivery | **45** | 45 | 0 | medium | Real user-visible work, provider proof, merged-and-live outcomes | Close issue #33, ship a verified product change, or close a provider-backed blocker |
| System Improvement | **88** | 84 | **+4** | high | Harness, automation, validation, replay, dashboard and rule-system quality | Continue evidence-backed system upgrades without replacing product delivery |
| Business Growth | **35** | 39 | **-4** | low | Offers, funnels, content distribution, conversion, retention and revenue outcomes | Ship and measure one concrete growth improvement |

**Interpretation:** the agent operating system is improving quickly, but product delivery and business growth are not keeping pace. The composite remains 56, but the dashboard now shows where the imbalance actually is.

## Operational indicators

| Indicator | Current | Target | Evidence / next action |
| --- | --- | --- | --- |
| Dashboard freshness | **NEEDS_VERIFICATION** | LIVE within same run | Canonical and mirror require redeploy/current public JSON proof |
| Publication trace completeness | **3/4** | 4/4 | canonical_updated, mirror_synced, deploy_identified verified; live_verified missing |
| Scheduler liveness | 1 Morning + 1 Evening; no duplicates | exactly one of each | Live registry checked; repeat after Morning |
| Validation reproducibility | 7 validator classes recorded; CI #70 passed | all required raw evidence | Rerun in issue #33 branch |
| Rework / recovery rate | unknown; 1 repeated request observed | measured daily | Add attempts/reopens/repeated-corrections denominator |
| Automation hidden cost | unknown; verification path fragmented | measured daily | Add non-sensitive retry/duplicate-scan counters |
| Rollback / blast-radius readiness | partial | proved for live changes | Deploy ID known; source commit/branch rollback proof absent |

## Deterministic aggregate

```txt
canonical_snapshot_timestamp: 2026-07-12T22:55:00+03:00
aggregate_method: arithmetic_mean_of_numeric_metrics
unknown_metric_policy: exclude_from_numeric_mean_and_report_in_coverage
score_sum: 619
numeric_metric_count: 9
metric_count_total: 10
coverage: 9/10
raw_score: 68.8
rounded_score: 69
reported_score: 69
yesterday_score: 67
delta: +2
```

## Publication evidence ladder

| Stage | Status | Current evidence |
| --- | --- | --- |
| canonical_updated | verified | Canonical JSON and Markdown refreshed at `2026-07-12T22:55:00+03:00` |
| mirror_synced | pending_sync | Mirror must receive the same schema-v4 snapshot |
| deploy_identified | verified | Existing Netlify deploy `6a5207d064f1feba62676b5e`; deploy source `api`; branch/source commit absent |
| live_verified | needs_verification | Current public timestamp and source-mapped deploy remain unproven |

`SUCCESS` requires all four stages to be verified.

## Ranked Morning handoff

### 1. Raise Product Delivery and complete publication

- Execute [brain-management #33](https://github.com/andylitvinov-design/brain-management/issues/33).
- Required result: PR → merge → existing Netlify deploy → public timestamp equals canonical.
- Expected effect: Product Delivery `45 → 50+`, publication `3/4 → 4/4`, only after live proof.

### 2. Raise Business Growth with one shipped outcome

- Select one active project and ship one measurable offer, funnel, content-distribution, conversion, retention, or revenue improvement.
- Do not count planning, prompts, issues, or docs as Business Growth.

### 3. Preserve strong System Improvement without letting it hide delivery gaps

- Continue safe harness upgrades, but always report the three momentum dimensions separately.

## Current blockers

- Automatic GitHub → Netlify publication is not proven by branch/source commit/current live timestamp.
- Psihotavr #168 still needs provider/live auth and persistence proof.
- Finance #614 still needs strict finance verification and provider-balance resolution.
