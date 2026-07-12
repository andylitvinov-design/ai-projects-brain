# Morning Handoff Queue

Last updated: 2026-07-12 Morning System Upgrade.

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

No unconsumed safe harness implementation is preselected.

Evening Architecture Review should verify the 2026-07-12 deltas and select one new structural issue. Do not reopen `dashboard-canonical-live-freshness-drift` unless the follow-up CI, a future publication attempt, or a real live trace exposes a defect.

Candidate selection rules for Evening:
1. Prefer a repeated false-success, delivery-loop, validation, replay, rule-lifecycle, or automation-liveness issue with evidence.
2. Do not select provider configuration, product code, deploy, auth/payment, production data, env, billing, or secret mutation for Morning Upgrade.
3. Keep provider/live work routed to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin`.
4. Require an exact safe change, expected metric improvement, validation path, and Evening verification question.

## Routed outside Morning Upgrade

### 1. brain-management automatic GitHub→Netlify publication

- Existing site ID: `98712296-45be-4c0d-af99-d4ed19507e0e`.
- Missing proof: an automatic `main`-triggered deployment with repository, branch, publish directory `.`, source commit, deploy ID, and current live JSON timestamp/content.
- Current verified deploy `6a5207d064f1feba62676b5e` is an API upload and does not prove automatic Git publication.
- Route: `/delivery /safe`.
- Do not create another Netlify site.
- Status remains `NEEDS_VERIFICATION` until current live proof exists.

### 2. Psihotavr provider/live auth and persistence proof

- Issue: [andylitvinov-design/psihotavr#168](https://github.com/andylitvinov-design/psihotavr/issues/168).
- Missing: production source mapping; env-name presence for `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_AUTH_PROVIDER`; Supabase schema/storage/policy proof; live Google auth; admin persistence; public rendering.
- Route: `/delivery /safe` or `/audit-ui`.
- Status: `BLOCKED / NEEDS_VERIFICATION`.

### 3. Finance provider-balance blocker

- Issue: [andylitvinov-design/finance#614](https://github.com/andylitvinov-design/finance/issues/614).
- Missing: strict live `verify:finance` proof and resolution/classification of Binance save/USDC `missing_provider_balance`.
- Route: `/audit-fin`.
- Status: `BLOCKED / NEEDS_VERIFICATION`.

## Closed / consumed items

### 2026-07-12 — protect dashboard publication truth

ID: `dashboard-canonical-live-freshness-drift`

Outcome: `APPLIED_UPGRADE` through merged [PR #103](https://github.com/andylitvinov-design/ai-projects-brain/pull/103), merge `779c7f74f1889e163c43ea1f5c8ac129b586166e`.

Applied evidence:
- one mapped prompt regression, failure replay case, and behavior fixture;
- 12 publication/aggregate samples, bringing the suite to 8 prompt regressions, 7 replay cases, 7 fixtures, and 26 samples;
- deterministic aggregate-score validator;
- deterministic four-stage publication validator for `canonical_updated`, `mirror_synced`, `deploy_identified`, and `live_verified`;
- automatic deploy claims require source commit evidence;
- stale live timestamps remain `STALE` and unavailable live proof remains `NEEDS_VERIFICATION`;
- GitHub Actions run #70 succeeded;
- raw artifact `8253415825` contains six passing logs;
- provider/deploy state was not mutated.

Health delta proposed for Evening verification:
- false success protection: `66 -> 70` (`+4`, high confidence);
- delivery completion quality: `67 -> 68` (`+1`, high confidence);
- loop closure: `79 -> 81` (`+2`, high confidence);
- validation evidence: `78 -> 81` (`+3`, high confidence);
- regression/replay coverage: `72 -> 75` (`+3`, high confidence);
- rule lifecycle health: `64 -> 66` (`+2`, medium confidence);
- overall scored-metrics average: `67 -> 69`, coverage `9/10`.

Lifecycle: retain as `candidate`. Promotion requires a second independent operational prevention/detection/repair case and a current live trace.

Evening verification:
- Does the follow-up preserve the 8/7/7/26 mapped coverage?
- Does arithmetic remain `621 / 9 = 69`?
- Does publication remain `STALE` until current mirror/live proof exists?
- Does the recurring Morning schedule remain enabled and unique after completion?

### 2026-07-11 — protect required recurring automation liveness

Outcome: `APPLIED_UPGRADE` through PR #101.

Evidence:
- mapped scheduler-liveness prompt regression, replay case, and behavior fixture;
- four-level scheduler liveness evidence ladder;
- final PR workflow run #53 passed;
- live post-run check found exactly one enabled Morning System Upgrade and no duplicate;
- rule remains candidate pending another independent prevention/detection/repair event.

### 2026-07-10 — unify local and CI raw validator evidence

Outcome: `APPLIED_UPGRADE` through PR #98.

Evidence:
- one evidence runner executes all validators;
- CI uploads raw logs;
- passing runs #40, #42, #47, #53, and #70 preserve the contract.

### Earlier closed items

- 2026-07-09: CI raw-evidence artifact capture defined, then unified into one runner.
- 2026-07-09: stale PR #97 reconciled on fresh main.
- 2026-07-08: CI validator workflow created.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation and evidence-state separation added.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live gate, lifecycle standard, strategic Daily Improve contract, and Morning applied/no-safe-upgrade contract created.
