# /memory-review — Maintain Agent Memory

Use `/memory-review` to clean, merge, replace, and archive memory.

This command prevents the learning loop from becoming a giant instruction dump.

Canonical related specs:

- `agent-skills/save.md`
- `agent-skills/save-runtime.md`
- `agent-skills/memory.md`

---

## Purpose

`/memory-review` is the maintenance part of the loop:

```txt
Save -> Apply -> Check -> Prune
```

It does not add random new rules. It improves the existing memory set.

---

## Trigger

Run `/memory-review` when:

- `active.md` grows too large;
- duplicate rules appear;
- active rules conflict;
- user says memory is noisy or inconsistent;
- many saved lessons have accumulated;
- active rules have no `Apply when`, `Check`, or `Failure if ignored`;
- many active rules have never been applied.

---

## Behavior

1. Locate local `agent-memory/`.
2. Read `active.md`, `index.md`, topic files, component notes, and archive only as needed.
3. Find duplicate or near-duplicate rules.
4. Merge similar rules.
5. Find contradictory active rules.
6. Replace, narrow, or archive conflicting rules.
7. Ensure every active rule has:
   - `Apply when`
   - `Check`
   - `Failure if ignored`
8. Move old/rare/noisy rules out of `active.md`.
9. Keep `active.md` compact.
10. Update `index.md` if routing changed.

---

## Output format

```md
## Memory review complete

Merged:
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
```

---

## Rules

- Do not delete important product decisions without marking them archived or replaced.
- Do not keep contradictory rules active.
- Do not keep raw chat snippets as active memory.
- Prefer one strong topic rule over many repeated small entries.
- Archive old evidence rather than loading it every time.

---

## Compatibility

This command works in Codex, Claude Code, and local agents because it only reads/writes Markdown files in `agent-memory/`.
