# /memory-review — Maintain Agent Memory

Use `/memory-review` to clean, merge, replace, promote, and archive repo-local agent memory.

This command prevents the learning loop from becoming a large instruction dump.

Canonical related specs:

- `agent-skills/save.md`
- `agent-skills/save-runtime.md`
- `agent-skills/learn-pass.md`
- `agent-skills/memory.md`

---

## Purpose

`/memory-review` is the maintenance step of the loop:

```txt
/save -> apply -> /learn-pass -> candidates/metrics -> review -> active/archive
```

It should improve existing memory. It should not add unrelated new rules.

---

## Trigger

Run `/memory-review` when:

- `active.md` grows too large;
- duplicate or near-duplicate rules appear;
- active rules conflict;
- user says memory is noisy, stale, or inconsistent;
- many saved lessons/candidates have accumulated;
- active rules lack `Apply when`, `Check`, or `Failure if ignored`;
- metrics show rules are never applied or keep failing.

---

## Files to inspect

Always inspect:

- `agent-memory/active.md`
- `agent-memory/index.md`

Inspect only as needed:

- `agent-memory/topics/*.md`
- `agent-memory/component-notes/*.md`
- `agent-memory/candidates.md`
- `agent-memory/metrics.md`
- `agent-memory/mistakes.md`
- `agent-memory/archive.md`

Do not load unrelated topic/component files just because they exist.

---

## Behavior

1. Count active rules before changes.
2. Find duplicates, near-duplicates, vague rules, and missing required fields.
3. Merge similar rules into the strongest scoped entry.
4. Find contradictory active rules.
5. Replace, narrow, or archive conflicting rules.
6. Promote candidates only when evidence is strong enough.
7. Move old, rare, noisy, or never-applied rules out of `active.md`.
8. Ensure every active rule has:
   - `Apply when`
   - `Check`
   - `Failure if ignored`
9. Update `metrics.md` when a rule is kept, revised, promoted, archived, or replaced.
10. Update `index.md` if routing changes.
11. Count active rules after changes.

---

## Status handling

- `active`: compact, reusable, checkable, and worth loading frequently.
- `candidate`: plausible but not yet proven; keep in `candidates.md`.
- `needs_revision`: useful idea but scope/check/evidence is weak; revise before keeping active.
- `replaced`: superseded by a newer rule; include `Replaced by`.
- `archived`: old, rare, too local, outdated, or noisy; keep a short reference, not a long history.

Do not delete important product decisions. Mark them archived or replaced with a clear reference.

---

## Output format

```md
## Memory review complete

Changed files:
- ...

Merged:
- ...

Promoted:
- ...

Replaced:
- ...

Archived:
- ...

Fixed active rules:
- ...

Active memory size:
- before: N
- after: M

Remaining conflicts:
- none / list

Needs user decision:
- none / list
```

---

## Rules

- Do not keep contradictory rules active.
- Do not keep chat transcripts as active memory.
- Prefer one strong topic rule over many repeated small entries.
- Archive long evidence rather than loading it every time.
- If evidence is weak, keep a candidate instead of promoting it.

---

## Compatibility

This command works in Codex, Claude Code, and local agents because it only reads/writes Markdown files in `agent-memory/`.
