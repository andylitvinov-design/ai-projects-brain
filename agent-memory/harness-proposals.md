# Harness Proposals

Use this file only during `/upgrade`, `/learn-pass`, or `/memory-review`.

Harness proposals are not active rules until validated and promoted.

## 2026-06-29 — Route `/upgrade` and planner/learn-pass memory explicitly

Type: harness_proposal  
Scope: ai-projects-brain / memory router  
Status: validated_applied  
Risk: low  

Problem:
- `/upgrade` required `harness-proposals.md` and `harness-regression-tests.md`, but the files were missing.
- `agent-memory/index.md` did not route newly created `topics/planner.md` and `topics/learn-pass.md`.
- `active.md` and router templates mentioned the compact lifecycle but did not consistently include `/upgrade`.

Minimal harness change:
- Add missing harness log files.
- Add explicit routes for `topics/planner.md` and `topics/learn-pass.md`.
- Add `/upgrade` to compact memory lifecycle/router text.

Expected behavior change:
- Agents running `/upgrade` can record proposals and regression checks instead of silently skipping the harness layer.
- Agents can find planner and auto-memory rules without loading the whole memory tree.

Regression risk:
- Slightly more files exist in `agent-memory/`, but router rules keep them lazy-loaded and maintenance-only.

Validation plan:
- Check that `active.md` still stays compact.
- Check that `index.md` routes relevant topics and keeps maintenance files out of default load.
- Check that no product/auth/payment/data/deploy files changed.

Validation result:
- Passed by Markdown routing inspection during 2026-06-29 Memory Upgrade automation.

Promotion decision:
- Applied as low-risk Markdown-only harness improvement in `ai-projects-brain`.
