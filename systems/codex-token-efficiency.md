# Codex Token Efficiency Program

Use this policy with `systems/agent-rules.md` and
`systems/codex-project-workflow.md`.

The goal is not to skip project memory or verification. The goal is to load the
smallest useful context first, expand only for a named reason, avoid repeated
reads, and finish with a compact verified handoff.

When another workflow contains a broad list of project-memory files, this file
controls the **initial read set**. A listed file is not automatically mandatory;
it is opened only when the triggers below apply.

## 1. Default bootstrap: four steps

For normal Codex project work, start in this order:

1. Locate the canonical project and repository in `projects.json` or the
   matching project index entry.
2. Read `projects/<slug>/CODEX_BRIEF.md`; fall back to `PROJECT.md` or
   `STATE.md` only when the brief is missing.
3. Read the target repository's nearest applicable `AGENTS.md`.
4. Search for and read the exact implementation files and nearest tests needed
   for the task.

Do not open the complete shared memory, long `README.md`, project history, or
all system policies during bootstrap.

## 2. Initial context budget

Unless the task is already known to be large:

- open no more than 5 context or memory files before locating implementation;
- do not perform a recursive full-repository scan;
- search or grep before opening a large file;
- for files longer than 300 lines, read the relevant section first;
- do not reread an unchanged file without recording the reason;
- before opening a sixth context file, state the missing fact and why that file
  is the smallest source likely to provide it.

Implementation files and tests discovered after the target is located are not
counted as project-memory files, but broad reading of unrelated implementation
areas is still prohibited.

## 3. Expansion triggers

Open additional memory only when the task requires it:

- `SYSTEM_MAP.md`: architecture, cross-module flows, ownership boundaries, or
  an unclear implementation location.
- `DATA_SCHEMA.md`: database tables, migrations, APIs, contracts, imports, or
  data invariants.
- `RISKS.md`: production, authentication, payments, destructive actions,
  secrets, permissions, or high-impact behavior.
- `STATE.md`: current production truth or current blockers not captured in the
  brief.
- `LOG.md`: recent history is material to the task; never treat it as current
  truth automatically.
- `DECISIONS.md`: the reason behind a durable architectural or product choice is
  needed.
- `README.md`: onboarding, commands, or deployment information is absent from
  the brief.
- full shared system policies: agent workflow design, `/improve`, policy audit,
  or a conflict between compact instructions.

When expanding, name the trigger in one short line. Do not open adjacent files
merely because they exist.

## 4. Task size levels

### Tiny

Examples: wording, one prompt, one known file.

Read:

- project index entry;
- `CODEX_BRIEF.md` or `STATE.md`;
- exact requested file.

### Small

Examples: one bug, one UI copy change, one endpoint check.

Read:

- default bootstrap;
- nearest tests;
- one additional memory file only when an expansion trigger applies.

### Medium

Examples: feature patch, schema adjustment, dashboard change.

Read:

- default bootstrap;
- relevant `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `RISKS.md`, tests, or deploy docs
  only by trigger.

### Large

Examples: architecture, long debug loop, production incident, cross-repo flow.

Broader context is allowed, but Codex must:

- state why it is needed;
- keep a list of files already studied;
- avoid rereading unchanged files;
- create a session summary before changing direction;
- separate confirmed facts from `needs verification`.

## 5. Memory roles

Keep project memory separated by purpose:

- `CODEX_BRIEF.md`: compact routing index; target 80–150 lines.
- `STATE.md`: current verified truth and active blockers.
- `LOG.md`: dated history and evidence.
- `DECISIONS.md`: durable decisions and rationale.
- `SESSION_HANDOFF.md` or session summary: only unfinished current work.
- `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, `RISKS.md`: specialist references opened
  by trigger.

Do not duplicate long history or system policies inside `CODEX_BRIEF.md` or
`AGENTS.md`.

## 6. Repo instruction size

- Keep repository `AGENTS.md` short; target 200 lines or fewer.
- `AGENTS.md` routes Codex to the correct memory, safety rules, and checks.
- Put project details in the specialist memory files above.
- Keep the always-read token rules in `AGENTS.md` to a compact checklist; link
  here for policy audits rather than requiring the full file on every tiny task.

## 7. Tool budget

- Do not use browser, Playwright, screenshots, live checks, or external tools
  unless the task requires them.
- For documentation-only work, verify files, generated indexes, and links; do
  not run unrelated live checks.
- For production claims, perform live verification when possible.
- When a tool fails, record the exact failing command or check once; do not
  repeat equivalent calls without a changed hypothesis.

## 8. Compact and handoff triggers

Create a compact session summary before:

- switching to a new major task;
- changing direction after a long debugging loop;
- repeated checks or rereads begin;
- handing work to another agent or session;
- context becomes too large to remain reliable.

Capture only:

- repository and branch;
- goal;
- files already studied;
- confirmed findings;
- changes made;
- checks and failures;
- remaining risks;
- next exact action.

The handoff replaces rereading chat history. It does not replace durable project
memory.

## 9. Execution telemetry

After each significant Codex task, emit or persist these fields when the
workflow supports telemetry:

```json
{
  "initial_context_files": 0,
  "total_files_read": 0,
  "repeated_file_reads": 0,
  "broad_repo_scan": false,
  "large_files_read_in_full": 0,
  "external_tools_used": [],
  "final_report_lines": 0,
  "verification_run": false,
  "memory_files_updated": [],
  "context_expansion_reasons": []
}
```

Flag the run when any of these occurs:

- `initial_context_files > 5` without a recorded large-task reason;
- `repeated_file_reads > 0` without a reason;
- `broad_repo_scan = true` before targeted search failed;
- a large file was read in full without a section-first reason;
- external tools were used without task relevance;
- verification was skipped without being reported;
- a normal final report exceeds 30 lines;
- meaningful project facts changed but memory update status was omitted.

Dashboard and reporting details are defined in
`systems/codex-efficiency-telemetry.md`.

## 10. Final report

For normal tasks, report only:

- studied files;
- finding;
- change;
- changed files;
- checks run and not run;
- risks or `needs verification`;
- memory update status;
- next action.

Avoid chronological narratives unless requested. Target 30 lines or fewer.

## 11. Stop condition

A Codex task is complete only when:

- the minimal fix is implemented or a clear no-change diagnosis is given;
- checks were run or explicitly marked not run;
- changed files and risks are listed;
- project-memory update need was checked;
- the next action is concrete.

## 12. Non-goals

- Do not weaken Context First; make it selective.
- Do not weaken Project Memory First; route through the brief.
- Do not weaken Production Awareness, secrets safety, or verification.
- Do not save tokens by skipping required tests.
- Do not make Claude-only features mandatory for Codex.
