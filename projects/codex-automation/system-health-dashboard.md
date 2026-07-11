# Agent/Codex System Health Dashboard

Status: active canonical dashboard; publication status is `STALE`, not live-success.
Last updated: 2026-07-12 publication-contract upgrade.

Production dashboard: [Netlify system-health dashboard](https://brain-management.netlify.app/system-health-dashboard/)

Canonical source: `projects/codex-automation/system-health-dashboard.json`. Mirror: `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`.

## Current dashboard

| Metric | Today | Yesterday | Change | Confidence | Evidence | Root cause | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| Provider/live readiness | unknown; 1 production surface verified, 2 known blockers remain | unknown | evidence improved | medium | Netlify deploy 6a5207d064f1feba62676b5e is ready and brain-management issue #28 was closed with recorded route/browser proof. Psihotavr #168 and Finance #614 remain open. | The portfolio has no stable denominator for provider-ready projects, and two provider-backed outcomes remain unproven. | Recognized the verified brain-management production release without converting the whole portfolio metric into an invented number. | Define a provider-readiness denominator before numeric scoring; verify automatic GitHub-to-Netlify publication and keep Psihotavr/Finance blocked until live proof. |
| False success protection | 66/100 estimated | 63/100 estimated | +3 | high | Post-run Automations state still shows one enabled Morning loop and no duplicate. The stale Cloudflare/silent-skip production class was exposed and replaced by a verified Netlify release. | Static registry state and repository freshness can both look healthy while scheduler or production state is stale. | Accepted the scheduler guardrail evidence and separated canonical dashboard freshness from production publication proof. | Add a candidate publication evidence ladder that blocks live-update claims unless canonical, mirror, deploy, and live freshness all agree. |
| Delivery completion quality | 67/100 estimated | 62/100 estimated | +5 | high | PR #101 merged with final green run #53. Brain-management reached a ready Netlify deploy with deploy ID, issue closure, four route checks, mobile QA, and documentation. | Earlier work stopped at code/config readiness or a provider upload blocker instead of a verified user-visible outcome. | Preserved the full failure-to-recovery chain and counted the later verified production delivery as real completion. | Keep manual upload success separate from automatic deployment readiness and create an exact /delivery /safe ticket for GitHub-to-Netlify integration. |
| User pain repetition | 52/100 estimated | 55/100 estimated | -3 | medium | The production result was eventually delivered, but the user again had to ask whether the work would be done directly or handed to Codex. | The first response foregrounded the blocker and prompt instead of exhausting the available direct safe delivery path. | Recorded the correction rather than treating eventual delivery as proof that the interaction had no repeated pain. | Make direct safe execution the default and use a Codex prompt only for the exact remaining blocker. |
| Loop closure | 79/100 estimated | 74/100 estimated | +5 | high | The scheduler-liveness handoff was consumed, implemented, merged, CI-validated, and verified after completion with the existing schedule still enabled. The dashboard deployment blocker also reached a proven live outcome. | Previous closure evidence stopped before continued scheduler liveness or production publication. | Verified post-run schedule state and incorporated the completed Netlify delivery into the health model. | Close the remaining publication loop by making canonical update, mirror sync, deploy, and live freshness explicit non-interchangeable states. |
| Validation evidence | 78/100 estimated | 75/100 estimated | +3 | high | Final PR run #53 completed successfully. Netlify reports the production deploy ready, and issue #28 records four route checks, JSON MIME/parsing, mobile QA, and no console errors. | Validation was strong for the harness and one production release, but the evening canonical snapshot was not automatically republished. | Verified final PR CI, provider deploy state, and recorded browser/live evidence while marking the unavailable direct HTTP recheck honestly. | Add publication trace fields to the dashboard contract and keep direct live recheck as NEEDS_VERIFICATION when the runtime cannot reach the host. |
| Regression/replay coverage | 72/100 estimated | 72/100 estimated | 0 | high | Scheduler-liveness coverage remains green: seven prompt regressions, six replay cases, six behavior fixtures, and fourteen deterministic samples. | The newly observed dashboard publication drift class is not yet represented in prompt/replay/behavior coverage. | Rechecked the existing mapped coverage and did not inflate the score for an unimplemented candidate. | Add one candidate failure class for canonical dashboard updated while production remains stale or points at the wrong provider. |
| Rule lifecycle health | 64/100 estimated | 62/100 estimated | +2 | medium | The scheduler-liveness candidate gained a later post-run live-state observation, but there is no causal proof yet that the rule prevented disablement. | One real drift plus deterministic coverage supports continued candidacy, not automatic global promotion. | Kept the scheduler rule candidate and introduced dashboard publication freshness only as a candidate subdimension/failure class. | Promote scheduler liveness only after another prevention/detection or explicit repair event; validate publication drift before promotion. |
| Automation noise / duplication | 72/100 estimated | 68/100 estimated | +4 | high | Live scheduler check found exactly one enabled Morning System Upgrade, no replacement schedule, and the recurring loop remains active after success. | The earlier registry/live mismatch made duplication-safe repair and post-run verification necessary. | Verified enabled and unique state after the successful Morning run without creating a new automation. | Recheck tomorrow and update registry latest-outcome text only from live scheduler evidence. |
| Active project momentum | 56/100 estimated | 50/100 estimated | +6 | medium | Brain-management production delivery completed and issue #28 closed. Psihotavr #168 and Finance #614 remain blocked without new provider proof. | One project moved to a verified production outcome while two long-lived provider blockers remain untouched. | Counted only the completed brain-management production release as momentum, not tickets or harness work. | Route one provider blocker to execution: Psihotavr via /delivery /safe or Finance via /audit-fin; do not count routing alone as progress. |

## Deterministic aggregate contract

```txt
canonical_snapshot_timestamp: 2026-07-12T00:00:00+02:00
aggregate_method: arithmetic_mean_of_numeric_metrics
unknown_metric_policy: exclude_from_numeric_mean_and_report_in_coverage
score_sum: 606
numeric_metric_count: 9
metric_count_total: 10
coverage: 9/10
raw_score: 67.33333333333333
rounded_score: 67
reported_score: 67
yesterday_score: 65
delta: +2
```

Unknown, blocked, partial, needs-verification, and null values are excluded from the numeric mean and remain in coverage. Weighting is invalid unless stored in JSON and deterministically tested.

## Publication evidence ladder

Repository truth, deployment truth, and live truth are independent. Current publication status: `STALE`; `success_allowed: false`.

| Step | Status | Evidence | Timestamp |
| --- | --- | --- | --- |
| canonical_updated | verified | canonical_repository_snapshot — Canonical GitHub snapshot | 2026-07-12T00:00:00+02:00 |
| mirror_synced | stale | mirror_repository_snapshot — Mirror timestamp and provider/link fields predate canonical contract. | 2026-07-11T09:35:00+02:00 |
| deploy_identified | verified | provider_deploy_metadata — Automatic Git deployment is unproven: no source commit or branch. | 2026-07-11T09:35:00+02:00 |
| live_verified | stale | recorded_browser_and_http_evidence — Current canonical timestamp has not been observed on production. | 2026-07-11T09:35:00+02:00 |

## Provider blockers

- Psihotavr [#168](https://github.com/andylitvinov-design/psihotavr/issues/168): `BLOCKED / NEEDS_VERIFICATION` pending Supabase auth, Google OAuth, persistence, Storage/RLS, and public rendering proof.
- Finance [#614](https://github.com/andylitvinov-design/finance/issues/614): `BLOCKED / NEEDS_VERIFICATION` pending strict `verify:finance` and Binance save/USDC `missing_provider_balance` resolution.

Historical note: reported `68` was an arithmetic error corrected to `67`; it is not an active snapshot value.
