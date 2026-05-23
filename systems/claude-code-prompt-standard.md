# Claude Code Prompt Standard

Purpose: when Andrey asks ChatGPT to create a prompt for Claude Code, use this standard by default. Generate short, concrete, low-token prompts that reduce the chance of hitting Claude Pro limits before Claude Code starts visible work.

## Core rule

Claude Code prompts must be small, scoped, and staged. Do not create one huge prompt that asks for diagnosis, patch, tests, PR, merge, deploy, and production verification in one run.

Default staged workflow:

1. `DIAGNOSE ONLY`
2. `INSPECT ONLY`
3. `MINIMAL PATCH`
4. `TEST ONLY`
5. `PR / DEPLOY / VERIFY` as separate prompts

For a new Claude Code task, prefer starting with `/clear`.

## Why

Claude Code may send hidden context with the first request: Claude Code system instructions, repo guidance files, prior session context, terminal output, tool history, file reads, diffs, and the user's visible prompt. A long first prompt can therefore fail before code analysis begins.

## Default constraints

Include these constraints unless the user explicitly asks for broader work:

```text
Do not scan the whole repo.
Do not inspect unrelated files.
Ask before expanding scope.
Keep output under 300-500 words.
Minimal patch only.
No unrelated refactor.
Do not change environment configuration.
Run only relevant tests.
```

## Avoid

Avoid Claude Code prompts that say:

- check the whole project
- do a full audit
- find all bugs
- read the entire repo
- compare the full history
- fix everything and deploy
- diagnose + patch + tests + PR + merge + deploy + verify in one prompt

## Prompt size rules

- Almost out of limits: under 150 words.
- Normal diagnosis: under 300 words.
- Patch prompt: under 500 words.
- Avoid 1000+ words in the first Claude Code prompt.

## Required ChatGPT behavior

When the user asks for a Claude Code prompt:

1. Choose the mode: `DIAGNOSE ONLY`, `INSPECT ONLY`, `MINIMAL PATCH`, `TEST ONLY`, `PRODUCTION VERIFY`, or `PR/DEPLOY`.
2. Generate one ready-to-paste prompt, not a long explanation.
3. Keep it short and scoped.
4. Include strict scope and constraints.
5. Split large tasks into smaller prompts.
6. Compress long Codex reports before embedding them.

## Compact Codex report format

```text
Codex summary:
- Root cause:
- Failing layer:
- Changed files:
- Tests passed:
- Production status:
- Remaining issue:
- What Claude Code should check:
```

## DIAGNOSE ONLY template

```text
/clear

Task: diagnose only, no edits.

Problem:
[1-3 lines]

Expected:
[1 line]

Actual:
[1 line]

Evidence:
- [key fact]
- [key fact]

Scope:
Do not scan the whole repo.
Do not modify files.
Do not run broad tests.
If files are needed, ask for the 1-3 most relevant paths first.

Output under 300 words:
1. likely failing layer
2. files needed
3. minimal next step
```

## INSPECT ONLY template

```text
Task: inspect only, no edits.

Inspect only:
- [file 1]
- [file 2]
- [file 3]

Goal:
Confirm the root cause of [problem].

Constraints:
Do not inspect unrelated files.
Do not modify files.
Do not run broad tests.
Ask before expanding scope.

Output under 300 words:
1. confirmed root cause
2. exact code path
3. minimal patch plan
```

## MINIMAL PATCH template

```text
Task: minimal patch.

Problem:
[short problem]

Confirmed root cause:
[short root cause]

Allowed files:
- [file 1]
- [file 2]
- [test file]

Do:
1. implement the smallest safe fix
2. add/update one regression test if needed
3. run only relevant tests

Do not:
- scan the whole repo
- refactor unrelated code
- change unrelated behavior
- change environment configuration
- change data semantics unless explicitly required
- run broad test suites before relevant tests pass

Final report under 500 words:
1. root cause
2. files changed
3. tests run
4. risks / follow-up
```

## TEST ONLY template

```text
Task: test only.

Run only tests related to:
[feature/bug/file]

Do not modify files.
Do not run the full test suite unless the focused tests pass and you explain why the full suite is needed.

Report:
1. command run
2. pass/fail
3. failing assertion if any
4. next minimal fix
```

## PRODUCTION VERIFY template

```text
Task: production verification only.

Goal:
Verify that production contains the expected fix.

Expected:
- repo: [repo]
- PR/commit: [PR/commit]
- endpoint/page: [endpoint/page]
- expected behavior/value: [expected]

Scope:
Do not modify code.
Do not run broad audits.
Only verify commit/status and the specific behavior.

Output:
1. production commit/status
2. verification result
3. mismatch if any
4. next step
```

## Default fallback prompt

```text
/clear

Task: diagnose only, no edits.

Problem:
[problem]

Expected:
[expected]

Actual:
[actual]

Scope:
Do not scan the whole repo.
Do not modify files.
Do not run broad tests.
Ask for the 1-3 most relevant files before inspecting anything else.

Output under 300 words:
1. likely failing layer
2. files needed
3. minimal next step
```
