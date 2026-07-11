# Morning Handoff Queue

Last updated: 2026-07-11 Evening Architecture Review; aggregate arithmetic correction added.

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### Priority 1 — protect dashboard publication truth

ID: `dashboard-canonical-live-freshness-drift`

Problem:
The canonical health dashboard, brain-management mirror JSON, provider deploy identity, and live freshness can diverge. Today the canonical source still referenced the legacy Cloudflare surface after production moved to Netlify, and the verified Netlify release used an authenticated upload path while automatic GitHub-to-Netlify publication remains unverified.

A second integrity gap was found during Evening verification: the displayed numeric metrics averaged `67.3`, but the aggregate was reported as `68`. The canonical dashboard has been corrected to `67`, and Morning should make this class deterministic rather than relying on manual arithmetic.

Exact safe Morning change:
1. Add prompt regression `dashboard-canonical-live-freshness-drift`.
2. Add a matching failure replay case.
3. Add a deterministic behavior fixture with at least these samples:
   - canonical updated, mirror/live stale, output claims SUCCESS — expected fail;
   - canonical + mirror + deploy source/ID + live timestamp/content proven — expected pass;
   - live/provider access unavailable, output uses `NEEDS_VERIFICATION` and does not mutate provider state — expected pass.
4. Add a candidate publication evidence ladder to the dashboard/automation contract:
   - canonical source updated;
   - mirror data synced;
   - deploy source and deploy ID known;
   - live timestamp/content verified.
5. Extend `scripts/validate-agentic-prompts.mjs` to protect the prompt/replay/fixture mapping, require the ladder, and reject canonical-only claims that the dashboard is live-updated.
6. Add a deterministic aggregate-score validator: calculate the arithmetic mean of displayed numeric metric values, respect `unknown` metrics and coverage, and fail when the displayed aggregate differs unless an explicit weighting is documented.
7. Update learning metrics and delivery ledger only from actual artifacts.
8. Do not deploy, change Netlify configuration, or mutate provider state.

Expected health effect:
- false success protection: +2 to +4;
- validation evidence: +2;
- loop closure: +2;
- regression/replay coverage: +2 to +3.

Required validation:
- `node scripts/run-agent-harness-validation-evidence.mjs`;
- raw CI artifact with all four logs;
- candidate remains unpromoted until a real publication drift/prevention decision is observed;
- aggregate-score sample proves `606 / 9 = 67.3` is displayed as `67`, not `68`, under the current rounding rule.

Evening verification:
- Does the fixture reject a canonical-only update?
- Does it accept a complete canonical→mirror→deploy→live trace?
- Does it require `NEEDS_VERIFICATION` when live proof is unavailable?
- Does the aggregate validator reject arithmetic drift without explicit weighting?
- Was provider state left untouched?

## Routed outside Morning Upgrade

1. brain-management automatic GitHub→Netlify publication
   - Existing site ID: `98712296-45be-4c0d-af99-d4ed19507e0e`.
   - Missing proof: an automatic `main`-triggered deployment with source commit, deploy ID, and live JSON freshness.
   - Provider evidence: the current verified deploy is an API upload and has no branch or commit reference.
   - Route: `/delivery /safe`.
   - Do not create another Netlify site.

2. Psihotavr provider/live auth and persistence proof
   - Issue: `andylitvinov-design/psihotavr#168`.
   - Route: `/delivery /safe` or `/audit-ui`.

3. Finance provider-balance blocker
   - Issue: `andylitvinov-design/finance#614`.
   - Route: `/audit-fin`.

## Closed / consumed items

### 2026-07-11 — protect required recurring automation liveness

Outcome: `APPLIED_UPGRADE` through PR #101.

Evidence:
- mapped scheduler-liveness prompt regression, replay case, and behavior fixture;
- four-level scheduler liveness evidence ladder;
- final PR workflow run #53 passed;
- live post-run check found exactly one enabled Morning System Upgrade and no duplicate;
- rule remains candidate pending another real prevention/detection or repair event.

### 2026-07-10 — unify local and CI raw validator evidence

Outcome: `APPLIED_UPGRADE` through PR #98.

Evidence:
- one evidence runner executes all four validators;
- CI uploads four raw logs;
- raw passing runs #40 and #42 were retrieved;
- later runs #47 and #53 preserved the contract.

### Earlier closed items

- 2026-07-09: CI raw-evidence artifact capture defined, then unified into one runner.
- 2026-07-09: stale PR #97 reconciled on fresh main.
- 2026-07-08: CI validator workflow created.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation and evidence-state separation added.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live gate, lifecycle standard, strategic Daily Improve contract, and Morning applied/no-safe-upgrade contract created.

## Dashboard publication next action

Prove existing Netlify site Git integration for `andylitvinov-design/brain-management` branch `main`, publish directory `.`, deploy ID and source commit; then independently observe the current canonical timestamp at production JSON. Until then retain `STALE` or `NEEDS_VERIFICATION`.
