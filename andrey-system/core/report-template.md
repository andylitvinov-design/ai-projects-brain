# Report Templates — Andrey Li Live Diagnostic Reports

This file defines working report templates for Report Agent.

Main result:

**ясность → опора → назначение → проверка**

Main rule:

**Самый сильный отчёт — не самый длинный.**

Canonical prescription source:

`andrey-system/core/report-prescription-template.md`

For Part 2 `Назначение`, always use that file. Do not invent a different prescription block.

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
```

Core rules:

- if the user asks for analysis/report, use the 4-part structure even when short;
- do not use linear `short diagnosis → conclusion → support → check`;
- any Wu Xing analysis, even short numeric snapshot, means Deep Diagnosis;
- full means useful structure, not extra water;
- safety is internal by default and written only when relevant.

---

## 2. Compact 4-Part Analysis / Full Client Report

Use this as the preferred structure for both short analyses and full reports.

Difference is length:

- compact analysis: 350–800 words;
- full report from limited input: 600–900 words;
- full report with enough data: 900–1400 words.

Template:

```md
Смотрю.

## 1. Диагностика

Я / ресурс / здоровье X.X.
Эмоция / тема — ...

Коротко что сейчас.
Один живой образ.
Главная формула состояния.

Если есть У-Син / Bach:
- Стихия / препарат — короткая суть / роль
- Стихия / препарат — короткая суть / роль

Ядро: ...
Поверхность: ...
Главный bottleneck: ...

## 2. Назначение

Use exactly the structure from:
andrey-system/core/report-prescription-template.md

## 3. Примечание

Один сильный абзац:
психосоматическая суть + причина проблемы + что делать / куда идти + текущая Dao-стратегия + что не форсировать.

## 4. Приложение

Опционально.
Но если Приложение есть, у каждого препарата обязательно должно быть послание.

Формат:
- remedy — послание: ... Что препарат помогает вернуть ...
```

Rules:

- Part 1 is compact but may use a short mini-paragraph per remedy if it truly clarifies the state;
- Part 2 must use only `report-prescription-template.md`;
- Forbidden in Part 2: `Отобранные поддержки сейчас`, `Они поддерживают`, `Формат`, `Дистанционная поддержка`, `Если принимать`, `5–7 дней`, long conditional chains;
- Part 3 is one strong paragraph, not a second diagnosis;
- Part 4 is supportive message, not dry encyclopedia;
- Part 4 uses maximum 1 short paragraph per remedy;
- every remedy in Part 4 must have a clear `послание`;
- no internal Quality check;
- no registry/source notes;
- no generic safety paragraph by default.

---

## 3. Mini Express

Use only when:

- user asks for a very short answer;
- no remedy selection is requested;
- no Wu Xing is needed;
- no support plan is required.

Length: 80–250 words.

Mini Express is not a client report and does not replace compact 4-part analysis when user asks for analysis/report.

---

## 4. Compact 4-Part Analysis — Short Form

Use when user asks for a short analysis/report, or gives limited input but still wants analysis.

Length: 350–800 words.

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

Use exactly `report-prescription-template.md`.

## 3. Примечание

Один абзац: психосоматика + причина + что делать + стратегия Dao + что не форсировать.

## 4. Приложение

Опционально.
- remedy — послание: ... что помогает вернуть ...
```

Never use old structures:

```md
Краткая диагностика → У-Син карта → Общий вывод → Что поддержать первым → Назначение по функции → Проверка
```

```md
Отобранные поддержки сейчас → Они поддерживают → Формат → Если принимать → 5–7 дней
```

---

## 5. Deep Diagnosis — New

Use when:

- Wu Xing analysis is included;
- enough data;
- health/symptom/systemic issue is present;
- support plan is needed;
- user does not need compact/full 4-part report format.

If this is client-facing analysis/report, prefer compact/full 4-part structure.
Use older deep structure only when Andrey explicitly asks for technical/internal deep diagnosis.

---

## 6. Remedy-Only Analysis

Use when task is only to analyze remedies, reactions, or current relevance.

Length: 250–700 words.

If remedy analysis becomes a client report, use compact 4-part structure.

---

## 7. Remedy / Support Language

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

## 8. Safety

Safety is mandatory internally, but do not add generic safety paragraphs automatically.

Add explicit safety only if:

- serious medical symptoms are described;
- report might sound like medical treatment;
- risk of overpromising;
- user asks.

Never diagnose medically, promise cure, tell client to stop treatment, invent facts, or expose private data.

---

## 9. Final Checklist

Before finalizing:

- Did you use 4 parts for analysis/report?
- Did you avoid old linear short-diagnosis structure?
- Is Diagnosis compact and recognizable?
- Does Part 2 follow `report-prescription-template.md` exactly?
- Did you avoid forbidden prescription headings and 5–7 day checks?
- Is Note one strong paragraph?
- If Appendix exists: does every remedy have a clear `послание`?
- Is Appendix maximum 1 short paragraph per remedy?
- No generic safety paragraph by default?
- No repeated diagnostic formula in every section?

Main rule:

**Самый сильный отчёт — не самый длинный.**
