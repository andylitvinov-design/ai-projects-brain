# Morning Handoff Queue

Last updated: 2026-07-10 Evening Architecture Review

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-11 — protect required recurring automation liveness

Source: Evening Architecture Review 2026-07-10.

Status: ready for safe `/upgrade` harness/registry/regression work.

Top blocker:

```txt
The live Morning System Upgrade automation was disabled even though the repository registry described it as active and verified. Evening restored the existing schedule, but the harness cannot yet detect or prevent this drift.
```

Evidence:
- live ChatGPT Automations state showed the existing Morning System Upgrade schedule disabled;
- Evening re-enabled that same schedule; no duplicate automation was created;
- the registry still lacks separate fields/evidence for intended state, live enabled state, expected run observed, and latest run outcome;
- raw harness validation remains strong: runs #40 and #42 passed and each produced the four-file evidence artifact;
- post-merge-main workflow evidence remains `NEEDS_VERIFICATION` because the current commit-run connector path did not return push runs.

Required safe change:
1. Add prompt regression `recurring-automation-disabled-after-successful-run`.
2. Add matching failure replay and deterministic behavior fixture.
3. Good behavior must:
   - preserve normal recurring schedules after a successful run;
   - distinguish normal recurring schedules from one-time or condition-watch completion;
   - compare live enabled state with registry intent before calling the loop healthy;
   - re-enable only an existing clearly intended schedule;
   - never create a duplicate automation;
   - use `NEEDS_VERIFICATION` when live Automations access is unavailable.
4. Update `automation-prompt-registry.json` to record the scheduler-liveness evidence ladder:
   - intended/registry state;
   - live enabled state;
   - expected run observed;
   - latest run outcome.
5. Use the existing mapping validator; do not create a parallel validator unless the current one cannot protect the new fixture.

Validation:

```txt
node scripts/run-agent-harness-validation-evidence.mjs
```

Live verification:

```txt
Required core loops enabled.
Exactly one Morning System Upgrade active.
No duplicate active schedule created.
```

Expected metric improvement if validated:

```txt
Automation noise / duplication: 62 -> 68+
Loop closure: 70 -> 74+
False success protection: 60 -> 63+
Regression/replay coverage: 68 -> 71+
```

Evening verification question:

```txt
Does the new fixture reject disabling a normal recurring loop after success, accept preserving the existing loop, and does the live list show one enabled Morning System Upgrade with no duplicate?
```

Boundaries:
- harness/docs/registry/regression/replay/fixture only;
- no product code;
- no provider configuration;
- no production data;
- no auth/payment/deploy/env/secrets;
- do not create a new automation.

Still routed outside Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168` via `/delivery` + `/safe` or `/audit-ui`.
- Finance provider-balance blocker: `andylitvinov-design/finance#614` via `/audit-fin`.

## Closed / consumed items

### 2026-07-10 — unify local and CI raw validator evidence

Consumed by Morning System Upgrade 2026-07-10.

Outcome: `APPLIED_UPGRADE`.

Applied and proven:
- added `scripts/run-agent-harness-validation-evidence.mjs`;
- runner creates/cleans the evidence directory, runs all four validators, writes four raw logs, and fails non-zero if any validator fails;
- `.github/workflows/agent-harness-validators.yml` uses the single runner and treats missing artifact files as an error;
- `scripts/validate-agentic-prompts.mjs` protects the runner and workflow contract;
- PR #98 passed run #40 and was merged;
- PR #99 passed run #42 with the same artifact path;
- raw PR workflow evidence is available; post-merge push-run evidence remains separately unverified.

### Earlier closed items

- 2026-07-09: CI raw-evidence artifact capture defined, then unified into one runner.
- 2026-07-09: stale PR #97 reconciled on fresh main.
- 2026-07-08: CI validator workflow created.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation and evidence-state separation added.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live gate, lifecycle standard, strategic Daily Improve contract, and Morning applied/no-safe-upgrade contract created.
