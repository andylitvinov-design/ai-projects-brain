# /upgrade Quality Rubric

This rubric defines what `/upgrade` must check during daily automation and manual upgrade runs.

It combines current self-improving agent principles with this repo's safety constraints.

---

## Core quality dimensions

Score each dimension:

```txt
0 = missing
1 = weak
2 = acceptable
3 = strong
```

---

## 1. Memory quality

Checks:

- active memory is compact;
- rules are scoped and checkable;
- candidates are not treated as active rules;
- metrics track whether rules work;
- duplicates are merged;
- outdated rules are archived or replaced.

Failure signs:

- active memory grows as a raw log;
- rules have no `Apply when`, `Check`, `Failure if ignored`;
- same correction appears in several places.

Safe fixes:

- merge duplicates;
- move weak rules to candidates;
- archive outdated rules;
- add missing check fields.

---

## 2. Harness quality

Checks:

- command adapters are clear and short;
- boot routers point to the right memory files;
- commands do not load the whole tree by default;
- `/delivery`, `/audit`, `/save`, `/learn-pass`, `/memory-review`, and `/upgrade` have distinct roles;
- installer creates all required files.

Failure signs:

- command behavior is ambiguous;
- agents repeatedly miss the same step;
- instructions conflict;
- too much context is loaded.

Safe fixes:

- tighten command docs;
- add missing router line;
- add validation checklist;
- move broad text out of active prompts.

---

## 3. Verification quality

Checks:

- every high-risk workflow has a verification gate;
- live/authenticated UI is checked when relevant;
- success criteria are observable;
- delivery does not claim success without proof;
- failed checks trigger `/learn-pass`.

Failure signs:

- false `STATUS: SUCCESS`;
- feature exists technically but is invisible to user;
- agent verifies only deep links and not real navigation;
- blocked tasks do not create reusable lessons.

Safe fixes:

- add explicit verification gate;
- add required report section;
- add memory lesson for repeated misses;
- require `Learning Pass` in final report.

---

## 4. Self-learning quality

Checks:

- user-reported errors trigger automatic memory update;
- `/learn-pass` writes candidates/metrics after meaningful work;
- `/memory-review` can promote/archive candidates;
- metrics show applied/failed rules;
- lessons do not require repeated user reminders.

Failure signs:

- ChatGPT waits for `/save` after a clear reusable error;
- candidates never get reviewed;
- active rules are never marked applied;
- ignored rules do not become needs_revision.

Safe fixes:

- update `learn-pass.md` or adapter;
- add candidate/metric entry;
- mark rule needs_revision;
- add auto-memory trigger.

---

## 5. Harness evolution quality

Checks:

- recurring weaknesses become harness proposals;
- proposals are minimal;
- proposals have regression risk and validation plan;
- validated low-risk Markdown changes can be applied;
- high-risk/global changes become issue/PR handoff.

Failure signs:

- repeated failures only become memory notes, not harness upgrades;
- harness changes are broad and vague;
- no regression test is recorded;
- upgrade changes product code without explicit request.

Safe fixes:

- create `harness-proposals.md` entry;
- create `harness-regression-tests.md` check;
- apply small Markdown adapter fix;
- escalate global command changes.

---

## 6. Current standards check

During daily automation, `/upgrade` should compare current local practice with recent public agent-harness ideas when web access is available.

Use public research only as inspiration, not as automatic authority.

Compare against principles such as:

- weakness mining from execution traces;
- minimal harness proposal tied to failures;
- proposal validation/regression testing;
- candidate memory before active promotion;
- metrics for applied/failed rules;
- task-wise routing instead of one giant harness;
- human decision for high-risk/global changes.

Safe fixes:

- add missing rubric/checklist;
- improve report structure;
- add validation gate;
- create proposal for later review.

---

## Daily score report

Daily automation should report:

```md
## Upgrade Quality Score

Memory quality: 0-3
Harness quality: 0-3
Verification quality: 0-3
Self-learning quality: 0-3
Harness evolution quality: 0-3
Current standards alignment: 0-3

Overall:
- strong / acceptable / weak / blocked

Automatic fixes applied:
- ...

Could not fix:
- ...

Improvement prompts:
- ...
```
