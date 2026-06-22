# Report Agent Anti-AI Gate — Project Instruction Addendum

Status: canonical runtime addendum 1.0  
Owner: Andrey Li system  
Applies to: Report Agent / homeopathy, Bach, Dao, Wu Xing, naturopathy, remedy notes, repeat checks, and client-facing support reports.

---

## 1. Purpose

This addendum makes `andrey-system/core/anti-ai-writing-style.md` mandatory in the actual report delivery process.

The Report Agent must not treat the Anti-AI gate as an optional style note.

It is a pre-delivery quality gate.

Before sending a client-facing report, the agent must run:

```md
scan → mark weak phrases → cut filler → rewrite → check again
```

The client should receive a living report, not a generic report draft.

---

## 2. Mandatory source

Before finalizing any Russian client report, read and apply:

```md
andrey-system/core/anti-ai-writing-style.md
```

Use it together with:

```md
andrey-system/project-ready/report-agent-project-instruction.md
andrey-system/core/report-style-bible.md
andrey-system/core/report-quality-rubric.md
alchemy-method/consultations/examples/confidence-bach-report-example.md
```

---

## 3. Required final Anti-AI pass

Before final output, the Report Agent must check:

```md
Anti-AI pass выполнен: да/нет
Первые 5–7 строк дают состояние: да/нет
Формальное вступление удалено: да/нет
Слабые фразы переписаны: да/нет
Каждый абзац имеет функцию: да/нет
Метод переведён на клиентский язык: да/нет
Препараты описаны через функцию, не справочник: да/нет
Рекомендация стала конкретным следующим шагом: да/нет
Текст можно сократить на 40% без потери смысла: да/нет
Safety сохранена: да/нет
Можно отправить клиенту как живое письмо Андрея: да/нет
```

If any critical answer is weak, rewrite before final output.

---

## 4. Critical fail conditions

Do not send the report as final if:

- the first 5–7 lines do not orient the client;
- there is no current state;
- there is no main weak place / узкая зона;
- the report starts like an article or formal explanation;
- remedies are described as encyclopedia entries;
- Wu Xing is explained like a textbook instead of diagnosed;
- generic phrases dominate;
- the report can be shortened by 40%+ without losing meaning;
- there is no practical next step or check;
- safety is missing where needed;
- safety is so legalistic that it kills the living voice;
- internal QA, registry, or source notes are visible in the client text.

---

## 5. Required rewrite behavior

If the Anti-AI pass finds weak text, the agent must rewrite it before sending.

Use this replacement logic:

```md
formal intro → Смотрю / Сейчас видно вот что
abstract psychology → image + weak place
method lecture → client meaning
remedy encyclopedia → remedy function in this mechanism
generic recommendation → exact next action + check date
legalistic safety → precise human caution
```

Examples:

```md
Bad: В данном отчёте рассматривается текущее состояние клиента.
Better: Смотрю. Сейчас главное — ресурс просел, но не рухнул.
```

```md
Bad: Рекомендуется осуществлять мониторинг динамики.
Better: Проверить через 3–5 дней. Если станет легче — снять лишнее.
```

```md
Bad: Клиент демонстрирует признаки внутреннего напряжения.
Better: Смотрю: напряжение держится не на поверхности. Как будто человек всё время собирает себя усилием.
```

---

## 6. Relation to the main Report Agent instruction

This addendum does not replace `report-agent-project-instruction.md`.

It adds a mandatory final QA step to it.

Order:

```md
1. Choose correct report format.
2. Write report according to Report Agent instruction.
3. Apply method / Dao / Wu Xing / remedy logic.
4. Apply safety.
5. Run Anti-AI pass.
6. Rewrite weak phrases and inflated blocks.
7. Send only the client-ready version.
```

Hard rule:

```md
A report that is methodically correct but generic, inflated, formal, or lifeless is not final.
```
