# Repeated Mistakes Log

Use this file only during `/learn-pass`, `/memory-review`, `/upgrade`, or conflict resolution.

Purpose: keep concise evidence of repeated workflow failures and corrected behavior. Do not use this as a raw transcript.

## 2026-06-29 — Missed self-save after workflow error

Type: repeated_failure  
Scope: ChatGPT / `/planner` / auto-memory  
Status: converted_to_topic_memory  
Related memory: `agent-memory/topics/learn-pass.md`, `agent-memory/topics/planner.md`

Failure:
- Assistant acknowledged a reusable workflow error but did not immediately write it to memory.
- Assistant also gave `/planner` output as a multi-artifact issue workflow when the user expected one Codex-ready prompt.

Correct behavior:
- If the assistant admits a repeatable workflow error, write/update memory immediately when repository access is available.
- For `/planner`, default to one copy-paste-ready Codex/Claude prompt unless the user explicitly requests separate GitHub issue text.

Regression check:
- See `agent-memory/harness-regression-tests.md` R001 and R003.

## 2026-07-19 — Rapid follow-up PR cascade after partial-path validation

Type: repeated_failure  
Scope: harness / dashboard publication / strategic evidence  
Status: converted_to_topic_memory_and_active_gate  
Related memory: `agent-memory/topics/harness-stabilization.md`  
Related rule: `systems/harness-stabilization-gate.md`

Failure:
- Related harness PRs repeatedly repaired adjacent layers only after the preceding PR was merged or exercised.
- Fresh-main and duplicate-work gates prevented parallel duplicates but did not stop sequential corrective PR cascades.
- Green PR checks were sometimes treated as enough to continue feature growth before one clean scheduled/provider/public cycle existed.

Correct behavior:
- Enter stabilization mode after two post-merge regressions in 24 hours or three related PRs in 72 hours.
- Freeze unrelated feature growth, use one stabilization PR, replay the full affected safe path, and require one clean scheduled or production-equivalent cycle before `STABILIZED_VERIFIED`.

Regression check:
- Weekly Agent Harness Review must report trigger count, stabilization PR, CI, and clean-cycle evidence.
