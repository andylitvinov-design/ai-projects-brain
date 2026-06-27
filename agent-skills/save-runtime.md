# /save Runtime Protocol

This file defines the executable behavior of `/save` in any agent environment.

It is tool-agnostic and can be used by Codex, Claude Code, or any repo agent that can read/write files.

Canonical design spec:

```txt
agent-skills/save.md
```

---

## Command contract

When user invokes:

```txt
/save
```

or one of the strong save triggers:

```txt
память:
ошибка:
правило:
решение:
занеси в память
запомни
```

the agent must run this protocol.

---

## Runtime steps

### Step 1 — Locate memory root

Find project memory root:

```txt
./agent-memory
```

If missing, create the standard structure:

```txt
agent-memory/
  active.md
  index.md
  archive.md
  mistakes.md
  topics/
    delivery.md
    audit.md
    mobile.md
    ux.md
    copy.md
    auth.md
  component-notes/
```

If the project is not a product/code repo and is itself a brain repo, use:

```txt
agent-memory/
```

in the current repo as the local memory store.

---

### Step 2 — Read current memory

Always read:

```txt
agent-memory/active.md
agent-memory/index.md
```

Then read likely relevant files based on user input:

```txt
agent-memory/mistakes.md
agent-memory/topics/<scope>.md
agent-memory/component-notes/<Component>.md
```

Do not read `archive.md` unless you are checking for replaced/conflicting old rules.

---

### Step 3 — Extract the durable lesson

Convert user input into this internal object:

```yaml
raw_signal: "original or paraphrased user signal"
lesson: "future reusable rule"
type: mistake | rule | product_decision | ux_decision | user_preference | workflow_lesson | component_note
memory_type: procedural | semantic | episodic
scope: [global | delivery | audit | UX | copy | mobile | auth | component | page]
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

If the input is too vague, ask no clarification unless absolutely necessary. Prefer saving as `candidate` only when the user explicitly used `/save` but the scope is unclear.

---

### Step 4 — Score save strength

Use the scoring from `agent-skills/save.md`.

```txt
score >= 3 -> save/update
score 1-2  -> candidate suggestion unless explicit /save
score <= 0 -> do not save
```

Explicit `/save` normally saves.

Do not save unsafe, impossible, or nonsensical content.

---

### Step 5 — Upsert, never append blindly

Search active/topic/component memory for:

```txt
same scope + similar lesson
same scope + contradictory lesson
same component/page
same user preference
same workflow rule
```

Then choose exactly one action:

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

- Similar existing item -> update/merge it.
- Repeated mistake -> update existing item, add evidence, possibly raise priority.
- Contradiction -> mark old item `replaced` or narrow scopes.
- New durable lesson -> create new item.
- One-time tweak -> do not save.

---

### Step 6 — Route to memory files

Routing table:

```txt
mistake -> mistakes.md + relevant topic/component file
rule -> active.md if global/high priority, otherwise topic file
product_decision -> relevant topic file or component note
ux_decision -> topics/ux.md / topics/mobile.md / component note
workflow_lesson -> topics/delivery.md / topics/audit.md / topics/auth.md
user_preference -> active.md if broad, otherwise topic file
component_note -> component-notes/<Component>.md
```

When writing to `active.md`, keep it compact.

If `active.md` grows above 50 rules, add a visible note that `/memory-review` is required.

---

### Step 7 — Required entry schema

Write memory entries in this format:

```md
## YYYY-MM-DD — Short descriptive title

Type: mistake | rule | product_decision | ux_decision | user_preference | workflow_lesson | component_note  
Memory type: procedural | semantic | episodic  
Scope: global | delivery | audit | UX | copy | mobile | auth | component | page  
Priority: low | medium | high  
Status: active | candidate | archived | replaced  
Replaced by: optional title/id if status is replaced  

User signal:
> Original user wording or concise paraphrase.

Evidence:
- User correction / task / PR / issue that supports this memory item.

Lesson:
Clear reusable rule for future agents.

Apply when:
- Situation 1
- Situation 2

Check:
- Observable verification that the lesson was applied.

Failure if ignored:
- Concrete risk or repeated failure that may happen if this memory is ignored.

Avoid:
- Anti-pattern 1
- Anti-pattern 2

Last applied:
- YYYY-MM-DD — task/PR/issue where this memory was used, or `never`.

Related files/components:
- optional
```

Active memory is invalid unless it has:

```txt
Apply when
Check
Failure if ignored
```

---

### Step 8 — Update index if needed

If a new topic file or component note is created, update:

```txt
agent-memory/index.md
```

Add a short route:

```md
- <scope> -> topics/<scope>.md
- <component> -> component-notes/<Component>.md
```

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

This protocol must work in:

```txt
Codex CLI / Codex cloud tasks
Claude Code
normal GitHub PR tasks
local terminal agents
```

Therefore it must rely only on:

```txt
plain markdown files
git-compatible text edits
no proprietary database
no hidden chat memory
no remote service
```

---

## Safety against memory bloat

The agent must not:

```txt
append raw chat dumps
save every task
save one-time visual tweaks
keep contradictory active rules
load archive by default
create duplicate topic rules
```

The agent must:

```txt
upsert
merge duplicates
replace contradictions
keep active memory small
prefer topic consolidation
run /memory-review when needed
```
