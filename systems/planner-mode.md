# Planner Mode

`/planner` is ChatGPT-side task formulation mode. It helps Andrey turn an
abstract, broad, risky, or underspecified goal into a precise task before
ChatGPT writes a prompt for `/delivery`.

`/planner` does not execute code, does not open PRs, and does not replace
Codex delivery. Codex executes only after Andrey sends a final prompt to
`/delivery`.

## When to use

Use `/planner` when the request is:

- abstract, broad, or unclear;
- multi-step, strategic, recurring, or automation-related;
- production-facing, finance/data-sensitive, or otherwise risky;
- unclear about source of truth, scope, allowed actions, or definition of done;
- unclear whether the next mode should be `/audit`, `/delivery`, `/supergoal`,
  or another workflow;
- likely to waste Codex tokens if sent directly to execution.

Do not use `/planner` for tiny obvious edits, narrow diagnostics, or clear tasks
where ChatGPT can immediately write a strong `/delivery` prompt.

## Behavior

When `/planner` is active, ChatGPT must:

1. Restate the raw goal.
2. Identify what is vague, risky, or underspecified.
3. Use available project memory and repo docs before asking questions.
4. Ask grouped clarifying questions only where they reduce real uncertainty.
5. Provide recommended default answers for each question.
6. Identify the likely project, repository, live target, and source of truth.
7. Mark uncertain items as `needs verification`.
8. Define success criteria and definition of done.
9. Define allowed actions and forbidden actions.
10. Define the verification rubric and expected checks.
11. Define stop conditions.
12. Define the context/token budget.
13. Define whether `STATE.md`, `LOG.md`, or equivalent project memory should be
    updated.
14. Produce a clarified task statement.
15. Produce a delivery prompt skeleton, not a final execution prompt, until the
    task is clear enough.

## Looper-style loop design

Use Looper as inspiration, not as a runtime dependency. Include these lightweight
loop-design fields when they help make the task executable:

- clarified goal;
- source of truth;
- context sources;
- allowed actions;
- forbidden actions;
- feedback and checks;
- verification rubric;
- stop conditions;
- context/token budget;
- state/log update;
- output artifact;
- delivery prompt skeleton.

## Output format

Use this structure by default:

1. Краткое понимание
2. Что неясно
3. Уточняющие вопросы, with recommended defaults
4. Source of truth
5. Success criteria
6. Allowed / forbidden actions
7. Verification / checks
8. Risks / needs verification
9. Clarified task
10. Delivery prompt skeleton

The skeleton should follow
`systems/chatgpt-delivery-prompt-standard.md` once the task is clear enough to
send to `/delivery`.

## Mode boundaries

- `/planner`: ChatGPT formulates the task and prepares the delivery prompt.
- `/delivery`: Codex executes the final prompt.
- `/audit`: inspection mode for existing code, data, PRs, sites, calculations,
  or production behavior; it is not prompt QA.
- `/supergoal`: large multi-stage objective management across sessions, repos,
  PRs, or milestones.
