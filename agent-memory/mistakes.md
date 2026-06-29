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
