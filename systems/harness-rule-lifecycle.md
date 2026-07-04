# Harness Rule Lifecycle

Last updated: 2026-07-04

Purpose: keep agent rules useful, compact, and evidence-backed instead of accumulating untested instructions.

## Statuses

| Status | Meaning | Allowed action |
| --- | --- | --- |
| `candidate` | A proposed rule from one or more signals, not yet validated. | Track, test, and keep narrow. |
| `active` | A rule validated by replay, regression, repeated evidence, or a successful prevention case. | Use in command prompts and reports. |
| `needs_revision` | A rule was ignored, too vague, overbroad, contradictory, or costly. | Rewrite or split before relying on it. |
| `deprecated` | A rule is stale, duplicated, replaced, or no longer useful. | Stop loading it by default. |
| `rejected` | The proposed rule is unsafe, noisy, one-off, or not worth preserving. | Do not promote. |

## Promotion rule

Do not promote a global rule to `active` just because it sounds right. Promote only with evidence such as:

- replay case result;
- prompt regression test;
- repeated user correction;
- delivery outcome ledger entry;
- PR/issue report;
- validation output;
- an automation report showing the gate prevented false success.

## Revision rule

Mark a rule `needs_revision` when:

- an agent ignored it twice;
- it created confusion with another command or mode;
- it added context cost but did not change behavior;
- it allowed a false `SUCCESS`;
- it mixed product work with harness work;
- it used unclear vocabulary such as treating `/improve` and `/upgrade` as synonyms.

## Compactness rule

Prefer editing an existing rule or adding one precise bullet over creating a new file. New files are justified only when they become a source of truth used by several prompts or automations.

## Report requirement

Morning System Upgrade and Evening Architecture Review should report:

```txt
rule lifecycle actions:
- candidate:
- promoted to active:
- needs_revision:
- deprecated/rejected:
- evidence:
```

If no lifecycle action is justified, say `no rule lifecycle change; evidence insufficient`.
