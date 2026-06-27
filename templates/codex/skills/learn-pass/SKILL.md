# /learn-pass — Agent Self-Learning Pass

Use this skill after meaningful work to extract reusable lessons without polluting active memory.

Canonical brain spec:

```txt
ai-projects-brain/agent-skills/learn-pass.md
```

## Trigger

Run after:

```txt
/delivery
/audit
failed checks
blocked deploy
repeated user correction
memory-review
```

## Behavior

1. Read `agent-memory/active.md` and `agent-memory/index.md`.
2. Review the task result, checks, blockers, user correction, and applied memory.
3. Decide: no lesson / candidate / update metric / promote / revise / archive.
4. Write weak lessons to `agent-memory/candidates.md`.
5. Track applied rule performance in `agent-memory/metrics.md`.
6. Promote to active only with strong evidence.
7. Report the Learning Pass section.

Do not invent lessons. Do not promote weak one-off signals.
