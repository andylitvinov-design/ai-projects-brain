# Evening Architecture Review Handoff

Last updated: 2026-07-10 Evening Architecture Review

## Evening result

Status: `DIAGNOSED_AND_HANDOFF_READY`.

Morning's unified evidence-runner upgrade is real and supported. Raw GitHub Actions evidence now exists for two PR runs:

- run #40 for the runner/workflow upgrade;
- run #42 for the dashboard, metrics, ledger, and handoff update;
- both jobs completed successfully and uploaded `agent-harness-validation-evidence` with four log files.

The post-merge `main` push-run remains `NEEDS_VERIFICATION`: the available commit-workflow lookup returned no run for merge SHAs, and the connector path is documented as pull-request-run oriented. Do not infer a post-merge run from a PR run.

## New structural issue found

The repository registry said Morning System Upgrade was active, but the live ChatGPT Automation was disabled after today's successful run.

Evening repaired the narrow live-state drift by re-enabling the existing daily Morning System Upgrade schedule. No duplicate automation was created.

This exposed a missing evidence layer:

```txt
registry contract defined
live scheduler enabled
expected run observed
run produced report/evidence
```

The system currently checks the first and fourth layers better than the middle two.

## Morning Health Delta Verification

| Morning claim | Evening decision | Current evening score | Evidence / correction |
| --- | --- | ---: | --- |
| Provider/live readiness stays unknown | accepted | unknown | Psihotavr #168 and Finance #614 remain open without new provider/live proof. |
| False success protection 55→60 | accepted | 60 | Unified runner contract and raw CI output support the increase. |
| Delivery completion quality 55→60 | accepted, then +1 | 61 | A second PR run/artifact validates the dashboard/metrics update; post-merge-main run remains unverified. |
| User pain repetition 55→55 | accepted | 55 | No new durable correction artifact was recorded. |
| Loop closure 65→70 | accepted with repair | 70 | Prior handoff was consumed, but the next Morning schedule had become disabled and was restored tonight. |
| Validation evidence 55→72 | accepted, then +2 | 74 | Run #42 independently repeated the unified four-validator evidence path. |
| Regression/replay coverage 65→68 | accepted | 68 | Existing mapped fixtures passed; scheduler-liveness drift is not yet covered. |
| Rule lifecycle health 55→60 | accepted | 60 | Structural reproducibility is proven; behavior/provider rules remain candidate. |
| Automation noise 50→50 | corrected upward | 62 | Live schedules were checked, no duplicate core loops were found, and the disabled Morning loop was restored. |
| Active project momentum 50→50 | accepted | 50 | Existing exact tickets remain open without new live proof. |

## Selected root issue

**Required-loop scheduler liveness is not part of the evidence model.**

Why it outranks softer cleanup:

1. A disabled Morning loop can silently stop the closed-loop system even while registry files, dashboards, and CI remain green.
2. The mismatch was real, current, and directly observed in the live Automations state.
3. It can be addressed safely in harness tests/docs without touching product code or providers.
4. It is non-overlapping with the existing raw-validator evidence work.

## Rule lifecycle actions

```txt
candidate:
- recurring-automation-disabled-after-successful-run
- automation-registry-live-state-drift
- retryable-provider-error-versus-terminal-blocker (awaiting one durable captured example)

active:
- validation-evidence-reproducibility-local-plus-ci remains active

needs_revision:
- automation health must not rely on registry status alone

deprecated/rejected:
- none
```

## Replay / regression coverage

Current proven coverage:

```txt
prompt regressions defined = 6
failure replay cases defined = 5
behavior replay fixtures defined = 5
behavior samples = 11
raw CI runs fetched = 2
four-validator artifacts fetched = 2
live model prevention evidence = not yet available
```

Missing coverage:

```txt
recurring-automation-disabled-after-successful-run
```

## Provider/live gaps

1. [Psihotavr #168](https://github.com/andylitvinov-design/psihotavr/issues/168)
   - Missing: production source mapping, env-name presence, Supabase schema/storage/policy proof, live Google auth, live admin persistence/public rendering.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/delivery` + `/safe` or `/audit-ui`.

2. [Finance #614](https://github.com/andylitvinov-design/finance/issues/614)
   - Missing: strict live `verify:finance` proof and exact resolution of the Binance save/USDC provider-balance source gap.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/audit-fin`.

## Morning System Upgrade handoff

```txt
/upgrade

Goal: make required recurring automation liveness evidence-backed so a core loop cannot silently become disabled while the registry still says active.

Top blocker:
The live Morning System Upgrade automation was disabled even though automation-prompt-registry.json said it was active/verified. Evening restored the existing schedule, but the harness has no regression, replay fixture, or evidence ladder for this drift.

Required safe change:
1. Add prompt regression ID `recurring-automation-disabled-after-successful-run`.
2. Add the matching failure replay case and deterministic behavior fixture.
3. Expected good behavior:
   - distinguish normal recurring schedules from one-time/conditional tasks;
   - do not disable a normal recurring automation merely because one run succeeded;
   - compare required live enabled state with registry intent before calling loop health good;
   - re-enable only an existing clearly intended schedule, never create a duplicate;
   - report missing Automations access as `NEEDS_VERIFICATION`.
4. Update `scripts/validate-agentic-prompts.mjs` through existing fixture-to-prompt/replay mapping; avoid a new validator unless necessary.
5. Update `automation-prompt-registry.json` with a scheduler-liveness evidence ladder:
   - intended/registry state;
   - live enabled state;
   - expected run observed;
   - latest run outcome.
6. Keep provider/product work outside `/upgrade`.

Validation:
- node scripts/run-agent-harness-validation-evidence.mjs
- live Automations list: required core loops enabled, no duplicate active schedules

Expected metric improvement if validated:
- Automation noise / duplication: 62 -> 68+
- Loop closure: 70 -> 74+
- False success protection: 60 -> 63+
- Regression/replay coverage: 68 -> 71+

Evening verification question:
Does the new regression fail a sample that disables a normal recurring loop after success, pass a sample that preserves the existing schedule, and does the live list show one enabled Morning System Upgrade with no duplicate?

Boundaries:
- harness/docs/registry/regression/replay/fixture only;
- no product code;
- no provider config or production data;
- no auth/payment/deploy/env/secrets;
- do not create a new automation.
```

## Single next action

Tomorrow morning: implement and validate `recurring-automation-disabled-after-successful-run`, then prove the existing Morning schedule remains enabled and unique.
