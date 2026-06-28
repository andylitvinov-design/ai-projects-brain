# /upgrade — Controlled Self-Harness Upgrade Mode

Use this skill to improve the agent harness itself when recurring weaknesses are found.

Canonical brain spec:

```txt
ai-projects-brain/agent-skills/upgrade.md
```

## Trigger

```txt
/upgrade
upgrade harness
улучши harness
доработай систему самообучения
```

## Behavior

1. Read `agent-memory/active.md` and `agent-memory/index.md`.
2. Read only relevant weakness files: `mistakes.md`, `candidates.md`, `metrics.md`, `harness-proposals.md`, `harness-regression-tests.md`.
3. Mine recurring weakness patterns.
4. Propose minimal harness changes.
5. Apply only safe Markdown/routing changes directly.
6. Escalate risky/global changes to issue/PR/user decision.
7. Report `/upgrade` results.

Do not rewrite product code. Do not increase context load without a clear benefit.
