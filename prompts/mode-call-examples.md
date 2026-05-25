# Mode Call Examples

Use this file as a short cheat sheet for calling agent modes without ambiguity.
The canonical mode index is `systems/agent-modes.md`.
The shared rules are `systems/agent-rules.md`.

## Golden rule

When the user names a mode, do not reinterpret it as a vague preference. Apply the matching mode file.
If the user names multiple modes, combine them using this order:

1. Grill Me / Task Clarification.
2. Superpowers / disciplined execution.
3. Research or implementation.
4. Playwright / verification.
5. Handoff / memory update.

Safety, secrets, production-risk, and irreversible-action rules always override mode behavior.

## Exact mode aliases

| User says | Agent should apply | Do not confuse with |
| --- | --- | --- |
| `grill me`, `прогриль задачу`, `проясни задачу` | `systems/task-clarification-mode.md` | Do not implement before clarifying. |
| `superpowers`, `строгий режим`, `сначала план и проверка` | `systems/superpowers-mode.md` | Not a request for broad refactor. |
| `handoff`, `передай следующему агенту`, `обнови HANDOFF.md` | `systems/handoff-mode.md` | Not a full project report unless asked. |
| `playwright`, `проверь браузером`, `desktop/mobile` | `systems/playwright-verification-mode.md` | Not just code inspection. |
| `skill-creator`, `создай skill`, `упакуй workflow` | `systems/skill-creator-mode.md` | Not immediate implementation of the workflow. |
| `last30days`, `свежий ресерч`, `за последние 30 дней` | `systems/recent-research-mode.md` | Not stale memory-only advice. |

## Single-mode prompts

### Grill Me

```text
Используй Grill Me.
Сначала проясни задачу: цель, источник истины, ограничения, риски, проверки и критерий готовности.
К каждому вопросу дай рекомендуемый ответ.
Не начинай реализацию до финального уточнённого плана.
```

### Superpowers

```text
Используй Superpowers.
Сначала прочитай контекст проекта.
Составь короткий план разработки и проверки.
Сделай минимальную безопасную правку.
Соседние файлы не трогай без необходимости.
После реализации запусти проверки и дай отчёт.
```

### Handoff

```text
Используй Handoff.
Обнови передачу задачи следующему агенту: цель, текущий статус, решения, изменённые файлы/области, проверки, риски, source of truth и следующий шаг.
Не включай секреты и шумные логи.
```

### Playwright Verification

```text
Используй Playwright Verification.
Открой релевантные страницы.
Проверь desktop и mobile.
Прокликай критические кнопки/формы.
Проверь console/network ошибки.
Если найдёшь баги — исправь и проверь снова.
```

### Skill Creator

```text
Используй Skill Creator.
Упакуй этот повторяемый workflow как skill: триггеры, входные данные, source of truth, шаги, ветвления, ошибки, проверка, формат вывода и пример промпта.
```

### Last 30 Days

```text
Используй Last 30 Days / Recent Research.
Собери свежий ресерч по теме за последние 30 дней.
Приоритет: официальные документы, релизы, changelog, GitHub, product pages.
Дай выжимку со ссылками, рисками и практической рекомендацией.
```

## Combined prompts

### Clarify, then implement strictly

```text
Используй Grill Me + Superpowers.
Сначала проясни задачу и дай уточнённый план.
После подтверждения или если блокеров нет — реализуй минимальную безопасную правку, проверь и отчитайся.
```

### Implement UI and verify in browser

```text
Используй Superpowers + Playwright Verification.
Прочитай контекст, составь план, сделай минимальную правку.
Затем проверь страницу в браузере на desktop/mobile, кнопки, формы и console/network ошибки.
```

### Research, then create implementation prompt

```text
Используй Last 30 Days + Superpowers.
Сначала собери свежий ресерч с источниками.
Затем на основе ресерча дай практический план или промпт для Codex/Claude Code.
```

### Finish and transfer to next agent

```text
Используй Superpowers + Handoff.
Заверши текущую задачу, проверь результат и обнови handoff так, чтобы следующий агент продолжил без чтения переписки.
```

### Turn repeated process into a reusable skill

```text
Используй Skill Creator + Handoff.
Оформи этот workflow как reusable skill и добавь handoff: где лежит skill, как его вызывать, что осталось проверить.
```

## Anti-confusion rules

- If the user says `проверь` after a UI change, prefer Playwright/browser verification when available.
- If the user says `исправь сам`, do not switch to Grill Me unless the target is unsafe or unclear enough to risk wrong changes.
- If the user says `сначала проясни`, do not implement first.
- If the user says `handoff`, do not write a long essay; write operational continuation notes.
- If the user says `skill`, do not only describe the idea; produce a reusable structure with triggers and verification.
- If the user says `last30days`, do not rely on old memory; use fresh public research.
- If modes conflict, choose the safest interpretation and mark unclear parts as `needs verification`.

## Minimal final report for project work

Use this compact format unless the user asks for more detail:

```text
Done / Not done:
Changed:
Checked:
Risks / needs verification:
Next:
```