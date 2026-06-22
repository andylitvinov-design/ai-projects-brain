# /delivery Loop Standard

Status: central standard document
Applies to: all active Andrey software projects
Version: 2026-06-13

---

## What /delivery Means

`/delivery` is a full safe release-owner command.

The user types:

```txt
/delivery
Task: [task description]
```

The agent then owns the full release path:

```txt
task → acceptance criteria → implementation → result quality gate
→ local checks → PR → PR health → merge if permitted
→ deployment → live proof → STATUS: SUCCESS or STATUS: BLOCKED
```

No extra delegation language is required. `/delivery` alone is sufficient.

---

## Non-Negotiable Requirements

### SUCCESS requires all of:

- Task implemented.
- Acceptance criteria extracted.
- Every criterion has evidence.
- Result quality gate passed (all items PASS).
- Local checks passed or absence explicitly reported.
- PR created and healthy, or direct-to-main confirmed per project policy.
- Merge completed if safe/permitted.
- Final commit on target branch.
- Deployment provider deployed the final commit.
- Live URL checked and shows expected behavior.

### BLOCKED requires all of:

- Exact external blocker stated.
- Evidence provided.
- Where the loop stopped.
- What is complete vs not complete.
- Required user action.
- Next prompt to run after unblocking.

---

## Result Quality Gate (Mandatory)

Before any final readiness claim:

1. Reread the original task.
2. Extract the Original Request Contract (requirements, edge cases, exclusions, live proof).
3. Verify every item:

| Requirement | Status | Evidence | Verification method |
|---|---|---|---|

Allowed statuses: `PASS`, `PARTIAL`, `FAIL`, `NOT VERIFIED`.

`PARTIAL`, `FAIL`, `NOT VERIFIED` → block STATUS: SUCCESS.
Do not say "done", "ready", "fixed", or "implemented" unless every required item is PASS.

---

## Stop Rules

- Stop after 3 failed fix attempts on the same issue → STATUS: BLOCKED.
- Never touch env vars, secrets, billing, production data without explicit approval.
- Never bypass CI, branch protection, or disable tests.
- Never claim SUCCESS without live proof.
- "Should be live soon" is never a final answer.

---

## Project Adapter Requirements

Every project using /delivery must define:

```txt
Repository:
Default branch:
Target branch:
Package manager:
Framework/runtime:
Build command:
Check command:
CI provider:
Deployment provider:
Primary live URL:  ← SUCCESS target
PR/merge policy:
Safety rules:
```

---

## Final Report Requirements

Every /delivery final report must include:

```txt
STATUS: SUCCESS or BLOCKED
Project adapter
Original task
Acceptance criteria + evidence
Files changed
Local checks run
PR URL or direct-to-main explanation
Merge status + final commit
Deployment status
Live URL + live verification result
Blockers and required action (if any)
COST CONTROL section
```

---

## Active Projects Using This Standard

| Repo | Live URL | Status |
|---|---|---|
| andylitvinov-design/finance | https://ezohata-incoming-ledger.vercel.app | active |
| andylitvinov-design/reiki-yggdrasil | https://2mentalica.vercel.app | active |
| andylitvinov-design/report | https://myalchemy.vercel.app/ | active |
| andylitvinov-design/alchemist | needs verification | less active |
| andylitvinov-design/sales | needs verification | less active |
