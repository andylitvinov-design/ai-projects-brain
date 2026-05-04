# Report Diagnosis Matrix — Andrey Li System

This file defines the key diagnostic report variants for Andrey Li's Report Agent.

The system is built on two main axes:

1. Depth of diagnosis:
   - Mini Express
   - Short Diagnosis
   - Deep Diagnosis
   - Deep / Full Support Snapshot

2. Session status:
   - New Diagnosis
   - Repeat Diagnosis / Progress Check

Additional blocks:

- Psychosomatics / Link Between Self And Goal
- Symptom Analysis
- System Analysis
- Remedy Relevance Check
- Remedy-Only Analysis

Main principle:

**ясность → опора → препарат / поддержка → проверка**

The strongest report is not the longest report.

---

## 0. Critical Clarifications

### 0.1. Wu Xing Rule

If the report includes **any Wu Xing analysis**, even a short numeric snapshot, it is a **Deep Diagnosis**.

Examples:

```md
Вода 3.8
Дерево 3.9
Огонь 3.9
Земля 3.9
Металл 3.8
```

This is already Deep Diagnosis, even if the explanation is short.

Short Diagnosis does **not** include Wu Xing.

---

### 0.2. Self + Goal / Health Rule

Almost every diagnosis includes:

```md
Я X.X
Цель / здоровье X.X
```

Usually the report checks **Self + Goal** or **Self + Health**.

Symptom is added only when Andrey specifically evaluates or asks about the symptom.

---

### 0.3. Psychosomatics Rule

Psychosomatics is not just a separate optional block.

In Andrey's method it often means:

```md
связь между Я и целью / здоровьем / симптомом
```

The psychodynamic meaning appears when we explain:

- what happens in `Я`;
- what happens in `цель / здоровье / симптом`;
- what blocks movement between them;
- what inner resource must be restored.

So psychosomatics may be present as the **linking explanation**, even if there is no separate heading `ПСИХОСОМАТИКА`.

---

### 0.4. Remedies Rule

Remedies / supports are included almost always.

This can be:

- Bach essences;
- homeopathy;
- tinctures;
- naturopathy;
- oils;
- ritual / artifact / distance support;
- practical phrase / contact support.

Exception:

**Mini Express** may be without remedies.

---

### 0.5. Remedy-Only Analysis

There is also a separate format for pure remedy analysis.

Use it when the input is mainly:

- a list of remedies;
- current remedy reactions;
- what is still actual / not actual;
- what to check next.

This can be independent of full diagnosis.

---

### 0.6. Full structure vs full data

Do not confuse a long structure with a Full Client Report.

A report can include Dao, Wu Xing, bottleneck, support, and a plan, but still be a limited-input snapshot.

Full Client Report requires enough client data:

- current client context;
- body/symptom details, if health is the topic;
- what worsens / improves the state;
- remedy reactions or support history;
- goal or follow-up context;
- practical support plan.

If the input is minimal, do not call the output Full Client Report.

---

### 0.7. Size must match input

Recommended maximums:

- Mini Express: 80–250 words.
- Short / Bach note: 300–700 words.
- Deep / Full Support Snapshot: 600–1000 words.
- Deep Diagnosis with enough data: 600–1200 words.
- Full Client Report / Full Support Report: 900–1400 words maximum, only when there is enough client data.
- Follow-Up Check Note: 120–300 words.
- Progress / Remedy Relevance Check: 250–600 words.

If a report can be cut by 40%+ without losing meaning, it is overbuilt.

---

## 1. Main Variants

---

## #0. Mini Express

Use when:

- Andrey needs a very quick check;
- user asks for a tiny answer;
- no remedy selection is requested;
- no Wu Xing is needed;
- no support plan is required.

Core content:

```md
Смотрю.

Я X.X.
Цель / здоровье X.X, если нужно.

Коротко что сейчас.
Главное — ...

Дальше:
...
```

Typical length:

- 80–250 words.

No remedies by default.
No Wu Xing.
No long explanation.

---

## #1. Short Diagnosis

Use when:

- the client needs quick orientation;
- data is limited;
- the task is mainly to check the current resource;
- the main need is remedy selection, for example Bach essences;
- no Wu Xing analysis is required.

Core content:

```md
Смотрю.

Я X.X.
Цель / здоровье X.X.
Симптом X.X, only if specifically assessed.

Коротко что сейчас.
Главный bottleneck.

ПОДБОР ПРЕПАРАТОВ
- remedy 1 — function
- remedy 2 — function
- remedy 3 — function

ВЫВОД
Что поддерживаем сейчас.
Когда проверить.
```

Typical length:

- 250–600 words;
- short paragraphs;
- no Wu Xing.

Main principle:

**Self + goal/health → bottleneck → remedy selection → next check**

