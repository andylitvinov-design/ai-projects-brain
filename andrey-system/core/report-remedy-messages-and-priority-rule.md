# Report Remedy Messages And Priority Rule

Status: canonical supplement for Report Agent and Report Style Auditor.

This rule fixes two recurring mistakes:

1. The prescription loses main vs additional remedy layers.
2. The Appendix becomes a transformation table or analysis instead of remedy messages.

---

## 1. Prescription priority rule

If the diagnosis or incoming data separates remedies into a main layer and an additional layer, preserve that priority in `Назначение`.

Correct:

```md
#1. В первую очередь подходят: Эссенции Баха:
1. Mimulus (конкретный страх)
2. Wild Oat (поиск направления)

#2. Дополнительно:
3. Impatiens (внутреннее ускорение)
4. Crab Apple (очищение / внутренний дискомфорт)
```

Wrong:

```md
#1. В первую очередь подходят: Эссенции Баха:
1. Mimulus
2. Wild Oat
3. Impatiens
4. Crab Apple

#2. Дополнительно: пока не добавляю.
```

Never write `#2. Дополнительно: пока не добавляю` if additional remedies are already present.

---

## 2. Appendix remedy messages rule

For Bach / remedy reports with 2+ remedies, the fourth section `Приложение` must contain remedy messages unless the user explicitly asks for ultra-short without Appendix.

The Appendix is not for:

- repeating remedy functions;
- further analysis;
- long explanations;
- transformation-arrow tables by default.

Use this format:

```md
Mimulus — послание: я могу расслабляться постепенно и оставаться в безопасности.

Wild Oat — послание: моё направление может дозреть спокойно, без давления и спешки.

Impatiens — послание: я могу двигаться медленно, устойчиво и всё равно продвигаться вперёд.

Crab Apple — послание: я могу принимать процесс очищения и восстановления без отвержения себя.
```

The message must be:

- supportive;
- motivating;
- therapeutic;
- written as an inner support phrase;
- one short phrase per remedy.

---

## 3. Audit consequence

A report needs correction if:

- all remedies are placed into #1 when #2 exists;
- additional remedies disappear from `Назначение`;
- `#2. Дополнительно: пока не добавляю` appears while additional remedies exist;
- Appendix contains `от ... → к ...` transformation arrows instead of remedy messages;
- Appendix repeats analysis instead of giving client-supporting phrases.

Correct verdict:

```md
Needs correction: prescription priority and remedy messages are not aligned with the canonical report format.
```
