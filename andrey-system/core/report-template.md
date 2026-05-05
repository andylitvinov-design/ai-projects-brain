# Report Templates — Andrey Li Live Diagnostic Reports

This file defines the working report templates for Report Agent.

It follows Andrey's clarified diagnostic structure:

1. Depth:
   - Mini Express
   - Short Diagnosis
   - Deep Diagnosis
   - Full Client Report / Full Report on Limited Input
   - Remedy-Only Analysis

2. Status:
   - New Diagnosis
   - Repeat Diagnosis / Progress Check

Additional blocks:

- Psychosomatics / Link Between Self And Goal
- Symptom Analysis
- System Analysis
- Remedy Relevance Check

Main result of any report:

**ясность → опора → препарат / поддержка → проверка**

---

## 1. Before Writing Any Report

Choose:

```md
Depth:
- Mini Express
- Short Diagnosis
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

- any Wu Xing analysis, even a short numeric snapshot, means **Deep Diagnosis**;
- `Я + цель / здоровье` is almost always included;
- `симптом` is included only when Andrey specifically evaluates it;
- remedies/supports are included almost always;
- **Mini Express** is the exception: it may be without remedies;
- pure remedy analysis can be a standalone format;
- if a full report is requested, use the 4-part structure;
- full means useful structure, not extra water.

---

## 2. Universal Live Report Logic

Every report follows this movement:

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

## 3. Full Client Report — 4-Part Structure

Use this as the preferred structure for full reports.

It is especially important when:

- the user explicitly asks for a full report;
- the input is short but a full analysis is requested;
- Bach / remedies are used as diagnostic input;
- Wu Xing is included;
- the report needs diagnosis + support + psychodynamic note + appendix.

Length:

- full report from limited input: 900–1200 words;
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

Если есть У-Син / Bach:
- Стихия / препарат — одна фраза о роли
- Стихия / препарат — одна фраза о роли
- Missing element — needs verification

Ядро: ...
Поверхность: ...
Главный bottleneck: ...

## 2. Назначение

Основная поддержка:
- ... — функция / как принимать или применять, если известно

Вторичная поддержка:
- ... — функция

Что проверить в первом цикле:
- ...

## 3. Примечание

Психодинамика:
- какой блок / стресс / ключевой вызов;
- что не форсировать;
- стратегия успеха;
- признаки, что процесс пошёл.

## 4. Приложение

Опционально.

Кратко по препаратам:
- remedy — до 1–2 коротких абзацов.

Кратко по Dao / У-Син ступени:
...

Что ещё нужно проверить / добавить:
- ... needs verification
```

Rules:

- the main diagnosis goes in Part 1;
- dosage / application / tracking goes in Part 2;
- psychodynamics and strategy go in Part 3;
- expanded remedy or Dao/Wu Xing explanations go in Part 4;
- appendix is optional;
- do not repeat the same diagnostic formula in every part;
- no internal Quality check in the client-facing report;
- no registry/source notes in the client-facing report.

---

## 4. Mini Express

Use when:

- Andrey needs a tiny check;
- user asks for very short answer;
- no remedy selection is requested;
- no Wu Xing is needed;
- no support plan is required.

Length:

- 80–250 words.

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

No remedies by default.
No Wu Xing.
No long explanation.

---

## 5. Short Diagnosis — New

Use when:

- first check;
- limited data;
- quick orientation;
- mainly `Я + цель / здоровье` level;
- remedy or Bach selection is needed;
- no Wu Xing required.

Length:

- 250–600 words.

Template:

```md
Смотрю.

Я X.X.
Цель / здоровье X.X.
Симптом X.X, только если специально оценён.

Коротко что сейчас.
Как будто ...

Главное здесь — ...
Провисает прежде всего ...

ПОДБОР ПРЕПАРАТОВ
#1. ... — функция
#2. ... — функция
#3. ... — функция

ВЫВОД
Сейчас задача — ...
Поддерживаем ...

ПРОВЕРКА
Проверить через ...
Смотреть: ...
```

Do not add Wu Xing. If Wu Xing appears, switch to Deep Diagnosis.

---

## 6. Short Diagnosis — Repeat / Progress Check

Use when:

- previous diagnosis exists;
- user asks to recheck;
- quick state/remedy update is needed;
- no Wu Xing required.

Length:

- 150–500 words.

Template:

```md
Смотрю ещё раз.

Я X.X.
Здоровье / цель X.X.
Симптом X.X, только если специально оценён.

Пока состояние ...
Показатели выросли / без изменений / немного просели.

ВЫВОД
Сейчас главное — ...

ПРОВЕРКА ПРЕПАРАТОВ
Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ... — функция
- ... — функция

ДАЛЬШЕ
Оставить / добавить / убрать ...
Проверить через ...
```