---

## #2. Deep Diagnosis

Use when:

- there is any Wu Xing analysis, even short;
- there is enough client data;
- the issue is complex;
- the client needs a fuller map;
- the work includes Dao level, Wu Xing, support layers, and practical plan;
- there is a health/symptom/systemic situation to understand.

Core content:

```md
Смотрю.

1. ФИГУРА Я / Я
Current level.
Current image.
What is happening now.

2. ЦЕЛЬ / ЗДОРОВЬЕ
Almost always included.
What the goal/health field shows.

3. СИМПТОМ
Only if specifically assessed.
What the symptom field shows.

4. УСИН
Вода X.X
Дерево X.X
Огонь X.X
Земля X.X
Металл X.X

5. ВЫВОД
Dao stage.
Main bottleneck.
First support.
Next realistic step.

6. НАЗНАЧЕНИЕ / ПОДДЕРЖКА
А. Main support
Б. Bach / emotional support
В. Naturopathy / physical support
Г. Homeopathy / other support, if relevant

7. ПРОВЕРКА
When to reassess.
What to observe.
```

Typical length:

- 600–1200 words;
- still alive and short;
- no unnecessary theory.

Main principle:

**Self → goal/health → symptom if needed → Wu Xing → bottleneck → support → next step**

---

## #2.1. Deep / Full Support Snapshot

Use when:

- the report includes Dao level and Wu Xing;
- the input is limited but enough for a deep state map;
- the user gives remedies / Bach essences as diagnostic signals;
- the report needs bottleneck, support direction, and one short plan;
- there is not enough client history for a true Full Client Report.

This is not a Full Client Report, even if it has many sections.

Good label:

```md
Deep Diagnosis / Full Support Snapshot
```

Required structure:

```md
Смотрю.

Current state / Dao level.
One living image.

Wu Xing through the given inputs.
Main vs secondary axis.
Missing elements as needs verification.

Bottleneck.
First support element.
Remedies/support by function.
One-cycle goal.
What to verify next.
```

Typical length:

- 600–1000 words.

Rules:

- do not explain the whole Wu Xing theory;
- do not write long encyclopedia descriptions of remedies;
- mark missing elements as `needs verification`;
- do not invent body symptoms or client history;
- no internal QA notes in the client-facing version;
- separate core axis from surface symptoms.

Example for Bach-led Wu Xing:

```md
Agrimony + Cherry Plum = скрытое напряжение + контроль.
Beech + Impatiens = раздражение + ускорение.
Вода = needs verification.
Первый шаг = Земля, не рывок.
```

---

## #3. Full Client Report / Full Support Report

Use only when there is enough data and support plan is needed.

Required data should include most of:

- current client situation;
- current Self / health / goal level;
- body or symptom details, if relevant;
- what worsens / improves the state;
- remedy reactions or previous support;
- enough context to personalize the plan;
- follow-up or verification structure.

Core content:

```md
Смотрю.

1. Я / текущее состояние
2. Здоровье / цель / симптом
3. УСИН
4. ВЫВОД
5. НАЗНАЧЕНИЕ
   А. Основная поддержка
   Б. Bach / эмоции
   В. Натуропатия / тело
6. Как принимать / что делать
7. Когда проверить
```

Typical length:

- 900–1400 words maximum;
- short paragraphs;
- no water;
- no method encyclopedia.

Do not use this label for minimal input.

---

## 2. New vs Repeat Diagnosis

Each diagnostic format can be new or repeat.

---

## A. New Diagnosis

Use when:

- this is the first check;
- there is no previous report;
- the current state has not yet been mapped.

Focus:

- current level;
- current bottleneck;
- first support;
- what to start with.

Structure:

```md
Смотрю.

Я X.X.
Цель / здоровье X.X.

Коротко что сейчас.
Главное сейчас: ...

Поддержка:
- ...

Проверить через ...
```

---

## B. Repeat Diagnosis / Progress Check

Use when:

- there was previous work;
- the user asks to recheck;
- there is a previous remedy set;
- the goal is to see what changed.

Focus:

- what changed;
- what improved;
- what remains;
- what remedies are no longer relevant;
- what is now actual;
- next Dao step.

Structure:

```md
Смотрю ещё раз.

Я X.X.
Здоровье / цель X.X.

Показатели выросли / без изменений / просели.

ВЫВОД
Сейчас закрепилась на уровне ...
Следующий шаг ...

ПРОВЕРКА ПРЕПАРАТОВ
Ушли:
- ...

Актуальны:
- ...

Дальше:
проверить через ...
```

If Wu Xing is included, this is **Deep + Repeat**.

---

## 3. Optional / Additional Blocks

These blocks are added only when relevant.

---

## A. Psychosomatics / Link Between Self And Goal

