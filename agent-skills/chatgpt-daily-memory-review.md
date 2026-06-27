# ChatGPT Daily Memory Review Automation

This spec defines a daily ChatGPT automation for keeping agent memory compact and useful.

It complements repo-level `/memory-review`.

---

## Schedule

Daily at 08:15 Europe/Tirane.

---

## Goal

Review newly saved agent-memory rules and summarize what should be compacted, merged, clarified, archived, or promoted.

The automation should produce a human-readable report:

```txt
what changed
what was merged
what should be archived
what should be clarified
what active memory should become
```

---

## Scope

Primary source of truth:

```txt
ai-projects-brain
```

Project repos may be reviewed when recent work touched their `agent-memory/` folders.

Recommended priority:

1. `ai-projects-brain`
2. active product repos with recent `agent-memory` changes
3. repos mentioned by the user in recent tasks

---

## Daily procedure

1. Inspect recent changes and saved memory rules.
2. Identify duplicate or overlapping rules.
3. Identify vague rules without `Apply when`, `Check`, or `Failure if ignored`.
4. Identify contradictions or replaced decisions.
5. Propose a compacted version of active memory.
6. Separate proposed changes into:
   - safe automatic cleanup
   - needs user confirmation
   - project-specific follow-up
7. Report before/after summary.

---

## Report format

```md
## Daily memory review — YYYY-MM-DD

### Reviewed
- repo/path

### What was found
- duplicates:
- vague rules:
- conflicts:
- inactive/never-applied rules:

### Proposed compaction
Before:
- ...

After:
- ...

### Recommended actions
- safe to merge:
- archive candidates:
- needs decision:

### Next project follow-up
- ...
```

---

## Important constraints

The automation should not silently rewrite repositories unless explicitly asked in that run.

Default behavior:

```txt
review and report only
```

If the user later asks to apply the review, then update files through GitHub or the relevant repo workflow.

---

## Why this exists

`/save` creates and updates durable memory.

`/memory-review` maintains project memory on demand.

The daily ChatGPT automation gives a regular external review layer so memory does not become noisy, duplicated, or inconsistent.
