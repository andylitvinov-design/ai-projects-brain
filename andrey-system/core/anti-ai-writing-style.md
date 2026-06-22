# Anti-AI Writing Style QA Gate — Andrey Li Reports

Status: draft standard 2.0  
Owner: Andrey Li system  
Role: critic + fixer before client delivery  
Scope: client reports, Bach / homeopathy / naturopathy notes, Dao / Wu Xing diagnostics, business texts, support notes, and follow-up checks written in Andrey's voice.

---

## 0. What this file is

This file is not a style wish-list.

It is a practical QA gate.

Before a report goes to a client, this file acts as a critic:

```md
scan → mark weak phrases → score → rewrite → check again
```

The document must help the agent answer:

```md
Can this text be sent to a real client as Andrey's living message?
If not, what exactly must be cut, replaced, or rewritten?
```

Core standard:

```md
The report must not sound like a generic AI report.
It must sound like Andrey is looking at the client's state now.
```

Core movement:

```md
цифра → образ → bottleneck → опора → поддержка → проверка
```

Client result:

```md
ясность → опора → что делать сейчас → что проверить потом
```

---

## 1. Source ideas absorbed into this gate

This standard combines five idea families.

### 1.1. Andrey live report style

From existing system standards:

```md
Смотрю → Я X.X → состояние → образ → bottleneck → поддержка → проверка
```

Key rule:

```md
Depth inside. Simplicity outside.
```

The agent may think in Dao, Wu Xing, Bach, remedy logic, psychodynamics, and safety.

The client should receive the useful result, not the whole reasoning chain.

### 1.2. Plain language / clear writing

Use plain-language principles:

- put the useful point early;
- write for the reader's next action;
- remove filler;
- use concrete words;
- prefer short sentences;
- one paragraph = one useful movement.

### 1.3. AI-style cleanup patterns

Common weak AI patterns:

- formulaic introductions;
- formulaic conclusions;
- repeated balanced phrasing;
- editorial commentary instead of content;
- unsupported confidence;
- generic claims that fit any client;
- long smooth paragraphs with little diagnostic value.

### 1.4. AI slop / low-signal content

Low-signal generated text usually has one or more of these problems:

- lots of words, little useful information;
- no specific reader value;
- no real decision support;
- no clear next action;
- safe but vague;
- polished but empty.

### 1.5. Report safety standards

Anti-AI editing must never remove necessary safety.

Keep:

- `needs verification` when data is uncertain;
- medical caution when symptoms are serious;
- no cure guarantees;
- no advice to stop medical care;
- no invented facts;
- no fake precision.

Safety must be precise, not dead.

Good:

```md
Это направление поддержки, не медицинский диагноз.
Если симптомы серьёзные, лучше держать связь с врачом.
```

Weak:

```md
Настоящий документ предоставляется исключительно в информационных целях и не является заменой консультации специалиста...
```

Use long legal phrasing only when the context explicitly requires it.

---

## 2. Mandatory QA workflow

Run this workflow before final delivery.

### Step 1. First 7 lines test

Check the first 5–7 lines.

They must show at least 3 of these:

```md
Смотрю / Посмотрел
Я X.X / ресурс X.X
текущее состояние
главная проблема
образ
bottleneck
первый шаг поддержки
```

Fail signs:

- the report starts with a formal introduction;
- the client does not know what is happening after 7 lines;
- there is a title, context, and explanation, but no state;
- the text begins like an article.

Fix:

```md
Move the current state and bottleneck to the top.
Delete the theoretical entrance.
Start with what is seen now.
```

### Step 2. Paragraph signal test

For each paragraph, mark its function:

```md
STATE — names current state
NUMBER — gives Dao / resource / Wu Xing level
IMAGE — gives living image
BOTTLENECK — names the main block
SUPPORT — gives support direction
ACTION — tells what to do
CHECK — tells when/how to verify
SAFETY — keeps safe limits
```

If a paragraph has no function, cut it.

If three paragraphs repeat the same function, compress them into one.

Rule:

```md
Every paragraph must create clarity, support, or movement.
```

### Step 3. Phrase detox

Scan for weak phrases from section 5.

For each phrase:

```md
mark → decide if needed → replace with living wording → re-read
```

If a phrase is safety-critical, keep the meaning but rewrite it humanly.

### Step 4. Method-to-client translation

Check whether the text teaches the method instead of helping the client.

Weak:

```md
Element Water corresponds to fear, kidneys, depth, and survival. In this case it indicates...
```

Better:

```md
Вода просела.
Там страх и желание сжаться.
Воду надо поддержать первой.
```

Rule:

```md
No textbook blocks in client-facing text unless the user explicitly asked for teaching.
```

### Step 5. Compression test

Ask:

```md
Can I cut 30–40% without losing meaning?
```

If yes:

- `Плотность текста / отсутствие воды` cannot be above 5/10;
- `Готовность отправить клиенту` cannot be above 6/10;
- the report needs rewrite.

Compress by removing:

- duplicated interpretations;
- long introductions;
- category explanations;
- generic encouragement;
- repeated safety phrasing;
- remedy encyclopedia blocks.

### Step 6. Practicality test

The client must know:

```md
1. What is happening now?
2. What is the main bottleneck?
3. What should be supported first?
4. What exactly to do now?
5. When to check again?
```

If any answer is missing, the text is not ready.

### Step 7. Safety test

Check for hard safety failures:

- medical diagnosis presented as fact;
- promise of cure;
- guaranteed result;
- advice to stop treatment;
- invented data;
- private data leakage;
- too much certainty without data.

Fix by adding precise caution:

```md
Это направление поддержки.
Требует проверки.
Не заменяет медицинскую помощь.
```

---

## 3. Pass / fail rules

### Hard fail

The text cannot be sent if:

```md
Живой стиль Андрея < 7/10
or
client-readiness < 7/10
or
text can be shortened by 40%+ without loss
or
there is no current state
or
there is no bottleneck
or
there is no next step / check
or
there is unsafe certainty
or
internal QA/source notes leaked into client text
```

### Conditional pass

The text can pass with minor edits if:

```md
main state is clear
bottleneck is present
support is linked to mechanism
style is mostly alive
only 3–7 phrases need sharpening
safety is intact
```

### Strong pass

The text is strong if:

```md
first 7 lines orient the client
numbers are alive, not formal
image is present
bottleneck is simple
support is practical
next check is clear
no generic filler remains
```

---

## 4. QA scoring card

Use this scoring card before final delivery.

```md
Anti-AI / live style QA

First 7 lines show useful state: X/10
Generic phrase load: X/10
Text density / no water: X/10
Andrey voice: X/10
Number → image → bottleneck chain: X/10
Support linked to mechanism: X/10
Practical next step: X/10
Safety without dead legal tone: X/10
Client-send readiness: X/10

Verdict: pass / minor rewrite / major rewrite / do not send
```

Scoring guide:

```md
10 — alive, specific, compressed, client-ready.
8 — strong, but a few lines can be sharpened.
6 — understandable, but generic phrases and smooth filler remain.
4 — formal report style dominates; rewrite required.
2 — mostly generic prose, method summary, or coaching filler.
0 — unsafe, leaked internal QA, or cannot be sent.
```

---

## 5. Weak phrase detector

Use this as a literal scan list.

### 5.1. Formal report openings

Mark and usually delete:

```md
В данном отчёте рассматривается...
В этом отчёте я рассмотрю...
Ниже представлен анализ...
Перед нами комплексная картина...
На основании предоставленной информации...
```

Replace with:

```md
Смотрю.
Посмотрел.
Смотрю твою систему.
Сейчас видно вот что.
Главное здесь — ...
```

### 5.2. Empty emphasis phrases

Mark and replace:

```md
Важно отметить...
Следует отметить...
Необходимо подчеркнуть...
Стоит обратить внимание...
Следует учитывать...
```

Replace with the actual point:

```md
Главное здесь — ...
Сейчас важнее всего ...
Тут не про ..., а про ...
Это требует проверки.
```

### 5.3. Institutional / clinical distance

Mark and rewrite:

```md
Клиент демонстрирует...
У клиента наблюдается...
Наблюдается тенденция к...
Имеет место снижение...
Проявляется дисбаланс...
```

Replace with:

```md
Смотрю: ...
По состоянию видно ...
Как будто ...
Тело / система сейчас ...
Здесь проседает ...
```

### 5.4. Abstract conclusion formulas

Mark and usually delete:

```md
Таким образом...
В целом можно сказать...
Подводя итог...
В заключение...
Это говорит о том, что...
Можно сделать вывод, что...
```

Replace with:

```md
Вывод простой:
Главное:
Сейчас задача:
Дальше:
Проверить через:
```

### 5.5. Generic recommendation formulas

Mark and rewrite:

```md
Рекомендуется продолжать наблюдение...
Рекомендуется осуществлять мониторинг...
Необходимо провести коррекцию...
Следует уделить внимание...
В дальнейшем целесообразно...
```

Replace with:

```md
Проверить через 3–5 дней.
Если станет легче — снять лишнее.
Если ресурс не подрастёт — усилить опору.
Пока оставить #1 и #2.
```

### 5.6. Remedy encyclopedia language

Mark and compress:

```md
Препарат традиционно применяется при...
Данное средство может быть полезно в ситуациях, когда...
Эссенция направлена на гармонизацию...
Способствует восстановлению баланса...
```

