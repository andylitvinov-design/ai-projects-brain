# /delivery Completion Program

Status: central reference
Version: 2026-06-13
Source: andylitvinov-design/finance/docs/delivery-loop-completion-program.md

---

## Summary

This document defines the 8-phase program to make `/delivery` a reliable release-owner
loop that finishes only with `STATUS: SUCCESS` or `STATUS: BLOCKED`.

---

## Phase 1 — Command Discovery

Confirm `/delivery` is visible and invocable in Claude Code.

Required files:
- `.claude/commands/delivery.md`
- `.claude/skills/delivery/SKILL.md` (if supported)

Done when: `/delivery` can be invoked locally, or exact discovery blocker is documented.

---

## Phase 2 — Project Adapter and Self-Delegation

`/delivery` must be sufficient by itself — no extra delegation text required.

Required adapter fields:
```
Repository, Default branch, Target branch, Package manager, Framework/runtime,
Build command, Test/check command, CI provider, Deployment provider, Live URL,
PR/merge policy, Safety rules.
```

Done when: user can type `/delivery Task: [task]` and agent owns the full release path.

---

## Phase 3 — Result Quality Gate

Before any final readiness claim:

1. Reread original task.
2. Extract Original Request Contract.
3. Verify every requirement:

| Requirement | Status | Evidence | Verification method |
|---|---|---|---|

Allowed statuses: `PASS`, `PARTIAL`, `FAIL`, `NOT VERIFIED`.
`PARTIAL`, `FAIL`, `NOT VERIFIED` → block STATUS: SUCCESS.

Done when: final report cannot say "done" unless all required items are PASS.

---

## Phase 4 — Local Checks

Required checks before PR or merge:
- Build
- Lint (if available)
- Typecheck (if available)
- Tests (if available)
- Release guard (if project has one)

If no check exists: report explicitly ("Tests: not available").
Never fake passed checks.

Done when: agent has known, repeatable check commands.

---

## Phase 5 — PR Health and Merge Loop

After implementation:
```
create branch → commit → push → create PR → verify CI → fix until green
→ check mergeability → merge if permitted → confirm final commit
```

BLOCKED if: branch protection requires review, merge permission missing,
CI fails after 3 repair attempts.

Done when: PR is not treated as completion; merge is confirmed by final commit on branch.

---

## Phase 6 — Deployment and Live Proof

After merge:
- Verify deployment triggered for final commit.
- Verify deployment targets production, not only preview.
- Verify live URL responds.
- Verify task-specific behavior is visible.

BLOCKED if: deployment pending and cannot be watched; live URL stale after investigation.

Done when: deployment tied to final commit; live proof is task-specific.

---

## Phase 7 — Managed Agent Upgrade Path

Document the managed agent plan per repo. See `systems/managed-delivery-agent-standard.md`.

Done when: on-demand, watchdog, and health-check agents are defined per project.

---

## Phase 8 — End-to-End Pilot

Run `/delivery` on a small safe task (docs-only or harmless tweak).
Verify the system works end-to-end or produces a clean BLOCKED state.

Done when: a real `/delivery` run ends in a clean SUCCESS or BLOCKED with exact evidence.

---

## Definition of Done (All 8 Phases)

- [ ] `/delivery` visible/invocable in Claude Code per project.
- [ ] No extra delegation text required.
- [ ] Project adapter complete per repo.
- [ ] Safety rules enforced.
- [ ] Result quality gate blocks incomplete completion.
- [ ] Local checks known and repeatable.
- [ ] PR health/mergeability loop operational.
- [ ] Merge confirmed by final commit.
- [ ] Deployment tied to final commit.
- [ ] Live proof required for SUCCESS.
- [ ] BLOCKED requires exact blocker and next action.
- [ ] Cost-control section in final report.
- [ ] Managed agent upgrade path documented.
- [ ] Pilot run completed or cleanly blocked.
