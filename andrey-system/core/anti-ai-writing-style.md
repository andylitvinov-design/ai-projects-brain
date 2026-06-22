# Anti-AI Writing Style — Andrey Li Reports

Status: draft standard 1.0  
Owner: Andrey Li system  
Scope: client reports, Bach / homeopathy / naturopathy notes, Dao / Wu Xing diagnostics, business texts, and support notes written in Andrey's voice.

---

## 1. Purpose

This file is a final quality gate against generic AI-style writing.

It exists to protect report quality:

- remove generic GPT voice;
- remove formal filler and empty transitions;
- keep the text alive, short, diagnostic, and client-facing;
- preserve Andrey's living Russian style;
- make every paragraph give clarity, support, movement, or a check.

Main standard:

```md
The text should sound like a living diagnostic note from Andrey,
not like a polished generic report about a client.
```

The core movement stays:

```md
цифра → образ → bottleneck → опора → поддержка → проверка
```

Or even shorter:

```md
ясность → опора → что делать сейчас → что проверить потом
```

---

## 2. What counts as generic AI-style writing

In this system, generic AI-style writing means text that is:

- too smooth but not alive;
- formal instead of direct;
- long but low in useful signal;
- filled with universal phrases that fit any report;
- organized like an essay instead of a live diagnostic note;
- explaining the method instead of showing the current state;
- safe-sounding but vague;
- confident without enough data;
- full of support words without actual support.

Typical weak pattern:

```md
introductory framing → abstract explanation → category description → balanced conclusion → generic recommendation
```

Andrey-style report pattern:

```md
Смотрю → Я X.X → что происходит → образ → главный bottleneck → чем поддержать → когда проверить
```

---

## 3. External ideas absorbed into this standard

This standard adapts public writing-quality ideas, but does not copy an external guide.

Useful concepts:

1. AI-content cleanup discussions often point to repeated editorial commentary, formulaic conclusions, unsupported confidence, and unreliable references as warning signs.
2. Plain-language standards emphasize that writing should be clear, concise, direct, audience-aware, and easy to use.
3. AI-slop discussions describe low-quality generated text as filler that lacks substance, relevance, or meaning.
4. Quality research on generated text often evaluates coherence, relevance, and whether the text actually serves the reader.

How this translates into Andrey reports:

- no filler;
- no fake authority;
- no invented certainty;
- no method lecture when a client needs orientation;
- no long beautiful paragraph if one live sentence works better.

---

## 4. Weak phrases to rewrite

These phrases are not banned in every possible context, but they are strong warning signs.

### 4.1. Formal Russian markers

Avoid or rewrite:

```md
В данном отчёте рассматривается...
Следует отметить...
Важно подчеркнуть...
Необходимо отметить...
Клиент демонстрирует...
Данная ситуация указывает на...
На основании представленных данных можно сделать вывод...
Рекомендуется осуществлять мониторинг...
Можно сделать вывод о том, что...
В целом можно сказать...
Таким образом...
В заключение...
Данный процесс может способствовать...
```

Better Andrey-style replacements:

```md
Смотрю.
Главное здесь — ...
По состоянию видно ...
Как будто ...
Сейчас задача — ...
Это требует проверки.
Проверить лучше через ...
```

### 4.2. English markers, if writing in English

Avoid or rewrite:

```md
It is important to note that...
It is worth mentioning...
In conclusion...
Overall...
This highlights the importance of...
This can serve as a powerful tool for...
This comprehensive approach...
A nuanced understanding of...
```

Better:

```md
Main point:
What I see:
The bottleneck is:
The next step is:
Needs verification.
```

### 4.3. Inflated spiritual / therapeutic words

Use carefully. Do not let them replace diagnosis.

Weak when unsupported:

```md
глубокая трансформация
мощная активация
уникальный процесс
целостное восстановление
гармонизация на всех уровнях
выход на новый уровень
прорыв
```

Better:

```md
Здесь пока не прорыв.
Скорее нужно вернуть опору.
Ресурс есть, но он сжат.
Первым делом поддержать Воду / Я / тело.
```

---

## 5. The final Anti-AI pass

Before sending any client-facing text, the agent must run an internal Anti-AI pass.

Ask:

```md
1. Does this sound like Andrey is looking now?
2. Is the first useful state visible in the first 5–7 lines?
3. Can I remove 30–40% without losing meaning?
4. Are there abstract paragraphs that do not change the client's understanding?
5. Is there a number, image, bottleneck, support, or next check?
6. Are remedies/supports described by function, not encyclopedia description?
7. Is there any unsupported certainty or invented data?
8. Is safety present without turning the text into legal prose?
```

