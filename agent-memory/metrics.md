# Agent Memory Metrics

Used by `/learn-pass`, `/memory-review`, and `/upgrade`.

Track rule usage, confidence, and keep/revise/archive decisions. Keep entries concise.

## 2026-06-29 — Memory Upgrade automation pass

Type: upgrade_metrics  
Scope: ai-projects-brain / agent-memory / harness  
Status: recorded

Quality score:
- Memory quality: 2.5/3 — compact active memory and topic routing exist; missing maintenance files were added.
- Harness quality: 2.5/3 — `/upgrade` loop and safe auto-apply policy exist; router/template gaps were tightened.
- Verification quality: 2/3 — checklist/regression files now exist; no executable Markdown checker yet.
- Self-learning quality: 2/3 — auto-memory trigger exists; regression check R003 added for missed workflow-memory updates.
- Harness evolution quality: 2/3 — proposal/regression storage now exists.
- Current standards alignment: 2.5/3 — aligned with routing, lazy-loaded skills, candidates, metrics, validation, and review gates.

Operational indicators:
- ignored memory count: 1 recent user-confirmed miss converted to memory.
- repeated correction count: 1 planner-format correction converted to topic memory.
- unreviewed candidates: 0 visible in `candidates.md`.
- unvalidated harness proposals: 0 after this pass.

Applied rules:
- compact lifecycle rule: applied.
- auto-memory after assistant-admitted workflow error: applied.
- planner one-prompt default: routed via `topics/planner.md`.

Next measurement idea:
- Add a lightweight Markdown validation script that checks required files, router entries, and mandatory fields.
