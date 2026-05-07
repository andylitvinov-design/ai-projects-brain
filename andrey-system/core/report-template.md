# Report Templates — Andrey Li Live Diagnostic Reports

This file defines the working report templates for Report Agent.

Main result of any report:

**ясность → опора → препарат / поддержка → проверка**

Main rule:

**Самый сильный отчёт — не самый длинный.**

---

## 1. Before Writing Any Report

Choose:

```md
Depth:
- Mini Express
- Compact 4-Part Analysis
- Deep Diagnosis
- Full Client Report / Full Report on Limited Input
- Remedy-Only Analysis

Status:
- New Diagnosis
- Repeat Diagnosis

Additional blocks:
- Psychosomatics / Link Between Self And Goal
- Symptom Analysis
- System Analysis
- Remedy Relevance Check
```

Core rules:

- if the user asks for analysis/report, use the 4-part structure even when short;
- do not use a linear `short diagnosis → conclusion → support → check` structure for analysis/report requests;
- any Wu Xing analysis, even a short numeric snapshot, means **Deep Diagnosis**;
- `Я + цель / здоровье` is almost always included;
- `симптом` is included only when Andrey specifically evaluates it;
- remedies/supports are included almost always;
- full means useful structure, not extra water;
- safety is internal by default and is written only when relevant.

---

## 2. Universal Live Report Logic

Every report follows this movement inside the 4-part structure:

```md
Смотрю → Я / цель / здоровье → что сейчас → bottleneck → что поддержать → чем поддержать → когда проверить
```

Style logic:

```md
цифра → образ → bottleneck → поддержка → проверка
```

Avoid:

```md
теория → классификация → длинное объяснение → общий совет
```

---

## 3. Compact 4-Part Analysis / Full Client Report

Use this as the preferred structure for both short analyses and full reports.

Difference is length:

- compact analysis: 350–800 words, appendix can be 2–4 lines or omitted;
- full report from limited input: 600–900 words;
- full report with enough data: 900–1400 words.

Template:

```md
Смотрю.

## 1. Диагностика

Я X.X.
Здоровье / цель X.X, если есть.
Эмоция / тема — ...

Коротко что сейчас.
Один живой образ.
Главная формула состояния.

Если есть симптомы / проявления:
- максимум 3 пункта.

Если есть У-Син / Bach:
- Стихия / препарат — короткая суть / роль
- Стихия / препарат — короткая суть / роль
- Missing element — needs verification

Ядро: ...
Поверхность: ...
Главный bottleneck: ...

## 2. Назначение

Ключевые сейчас:
- ...
- ...

Их ставим первыми на этот цикл.

Дополнительно / вторым слоем:
- ... — когда подключать
- ... — когда подключать

Если принимать / применять:
- ...
- ...
- смотреть реакцию ... дней.

Если появится / усилится ... — добавить ...
Если станет больше ... — можно подключить ...

Проверить через ...:
- ...
- ...
- ...

## 3. Примечание

Один сильный абзац:
психосоматическая суть + причина проблемы + что делать / куда идти + текущая Dao-стратегия + что не форсировать.

## 4. Приложение

Опционально.

Кратко по препаратам:
- remedy — максимум 1 короткий абзац: главное послание, что препарат помогает вернуть, ободряющий смысл.

Кратко по Dao / У-Син ступени:
...

Что ещё нужно проверить / добавить:
- ... needs verification
```

Rules:

- Part 1 is compact but may use a short mini-paragraph per remedy if it truly clarifies the state;
- Part 2 is key remedies + when/how to take/apply/add/check, not equal function list;
- Part 2 should prioritize key remedies first and put second-layer remedies later;
- avoid `Назначение по функции: remedy — function` as the main prescription format;
- Part 3 is one strong paragraph, not a second diagnosis;
- Part 4 is supportive meaning/message, not dry encyclopedia;
- Part 4 uses maximum 1 short paragraph per remedy;
- no repeated diagnostic formula in every part;
- no internal Quality check;
- no registry/source notes;
- no generic safety paragraph by default.

---

## 4. Mini Express

Use only when:

- Andrey needs a tiny check;
- user asks for a very short answer;
- no remedy selection is requested;
- no Wu Xing is needed;
- no support plan is required.

Length: 80–250 words.

Template:

```md
Смотрю.

Я X.X.
Цель / здоровье X.X, если нужно.

Коротко что сейчас.
Главное — ...

Дальше:
...
```

Mini Express is not a client report and does not replace compact 4-part analysis when the user asks for analysis/report.

---

## 5. Compact 4-Part Analysis — Short Form

Use when the user asks for a short analysis/report, or gives limited input but still wants an analysis.

Length: 350–800 words.

Template:

```md
Смотрю.

## 1. Диагностика

Я / ресурс / здоровье X.X.
Коротко что сейчас.
Образ.

По препаратам / У-Син видно:
- ... — короткая роль
- ... — короткая роль

Ядро: ...
Поверхность: ...
Bottleneck: ...

## 2. Назначение

Ключевые сейчас:
- ...
- ...

Дополнительно:
- ... — когда подключать

Если принимать / применять:
...

Проверить через ...

## 3. Примечание

Один абзац: психосоматика + причина + что делать + стратегия Dao + что не форсировать.

## 4. Приложение

Опционально.
- remedy — главное послание / что помогает вернуть.
```

