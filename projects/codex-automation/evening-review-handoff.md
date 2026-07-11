# Evening Architecture Review Handoff

Last updated: 2026-07-11 Evening Architecture Review; aggregate arithmetic corrected after verification.

## 2026-07-11 Evening verification

Status: `VERIFIED_WITH_CORRECTIONS`.

The Morning scheduler-liveness upgrade is structurally sound and remained operational after completion. PR #101 is merged, final PR run #53 passed, and the live scheduler still shows exactly one enabled Morning System Upgrade with no duplicate.

A second real outcome appeared later today: brain-management production was moved from the stale Cloudflare surface to a verified Netlify deploy. Issue #28 was closed with deploy, route, JSON, mobile, and console evidence; PR #29 documents Netlify as production and Cloudflare as legacy.

The main remaining structural risk is now dashboard publication drift: the canonical dashboard, mirror JSON, deploy identity, and live freshness can disagree while each individual layer looks healthy.

A final arithmetic verification corrected the displayed overall score from `68` to `67`: the nine displayed numeric metric scores total `606`, and `606 / 9 = 67.3`.

## Morning Health Delta Verification

| Metric | Morning claimed | Evening decision | Current Evening score | Reason |
| --- | ---: | --- | ---: | --- |
| Provider/live readiness | unknown → unknown | Accepted; evidence improved without numeric scoring | unknown; 1 verified production surface, 2 known blockers | Brain-management is proven live; portfolio denominator is undefined and Psihotavr/Finance remain blocked. |
| False success protection | 60 → 63 | Accepted | 66 | Post-run scheduler liveness held, and stale production was not misreported as current after Netlify proof appeared. |
| Delivery completion quality | 61 → 62 | Accepted | 67 | PR #101 reached final green CI; brain-management reached a verified production outcome. |
| User pain repetition | 55 → 55 | Corrected | 52 | The user again had to ask whether the work would be done directly or converted into a Codex prompt. |
| Loop closure | 70 → 74 | Accepted | 79 | Evening handoff → Morning implementation → CI → post-run scheduler proof completed; dashboard delivery also closed live. |
| Validation evidence | 74 → 75 | Accepted | 78 | Final PR run #53 passed; Netlify/provider and recorded browser evidence exist. |
| Regression/replay coverage | 68 → 72 | Accepted | 72 | Existing 7/6/6/14 coverage remains green; the new publication-drift class is not implemented yet. |
| Rule lifecycle health | 60 → 62 | Accepted; candidate retained | 64 | Scheduler rule gained later live observation, but not causal prevention proof. |
| Automation noise / duplication | 62 → 68 | Accepted | 72 | Exactly one enabled Morning schedule remains after success; no replacement was created. |
| Active project momentum | 50 → 50 | Accepted for Morning; raised on later evidence | 56 | Brain-management production moved live; two provider blockers remain open. |

Overall Evening score: `67/100 estimated`, coverage `9/10`, versus Morning `65/100 estimated`.

## Provider / live readiness

### Verified today

1. brain-management / Netlify
   - Production: `https://brain-management.netlify.app`
   - Site ID: `98712296-45be-4c0d-af99-d4ed19507e0e`
   - Deploy ID: `6a5207d064f1feba62676b5e`
   - Provider state: `ready`
   - Recorded proof: homepage, dashboard, both JSON routes, mobile 390x844, browser console.
   - Remaining gap: automatic GitHub-to-Netlify publication is `NEEDS_VERIFICATION`; the verified release used the authenticated upload path and Netlify reports no branch or commit reference for that deploy.

### Still blocked

