# Superpowers Mode

Use this mode when the user says:

- `используй superpowers`
- `superpowers`
- `строгий режим`
- `сначала план и проверка`
- `держи агента в узде`

## Purpose

Superpowers Mode keeps the agent disciplined: read context first, make a plan, do only the necessary changes, verify the result, and report clearly.

## Rules

- Start with context: project memory, repo rules, relevant files, live/preview status when applicable.
- Produce a short implementation and verification plan before changing files unless the task is trivial and safe.
- Touch only files required by the task.
- Do not rewrite neighboring systems, rename APIs, change data contracts, or alter secrets/env unless explicitly required.
- Prefer minimal safe fixes over broad refactors.
- Keep scope tight: no opportunistic cleanup unless it directly supports the task.
- After implementation, run the narrowest meaningful checks.
- For UI work, verify the page or route in browser/Playwright when tools are available.
- End with changed files, checks, risks, and what remains `needs verification`.

## Output contract

Before implementation, produce:

1. Context inspected.
2. Goal.
3. Plan.
4. Files/areas likely to change.
5. Verification plan.

After implementation, produce:

1. What changed.
2. Changed files.
3. Checks run.
4. Live/browser verification if applicable.
5. Risks and `needs verification`.
6. Next action only if needed.

## Default prompt snippet

```text
Use Superpowers Mode.
Read project context first.
Make a short plan.
Implement the smallest safe change.
Do not touch neighboring files unless required.
Verify with the narrowest meaningful checks.
For UI, verify in browser if available.
Report changed files, checks, risks, and remaining needs verification.
```