Never use the old linear structure:

```md
Краткая диагностика → У-Син карта → Общий вывод → Что поддержать первым → Назначение по функции → Проверка
```

This old structure is forbidden for analysis/report requests.

---

## 6. Deep Diagnosis — New

Use when:

- any Wu Xing analysis is included;
- first serious report;
- enough data;
- health/symptom/systemic issue is present;
- support plan is needed;
- user does not need the compact/full 4-part report format.

Length: 600–1000 words.

If this is a client-facing analysis/report, prefer compact/full 4-part structure. Use this older deep structure only when Andrey explicitly asks for technical/internal deep diagnosis.

Template:

```md
Смотрю.

1. ФИГУРА Я / Я
...

2. ЦЕЛЬ / ЗДОРОВЬЕ
...

3. УСИН
Вода — X.X. Что происходит. Что поддержать.
Дерево — X.X. Что происходит. Что поддержать.
Огонь — X.X. Что происходит. Что поддержать.
Земля — X.X. Что происходит. Что поддержать.
Металл — X.X. Что происходит. Что поддержать.

4. ВЫВОД
Dao ступень / образ.
Главный bottleneck.
Что поддерживаем первым.
Следующий реалистичный шаг.

5. НАЗНАЧЕНИЕ / ПОДДЕРЖКА
Ключевые сейчас: ...
Дополнительно: ...
Когда подключать: ...
Проверить через ...
```

Do not write textbook Wu Xing explanations.
Each element should be short: number → state → support.

---

## 7. Deep Diagnosis — Repeat / Progress Check

Use when:

- there was previous work;
- full recheck is needed;
- Wu Xing progress should be compared;
- remedies need updating;
- Dao stage transition is visible.

Length: 400–900 words.

If user asks for a client-facing report, use 4 parts and include dynamics inside them.

Template:

```md
Смотрю ещё раз.

Я X.X.
Здоровье / цель X.X.

ВЫВОД
Показатели выросли / без изменений / просели.
Закрепилась / держится на уровне ...
Следующий шаг — ...

ПРОВЕРКА ПРЕПАРАТОВ
Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ... — функция

ДАЛЬШЕ
Что оставить.
Что добавить / убрать.
Проверить через ...
```

---

## 8. Remedy-Only Analysis

Use when the task is only to analyze remedies, reactions, or current relevance.

Length: 250–700 words.

Template:

```md
Смотрю препараты.

ОСНОВНАЯ ТЕМА
Коротко что они вместе показывают.

ЯДРО
- remedy — role

РЕАКЦИЯ / ЭМОЦИИ
- remedy — role

АКТУАЛЬНЫ СЕЙЧАС
- ...

НЕ АКТУАЛЬНЫ / УШЛИ
- ...

ЧТО ПРОВЕРИТЬ ДАЛЬШЕ
- ...
```

If remedy analysis becomes a client report, use compact 4-part structure.

---

## 9. Additional Blocks

Use only if needed.

### Psychosomatics / Link Between Self And Goal

```md
СВЯЗЬ Я И ЦЕЛИ / ЗДОРОВЬЯ
В Я есть ...
В цели / здоровье есть ...
Между ними застревает ...
```

### Symptom Analysis

```md
СИМПТОМ
Симптом может быть связан с ...
Как будто ...
Здесь важно не утверждать, а смотреть как психосоматическую модель.
```

### System Analysis

```md
СИСТЕМА
Здесь влияет не только внутреннее состояние.
Есть внешний контекст: ...
Как будто человек чувствует: ...
Задача: ...
```

### Remedy Relevance Check

```md
Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ... — функция

Менее актуальны:
- ... — функция
```

---

## 10. Remedy / Support Language

Describe remedies by function, not encyclopedia style.

Good:

```md
Aspen — фоновая тревожность.
Mimulus — страх проявляться, действовать.
White Chestnut — сверхконтроль, попытка решить всё головой.
```

Bad:

```md
Данный препарат традиционно используется...
Он известен своим влиянием на...
```

---

## 11. Safety

Safety is mandatory internally, but do not add generic safety paragraphs automatically.

Add explicit safety only if:

- serious medical symptoms are described;
- the report might sound like medical treatment;
- there is risk of overpromising;
- user asks.

Never diagnose medically, promise cure, tell client to stop treatment, invent facts, or expose private data.

---

## 12. Final Checklist

Before finalizing:

- Mini Express, Compact 4-part, Deep, Full 4-part, or Remedy-Only?
- New or Repeat?
- If user asks for analysis/report, did you use 4 parts?
- Did you avoid the old linear short-diagnosis structure?
- If there is Wu Xing, did you keep it compact?
- Is Diagnosis compact, not appendix-like?
- Does Prescription highlight key remedies + when/how to take/add/check?
- Did you avoid equal `Назначение по функции` list as the main prescription?
- Is Note one strong paragraph with psychsomatics/cause/action/Dao strategy?
- Is Appendix maximum 1 short paragraph per remedy and supportive message, not dry encyclopedia?
- Is the next check clear?
- Are uncertain points marked `needs verification`?
- No generic safety paragraph by default?
- No repeated diagnostic formula in every section?

Main rule:

**Самый сильный отчёт — не самый длинный.**

The strongest report gives:

**ясность → опору → препарат / поддержку → проверку**
