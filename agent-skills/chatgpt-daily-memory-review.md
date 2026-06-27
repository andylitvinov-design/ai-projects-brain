# ChatGPT Daily Memory Optimizer Automation

This spec defines a daily ChatGPT automation for keeping agent memory compact, clear, and actively optimized.

It complements repo-level `/memory-review`.

---

## Schedule

Daily at 08:15 Europe/Tirane.

---

## Goal

Optimize newly saved agent-memory rules and memory-related instruction files.

This automation should not merely read and summarize. It should safely improve the instruction set when changes are low-risk and non-destructive.

The automation should produce a human-readable report:

```txt
what was reviewed
what was changed
what was merged
what was archived or marked replaced
what became clearer/shorter
what still needs user decision
```

---

## Scope

Primary source of truth:

```txt
ai-projects-brain
```

Project repos may be optimized when recent work touched their `agent-memory/` folders.

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
5. Identify overlong instructions that can be shortened without losing meaning.
6. Apply safe optimizations directly when repository writes are available.
7. Separate remaining issues into:
   - safely changed
   - patch-ready but not applied
   - needs user decision
   - project-specific follow-up
8. Report before/after summary.

---

## Safe automatic optimizations

The automation may directly update Markdown instruction files when the change is safe and non-destructive:

- merge duplicate rules with the same scope;
- tighten wording while preserving meaning;
- move noisy or low-priority active rules to archive;
- mark superseded rules as `replaced`;
- add missing `Apply when`, `Check`, or `Failure if ignored` when obvious;
- consolidate repeated topic entries into one clearer rule;
- update `index.md` routing if a topic file was renamed or consolidated.

---

## Changes that need user decision

Do not silently apply changes that alter product meaning or remove important decisions.

Ask or report as `needs decision` when:

- two active rules conflict and both may still be valid;
- a product/UX decision appears outdated but not explicitly replaced;
- deleting a rule would remove historical context needed for future work;
- a rule is tied to payments, auth, data deletion, production deploy, or user safety;
- the intended future behavior is ambiguous.

---

## Report format

```md
## Daily memory optimizer — YYYY-MM-DD

### Reviewed
- repo/path

### Changed automatically
- merged:
- shortened:
- archived:
- marked replaced:
- fields fixed:

### Before / after examples
Before:
- ...

After:
- ...

### Needs user decision
- ...

### Files changed
- ...

### Next project follow-up
- ...
```

---

## Important constraints

Default behavior:

```txt
optimize safe Markdown instructions directly; report anything unsafe or ambiguous
```

The automation should not silently rewrite code, product logic, payment/auth rules, or destructive workflows.

Repository writes are allowed only for safe Markdown instruction optimization.

If repository writes are unavailable, produce a patch-ready report instead.

---

## Why this exists

`/save` creates and updates durable memory.

`/memory-review` maintains project memory on demand.

The daily ChatGPT automation provides regular external optimization so memory does not become noisy, duplicated, vague, or inconsistent.
