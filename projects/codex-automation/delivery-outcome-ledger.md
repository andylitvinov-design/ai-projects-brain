# Delivery Outcome Ledger

Last updated: 2026-07-11 Evening Architecture Review

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
| 2026-07-11 | Agent harness / automations | Required recurring-loop liveness had no regression, replay fixture, registry evidence ladder, or duplicate-safe repair contract | Added the mapped scheduler-liveness class, a four-level registry ladder, validator protection, and required-loop internal guardrail; live check proved one enabled Morning schedule and no duplicate | PR #101; live Automations check; runs #47 and #53; 7 prompt regressions, 6 replay cases, 6 fixtures, 14 samples | Evening verifies the schedule remains enabled after success; keep the behavior rule candidate until repeated or real prevention evidence |
| 2026-07-11 | Agent harness validation | First liveness fixture evaluator rejected a good negated instruction because substring matching was overbroad | Raw failure artifact was inspected; only the matcher was narrowed; the full unified runner then passed | run #46 failed with artifact `8246247986`; fix commit `626f058`; runs #47 and #53 passed | Preserve failure→root cause→narrow fix→green evidence instead of hiding the failed run |
| 2026-07-11 | brain-management / production | Canonical July dashboard existed while Cloudflare production remained stale; the earlier workflow could make missing provider credentials look like a healthy skip | Existing Netlify site was used for a verified production release; issue #28 closed and PR #29 documented Netlify as production, Cloudflare as legacy | Netlify deploy `6a5207d064f1feba62676b5e`; site `98712296-45be-4c0d-af99-d4ed19507e0e`; issue #28; PR #29 | Verify automatic GitHub `main` → existing Netlify site publication through `/delivery /safe`; do not create another site |
| 2026-07-11 | Agent harness / dashboard | Canonical dashboard, mirror JSON, provider deploy, and live freshness can diverge while each layer appears individually healthy | Evening proposed candidate `dashboard-canonical-live-freshness-drift` and a four-level publication evidence ladder; no provider mutation performed | Evening dashboard update; Netlify production evidence; legacy URL found in canonical/mirror sources | Morning adds prompt/replay/fixture/validator coverage; provider integration routes to `/delivery /safe` |
| 2026-07-11 | Agent interaction | User again asked whether the assistant would complete the task directly or only provide a Codex prompt | Direct provider delivery was eventually completed, but the correction was recorded as repeated pain rather than erased by the later success | User correction 2026-07-11; completed Netlify outcome | Prefer direct safe execution first; provide a prompt only for the exact remaining blocker |

## What to record

Record only evidence-backed outcomes:

- false `SUCCESS` prevented or missed;
- provider/live gate triggered;
- product/risky work converted to ticket;
- prompt regression added or run;
- replay case added or run;
- behavior fixture added or run;
- automation registry/live-state drift detected or repaired;
- dashboard canonical/mirror/deploy/live freshness drift detected or prevented;
- rule promoted, revised, deprecated, or rejected;
- validation passed/failed and recovery evidence;
- user correction that exposes repeated agent failure.

Do not record guesses, raw secrets, or private provider values.
