# Report Standard Improvement Protocol

This protocol tells Report Style & Standards Auditor how to improve the report-writing system, not only the current report.

Use it when the same report problem could repeat in future outputs.

---

## 1. When to suggest a standard update

Suggest a standard update when:

- a report uses the wrong format;
- the same style problem is likely to repeat;
- the report misses bottleneck or next check;
- remedies are described like encyclopedia entries;
- Dao / Wu Xing are used as theory, not diagnosis;
- safety language is weak;
- source routing is missing or confusing;
- a new report subtype appears and should be documented.

Do not suggest standard changes for one-off wording issues unless they reveal a repeated pattern.

---

## 2. Where to update

### `core/report-style-bible.md`

Use for living Russian style, rhythm, phrases, good/bad language, and examples of Andrey voice.

### `core/report-diagnosis-matrix.md`

Use for report type selection and rules such as: Wu Xing means Deep Diagnosis, symptom analysis only when assessed, remedy-only analysis stays remedy-only.

### `core/report-template.md`

Use for exact report templates and required sections.

### `consultations/report-logic.md`

Use for method-level report logic inside `alchemy-method`.

### `method/dao-resource-scale.md`

Use for Dao level interpretation, correct intervention by level, and next realistic step.

### `agent/report-agent-playbook.md`

Use for Report Agent operating rules.

### `project-ready/report-agent-project-instruction.md`

Use for compact runtime instructions inside a ChatGPT Project.

### `source-registry.json` and `system-index.json`

Use for routing, source discovery, and connecting new agent files.

---

## 3. Required proposal format

Every standard update proposal must include:

```md
Системная проблема:
...

Куда внести:
- файл:
- раздел:

Точный текст для вставки:
"..."

Почему это улучшит будущие отчёты:
...
```

---

## 4. Good standard update examples

### Missing bottleneck

Problem:
Reports describe state and remedies but do not name the main bottleneck.

Add to `core/report-template.md`:

```md
Every diagnosis must include one sentence:
Главный bottleneck сейчас — ...
```

### Dry GPT style

Problem:
Reports sound like a formal article.

Add to `core/report-style-bible.md`:

```md
Start with what is seen now. Do not begin with abstract explanation. Use: Смотрю. Я X.X. Главное здесь — ...
```

### Encyclopedia remedy descriptions

Problem:
Remedies are described generally, not as functions in the client's mechanism.

Add to `core/report-common-mistakes.md`:

```md
Bad: Данный препарат традиционно применяется...
Good: Cherry Plum — страх потерять контроль, когда внутри много сжатой силы.
```

---

## 5. Main rule

A standard update is useful only if it makes future reports easier to write correctly.

Do not create bureaucracy. Create reusable clarity.