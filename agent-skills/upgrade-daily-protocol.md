# /upgrade Daily Operating Protocol

This protocol defines how the daily `Morning System Upgrade` / `/upgrade` automation improves agent quality and project readiness.

It is designed for autonomous operation with safe boundaries.

---

## Goal

Every daily run should:

1. Consume `projects/codex-automation/morning-handoff-queue.md` first.
2. Consume `projects/codex-automation/evening-review-handoff.md` second.
3. Check current agent/system quality.
4. Detect repeated weaknesses, ignored rules, false-success patterns, and provider/live readiness gaps.
5. Apply safe automatic fixes only in docs, adapters, memory, runbooks, registries, regression scaffolds, and checklists.
6. Convert anything risky or product-code-facing into exact prompts or issue/PR handoffs.
7. Validate when a checkout or tool path is available.
8. Report `APPLIED_UPGRADE` or `NO_SAFE_UPGRADE`.

A report-only run that neither applies a safe upgrade nor proves no safe upgrade is possible is a failed Morning System Upgrade.

---

## Morning Outcome Contract

Use exactly one of these outcome labels in the final report:

### `APPLIED_UPGRADE`

Use when the run made a safe, material harness/docs/memory/registry/regression/ledger/handoff update.

Required evidence:

```txt
files changed:
why safe:
source signal:
validation run or not-run reason:
remaining risky/product/provider handoff:
```

### `NO_SAFE_UPGRADE`

Use only when no safe harness/docs update is justified.

Required evidence:

```txt
inputs checked:
why no safe docs/harness change is justified:
product/provider/risky work routed to:
next evidence needed:
```

Do not use `SUCCESS` for provider-dependent project work unless `systems/provider-live-readiness-gate.md` is satisfied.

---

## Evidence Model

`/upgrade` must not rely only on manually saved memory. It should use available evidence layers:

```txt
1. Project memory evidence
2. GitHub / workflow evidence
3. Conversation / user-reported evidence
4. Delivery outcome ledger
5. Prompt regression tests
6. Replay cases
7. Learning metrics
8. External standards evidence when web access is available and relevant
```

Each report should state which layers were available and which were not.

---

## Read First

When available, read these before changing rules or automation prompts:

```txt
projects/codex-automation/morning-handoff-queue.md
projects/codex-automation/evening-review-handoff.md
systems/active-skill-map.md
systems/provider-live-readiness-gate.md
systems/harness-rule-lifecycle.md
projects/codex-automation/agent-learning-metrics.md
projects/codex-automation/failure-replay-cases.json
projects/codex-automation/delivery-outcome-ledger.md
projects/codex-automation/prompt-regression-tests.json
projects/codex-automation/automation-prompt-registry.json
systems/to-delivery-tickets.md
systems/delivery-feedback-loop.md
```

---

## Project Upgrade Sweep

Every daily `/upgrade` run may inspect active projects from `projects.md` / `projects.json` when the handoff requires it, but broad strategic discovery belongs to Daily Improve.

For each confirmed active project touched by the handoff, check:

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

Score each project 0-3 when a project sweep is actually performed:

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

## Provider / Live Readiness Priority

Operationalize provider/live readiness before softer cleanup when the evidence involves auth, persistence, finance, admin, upload, payment, provider balances, or live data.

Morning System Upgrade may update docs/registry/regressions for provider-readiness protection, but it must not directly change provider config or production data.

Required checks for provider-dependent handoffs:

```txt
code path exists
provider configured by non-secret name only
schema/storage/data present
production deploy source proven
live behavior verified
```

If any required layer is missing, route to `/safe`, `/delivery`, `/audit-ui`, or `/audit-fin` and keep status `BLOCKED`, `PARTIAL`, or `NEEDS_VERIFICATION`.

---

## Rule Lifecycle

Use `systems/harness-rule-lifecycle.md`.

- New global rules start as `candidate` unless validated by replay/regression/repeated evidence.
- Promote to `active` only with validation evidence.
- Mark vague, ignored, duplicate, or overbroad rules as `needs_revision` or `deprecated`.
- Do not accumulate rules that add context cost without proven value.

Each Morning report should include:

```txt
candidate:
promoted to active:
needs_revision:
deprecated/rejected:
evidence:
```

---

## Safe Auto-Fix Lane

The daily automation may directly apply these safe Markdown-only fixes:

- install/update `.claude/commands/*` and `.codex/skills/*` adapters;
- add missing `agent-memory` templates and lesson files;
- create or tighten `SAFE.md`, `SYSTEM_MAP.md`, `CHECKS.md`, runbooks, report schemas, and project-memory docs when facts are confirmed;
- create or tighten automation registry, ledger, metrics, regression, replay, and handoff scaffolds;
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

Score each 0-3 using `agent-skills/upgrade-quality-rubric.md` when available:

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
provider/live gate triggers
prompt regressions without replay
```

---

## Daily Report Format

```md
## Daily Upgrade — YYYY-MM-DD

Outcome: APPLIED_UPGRADE / NO_SAFE_UPGRADE

### Inputs used
- Daily Improve:
- Evening Review:
- Morning handoff:

### Evidence sources
- project memory: available / unavailable
- GitHub issues/PRs: available / unavailable
- workflow/CI logs: available / unavailable
- conversation/user report: available / unavailable
- ledger/regression/replay/metrics: available / unavailable
- external standards refresh: available / unavailable

### Provider/live readiness
- gaps operationalized:
- tickets/handoffs:

### Rule lifecycle
- candidate:
- promoted active:
- needs_revision:
- deprecated/rejected:
- evidence:

### Replay / regression / metrics
- replay checked:
- prompt regressions changed:
- metrics updated:

### Active skill map
- drift found:
- changes:

### Safe updates applied
- files:
- why safe:

### Handoffs created
- /delivery:
- /audit-fin:
- /audit-ui:
- /safe:
- Claude Code:

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
provider/live false-success claims decrease
issue/PR lessons are converted into memory or candidates
active memory stays compact
candidates get promoted or archived
harness proposals get validated
replay/regression cases are run, not only written
agents load and follow relevant harness files
project readiness scores improve over time
```
