# Automation Registry

Last reconciled: `needs verification`

## Required fields

Every recurring automation record must include:

- name and scheduler;
- purpose and covered systems;
- cadence and timezone;
- owner;
- expected output or notification condition;
- state persistence location;
- overlap/duplicate check;
- failure signal;
- stop condition.

## Known automation families

| Family | Scheduler | Purpose | Health |
|---|---|---|---|
| PR sweep | ChatGPT Automations | Find open or unhealthy PR chains and required actions. | needs verification |
| Task sweep | ChatGPT Automations | Find unfinished Codex Cloud/local task chains and attempt safe completion. | needs verification |
| Daily improve / system upgrade | ChatGPT Automations | Discover and track system improvements. | needs verification |
| Weekly brain refresh | ChatGPT Automations | Refresh project catalog, governance memory, and search indexes. | active after scheduler creation |

## Weekly reconciliation rules

1. Read the current automation list when available.
2. Compare by purpose, scope, cadence, and output—not only by title.
3. Mark duplicates and recommend one canonical owner.
4. Check whether the previous run produced evidence and whether its actions were closed.
5. Record missing permissions or inaccessible schedulers as `needs verification`.
6. Never invent automation state from documentation alone.
