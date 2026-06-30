# Agent Memory Metrics

Used by `/learn-pass`, `/memory-review`, and `/upgrade`.

Track rule usage, confidence, and keep/revise/archive decisions. Keep entries concise.

## 2026-06-30 — Memory Upgrade automation pass

Type: upgrade_metrics  
Scope: ai-projects-brain / active project memory routers / harness  
Status: recorded

Quality score:
- Memory quality: 2.7/3 — active memory is compact; topic routing exists; no visible active-rule duplicates in the inspected brain files.
- Harness quality: 2.6/3 — `/upgrade` loop has proposal and regression storage; project routers mostly align, with a small maintenance-scope wording drift found in product repos.
- Verification quality: 2.2/3 — regression checks exist and were inspected; executable Markdown validator is still missing.
- Self-learning quality: 2.3/3 — planner/self-save failures are captured in topic memory and regression checks.
- Harness evolution quality: 2.4/3 — proposals are recorded and gated; next improvement is automated validation rather than more instructions.
- Current standards alignment: 2.6/3 — aligned with concise instructions, lazy-loaded topic memory, candidate-before-active promotion, metrics, and human review for risky/global changes.

Operational indicators:
- ignored memory count: 0 new confirmed misses in this pass.
- repeated correction count: 0 new repeated corrections in this pass.
- unreviewed candidates: 0 visible in `candidates.md`.
- unvalidated harness proposals: 1 patch-ready cross-project router wording proposal remains because changing large product `AGENTS.md` files by full-file replacement is higher-risk in this connector pass.
- recurring weakness: project-local `AGENTS.md` router wording can drift from the canonical brain router.

Applied rules:
- compact lifecycle rule: applied.
- auto-memory after assistant-admitted workflow error: no new trigger found; regression check remains active.
- planner one-prompt default: active and routed via `topics/planner.md`.
- safe Markdown-only upgrade policy: applied; no product/auth/payment/data/deploy logic changed.

Next measurement idea:
- Add a lightweight Markdown validation script that checks required files, router entries, mandatory fields, and maintenance-file scope alignment across active repos.

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
