# Upgrade Cycle Metrics Contract

Status: active contract for ChatGPT/Codex recurring automations.
Last updated: 2026-07-09.

This file defines the division of labor between `Daily Improve`, `Evening Architecture Review`, and `Morning System Upgrade`.

## Core loop

```txt
Daily Improve: where should the portfolio grow?
Evening Architecture Review: what became unhealthy today and why?
Morning System Upgrade: what safe system upgrade was applied, how much did health improve, and how will evening verify it?
```

Evening measures. Morning improves and estimates health deltas. Evening verifies whether the morning change actually helped. Morning adjusts the harness based on that verification.

## Evening Architecture Review role

Evening is the diagnostic architecture review and system health scoring step.

It answers:

```txt
What became weaker, repeated, stayed unproven, or created false-success risk today?
Were Morning's reported health deltas supported by evidence?
What exactly should Morning Upgrade safely improve tomorrow?
Do current system-effectiveness trends suggest that our metric model is missing a useful dimension?
```

Evening should not behave like Morning Upgrade, Daily Improve, PR Merge Sweep, or broad delivery. It should avoid mass implementation and instead produce evidence-backed diagnosis plus a ranked morning handoff.

## Evening health metrics

Every Evening Review should score these metrics from `0-100` when evidence allows. If evidence is missing, say `unknown/no evidence` instead of inventing a score.

For each metric, include:

```txt
metric
score 0-100
delta ↑/↓/→ versus previous relevant evidence
evidence
root cause
morning action
risk if ignored
```

### 1. Provider/live readiness

Measures whether provider/env/deploy/source/storage/auth/payment/live behavior is actually proven.

High-risk examples:
- code merged but Supabase/RLS/storage/auth provider not proven;
- Vercel/Netlify/Cloudflare live deploy source unknown;
- Google OAuth redirect/client not proven;
- Google Sheets, Binance balances, SaleBot/Telegram/PayPal/webhook access not proven;
- production persistence falls back to localStorage/mock/demo behavior.

### 2. False success protection

Measures whether reports avoided claiming `SUCCESS` when live/provider proof was missing.

### 3. Delivery completion quality

Measures real finish versus report-only, code-only, PR-only, or deploy-unproven completion.

### 4. User pain repetition

Measures repeated user corrections or complaints, especially:
- “not active enough”;
- “still not live”;
- “design still poor”;
- “why didn’t you do it yourself?”;
- “you only checked, but what actually changed?”

### 5. Loop closure

Measures whether yesterday evening handoff was consumed by Morning Upgrade and whether Morning produced an applied change or exact blocked handoff.

### 6. Validation evidence

Measures raw local/CI/check output versus `PR-reported run`, `CI workflow defined`, `not run`, or no evidence.

### 7. Regression/replay coverage

Measures whether today's failure class is covered by prompt regressions, failure replay cases, or behavior replay fixtures.

### 8. Rule lifecycle health

Measures whether rules are promoted, revised, deprecated, or kept candidate using evidence rather than accumulating context-cost.

### 9. Automation noise / duplication

Measures duplicate, stale, too-frequent, or overlapping automations.

### 10. Active project momentum

Measures whether active projects have clear next routes/prompts and are not stuck in repeated blockers.

## Morning health delta rule

Morning must report what changed in system health after applied upgrades.

For every applied upgrade, record a `Health Delta Table`:

```txt
metric
before score
after score
delta
confidence: high / medium / low
evidence
why score changed
evening verification question
```

Use these confidence rules:

```txt
high = raw validation, CI, live behavior, or real prevention evidence exists
medium = deterministic local/replay/fixture/registry evidence exists
low = docs, prompt, handoff, or automation-contract change exists but behavior is not yet observed
```

Do not inflate provider/live readiness from docs alone. Docs and prompts can improve false-success protection, handoff quality, regression coverage, or loop closure. Provider/live readiness itself improves only when provider/live proof exists.

When Evening scores are missing, Morning may create a baseline estimate, but it must mark confidence `low` and ask Evening to verify.

## Current System Health Summary

Morning final output must include current overall health after changes:

```txt
overall score now
strongest metric
weakest metric
biggest improvement today
metrics still blocked
```

The overall score should be a simple average of scored metrics unless Evening defines a better weighting. If some metrics are `unknown/no evidence`, report both:

```txt
overall scored-metrics average
coverage: X/10 metrics scored
```

## Evening verification of Morning deltas

Evening must verify Morning's health deltas:

```txt
Morning claimed before -> after
accepted / corrected / insufficient evidence
evidence used
current evening score
```

If Morning overestimated improvement, Evening corrects the score and writes the reason. If Morning produced real evidence, Evening preserves the improved score and records the evidence.

## Metric model trend review

Evening may update or propose updates to the metric model in response to current trends in system-effectiveness analysis.

Relevant trend lenses include:

```txt
AI-agent reliability: consistency, robustness, predictability, safety, bounded error severity, abstention/uncertainty
Guardrails: recall, false positives, false negatives, tool-abuse prevention, injection resistance
DevOps/DORA: lead time, deployment frequency, change failure rate, recovery time, rework rate
Developer productivity / SPACE: satisfaction, performance, activity, collaboration, efficiency, flow and friction
Agent operations: retries, context growth, hidden cost, observability, reproducibility, tool/environment variability
```

