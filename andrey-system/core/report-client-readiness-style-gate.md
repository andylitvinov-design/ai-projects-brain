# Report Client-Readiness Style Gate — Andrey Li Reports

This file is the primary source for client-readiness and mandatory report structure.

Main rule:

**Depth inside. Compression outside.**

The agent may think deeply. The client receives only the useful living result.

---

## 1. Client-ready first

Before sending or approving any report, ask:

```md
Можно ли отправить этот текст клиенту как живое письмо Андрея?
```

If no, rewrite.

A client report must give:

- ясность;
- образ;
- bottleneck;
- назначение;
- проверку.

Delete anything that does not create clarity, support, or movement.

---

## 2. Four-part structure

Both short analyses and full reports use four parts:

1. Диагностика
2. Назначение
3. Примечание
4. Приложение

Difference is length only.

- compact analysis: **250–500 words**;
- full report from limited input: **500–800 words**;
- full report with enough data: **800–1200 words**.

If a compact report is over 500 words, cut it before sending.

---

## 3. Диагностика

Diagnosis should help the client recognize himself/herself.

Required:

- resource / Dao stage;
- current state;
- one living image;
- Wu Xing / Bach if relevant;
- core, surface, bottleneck.

Compression rules:

- opening: 2–4 short paragraphs maximum;
- each remedy/element: 1–2 sentences maximum;
- no long remedy paragraphs;
- no long element theory;
- no list of more than 3 manifestations;
- no repeated “general conclusion” in several wordings.

Diagnosis is not an encyclopedia and not a teaching block.

---

## 4. Назначение

Canonical source for this block:

`andrey-system/core/report-prescription-template.md`

Always use only that file for Part 2.

Do not duplicate another prescription structure here.
If this file and `report-prescription-template.md` conflict, `report-prescription-template.md` wins for Part 2.

Part 2 must be a short direct recommendation, not diagnosis.

Forbidden in Назначение:

- `Ключевые сейчас:`
- `Принимать / использовать:`
- `Почему такой порядок:`
- `Отобранные поддержки сейчас:`
- `Они поддерживают:`
- `Формат:`
- `Дистанционная поддержка:`
- `Если принимать Bach внутрь:`
- 3–5 days or 5–7 days as default term;
- long chains of `если... если... если...`;
- equal function list for all remedies as prescription.

---

## 5. Примечание

Примечание = one strong paragraph.

Maximum: **4–6 lines**.

It combines:

- psychosomatic essence;
- root cause;
- what to do / where to move;
- current Dao-stage strategy;
- what not to force.

Do not make the note a second diagnosis.
Do not write it as a long list.

---

## 6. Приложение

The appendix is optional.

If it exists, **every remedy must have a clear послание**.

Each remedy: **1 short paragraph / 1–2 sentences maximum**.

Every remedy must answer:

```md
Что этот препарат возвращает человеку?
Какое поддерживающее послание он несёт?
```

Good:

```md
Gorse — послание: путь ещё не закрыт. Он возвращает тихую надежду и право снова попробовать без насилия над собой.
```

Bad:

```md
Gorse — препарат для снижения безнадёжности.
```

Rules:

- no dry encyclopedia;
- no repetition of Diagnosis;
- every remedy must include an inspiring/supportive message;
- if the Appendix repeats the Diagnosis, delete it or rewrite as messages.

---

## 7. Compression rule

If the text can be shortened by 30%+ without losing meaning, it is not client-ready.

Common water:

- repeated “resource exists but...” formula;
- explaining every element twice;
- describing function in Diagnosis and again in Appendix;
- long prescription commentary;
- extra conclusions after a clear conclusion.

Fix:

```md
Keep the strongest sentence.
Remove the explanation around it.
```

---

## 8. Internal QA must stay internal

Never include in client-facing report:

- `Quality check`;
- registry/source notes;
- `GitHub registry checked`;
- tool/source routing;
- auditor scoring;
- internal validation lists.

---

## 9. Rewrite target

If a report is dry, inflated, or GPT-like, rewrite it to:

```md
Смотрю.

1. Диагностика
...

2. Назначение
...

3. Примечание
...

4. Приложение
...
```

Short.
Living.
Diagnostic.
No water.
