# AUTONOMY - ezohata-incoming-ledger

Default mode: **Production Debugger Autopilot**.

The agent should move independently through repo inspection, live read-only checks, root-cause proof, minimal patch, regression tests, and PR/reporting. Do not ask the user for confirmation for safe engineering actions.

## Allowed without confirmation

- Inspect project memory and repo-local docs.
- Verify canonical repo, default branch, recent PRs/commits, and deploy/source-of-truth metadata.
- Check live read-only endpoints such as `/api/status` and `/api/audit-snapshot` when available.
- Create a branch or worktree.
- Edit/update files for a minimal safe fix.
- Add or update regression tests.
- Run read-only checks and local commands.
- Commit, push a working branch, and open/update a PR when repository access allows it.
- Prepare a Codex prompt or final remediation report.
- Update docs, `STATE.md`, `LOG.md`, and project memory when implementation facts changed.

## Stop / ask before risky actions

- Changing, exposing, requesting, or storing secrets/env values.
- Changing provider credentials, OAuth settings, payment settings, billing, or account access.
- Running destructive production scripts.
- Running migrations/backfills with `--apply` against source-of-truth data.
- Deleting or rewriting Google Sheets / ledger rows.
- Merging to `main` if merge was not explicitly delegated for this task.
- Production deploy when the deploy target/source of truth is unclear.
- Changing balance/gross/net/fee/source semantics without proven root cause and regression tests.
- Large architecture rewrites or cross-cutting refactors.

## Root-cause-first rule

For every runtime, API, import, balance, analytics, or UI finance bug, prove the failing layer before patching:

UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics.

Required evidence:

1. failing layer
2. evidence for
3. evidence against
4. confidence: high / medium / low
5. exact file/function/pattern
6. live verification needed

If proof is incomplete, write `likely bug in [layer], needs verification` and make only the safest useful change.

## Live debug contract

For runtime/API issues, check and report when possible:

- live URL / endpoint
- method: GET / POST / OPTIONS
- status
- content-type
- first 300 chars of body
- how the live response is parsed in code
- recent PRs/commits touching the affected layer
- current deploy/source of truth

Do not treat GET 405 as a bug when the route expects POST. If POST returns 400/500, inspect response body and server handler.

## Finance invariants

- Balance is calculated by `amount_net`.
- Rows with valid `amount_net` must not be excluded from balance only because `source=unknown`.
- Unknown source may break analytics quality but should not automatically break balance.
- Do not change balance logic while fixing provider transport unless root cause proves balance logic is wrong.
- PayPal gross must not be treated as net when fee is missing.
- Preserve feeAmount/feeCurrency when present.
- Determine PayPal direction from the original sign before `Math.abs`.
- Provider non-JSON/plain-text/HTML errors must become structured JSON errors, not raw SyntaxError or HTML in UI.

## Preferred verification commands

Run available commands and report exact results:

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build
```

If a command is unavailable or not run, say so explicitly.

## Final report required

1. Studied files/docs
2. Failing layer / root cause
3. What changed
4. Changed files
5. Tests/checks run
6. Checks not run
7. Live verification result or `needs verification`
8. Risks
9. Data migration/backfill status, separated from runtime fix
10. Suggested `STATE.md`/`LOG.md` update
