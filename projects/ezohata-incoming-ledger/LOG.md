# Project Log

### 2026-05-11 - Production debug memory system

**Task:** Add a self-improving production debugging memory layer for Ezohata Incoming Ledger.

**Context:** A production movement table incident showed `Итого BALANCE = -340.5000` while visible rows summed to `218.2244`. Debugging initially patched logic before proving production source of truth. The new guardrail requires production deploy/branch/commit verification before patching formulas or UI logic.

**Changed files:**

- `systems/production-debug-protocol.md`
- `projects/ezohata-incoming-ledger/DEBUG_PLAYBOOK.md`
- `projects/ezohata-incoming-ledger/CHECKS.md`
- `projects/ezohata-incoming-ledger/RISKS.md`
- `projects/ezohata-incoming-ledger/DEBUG_LOG.md`
- `projects/ezohata-incoming-ledger/STATE.md`
- `projects/ezohata-incoming-ledger/LOG.md`

**What changed:**

- Added mandatory Production Debug Preflight.
- Added movement table invariant and regression fixture.
- Added deploy/source-of-truth mismatch risk.
- Added incident entry and memory update loop.

**Checks run:**

- needs verification

**Result:** Memory system patch prepared.

**Remaining risks:**

- Production app still needs live deploy/source verification.
- The target repo should also receive a local `AGENTS.md` or matching release guard to enforce this outside the brain repo.

**Next action:** Run validation scripts, merge memory PR, then add repo-local enforcement in the finance app.

## Entry template

### 2026-04-29 - Initial memory files

**Task:** Create minimal project memory entry for
ezohata-incoming-ledger.

**Context:** Unified memory system is being connected to
project-specific `STATE.md` and `LOG.md` files.

**Changed files:**

- `projects/ezohata-incoming-ledger/STATE.md`
- `projects/ezohata-incoming-ledger/LOG.md`

**What changed:**

- Added initial state file with minimal status, issues, and
  next actions.
- Added initial log file for future project memory updates.

**Checks run:**

- needs verification

**Result:** Minimal project memory entry created.

**Remaining risks:**

- Current production and provider state still need
  verification.

**Next action:** Verify live state and update this log with
the first confirmed project change.

## Rule

Each project change should add a short log entry when the
task affects architecture, production, environment
variables, deploys, authentication, payments, data,
dashboards, or agent workflow.
