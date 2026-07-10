# Delivery Outcome Ledger

Last updated: 2026-07-10 Evening Architecture Review

Purpose: compact evidence ledger for repeated agent outcomes, false success prevention, provider/live blockers, and lessons that should influence Daily Improve, Morning System Upgrade, and Evening Architecture Review.

## Ledger format

| Date | Project | Signal | Outcome | Evidence | Follow-up |
| --- | --- | --- | --- | --- | --- |
| 2026-07-03 | Psihotavr | Supabase/admin persistence and Google login remain provider/live-sensitive after code work | Routed to provider-readiness issue; not safe for Morning Upgrade to execute directly | `andylitvinov-design/psihotavr#168` | `/delivery` or `/safe` with provider/live proof |
| 2026-07-03 | Finance | strict live `verify:finance` blocked by provider-balance gap | Routed to finance audit issue; no blind financial mutation | `andylitvinov-design/finance#614` | `/audit-fin` strict provider-balance investigation |
| 2026-07-04 | Agent harness | feedback-loop evidence files missing from repo main | Safe docs scaffolds created | Morning System Upgrade 2026-07-04 | Run validators from local checkout |
| 2026-07-04 | Agent harness | Daily Improve narrowed toward bug/risk triage instead of portfolio strategy | Daily Improve contract and live automation prompt updated to require cross-project strategic cards and ready prompts | User correction 2026-07-04; `systems/improve-mode.md`; automation registry | Keep strategic portfolio regression candidate until live prevention evidence |
| 2026-07-04 | Agent harness | Morning System Upgrade could finish as smart report without material safe upgrade | `APPLIED_UPGRADE` / `NO_SAFE_UPGRADE` gate added | User correction 2026-07-04; upgrade protocol; automation registry | Morning run must prove applied safe change or explicit no-safe-upgrade |
| 2026-07-05 | Agent harness | replay/regression artifacts existed but were not read by an explicit validator | Created `scripts/validate-agentic-prompts.mjs` | Morning System Upgrade 2026-07-05; commit `c61568f` | Run validation from checkout; keep behavior rules candidate |
| 2026-07-06 | Agent harness | metric counts could drift from prompt/replay artifacts | Validator strengthened to read learning metrics and fail on count drift | Morning System Upgrade 2026-07-06 | Count validation only from output evidence |
| 2026-07-06 | Agent harness | PR-reported validation and metrics wording disagreed | PR #96 separated not-run, PR-reported, raw-output, and behavior evidence | PR #95; PR #96; stale PR #92 closed | Do not promote behavior rules without replay/prevention evidence |
| 2026-07-07 | Agent harness | structural validation existed but behavior replay was decorative | Added deterministic behavior fixtures and runner | behavior fixtures; fixture runner; prompt validator | Run fixture evidence in checkout/CI |
| 2026-07-08 | Agent harness | validators lacked a durable CI path | Added Agent Harness Validators workflow and four-command contract | commits `62eaf5f`, `c3ba9be` | Fetch raw workflow evidence before promotion |
| 2026-07-08 | Agent harness | safe-harness PR #97 was stale/unmergeable and lacked workflow evidence | Kept rules candidate and routed fresh-main reconciliation | PR #97; no workflow run | Recreate smallest safe equivalent on current main |
| 2026-07-09 | Agent harness | fixture IDs mapped to replay cases but not all prompt regressions | Added missing prompt IDs and bidirectional mapping checks; closed PR #97 as superseded | commits `3617073`, `25232e5`, `1274d87`; deterministic fixture output | Fetch full CI raw logs before counting full validation |
| 2026-07-09 | Agent harness | Artifact capture was defined but raw CI output remained unavailable | Evening corrected validation confidence and handed off one local+CI runner | Evening Review 2026-07-09 | Add unified runner and fetch raw output |
| 2026-07-10 | Agent harness | Local and CI evidence paths were duplicated and raw passing output had not been fetched | Added one evidence runner, protected it, reused it in CI, fetched successful job/artifact, and merged PR #98 | PR #98; merge `d559499`; run #40; artifact `8220506285` | Evening verifies repeatability and keeps behavior rules candidate |
| 2026-07-10 | Agent harness / automations | Registry described Morning Upgrade as active, but the live recurring schedule was disabled after a successful run | Evening detected the live-state drift, re-enabled the existing schedule without duplication, fetched repeat CI run #42/artifact, and queued a scheduler-liveness regression | Live Automations state; run #42; artifact `8220573543`; Evening Review 2026-07-10 | Morning adds `recurring-automation-disabled-after-successful-run` prompt/replay/fixture coverage and scheduler-liveness evidence ladder |

## What to record

Record only evidence-backed outcomes:

- false `SUCCESS` prevented or missed;
- provider/live gate triggered;
- product/risky work converted to ticket;
- prompt regression added or run;
- replay case added or run;
- behavior fixture added or run;
- automation registry/live-state drift detected or repaired;
- rule promoted, revised, deprecated, or rejected;
- validation passed/failed;
- user correction that exposes repeated agent failure.

Do not record guesses, raw secrets, or private provider values.