If the text fails, do not send it as final.

Rewrite it.

---

## 6. Rewrite principles

### 6.1. Replace framing with seeing

Bad:

```md
В данном отчёте рассматривается текущее состояние клиента и возможные направления поддержки.
```

Better:

```md
Смотрю.
Сейчас главное — не разгонять систему, а вернуть опору.
```

### 6.2. Replace category explanation with function

Bad:

```md
Aspen традиционно применяется при состояниях неопределённой тревожности, когда человек испытывает внутреннее беспокойство без очевидной причины.
```

Better:

```md
Aspen — фоновая тревожность, которая выбивает опору под ногами.
```

### 6.3. Replace long interpretation with bottleneck

Bad:

```md
Состояние клиента может быть связано с комплексным сочетанием эмоциональной нестабильности, сниженной способности к саморегуляции и недостаточным уровнем внутренней устойчивости.
```

Better:

```md
Главное здесь — не слабость.
Скорее система не держит опору, когда появляется неопределённость.
```

### 6.4. Replace generic recommendation with next action

Bad:

```md
Рекомендуется продолжать наблюдение за динамикой состояния и при необходимости корректировать поддержку.
```

Better:

```md
Проверить через 3–5 дней.
Если Я подрастёт хотя бы до 3.3, можно будет усиливать следующий слой.
```

### 6.5. Replace safety fog with precise caution

Bad:

```md
Данные рекомендации не являются медицинским заключением и должны рассматриваться исключительно как дополнительная информация.
```

Better:

```md
Это направление поддержки, не медицинский диагноз.
Если симптомы серьёзные, лучше параллельно держать связь с врачом.
```

---

## 7. Andrey-style replacement rules

### Rule 1. Start from the current state

Prefer:

```md
Смотрю.
Я 3.3.
Здоровье 3.1.
Сейчас состояние держится, но ресурс неустойчивый.
```

Avoid:

```md
Перед нами комплексная картина, в которой сочетаются несколько уровней внутренней динамики.
```

### Rule 2. One paragraph = one useful movement

Each paragraph should do one of these:

- name current state;
- give image;
- name bottleneck;
- show what is already resourceful;
- show what to support;
- name next check.

If a paragraph does none of this, remove it.

### Rule 3. Do not polish away life

Andrey's style can be slightly rough, direct, and spoken.

Good:

```md
Тут скорее как обескураженность.
Как будто человек чуть потерял управление.
Не всё рухнуло, но опора просела.
```

Too polished:

```md
Наблюдается снижение субъективного ощущения контроля, что может быть связано с актуализацией внутренней уязвимости.
```

### Rule 4. Keep method inside, client language outside

The agent may think in Dao, Wu Xing, Bach, psychodynamics, and bottleneck logic.

But the client-facing text should receive the useful result, not the whole reasoning chain.

```md
Depth inside. Simplicity outside.
```

### Rule 5. Use uncertainty honestly

Use:

```md
похоже на
может быть как
требует проверки
needs verification
это направление поддержки
```

Avoid:

```md
точно вызвано
гарантированно приведёт
обязательно уберёт симптом
```

---

## 8. Typical failures and fixes

### Failure A. The text explains too much before helping

Symptom:

- first useful point appears after 3–5 paragraphs;
- the report starts like an article;
- client must search for the point.

Fix:

```md
Move the current state and bottleneck into the first 5–7 lines.
Delete the theoretical entrance.
```

### Failure B. The report lists categories but does not diagnose

Symptom:

- Wu Xing elements are explained like a textbook;
- remedies are described like encyclopedia entries;
- no main axis.

Fix:

```md
For each element/remedy, write only:
number/state → what it means now → what to support.
```

### Failure C. The text is warm but vague

Symptom:

- many supportive words;
- no concrete state;
- no next step.

Fix:

```md
Add a number, image, bottleneck, and check date.
```

### Failure D. The text is safe but dead

Symptom:

- too many disclaimers;
- legalistic tone;
- no living voice.

Fix:

```md
Keep one precise safety sentence.
Return to human language.
```

### Failure E. The report sounds like a system prompt leaked into the client text

Symptom:

- source names;
- quality check;
- routing notes;
- internal labels;
- meta-comments about the report.

Fix:

