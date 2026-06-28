# /upgrade Daily Operating Protocol

This protocol defines how the daily `Memory Upgrade` automation should improve agent quality every day.

It is designed for autonomous operation with safe boundaries.

---

## Goal

Every daily run should:

1. Check current agent/system quality.
2. Compare against current agent-harness principles when web access is available.
3. Detect errors, repeated weaknesses, and ignored rules.
4. Apply safe automatic fixes.
5. Report anything it could not fix.
6. Provide prompts or issue/PR handoffs for the next improvement step.

---

## Daily inputs

Read in this order:

```txt
agent-memory/active.md
agent-memory/index.md
agent-memory/candidates.md
agent-memory/metrics.md
agent-memory/mistakes.md
agent-memory/harness-proposals.md
agent-memory/harness-regression-tests.md
relevant topic files
recent issue/PR notes if accessible
```

Do not load archive unless resolving conflicts.

---

## Daily quality checks

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
```

---

## Current standards comparison

When web access is available, compare the local system with current agent-harness ideas.

Track the comparison as principles, not raw citations inside memory:

```txt
Self-Harness: weakness mining -> harness proposal -> proposal validation
RHO: replay/rollout past trajectories and use self-consistency preference
Adaptive Auto-Harness: task-wise routing, harness tree, human-steering hooks
Harness Updating vs Benefit: verify that agents actually invoke and follow the harness
```

Use these as checks:

- Are weaknesses mined from real failures?
- Are harness proposals minimal and tied to evidence?
- Are proposals validated before promotion?
- Are old failures replayed or smoke-tested?
- Is there task-wise routing instead of one giant context?
- Are human decisions requested for risky/global changes?
- Do agents actually load and follow the changed harness?

---

## Safe automatic fixes

The daily automation may directly apply these safe Markdown-only fixes:

- merge duplicate memory rules;
- add missing `Apply when`, `Check`, `Failure if ignored` fields;
- move weak active rules to candidates;
- mark stale rules archived/replaced;
- tighten overlong instructions;
- add missing report sections to command docs;
- add missing adapter/router references;
- add harness proposal entries;
- add harness regression test entries;
- update metrics for applied/failed rules.

---

## Do not auto-apply

Do not silently change:

```txt
product code
auth/payment/data logic
deploy behavior
high-risk global /delivery behavior
production workflow permissions
user data handling
```

For these, create a patch-ready issue/PR prompt.

---

## Daily report format

```md
## Daily Memory Upgrade — YYYY-MM-DD

### Quality score
- Memory quality: 0-3
- Harness quality: 0-3
- Verification quality: 0-3
- Self-learning quality: 0-3
- Harness evolution quality: 0-3
- Current standards alignment: 0-3

### Operational indicators
- false success count:
- ignored memory count:
- repeated correction count:
- blocked pattern count:
- unreviewed candidates:
- unvalidated harness proposals:

### Standards checked
- ...

### Automatic fixes applied
- ...

### Files changed
- ...

### Could not fix automatically
- ...

### Improvement ideas
- ...

### Prompts for next automation / Codex
```txt
...
```

### Regression risks
- ...

### Next check
- ...
```

---

## Success criteria

The daily automation is working when:

```txt
repeated failures decrease
false success cases decrease
ignored memory cases decrease
active memory stays compact
candidates get promoted or archived
harness proposals get validated
agents load and follow relevant harness files
```