Use when the report needs to explain the relationship between:

```md
Я ↔ цель / здоровье / симптом
```

This is often the heart of the report.

Structure:

```md
СВЯЗЬ Я И ЦЕЛИ / ЗДОРОВЬЯ
В Я есть ...
В цели / здоровье есть ...
Между ними застревает ...

Психологическая задача:
А. Вернуть ...
Б. Уменьшить ...
```

This block may appear without the word “psychosomatics”.

---

## B. Symptom Analysis Block

Use only when symptom is specifically assessed.

Structure:

```md
СИМПТОМ
Симптом может отражать ...
Как будто ...

Психологическая задача:
А. Вернуть ...
Б. Уменьшить ...
```

Important:

- this is a psychodynamic / symbolic model;
- not a medical diagnosis;
- use safe language: “может быть связано”, “похоже на”, “needs verification”.

---

## C. System Analysis Block

Use when:

- the issue includes family, work, external pressure, authority, relocation, institutional stress;
- the symptom/problem is affected by a system around the person;
- there are figures: father, partner, boss, country, institution, money, clients.

Structure:

```md
СИСТЕМА
Здесь влияет не только внутреннее состояние.
Есть внешний контекст: ...

Как будто человек чувствует:
...

Задача:
вернуть своё место / право решать / чувство опоры.
```

Keep it short.
Do not turn the report into a full systemic constellation unless asked.

---

## D. Remedy Relevance Check Block

Use in repeat diagnosis when checking what changed.

Structure:

```md
ПРОВЕРКА ПРЕПАРАТОВ

Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ...

Менее актуальны, но могут пригодиться:
- ...

Это уже уровень ...
```

This block is especially important when the work moves:

- from trauma support to finer tuning;
- from crisis support to stabilization;
- from stabilization to next Dao stage.

---

## E. Remedy-Only Analysis

Use when the task is only to analyze remedies.

Structure:

```md
Смотрю препараты.

ОСНОВНАЯ ТЕМА
...

ЯДРО
- remedy — role

РЕАКЦИЯ / ЭМОЦИИ
- remedy — role

АДАПТАЦИЯ / ЗАЩИТА
- remedy — role

АКТУАЛЬНЫ СЕЙЧАС
- ...

НЕ АКТУАЛЬНЫ / УШЛИ
- ...

ЧТО ПРОВЕРИТЬ ДАЛЬШЕ
- ...
```

This format can be used without `Я`, `цель`, or Wu Xing if the user only asks about remedies.

---

## F. Bach-led Wu Xing Block

Use when Bach remedies are explicitly mapped to Wu Xing elements or used as diagnostic signals.

Structure:

```md
По Bach видно:
- Element / remedy — function in current state
- Element / remedy — function in current state

Ядро:
...

Поверхность:
...

Needs verification:
...
```

Rules:

- do not explain every element as theory;
- do not treat all remedies as equally important;
- name main axis first;
- missing Water or other missing element must be marked `needs verification`.

---

## 4. Final Selection Rule

Before writing, choose:

```md
Depth:
- Mini Express
- Short Diagnosis
- Deep Diagnosis
- Deep / Full Support Snapshot
- Full Client Report / Full Support Report

Status:
- New Diagnosis
- Repeat Diagnosis

Additional blocks:
- Psychosomatics / Link Between Self And Goal
- Symptom Analysis
- System Analysis
- Remedy Relevance Check
- Remedy-Only Analysis
- Bach-led Wu Xing Block
```

Example combinations:

```md
Mini Express + New = tiny resource / goal check without remedies.
Short + New = resource / goal check + Bach or remedy selection.
Short + Repeat = quick recheck + update remedies.
Deep + New = Self + goal/health + Wu Xing + support plan.
Deep / Full Support Snapshot = limited input + Dao + Wu Xing + support direction.
Deep + Repeat = Wu Xing progress check + stage transition + updated remedies.
Deep + Symptom = Self / goal-health / symptom + Wu Xing + support.
Full Client Report = enough client data + full support plan + check structure.
Remedy-Only = pure analysis of remedies without full diagnosis.
```

---

## 5. Main Style Rule

Do not overbuild.

If there is any Wu Xing, it is Deep Diagnosis.

If it is Short Diagnosis, do not add Wu Xing.

If it is Mini Express, do not add remedies unless asked.

If the user asks for remedy analysis only, do not force full diagnosis.

If there is no symptom assessment, do not add symptom analysis.

If there is no previous data, do not pretend to compare.

If input is minimal, do not imitate Full Client Report.

If there are previous remedies, check:

- what stayed actual;
- what left;
- what changed in the layer of work.

The strongest report is not the longest report.

The strongest report gives:

**ясность → опора → назначение → проверка**
