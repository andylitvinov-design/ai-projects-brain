# Report Quality Rubric — Andrey Li Reports

This rubric is used by Report Style & Standards Auditor to score and improve client reports.

A strong report gives:

ясность → опора → поддержка → проверка → движение.

But the report must also be possible to send to a real client as Andrey's living diagnostic message.

Main audit principle:

**client-ready living text first, method checklist second.**

A report can contain Dao, Wu Xing, bottleneck, support, and safety, and still be bad if it sounds dry, generic, inflated, or cannot be sent to a client.

---

## 1. Scoring scale

Score each category from 0 to 10.

- 0–3: weak / missing
- 4–6: partially works / needs rewrite
- 7–8: good but can improve
- 9–10: strong and client-ready

Always explain the main reason for low scores.

Do not score mechanically.

---

## 2. Client-Readiness Gate

Before scoring method details, answer:

```md
Можно ли отправить этот текст клиенту как живое письмо Андрея?
```

If the answer is **no**, the report cannot pass, even if all formal method blocks are present.

A report fails the Client-Readiness Gate if:

- it sounds like an academic note or a generic coaching report;
- it is inflated 2–3 times beyond the value of the input;
- the client must search through long explanations to understand the point;
- it teaches the method instead of diagnosing the current state;
- it contains internal QA, registry notes, or source-routing notes in the client-facing text;
- it can be compressed by 40% or more without losing meaning.

---

## 3. Anti-AI QA Gate

Before final scoring, run `core/anti-ai-writing-style.md`.

This gate checks whether the text is practical, alive, compressed, and client-ready.

The report fails this gate if:

- the first 5–7 lines do not orient the client;
- formal openings or generic phrases dominate;
- paragraphs do not have a clear function;
- remedy descriptions sound like encyclopedia entries;
- Wu Xing is explained like a textbook instead of diagnosed;
- recommendations stay vague instead of giving an exact next action;
- the report can be shortened by 30–40% without losing meaning;
- safety language is either missing or so legalistic that it kills the living voice.

Hard scoring rule:

```md
If Anti-AI / live style QA is below 7/10,
Готовность отправить клиенту cannot be above 6/10.
```

If the text sounds generic rather than like Andrey's living client message:

```md
Живой стиль Андрея cannot be above 6/10.
```

---

## 4. Required scoring block

Use this scoring block for audits:

```md
Живой стиль Андрея: X/10
Anti-AI / live style QA: X/10
Плотность текста / отсутствие воды: X/10
Соответствие формату: X/10
Клиентская ясность: X/10
Методическая точность: X/10
Bottleneck и главный механизм: X/10
Практический следующий шаг: X/10
Безопасность: X/10
Готовность отправить клиенту: X/10
Итог: проходит / не проходит / needs rewrite
```

---

## 5. Hard fail rules

### 5.1. Live style threshold

If **Живой стиль Андрея** is below 7/10, the report does not pass.

Reason: Andrey's reports are live diagnostic messages, not formal method summaries.

### 5.2. Anti-AI QA threshold

If **Anti-AI / live style QA** is below 7/10, the report does not pass as final client text.

Reason: a report can be methodically correct but still sound generic, inflated, formal, or lifeless.

### 5.3. Compression threshold

If the report can be shortened by 40%+ without loss of meaning:

- `Плотность текста / отсутствие воды` cannot be higher than 5/10;
- `Готовность отправить клиенту` cannot be higher than 6/10;
- final result cannot be stronger than `needs rewrite`.

### 5.4. Format inflation threshold

If the input is minimal and the report imitates a Full Client Report, the report fails format match.

Small input requires a compact living note or Deep Snapshot, not a full report facade.

### 5.5. Internal QA leakage

If the client-facing report contains registry status, source notes, or `Quality check`, the report does not pass as client-ready.

Internal QA belongs to the agent/auditor output only.

---

## 6. Categories

### Live Russian style

Checks whether the report sounds like Andrey's live diagnostic message, not a generic report.

