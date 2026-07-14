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
- **Validated delivery:** PR `#115`, squash merge `17338be9531b0fd82553fb00b9892ad0a8335052`, Agent Harness Validators run `#161` PASS.

## Main upgrade applied

**`canonical_portfolio_overlay_and_adaptive_dashboard`** — added a current active-project routing overlay, a 10-project × 6-sector Project Health matrix, exactly three system goals, metric lifecycle states and a deterministic validator.

**Follow-up closure: `canonical_snapshot_consistency_gate`** — the active CI path now uses schema v6, validates Markdown ↔ JSON model/timestamp/result/public-state equality, accepts the current schema-v2 publication trace without weakening LIVE gates, and no longer executes the obsolete schema-v5 dashboard validator.

### Why this mattered

The portfolio dashboard had already advanced to schema v6, but the publication workflow and unified harness runner still referenced schema v5 / `observable_outcomes_v2`. That caused real CI failure even though the adaptive snapshot itself was valid. It also allowed the human Markdown dashboard to drift from the JSON snapshot without deterministic rejection. PR #115 closed both structural gaps while preserving the truthful `STALE` public status.

## Changed files

| File | Applied change |
|---|---|
| `projects/portfolio-registry.json` | Added the canonical active-project overlay. |
| `projects/codex-automation/system-health-dashboard.json` | Added the schema-v6 adaptive snapshot with Portfolio, Project and Goal layers. |
| `projects/codex-automation/system-health-dashboard.md` | Refreshed this canonical human dashboard and final validation evidence. |
| `scripts/validate-portfolio-dashboard.mjs` | Added schema-v6 project/sector/agent/metric/publication checks and four Markdown↔JSON consistency gates. |
| `tests/portfolio-dashboard-validator.test.mjs` | Added four deterministic snapshot consistency tests. |
| `scripts/validate-dashboard-publication-contract.mjs` | Added schema-v2 trace compatibility while preserving source/timestamp/LIVE requirements. |
| `scripts/run-agent-harness-validation-evidence.mjs` | Replaced the obsolete schema-v5 validator with adaptive validation and tests. |
| `.github/workflows/publish-system-health-dashboard.yml` | Updated publication validation and dispatch metadata to schema v6 / adaptive model. |
| `projects/codex-automation/system-health-dashboard-publication-trace.json` | Preserved the four-stage STALE publication evidence. |
| `brain-management/system-health-dashboard/data/current-system-health-dashboard.json` | Synced the identical canonical JSON blob. |

## Portfolio Health

| Field | Prior | Current | Delta |
|---|---|---|---|
| State | not represented | **NEEDS_ATTENTION** | adaptive portfolio state added; critical SLO still overrides |
| Active projects | unknown | **10** | instrumented |
| Observed projects | unknown | **4** | instrumented without using heuristic audit scores |
| Blocked projects | unknown | **5** | instrumented |
| Strongest positive change | flat harness metrics | **AI Projects Brain: adaptive contract and green CI path** | structural reliability improved |
| Largest risk | hidden registry drift | **Brain Management publication remains STALE** | risk is explicit and bounded |

No average across unlike projects was created.

## Project Health matrix

| Project | Execution | Product Value | Business Growth | Standards | Reliability | Learning | State |
|---|---|---|---|---|---|---|---|
| Ezohata | WATCH | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH | BLOCKED |
| EzoHata Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH | BLOCKED |
| Legacy Finance | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| Psitherapy | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH | BLOCKED |
| Reiki Yggdrasil | WATCH | UNKNOWN | UNKNOWN | NOT_TESTED | WATCH | UNKNOWN | WATCH |
| Codex Links | WATCH | WATCH | NOT_APPLICABLE | WATCH | WATCH | WATCH | WATCH |
| Brain Management | WATCH | WATCH | NOT_APPLICABLE | WATCH | **BLOCKED** | PASS | BLOCKED |
| Toronto Tantra | WATCH | WATCH | UNKNOWN | NOT_TESTED | WATCH | WATCH | WATCH |
| AI Projects Brain | **PASS** | WATCH | NOT_APPLICABLE | **PASS** | WATCH | **PASS** | IMPROVING |
| Psihotavr | UNKNOWN | WATCH | UNKNOWN | NOT_TESTED | **BLOCKED** | WATCH | NEEDS_VERIFICATION |

