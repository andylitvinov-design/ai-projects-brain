# Agent/Codex System Health Dashboard

**Metric model:** `adaptive_portfolio_project_goal_v1`  
**Last updated:** `2026-07-14T20:00:00+02:00`  
**Evening result:** `APPLIED_UPGRADE`  
**Public publication state:** `STALE` — canonical and mirror are current, but the Netlify deploy is older and source-unmapped.

- **Canonical JSON:** `projects/codex-automation/system-health-dashboard.json`
- **Portfolio registry:** `projects/portfolio-registry.json`
- **Publication trace:** `projects/codex-automation/system-health-dashboard-publication-trace.json`
- **Mirror JSON:** `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`
- **Public dashboard:** https://brain-management.netlify.app/system-health-dashboard/

## Main upgrade applied

**`canonical_portfolio_overlay_and_adaptive_dashboard`** — added a current active-project routing overlay, a 10-project × 6-sector Project Health matrix, exactly three system goals, metric lifecycle states and a deterministic validator.

### Why this mattered

The adaptive contract was merged this morning, but the dashboard still used a flat legacy metric model and the central registry still routed several projects through stale or missing mappings. That made portfolio conclusions and agent routing structurally unreliable.

## Changed files

- `projects/portfolio-registry.json` — new canonical active-project overlay.
- `projects/index.md` — routes agents through the overlay and fixes current repo/live mappings.
- `projects/codex-automation/system-health-dashboard.json` — schema v6 adaptive snapshot.
- `projects/codex-automation/system-health-dashboard.md` — this report.
- `scripts/validate-portfolio-dashboard.mjs` — deterministic project/goal/metric/publication validation.
- `projects/codex-automation/system-health-dashboard-publication-trace.json` — evening publication trace.
- `brain-management/system-health-dashboard/data/current-system-health-dashboard.json` — identical mirror.

## Portfolio Health

| Field | Prior | Current |
|---|---|---|
| State | not represented | **NEEDS_ATTENTION** |
| Active projects | unknown | **10** |
| Observed projects | unknown | **4** |
| Blocked projects | unknown | **5** |
| Strongest positive change | flat harness metrics only | **AI Projects Brain: adaptive contract instrumented** |
| Largest risk | hidden registry drift | **stale routing can select wrong repo/live URL** |

No average across unlike projects was created.

## Project Health matrix

| Project | Execution | Product Value | Business Growth | Standards | Reliability | Learning |
|---|---|---|---|---|---|---|
| Ezohata | WATCH | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH |
| EzoHata Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH |
| Legacy Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH |
| Psitherapy | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH |
| Reiki Yggdrasil | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | WATCH | UNKNOWN |
| Codex Links | WATCH | WATCH | NOT_APPLICABLE | WATCH | WATCH | WATCH |
| Brain Management | WATCH | WATCH | NOT_APPLICABLE | WATCH | **BLOCKED** | PASS |
| Toronto Tantra | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH |
| AI Projects Brain | **PASS** | WATCH | NOT_APPLICABLE | **PASS** | WATCH | **PASS** |
| Psihotavr | UNKNOWN | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH |

Most affected: Brain Management, Ezohata, EzoHata Finance, Psitherapy and Psihotavr.

## Agent evidence

Seven `/audit-sales` baselines were ingested for Ezohata, Psihotavr, Psitherapy, Reiki Yggdrasil, Toronto Tantra, EzoHata Finance and Legacy Finance.

All seven remain **NOT_TESTED** with high confidence because the weekly portfolio audit has not run. No leads, orders, revenue, conversion or impact were inferred. No current structured `/audit-ui` or `/audit-fin` assessment was available.

## Goal pyramid

Exactly three goals now own all 24 existing metric IDs:

1. **Efficiency and System Intelligence** — 11 metrics.
2. **Business Growth and Professional Value** — 8 metrics.
3. **Continuous Self-Development** — 5 metrics.

Assignment validation: **24/24 unique, 0 duplicated, 0 unassigned**.

## Metric lifecycle changes

| Metric | State | Reason | Continuity |
|---|---|---|---|
| Business Growth Outcomes | `needs_revision` | split into registered project-specific observed KPIs | same ID preserved |
| Provider/Live Readiness Ratio | `needs_revision` | active-project denominator is 10; ready numerator remains unknown | same ID preserved |
| Context/Retry Cost | `candidate` | stable non-sensitive counters do not exist | same ID preserved |
| Rule Lifecycle | `watch` | nine candidates have coverage but no promotion evidence | same ID preserved |

