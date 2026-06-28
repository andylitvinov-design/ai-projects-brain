# Harness Regression Tests

This file tracks checks used to validate harness changes.

A harness change should not be promoted unless at least one relevant check passes.

## Test format

```md
## YYYY-MM-DD — Test title

Harness change:
- ...

Scenario:
- ...

Expected behavior:
- ...

Actual behavior:
- ...

Result:
- pass | fail | partial | not run

Follow-up:
- ...
```

## Default checks

- `/save` upserts instead of duplicating.
- `/learn-pass` writes candidates/metrics for weak lessons.
- User-reported reusable error triggers automatic memory update.
- `/delivery` reports `Applied memory` when old rules were used.
- `/delivery` reports `Learning Pass` when a new lesson was found.
- Archive/candidates/metrics are not loaded by default.