Replace with functional language:

```md
Aspen — фоновая тревожность.
White Chestnut — сверхконтроль, голова не отпускает.
Hornbeam — нет сил начать.
Horsetail — каркас, структура, опора.
```

### 5.7. Inflated transformation language

Mark and require proof:

```md
глубокая трансформация
мощная активация
полное восстановление
гармонизация на всех уровнях
выход на новый уровень
прорыв
```

Replace with grounded wording:

```md
Пока задача проще.
Вернуть опору.
Снять зажим.
Удержать ресурс.
Проверить динамику.
```

### 5.8. Unsupported certainty

Mark as safety risk:

```md
точно вызвано
это причина
обязательно поможет
гарантированно приведёт
уберёт симптом
решит проблему
```

Replace with:

```md
похоже на
может быть как
вероятно
это направление поддержки
требует проверки
needs verification
```

---

## 6. Rewrite recipes

### Recipe 1. Article intro → live opening

Bad:

```md
В данном отчёте рассматривается текущее состояние клиента, его эмоциональный фон и возможные направления поддержки.
```

Rewrite:

```md
Смотрю.
Сейчас главное — ресурс просел, но не рухнул.
Нужно вернуть опору и не разгонять систему раньше времени.
```

### Recipe 2. Abstract psychology → image + bottleneck

Bad:

```md
Клиент демонстрирует признаки внутреннего напряжения, связанного с трудностью адаптации к внешним обстоятельствам.
```

Rewrite:

```md
Смотрю: напряжение держится не на поверхности.
Как будто человек всё время собирает себя усилием.
Главный bottleneck — нет спокойной опоры внутри.
```

### Recipe 3. Method explanation → client meaning

Bad:

```md
Элемент Дерева связан с движением, ростом, направлением и способностью проявлять волю.
```

Rewrite:

```md
Дерево просело.
Трудно двинуться вперёд и проявиться.
Нужна не сила давления, а точка направления.
```

### Recipe 4. Remedy description → role in mechanism

Bad:

```md
White Chestnut может быть полезен при навязчивых мыслях и повторяющихся ментальных циклах.
```

Rewrite:

```md
White Chestnut — голова не отпускает.
Нужен, чтобы снять сверхконтроль и дать системе выдохнуть.
```

### Recipe 5. Generic conclusion → next check

Bad:

```md
В дальнейшем рекомендуется наблюдать за динамикой и корректировать поддержку при необходимости.
```

Rewrite:

```md
Проверить через 3–5 дней.
Если тревога снизится, можно будет снять второстепенные препараты.
Если Я не подрастёт — усиливать опору.
```

### Recipe 6. Dead safety → human safety

Bad:

```md
Данный анализ не является медицинской рекомендацией и не заменяет консультацию профильного специалиста.
```

Rewrite:

```md
Это направление поддержки, не медицинский диагноз.
Если симптомы серьёзные, лучше держать связь с врачом.
```

---

## 7. Report-type specific checks

### 7.1. Mini Express

Must have:

```md
1 current state
1 bottleneck
1 support direction
1 next step
```

Must not have:

```md
long Wu Xing explanation
full remedy encyclopedia
big theory block
```

### 7.2. Short Diagnosis

Must have:

```md
current state
Dao level if available
main mechanism
bottleneck
support
check
```

Must not become a Full Report unless input is rich enough.

### 7.3. Deep Diagnosis / Wu Xing

Must have:

```md
Wu Xing as diagnosis, not textbook
numbers or clear state
main imbalance
bottleneck
support linked to element/resource
```

Each element should be compact:

```md
number/state → what it means now → what to support
```

### 7.4. Remedy-only / Bach decoder

Must have:

```md
main emotional field
mechanism
roles of remedies
main vs secondary supports
what to check next
```

Must not become a full client report unless asked.

### 7.5. Progress / repeat check

Must have dynamics:

```md
what grew
what left
what remains actual
what is less actual
next layer
next check
```

Fail if it only repeats the first report.

### 7.6. Follow-up note

Must be short:

```md
Привет / Ну как там?
Что началось / не началось?
Current state
What remains relevant
One next question or action
```

Fail if it expands into a full report.

### 7.7. Psychosomatic figure report

Must keep careful language:

```md
похоже на
может быть как
психосоматическая модель
требует проверки
```

Must not claim direct medical cause.

---

## 8. Practical line-editing checklist

Use this for actual editing.

