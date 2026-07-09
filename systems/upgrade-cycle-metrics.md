# Upgrade Cycle Metrics Contract

Status: active contract for ChatGPT/Codex recurring automations.
Last updated: 2026-07-09.

This file defines the division of labor between `Daily Improve`, `Evening Architecture Review`, and `Morning System Upgrade`.

## Core loop

```txt
Daily Improve: where should the portfolio grow?
Evening Architecture Review: what became unhealthy today and why?
Morning System Upgrade: what safe system upgrade was applied, and how will evening verify it?
```

Evening measures. Morning improves. Evening verifies whether the morning change helped. Morning adjusts the harness based on that verification.

## Evening Architecture Review role

Evening is the diagnostic architecture review and system health scoring step.

It answers:

```txt
What became weaker, repeated, stayed unproven, or created false-success risk today?
What exactly should Morning Upgrade safely improve tomorrow?
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

## Evening output contract

Evening final output must include:

```txt
1. Evening summary: today’s system health in 3-5 lines.
2. Health Metrics Table: metric, score, delta, evidence, root cause, morning action, risk if ignored.
3. Provider/live readiness gaps found: affected project/provider, exact missing proof, status.
4. Repeated patterns found.
5. Selected root structural issue and why it outranks others.
6. Rule lifecycle actions: candidate/promoted/revised/deprecated/rejected.
7. Replay/regression/behavior coverage: checked, pass/fail/not run, missing coverage.
8. Learning metrics updated or why not.
9. Safe harness/docs changes made or proposed.
10. Agent-ready tickets for risky/product/provider work, with suggested skills.
11. Validation commands run and raw evidence status.
12. Morning System Upgrade handoff: top blocker, exact safe change, expected metric improvement, validation, evening verification question.
13. Single next action for tomorrow morning at 09:00 Kyiv.
```

## Morning System Upgrade role

Morning is the applied implementation and safe system-maintenance step.

It answers:

```txt
What can be safely improved in the agent/Codex operating system right now?
How do we prove the upgrade changed something?
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
evening verification question
```

## Morning output contract

Morning final output must include:

```txt
1. Status: APPLIED_UPGRADE or NO_SAFE_UPGRADE.
2. Daily Improve input used.
3. Evening Review health metrics/problems used.
4. Applied Upgrade Table: metric/problem, safe change, changed files/docs/prompts, validation, expected metric improvement, evening verification question.
5. Provider/live readiness gaps operationalized or blocked with exact tickets.
6. Rule lifecycle actions: candidates/promoted/revised/deprecated/rejected.
7. Replay cases and behavior fixtures checked and result.
8. Learning metrics updated or why not.
9. Active skill map changes or confirmation that no visibility drift was found.
10. Regression tests / registry / docs / scripts / CI workflow changed.
11. Product/provider/risky work converted into exact handoffs/tickets.
12. Validation and CI evidence results.
13. What remains for Evening Architecture Review at 21:00 Kyiv.
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
