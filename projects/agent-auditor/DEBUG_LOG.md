# Debug Log - Agent-Auditor

## 2026-05-05

- Updated `projects/agent-auditor/PROJECT.md` with the new repair-ready Agent-Auditor instruction.
- The instruction now requires: DATA + ROOT CAUSE FIRST, failing-layer proof, live endpoint evidence, JSON/provider parsing checks, finance/provider invariants, ranked severity, and a Codex-ready prompt.
- Added explicit rule that if frontend already uses `response.json().catch(() => null)`, UI should not remain an equal hypothesis for raw JSON parse errors; likely failing layer is API/server/provider parsing and must be proven.
- Commit: `6d4a01b263159d3449d54c3b935f0939afb53aaf`.

## 2026-05-01

- Old browser-audit approach failed due to Google OAuth/private data
  access.
- New direction: data snapshot based audit.
- First target: ezohata-incoming-ledger.
- finance PR #59 merged:
  583c56c42abe5724418d168664a0ed3f821d55a6.
- Runtime hotfix PR #60 merged:
  cc44acce243e44a1a36e3157f9fa1217cc4e62cb.
- Live endpoint verified:
  https://ezohata-incoming-ledger.vercel.app/api/audit-snapshot
  returned HTTP 200 JSON with audit snapshot fields.
