# Context Scout Mode

`/context-scout` is the universal read-only preflight for Andrey's agent
workflows. It gathers a compact project-aware `CONTEXT BUNDLE` before planning,
delivery, audit, finance audit, critique, or improvement discovery starts.

This is inspired by OpenHuman Super Context, but it is implemented only inside
our own workflow harness. Do not install OpenHuman. Do not add OS-level
assistant behavior.

## When it runs

Run `/context-scout` before:

- `/planner`
- `/delivery`
- `/audit`
- `/audit-sale`
- `/audit-fin`
- `/critic`
- `/improve`

The workflow that follows may plan, edit, create issues, open PRs, or run
checks according to its own rules. `/context-scout` itself must never mutate
files, commit, push, deploy, delete, archive, edit data, or change external
state.

## Target detection

Detect the likely target project from the smallest useful available context:

- user message;
- current conversation context;
- repo names;
- branch names;
- issue / PR names;
- workflow mode;
- known project aliases.

Known project aliases:

- finance / ezohata ledger
- ezohata.com / mandalas shop
- reports / psitherapy tools
- reiki-yggdrasil
- universal agent workflow / prompt modes

If the target project is unclear after read-only inspection, ask only one soft A/B/C clarification question with a recommended default. That one soft A/B/C clarification question is the only allowed unclear-target question. Do not ask the user to manually create a GitHub issue. If an issue, branch, PR, or tracking artifact is useful after the scout, Codex may create or update the issue itself in the owning workflow.

## Read-only inspection checklist

Inspect only what is available and relevant before planning or editing:

- git status and current branch;
- recent commits when relevant to the task;
- `AGENTS.md`;
- `CLAUDE.md`;
- `README.md`;
- package/config files;
- related issues / PRs if available;
- likely source files found by narrow search;
- saved workflow rules if available.

Prefer `rg`, exact paths, and narrow line ranges. Mark unavailable sources as
`needs verification` instead of expanding into a broad scan.

## CONTEXT BUNDLE format

Keep the bundle compact. Preferred max: 3000 tokens. Hard max: 4000 tokens.

```txt
CONTEXT BUNDLE:
- Target project:
- User goal:
- Current workflow mode:
- Relevant repo / branch / issue:
- Current implementation state:
- Existing implementation patterns:
- Known constraints:
- Scope boundaries:
- Non-goals:
- Files/modules likely involved:
- Data/period involved:
- Verification checklist:
- Risks/blockers:
- Safe auto-fix rules:
- Recommended next command:
```

## Mode handoff rules

- `/planner`: use the bundle before asking questions or writing a prompt.
- `/delivery`: use the bundle before implementation planning or edits.
- `/audit`: use the bundle to build the explicit verification checklist.
- `/audit-sale`: use the bundle once to identify the public page, audience,
  offer, primary conversion action, supplied URL/screenshots, and missing
  evidence before scoring or proposing a bounded delivery prompt.
- `/audit-fin`: use the bundle to identify period, data sources, and finance
  invariants before any analysis.
- `/critic`: use the bundle to critique assumptions, budget, checks, and the
  execution prompt before work begins.
- `/improve`: use accepted project-specific save lessons from `CODEX_BRIEF.md`,
  `DEBUG_LOG.md`, `RISKS.md`, and `STATE.md` where relevant before proposing
  improvement plans.

The bundle is evidence, not a final answer. If the next workflow discovers that
the scout picked the wrong project or missed a higher-priority rule, correct the
bundle and continue safely.
