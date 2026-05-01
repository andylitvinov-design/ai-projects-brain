# Agent-Auditor

## 1. Purpose

Agent-Auditor is a Data Auditor for detecting mismatches,
anomalies, and regression risks across user projects.

It audits project behavior by comparing project memory,
declared data contracts, debug history, and safe data snapshots.
It does not use browser login as its primary audit method.

## 2. Why Browser Audit Is Not Suitable

The old Agent-Auditor approach was ineffective for
ezohata-incoming-ledger because it tried to inspect the live site
through a browser.

That site depends on Google OAuth and Google Sheets access. An
external or unauthenticated agent cannot reliably pass
authorization or see the real private finance data. A browser-only
audit can therefore report UI availability while missing the actual
ledger, balance, provider, and analytics mismatches.

## 3. Primary Model

Agent-Auditor is a data-based auditor.

It reads:

- ai-projects-brain project memory
- target project DATA_SCHEMA
- target project DEBUG_LOG
- finance /api/audit-snapshot
- user-provided Excel, Google Sheet exports, screenshots, or table
  snapshots when the endpoint is unavailable

It then compares the expected data contract with the actual
snapshot and produces an audit report, bug list, likely root-cause
layer, and a follow-up Codex prompt.

## 4. First Target Projects

- ezohata-incoming-ledger
- finance
- later: codex-links
- later: brain-management

## 5. Error Classes To Detect

- balance mismatch
- PayPal gross/net confusion
- missing exchange amount_usd
- source unknown spike
- analytics not using normalized ledger
- provider import code path exists but live sync not verified
- stale data / wrong production source

## 6. Repositories

- canonical repo: needs verification
- related repos: needs verification
- target project repos: read from target project memory first

## 7. Hosting / Deploy

- provider: not applicable / needs verification
- deploy source: not applicable / needs verification
- live URL: not applicable

## 8. Current Status

Design/instruction project. It is a project memory entry and audit
workflow description, not a confirmed deployed product.

finance /api/audit-snapshot is live and reachable at
https://ezohata-incoming-ledger.vercel.app/api/audit-snapshot.
Agent-Auditor uses snapshot/data audit as its primary method, not
browser/UI login.

## 9. Important Files

- needs verification

## 10. Environment Variable Names

Only names are listed. Values must never be stored here.

- none

## 11. Rules for Codex

- Do not bypass Google OAuth.
- Do not request or store secrets.
- Do not mutate production data during audit.
- Read target project memory before auditing.
- Use sanitized snapshots when direct safe endpoints are unavailable.
- Mark unknowns as needs verification.

## 12. Verification Status

- repo mapping: needs verification
- hosting/deploy mapping: needs verification
- important files: needs verification
- finance /api/audit-snapshot availability: verified live
- finance /api/audit-snapshot contract: needs verification