If it is a very short follow-up, use:

```md
Привет. Ну как там?
Что-то уже начали / купили / нашли?

Сегодня проверил ещё раз.
Я X.X.
Что изменилось / без изменений.

Остаются актуальны:
- ...

Дальше: ...
```

---

## 7. Deep Diagnosis — New

Use when:

- any Wu Xing analysis is included;
- first serious report;
- enough data;
- health/symptom/systemic issue is present;
- support plan is needed;
- user does not need the 4-part full report format.

Length:

- 600–1200 words.

Template:

```md
Смотрю.

1. ФИГУРА Я / Я
Я X.X.
Что сейчас с Я.
Образ состояния.
Есть ли внутренний ресурс / потенциал.

2. ЦЕЛЬ / ЗДОРОВЬЕ
Цель / здоровье X.X.
Что показывает это поле.
Где ограничение / страх / сжатие / потеря управления.

3. СИМПТОМ
Только если специально оценён.
Симптом может отражать ...
Как будто ...

4. СВЯЗЬ Я И ЦЕЛИ / ЗДОРОВЬЯ
В Я есть ...
В цели / здоровье есть ...
Между ними застревает ...
Психологическая задача: ...

5. УСИН
Вода / почки — X.X
Что происходит.
Что поддержать.

Дерево / печень — X.X
Что происходит.
Что поддержать.

Огонь — X.X
Что происходит.
Что поддержать.

Земля — X.X
Что происходит.
Что поддержать.

Металл / лёгкие — X.X
Что происходит.
Что поддержать.

6. ВЫВОД
Dao ступень / образ, если виден.
Главный bottleneck.
Что поддерживаем первым.
Следующий реалистичный шаг.

7. НАЗНАЧЕНИЕ / ПОДДЕРЖКА
#1. Основная поддержка
- ... — функция

#2. Bach / эмоции
- ... — функция

#3. Натуропатия / тело
- ... — функция

#4. Гомеопатия / позже, если нужно
- ... — функция

8. ПРОВЕРКА
Что отслеживать.
Когда проверить.
```

Do not write textbook Wu Xing explanations.
Each element should be short: number → state → support.

Short explanatory method phrases are allowed when they clarify the current state.

Good:

```md
В норме Дерево даёт движение и рост. Здесь движение есть, но оно выходит через раздражение.
```

---

## 8. Deep Diagnosis — Repeat / Progress Check

Use when:

- there was previous work;
- full recheck is needed;
- Wu Xing progress should be compared;
- remedies need updating;
- Dao stage transition is visible.

Length:

- 400–900 words.

Template:

```md
Смотрю твою систему / Смотрю ещё раз.

Я X.X.
Здоровье / цель X.X.

Вода X.X
Дерево X.X
Огонь X.X
Земля X.X
Металл X.X

ВЫВОД
Показатели выросли / без изменений / просели.
Закрепилась / держится на уровне ...
Следующий шаг — ...

Что уже есть:
...

Чего пока не хватает:
...

ПРОВЕРКА ПРЕПАРАТОВ

Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ... — функция
- ... — функция

Менее актуальны, но могут пригодиться:
- ...

НАСТОЙКИ / НАТУРОПАТИЯ, если нужно
- ... — функция

ДАЛЬШЕ
Что оставить.
Что добавить / убрать.
Проверить через ...
```

A compact Wu Xing snapshot is still Deep Diagnosis.
Use full element explanation only if a specific element is clearly blocked.

---

## 9. Remedy-Only Analysis

Use when the task is only to analyze remedies, reactions, or current relevance.

Length:

- 250–700 words.

Template:

```md
Смотрю препараты.

ОСНОВНАЯ ТЕМА
Коротко что они вместе показывают.

ЯДРО
- remedy — role

РЕАКЦИЯ / ЭМОЦИИ
- remedy — role

АДАПТАЦИЯ / ЗАЩИТА
- remedy — role

АКТУАЛЬНЫ СЕЙЧАС
- ...

НЕ АКТУАЛЬНЫ / УШЛИ
- ...

ЧТО ПРОВЕРИТЬ ДАЛЬШЕ
- ...
```

This format can be used without `Я`, `цель`, or Wu Xing if the user only asks about remedies.

---

## 10. Additional Block — Psychosomatics / Link Between Self And Goal

Psychosomatics often means the link between:

```md
Я ↔ цель / здоровье / симптом
```

Use when the report needs to explain why the person cannot move from current state to goal/health.

Template:

```md
СВЯЗЬ Я И ЦЕЛИ / ЗДОРОВЬЯ
В Я есть ...
В цели / здоровье есть ...
Между ними застревает ...

Психологическая задача:
А. Вернуть ...
Б. Уменьшить ...
```

This can be included without a separate heading `ПСИХОСОМАТИКА`.

---

## 11. Additional Block — Symptom Analysis

Use only when symptom is specifically assessed.

Template:

```md
СИМПТОМ
Симптом может быть связан с ...
Как будто ...

Здесь важно не утверждать, а смотреть как психосоматическую модель.

Психологическая задача:
А. Вернуть ...
Б. Уменьшить ...
```

For figure-based psychosomatics:

```md
1. ФИГУРА Я
Сила Я ...
Сейчас Я ...
Образ: ...

2. СИМПТОМ
Симптом как будто про ...
Что в жизни похоже на это: ...

3. ФИГУРА ЗДОРОВЬЯ
Я ...
Я ...
Я ...

ВЫВОД
Задача — ...
```

Safety:

- use “может быть”, “похоже”, “модель”, `needs verification`;
- do not present as medical diagnosis;
- serious symptoms require medical support.

---

## 12. Additional Block — System Analysis

Use when external system matters: family, work, father, partner, institution, country, money, clients.

Template:

```md
СИСТЕМА
Здесь влияет не только внутреннее состояние.
Есть внешний контекст: ...

Как будто человек чувствует:
...

Задача:
вернуть своё место / право решать / чувство опоры.
```

Keep it short.
Do not turn it into full constellation unless asked.

---

## 13. Additional Block — Remedy Relevance Check

Use in repeat diagnosis.

Template:

```md
ПРОВЕРКА ПРЕПАРАТОВ

Уже НЕ актуальны / ушли:
- ...

АКТУАЛЬНЫ:
- ... — функция

Менее актуальны:
- ... — функция

Это уже уровень ...
```

Important distinction:

- crisis / trauma remedies;
- stabilization remedies;
- fine tuning remedies;
- physical support;
- emotional support.

---

## 14. Remedy / Support Language

Describe remedies by function, not encyclopedia style.

Good:

```md
Aspen — фоновая тревожность.
Mimulus — страх проявляться, действовать.
Hornbeam — отсутствие сил.
White Chestnut — сверхконтроль, попытка решить всё головой.
Clematis — уход от реальности, дистанцирование.
Horsetail — каркас, структура, опора, собраться в форму.
American Ginseng — мягкое восстановление нервной системы при перегрузке.
```

Bad:

```md
Данный препарат традиционно используется...
Он известен своим влиянием на...
```

---

## 15. Dao / Stage Language

Use Dao stage only when it helps.

Good:

```md
Закрепилась на уровне 5 ступени — Королева.
Следующий шаг — перейти на 6 ступень: Капитан.

Внутренний ресурс-потенциал уже есть.
Но пока не хватает смелости выходить самостоятельно в мир.
```

Do not explain the full Dao ladder unless asked.

---

## 16. Living Style Rules

Use:

```md
Смотрю.
Посмотрю, что сейчас.
Смотрю твою систему.
Сегодня проверил ещё раз.
Показатели немного подросли.
Но ресурс не такой большой.
Хорошо, что вовремя спохватились.
Эту опору будем создавать.
Это на потом.
```

Avoid:

```md
В данном отчёте рассматривается...
Следует отметить...
Данная комбинация свидетельствует...
Рекомендуется осуществлять мониторинг...
```

---

## 17. Safety

Alternative supports are not guarantees and not medical replacements.

Use:

- может поддержать;
- направление поддержки;
- требует проверки;
- по реакции нужно смотреть;
- не заменяет медицинскую помощь.

For serious medical symptoms:

```md
Лучше параллельно держать связь с врачом.
```

Never:

- diagnose medically;
- promise cure;
- tell client to stop treatment;
- invent facts;
- expose private data.

---

## 18. Final Checklist

Before finalizing:

- Mini Express, Short, Deep, Full 4-part, or Remedy-Only?
- New or Repeat?
- If there is Wu Xing, did you classify as Deep?
- If full report is requested, did you use 4 parts?
- Are `Я + цель/здоровье` included when relevant?
- Is symptom included only if specifically assessed?
- Is psychsomatic link needed between Self and goal/health?
- Is remedy relevance check needed?
- Are remedies described by function?
- Is the next check clear?
- Are uncertain points marked `needs verification`?
- No medical guarantees?
- No repeated diagnostic formula in every section?

Main rule:

**Самый сильный отчёт — не самый длинный.**

The strongest report gives:

**ясность → опору → препарат / поддержку → проверку**