### Most affected projects

1. **AI Projects Brain:** Standards and Learning gained a green adaptive validation/CI path.
2. **Brain Management:** Reliability remains blocked by stale public deployment; no false LIVE claim was introduced.
3. **Ezohata / EzoHata Finance / Psitherapy / Psihotavr:** provider or source proof remains the controlling guardrail.

## Agent evidence

Seven `/audit-sales` baselines were ingested for Ezohata, Psihotavr, Psitherapy, Reiki Yggdrasil, Toronto Tantra, EzoHata Finance and Legacy Finance.

All seven remain **NOT_TESTED** with high confidence because the weekly portfolio audit has not run. No leads, orders, revenue, conversion or impact were inferred. No current structured `/audit-ui` or `/audit-fin` assessment was available.

The adaptive `/upgrade` validator evidence is stored as validation evidence, not as a business or product audit score.

## Goal pyramid

Exactly three goals own all 24 existing global metric IDs:

1. **Efficiency and System Intelligence** — execution quality/completion, speed/delivery flow, autonomy/resource use.
2. **Business Growth and Professional Value** — product/user value, commercial outcomes, professional delivery/live reliability.
3. **Continuous Self-Development** — validation/accumulated knowledge, rule/automation lifecycle.

Assignment validation: **24/24 unique, 0 duplicated, 0 unassigned**.

## Metric lifecycle changes

| Metric | Lifecycle | Reason | Continuity | Review date |
|---|---|---|---|---|
| Business Growth Outcomes | `needs_revision` | One portfolio state is too broad until project KPI sources exist. | Preserve the existing ID; add project-specific observed KPI records. | 2026-07-21 |
| Provider/Live Readiness Ratio | `needs_revision` | Active-project denominator is known; provider-surface numerator is not. | Preserve the existing ID; add per-project surface evidence. | 2026-07-21 |
| Context/Retry Cost | `candidate` | No stable non-sensitive counter source exists. | No replacement until observed counters exist. | 2026-07-21 |
| Rule Lifecycle | `watch` | Nine failure classes have structural coverage but no promotion evidence. | Preserve existing rule identities and history. | 2026-07-21 |

## Metric impact

| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| Evidence Completeness | AI Projects Brain | Continuous Self-Development | Validation | JSON structure complete, cross-artifact drift possible | JSON structure complete plus 4 Markdown↔JSON gates | drift class closed | PR #115 validator and tests | high |
| Eval Pass Rate | AI Projects Brain | Continuous Self-Development | Validation | 11/11 snapshot checks; active CI failed on obsolete schema | 11/11 snapshot checks plus 4/4 new regression tests; unified run green | active path repaired | run #161 | high |
| Publication Freshness | Brain Management | Business Growth and Professional Value | Professional delivery/live reliability | STALE 2/4 | **STALE 2/4** | unchanged; no false improvement | deploy `6a5207…` remains old/unmapped | high |
| Scheduler Health | AI Projects Brain | Continuous Self-Development | Rule/automation lifecycle | 2/2 | **2/2** | unique and enabled | live automation registry | high |
| Provider/Live Readiness | Portfolio | Business Growth and Professional Value | Professional delivery/live reliability | unknown/unknown | **unknown/10** | denominator instrumented | portfolio registry | high |

## System Intelligence Gain

Observed counts only:

| Change class | Count |
|---|---:|
| Rules/contracts improved | 1 |
| Validators added or tightened | 3 |
| Deterministic snapshot tests added | 4 |
| Existing publication tests passing | 6 |
| Replay cases added or improved | 0 |
| Behavior fixtures added or improved | 0 |
| Obsolete active validation paths removed | 1 |
| Publication workflow contracts updated | 1 |
| Dashboard/registry/schema improvements | 3 |
| Project records instrumented | 10 |

