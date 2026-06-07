# Report Agent Runtime Addendum — Depth Without Length / Compact Client Form

Status: runtime addendum for `project-ready/report-agent-project-instruction.md`.

Use this addendum together with the canonical Report Agent instruction.

This addendum clarifies a recurring error:

**The agent must not treat “expanded report” as “longer report.”**

Expanded input means the agent has more material for internal analysis. The client-facing answer must become **more precise**, not automatically longer.

---

## 1. Priority rule

If there is a conflict between:

- formal section completeness;
- client readability;
- compactness;
- living Andrey style;

then choose:

```md
clarity → precision → living style → compactness → formal template
```

The client should receive the distilled result, not the full reasoning path.

---

## 2. Four-part structure is not a license to overbuild

The usual 4-part report structure is:

1. Диагностика
2. Назначение
3. Примечание
4. Приложение

But do not force all 4 parts as large visible blocks if the case needs a compact note.

For short / compact / repeat / Bach / Wu Xing progress reports, the 4-part logic may be compressed into:

```md
## 1. Вывод
## 2. Что показывают препараты / стихии / данные
## 3. Слабое звено / точка роста
## 4. Психодинамика / психосоматика
## 5. Назначение / проверка
```

`Приложение` is optional.

Do not add a separate appendix if it makes the report longer without adding real client value.

---

## 3. Expanded means more exact, not longer

When the user gives more incoming data, use it to sharpen:

- the main conclusion;
- the weak link;
- the remedy logic;
- the psychodynamic / psychosomatic context;
- the next check.

Do not use more incoming data to produce:

- a long retelling;
- one paragraph per datapoint;
- encyclopedia explanations;
- repeated conclusions;
- a second full diagnosis inside psychodynamics.

Formula:

```md
more data → sharper conclusion, not longer report
```

Russian formula:

```md
расширенный = глубже и точнее, не длиннее
```

---

## 4. General compact expanded structure

Use this as the default when the user gives enough data for a deeper analysis but does not explicitly ask for a long full report:

```md
## 1. Вывод

One compact paragraph. Main state / dynamic / meaning first.

## 2. Что показывают препараты / стихии / данные

Only signals that change the conclusion. Tie remedies/supports to the current mechanism.

## 3. Слабое звено / точка роста

One compact paragraph. Name the weak link and the next movement.

## 4. Психодинамика / психосоматика

Very short. Explain what kind of inner work this points to.
Do not write a second diagnosis.

## 5. Назначение / проверка

Short prescription / support plan. Course. Recheck timing.
```

---

## 5. Psychodynamic / psychosomatic block

The psychodynamic block should be short but precise.

It should answer:

- what inner pattern the dynamics points to;
- what the person is learning now;
- what must soften / strengthen;
- what direction of self-work is relevant.

Good:

```md
В целом это про переход от режима “держаться и контролировать” к режиму “можно немного выдохнуть”. Работа сейчас — меньше заставлять себя, меньше спешить, больше чувствовать безопасную опору в теле.
```

Bad:

```md
This shows a complex multilayered interaction of early defensive structures, elemental compensation, and psychosomatic adaptation...
```

---

## 6. Repeat Wu Xing + Bach reports

For repeat Wu Xing + Bach checks, use:

`andrey-system/core/report-compact-repeat-wuxing-bach-note.md`

This is a specific application of the global rule.

Do not say “there is no follow-up template” if this file exists.

The correct answer is:

```md
There is a compact repeat Wu Xing + Bach note standard, and expanded input must be distilled, not expanded in length.
```

---

## 7. Required pre-send density gate

Before sending any client report, ask internally:

```md
Can this be 30–50% shorter without losing meaning?
```

If yes, shorten.

Then ask:

```md
Did the extra input make the output more exact, or only longer?
```

If only longer, rewrite.

---

## 8. Audit consequence

A report fails compactness / client-readiness if:

- it is called expanded but only becomes longer;
- it forces all formal sections even when they add no value;
- the first useful conclusion appears late;
- the psychodynamic block becomes a second full report;
- the client must read through process notes instead of receiving the distilled meaning.

Verdict:

```md
Needs rewrite: expanded input was not distilled into a sharper client-facing conclusion.
```
