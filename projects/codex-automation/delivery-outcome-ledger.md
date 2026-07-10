# Delivery Outcome Ledger

Last updated: 2026-07-10 Morning System Upgrade

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
| 2026-07-06 | Agent harness | validation evidence propagation drift: PR #95 reports the three validation commands ran, while metrics/handoff still described validation as not run and PR #92 remained stale | PR #96 separated `not run`, `PR-reported run`, raw validation output, and behavior replay evidence; PR #92 was closed unmerged as stale/superseded | `andylitvinov-design/ai-projects-brain#95`; `#96`; closed unmerged `#92` | Do not promote behavior rules until behavior replay or real prevention evidence exists |
| 2026-07-07 | Agent harness | structural validation existed, but behavior replay remained missing/decorative | Added deterministic behavior replay fixtures and runner; validator now checks fixture coverage and metrics alignment | Morning System Upgrade 2026-07-07; `projects/codex-automation/behavior-replay-fixtures.json`; `scripts/run-behavior-replay-fixtures.mjs`; `scripts/validate-agentic-prompts.mjs` | Run `node scripts/run-behavior-replay-fixtures.mjs` and the three validators from checkout; keep behavior rules candidate until output evidence exists |
| 2026-07-08 | Agent harness | validators and fixture runner existed but still had no durable CI path for raw pass/fail logs | Added `.github/workflows/agent-harness-validators.yml`; strengthened `scripts/validate-agentic-prompts.mjs` to require the workflow and all four validation commands | Morning System Upgrade 2026-07-08; commits `62eaf5f`, `c3ba9be`; `automation-prompt-registry.json`; `agent-learning-metrics.md` | Wait for or fetch GitHub Actions raw run evidence; promote only CI/validator coverage after a successful run, not live behavior rules |
| 2026-07-08 | Agent harness | CI workflow and fixture runner are defined, but open safe-harness PR #97 is still unmerged, not mergeable, and has no recorded workflow run evidence | Keep behavior rules candidate; route tomorrow morning to rebase/validate/supersede PR #97 before merging or promoting coverage | `andylitvinov-design/ai-projects-brain#97`; PR head `456ef0c3a2029e27cac3567d6b8f7ed8c97c6a61`; `fetch_commit_workflow_runs` returned no runs | Run all four validators from checkout/CI, then either merge a validated refreshed PR or record exact blocker |
| 2026-07-09 | Agent harness | PR #97 was open, unmergeable, and proposed a real guardrail: behavior fixtures must map to prompt regressions, not only replay cases | Recreated the smallest safe equivalent on fresh `main`: added missing prompt regression IDs, made `validate-agentic-prompts.mjs` require fixture-to-prompt and fixture-to-replay coverage, recorded local deterministic fixture output, and closed PR #97 as superseded | Main commits `3617073`, `25232e5`, `1274d87`; local reconstructed output: `agentic prompt validation ok... fixture-to-prompt coverage checked`; `behavior replay fixtures ok: 5 fixtures, 11 samples (6 expected pass, 5 expected fail)` | Fetch/confirm GitHub Actions raw logs for the full workflow before counting full CI validation passed; keep live behavior rules candidate |
| 2026-07-09 | Agent harness | Morning claimed estimated dashboard deltas after CI raw-evidence artifact capture, but raw CI artifact/job logs were still unavailable | Evening accepted structural artifact-capture and loop-closure improvements, corrected full `Validation evidence` confidence from medium to low, and wrote a safe Morning handoff to unify local+CI raw evidence logging | Evening Architecture Review 2026-07-09; dashboard updated; `fetch_commit_workflow_runs` returned no runs for checked recent harness refs; local `git clone` failed due DNS | Morning `/upgrade`: add `scripts/run-agent-harness-validation-evidence.mjs`, call it from workflow, validate its four commands/log files, and update metrics only from raw output |

| 2026-07-10 | Agent harness | Artifact capture existed but local/CI evidence paths were duplicated and raw passing output had not been fetched | Added one evidence runner, protected it with the prompt validator, reused it in CI, fetched the successful raw job log and four-file artifact, and merged PR #98 | PR #98; merge `d559499`; CI run #40; job `86305828251`; artifact `8220506285`; all four commands exited 0 | Evening verifies post-merge main CI and keeps behavior rules candidate until live prevention evidence exists |

## What to record

Record only evidence-backed outcomes:

- false `SUCCESS` prevented or missed;
- provider/live gate triggered;
- product/risky work converted to ticket;
- prompt regression added or run;
- replay case added or run;
- behavior fixture added or run;
- rule promoted, revised, deprecated, or rejected;
- validation passed/failed;
- user correction that exposes repeated agent failure.

Do not record guesses, raw secrets, or private provider values.