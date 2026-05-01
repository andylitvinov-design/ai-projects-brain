# Codex Brief - Agent-Auditor

## Before Auditing

- Read this file.
- Read target project memory first.
- Read target project PROJECT.md.
- Read target project SYSTEM_MAP.md.
- Read target project DATA_SCHEMA.md.
- Read target project DEBUG_LOG.md.
- Read target project RISKS.md.

## Audit Method

- Compare DATA_SCHEMA with the audit snapshot.
- Use finance /api/audit-snapshot when available.
- If the snapshot endpoint is unavailable, request a sanitized
  user-provided snapshot, Excel export, table export, or screenshot.
- Generate a concise report with checks, findings, severity,
  evidence, suspected layer, and needs verification items.

## Codex Prompt Rules

- Produce a Codex prompt only after identifying the suspected layer.
- The prompt should name the target project, evidence, likely layer,
  and exact behavior to verify or fix.
- Mark unknowns as needs verification.
- Never expose secrets.

## Standard Response Required From Codex

1. Target project
2. Snapshot source
3. Checks performed
4. Findings
5. Severity
6. Evidence
7. Suspected layer
8. Codex prompt
9. Follow-up actions
10. Needs verification