## Critical guardrails

| Guardrail | State | Evidence |
|---|---|---|
| Zero critical false-success claims | **PASS** | 0 unsupported claims |
| Publication 4/4 in the same run | **STALE** | 2/4 stages |
| Exactly one Morning and one Evening Upgrade | **PASS** | 2/2 enabled; 0 duplicates |
| Provider/live-dependent outcomes require current proof | **PASS** | no unsupported provider success |
| Risky production/auth/payment/data work uses a safe route | **PASS** | no risky provider or product mutation |
| Audit score cannot create observed Project Health | **PASS** | 0 projects observed from heuristic scores |
| Canonical Markdown/JSON alignment | **PASS** | model, timestamp, result and publication state checked |

## Publication ladder

| Stage | Status | Evidence |
|---|---|---|
| `canonical_updated` | **verified** | schema-v6 canonical snapshot at `2026-07-14T20:00:00+02:00` |
| `mirror_synced` | **verified** | canonical and mirror blob SHA `e1b0dca417a2cf6cb83c840b56b921e2d6601298` |
| `deploy_identified` | **stale** | Netlify deploy `6a5207d064f1feba62676b5e`, 2026-07-11, no source branch/commit |
| `live_verified` | **needs verification** | public timestamp and visible Portfolio/Project/Goal UI not proven current |

## Ranked Morning handoff

1. **Brain Management → Business Growth and Professional Value → Professional delivery/live reliability.** Use `/safe` to create a source-mapped deployment to the existing Netlify site and verify public timestamp plus visible Portfolio Health, project selection and goal pyramid. Expected metric effect: Publication Freshness `STALE 2/4 → LIVE 4/4` only after proof.
2. **Portfolio → Business Growth and Professional Value → Professional delivery/live reliability.** Instrument provider surfaces and evidence fields per active project without changing provider configuration. Expected metric effect: Provider/Live Readiness `unknown/10 → measurable numerator/denominator`.
3. **Applicable commercial projects → Business Growth and Professional Value → Commercial outcomes.** Register one observed KPI source, owner and cadence per project. Expected metric effect: Business Growth Outcomes `not_instrumented → project-specific observed states`.
4. **Portfolio registry → Efficiency and System Intelligence → Execution quality.** Reconcile remaining legacy `projects.md` / `projects.json` mappings without guessing Psihotavr retirement. Expected metric effect: lower routing/rework risk.

## Validation evidence

- Canonical and mirror JSON parse: **PASS**.
- Canonical/mirror blob identity: **PASS** (`e1b0dca417a2cf6cb83c840b56b921e2d6601298`).
- Registry/dashboard project identity: **10/10 PASS**.
- Project sector records: **60/60 PASS**.
- Goal count: **3/3 PASS**.
- Metric assignment: **24/24 unique; 0 duplicated; 0 unassigned**.
- Metric evidence/lifecycle contract: **PASS**.
- Markdown↔JSON consistency tests: **4/4 PASS**.
- Publication contract tests: **6/6 PASS**.
- Publication schema-v2 trace validation: **PASS**.
- Behavior replay fixtures: **9 fixtures / 30 samples PASS**.
- Prompt/harness/project/context/dedup validators: **PASS**.
- Agent Harness Validators run **#161: PASS**.
- PR **#115: merged** as `17338be9531b0fd82553fb00b9892ad0a8335052`.

## Unknown, not applicable or blocked

- Public dashboard remains **STALE**.
- Product Delivery Rate remains `unknown`; complete selected/live pairs are missing.
- Business Growth Outcomes remain `not_instrumented`.
- Provider readiness numerator remains `unknown`.
- Context/Retry Cost remains `unknown`.
- Current structured `/audit-ui` and `/audit-fin` evidence is `NOT_TESTED`.
- Psihotavr source/retirement state remains `NEEDS_VERIFICATION`.
- Infrastructure projects use `NOT_APPLICABLE` for commercial outcomes where appropriate.
