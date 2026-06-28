# /save Runtime Protocol

This file defines executable `/save` behavior for agents that can read/write Markdown files.

Canonical design spec:

```txt
agent-skills/save.md
```

Related lifecycle specs:

```txt
agent-skills/learn-pass.md
agent-skills/memory-review.md
agent-skills/memory.md
```

---

## Command contract

Run this protocol when the user invokes:

```txt
/save
```

or a strong memory trigger such as:

```txt
память:
ошибка:
правило:
решение:
занеси в память
запомни
```

`/save` is user-directed. Use `/learn-pass` for agent-initiated candidates and metrics.

---

## Runtime steps

### Step 1 — Locate memory root

Find or create:

```txt
agent-memory/
  active.md
  index.md
  archive.md
  mistakes.md
  candidates.md
  metrics.md
  topics/
    delivery.md
    audit.md
    mobile.md
    ux.md
    copy.md
    auth.md
  component-notes/
```

If the repo itself is the brain repo, use its local `agent-memory/` as the repo-local memory store.

---

### Step 2 — Read the smallest useful memory set

Always read:

```txt
agent-memory/active.md
agent-memory/index.md
```

Then classify the `/save` input and read only relevant scoped files:

```txt
agent-memory/topics/<scope>.md
agent-memory/component-notes/<Component>.md
```

Read `mistakes.md` only for repeated mistakes or previous-failure checks.

Read `archive.md` only to resolve old conflicts or replacements.

Read `candidates.md` and `metrics.md` only when updating an existing candidate, promoting a candidate, or recording application evidence.

Never load the full memory tree by default.

---

### Step 3 — Extract the durable lesson

Convert the signal into this object:

```yaml
raw_signal: "original or concise paraphrase"
lesson: "future reusable rule"
type: mistake | rule | product_decision | ux_decision | user_preference | workflow_lesson | component_note
memory_type: procedural | semantic | episodic
scope: global | delivery | audit | UX | copy | mobile | auth | component | page | data
priority: low | medium | high
status: active | candidate | archived | replaced
related_files: []
apply_when: []
check: []
failure_if_ignored: []
avoid: []
evidence: []
last_applied: never
```

If the input is too vague but explicitly asks to save, save a scoped candidate instead of inventing details.

---

### Step 4 — Score save strength

Use the scoring from `agent-skills/save.md`.

```txt
score >= 3 -> save/update
score 1-2  -> candidate unless explicit /save
score <= 0 -> do not save
```

Explicit `/save` normally saves unless the content is unsafe, impossible, or clearly nonsensical.

---

### Step 5 — Upsert, never append blindly

Search active/topic/component/candidate memory for:

```txt
same scope + similar lesson
same scope + contradictory lesson
same component/page
same user preference
same workflow rule
```

Choose one action:

```txt
create
update
merge
replace
archive
candidate
not_saved
```

Rules:

- Similar existing item -> update or merge it.
- Repeated mistake -> update existing item, add concise evidence, and consider higher priority.
- Contradiction -> mark old item `replaced` or narrow scopes.
- New durable lesson -> create a structured item in the right file.
- Weak but plausible lesson -> write/update `candidates.md`.
- One-time tweak -> do not save.

---

### Step 6 — Route to memory files

```txt
mistake -> mistakes.md + relevant topic/component file
rule -> active.md if global/high priority, otherwise topic file
product_decision -> relevant topic file or component note
ux_decision -> topics/ux.md / topics/mobile.md / component note
workflow_lesson -> topics/delivery.md / topics/audit.md / topics/auth.md
user_preference -> active.md if broad, otherwise topic file
component_note -> component-notes/<Component>.md
weak reusable lesson -> candidates.md
application/promotion/failure stats -> metrics.md
old/replaced/noisy item -> archive.md or status=replaced in place
```

When writing to `active.md`, keep it compact. If it grows above 50 rules, run `/memory-review` instead of adding more.

---

### Step 7 — Required entry schema

```md
## YYYY-MM-DD — Short descriptive title

Type: mistake | rule | product_decision | ux_decision | user_preference | workflow_lesson | component_note | candidate_lesson  
Memory type: procedural | semantic | episodic  
Scope: global | delivery | audit | UX | copy | mobile | auth | component | page | data  
Priority: low | medium | high  
Status: active | candidate | archived | replaced  
Replaced by: optional title/id if status is replaced  

User signal:
> Original wording or concise paraphrase.

Evidence:
- Short user correction / task / PR / issue reference.

Lesson:
Clear reusable rule for future agents.

Apply when:
- Situation 1

Check:
- Observable verification that the lesson was applied.

Failure if ignored:
- Concrete repeated problem this prevents.

Avoid:
- Anti-pattern 1

Last applied:
- YYYY-MM-DD — task/PR/issue where used, or `never`

Related files/components:
- optional
```

Active memory is invalid unless it has `Apply when`, `Check`, and `Failure if ignored`.

---

### Step 8 — Update routing and metrics

Update `agent-memory/index.md` when creating a new topic or component note.

Update `metrics.md` when:

- a rule is promoted from candidate to active;
- an active rule was applied during the task;
- a rule needs revision;
- a rule is archived or replaced.

Do not create metrics noise for trivial one-off saves.

---

### Step 9 — Final response

After saving, respond with:

```md
Saved to memory.

Action: created / updated / merged / replaced / archived / candidate / not_saved
Type: ...
Memory type: ...
Scope: ...
Files updated:
- ...

Future agents should apply this when:
- ...

Check:
- ...
```

If not saved:

```md
Not saved as durable memory because this looks like a one-time task detail.
```

---

## Compatibility requirements

This protocol must work in Codex CLI, Codex cloud tasks, Claude Code, GitHub PR tasks, and local terminal agents.

Therefore it must rely only on Markdown files and git-compatible edits. Do not require hidden chat memory, a database, or an agent-specific service.

---

## Safety against memory bloat

The agent must not:

- save every task;
- save one-time visual tweaks;
- keep contradictory active rules;
- load archive/candidates/metrics by default;
- create duplicate topic rules.

The agent must:

- upsert;
- merge duplicates;
- replace contradictions;
- keep active memory small;
- prefer topic consolidation;
- run `/memory-review` when needed.
