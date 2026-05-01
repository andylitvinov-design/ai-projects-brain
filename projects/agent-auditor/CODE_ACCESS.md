# Code Access - Agent-Auditor

## 1. Repo Links

- canonical: needs verification
- related: needs verification
- target project repos: read target project CODE_ACCESS.md first

## 2. Access Limitations

Agent-Auditor may not have direct access to private repositories,
private Google Sheets, or OAuth-protected project data.

It must not attempt to bypass authentication. It should work from
safe project memory, public links, PRs, diffs, audit snapshots, and
sanitized user-provided exports.

## 3. User Can Provide

- PR link
- commit link
- diff
- audit snapshot JSON
- screenshots
- Excel comparison
- copied table export
- sanitized Google Sheet export

## 4. User Should Never Provide

- secrets
- tokens
- cookies
- private keys
- session data
- OAuth credentials
- unredacted service account material

## 5. How to Share Evidence Safely

Share structured, sanitized data whenever possible. Prefer audit
snapshot JSON, copied table rows, or Excel comparisons over full
private workbooks. Screenshots are useful for UI context but should
be paired with row-level or field-level data for money and balance
checks.
