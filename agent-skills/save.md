# /save — Durable Agent Memory Skill

## Purpose

`/save` is a reusable agent skill for converting important user feedback from a chat/task into durable project memory.

It is not a generic note-taking command.

Its goal is to create a real learning loop:

```txt
Save -> Apply -> Check -> Prune
```

A memory item is valid only if it can help a future agent avoid a repeated mistake, follow a stable user preference, respect a product decision, or improve workflow execution.

---

## Core principle

```txt
Memory is not a log.
Memory is a compact, scoped, checkable instruction system.
```

Do not append every user message to memory.

Save only reusable lessons.

---

## Key invariant

`/save` must behave as **upsert**, not append.

```txt
Find similar memory -> update / merge / replace
No similar memory -> create new structured memory
```

Never blindly add another paragraph to the end of a file.

The skill is a **memory governance operator**. It must:

1. filter weak signals;
2. classify the lesson;
3. route it to the right file;
4. merge or replace similar memory;
5. make the rule checkable;
6. prevent memory bloat.

---

## Memory types

Every saved lesson should be understood as one or more memory types.

### 1. Procedural memory

How the agent should work.

Examples:

```txt
In /delivery, do not ask for unnecessary confirmations.
If auth blocks live verification, verify public parts and document the blocker.
```

Usually stored in:

```txt
/agent-memory/active.md
/agent-memory/topics/delivery.md
/agent-memory/topics/audit.md
/agent-memory/topics/auth.md
```

### 2. Semantic memory

What is true about the product, user preferences, product decisions, UX, or architecture.

Examples:

```txt
The Orders page should not contain a standalone photo gallery.
Client-facing copy should be compact and plain-language.
```

Usually stored in:

```txt
/agent-memory/topics/ux.md
/agent-memory/topics/copy.md
/agent-memory/topics/<feature>.md
/agent-memory/component-notes/<Component>.md
```

### 3. Episodic memory

What happened, what went wrong, and why a lesson was created.

Examples:

```txt
The agent collapsed mobile navigation into a hamburger again; the user corrected it.
The agent made AI intake copy too long; the user requested a shorter client-facing style.
```

Usually stored in:

```txt
/agent-memory/mistakes.md
```

Important:

Episodic memory should normally produce a derived procedural or semantic rule. Do not keep raw complaints without a future lesson.

---

## When this skill is triggered

Run this skill when the user explicitly writes one of these commands or phrases:

```txt
/save
save this
занеси в память
запомни
память:
ошибка:
правило:
решение:
```

Also consider running it when a strong learning signal appears during `/delivery` or `/audit`, especially:

```txt
опять
снова
я уже просил
мы это уже исправляли
как раньше
верни как было
не надо так
всегда
никогда
во всём проекте
для всех страниц
```

Automatic saving must be conservative. If the signal is weak, suggest a candidate lesson instead of saving it.

---

## What to save

Save only durable lessons likely to matter again.

### 1. Agent mistakes

When the agent did something wrong, repeated a previous error, ignored a prior decision, or misunderstood the product.

Example:

```txt
/save
ошибка: агент опять свернул верхнее меню в бургер
правильно: верхнее меню на мобильном должно быть сразу развернуто
область: mobile UX / Layout
```

### 2. Agent operating rules

Rules about how the agent should work in future tasks.

Example:

```txt
/save
правило: в /delivery не спрашивать подтверждения, если действие не разрушительное, не платное и не удаляет данные
область: delivery workflow
```

### 3. Product or UX decisions

Decisions about how the product should behave or look.

Example:

```txt
/save
решение: во вкладке «Мои заказы» не должно быть фотогалереи, только аккуратные карточки заказов и горизонтальный поиск услуг
область: Orders / UX
```

### 4. Stable user preferences

Reusable style or behavior preferences.

Example:

```txt
/save
память: клиентские экраны должны быть короткими, спокойными, понятными обычному человеку и без профессионального жаргона
область: UX / copy
```

### 5. Workflow lessons

Lessons about delivery, audit, testing, deployment, auth blockers, verification, GitHub, confirmation policy, or live proof.

Example:

```txt
/save
память: если Google Auth блокирует live-проверку, всё равно проверить публичные части и явно указать, что именно не удалось проверить
область: auth / live verification
```

---

## What not to save

Do not save:

- one-time small visual tweaks;
- temporary experiments;
- pixel-level adjustments;
- random emotional reactions without an actionable lesson;
- exact colors, margins, or wording unless the user says it is a rule;
- implementation details already obvious from code;
- normal task requirements that do not imply a future rule.