1. [Psihotavr #168](https://github.com/andylitvinov-design/psihotavr/issues/168)
   - Missing: production source mapping; env-name presence for `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_AUTH_PROVIDER`; Supabase schema/storage/policy proof; live Google auth; admin persistence; public rendering.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/delivery /safe` or `/audit-ui`.

2. [Finance #614](https://github.com/andylitvinov-design/finance/issues/614)
   - Missing: strict live `verify:finance` proof and resolution/classification of Binance save/USDC `missing_provider_balance`.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/audit-fin`.

## Repeated patterns

1. Static intent or repository freshness is repeatedly confused with operational state: registry versus live scheduler, and canonical dashboard versus published site.
2. Delivery often reaches code/PR readiness before provider/live proof; the user must then ask for direct completion.
3. Strong evidence exists, but it is distributed across PRs, CI artifacts, provider deploys, issue comments, and live checks rather than one protected trace.
4. Aggregate health can look authoritative while its arithmetic is not machine-checked; displayed metric values and the overall score briefly diverged by one point.

## Selected root structural issue

`dashboard-canonical-live-freshness-drift`

Why it outranks other safe issues:
- it directly affects the health system's own observability;
- it can create false success even when all metric calculations are correct;
- today's canonical source still referenced the legacy Cloudflare URL while production had moved to Netlify;
- the brain-management mirror remained a Morning snapshot after the Evening canonical update;
- automatic publication from GitHub to Netlify remains unverified.

The safe harness fix is to define and validate a publication evidence ladder. Provider integration itself remains outside Morning Upgrade.

The aggregate arithmetic mismatch was corrected immediately and does not outrank publication drift, but the dashboard contract now explicitly requires a visible arithmetic calculation unless a weighting is documented.

## Metric model trend review

Sources reviewed:
- [Towards a Science of AI Agent Reliability](https://arxiv.org/abs/2602.16666) (2026): reliability should not be reduced to one success rate; consistency, robustness, predictability, safety, and bounded failure severity matter.
- [Reproducible, Explainable, and Effective Evaluations of Agentic AI for Software Engineering](https://arxiv.org/abs/2604.01437) (2026): reproducibility benefits from preserving inspectable interaction/evidence trajectories.

Decision:
- No new top-level health metric.
- Candidate subdimension under `Validation evidence`: publication trace completeness and reproducibility.
- Candidate subdimension under `Delivery completion quality`: rework/recovery count.
- Dashboard calculation contract tightened: displayed aggregate must be reproducible from displayed metric values or an explicit weighting.
- Lifecycle: `candidate` until the publication-drift fixture changes a real Morning/Evening decision.

## Rule lifecycle actions

```txt
candidate retained:
- recurring-automation-disabled-after-successful-run
  Evidence: deterministic regression/replay/fixture + final green CI + later live enabled-state observation.
  Missing for promotion: another real prevention/detection or explicit repair event.

candidate proposed:
- dashboard-canonical-live-freshness-drift
  Evidence: canonical/live provider URL drift, stale production incident, manual provider release, and unverified automatic publication.

active:
- validation-evidence-reproducibility-local-plus-ci remains active.

needs_revision:
- none newly assigned.

deprecated/rejected:
- none.
```

## Replay / regression / behavior coverage

Current verified coverage:
- prompt regressions: 7;
- failure replay cases: 6;
- behavior fixtures: 6;
- deterministic samples: 14;
- final PR CI run #53: success;
- all validator and artifact-upload steps: success.

Missing coverage:
- canonical dashboard updated while mirror/live remains stale;
- provider changed from Cloudflare to Netlify while the canonical link remains old;
- canonical and mirror timestamps differ and live publication cannot be proven;
- safe `NEEDS_VERIFICATION` output when direct HTTP/provider evidence is unavailable;
- aggregate score differs from the arithmetic mean of displayed numeric metrics without an explicit weighting.

## Learning metrics

Updated in this Evening review:
- Evening delta verification completed: +1;
- live automation state check completed: +1;
- provider/live release verified: +1;
- repeated user correction recorded: +1;
- dashboard publication drift candidate: +1.

The arithmetic correction was recorded in the canonical dashboard and handoff, but no new learning-count row was added because it is a bookkeeping correction, not a new behavior fixture or distinct operational prevention event.

Counts tied to validator artifacts should remain distinct from unique test/sample counts; rerunning the same fixture set does not create new fixtures.

## Agent-ready tickets

### A. Automatic Netlify publication

Route: `/delivery /safe`

```txt
Goal: connect and verify automatic GitHub main -> existing Netlify site publication for andylitvinov-design/brain-management without creating another site.
Existing site ID: 98712296-45be-4c0d-af99-d4ed19507e0e.
Prove repository, branch main, publish directory ., source commit, deploy ID, and live JSON freshness. Do not print secrets or alter unrelated provider projects. Final status remains NEEDS_VERIFICATION until an automatic main-triggered deploy is observed live.
Suggested skills: /delivery, /safe, provider-live readiness gate.
```

### B. Psihotavr provider proof

Use existing [issue #168](https://github.com/andylitvinov-design/psihotavr/issues/168).
Suggested skills: `/delivery`, `/safe`, `Playwright Verification`, provider-live readiness gate.

### C. Finance provider balance

Use existing [issue #614](https://github.com/andylitvinov-design/finance/issues/614).
Suggested skills: `/audit-fin`, provider-live readiness gate.

## Validation evidence status

- `node scripts/validate-agentic-prompts.mjs`: passed in final PR CI run #53.
- `node scripts/run-behavior-replay-fixtures.mjs`: passed in final PR CI run #53.
- `node scripts/verify-context-scout.mjs`: passed in final PR CI run #53.
- `node scripts/validate-projects-brain.mjs`: passed in final PR CI run #53.
- Raw artifact upload step: passed.
- Post-merge-main workflow retrieval: no run returned; remains separate `NEEDS_VERIFICATION` rather than inferred from PR CI.
- Netlify deploy lookup: `ready`; deployment source is API upload, with no branch or commit ref on the provider record.
- Direct HTTP recheck from this Evening runtime: not run successfully because the runtime could not resolve the production hostname. This is an evidence-access limitation, not a claimed production failure.
- Dashboard arithmetic recheck: passed after correction; nine numeric scores total `606`, average `67.3`, displayed overall `67`.

## Morning System Upgrade handoff

Top blocker: dashboard publication truth is not protected across canonical source, mirror repository, provider deploy, and live freshness.

Exact safe change:
1. Add prompt regression `dashboard-canonical-live-freshness-drift`.
2. Add matching failure replay case.
3. Add behavior fixture samples:
   - canonical updated + live stale, reported SUCCESS — fail;
   - canonical + mirror + deploy ID + live timestamp/content all proven — pass;
   - provider/live access unavailable + `NEEDS_VERIFICATION`, no provider mutation — pass.
4. Add a publication evidence ladder to the dashboard/registry contract:
   - canonical source updated;
   - mirror data synced;
   - deploy source and ID known;
   - live timestamp/content verified.
5. Extend `validate-agentic-prompts.mjs` to protect the mapping and reject canonical-only live claims.
6. Add a deterministic aggregate-score check: reject a displayed overall score that does not match the arithmetic mean of displayed numeric metrics unless an explicit weighting is present.
7. Do not deploy, change Netlify configuration, or mutate provider state from Morning Upgrade.

Expected metric improvement:
- False success protection: +2 to +4.
- Validation evidence: +2.
- Loop closure: +2.
- Regression/replay coverage: +2 to +3.

Validation:
- unified four-validator evidence runner;
- raw CI artifact;
- no provider mutation.

Evening verification question:
Does the new contract reject canonical-only updates and aggregate-score drift, and accept only a fully traceable published snapshot or an explicit `NEEDS_VERIFICATION` outcome?

## Single next action

Tomorrow morning, implement and raw-CI validate the candidate `dashboard-canonical-live-freshness-drift` evidence ladder plus deterministic aggregate-score check; route automatic Netlify integration separately to `/delivery /safe`.
