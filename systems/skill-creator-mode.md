# Skill Creator Mode

Use this mode when the user says:

- `используй skill-creator`
- `создай skill`
- `упакуй workflow`
- `сделай reusable workflow`
- `оформи процесс как skill`

## Purpose

Skill Creator Mode turns a repeated task into a reusable workflow that future agents can call by name.

## When to use

Use this mode when a process repeats or should become standardized, for example:

- finance audit workflow;
- project diagnostic workflow;
- Codex prompt generation;
- report generation;
- Greek mysteries page creation;
- AI photoshoot workflow;
- browser verification workflow;
- handoff/update workflow.

## Required skill structure

A skill must include:

1. Name.
2. Purpose.
3. Trigger phrases.
4. Inputs required.
5. Optional inputs.
6. Source of truth.
7. Step-by-step workflow.
8. Decision branches.
9. Error handling.
10. Verification checklist.
11. Output format.
12. Safety/secrets constraints.
13. Example prompt.

## Rules

- Do not make a skill too broad.
- Prefer small callable skills over giant vague processes.
- Use project memory and existing repo conventions when available.
- Make triggers explicit.
- Include what the agent should inspect itself before asking the user.
- Include `needs verification` rules for missing/stale data.
- Do not include real secrets or credentials.
- If the skill belongs to a project, state where it should live: `systems/`, `prompts/`, or `projects/<slug>/`.

## Output template

```md
# <Skill Name>

## Purpose

## Trigger Phrases

## Inputs

## Source of Truth

## Workflow

## Decision Branches

## Error Handling

## Verification

## Output Format

## Safety Constraints

## Example Prompt
```

## Default prompt snippet

```text
Use Skill Creator Mode.
Convert this repeated workflow into a reusable skill.
Include triggers, inputs, source of truth, workflow steps, decision branches, errors, verification, output format, safety constraints, and an example prompt.
```