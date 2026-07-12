# Agent/Codex System Health Dashboard

Status: active canonical dashboard; publication status is `STALE`, not live-success.
Last updated: 2026-07-12 Morning System Upgrade evidence propagation.

Canonical dashboard: [GitHub source](https://github.com/andylitvinov-design/ai-projects-brain/blob/main/projects/codex-automation/system-health-dashboard.md)

Production dashboard: [Netlify system-health dashboard](https://brain-management.netlify.app/system-health-dashboard/)

Canonical source: `projects/codex-automation/system-health-dashboard.json`. Mirror: `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`.

## Current dashboard

| Metric | Today | Yesterday | Change | Confidence | Evidence | Root cause | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| Provider/live readiness | unknown; 1 production surface verified, 2 known blockers remain | unknown; 1 production surface verified, 2 known blockers remain | 0; portfolio score remains unknown | high | PR #103 and its CI are harness evidence only. Brain-management remains the single verified production surface; Psihotavr #168 and Finance #614 still lack provider/live proof. | The portfolio denominator is not yet defined, and two provider-backed outcomes remain unproven. | Kept provider/live readiness unscored and routed provider work outside Morning Upgrade instead of inflating readiness from harness CI. | Evening should choose whether to define a stable provider-readiness denominator; delivery agents should prove Netlify Git publication, Psihotavr #168, or Finance #614. |
| False success protection | 70/100 estimated | 66/100 estimated | +4 | high | PR #103 merged at 779c7f7. CI run #70 and raw artifact 8253415825 passed the publication contract: canonical-only, stale-live, provider-unavailable, missing-source-commit, aggregate-mismatch, and unknown-as-zero cases are rejected. | Repository freshness, mirror freshness, deploy identity, and live freshness were previously easy to collapse into one success claim. | Closed the evidence loop for the four-stage publication ladder and deterministic aggregate guard; current publication remains STALE rather than being mislabeled live. | Verify the guard against the next real dashboard publication attempt; keep SUCCESS blocked until all four stages are verified. |
| Delivery completion quality | 68/100 estimated | 67/100 estimated | +1 | high | The selected Evening handoff reached merged PR #103, green CI run #70, downloadable raw logs, and a Morning dashboard/registry follow-up rather than stopping at a code-only claim. | Harness deliveries can still stop after merge without propagating raw evidence into the dashboard, registry, metrics, and next handoff. | Propagated the merged-and-validated result into the canonical dashboard, learning evidence, scheduler registry, and consumed queue. | Require the same merge -> raw artifact -> dashboard -> handoff closure for the next harness upgrade. |
| User pain repetition | 52/100 estimated | 52/100 estimated | 0 | medium | No new user correction was observed in this Morning harness run; the previous direct-execution-versus-prompt correction remains unresolved at the portfolio level. | Agents still sometimes foreground blockers or prompts before exhausting available safe direct execution. | Applied the safe repository and registry follow-up directly; no new Codex prompt was substituted for this harness work. | Evening should watch for another 'do it yourself' correction before changing the score. |
| Loop closure | 81/100 estimated | 79/100 estimated | +2 | high | The 2026-07-11 Evening top blocker was consumed, implemented in PR #103, raw-CI validated, recorded in the dashboard, and removed from the active Morning queue. | The loop previously lacked deterministic publication truth and did not always propagate post-merge evidence into all canonical records. | Completed diagnosis -> implementation -> CI artifact -> dashboard/metrics/registry -> Evening verification handoff. | Evening should verify the claimed deltas and select one new structural issue rather than reopening the consumed publication-guard implementation. |
| Validation evidence | 81/100 estimated | 78/100 estimated | +3 | high | GitHub Actions run #70 succeeded. Artifact 8253415825 contains six passing raw logs: prompt validation, 7 fixtures/26 samples, context scout, 20-project validation, aggregate 606/9=67 validation, and publication status STALE/PASS. | The PR initially recorded raw CI as pending, and evidence had not yet been propagated into learning metrics and the dashboard. | Fetched and inspected the raw artifact and recorded exact run, artifact, counts, and pass states. | Evening should confirm the follow-up dashboard PR CI and keep post-merge-main evidence separate if no main-push run is available. |
| Regression/replay coverage | 75/100 estimated | 72/100 estimated | +3 | high | Coverage is now 8 prompt regressions, 7 replay cases, 7 behavior fixtures, and 26 deterministic samples. The new publication fixture has 12 samples and passed in run #70. | Publication drift and aggregate arithmetic had no executable coverage before PR #103. | Verified one-to-one prompt/replay/fixture mapping and passing expected-pass/expected-fail behavior. | Do not add more samples unless a distinct failure class appears; use the candidate in a real publication decision. |
| Rule lifecycle health | 66/100 estimated | 64/100 estimated | +2 | medium | dashboard-canonical-live-freshness-drift now has mapped regression, replay, fixture, two deterministic validators, and raw CI, but only one operational drift incident. | Structural evidence is strong, but promotion would overstate real-world prevention evidence. | Retained the publication rule as candidate and documented the promotion threshold; no duplicate top-level skill was created. | Promote only after a second independent operational prevention/detection/repair case plus a current live trace. |
| Automation noise / duplication | 72/100 estimated | 72/100 estimated | 0 | high | Live Automations access shows exactly one enabled Morning System Upgrade. The expected current daily run is executing; no replacement or duplicate schedule exists. | Registry text can drift from scheduler state, so uniqueness must be checked live each run. | Verified the existing recurring schedule remains enabled and unique; updated registry evidence only, without creating or disabling an automation. | Recheck live state after completion and keep the recurring loop enabled. |
| Active project momentum | 56/100 estimated | 56/100 estimated | 0 | medium | This run improved the agent operating system but did not produce new provider/live proof for Psihotavr, Finance, or automatic Netlify publication. | Two provider blockers and one automatic-publication gap still need delivery execution. | Converted risky work into existing exact routes and did not count routing or harness CI as project delivery. | Execute one existing ticket: brain-management automatic Git->Netlify proof, Psihotavr #168, or Finance #614. |

## Deterministic aggregate contract

```txt
canonical_snapshot_timestamp: 2026-07-12T09:01:23+02:00
aggregate_method: arithmetic_mean_of_numeric_metrics
unknown_metric_policy: exclude_from_numeric_mean_and_report_in_coverage
score_sum: 621
numeric_metric_count: 9
metric_count_total: 10
coverage: 9/10
raw_score: 69
rounded_score: 69
reported_score: 69
yesterday_score: 67
delta: +2
```

Unknown, blocked, partial, needs-verification, and null values are excluded from the numeric mean and remain visible in coverage. Weighting is invalid unless stored in JSON and deterministically tested.

## Morning applied upgrade

- Merged implementation: [PR #103](https://github.com/andylitvinov-design/ai-projects-brain/pull/103), merge `779c7f74f1889e163c43ea1f5c8ac129b586166e`.
- Raw CI: [Agent Harness Validators run #70](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/29170610859), artifact `8253415825`, digest `sha256:5c74abfff6e85425a300587ea9adbc2e4d5ea87e5abe56eb52372b3c46a3e3ea`.
- Raw results: 8 prompt regressions; 7 replay cases; 7 behavior fixtures; 26 deterministic samples; six validator logs passed.
- Publication contract correctly remains `STALE`; no provider state, deploy configuration, product code, auth, payment, data, env value, billing, or secret was changed.
- Live scheduler check found exactly one enabled Morning System Upgrade and no duplicate.

## Publication evidence ladder

Repository truth, deployment truth, and live truth are independent. Current publication status: `STALE`; `success_allowed: false`.

| Step | Status | Evidence | Timestamp |
| --- | --- | --- | --- |
| canonical_updated | verified | PR #103 merge plus Morning evidence-propagation snapshot | 2026-07-12T09:01:23+02:00 |
| mirror_synced | stale | brain-management mirror still has the prior Morning snapshot | 2026-07-11T09:35:00+02:00 |
| deploy_identified | verified | Netlify deploy `6a5207d064f1feba62676b5e`; API upload, automatic Git source unproven | 2026-07-11T09:35:00+02:00 |
| live_verified | stale | recorded live proof applies to the older snapshot, not this canonical timestamp | 2026-07-11T09:35:00+02:00 |

## Provider and delivery blockers

- brain-management automatic GitHub→Netlify publication: `/delivery /safe`; prove repository, branch `main`, publish directory `.`, source commit, deploy ID, and current live JSON timestamp without creating another site.
- Psihotavr [#168](https://github.com/andylitvinov-design/psihotavr/issues/168): `BLOCKED / NEEDS_VERIFICATION` pending Supabase auth, Google OAuth, persistence, Storage/RLS, and public rendering proof.
- Finance [#614](https://github.com/andylitvinov-design/finance/issues/614): `BLOCKED / NEEDS_VERIFICATION` pending strict `verify:finance` and Binance save/USDC `missing_provider_balance` resolution.

## Evening verification question

Does the follow-up preserve 8/7/7/26 mapped coverage, arithmetic `621 / 9 = 69`, the correct `STALE` publication classification, and one enabled unique Morning schedule after this run completes?
