# Delivery Outcome Ledger

Last updated: 2026-07-06

Purpose: compact evidence ledger for repeated agent outcomes, false success prevention, provider/live blockers, and lessons that should influence Daily Improve, Morning System Upgrade, and Evening Architecture Review.

## Ledger format

| Date | Project | Signal | Outcome | Evidence | Follow-up |
| --- | --- | --- | --- | --- | --- |
| 2026-07-03 | Psihotavr | Supabase/admin persistence and Google login remain provider/live-sensitive after code work | Routed to provider-readiness issue; not safe for Morning Upgrade to execute directly | `andylitvinov-design/psihotavr#168` | `/delivery` or `/safe` with provider/live proof |
| 2026-07-03 | Finance | strict live `verify:finance` blocked by provider-balance gap | Routed to finance audit issue; no blind financial mutation | `andylitvinov-design/finance#614` | `/audit-fin` strict provider-balance investigation |
| 2026-07-04 | Agent harness | feedback-loop evidence files missing from repo main | Safe docs scaffolds created | Morning System Upgrade 2026-07-04 | Run validators from local checkout |
| 2026-07-04 | Agent harness | Daily Improve narrowed toward bug/risk triage instead of portfolio strategy | Daily Improve contract and live automation prompt updated to require cross-project strategic cards and ready prompts | User correction 2026-07-04; `systems/improve-mode.md`; `projects/codex-automation/automation-prompt-registry.json`; live automation update | Replay/regression candidate must verify strategic output is not only top blockers |
| 2026-07-04 | Agent harness | Morning System Upgrade could finish as smart report without material safe upgrade | `APPLIED_UPGRADE` / `NO_SAFE_UPGRADE` gate added to upgrade protocol and registry | User correction 2026-07-04; `agent-skills/upgrade-daily-protocol.md`; `projects/codex-automation/automation-prompt-registry.json` | Morning run must prove applied safe change or explicit no-safe-upgrade |
| 2026-07-05 | Agent harness | replay/regression artifacts existed but were not read by an explicit validator | Created `scripts/validate-agentic-prompts.mjs` and registered it in automation contracts | Morning System Upgrade 2026-07-05; commit `c61568f`; `projects/codex-automation/automation-prompt-registry.json` | Run Node validation from a real checkout; keep cases candidate until execution evidence exists |
| 2026-07-06 | Agent harness | metrics drift was a known failure mode: counts can disagree with prompt/replay artifacts | Strengthened `scripts/validate-agentic-prompts.mjs` to read `agent-learning-metrics.md` and fail when replay/prompt counts drift from JSON artifacts | Morning System Upgrade 2026-07-06; commits `01a0803`, `736d032`, `7cd219f` | Run all Node validation commands from a checkout and only then count validation passed/failed |

## What to record

Record only evidence-backed outcomes:

- false `SUCCESS` prevented or missed;
- provider/live gate triggered;
- product/risky work converted to ticket;
- prompt regression added or run;
- replay case added or run;
- rule promoted, revised, deprecated, or rejected;
- validation passed/failed;
- user correction that exposes repeated agent failure.

Do not record guesses, raw secrets, or private provider values.
