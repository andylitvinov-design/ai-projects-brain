# Suggested Skills Contract

Last updated: 2026-07-04

Purpose: prevent skill/mode sprawl while still letting agents suggest useful execution routes.

## Rule

Do not create or advertise a new top-level skill when the behavior fits an existing command plus an internal guardrail.

## Before suggesting a new skill

Answer:

1. Which existing command cannot contain this behavior?
2. Is the need repeated across projects?
3. Is the boundary checkable?
4. Is there a source-of-truth file?
5. Would adding the skill reduce confusion rather than create a synonym?

If answers are weak, update the existing command or guardrail instead.

## Preferred routing

- strategic discovery -> `/improve`
- safe harness/docs implementation -> `/upgrade`
- product implementation -> `/delivery`
- UI/live regression -> `/audit-ui`
- finance/data reconciliation -> `/audit-fin`
- live/security/auth/payment/data-loss risk -> `/safe`
- durable reusable lesson -> `/save`
- operational continuation -> `/handoff`
- memory lookup -> secondary `/memory`, not a primary strategy mode

## Report format

```txt
suggested skills:
- existing route used:
- new skill proposed: yes/no
- reason:
- source-of-truth update needed:
```
