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
- Full Client Report / Full Report on Limited Input
- Remedy-Only Analysis

Status:
- New Diagnosis
- Repeat Diagnosis
```

Core rules:

- if the user asks for analysis/report, use the 4-part structure even when short;
- do not use linear `short diagnosis → conclusion → support → check`;
- full means useful structure, not extra water;
- safety is internal by default and written only when relevant.

---

## 2. Compact 4-Part Analysis / Full Client Report

Use this as the preferred structure for both short analyses and full reports.

Length:

- compact analysis: **250–500 words**;
- full report from limited input: **500–800 words**;
- full report with enough data: **800–1200 words**.

If a compact analysis exceeds 500 words, cut before sending.

Template:

```md
Смотрю.

## 1. Диагностика

Ресурс / Я / здоровье X.X.
Коротко что сейчас.
Один живой образ.

Если есть У-Син / Bach:
- Стихия / препарат — короткая суть / роль.
- Стихия / препарат — короткая суть / роль.

Ядро: ...
Поверхность: ...
Bottleneck: ...

## 2. Назначение

Use exactly the structure from:
andrey-system/core/report-prescription-template.md

## 3. Примечание

Один сильный абзац, 4–6 строк максимум:
психосоматическая суть + причина проблемы + что делать / куда идти + текущая Dao-стратегия + что не форсировать.

## 4. Приложение

Опционально.
Но если Приложение есть, у каждого препарата обязательно должно быть послание.

Формат:
- remedy — послание: ... Что препарат помогает вернуть ...
```

Rules:

- Part 1: opening 2–4 short paragraphs max;
- Part 1: each remedy/element 1–2 sentences max;
- Part 2 must use only `report-prescription-template.md`;
- Part 3 is one strong paragraph, not a second diagnosis;
- Part 4 is supportive message, not dry encyclopedia;
- Part 4 uses maximum 1 short paragraph / 1–2 sentences per remedy;
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

Length: **250–500 words**.

```md
Смотрю.

## 1. Диагностика

Ресурс / здоровье X.X.
Коротко что сейчас.
Образ.

По препаратам / У-Син:
- ... — короткая роль.
- ... — короткая роль.

Ядро: ...
Поверхность: ...
Bottleneck: ...

## 2. Назначение

Use exactly `report-prescription-template.md`.

## 3. Примечание

Один абзац, 4–6 строк максимум.

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

## 5. Remedy-Only Analysis

Use when the task is only to analyze remedies, reactions, or current relevance.

Length: 250–500 words.

If remedy analysis becomes a client report, use compact 4-part structure.

---

## 6. Remedy / Support Language

Describe remedies by function, not encyclopedia style.

Good:

```md
Mimulus — страх проявляться, действовать.
Gorse — усталость надежды.
Centaury — границы и право не отдавать ресурс.
```

Bad:

```md
Данный препарат традиционно используется...
Он известен своим влиянием на...
```

---

## 7. Safety

Safety is mandatory internally, but do not add generic safety paragraphs automatically.

Add explicit safety only if:

- serious medical symptoms are described;
- report might sound like medical treatment;
- risk of overpromising;
- user asks.

Never diagnose medically, promise cure, tell client to stop treatment, invent facts, or expose private data.

---

## 8. Final Checklist

Before finalizing:

- Did you use 4 parts for analysis/report?
- Is compact report under 500 words?
- Is Diagnosis compact and recognizable?
- Does Part 2 follow `report-prescription-template.md` exactly?
- Is Note one strong paragraph, 4–6 lines maximum?
- If Appendix exists: does every remedy have a clear `послание`?
- Is Appendix maximum 1 short paragraph / 1–2 sentences per remedy?
- No generic safety paragraph by default?
- No repeated diagnostic formula in every section?

Main rule:

**Самый сильный отчёт — не самый длинный.**
