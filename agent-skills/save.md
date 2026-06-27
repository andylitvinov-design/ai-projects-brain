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

But automatic saving must be conservative. If the signal is weak, suggest a candidate lesson instead of saving it.

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

- If score >= 3: save.
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

This is not a raw complaint log. Each entry must include the future correction.

### `/agent-memory/topics/*.md`

Scoped topic rules, such as delivery, mobile, UX, copy, auth.

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
Scope: global | delivery | audit | UX | copy | mobile | auth | component | page  
Priority: low | medium | high  
Status: active | candidate | archived  

User signal:
> Original user wording or concise paraphrase.

Lesson:
Clear reusable rule for future agents.

Apply when:
- Situation 1
- Situation 2

Check:
- Observable verification that the lesson was applied.

Avoid:
- Anti-pattern 1
- Anti-pattern 2

Related files/components:
- optional
```

Every active item must include both:

```txt
Apply when
Check
```

If an item cannot be applied or checked, it must not be active memory.

---

## Classification guide

### Mistake

Use when the agent did something wrong.

Saved mainly to:

```txt
mistakes.md
relevant topic file
component-notes/<Component>.md when applicable
```

### Rule

Use when the user defines how agents should behave.

Saved mainly to:

```txt
active.md if global/high priority
topics/delivery.md or topics/audit.md if workflow-specific
```

### Product decision

Use when the user defines how the product should work.

Saved mainly to:

```txt
relevant topic file
component-notes/<Component>.md
```

### User preference

Use when the user defines a stable style preference.

Saved mainly to:

```txt
active.md if broad and frequent
relevant topic file otherwise
```

### Workflow lesson

Use for delivery, audit, testing, deploy, GitHub, auth, verification.

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
4. Determine scope.
5. Determine priority.
6. Search existing memory for similar rules.
7. If duplicate exists, update/merge instead of adding a new entry.
8. Save to the correct file.
9. Ensure `Apply when` and `Check` exist.
10. Report exactly what was saved and where.

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

## Duplicate prevention

Before writing a new item, search memory for related wording and scope.

If similar rule exists:

- do not duplicate;
- merge the new signal into the existing rule;
- update `User signal` or add a short `Repeated signal` line;
- increase priority if the error repeated;
- improve `Check` if the previous version was vague.

Duplicate example:

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
Update existing mobile nav rule. Do not add a second rule.
```

---

## Required final response after /save

After saving, respond briefly:

```md
Saved to memory.

Type: mistake / rule / decision / preference / workflow lesson
Scope: ...
Files updated:
- /agent-memory/...

Future agents should apply this when:
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

---

## How /delivery must use saved memory

At the beginning of `/delivery`:

1. Read `/agent-memory/active.md`.
2. Read `/agent-memory/index.md`.
3. Classify task scope.
4. Read only relevant topic/component memory.
5. Apply relevant rules.

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

---

## /memory-review command

`/memory-review` cleans memory instead of adding new memory.

It must:

1. Find duplicate rules.
2. Merge similar items.
3. Archive outdated or low-priority items.
4. Move broad high-priority rules to `active.md`.
5. Keep `active.md` under 30–50 rules.
6. Ensure every active item has `Apply when` and `Check`.
7. Remove vague entries that are not actionable.

Final report:

```md
## Memory review complete

Merged:
- ...

Archived:
- ...

Active memory size:
- before: N
- after: M
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
Scope: UX / copy  
Priority: high  
Status: active  

User signal:
> Агент опять сделал слишком длинный текст.

Lesson:
Client-facing screens should use compact, calm, plain-language copy. Avoid long explanations and professional jargon.

Apply when:
- Editing client-facing screens
- Editing AI intake copy
- Editing diagnostic pages

Check:
- Text is readable on mobile and avoids long multi-paragraph explanations.

Avoid:
- Dense therapeutic terminology
- Long repeated explanatory blocks
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

Saved as topic/component memory.

---

## Final invariant

Never let this system become a giant instruction dump.

The learning loop succeeds only when future agents can read a small relevant memory set, apply it, and verify it.
