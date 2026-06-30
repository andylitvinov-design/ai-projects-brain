# Debug Log - codex-automation

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