```md
[ ] Delete formal opening.
[ ] Move current state into first 7 lines.
[ ] Add / keep Я X.X if available.
[ ] Add image if text is abstract.
[ ] Name one main bottleneck.
[ ] Cut duplicated interpretations.
[ ] Replace “клиент демонстрирует” style phrases.
[ ] Compress remedy descriptions into function lines.
[ ] Remove textbook Wu Xing explanations.
[ ] Turn generic recommendation into exact next action.
[ ] Keep one precise safety note if needed.
[ ] Remove internal QA, source notes, routing notes.
[ ] Check that each paragraph has a function.
[ ] Re-read aloud: does it sound like Andrey?
```

---

## 9. The critic's output format

When this file is used as a critic, the agent should output edits in this form:

```md
## Anti-AI QA verdict
Verdict: pass / minor rewrite / major rewrite / do not send
Main problem:
What to cut:
What to rewrite:
Safety issue, if any:

## Phrase hits
- “...” → why weak → replacement
- “...” → why weak → replacement

## Structural fixes
1. Move ... to the top.
2. Cut ...
3. Add ...

## Improved fragment
...

## Final check
First 7 lines useful: да/нет
Bottleneck present: да/нет
Support linked to mechanism: да/нет
Next check present: да/нет
Safety preserved: да/нет
Client-ready: да/нет
```

---

## 10. Examples: bad → better

### 10.1. Empty emphasis

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

### 10.2. Clinical distance

Bad:

```md
Клиент демонстрирует признаки внутреннего напряжения и сложности с адаптацией к текущим обстоятельствам.
```

Better:

```md
Смотрю: напряжение держится не на поверхности.
Как будто человек всё время собирает себя усилием.
```

### 10.3. Generic support

Bad:

```md
В целом можно сказать, что предложенная поддержка будет способствовать гармонизации эмоционального состояния.
```

Better:

```md
Эта поддержка не про “гармонизацию”.
Она про то, чтобы снять внутренний зажим и вернуть дыхание.
```

### 10.4. Vague monitoring

Bad:

```md
Рекомендуется осуществлять мониторинг динамики и проводить коррекцию назначений при необходимости.
```

Better:

```md
Проверить через пару дней.
Если тревога уйдёт, часть препаратов можно будет снять.
```

### 10.5. Textbook Wu Xing

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

### 10.6. Overbuilt conclusion

Bad:

```md
Таким образом, можно сделать вывод, что работа должна быть направлена на постепенное восстановление внутренней устойчивости, эмоционального баланса и способности к самостоятельному движению.
```

Better:

```md
Вывод простой.
Сначала опора.
Потом движение.
Сейчас рано требовать от себя рывка.
```

---

## 11. What not to overcorrect

Do not remove all softness.

Some phrases are useful in Andrey's style:

```md
похоже на
как будто
может быть
в принципе
я вижу возможность
это требует проверки
```

They keep the report human and safe.

Do not remove all repetitions.

Some repetition is useful when it builds support:

```md
Ты важный.
Ты решаешь.
Ты главный.
```

Do not remove all disclaimers.

Safety must remain when needed.

Do not turn Andrey's living rhythm into sterile minimalism.

The goal is not shorter at any cost.

The goal is:

```md
more signal, less filler
more life, less formal polish
more support, less generic comfort
```

---

## 12. Final delivery gate

Before final output, answer:

```md
Anti-AI pass done: да/нет
Generic intro removed: да/нет
Formal filler removed: да/нет
Main state visible in first 7 lines: да/нет
Number / image / bottleneck present: да/нет
Support linked to mechanism: да/нет
Next check present: да/нет
Text can be shortened by 40% without loss: да/нет
Safety kept: да/нет
Client can receive this as Andrey's message: да/нет
```

If any of these are weak:

```md
Do not send.
Rewrite first.
```

---

## 13. Relation to other standards

Use together with:

- `andrey-system/core/report-style-bible.md` — main living Russian style standard;
- `andrey-system/core/report-client-readiness-style-gate.md` — sendability gate;
- `andrey-system/core/report-quality-rubric.md` — scoring;
- `andrey-system/agent/report-style-auditor-instructions.md` — auditor behavior;
- `andrey-system/agent/report-style-auditor-playbook.md` — audit workflow;
- `alchemy-method/consultations/examples/confidence-bach-report-example.md` — primary live Russian example.

This file is narrower than the style bible.

It answers:

```md
What exactly should the critic cut, mark, and rewrite before the client sees the report?
```

---

## 14. Minimal prompt for future agents

```md
Before finalizing a client report, run `andrey-system/core/anti-ai-writing-style.md` as a critic.

Do not just say “style is okay”.
Scan the text.
Mark weak phrases.
Cut filler.
Rewrite formal lines.
Check the first 7 lines.
Check every paragraph for function.
Keep safety.
Make the text sound like Andrey is looking now.

Final structure should move toward:
Смотрю → Я X.X → образ → bottleneck → поддержка → проверка.
```
