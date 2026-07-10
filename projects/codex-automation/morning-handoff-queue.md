# Morning Handoff Queue

Last updated: 2026-07-10 Morning System Upgrade

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

No unconsumed safe upgrade is preselected. Evening Architecture Review should first verify the post-merge main workflow for PR #98 and then rank the next highest-leverage safe system issue.

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
- `.github/workflows/agent-harness-validators.yml` now uses that single runner and treats missing artifact files as an error;
- `scripts/validate-agentic-prompts.mjs` protects the runner and workflow contract;
- PR #98 passed Agent Harness Validators run #40 and was merged as `d559499`;
- fetched raw job log proves all four commands exited 0;
- artifact `8220506285` contains four log files.

Evening verification:
- fetch/check the post-merge main workflow and artifact;
- accept or correct the evidence-backed dashboard deltas;
- keep provider/live and live behavior rules candidate until separate proof exists.


### 2026-07-09 — fetch raw CI artifact evidence and close the evidence ladder

Reviewed by Evening Architecture Review 2026-07-09.

Outcome: `PARTIAL / INSUFFICIENT RAW EVIDENCE`.

Safe updates already present:
- `.github/workflows/agent-harness-validators.yml` tees every validator command into durable log files and uploads them as `agent-harness-validation-evidence`;
- `scripts/validate-agentic-prompts.mjs` validates the raw-evidence artifact contract;
- `agent-learning-metrics.md` records `CI raw evidence artifact capture defined` as a distinct state from `raw validation output available`;
- dashboard and live mirror were updated.

Still not counted as full CI validation passed:
- raw GitHub Actions logs or artifact for a passing workflow run after the latest main commits have not been fetched.

### 2026-07-09 — define raw validator evidence artifact capture

Consumed by Morning System Upgrade 2026-07-09.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- `.github/workflows/agent-harness-validators.yml` now tees every validator command into durable log files and uploads them as `agent-harness-validation-evidence`;
- `scripts/validate-agentic-prompts.mjs` now validates the raw-evidence artifact contract so this CI observability layer cannot silently disappear;
- `agent-learning-metrics.md` records `CI raw evidence artifact capture defined` as a distinct state from `raw validation output available`;
- `system-health-dashboard.md`, `system-health-dashboard.json`, and the live dashboard data mirror were updated with estimated, confidence-labelled health changes.

Still not counted as full CI validation passed:
- raw GitHub Actions logs for a workflow run after the latest commits have not been fetched.

### 2026-07-09 — reconcile PR #97 and raw CI validator evidence

Consumed by Morning System Upgrade 2026-07-09.

Outcome: `APPLIED_UPGRADE`.

Safe updates applied:
- applied the core PR #97 guardrail directly on fresh `main` instead of trying to merge an unmergeable stale branch;
- added missing prompt-regression coverage for all behavior replay fixture IDs;
- strengthened `scripts/validate-agentic-prompts.mjs` with fixture-to-prompt and fixture-to-replay coverage checks;
- recorded local reconstructed `validate-agentic-prompts` and `run-behavior-replay-fixtures` output in metrics/ledger;
- closed PR #97 as superseded after applying the equivalent safe change on main.

Still not counted as full CI validation passed:
- raw GitHub Actions logs for the four-command workflow were not available in that run.

### Earlier closed items

- 2026-07-08: CI validator workflow created and workflow contract added to validator.
- 2026-07-07: deterministic behavior replay fixtures and runner created.
- 2026-07-06: metrics drift validation added and stale validation evidence separated from raw validation output.
- 2026-07-05: explicit prompt/replay/registry validator created.
- 2026-07-04: provider/live readiness gate, rule lifecycle, Daily Improve strategic portfolio, and Morning `APPLIED_UPGRADE / NO_SAFE_UPGRADE` contracts created.

Still routed out of Morning Upgrade:
- Psihotavr provider/live auth and persistence proof: `andylitvinov-design/psihotavr#168`.
- Finance strict `verify:finance` provider-balance blocker: `andylitvinov-design/finance#614`.