```md
Remove all internal QA from the client-facing report.
Keep QA only in auditor output.
```

---

## 9. Before / After examples

### Example 1

Bad:

```md
Важно отметить, что данная ситуация может указывать на необходимость восстановления внутреннего ресурса и повышения уровня эмоциональной устойчивости.
```

Better:

```md
Главное здесь — ресурс просел.
Не катастрофа, но опоры пока мало.
Сначала надо вернуть устойчивость.
```

### Example 2

Bad:

```md
Клиент демонстрирует признаки внутреннего напряжения и сложности с адаптацией к текущим обстоятельствам.
```

Better:

```md
Смотрю: напряжение держится не на поверхности.
Как будто человек всё время собирает себя усилием.
```

### Example 3

Bad:

```md
В целом можно сказать, что предложенная поддержка будет способствовать гармонизации эмоционального состояния.
```

Better:

```md
Эта поддержка не про “гармонизацию”.
Она про то, чтобы снять внутренний зажим и вернуть дыхание.
```

### Example 4

Bad:

```md
Рекомендуется осуществлять мониторинг динамики и проводить коррекцию назначений при необходимости.
```

Better:

```md
Проверить через пару дней.
Если тревога уйдёт, часть препаратов можно будет снять.
```

### Example 5

Bad:

```md
На основании анализа У-Син можно предположить, что элемент Воды требует дополнительного внимания.
```

Better:

```md
Вода просела.
Там страх и желание сжаться.
Воду надо поддержать первой.
```

---

## 10. Auditor scoring rule

When auditing, treat Anti-AI compliance as part of:

- Live Russian style;
- Text density / absence of water;
- Client clarity;
- Client-send readiness;
- System usefulness.

Suggested scoring:

```md
10 — text is alive, specific, compressed, and sounds like Andrey.
8 — mostly alive; a few smooth or formal lines can be sharpened.
6 — understandable, but many generic phrases remain.
4 — formal report style dominates; needs rewrite.
2 — mostly generic prose, method summary, or generic coaching text.
0 — cannot be sent to client; internal QA/source notes or unsafe confidence present.
```

Hard fail:

```md
If the text sounds like generic prose rather than Andrey's living client message,
Живой стиль Андрея cannot be above 6/10.
```

---

## 11. Safety notes

Anti-AI editing must not remove necessary safety.

Do not remove:

- `needs verification` when data is uncertain;
- medical caution for serious symptoms;
- statement that support is not a medical diagnosis;
- reminder to keep medical care in parallel when relevant;
- limits around guarantees and promises.

But rewrite safety so it stays human.

Good:

```md
Это направление поддержки, не медицинский диагноз.
Если симптомы серьёзные, лучше держать связь с врачом.
```

Bad:

```md
Настоящий документ не является медицинской рекомендацией и предоставляется исключительно в информационных целях...
```

Use the longer legal version only if the context explicitly requires it.

---

## 12. Final checklist for agents

Before final answer, check:

```md
Anti-AI pass done: да/нет
Generic intro removed: да/нет
Formal filler removed: да/нет
Main state visible in first 5–7 lines: да/нет
Number / image / bottleneck present: да/нет
Support linked to mechanism: да/нет
Next check present: да/нет
Text can be shortened by 40% without loss: да/нет
Safety kept: да/нет
Client can receive this as Andrey's message: да/нет
```

If any of the core answers are weak, rewrite before sending.

---

## 13. How this file relates to other standards

Use together with:

- `andrey-system/core/report-style-bible.md` — main living Russian style standard;
- `andrey-system/core/report-client-readiness-style-gate.md` — sendability gate;
- `andrey-system/core/report-quality-rubric.md` — scoring;
- `andrey-system/agent/report-style-auditor-instructions.md` — auditor behavior;
- `alchemy-method/consultations/examples/confidence-bach-report-example.md` — primary live Russian example.

This file is narrower than the style bible.

It answers one question:

```md
What exactly should be removed or rewritten when the report starts sounding generic?
```

---

## 14. Minimal prompt for future agents

```md
Before finalizing, run `andrey-system/core/anti-ai-writing-style.md`.
Remove generic phrases, formal filler, long theoretical entrances, and polished but lifeless prose.
Rewrite into Andrey's live structure:

Смотрю → Я X.X → образ → bottleneck → поддержка → проверка.

Keep safety, uncertainty, and needs verification where needed.
Do not send text that sounds like a generic report.
```
