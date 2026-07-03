# To-Delivery Tickets Standard

Last updated: 2026-07-03

Purpose: convert product-code, provider, data, auth/payment, deployment, or secret-adjacent work into exact agent-ready tickets instead of executing risky changes from analysis/upgrade/review modes.

## When to use

Use this standard from `/improve`, `/upgrade`, Evening Architecture Review, `/audit`, `/audit-ui`, `/audit-fin`, or `/safe` when the next useful action crosses one of these boundaries:

- product code changes;
- provider configuration;
- production data mutation;
- auth, payment, billing, or account access;
- deploy or environment changes;
- secret-adjacent work;
- live verification requiring unavailable credentials or admin access.

## Ticket shape

Every agent-ready ticket should include:

```md
## Source
Where this came from: automation/review/date, PR, issue, user report, live URL, or project memory.

## Goal
One clear outcome.

## Boundaries
- What must not be touched.
- Secret and data-safety rules.
- What to do if access is missing.

## Required checks
1. Confirm source of truth: repo, branch, live URL, provider/project when relevant.
2. Prove the failing layer before changing anything.
3. Run the narrowest useful tests/checks.
4. Run browser/live proof when UI or production behavior is involved.
5. Separate `code path exists`, `provider configured`, `data present`, and `live verified`.

## Acceptance criteria
- Observable done state.
- Required proof.
- Exact blocker format if not done.

## Suggested command
`/delivery`, `/audit-ui`, `/audit-fin`, or `/safe` prompt referencing this issue.
```

## Routing

- UI/product behavior -> `/delivery` or `/audit-ui`.
- Finance/provider balances -> `/audit-fin`.
- Auth, secrets, runtime safety, public failure states -> `/safe` or `/delivery` with safe boundaries.
- Pure harness/docs/memory -> `/upgrade`; no product ticket needed.

## Reporting rule

When a ticket is created, the review/handoff must record:

- repository;
- issue URL/number;
- why it was not executed directly;
- suggested command;
- what remains `needs verification`.

## Anti-patterns

Do not create tickets that say only `fix it` or `check project`.
Do not include real secret values.
Do not hide source-of-truth uncertainty.
Do not mark tickets ready if they lack proof requirements.
