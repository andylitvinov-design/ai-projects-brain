# Codex Efficiency Telemetry

Use this standard to verify that token-efficiency rules are followed in real
runs. It measures agent behavior; it must not become another large mandatory
context file for normal product tasks.

Read this file when implementing dashboards, audits, `/improve`, automation
reports, or agent-run instrumentation.

## 1. Run record

Persist one compact record per significant Codex run:

```json
{
  "run_id": "",
  "timestamp": "",
  "project": "",
  "repository": "",
  "branch": "",
  "task_size": "tiny|small|medium|large",
  "initial_context_files": 0,
  "initial_context_paths": [],
  "total_files_read": 0,
  "repeated_file_reads": 0,
  "broad_repo_scan": false,
  "large_files_read_in_full": 0,
  "external_tools_used": [],
  "final_report_lines": 0,
  "verification_run": false,
  "verification_checks": [],
  "memory_files_updated": [],
  "context_expansion_reasons": [],
  "flags": []
}
```

Do not store secrets, file contents, prompts, or full tool transcripts in this
record.

## 2. Required flags

Use these stable flag names:

- `initial_context_over_budget`
- `broad_repo_scan`
- `repeated_file_reads`
- `large_file_full_read`
- `missing_codex_brief`
- `missing_state_log`
- `unnecessary_tool_use`
- `wrong_repo_context`
- `no_exact_failing_command`
- `skipped_verification`
- `long_final_report`
- `no_compact_summary`
- `memory_update_status_missing`

A flag records an observable condition, not a speculative judgment.

## 3. Flag rules

### Initial context over budget

Set `initial_context_over_budget` when more than 5 context or memory files were
opened before implementation was located and no large-task reason was recorded.

### Broad repository scan

Set `broad_repo_scan` when recursive or repository-wide discovery happened
before targeted search failed or before the task was classified as large.

### Repeated file reads

Set `repeated_file_reads` when an unchanged file was opened more than once
without a reason such as line-range continuation, post-edit verification, or a
new concrete hypothesis.

### Large full-file read

Set `large_file_full_read` when a file longer than 300 lines was read in full
before section-first search, unless the full file was the explicit task target.

### Unnecessary tool use

Set `unnecessary_tool_use` when browser, screenshots, Playwright, live deploy
checks, or external MCP tools were used without contributing to the task's
source of truth or verification.

### Verification

Set `skipped_verification` when meaningful changes were made but no check was
run and the omission was not explicitly reported.

Set `no_exact_failing_command` when a failed check is summarized without the
exact command, endpoint, or reproducible check that failed.

### Reporting and memory

Set `long_final_report` when a normal task report exceeds 30 lines without the
user requesting analysis.

Set `no_compact_summary` when a handoff trigger occurred but no compact summary
was created.

Set `memory_update_status_missing` when meaningful project facts changed and
the report did not say whether `STATE.md`, `LOG.md`, or other memory was updated.

## 4. Health score

Report four separate health dimensions instead of one opaque score:

- **Context:** initial budget, targeted search, repeated reads.
- **Tools:** task-relevant tool use and failed-call discipline.
- **Verification:** checks run, exact failures, production proof where required.
- **Handoff:** compact report and correct memory update status.

Allowed status values:

- `healthy`: no applicable flags;
- `warning`: one or two non-critical flags;
- `unhealthy`: skipped verification, wrong repository, or three or more flags;
- `not_measured`: telemetry was unavailable.

Do not claim `healthy` from missing data.

## 5. Dashboard aggregation

For each project and reporting period, expose:

- run count;
- percentage of runs within initial context budget;
- average initial and total files read;
- runs with repeated reads;
- runs with broad scans;
- verification completion rate;
- average final report length;
- memory update completion rate;
- most frequent flags;
- change versus the previous period.

Keep drill-down records compact and link to the task, PR, or saved report rather
than copying transcripts.

## 6. Automation behavior

Daily or recurring agents should:

1. compare new run records with the previous report;
2. identify repeated waste patterns rather than isolated harmless exceptions;
3. propose a rule or template change only after the same pattern appears at
   least twice, unless it caused a safety or verification failure;
4. never auto-expand always-read instructions merely to fix one run;
5. prefer shortening, routing, or adding a trigger over adding a new mandatory
   document.

## 7. Rollout order

Instrument high-impact repositories first:

1. `ai-projects-brain`
2. `brain-management`
3. `codex-links`
4. active finance repositories
5. other active production repositories

For repositories without telemetry support, use `not_measured`; do not infer
metrics from incomplete evidence.
