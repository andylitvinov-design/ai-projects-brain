# /upgrade Daily Operating Protocol

This protocol defines how the daily `Morning System Upgrade` / `/upgrade` automation improves agent quality and project readiness.

It is designed for autonomous operation with safe boundaries.

---

## Goal

Every daily run should:

1. Check current agent/system quality.
2. Compare against current agent-harness principles when web access is available.
3. Detect errors, repeated weaknesses, ignored rules, and false-success patterns.
4. Run a compact Project Upgrade Sweep across active projects.
5. Apply safe automatic fixes only in docs, adapters, memory, runbooks, and checklists.
6. Report anything it could not fix.
7. Provide exact prompts or issue/PR handoffs for risky or product-code work.

---

## Evidence Model

`/upgrade` must not rely only on manually saved memory. It should use available evidence layers:

```txt
1. Project memory evidence
2. GitHub / workflow evidence
3. Conversation / user-reported evidence
4. External standards evidence
```

Each report should state which layers were available and which were not.

---

## Project Upgrade Sweep

Every daily `/upgrade` run should inspect active projects from `projects.md` / `projects.json` unless the user narrows scope.

For each confirmed active project, check:

```txt
repo/live/source mapping confidence
missing /upgrade adapters
missing or stale project memory docs
recent repeated user pain
open/stale/wrong-base PR signals when available
verification command gaps
live/deploy proof gaps
UI/default-state regression risks
finance/data/payment/auth risks
agent readiness for /delivery, /audit, /safe, /audit-ui, /audit-fin
```

Score each project 0-3:

```txt
Live confidence
Delivery confidence
Data/payment risk control
UX regression control
Agent readiness
```

Scoring convention:

- `0` = blocked/unknown/high-risk;
- `1` = partial or stale;
- `2` = usable but has gaps;
- `3` = current, verified, and ready.

For each project, select at most one highest-leverage next action.

---

## Safe Auto-Fix Lane

The daily automation may directly apply these safe Markdown-only fixes:

- install/update `.claude/commands/*` and `.codex/skills/*` adapters;
- add missing `agent-memory` templates and lesson files;
- create or tighten `SAFE.md`, `SYSTEM_MAP.md`, `CHECKS.md`, runbooks, report schemas, and project-memory docs when facts are confirmed;
- merge duplicate memory rules;
- add missing `Apply when`, `Check`, `Failure if ignored` fields;
- move weak active rules to candidates;
- mark stale rules archived/replaced;
- tighten overlong instructions;
- add missing report sections to command docs;
- add harness proposal and regression test entries;
- add precise handoff prompts when the fix requires code or high-risk workflow changes.

---

## Handoff Lane

For risky or product-code-facing work, create exact prompts instead of editing directly:

- `/delivery` for product code fixes;
- `/audit-fin` for finance/data reconciliation;
- `/audit-ui` for UX/layout/navigation regressions;
- `/safe` for live/security/auth/payment/data-loss risks;
- Claude Code prompt for local repo diagnosis or command-specific harness checks.

Every handoff must include:

```txt
project/repo/live
goal
evidence
files/areas to inspect
non-goals
safe constraints
required checks
stop condition
final report format
```

---

## Do Not Auto-Apply

Do not silently change:

```txt
product code
auth/payment/data logic
migrations
deploy settings
secrets or env values
provider configuration
high-risk global /delivery behavior
production workflow permissions
user data handling
```

For these, create a patch-ready issue/PR prompt.

---

## Daily Quality Checks

Score each 0-3 using `agent-skills/upgrade-quality-rubric.md`:

```txt
Memory quality
Harness quality
Verification quality
Self-learning quality
Harness evolution quality
Current standards alignment
```

Also inspect operational indicators:

```txt
false success count
ignored memory count
repeated user correction count
blocked task patterns
missing Learning Pass reports
missing Applied memory reports
unreviewed candidates count
rules marked needs_revision
harness proposals without validation
issues/PRs that should have produced memory updates
```

---

## Daily Report Format

```md
## Daily Upgrade — YYYY-MM-DD

### Evidence sources
- project memory: available / unavailable
- GitHub issues/PRs: available / unavailable
- workflow/CI logs: available / unavailable
- conversation/user report: available / unavailable
- external standards refresh: available / unavailable

### /upgrade rollout
- projects checked:
- adapters installed/updated:
- missing or blocked:

### Project Upgrade Sweep
- projects checked:
- scores:
- safe auto-fixes:
- top risks:
- single next action per project:

### Handoffs created
- /delivery:
- /audit-fin:
- /audit-ui:
- /safe:
- Claude Code:

### Self-Harness Review
- errors learned:
- /save updates:
- instruction changes:

### Checks
- run:
- not run:

### Risks / needs verification
- ...

### Single next action
- ...
```

---

## Success Criteria

The daily automation is working when:

```txt
repeated failures decrease
false success cases decrease
ignored memory cases decrease
issue/PR lessons are converted into memory or candidates
active memory stays compact
candidates get promoted or archived
harness proposals get validated
agents load and follow relevant harness files
project readiness scores improve over time
```
