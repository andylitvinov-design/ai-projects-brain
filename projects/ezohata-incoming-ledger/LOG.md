# Project Log — ezohata-incoming-ledger

## 2026-05-09 — Debugger roadmap and observability refresh

**Task:** Refresh project memory after Ezohata Ledger debugger/autonomy work.

**Context:** The app received production debugger infrastructure and safer provider/UI diagnostics. Project memory was stale and pointed agents to outdated repo/source assumptions.

**Changed facts:**

- Canonical repo is now `andylitvinov-design/ezohata-incoming-ledger`.
- Production URL is `https://ezohata-incoming-ledger.vercel.app`.
- Default first probe is `/api/debug-full?from=&to=`.
- Debug endpoints include `/api/status`, `/api/debug-health`, `/api/audit-snapshot`, `/api/debug-analytics`, `/api/debug-balance-reconciliation`, `/api/debug-full`.
- Normal UI hides debug tools; `?debug=1` enables debug helpers.
- Current model is legacy manual finance tabs; ledger-v2 `amount_net` is not proven.
- Likely balance source is private sheet `Остатки`.
- Paid display and pay remaining invariants were documented.
- Wise provider non-JSON errors were hardened.

**Checks:**

- App PRs were merged with Vercel success during the debugger roadmap work.
- Memory repo validation not run in connector session; run `node scripts/validate-projects-brain.mjs` before/after PR if available.

**Remaining risks:**

- Full private `Остатки` reconciliation still needs browser state or a safe credential path.
- TD Bank route mapping needs verification.
- Live endpoint bodies should be checked before claims on concrete bugs.

## 2026-04-29 — Initial memory files

**Task:** Create minimal project memory entry for ezohata-incoming-ledger.

**Context:** Unified memory system was being connected to project-specific `STATE.md` and `LOG.md` files.

**Changed files:**

- `projects/ezohata-incoming-ledger/STATE.md`
- `projects/ezohata-incoming-ledger/LOG.md`

**Result:** Minimal project memory entry created.

**Remaining risks:** Current production and provider state needed verification at that time.

## Rule

Each project change should add a short log entry when the task affects architecture, production, environment variables, deploys, authentication, payments, data, dashboards, or agent workflow.