Trend-review rules:

- Use current public research or authoritative sources when available.
- Cite sources in the Evening report when external trend research is used.
- Do not change the metric set every day.
- New metric changes start as `candidate`.
- Promote only after repeated evidence and clear usefulness for Andrey's actual agent/Codex system.
- Avoid overlapping metrics; prefer adding subdimensions to existing metrics.
- Prefer metric changes that improve decisions, not vanity measurement.

Current trend-informed candidate subdimensions:

```txt
Validation evidence -> add consistency / reproducibility subdimension.
False success protection -> add abstention/uncertainty quality subdimension.
Provider/live readiness -> add bounded blast radius / rollback proof subdimension when live work is involved.
Delivery completion quality -> add rework rate / unplanned repair rate subdimension.
Automation noise -> add hidden cost: retries, context growth, duplicate scans.
```

## Evening output contract

Evening final output must include:

```txt
1. Evening summary: today’s system health in 3-5 lines.
2. Health Metrics Table: metric, score, delta, evidence, root cause, morning action, risk if ignored.
3. Morning Health Delta Verification: Morning claimed before/after, accepted/corrected/insufficient evidence, current evening score.
4. Provider/live readiness gaps found: affected project/provider, exact missing proof, status.
5. Repeated patterns found.
6. Selected root structural issue and why it outranks others.
7. Metric model trend review: sources used, trend observed, metric changes proposed/applied, lifecycle status.
8. Rule lifecycle actions: candidate/promoted/revised/deprecated/rejected.
9. Replay/regression/behavior coverage: checked, pass/fail/not run, missing coverage.
10. Learning metrics updated or why not.
11. Safe harness/docs changes made or proposed.
12. Agent-ready tickets for risky/product/provider work, with suggested skills.
13. Validation commands run and raw evidence status.
14. Morning System Upgrade handoff: top blocker, exact safe change, expected metric improvement, validation, evening verification question.
15. Single next action for tomorrow morning at 09:00 Kyiv.
```

## Morning System Upgrade role

Morning is the applied implementation and safe system-maintenance step.

It answers:

```txt
What can be safely improved in the agent/Codex operating system right now?
How do we prove the upgrade changed something?
How much did current system health improve by metric?
```

Morning should not finish as a passive report. It ends as:

```txt
APPLIED_UPGRADE — a safe system change was actually applied.
NO_SAFE_UPGRADE — every candidate was unsafe, duplicate, unsupported by evidence, or already handled.
```

## Morning priority order

Morning should choose 1-3 high-leverage applied upgrades, not scatter changes.

Default priority:

1. Provider/live readiness and false success risk.
2. Repeated user pain.
3. Broken delivery loop or loop-closure failure.
4. Missing validation/CI/raw evidence.
5. Missing regression/replay/behavior fixture coverage.
6. Rule lifecycle bloat or ignored/duplicate rules.
7. Automation noise/duplication.
8. Softer docs/prompt cleanup.

## Morning applied-upgrade metrics

For each selected change, Morning records:

```txt
Evening metric/problem used
Daily Improve input used, if relevant
safe change applied
files/docs/prompts/registry/tests/scripts/CI changed
expected metric to improve
validation evidence: raw local output, CI output, PR-reported run, not run, or not applicable
rule lifecycle effect: candidate/promoted/needs_revision/deprecated/rejected/none
before score
after score
delta
confidence
evening verification question
```

## Morning output contract

Morning final output must include:

```txt
1. Status: APPLIED_UPGRADE or NO_SAFE_UPGRADE.
2. Daily Improve input used.
3. Evening Review health metrics/problems used.
4. Applied Upgrade Table: metric/problem, safe change, changed files/docs/prompts, validation, expected metric improvement, evening verification question.
5. Health Delta Table: metric, before, after, delta, confidence, evidence, why score changed.
6. Current System Health Summary: overall score now, strongest metric, weakest metric, biggest improvement today.
7. Provider/live readiness gaps operationalized or blocked with exact tickets.
8. Rule lifecycle actions: candidates/promoted/revised/deprecated/rejected.
9. Replay cases and behavior fixtures checked and result.
10. Learning metrics updated or why not.
11. Active skill map changes or confirmation that no visibility drift was found.
12. Regression tests / registry / docs / scripts / CI workflow changed.
13. Product/provider/risky work converted into exact handoffs/tickets.
14. Validation and CI evidence results.
15. What remains for Evening Architecture Review at 21:00 Kyiv.
```

## Daily Improve relationship

Daily Improve remains a read-only strategic portfolio loop.

It asks:

```txt
Where should the portfolio grow?
```

Its output supplies Morning with growth opportunities and ready prompts. It should not erase the portfolio view just because one urgent blocker exists.

## Shared evidence ladder

When reporting validation or learning, distinguish:

```txt
not run
PR-reported run
CI workflow defined
raw validation output available
behavior replay fixture passed
live behavior/prevention evidence exists
```

Do not promote behavior rules to `active` using only file existence or a good-looking prompt. Use replay/regression/repeated evidence or raw validation output.

## Provider/live readiness rule

Provider-dependent work is not complete until provider/live readiness is proven. Code merge alone is not success.

Use `BLOCKED`, `PARTIAL`, or `NEEDS_VERIFICATION` until the proof exists. Never print secret values; use env names only.
