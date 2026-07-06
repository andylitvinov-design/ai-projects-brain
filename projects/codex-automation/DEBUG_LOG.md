# Debug Log - codex-automation

## 2026-07-05 - Automation role model registry update

### Problem

Automation roles were documented across scheduler, prompt, and mode files but
did not have one compact source for the four-role model requested in GitHub
issue #93.

### Evidence

Issue #93 defined the required model: Daily Improve as Prototyper plus Grower,
Morning System Upgrade and Evening Architecture Review as one Sweeper loop,
Codex Delivery Loop and `/delivery` as Builder, and PR Merge Sweep, Weekly Live
Safe Sweep, `/audit-fin`, and provider/live readiness as Maintainer.

### Fix

Created `AGENT_ROLES.md`, linked it from `PROJECT.md` and `SYSTEM_MAP.md`,
added the compact role map to `SYSTEM_MAP.md`, aligned the Sarajevo/Podgorica
schedule labels with `CHATGPT_AUTOMATIONS_RUNBOOK.md`, and added
`primary_role` / `secondary_role` fields plus `scheduler_state` boundaries to
`automation-prompt-registry.json`.

### Changed Files

- `projects/codex-automation/AGENT_ROLES.md`
- `projects/codex-automation/PROJECT.md`
- `projects/codex-automation/SYSTEM_MAP.md`
- `projects/codex-automation/automation-prompt-registry.json`
- `projects/codex-automation/prompt-regression-tests.json`
- `projects/codex-automation/DEBUG_LOG.md`

### Verification

Run the issue-requested validators from the repo root.

### Remaining Risks

No live ChatGPT Automation UI state was verified, no new automation was created,
and no provider configuration was changed. Runtime scheduler state remains
`needs verification` until checked in ChatGPT Automations metadata.

## 2026-06-30 - ChatGPT scheduler ownership and local Codex audit

### Problem

Recurring Codex-side automations could duplicate the expected ChatGPT
Automations architecture and waste tokens, especially delivery loops and daily
project audits.

### Evidence

Inspected `/Users/andriilitvinov/.codex/automations` because `CODEX_HOME` was
not set. Found twelve local Codex automation directories, including
`codex-delivery-loop`, `codex-delivery-loop-now`, daily project audits, backups,
`skill-progression-map`, and `critical-ram-guard`.

### Fix

Documented ChatGPT Automations as the default scheduler, recorded the four
expected ChatGPT-owned schedules, added the Codex-side automation rule, and
classified local Codex duplicates/high-frequency risks in `SYSTEM_MAP.md`,
`MONITORING.md`, and `COST_REVIEW.md`.

Recorded Ponytail Gate as a rule/gate in `systems/agent-rules.md`; it was not
installed as a plugin, dependency, global service, or automation.

### Changed Files

- `systems/agent-rules.md`
- `projects/codex-automation/SYSTEM_MAP.md`
- `projects/codex-automation/MONITORING.md`
- `projects/codex-automation/COST_REVIEW.md`
- `projects/codex-automation/DEBUG_LOG.md`

### Verification

Run repo validation and Markdown/diff checks after the documentation patch.

### Remaining Risks

No automation TOML files were disabled in this pass. Recommended disable/archive
targets are documented, but actual scheduler state remains unchanged until the
Codex app/local automation owner disables or archives them.
