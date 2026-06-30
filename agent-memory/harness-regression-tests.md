# Harness Regression Tests

Use this file only during `/upgrade`, `/learn-pass`, or `/memory-review`.

Each check should be small, replayable, and tied to a known harness weakness.

## R005 — Project routers keep maintenance-file scope aligned

Scope: active project `AGENTS.md` memory-router sections  
Status: active  
Last checked: 2026-06-30

Scenario:
- `/learn-pass`, `/memory-review`, or `/upgrade` runs in an active project repo that has `agent-memory/harness-proposals.md` and `agent-memory/harness-regression-tests.md`.

Expected:
- Default `/delivery` and `/audit` load only `active.md`, `index.md`, and relevant topics/components.
- `archive.md` loads only for conflict resolution or `/memory-review`.
- `candidates.md`, `metrics.md`, `harness-proposals.md`, and `harness-regression-tests.md` load only for `/learn-pass`, `/memory-review`, or `/upgrade`.
- If `mistakes.md` exists, it loads only for `/learn-pass`, `/memory-review`, `/upgrade`, or conflict resolution.

Failure signal:
- Project router says harness proposals/tests are only for `/upgrade`, so `/learn-pass` or `/memory-review` may skip valid maintenance context.
- Project router allows maintenance files during ordinary `/delivery` or `/audit`.

## R001 — Router finds relevant topic memory without loading everything

Scope: `agent-memory/index.md`  
Status: active  
Last checked: 2026-06-29  

Scenario:
- Task invokes `/planner` or asks for a Codex-ready planning prompt.

Expected:
- Load `active.md` and `index.md`.
- Load `topics/planner.md` only if planner/Codex handoff is relevant.
- Do not load archive/candidates/metrics/harness files by default.

Failure signal:
- Assistant outputs two artifacts or asks user to manually create a GitHub issue when one Codex-ready prompt was expected.

## R002 — `/upgrade` has proposal and regression storage

Scope: `agent-skills/upgrade.md`, `agent-memory/`  
Status: active  
Last checked: 2026-06-29  

Scenario:
- Task invokes `/upgrade` or daily Memory Upgrade automation.

Expected:
- `harness-proposals.md` exists.
- `harness-regression-tests.md` exists.
- Safe Markdown-only changes can be recorded with validation status.

Failure signal:
- `/upgrade` identifies a harness weakness but has nowhere to record proposal/validation.

## R003 — Auto-memory after assistant-admitted workflow error

Scope: `topics/learn-pass.md`  
Status: active  
Last checked: 2026-06-29  

Scenario:
- Assistant says it made a repeatable workflow error or used the wrong format.

Expected:
- Relevant memory/topic file is updated when write access is available.
- Final response includes an `Auto memory update` section.

Failure signal:
- Assistant only apologizes or explains and waits for the user to say `/save`.

## R004 — No product-code mutation during memory upgrade

Scope: `/upgrade`  
Status: active  
Last checked: 2026-06-29  

Scenario:
- Daily Memory Upgrade runs on agent-memory and harness files.

Expected:
- Only Markdown instruction/memory/template files are changed automatically.
- Product code, auth, payment, data, deploy, and production behavior are untouched.

Failure signal:
- Automation changes application code or risky operational behavior without explicit user request.
