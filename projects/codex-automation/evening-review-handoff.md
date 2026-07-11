# Evening Architecture Review Handoff

Last updated: 2026-07-11 Morning System Upgrade

## 2026-07-11 Morning implementation response

Status: `APPLIED_UPGRADE`.

Morning consumed the exact Evening root issue: required recurring-loop liveness was not represented in the evidence model.

Applied safe changes in PR #101:
- prompt regression `recurring-automation-disabled-after-successful-run`;
- matching failure replay case;
- deterministic behavior fixture with three samples:
  - unsafe disable and duplicate replacement — expected fail;
  - safe re-enable of the existing recurring schedule — expected pass;
  - no live access with `NEEDS_VERIFICATION` and no new automation — expected pass;
- behavior evaluator for the new fixture;
- scheduler-liveness evidence ladder in `automation-prompt-registry.json`:
  1. intended registry state;
  2. live enabled state;
  3. expected run observed;
  4. latest run outcome;
- validator checks for fixture mapping, registry ladder, recurring preservation, registry-only false proof, and duplicate-safe repair;
- `required-loop liveness` internal guardrail in `systems/active-skill-map.md`; no new top-level command.

## Validation evidence

First CI attempt, run #46:
- correctly failed the behavior runner;
- raw artifact remained available;
- root cause was an overbroad substring matcher that treated the good sentence “Do not disable the recurring automation after success” as a violation.

Recovery:
- narrowed only the bad-phrase matcher;
- retained the unsafe disable/replace sample;
- reran the complete unified evidence path.

Passing run #47:

```txt
agentic prompt validation ok: 7 prompt regressions, 6 replay cases, 6 behavior fixtures, 7 automation contracts, metrics aligned, fixture-to-prompt coverage checked, scheduler liveness contract checked, CI workflow defined, unified raw evidence runner contract checked
behavior replay fixtures ok: 6 fixtures, 14 samples (8 expected pass, 6 expected fail)
context-scout verification ok
validation ok: 20 projects
```

All four commands exited 0. Artifact `8246272809` contains the four raw logs.

Live Automations verification:
- Morning System Upgrade is enabled;
- exactly one active Morning System Upgrade exists;
- the expected Morning run was observed;
- no replacement automation was created.

## Morning Health Delta Proposal

| Metric | Evening baseline | Morning score | Delta | Confidence | Evidence |
| --- | ---: | ---: | ---: | --- | --- |
| Provider/live readiness | unknown | unknown | unknown | unknown | No provider/live proof. |
| False success protection | 60 | 63 | +3 | high | New mapped regression and raw CI. |
| Delivery completion quality | 61 | 62 | +1 | high | Failed raw run diagnosed, narrow fix, passing rerun. |
| User pain repetition | 55 | 55 | 0 | low | No new correction class. |
| Loop closure | 70 | 74 | +4 | high | Evening handoff consumed; live enabled/unique state verified. |
| Validation evidence | 74 | 75 | +1 | high | Run #47 four-file raw artifact. |
| Regression/replay coverage | 68 | 72 | +4 | high | 7 regressions, 6 replays, 6 fixtures, 14 samples. |
| Rule lifecycle health | 60 | 62 | +2 | high | Narrow guardrail validated but remains candidate. |
| Automation noise / duplication | 62 | 68 | +6 | high | Four-level ladder + one enabled Morning schedule, zero duplicates. |
| Active project momentum | 50 | 50 | 0 | low | Existing provider tickets remain open. |

Overall proposal: `62 -> 65/100 estimated`, coverage `9/10`.

## Evening verification questions

1. After this run completes, does the live list still show one enabled Morning System Upgrade and no duplicate?
2. Does the new fixture continue to reject disable/replace behavior while accepting existing-schedule repair and `NEEDS_VERIFICATION` abstention?
3. Are the proposed metric deltas supported, especially Automation noise `62→68`, Loop closure `70→74`, and Regression/replay `68→72`?
4. Should `recurring-automation-disabled-after-successful-run` remain `candidate` until a later real prevention/detection case? Morning recommends yes.
5. Can post-merge-main workflow evidence be retrieved, or must it remain a separate `NEEDS_VERIFICATION` state?

## Rule lifecycle

```txt
candidate:
- recurring-automation-disabled-after-successful-run — deterministic CI and live-state evidence exist; repeated prevention evidence does not yet exist.
- automation-registry-live-state-drift — represented by the same liveness ladder; avoid a duplicate global rule.
- retryable-provider-error-versus-terminal-blocker — still awaiting a durable example.

active:
- validation-evidence-reproducibility-local-plus-ci remains active.

needs_revision:
- registry-only automation-health claims are now explicitly rejected by the liveness contract.

deprecated/rejected:
- none.
```

## Provider/live gaps remain unchanged

1. [Psihotavr #168](https://github.com/andylitvinov-design/psihotavr/issues/168)
   - Missing: production source mapping, env-name presence, Supabase schema/storage/policy proof, live Google auth, admin persistence, and public rendering.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/delivery` + `/safe` or `/audit-ui`.

2. [Finance #614](https://github.com/andylitvinov-design/finance/issues/614)
   - Missing: strict live `verify:finance` and resolution of the Binance save/USDC source gap.
   - Status: `BLOCKED / NEEDS_VERIFICATION`.
   - Route: `/audit-fin`.

## Next Evening responsibility

Verify the live recurring schedule after successful Morning completion, accept or correct the dashboard, and select the next single safe structural issue. Do not treat harness progress as provider/live progress.
