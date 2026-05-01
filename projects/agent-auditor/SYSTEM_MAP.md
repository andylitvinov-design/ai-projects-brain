# System Map - Agent-Auditor

## 1. High-level Flow

[INPUT]

- projects/<target>/PROJECT.md
- projects/<target>/SYSTEM_MAP.md
- projects/<target>/DATA_SCHEMA.md
- projects/<target>/DEBUG_LOG.md
- finance /api/audit-snapshot
- user-provided screenshots / Excel / table exports

↓

[ANALYSIS]

- compare expected contract vs actual snapshot
- detect anomalies
- classify severity
- identify probable layer:
  UI / API / Ledger / Analytics / Provider / Google Sheet / Env

↓

[OUTPUT]

- audit report
- bug list
- root cause hypothesis
- Codex prompt
- project memory update suggestion

## 2. Main Actors

- user
- Codex
- Agent-Auditor
- target project
- finance audit snapshot endpoint
- sanitized user-provided data exports

## 3. Data Flow

Agent-Auditor reads target project memory and schema first. It then
reads a safe audit snapshot when available. If the endpoint is not
available, it asks for a sanitized Excel export, Google Sheet
snapshot, screenshot, or copied table.

The auditor compares expected fields, formulas, source mappings,
and known debug history against the actual snapshot. It records
evidence and assigns a suspected layer before producing a Codex
prompt.

## 4. Runtime Flow

This project is an instruction and memory project. Runtime execution
is performed by Codex or another agent using the memory files and
safe input artifacts.

## 5. Deploy Flow

Not applicable / needs verification.

## 6. Critical Paths

- projects/<target>/PROJECT.md
- projects/<target>/DATA_SCHEMA.md
- projects/<target>/DEBUG_LOG.md
- finance /api/audit-snapshot
- sanitized user-provided snapshots

## 7. Unknowns

- Canonical repo: needs verification
- Important files: needs verification
- Whether finance /api/audit-snapshot is deployed: needs verification
- Exact audit snapshot contract: needs verification
