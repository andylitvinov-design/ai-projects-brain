# Data Schema - Agent-Auditor

## 1. Main Data Entity

Agent-Auditor produces an audit report.

## 2. Audit Report Schema

| field              | meaning                                      | required |
| ------------------ | -------------------------------------------- | -------- |
| audit_id           | stable identifier for the audit run          | yes      |
| target_project     | audited project slug or name                 | yes      |
| period             | audited date range or reporting period       | yes      |
| snapshot_source    | endpoint, export, screenshot, or table input | yes      |
| checks             | checks performed against the data contract   | yes      |
| findings           | detected mismatches or risks                 | yes      |
| severity           | critical, high, medium, or low               | yes      |
| evidence           | row ids, fields, totals, screenshots, diffs  | yes      |
| suspected_layer    | likely failing layer                         | yes      |
| codex_prompt       | follow-up prompt for a fixing agent          | yes      |
| needs_verification | unknowns that must not be guessed            | yes      |
| follow_up_actions  | next concrete actions                        | yes      |

## 3. Severity

- critical: wrong money/balance, data loss, provider import broken
- high: analytics mismatch, exchange missing, PayPal net/gross
  confusion
- medium: UI clarity, source unknown, missing metadata
- low: docs/project-memory stale

## 4. Suspected Layers

- UI
- API
- Ledger
- Analytics
- Provider
- Google Sheet
- Env

## 5. Validation Rules

- Findings must cite concrete evidence when available.
- Unknowns must be written as needs verification.
- A Codex prompt should only be produced after the suspected layer is
  identified.
- Screenshots can support evidence but should not be the only source
  when structured data is available.
- Provider sync must not be marked live unless a live sync result is
  verified.
