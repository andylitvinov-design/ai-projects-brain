# /learn-pass — Agent Self-Learning Pass

`/learn-pass` is the autonomous learning step for agents.

It runs after meaningful work such as `/delivery`, `/audit`, failed checks, blocked deploys, repeated user corrections, or memory-review.

It is different from `/save`:

- `/save` = user-directed memory write.
- `/learn-pass` = agent-initiated reflection that creates candidates, updates metrics, and proposes/promotes rules when evidence is strong.

---

## Goal

Turn agent experience into reusable knowledge without polluting active memory.

The loop is:

```txt
Task experience -> Learning Pass -> candidates.md / metrics.md -> promotion or archive -> active memory
```

---

## Principles from current agent-memory practice

1. Keep raw episodes as evidence; do not overwrite them too aggressively.
2. Consolidate slowly, not after every tiny event.
3. Use candidates before active memory.
4. Promote only repeated, verified, or high-confidence lessons.
5. Track whether active rules are applied and whether they worked.
6. Merge, replace, or archive instead of appending endlessly.

---

## When to run

Run `/learn-pass` automatically after:

- `/delivery` completion;
- `/audit` completion;
- failed build/check/deploy;
- repeated user correction;
- `STATUS: BLOCKED` with a reusable blocker pattern;
- `/memory-review`;
- a task where existing memory was applied.

Do not run it for trivial one-off tasks.

---

## Inputs

Use the smallest useful evidence set:

- user request;
- final result/status;
- files changed;
- checks run;
- blockers;
- applied memory items;
- user correction if any;
- relevant `agent-memory/active.md` and `agent-memory/index.md`;
- relevant topic/component memory.

Do not load archive by default.

---

## Output files

`/learn-pass` may update:

```txt
agent-memory/candidates.md
agent-memory/metrics.md
agent-memory/mistakes.md
agent-memory/topics/<scope>.md
agent-memory/active.md only when promotion criteria are met
```

---

## Candidate entry format

```md
## YYYY-MM-DD — Candidate title

Type: candidate_lesson  
Memory type: procedural | semantic | episodic  
Scope: delivery | audit | UX | copy | mobile | auth | component | page  
Confidence: low | medium | high  
Status: candidate  

Evidence:
- What happened.

Candidate lesson:
Reusable rule that may help future agents.

Apply when:
- Situation where this might help.

Check:
- How to tell if it worked.

Failure if ignored:
- What may go wrong.

Promotion criteria:
- Repeat count >= 2, or user explicitly confirms, or high-risk workflow blocker repeats.

Related active rules:
- optional
```

---

## Metrics entry format

Track active rule performance:

```md
## Rule: <title or stable id>

Scope: ...  
Status: active | candidate | needs_revision | archived  
Times applied: N  
Failures after application: N  
Last applied: YYYY-MM-DD or never  
Confidence: low | medium | high  

Evidence:
- task / PR / issue / correction

Decision:
- keep | revise | promote | archive | replace
```

---

## Decision policy

### Create candidate

Create or update `candidates.md` when:

- lesson seems reusable but evidence is not strong enough;
- issue may repeat;
- agent noticed a process gap;
- old memory was missing or ambiguous.

### Promote to active

Promote only when:

- user explicitly confirms via `/save` or correction;
- same candidate repeats at least twice;
- high-risk workflow issue repeats;
- a rule was applied successfully multiple times and should be easier to load.

### Mark needs revision

Mark a rule as `needs_revision` when:

- it was applied but did not prevent failure;
- it conflicts with newer product behavior;
- it is too vague to verify.

### Archive

Archive when:

- candidate never repeats;
- rule is outdated;
- rule is too local or one-off;
- active memory is noisy.

---

## Required final report section

After `/learn-pass`, report:

```md
## Learning Pass

Applied memory:
- ...

New candidates:
- ...

Updated metrics:
- ...

Promoted / revised / archived:
- ...

Needs user decision:
- ...
```

If no lesson:

```md
## Learning Pass
No durable lesson found.
```

---

## Safety against fake learning

Do not invent lessons just to fill memory.

Do not promote a lesson from a single weak signal.

Do not hide uncertainty.

Do not delete raw evidence when consolidating.

Do not keep contradictory active rules.
