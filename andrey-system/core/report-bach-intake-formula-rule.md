# Report Bach Intake Formula Rule

Status: canonical override supplement for Report Agent.

This rule fixes the intake wording for Bach essence prescriptions in client reports.

---

## Canonical intake wording

For Bach essence reports, use this intake formula:

```md
Принимать:

* смесь: чуть воды и по 4 капли каждого препарата;
* 2–4 раза в день.
```

Do not replace it with:

```md
по инструкции производителя
```

unless the user explicitly asks for a medically cautious / manufacturer-label wording.

---

## Canonical prescription block

Use this structure for Bach prescriptions:

```md
## 2. Назначение

Отобранные эссенции:

#1. В первую очередь подходят: Эссенции Баха:

1. Mimulus (конкретный страх)
2. Wild Oat (поиск направления)

#2. Дополнительно:
3. Impatiens (внутреннее ускорение)
4. Crab Apple (очищение / внутренний дискомфорт)

Можно купить в натуропатической аптеке или заказать онлайн.

Принимать:

* смесь: чуть воды и по 4 капли каждого препарата;
* 2–4 раза в день.

Курс: 2 недели.

Повторная проверка — что изменилось — через 1–2 недели.
```

---

## Audit rule

A report needs correction if its Bach prescription says:

```md
по инструкции производителя
```

instead of:

```md
по 4 капли каждого препарата
```

The correct verdict:

```md
Needs correction: Bach intake wording does not match Andrey Li client prescription format.
```
