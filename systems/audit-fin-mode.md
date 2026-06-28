# Finance Audit Mode

`/audit-fin` is finance-sensitive audit mode. It starts with `/context-scout`
preflight from `systems/context-scout-mode.md`, then audits financial data and
derived totals without unsafe mutation.

## Defaults

- Default period: last 30 days unless the user overrides it.
- Primary alias: finance / ezohata ledger.
- Treat all source records, ownership, currency conversion, and manual edits as
  sensitive.

## Required checks

Always check:

- opening balance
- closing balance
- transaction sums
- account totals
- category totals
- duplicate transactions
- missing transactions
- rounding errors
- currency mismatches
- stale cached totals
- manually edited totals
- balance invariants

Use project memory, safe live/read-only endpoints, repo code, snapshots, and
user-provided exports when available. Mark unavailable data as
`needs verification`.

## Safe auto-fix rules

Auto-fix only deterministic safe issues:

- recalculated totals from intact source transactions;
- rounding normalization;
- cache refresh;
- formatting-only corrections;
- duplicate generated values.

Do not auto-fix unsafe issues:

- missing source transactions;
- unclear account ownership;
- ambiguous currency conversion;
- destructive record changes;
- manual financial edits without evidence.

Unsafe issues must produce:

- what is wrong;
- affected period;
- affected records;
- likely cause;
- recommended fix;
- Codex prompt to fix.

## Report format

- Context bundle summary
- Period audited
- Sources used and unavailable sources
- Finance verification checklist
- Findings by severity
- Safe fixes applied
- Unsafe issues requiring approval/evidence
- Recommended fix order
- Codex prompt to fix
