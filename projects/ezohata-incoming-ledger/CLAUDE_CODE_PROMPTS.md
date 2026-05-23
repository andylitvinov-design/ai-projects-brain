# Finance Claude Code Prompt Rules

Purpose: project-specific rules for writing Claude Code prompts for the finance app (`andylitvinov-design/finance`, production `ezohata-incoming-ledger`).

Use this together with the global standard:

- https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/claude-code-prompt-standard.md

## Mandatory rule

When Andrey asks ChatGPT to create a Claude Code prompt for finance / ledger / PayPal / Wise / Яндекс / balance / plan-fact / expenses, the assistant must:

1. Route to `project_key = ezohata-incoming-ledger`.
2. Apply the global Claude Code prompt standard.
3. Apply these finance-specific constraints.
4. Produce a short staged Claude Code prompt, not a large all-in-one prompt.

## Finance-specific guardrails

Every finance Claude Code prompt should preserve these invariants unless the user explicitly asks to change them and the root cause is proven:

- Do not change balance/gross/net/fee/source semantics without proven root cause and regression tests.
- Balance is calculated by `amount_net`.
- PayPal gross must not be treated as net when fee is missing.
- Provider transport/import fixes must not silently change analytics formulas.
- UI fixes must not change provider/import/ledger save logic unless evidence proves that layer is wrong.
- Production bugs require source-of-truth proof before patching: `/api/status`, relevant debug/audit endpoint, and deployed commit/source.
- Never expose or change secrets/env values.
- Never run destructive data repair, migration, or backfill with apply mode unless explicitly requested.

## Default finance staged workflow

1. `DIAGNOSE ONLY`: prove the failing layer.
2. `INSPECT ONLY`: read only the 1-3 suspected files.
3. `MINIMAL PATCH`: patch only confirmed files.
4. `TEST ONLY`: focused regression tests first.
5. `PRODUCTION VERIFY`: separate prompt after merge/deploy.

## Finance failing-layer chain

Finance prompts should ask Claude Code to classify the issue using this chain:

```text
deploy/source-of-truth -> UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics
```

For screenshots/UI discrepancies, require machine-readable evidence before patching:

1. `/api/status`
2. `/api/audit-snapshot` when relevant
3. `/api/debug-ui-state` when relevant
4. screenshot/user report last

## Default DIAGNOSE ONLY prompt for finance

```text
/clear

Task: diagnose only, no edits.

Project: finance / ezohata-incoming-ledger.

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
First prove the likely failing layer:
deploy/source-of-truth -> UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics.
If files are needed, ask for the 1-3 most relevant paths first.

Finance constraints:
Do not change balance/gross/net/fee/source semantics.
Do not touch secrets/env.
Do not run data repair or migrations.

Output under 300 words:
1. likely failing layer
2. evidence needed
3. files needed
4. minimal next step
```

## Default MINIMAL PATCH prompt for finance

```text
Task: minimal finance patch.

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
2. add/update focused regression test
3. run only relevant tests first

Do not:
- scan the whole repo
- refactor unrelated code
- change provider/import/balance/data semantics unless explicitly required
- touch secrets/env
- run destructive data repair/backfill
- run broad test suites before focused tests pass

Final report under 500 words:
1. failing layer
2. root cause
3. files changed
4. tests run
5. risks / needs verification
```

## What ChatGPT should output to Andrey

When creating a prompt, ChatGPT should usually output only the ready-to-paste Claude Code prompt. Keep explanation minimal. If the task is too large, split it into numbered prompts: `Prompt 1 - diagnose`, `Prompt 2 - inspect`, `Prompt 3 - patch`, `Prompt 4 - verify`.