## Metric impact

| Metric | Project | Goal / sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|
| Evidence Completeness | AI Projects Brain | Self-Development / Validation | 408/408 | **456/456** | +48 assignment/lifecycle fields | 24 metrics × 19 fields | high |
| Provider/Live Readiness | Portfolio | Business Value / Live Reliability | unknown/unknown | **unknown/10** | denominator instrumented | portfolio registry | high |
| Eval Pass Rate | AI Projects Brain | Self-Development / Validation | 8/8 | **11/11** | +3 checks | validator | high |
| Publication Freshness | Brain Management | Business Value / Live Reliability | STALE 2/4 | **STALE 2/4** | unchanged critical SLO | Netlify deploy `6a5207…` | high |

## System Intelligence Gain

| Observed change | Count |
|---|---:|
| Rules improved | 1 |
| Validators added/tightened | 1 |
| Deterministic checks added | 3 |
| Replay cases added/improved | 0 |
| Behavior fixtures added/improved | 0 |
| Duplicate instructions removed | 0 |
| Evidence fields added | 48 |
| Automation contracts improved | 0 |
| Dashboard/registry/schema improvements | 3 |
| Project records instrumented | 10 |

## Critical guardrails

| Guardrail | State | Evidence |
|---|---|---|
| Zero critical false-success claims | **PASS** | 0 unsupported claims |
| Publication 4/4 same run | **STALE** | 2/4 |
| Scheduler uniqueness | **PASS** | one Morning + one Evening; 0 duplicates |
| Provider/live proof gate | **PASS** | no unsupported provider success |
| Audit score is not observed health | **PASS** | 0 projects marked observed from heuristic scores |
| Risky production/auth/payment/data work | **PASS** | no risky product/provider mutation performed |

## Publication ladder

| Stage | Status | Evidence |
|---|---|---|
| `canonical_updated` | **verified** | schema v6 canonical snapshot |
| `mirror_synced` | **verified** | identical brain-management JSON |
| `deploy_identified` | **stale** | Netlify deploy `6a5207d064f1feba62676b5e`, 2026-07-11, no source branch/commit |
| `live_verified` | **needs verification** | public timestamp and visible Portfolio/Project/Goal UI not proven |

## Ranked Morning handoff

1. **Brain Management → Business Growth and Professional Value → Professional delivery/live reliability.** Create a source-mapped Netlify deployment and verify public timestamp plus visible Portfolio Health, project selector and goal pyramid. Expected effect: Publication Freshness `STALE 2/4 → LIVE 4/4`.
2. **AI Projects Brain → Efficiency and System Intelligence → Execution quality.** Reconcile `projects.md` and `projects.json` against the overlay without guessing Psihotavr retirement. Expected effect: lower wrong-project routing and rework risk.
3. **EzoHata Finance → Business Growth and Professional Value → Live reliability.** Register exact provider surfaces and proof fields without changing provider config. Expected effect: provider-readiness numerator becomes measurable.
4. **Ezohata / Toronto Tantra → Business Growth and Professional Value → Commercial outcomes.** Register one observed KPI source, owner and cadence. Expected effect: Business Growth becomes observable.

## Validation evidence

- JSON parse: **3/3 PASS**.
- Registry/dashboard project identity: **10/10 PASS**.
- Project sector records: **60/60 PASS**.
- Goal count: **3/3 PASS**.
- Metric assignment: **24/24 unique; 0 duplicated; 0 unassigned**.
- Metric evidence/lifecycle contract: **PASS**.
- LIVE publication guard: **PASS**.
- Total bounded checks: **11/11 PASS**.
- Repository CI: not run by connector; local deterministic validation passed before write.

## Unknown, not applicable or blocked

- Public dashboard remains **STALE**.
- Business Growth outcomes remain uninstrumented.
- Provider readiness numerator remains `unknown`.
- `projects.md` and `projects.json` still need bounded reconciliation.
- Psihotavr live/retirement/source state remains `NEEDS_VERIFICATION`.
- No current structured `/audit-ui` or `/audit-fin` assessment was available.
- Infrastructure projects use `NOT_APPLICABLE` for commercial outcomes where appropriate.
