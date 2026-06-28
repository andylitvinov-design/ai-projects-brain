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

## ChatGPT handoff output contract

When Andrey uses `/audit` in ChatGPT to prepare work for Codex, do not return a
long technical audit as the final chat answer unless he explicitly asks for the
full audit text in chat.

Default handoff behavior:

1. Prove the failing layer as far as available tools allow.
2. Create or update a GitHub issue with the technical details, evidence, files,
   root cause, scope, risks, and verification checklist.
3. Return a short Codex handoff prompt only.
4. The first word of the final prompt must be `delivery`.
5. Keep implementation details in the issue; the chat answer should reference
   the issue and include only the compact `/delivery` prompt.

Failure mode to avoid:

- Do not mix the old full-audit report format with the handoff format.
- Do not give Andrey a long audit when the expected next action is Codex
  execution through `/delivery`.
- Do not omit the short `delivery /goal: ...` prompt after creating/updating the
  issue.

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

Use this full report format only when the user explicitly asks for the full audit
in chat, when no GitHub issue can be created/updated, or when the task is purely
read-only and no Codex handoff is needed.

- Context bundle summary
- Verification checklist
- Findings with evidence
- Safe fixes applied
- Unresolved issues
- Recommended fix order
- Checks run
- Risks / blockers
- Codex prompt to fix, when needed
