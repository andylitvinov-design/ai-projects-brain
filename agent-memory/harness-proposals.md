# Harness Proposals

Use this file only during `/upgrade`, `/learn-pass`, or `/memory-review`.

Harness proposals are not active rules until validated and promoted.

## 2026-06-30 — Detect maintenance-scope drift in project routers

Type: harness_proposal  
Scope: ai-projects-brain / active project routers  
Status: patch_ready_pending  
Risk: low_to_medium

Problem:
- Canonical brain router allows `archive.md` for conflict resolution or `/memory-review`, and allows `candidates.md`, `metrics.md`, `harness-proposals.md`, and `harness-regression-tests.md` during `/learn-pass`, `/memory-review`, or `/upgrade`.
- Active product repo routers inspected today still use narrower wording for harness proposals/tests: only `/upgrade`.
- This can cause `/learn-pass` or `/memory-review` to miss proposal/regression context even though their local harness files say they are valid in those modes.

Minimal harness change:
- In active project `AGENTS.md` memory-router sections, replace the three separate maintenance bullets with canonical wording:
  - Do not load `archive.md` unless resolving conflicts or running `/memory-review`.
  - Do not load `candidates.md`, `metrics.md`, `harness-proposals.md`, or `harness-regression-tests.md` unless running `/learn-pass`, `/memory-review`, or `/upgrade`.
  - If `mistakes.md` exists, load it only for `/learn-pass`, `/memory-review`, `/upgrade`, or conflict resolution.

Expected behavior change:
- `/learn-pass` and `/memory-review` can inspect harness proposals/regression checks when needed.
- Normal `/delivery` and `/audit` still avoid loading maintenance files.

Regression risk:
- Low behavior risk but medium edit risk in this connector pass because some active `AGENTS.md` files are large and full-file replacement could accidentally rewrite unrelated local rules.

Validation plan:
- Diff only the memory-router bullets.
- Confirm product code, auth, payments, data, deploy, formulas, and app source are unchanged.
- Re-check that default `/delivery` and `/audit` do not load maintenance files.

Validation result:
- Not auto-applied in product repos during this pass; recorded as patch-ready handoff.

Promotion decision:
- Patch-ready; safe for Codex/local branch with narrow diff and review.

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
