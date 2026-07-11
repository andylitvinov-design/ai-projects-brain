# Morning Handoff Queue

Last updated: 2026-07-11 Morning System Upgrade

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

No unconsumed safe upgrade is preselected. Evening Architecture Review should verify today's scheduler-liveness deltas, check the recurring schedule remains enabled after completion, and rank the next highest-leverage safe system issue.

Still routed outside Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168` via `/delivery` + `/safe` or `/audit-ui`.
- Finance provider-balance blocker: `andylitvinov-design/finance#614` via `/audit-fin`.

## Closed / consumed items

### 2026-07-11 — protect required recurring automation liveness

Consumed by Morning System Upgrade 2026-07-11.

Outcome: `APPLIED_UPGRADE`.

Applied:
- added prompt regression `recurring-automation-disabled-after-successful-run`;
- added matching failure replay and deterministic behavior fixture;
- added samples for unsafe disable/replace, safe re-enable of the existing schedule, and `NEEDS_VERIFICATION` when live access is unavailable;
- updated `scripts/run-behavior-replay-fixtures.mjs` with the liveness evaluator;
- added the four-level scheduler-liveness evidence ladder to `automation-prompt-registry.json`:
  - intended registry state;
  - live enabled state;
  - expected run observed;
  - latest run outcome;
- strengthened `scripts/validate-agentic-prompts.mjs` to protect the new mapping, ladder, duplicate-safe repair, and recurring-loop contract;
- added required-loop liveness to `systems/active-skill-map.md` as an internal guardrail, not a new top-level skill;
- live Automations check found exactly one enabled Morning System Upgrade and no duplicate active Morning schedule.

Validation evidence:
- PR #101: `andylitvinov-design/ai-projects-brain#101`;
- run #46 failed and exposed an overbroad negation matcher while still uploading raw logs;
- the matcher was narrowed without weakening the bad disable/replace sample;
- run #47 passed all four validators;
- raw artifact `8246272809` contains four logs;
- prompt validator: 7 regressions, 6 replay cases, 6 fixtures, 7 automation contracts;
- behavior runner: 6 fixtures, 14 samples, 8 expected pass, 6 expected fail.

Evening verification:
- verify the existing Morning schedule remains enabled after this successful run;
- verify exactly one active Morning System Upgrade still exists;
- accept or correct the dashboard deltas;
- keep scheduler-liveness behavior candidate until repeated or real prevention evidence exists;
- keep provider/live gaps separately blocked.

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
