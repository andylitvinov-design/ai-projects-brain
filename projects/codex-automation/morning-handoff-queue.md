# Morning Handoff Queue

Last updated: 2026-07-09 Evening Architecture Review

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-10 — unify local and CI raw validator evidence

Source: Evening Architecture Review 2026-07-09.

Status: ready for safe `/upgrade` harness/script/CI work.

Top blocker:

```txt
The system now has CI raw evidence artifact capture defined, but still does not have raw validation output available from a fetched GitHub Actions artifact/job log or a full local checkout run.
```

Inputs:
- The 2026-07-09 Morning Upgrade implemented the safe part of the previous handoff: `.github/workflows/agent-harness-validators.yml` now tees each validator command to log files under `agent-harness-validation-evidence/` and uploads that directory with `actions/upload-artifact@v4`.
- `scripts/validate-agentic-prompts.mjs` now fails if the workflow stops including the expected raw-evidence artifact contract:
  - `agent-harness-validation-evidence`;
  - `validate-agentic-prompts.log`;
  - `run-behavior-replay-fixtures.log`;
  - `verify-context-scout.log`;
  - `validate-projects-brain.log`.
- Evening accepted the structural artifact-capture and loop-closure improvements, but corrected `Validation evidence` from `60/100 estimated, medium confidence` to `55/100 estimated, low confidence` because raw CI/job/artifact logs were still unavailable.
- GitHub connector lookup for known recent harness commit refs returned no workflow runs.
- Local full-checkout validation could not be run in the Evening environment because direct `git clone` failed with DNS resolution error.
- Product/provider work remains routed out of Morning Upgrade: Psihotavr provider/live proof and Finance provider-balance blocker.

Recommended Morning action:
1. Add a single evidence runner:
   - `scripts/run-agent-harness-validation-evidence.mjs`.
2. The script should create/clean `agent-harness-validation-evidence/`, run the four validator commands, write raw output to the four expected `.log` files, and exit non-zero if any validator fails.
3. Update `.github/workflows/agent-harness-validators.yml` to call the single evidence runner and upload the same artifact.
4. Update `scripts/validate-agentic-prompts.mjs` so it verifies the evidence runner exists, includes all four validator commands, and writes all four expected log paths.
5. Run the evidence runner from a checkout when possible:
   - `node scripts/run-agent-harness-validation-evidence.mjs`.
6. If raw logs are produced, update:
   - `agent-learning-metrics.md`;
   - `delivery-outcome-ledger.md`;
   - `system-health-dashboard.md`;
   - `system-health-dashboard.json`;
   - brain-management live dashboard data mirror.
7. If checkout/CI remains blocked, report the exact blocker and keep `Validation evidence` low-confidence.

Expected metric improvement if validated:

```txt
Validation evidence: 55 -> 65+ if local raw logs are produced; 70+ if CI artifact/job logs are fetched.
False success protection: 55 -> 60 if validator protects the unified evidence-runner contract.
Delivery completion quality: 55 -> 60 if raw logs are attached to the Morning report.
```

Needs verification:
- Raw logs for all four commands:
  - `node scripts/validate-agentic-prompts.mjs`;
  - `node scripts/run-behavior-replay-fixtures.mjs`;
  - `node scripts/verify-context-scout.mjs`;
  - `node scripts/validate-projects-brain.mjs`.
- Whether GitHub Actions artifacts can be fetched for push-triggered runs; if not, use local evidence-runner output as the next best raw evidence.
- Live ChatGPT Automation UI prompts still need occasional comparison against registry contracts, but do not create duplicate automations.

Boundaries:
- harness/docs/scripts/CI workflow only;
- no product code;
- no provider config;
- no production data;
- no auth/payment/deploy/env/secrets.

## Closed / consumed items

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
