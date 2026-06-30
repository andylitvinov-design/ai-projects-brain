# Codex Save Harness Upgrade

## Purpose

`/save` is a compact memory/harness update after meaningful Codex work.
It is not a duplicate final report. It preserves reusable operational lessons
that reduce future context load, prevent repeated failures, clarify source of
truth, improve verification, or reduce wrong-repo risk.

Persistent memory is optional. If simple in-context guidance is enough, do not
persist memory.

## Lifecycle

Use this lifecycle exactly:

```txt
observe -> save proposal -> validate -> accept/reject -> consume in next context-scout -> compact/archive
```

- `observe`: notice a concrete repeated weakness or useful context lesson during
  `/delivery`, `/audit`, `/audit-fin`, `/planner`, or `/critic`.
- `save proposal`: write a compact proposed `/save` entry. Default status is
  `proposal` or `needs verification`, not `accepted`.
- `validate`: check evidence, safety, duplication, and expected gain.
- `accept/reject`: accept only small useful operational lessons. Reject generic
  advice, broad summaries, vague rules, and one-off noise.
- `consume in next context-scout`: use accepted lessons to read less and avoid
  wrong paths in the next `/context-scout`.
- `compact/archive`: summarize stable lessons into `PROJECT.md`,
  `CODEX_BRIEF.md`, `DEBUG_LOG.md`, `RISKS.md`, or the matching project memory
  file. Mark old lessons `superseded` or archive them. Do not let entries grow
  forever.

## Self-Harness Loop

Use the constrained loop only:

```txt
Weakness Mining -> Harness Proposal -> Proposal Validation
```

- Weakness Mining: identify repeated failure patterns from completed runs.
- Harness Proposal: convert the weakness into a small, concrete, executable
  proposed harness change.
- Proposal Validation: validate evidence and regression risk before accepting
  the change.

Weakness examples:

- wrong repo;
- deprecated repo;
- repeated checks;
- missing exact failing command;
- missing `STATE.md` / `LOG.md` update;
- claimed fixed without verification;
- excessive context reading;
- final report too long without changed files/checks/risks.

## Harness-1 External State Principle

`/save` externalizes state so future Codex runs do not stuff long history into
the prompt:

- candidate context: files, issues, commands, or notes considered during the
  run;
- curated context: the small set that actually mattered;
- noise/discarded context: files, repos, branches, logs, or checks that should
  not be reread by default;
- verification records: exact commands/checks and results;
- stop condition: the evidence that made the task done, blocked, or ready for
  handoff;
- source of truth: canonical repo, project memory file, issue, PR, deploy, or
  documented command;
- storage target: the specific project memory file that should receive the
  lesson if it is accepted.

## CL-Bench Guardrail

A `/save` entry is justified only when it is likely to reduce future context
load, prevent a repeated failure, clarify source of truth, improve verification,
or reduce wrong-repo risk. If simple in-context guidance is enough, do not
persist memory.

Every accepted lesson must name at least one expected gain:

- fewer files to read;
- fewer repeated checks;
- clearer source of truth;
- safer verification;
- shorter final report;
- fewer wrong-repo risks.

If none applies, do not persist the lesson.

## Meta-Agent Challenge Guardrails

- Do not weaken verification to save tokens.
- Do not optimize reports instead of task success.
- Do not claim token efficiency improvement without evidence.
- Do not bypass source-of-truth checks.
- Do not allow broad self-rewrites.
- Do not mark a rule successful unless there is evidence from a later run or
  direct validation.
- Do not accept rule updates that primarily make final reports look better
  without improving task completion.

## Status Model

Use this status enum:

```txt
proposal | accepted | rejected | needs verification | superseded
```

Required fields for lessons:

- `Status`
- `Evidence`
- `Expected gain`
- `Validation`
- `Supersedes`
- `Superseded by`

Default to `proposal` or `needs verification` until validated.

## Storage Target Rules

Preferred storage order:

1. Project-specific debugging/workflow lessons -> `projects/<slug>/DEBUG_LOG.md`.
2. Stable canonical project facts -> `projects/<slug>/PROJECT.md`.
3. Future context-selection rules -> `projects/<slug>/CODEX_BRIEF.md`.
4. Persistent risks -> `projects/<slug>/RISKS.md`.
5. Data/deploy/runtime flow -> `SYSTEM_MAP.md`.
6. Data contracts -> `DATA_SCHEMA.md`.
7. Current status -> `STATE.md`.
8. Chronological changes -> `LOG.md`.

Global Codex workflow rules may be documented in:

- `systems/codex-save-harness-upgrade.md` for `/save` itself;
- `systems/codex-project-workflow.md` for stable workflow rules;
- `systems/codex-token-efficiency.md` for context, tool, and report economy.

Do not introduce a default global endless `SAVE_LOG.md`. Prefer updating an
existing project memory file over creating a new log entry.

## Consuming Save Lessons

During `/context-scout`, Codex should prefer accepted save lessons that:

- identify canonical source-of-truth files;
- warn against deprecated repos or noisy files;
- name exact files/functions that mattered last time;
- name exact commands/checks that failed or verified the fix;
- define a stop condition for a recurring task.

Codex should ignore save lessons that are:

- rejected;
- superseded;
- too broad;
- secret-sensitive;
- unrelated to the current project;
- marked `needs verification` without enough supporting context.

Never read all historical save entries by default.

## Validation Checklist

A proposed save entry can become `accepted` only if it:

- names a project/repo;
- names a source of truth or says `needs verification`;
- names exact useful context or exact avoid/noise context;
- has no secrets, env values, tokens, cookies, or private credentials;
- does not duplicate existing memory;
- has an expected gain;
- does not weaken verification;
- does not change unrelated project boundaries;
- is compact enough to reduce, not increase, future token load.

## Anti-Token-Debt Rules

- Do not save more than 1-3 lessons per completed task unless the task was a
  major incident or debug loop.
- Keep each save entry under about 40 lines unless there is a strong reason.
- Prefer replacing stale lessons with a compact current rule.
- Mark outdated lessons as `superseded` or compact them into `CODEX_BRIEF.md`.
- Never make Codex read all historical save entries by default.

## Relation To Existing Memory Files

- `PROJECT.md`: stable project passport and canonical facts.
- `CODEX_BRIEF.md`: compact context entrypoint for future Codex runs.
- `SYSTEM_MAP.md`: runtime/data/deploy flow.
- `DATA_SCHEMA.md`: data contracts.
- `RISKS.md`: persistent risks.
- `STATE.md`: current state.
- `LOG.md`: chronological human-readable changes.
- `DEBUG_LOG.md`: incidents, root causes, failing commands, verification
  lessons.
- `/save` entry: compact proposed or accepted operational lesson that may update
  one of the above.

## Examples

Good `/save`:

```md
Project: ezohata-incoming-ledger
Status: accepted
Useful context: projects/ezohata-incoming-ledger/PROJECT.md, sheet-config.json, finance.js balance code
Noise / avoid next time: deprecated repo and reconcile-v2 are reference-only, not production
Failing layer: balance row currency/source mismatch
Expected gain: fewer wrong-repo reads, clearer production source
Storage target: projects/ezohata-incoming-ledger/CODEX_BRIEF.md
```

Bad `/save`:

```md
Codex should be careful and read context better next time.
```

Reason bad: vague, no project, no evidence, no expected gain, no storage target.

## Forbidden Scope

Do not build a dashboard, database, benchmark platform, autonomous
self-modification framework, model training loop, global giant save log, or
unrelated project rewrite for `/save`.
