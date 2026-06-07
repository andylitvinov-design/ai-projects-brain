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
clarity → precision → living style → compactness → canonical 4-part form
```

The client should receive the distilled result, not the full reasoning path.

---

## 2. Four-part structure is mandatory, but compact

The canonical client report structure is:

1. Диагностика
2. Назначение
3. Примечание
4. Приложение

Keep these 4 parts, but do not force them to become large blocks.

For short / compact / repeat / Bach / Wu Xing progress reports, compress the logic **inside** the 4 parts:

```md
## 1. Диагностика
Dynamic conclusion.
Root / psychodynamics / psychosomatics.
Remedy or element signals.
Weak link / growth point.

## 2. Назначение
Canonical prescription format.
Main and additional layers preserved.

## 3. Примечание
One short paragraph: what to do / not do now.

## 4. Приложение
Remedy messages: supportive, motivating, therapeutic phrases.
```

Do not replace the Appendix with transformation-arrow analysis unless the user explicitly requests that format.

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
## 1. Диагностика

One compact paragraph with the main state / dynamic / meaning.
Then short root / psychodynamics.
Then only the signals that change the conclusion.
Then weak link / growth point.

## 2. Назначение

What to take / do / observe.
Course.
Recheck timing.

## 3. Примечание

Very short strategy for the current stage.

## 4. Приложение

Remedy messages if remedies are present.
```

The logic remains:

**вывод → корень → сигналы → слабое звено → назначение → примечание → послания**

---

## 5. Psychodynamic / psychosomatic block

The psychodynamic block should be short but precise and remain inside Диагностика unless a full separate psychosomatic report is requested.

It should answer:

- what inner pattern the dynamics points to;
- what the person is learning now;
- what must soften / strengthen;
- what direction of self-work is relevant.

Good:

```md
Корень здесь — страх расслабиться и потерять управление собой. Как будто внутри есть связка: “если отпущу контроль, могу провалиться”. Задача — учиться расслабляться без потери опоры.
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
There is a compact repeat Wu Xing + Bach note standard. It uses the canonical 4-part report structure and distills expanded input into a sharper client-facing conclusion.
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
- it breaks canonical 4-part form without need;
- it forces large sections when compact blocks would work;
- the first useful conclusion appears late;
- the psychodynamic block becomes a second full report;
- the client must read through process notes instead of receiving the distilled meaning;
- Appendix contains analysis instead of remedy messages.

Verdict:

```md
Needs rewrite: expanded input was not distilled into a sharper client-facing 4-part report.
```
