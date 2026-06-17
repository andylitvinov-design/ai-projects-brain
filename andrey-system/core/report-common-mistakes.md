# Report Common Mistakes — Andrey Li Reports

This file lists common report-writing mistakes and how to fix them.

Use it with Report Style & Standards Auditor.

---

## 1. Block checklist instead of living report quality

### Mistake

The agent marks a report as strong because it contains Dao level, Wu Xing, bottleneck, support, safety, and next step.

But the text still sounds dry, inflated, generic, and not like Andrey's living client message.

### Fix

Audit client-readiness first:

```md
Можно ли это отправить клиенту как живое письмо Андрея?
```

If no, the report needs rewrite, even if all method blocks are present.

---

## 2. Overbuilt report from minimal input

### Mistake

The user gives minimal input, for example:

```md
Я и здоровье 3.3. Сжатость.
Bach: Beech, Impatiens, Agrimony, Cherry Plum.
```

The agent writes a long Full Client Report.

### Fix

Small input requires a compact living note or Deep / Full Support Snapshot.

Do not imitate Full Client Report when there is no client story, body detail, remedy reaction, or follow-up context.

---

## 3. Teaching Wu Xing instead of diagnosing state

### Mistake

The report explains every element like a textbook:

```md
Дерево отвечает за рост, движение, инициативу...
Огонь отвечает за радость, контакт, живость...
```

### Fix

Write diagnostically:

```md
Дерево сжато.
Движение есть, но оно выходит раздражением.
```

```md
Огонь ускорен.
Не тепло, а внутренний мотор.
```

---

## 4. Internal QA shown to client

### Mistake

The client-facing report includes `Quality check`, registry status, source routing notes, or technical validation details.

### Fix

Keep internal QA in the agent/auditor output only.

Client text should start with a living diagnostic opening:

```md
Смотрю.
Здоровье 3.3.
Главное здесь — сжатость.
```

---

## 5. Wrong format

### Mistake

The report uses a full diagnosis when the user asked for a short remedy note or справка.

### Fix

Choose the format first.

If the user asks for a справка, keep it short:

- remedy / support;
- function;
- why it is relevant here;
- common conclusion.

If the user asks for repeat remedy check / repeated Bach check / what left and what remains, use the 8-part repeat structure from `core/report-repeat-remedy-check-standard.md`.

---

## 6. Wu Xing added to a short diagnosis

### Mistake

A short diagnosis includes Wu Xing but still stays short / unstructured.

### Fix

Any Wu Xing analysis means Deep Diagnosis, even if the snapshot is compact.

If the input is limited, use Deep / Full Support Snapshot rather than Full Client Report.

If it is also a repeat remedy check, keep the repeat-check 8-part structure.

---

## 7. Limited-input deep snapshot called Full Client Report

### Mistake

The report is labeled Full Client Report because it has many sections, but the input is minimal.

### Fix

Distinguish full structure from full data.

If there is no client history, body detail, remedy reaction, support history, or follow-up context, label it:

```md
Deep Diagnosis / Full Support Snapshot
```

not Full Client Report.

---

## 8. No bottleneck

### Mistake

The report describes symptoms, elements, and remedies but never names the main bottleneck.

### Fix

Add one clear sentence:

```md
Главное слабое место сейчас — ...
```

or:

```md
Главная узкая зона — ...
```

Do not use English `bottleneck` in client-facing Russian text.

---

## 9. Encyclopedia remedy style

### Mistake

```md
Данный препарат традиционно применяется при эмоциональном напряжении.
```

### Fix

Describe the remedy as a function in this client's mechanism:

```md
Cherry Plum — страх потерять контроль, когда внутри много сжатой силы.
```

---

## 10. Dry GPT style

### Mistake

```md
В данном отчёте рассматривается состояние клиента...
```

### Fix

Use live diagnostic opening:

```md
Смотрю.
Я 3.3.
Главное здесь — ...
```

---

## 11. Too much theory

### Mistake

The report explains Dao or Wu Xing like a textbook.

### Fix

Use the system diagnostically:

```md
Вода просела — мало глубокой опоры. Поэтому Дерево не может спокойно двигаться.
```

---

## 12. No next check

### Mistake

The report ends with a conclusion but no tracking.

### Fix

Add:

```md
Проверить через ...
Смотреть: ...
```

For repeat remedy check, this belongs inside:

```md
6. Назначение
```

and is reinforced in:

```md
7. Ожидаемое направление поддержки
```

---

## 13. No dynamics in repeat report

### Mistake

A repeat diagnosis describes current state but does not compare changes.

### Fix

Add:

- what grew;
- what stayed the same;
- what dropped;
- which remedies left;
- which remain actual;
- next Dao step, if Dao is part of the check.

For repeat remedy check, the required structure is:

```md
1. Диагностика
2. Что изменилось
3. Что показывают препараты сейчас
4. Вывод
5. Решение
6. Назначение
7. Ожидаемое направление поддержки
8. Приложение. Послания препаратов
```

---

## 14. Repeat remedy check written in 4 parts

### Mistake

The user asks for a repeated report / remedy relevance check, but the agent writes the default 4-part report:

```md
1. Диагностика
2. Назначение
3. Примечание
4. Приложение
```

This is wrong for repeat remedy checks because it hides the dynamics.

### Fix

Use the canonical 8-part structure:

```md
1. Диагностика
2. Что изменилось
3. Что показывают препараты сейчас
4. Вывод
5. Решение
6. Назначение
7. Ожидаемое направление поддержки
8. Приложение. Послания препаратов
```

---

## 15. Old remedies marked as “left” without evidence

### Mistake

The report says:

```md
Почти ушли / стали фоном: Agrimony, Olive, Vine, Clematis, Water Violet.
```

But it does not explain what shows that they left or what old layer they represented.

### Fix

Always explain the old layer:

```md
Ушли или стали фоном препараты, которые показывали старый слой:
- Olive — полное истощение.
- Vine — жёсткое давление и попытку управлять ситуацией.
- Clematis — уход из контакта.
- Water Violet — холодную дистанцию и закрытость.
- Agrimony — маскировку боли через “всё нормально”.

Это говорит, что стало меньше защитного слоя.
Больше настоящести.
Но вместе с этим ближе проявился внутренний стресс.
```

If this explanation is absent, the repeat report is incomplete.

---

## 16. Unsafe certainty

### Mistake

The report states uncertain support as guaranteed outcome or explains a physical issue through only one inner reason.

### Fix

Use safe language:

- может поддержать;
- похоже на;
- needs verification;
- не заменяет медицинскую помощь.

For expected effects in repeat remedy check, write:

```md
Ожидаемое направление поддержки: может стать больше ...
Проверяем: ...
```

not:

```md
При приёме препаратов растёт ...
```

---

## 17. Over-polished style

### Mistake

The text is grammatically smooth but lifeless.

### Fix

Use shorter phrases, living rhythm, and direct observation:

```md
Смотрю.
Пока ресурс небольшой.
Но опора есть.
Главное — не давить, а стабилизировать.
```

---

## 18. Main rule

Most weak reports fail because they miss one of these:

- client-readiness;
- correct format;
- live tone;
- text density;
- bottleneck / weak point;
- next step;
- safe support language;
- for repeat checks: the 8-part structure;
- for repeat checks: an explanation of what shows old remedies left.

Fix those first.
