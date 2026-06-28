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

## 4. Critical frontend journeys

List the user journeys `/safe` must smoke-check for runtime, interaction, and visual polish.

| Journey | Route(s) | Main user actions | Mobile required? | Expected safe result | Last checked |
| --- | --- | --- | --- | --- | --- |
| Home / landing | | click primary CTA, navigate menu | yes/no | no broken links, clear CTA | |
| Login / auth | | login/logout/reset, wrong password | yes/no | safe auth states | |
| Profile / dashboard | | open, refresh, back, edit/save | yes/no | no white screen, safe states | |
| Admin action | | wrong role, save, delete/cancel | yes/no | guarded and reversible | |
| Order / checkout | | submit, double-click, invalid data | yes/no | no duplicate order/payment | |
| Upload / gallery | | wrong file, large file, missing image | yes/no | safe validation/fallback | |
| Search / filter | | no results, reset, pagination | yes/no | clear empty states | |

## 5. Data inventory

| Data type | Stored where | Sensitive? | Retention/delete notes | Export/delete status |
| --- | --- | --- | --- | --- |
| Email / profile | | yes/no | | needs verification |
| Payments / finance | | yes/no | | needs verification |
| Uploaded files | | yes/no | | needs verification |
| Logs / analytics | | yes/no | | needs verification |

## 6. Environment variable names

Store names only. Never store values.

| Env name | Public browser-safe? | Required where | Purpose | Notes |
| --- | --- | --- | --- | --- |
| | yes/no | local/preview/prod | | |

## 7. Auth and roles

- Auth provider:
- Roles:
- Admin identifiers stored where:
- User role source of truth:
- Login/logout tested:
- Password reset tested:
- Duplicate email tested:
- Expired/reused link tested:
- Direct API access tested:

## 8. Database / storage safety

- Database provider:
- User-data tables:
- RLS/policies status:
- Storage buckets:
- Public bucket rules:
- Service-role usage:
- Migrations to inspect:

## 9. Bot, rate-limit, and API-cost controls

| Endpoint/form | Risk | Current control | Missing control | Priority |
| --- | --- | --- | --- | --- |
| | | | | |

## 10. Frontend UX safety and polish

- Route error boundary exists:
- API safe error wrapper exists:
- Raw provider/database errors hidden from users:
- Loading/empty/success/error/unauthorized states exist:
- Duplicate submit guard exists:
- Double-click behavior checked:
- Back/refresh behavior checked:
- Mobile layout checked:
- Desktop layout checked:
- Visual polish known issues:
- Last browser smoke check:
- Last mobile check:

## 11. Headers and browser baseline

- CSP or CSP plan:
- X-Content-Type-Options:
- Referrer-Policy:
- Permissions-Policy:
- Frame protection:
- CORS policy:
- HSTS status:

## 12. Dependency and supply-chain checks

- Package manager:
- Lockfile present:
- Dependency audit command:
- Secret scan command:
- Agent skills / workflow packages present:
- Optional SkillSpector scan status:
- Known accepted findings baseline:

## 13. Observability and incident response

- Error logging provider:
- Deployment logs location:
- Health check URL:
- Rollback method:
- Backup status:
- Last known good deploy/commit:
- Incident contact / owner:

## 14. Safe verification commands

List the narrowest commands Codex should run before reporting success.

```bash
# examples only; replace per repo
npm run lint
npm test
npm run build
```

## 15. Frontend smoke checks

List the narrowest browser/manual checks Codex should do for user-facing UI.

```text
- Open live/preview/local home page.
- Check desktop primary route.
- Check mobile primary route.
- Click primary CTA.
- Submit one key form empty, invalid, and valid when safe.
- Double-click submit/CTA when duplicate action is risky.
- Refresh after data loads.
- Use browser back/forward.
- Confirm no raw internal error, blank screen, broken layout, or messy visual state.
```

## 16. Known risks / needs verification

- `needs verification`:
- `needs verification`:
- `needs verification`:

## 17. Last /safe result

- Date:
- Routes selected:
- Frontend routes/actions checked:
- Critical findings:
- High findings:
- Fixes applied:
- PRs opened:
- Checks run:
- Checks not run:
- Live verified:
- Next action:
