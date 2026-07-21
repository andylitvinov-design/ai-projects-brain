# Report Agent — `/приложение` Transformation Format

Status: project-ready runtime instruction for the separate client follow-up command `/приложение`.

Use together with:

- `andrey-system/project-ready/report-agent-project-instruction.md`;
- `andrey-system/project-ready/report-agent-runtime-addendum-depth-compactness.md`.

## 1. Trigger

Apply this format when Andrey provides his own finished report or analysis and asks:

- `/приложение`;
- `напиши приложение по моему тексту`;
- `добавь приложение после моего отчёта`.

Return one finished second message that can be sent to the client immediately after Andrey’s original report.

Do not rewrite or summarize the original report. Do not repeat measurements, images, prescriptions or conclusions unless a short reference is necessary to reveal a new psychological mechanism.

## 2. Required content

The client appendix must contain:

1. one psychodynamic discovery based on Dao / Wu Xing dynamics;
2. what the remedies that left represented and what their disappearance says about the change of phase;
3. a transformational explanation of every currently relevant remedy;
4. what the client should notice in everyday life;
5. how to help: what to soften, what to strengthen, and one realistic direction of self-work.

## 3. Mandatory transformational remedy formula

Every currently relevant remedy must be described through two linked parts:

```md
[Remedy] — показывает: [какое состояние / защитный механизм / напряжение присутствует сейчас].
Направление поддержки: [к какому более зрелому, устойчивому или свободному состоянию помогает двигаться].
```

A compact one-line version is allowed:

```md
[Remedy] — от [текущее состояние / механизм] к [направление трансформации].
```

The meaning must always remain explicit:

```md
что показывает сейчас → к какому состоянию ведёт поддержка
```

Do not describe a remedy only as a static dictionary marker.

Bad:

```md
Larch — неуверенность в себе.
```

Good:

```md
Larch — показывает сомнение: «смогу ли я удержаться без постоянного контроля»; направление поддержки — к спокойному доверию своим силам и праву действовать без предварительного доказательства своей состоятельности.
```

Good compact form:

```md
Larch — от сомнения в своей способности справиться к спокойной уверенности и опоре на собственные силы.
```

## 4. Safety of transformation wording

The second part describes a direction of support, not a guaranteed result.

Prefer:

- `может поддержать переход к...`;
- `направление поддержки — ...`;
- `помогает двигаться от ... к ...`;
- `может смягчить ... и укрепить ...`.

Avoid guarantees:

- `переведёт`;
- `уберёт`;
- `исцелит`;
- `обязательно приведёт`;
- `полностью снимет`.

## 5. Main and additional layers

When Andrey distinguishes main and additional remedies, preserve this hierarchy.

- Main layer: describe the central transformation in slightly more depth.
- Additional layer: one concise transformational line per remedy.
- Do not make all remedies equally important.

## 6. Client flow

```md
**Дополнение. Психодинамика и препараты**

Главное открытие: ...

По У-Син это видно как ...

То, что ушли [старые препараты], показывает ...

Актуальные препараты:

[Препарат] — показывает ...; направление поддержки — ...
[Препарат] — от ... к ...
...

На что обратить внимание: ...

Как помочь: ...
```

Default length: 180–350 words.

The appendix fails if:

- remedies are described only as static traits;
- the current state is named but the direction of transformation is absent;
- the desired state is named but it is unclear what current mechanism the remedy reflects;
- there is no psychodynamic discovery;
- there is no practical psychological guidance;
- the text repeats Andrey’s original report instead of adding meaning.
