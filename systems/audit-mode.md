# Audit Mode

`/audit` is read-mostly verification mode for existing code, data, PRs, sites,
calculations, or production behavior. It starts with `/context-scout` preflight
from `systems/context-scout-mode.md` before building the audit plan.

## Behavior

1. Run `/context-scout` first and use its `CONTEXT BUNDLE`.
2. Build an explicit verification checklist from the user goal, project memory,
   repo docs, risks, live/source-of-truth checks, and likely files.
3. Inspect implementation and data before recommending or making changes.
4. Prove the failing layer when possible.
5. Auto-fix only safe deterministic issues.
6. Report unresolved issues with recommendations and a Codex-ready follow-up
   prompt when useful.

## Safe auto-fix rules

Auto-fix only when all relevant evidence is intact and the correction is
deterministic, reversible, and local to the audited surface, for example:

- regenerated indexes or derived docs;
- formatting-only corrections;
- stale generated values;
- recalculated summaries from intact source data;
- broken internal references with one obvious target.

Do not auto-fix destructive changes, ambiguous ownership, production data,
secrets/env, auth/provider settings, migrations, billing, or source records
without explicit approval and evidence.

## Report format

- Context bundle summary
- Verification checklist
- Findings with evidence
- Safe fixes applied
- Unresolved issues
- Recommended fix order
- Checks run
- Risks / blockers
- Codex prompt to fix, when needed
