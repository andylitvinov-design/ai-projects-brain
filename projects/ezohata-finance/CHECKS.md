# EzoHata Finance — Provider Readiness Checks

## Technical delivery

- PR #21 merged to canonical `main`.
- CI run #30202863757 concluded `success`.
- Required checks: tests, lint, typecheck, build, release guard.
- Production `/api/provider-readiness` returns HTTP 200.

## Full readiness gate

The project counts as fully provider/live verified only when all are proven:

1. source/deploy mapping;
2. database configuration;
3. owner authentication configuration;
4. current owner-session smoke;
5. configured provider presence;
6. one read-only production provider journey.

Configuration presence, successful CI, merge, deployment, or a public readiness endpoint alone do not change the readiness numerator.

## Current missing proof

- Owner Google session smoke.
- One read-only Wise or YooMoney production journey.

Until both are verified, terminal state is `BLOCKED_BY_OWNER` and readiness remains `0/4`.