Examples not to save:

```txt
сделай эту кнопку чуть выше
```

```txt
на этой картинке сделай мягче и дороже
```

```txt
поменяй это слово здесь
```

Unless the user explicitly says this should become a rule for the future.

---

## Save scoring

Use this scoring to decide whether to save automatically.

```txt
Save if score >= 3.
```

Signals:

```txt
+3 explicit /save, память, правило, решение, ошибка
+2 user says: опять, снова, я уже просил, как раньше, верни как было
+2 affects future /delivery, /audit, deploy, auth, live verification
+2 product decision that should not be overwritten later
+1 stable UX/style preference
+1 repeated mistake
-2 one-time small visual tweak
-2 temporary experiment
-2 purely local content change
```

Rules:

- If score >= 3: save or update existing memory.
- If score is 1–2: create a candidate suggestion, do not save automatically.
- If score <= 0: do not save.
- Explicit `/save` always saves unless the content is unsafe, impossible, or clearly nonsensical.

---

## Required memory structure in project repos

Each project that uses this skill should maintain local project memory:

```txt
/agent-memory/
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

This brain repo defines the mechanism.

Project repos store concrete local memory.

---

## Memory file roles

### `/agent-memory/active.md`

Small active memory always read before `/delivery` and `/audit`.

Hard cap:

```txt
30–50 active rules maximum
```

If the file grows beyond this, run `/memory-review`.

### `/agent-memory/index.md`

Map of memory topics and where agents should look.

### `/agent-memory/mistakes.md`

Durable mistake log with corrected behavior.

This is not a raw complaint log. Each entry must include the future correction and ideally a derived procedural or semantic rule.

### `/agent-memory/topics/*.md`

Scoped topic documents, such as delivery, mobile, UX, copy, auth.

Prefer consolidated topic sections over many tiny repeated entries.

### `/agent-memory/component-notes/*.md`

Rules for specific components or pages.

### `/agent-memory/archive.md`

Old, low-priority, replaced, or rare lessons.

Do not load archive by default.

---

## Entry format

Every saved item must use this format:

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

Every active item must include:

```txt
Apply when
Check
Failure if ignored
```

Recommended fields for all active high-priority rules:

```txt
Evidence
Last applied
```

If an item cannot be applied or checked, it must not be active memory.

---

## Status semantics

### `active`

Loaded by default when relevant. Must be reusable, scoped, and checkable.

### `candidate`

Potentially useful but not strong enough yet. Do not load by default unless the task is directly related.

### `archived`

Old, rare, noisy, low-priority, or no longer generally useful. Do not load by default.

### `replaced`

A previous rule/decision that has been superseded by a newer rule.

Important:

Do not keep contradictory rules active. If a new user decision overrides an old one, mark the old item as `replaced` and link to the new item.

---

## Classification guide

### Mistake

Use when the agent did something wrong.

Memory type:

```txt
episodic + derived procedural/semantic
```

Saved mainly to:

```txt
mistakes.md
relevant topic file
component-notes/<Component>.md when applicable
```

### Rule

Use when the user defines how agents should behave.

Memory type:

```txt
procedural
```

Saved mainly to:

```txt
active.md if global/high priority
topics/delivery.md or topics/audit.md if workflow-specific
```

### Product decision

Use when the user defines how the product should work.

Memory type:

```txt
semantic
```

Saved mainly to:

```txt
relevant topic file
component-notes/<Component>.md
```

### User preference

Use when the user defines a stable style preference.

Memory type:

```txt
semantic + sometimes procedural
```

Saved mainly to:

```txt
active.md if broad and frequent
relevant topic file otherwise
```

### Workflow lesson

Use for delivery, audit, testing, deploy, GitHub, auth, verification.

Memory type:

```txt
procedural
```

Saved mainly to:

```txt
topics/delivery.md
topics/audit.md
topics/auth.md
active.md if critical
```

---

## Routing algorithm

When `/save` is triggered:

1. Read the user message and immediate surrounding context.
2. Extract only the reusable lesson.
3. Classify the lesson type.
4. Assign memory type: procedural / semantic / episodic.
5. Determine scope.
6. Determine priority.
7. Search existing memory for similar or conflicting rules.
8. If similar memory exists, update/merge instead of adding a new entry.
9. If conflicting active memory exists, decide whether to replace it or keep both only if scopes differ.
10. Save to the correct file.
11. Ensure `Apply when`, `Check`, and `Failure if ignored` exist.
12. Add or update `Evidence`.
13. Set `Last applied` to `never` unless this save occurs during a task where the lesson was already applied.
14. Report exactly what was saved, updated, replaced, or not saved.

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

---

## Upsert behavior

`/save` must use this write strategy:

```txt
1. Search for same scope + similar lesson.
2. Search for same scope + contradictory lesson.
3. If same/similar exists: update existing entry.
4. If contradictory exists: mark old entry as replaced or narrow scopes.
5. If no related item exists: create new entry.
```

Examples:

### Similar rule

Existing:

```txt
Mobile nav should stay expanded.
```

New:

```txt
Again, do not turn top navigation into hamburger.
```

Action:

```txt
Update the existing mobile navigation rule. Add evidence/repeated signal. Do not create a duplicate.
```

### Contradictory rule

Existing active rule:

```txt
Mobile nav must always stay expanded.
```

New user decision:

```txt
On very small screens, use a compact drawer.
```

Action:

```txt
Do not keep both as broad active rules.
Replace the old broad rule or narrow it to larger mobile/tablet widths.
Mark the old broad rule as replaced if fully superseded.
```

---

## Duplicate prevention

Before writing a new item, search memory for related wording and scope.

If similar rule exists:

- do not duplicate;
- merge the new signal into the existing rule;
- update `User signal` or add a short `Repeated signal` line;
- increase priority if the error repeated;
- improve `Check` if the previous version was vague;
- add or update `Evidence`;
- preserve a concise history only if it helps future decisions.

Memory should consolidate into topic documents, not grow as many small repeated entries.

---

## Topic document consolidation

Prefer this:

```txt
topics/mobile.md -> one consolidated section for mobile navigation rules
```

Over this:

```txt
10 separate entries saying not to collapse the menu
```

A topic document should summarize the current active rule and keep only minimal evidence/history needed to understand why it exists.

---

## Required final response after /save

After saving, respond briefly:

```md
Saved to memory.

Action: created / updated / replaced / archived / candidate
Type: mistake / rule / decision / preference / workflow lesson
Memory type: procedural / semantic / episodic
Scope: ...
Files updated:
- /agent-memory/...

Future agents should apply this when:
- ...

Check:
- ...
```

If not saved:

```md
Not saved as durable memory because this looks like a one-time task detail.
```

If uncertain:

```md
I treated this as a candidate lesson, not active memory, because it may be one-time.
```

If a rule was replaced:

```md
Updated memory.

Replaced old active rule:
- ...

New active rule:
- ...
```

---

## How /delivery must use saved memory

At the beginning of `/delivery`:

1. Read `/agent-memory/active.md`.
2. Read `/agent-memory/index.md`.
3. Classify task scope.
4. Read only relevant topic/component memory.
5. Apply relevant rules.

During `/delivery`:

- Watch for repeated mistakes or strong learning signals.
- Do not save weak signals automatically.
- If a rule is applied, be ready to update `Last applied` when appropriate.

At the end of `/delivery`, report:

```md
## Applied memory
- ...

## Possible new lessons
- ...

## Saved lessons
- ...
```

Do not save every task automatically.

Only save with explicit `/save` or strong score >= 3.

---

## How /audit must use saved memory

At the beginning of `/audit`:

1. Read active memory.
2. Read relevant scoped memory.
3. Check whether the reported issue is a repeated mistake.
4. If repeated, mention the previous memory item in the audit result.
5. Do not create new memory unless explicit `/save` or strong trigger exists.

Audit output should distinguish:

```txt
new issue
repeat of known issue
conflict with existing memory
possible lesson candidate
```

---

## /memory command

`/memory [topic]` shows current active memory for a topic.

Examples:

```txt
/memory mobile
/memory delivery
/memory copy
/memory auth
```

Output should be short and actionable:

```md
## Active memory: mobile

1. Top navigation stays expanded on mobile.
2. Avoid fixed bottom bars overlapping text.
3. Keep primary actions visible without extra taps.
```

It should not dump archive or long evidence by default.

---

## /memory-review command

`/memory-review` cleans memory instead of adding new memory.

It is a required maintenance loop, not an optional nice-to-have.

Run `/memory-review` when:

```txt
active.md has more than 50 rules
duplicate rules are detected
the user says memory feels noisy/conflicting
a project accumulates more than 10 new saved lessons
there are contradictory active rules
many rules have never been applied
```

It must:

1. Find duplicate rules.
2. Merge similar items.
3. Mark superseded items as `replaced`.
4. Archive outdated or low-priority items.
5. Move broad high-priority rules to `active.md`.
6. Keep `active.md` under 30–50 rules.
7. Ensure every active item has `Apply when`, `Check`, and `Failure if ignored`.
8. Remove or archive vague entries that are not actionable.
9. Prefer topic-document consolidation over many tiny entries.
10. Update `index.md` if topic routing changed.

Final report:

```md
## Memory review complete

Merged:
- ...

Replaced:
- ...

Archived:
- ...

Active memory size:
- before: N
- after: M

Remaining conflicts:
- none / list
```

---

## Replacement and conflict handling

When the user changes a decision:

1. Find existing active rules in the same scope.
2. If the new decision fully supersedes the old one, mark the old rule as `replaced`.
3. Add `Replaced by` to the old rule.
4. Create or update the new active rule.
5. Do not leave contradictory active rules.

If both rules can coexist only under different conditions, narrow their `Apply when` sections.

Example:

```txt
Rule A applies to desktop and tablet.
Rule B applies to very small mobile screens.
```

---

## Evidence and application tracking

### Evidence

Use `Evidence` to explain why a memory item exists.

Examples:

```txt
- User correction: “я уже просил верхнее меню не сворачивать”
- Repeat issue: mobile nav collapsed again during /delivery
- GitHub issue: #123
```

Do not include long transcripts. Keep evidence concise.

### Last applied

Use `Last applied` to show the memory is alive.

Examples:

```txt
- 2026-06-27 — /delivery mobile navigation task
- never
```

If a high-priority active rule is never applied for a long time, `/memory-review` may archive it or move it to a topic file.

### Failure if ignored

Use this to make the risk concrete.

Example:

```txt
Failure if ignored:
- Agent may collapse the mobile navigation into a hamburger again, repeating a known rejected UX pattern.
```

---

## Project adapter model

This brain skill is generic.

A project repo must add its own local adapter:

```txt
1. Create /agent-memory structure.
2. Seed active.md with only high-value project rules.
3. Update project /delivery to load local memory.
4. Update project /audit to detect repeated mistakes.
5. Keep project-specific UX/product decisions in the project repo.
6. Link back to this brain skill as the canonical mechanism.
```

Do not copy the whole brain theory into every project.

Project repos should store local data, not redefine the whole skill.

---

## Quality bar

A saved memory item is acceptable only if it is:

```txt
reusable
scoped
checkable
deduplicated
short enough to load
actionable for a future agent
```

If any of these are false, archive it or do not save it.

---

## Minimal examples

### Example 1 — repeated mistake

Input:

```txt
/save
ошибка: агент опять сделал слишком длинный текст
правильно: клиентские тексты должны быть в 2 раза короче и понятнее обычному человеку
область: UX / copy
```

Saved as:

```md
## 2026-06-27 — Keep client-facing copy compact

Type: mistake, user_preference  
Memory type: episodic, semantic  
Scope: UX / copy  
Priority: high  
Status: active  

User signal:
> Агент опять сделал слишком длинный текст.

Evidence:
- User correction on 2026-06-27.

Lesson:
Client-facing screens should use compact, calm, plain-language copy. Avoid long explanations and professional jargon.

Apply when:
- Editing client-facing screens
- Editing AI intake copy
- Editing diagnostic pages

Check:
- Text is readable on mobile and avoids long multi-paragraph explanations.

Failure if ignored:
- Client-facing pages may become too dense and hard for ordinary users to understand.

Avoid:
- Dense therapeutic terminology
- Long repeated explanatory blocks

Last applied:
- never
```

### Example 2 — one-time tweak

Input:

```txt
сделай эту кнопку чуть выше
```

Action:

```txt
Do not save.
```

### Example 3 — product decision

Input:

```txt
/save
решение: в Мои заказы не показываем отдельную фотогалерею, только карточки заказов и горизонтальный поиск услуг
область: Orders / client UX
```

Saved as semantic topic/component memory.

### Example 4 — replacement

Existing active rule:

```txt
Mobile top nav must always stay expanded.
```

Input:

```txt
/save
решение: на очень маленьких экранах можно использовать compact drawer, но на обычном mobile меню должно быть видно
область: mobile navigation
```

Action:

```txt
Update the mobile navigation topic.
Mark the old broad rule as replaced or narrow its Apply when.
Create the new conditional rule as active.
```

---

## Final invariant

Never let this system become a giant instruction dump.

The learning loop succeeds only when future agents can read a small relevant memory set, apply it, verify it, and prune it when it becomes stale or redundant.
