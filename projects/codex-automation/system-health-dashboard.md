# Agent/Codex System Health Dashboard

**Status:** active canonical dashboard. Public publication state: `NEEDS_VERIFICATION` until the public JSON timestamp matches canonical.

**Last updated:** 2026-07-12 21:00 Europe/Podgorica.

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
| Active project momentum | 56 | 56 | 0 | medium | No new provider proof, publication PR or source-mapped deploy | Did not count issue/docs as production progress | Land publication PR or close one provider-backed outcome |

## Morning delta verification

**Accepted:** false success protection, delivery completion quality, loop closure, validation evidence, regression/replay coverage, and rule lifecycle health.

**Corrected:**
- User pain repetition: `52 → 50` because one repeated completion request was observed.
- Publication trace: `2/4 → 3/4` because the mirror timestamp matches canonical.
- Public status: `NEEDS_VERIFICATION`, because current public JSON and a newer source-mapped deploy were not proven.

**Insufficient evidence:** provider/live readiness, numeric rework rate, numeric hidden cost, and full rollback readiness.

## Operational indicators

| Indicator | Current | Target | Evidence / next action |
| --- | --- | --- | --- |
| Dashboard freshness | **NEEDS_VERIFICATION** | LIVE within same run | Canonical and mirror share the evening snapshot; deploy and current public JSON still need proof |
| Publication trace completeness | **3/4** | 4/4 | canonical_updated, mirror_synced, deploy_identified verified; live_verified missing |
| Scheduler liveness | 1 Morning + 1 Evening; no duplicates | exactly one of each | Live registry checked; repeat after Morning |
| Validation reproducibility | 7 validator classes recorded; CI #70 passed | all required raw evidence | Local rerun unavailable in connector-only review; rerun in issue #33 branch |
| Rework / recovery rate | unknown; 1 repeated request observed | measured daily | Add attempts/reopens/repeated-corrections denominator |
| Automation hidden cost | unknown; verification path fragmented | measured daily | Add non-sensitive retry/duplicate-scan counters |
| Rollback / blast-radius readiness | partial | proved for live changes | Deploy ID/permalink known; source commit/branch rollback proof absent |

## Deterministic aggregate

```txt
canonical_snapshot_timestamp: 2026-07-12T21:00:45+02:00
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
| canonical_updated | verified | Canonical JSON and Markdown refreshed at `2026-07-12T21:00:45+02:00` |
| mirror_synced | verified | brain-management mirror receives the same complete snapshot and timestamp |
| deploy_identified | verified | Existing Netlify deploy `6a5207d064f1feba62676b5e`; deploy source `api`; branch/source commit absent |
| live_verified | needs_verification | Last recorded public timestamp predates canonical; current public JSON was not retrievable |

`SUCCESS` requires all four stages to be verified. A code commit, mirror update, issue, or API/manual deploy alone is not live success.

## Ranked Morning handoff

### 1. Close automatic canonical → mirror → existing Netlify publication

- **Top structural blocker:** issue [brain-management #33](https://github.com/andylitvinov-design/brain-management/issues/33) remains open with no PR.
- **Exact safe change:** on a fresh `brain-management` branch, add deterministic canonical sync/validation and Git-based deployment for existing site `98712296-45be-4c0d-af99-d4ed19507e0e`. Never create a new site.
- **Expected impact:** false success `+1`, delivery completion `+2`, loop closure `+2`, active momentum `+2`; publication `3/4 → 4/4` only if live proof succeeds.
- **Validation:** canonical/mirror equality; required metric/indicator validator; build/lint/tests; production branch/source commit/deploy ID; public JSON timestamp equals canonical; clean desktop/mobile smoke.
- **Evening question:** Does public JSON exactly match canonical with all four stages verified and a source commit recorded?

### 2. Add denominators for rework and hidden cost

- **Exact safe change:** docs/schema-only counters for attempts, reopened tasks, repeated corrections, verification retries and duplicate scans. Historical unavailable values stay `unknown`.
- **Validation:** schema rejects missing denominator fields and never converts unknown to zero.
- **Evening question:** Were counters populated only from observed events?

### 3. Define provider/live readiness denominator

- **Exact safe change:** docs/schema inventory of provider-dependent production surfaces and their proof states; no provider configuration changes.
- **Validation:** every surface has repo/live/provider, required proof, state and evidence timestamp.
- **Evening question:** Is the denominator stable without counting harness evidence as provider proof?

## Current blockers

- Automatic GitHub → Netlify publication is not proven by branch/source commit/current live timestamp.
- Psihotavr #168 still needs provider/live auth and persistence proof.
- Finance #614 still needs strict finance verification and provider-balance resolution.
