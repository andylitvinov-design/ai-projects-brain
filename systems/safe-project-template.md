# SAFE.md Template

Use this template as a repo-level `SAFE.md` for public or production-facing projects.

Purpose: give Codex and ChatGPT a short, high-signal safety map so `/safe` can audit the project without rereading the whole repository.

## 1. Project boundary

- Project name:
- Canonical repo:
- Live URL:
- Preview URL:
- Hosting provider:
- Production branch/source:
- Project memory file:
- Last verified date:

## 2. Public surface

List public user-facing routes, forms, uploads, API endpoints, and webhooks.

| Surface | Path / endpoint | Public or auth required | Data accepted | Abuse/cost risk | Owner |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 3. Private/admin surface

List private routes, admin pages, role-gated features, internal APIs, and provider sync routes.

| Surface | Path / endpoint | Required role/session | Server-side guard | Data returned | Owner |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 4. Data inventory

| Data type | Stored where | Sensitive? | Retention/delete notes | Export/delete status |
| --- | --- | --- | --- | --- |
| Email / profile | | yes/no | | needs verification |
| Payments / finance | | yes/no | | needs verification |
| Uploaded files | | yes/no | | needs verification |
| Logs / analytics | | yes/no | | needs verification |

## 5. Environment variable names

Store names only. Never store values.

| Env name | Public browser-safe? | Required where | Purpose | Notes |
| --- | --- | --- | --- | --- |
| | yes/no | local/preview/prod | | |

## 6. Auth and roles

- Auth provider:
- Roles:
- Admin identifiers stored where:
- User role source of truth:
- Login/logout tested:
- Password reset tested:
- Duplicate email tested:
- Expired/reused link tested:
- Direct API access tested:

## 7. Database / storage safety

- Database provider:
- User-data tables:
- RLS/policies status:
- Storage buckets:
- Public bucket rules:
- Service-role usage:
- Migrations to inspect:

## 8. Bot, rate-limit, and API-cost controls

| Endpoint/form | Risk | Current control | Missing control | Priority |
| --- | --- | --- | --- | --- |
| | | | | |

## 9. Error handling and UX safety

- Route error boundary exists:
- API safe error wrapper exists:
- Raw provider/database errors hidden from users:
- Loading/empty/error/unauthorized states exist:
- Last browser smoke check:
- Last mobile check:

## 10. Headers and browser baseline

- CSP or CSP plan:
- X-Content-Type-Options:
- Referrer-Policy:
- Permissions-Policy:
- Frame protection:
- CORS policy:
- HSTS status:

## 11. Dependency and supply-chain checks

- Package manager:
- Lockfile present:
- Dependency audit command:
- Secret scan command:
- Agent skills / workflow packages present:
- Optional SkillSpector scan status:
- Known accepted findings baseline:

## 12. Observability and incident response

- Error logging provider:
- Deployment logs location:
- Health check URL:
- Rollback method:
- Backup status:
- Last known good deploy/commit:
- Incident contact / owner:

## 13. Safe verification commands

List the narrowest commands Codex should run before reporting success.

```bash
# examples only; replace per repo
npm run lint
npm test
npm run build
```

## 14. Known risks / needs verification

- `needs verification`:
- `needs verification`:
- `needs verification`:

## 15. Last /safe result

- Date:
- Routes selected:
- Critical findings:
- High findings:
- Fixes applied:
- PRs opened:
- Checks run:
- Checks not run:
- Live verified:
- Next action:
