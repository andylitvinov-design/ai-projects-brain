# Report Client-Readiness Style Gate — Andrey Li Reports

This file is a mandatory addendum to report style and quality standards.

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
- опору;
- назначение;
- проверку.

Delete anything that does not create clarity, support, or movement.

---

## 2. Four-part structure

Both short analyses and full reports use Andrey's four-part structure:

1. Диагностика
2. Назначение
3. Примечание
4. Приложение

Difference is only depth and length:

- short analysis: compact four parts; appendix may be 2–4 lines or omitted;
- full report: fuller four parts, still compressed;
- limited-input full report: 600–900 words maximum.

---

## 3. Диагностика

Diagnosis should help the client recognize himself/herself.

It should include:

- resource / Dao stage;
- current state;
- one living image;
- Wu Xing / Bach if relevant;
- short essence of remedies;
- core, surface, bottleneck.

Rules:

- one sentence or one very short mini-paragraph per remedy is allowed if it clarifies the state;
- no long remedy paragraphs;
- no long element theory;
- if listing manifestations after “может ощущаться как”, use maximum 3 items;
- expanded remedy descriptions and messages go to Appendix.

---

## 4. Назначение

Canonical source for this block:

`andrey-system/core/report-prescription-template.md`

Always use that file for Part 2.

Назначение = short direct recommendation, not diagnosis.

Required structure:

```md
## 2. Назначение

Ключевые сейчас:
- ...
- ...

Принимать / использовать:
- ...

Срок: 2 недели.

Проверить через 2 недели:
- ресурс;
- основной симптом / эмоцию;
- реакцию на препараты;
- что стало легче / что осталось.

Почему такой порядок:
один короткий абзац.
```

Forbidden in Назначение:

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

- maximum 1 short paragraph per remedy;
- no dry encyclopedia;
- no repetition of Diagnosis;
- every remedy must include an inspiring/supportive message.

---

## 7. Compression rule

If the text can be shortened by 40%+ without losing meaning, it is not client-ready.

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
