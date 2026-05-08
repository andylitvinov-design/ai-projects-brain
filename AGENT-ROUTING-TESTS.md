# AGENT ROUTING TESTS

> Test cases for checking whether agents choose the correct `project_key` and read the correct project capsule.

## How to run

For each user prompt:

1. Identify expected `project_key`.
2. Read `START-HERE-FOR-AGENTS.md`.
3. Read `projects/index.md`.
4. Read only the expected project capsule.
5. Report whether routing was correct.

## Tests

| Test | User says | Expected project_key | Must read | Must not read first |
|---|---|---|---|---|
| Finance routing | «проверь финансы» | `ezohata-incoming-ledger` | `projects/ezohata-incoming-ledger/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | old/deprecated finance repos |
| Ledger routing | «почему в ledger баланс не сходится» | `ezohata-incoming-ledger` | `projects/ezohata-incoming-ledger/PROJECT.md`, `CHECKS.md`, audit endpoint notes | unrelated dashboard repos |
| PayPal routing | «проверь PayPal gross/net» | `ezohata-incoming-ledger` | `projects/ezohata-incoming-ledger/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | `codex-links-myportal` unless explicitly named |
| Codex Cloud routing | «проверь codex cloud dispatch» | `codex-links` | `projects/codex-links/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | `brain-management` unless dashboards are requested |
| Slack bridge routing | «что со slack bridge» | `codex-links` | `projects/codex-links/PROJECT.md`, `CHECKS.md` | finance project |
| Brain dashboard routing | «проверь dashboard thinking» | `brain-management` | `projects/brain-management/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | `ai-projects-brain` unless memory/index is requested |
| Reiki routing | «что с reiki yggdrasil admin» | `reiki-yggdrasil` | `projects/reiki-yggdrasil/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | artefacts |
| Artefacts routing | «что с артефактами» | `artefacts` | `projects/artefacts/PROJECT.md`, `CHECKS.md`, `DECISIONS.md` | reiki-yggdrasil |
| Project Brain routing | «улучши базу проектов» | `ai-projects-brain` | `START-HERE-FOR-AGENTS.md`, `projects/index.md`, `projects/ai-projects-brain/PROJECT.md` or repo README | individual app repos unless needed |
| Agent Auditor routing | «сделай аудит по snapshot» | `agent-auditor` or target project if named | `projects/agent-auditor/PROJECT.md`; target project capsule if target named | browser/OAuth as audit method |

## Expected routing behavior

A correct agent should:

- choose one `project_key` first;
- read only that project capsule before opening code;
- mark unknown mappings as `needs verification`;
- use live checks when production state matters;
- not change secrets/env values;
- not use deprecated repos as production sources.

## Failure signs

Routing is wrong if the agent:

- reads multiple unrelated repos before choosing `project_key`;
- confuses `finance` with old `ezohata-incoming-ledger` repo;
- treats `artefacts` as `reiki-yggdrasil` because both are sites;
- treats `brain-management` as `ai-projects-brain`;
- uses screenshot-only reasoning when an audit endpoint exists;
- claims live deploy status without checking live/deploy source.

## Report template

```md
Test:
User prompt:
Expected project_key:
Actual project_key:
Files read:
Correct routing: yes/no
Issues:
Fix recommendation:
```