Look for:

- `Смотрю`, `Я X.X`, `Главное здесь`, `Как будто`;
- short phrases and short paragraphs;
- number → image → meaning → action;
- warm direct tone;
- practical support;
- no academic over-explanation.

Bad signs:

- `в данном отчёте рассматривается`;
- `следует отметить`;
- `клиент демонстрирует`;
- long theoretical introductions;
- element encyclopedia blocks.

### Anti-AI / live style QA

Checks whether the report passed `core/anti-ai-writing-style.md` as a practical pre-delivery critic.

Look for:

- first 5–7 lines orient the client quickly;
- each paragraph has a function;
- weak phrases are removed or rewritten;
- method is translated into client meaning;
- generic recommendations become exact next actions;
- remedy and Wu Xing blocks are functional, not encyclopedic;
- safety is precise and human;
- the report does not contain polished filler.

Scoring:

```md
10 — no generic filler; phrase-level edits complete; report is alive and ready.
8 — mostly clean; 2–5 lines can still be sharpened.
6 — readable but still contains generic phrases or inflated blocks.
4 — formal/generic voice dominates; major rewrite needed.
2 — mostly method summary or generic coaching prose.
0 — not client-ready due to safety failure, internal QA leakage, or no useful client orientation.
```

### Text density / absence of water

Checks whether every paragraph gives:

- new clarity;
- a sharper image;
- a clearer bottleneck;
- practical support;
- a next check.

If a paragraph does not create clarity, support, or movement, remove it.

### Format match

Checks whether the actual text matches the real report type:

Mini Express, Short Diagnosis, Deep Diagnosis, Deep / Full Support Snapshot, Remedy-Only, Progress Check, Follow-Up, Psychosomatic Figure Report, or Full Support Report.

Do not confuse:

- full structure with full data;
- long report with full client report;
- remedy list with full diagnosis.

### Client clarity

Checks whether the client can quickly understand:

- what is happening now;
- what the main mechanism is;
- what to support first;
- what to do next;
- what to check later.

### Method accuracy

Checks whether the report follows Andrey Li method logic:

request → current state → Dao level → Wu Xing if relevant → hidden mechanism → bottleneck → support → next check.

Method accuracy is not enough by itself. It must be expressed in living client language.

### Bottleneck and main mechanism

Checks whether the report names the one main block rather than listing many parallel interpretations.

Strong reports separate:

- core axis;
- surface symptoms;
- what needs verification.

### Practical next step

Checks whether the client knows what to do now:

- what to support first;
- what remedy/support is current;
- what to observe;
- when to recheck.

### Safety

Checks that there are no medical diagnoses, cure promises, treatment-stopping advice, guarantees, invented facts, or private data exposure.

Use safe language without killing the living voice.

### Client-send readiness

Final answer to:

```md
Would Andrey be comfortable sending this to a client as-is?
```

If no, the report needs rewrite.

---

## 7. Quality check

Use this checklist at the end:

```md
Можно отправить клиенту: да/нет
Anti-AI pass выполнен: да/нет
Первые 7 строк дают состояние: да/нет
Живой стиль Андрея есть: да/нет
Текст сжатый и плотный: да/нет
Формат выбран правильно: да/нет
Размер соответствует входу: да/нет
Текущее состояние есть: да/нет
Dao уровень есть: да/нет/не нужен
У-Син есть: да/нет/не нужен
Скрытый механизм есть: да/нет
Bottleneck есть: да/нет
Поддержка связана с механизмом: да/нет
Следующий шаг есть: да/нет
Internal QA убран из клиентского текста: да/нет
Безопасность соблюдена: да/нет
Нужно обновить стандарты: да/нет
```

---

## 8. Main rule

The strongest report is not the longest report.

The strongest report gives:

**ясность → опора → что делать сейчас → что проверить потом**

If a report is methodically correct but dry, inflated, and not client-ready, score it low and require rewrite.
