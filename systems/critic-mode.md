# Critic Mode

`/critic` critiques a proposed goal, loop, task, delivery prompt, audit plan, or
workflow before execution. It starts with `/context-scout` preflight from
`systems/context-scout-mode.md` so the critique is grounded in project context.

## Behavior

1. Run `/context-scout` first and use its `CONTEXT BUNDLE`.
2. Critique before execution; do not implement the task.
3. Identify weak assumptions, missing checks, unsafe scope, budget risks,
   stale context, repo/live-target ambiguity, and verification gaps.
4. Preserve the user's intended outcome where safe.
5. Return an improved execution prompt or workflow loop.

## Critique checklist

- Target project and repo are clear.
- Source of truth is explicit.
- Scope is narrow enough to execute.
- Non-goals prevent broad rewrites.
- Existing patterns and constraints are named.
- Risks and blockers are actionable.
- Verification proves the requested outcome.
- GitHub issues, branches, PRs, or tracking artifacts are created by Codex when
  useful; the user is not required to create them manually.
- Token/context budget is realistic.
- Stop conditions are explicit.

## Output format

- Context bundle summary
- Critique findings
- Missing information or weak assumptions
- Verification gaps
- Budget/scope risks
- Improved execution prompt
