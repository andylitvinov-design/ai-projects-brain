# Playwright Verification Mode

Use this mode when the user says:

- `используй playwright-skill`
- `проверь через playwright`
- `проверь браузером`
- `проверь страницу`
- `проверь desktop/mobile`
- `открой локальные страницы`

## Purpose

Playwright Verification Mode catches bugs that code review alone misses: broken routes, missing assets, console errors, unusable forms, mobile layout problems, auth redirects, upload failures, and wrong UI state.

## When to use

Use this mode for:

- UI changes.
- Landing pages and content pages.
- Personal cabinets / dashboards.
- Forms, uploads, filters, tabs, buttons, modals.
- Auth flows when safe test credentials or mock mode exist.
- Mobile/responsive checks.
- Live/preview verification after deploy.

## Rules

- Identify the exact route(s) to test.
- Prefer local preview first, then preview/live checks if required.
- Check both desktop and mobile viewport for user-facing UI.
- Watch for console errors, network failures, broken assets, layout overflow, unavailable buttons, and stuck loading states.
- Do not use real secrets or private credentials in screenshots/logs.
- If auth is required and safe credentials are unavailable, mark auth verification as `needs verification`.
- If Playwright or browser tools are unavailable, state that browser verification was not run and provide a manual checklist.
- After fixing a UI issue, run the browser check again.

## Minimum verification checklist

1. Route loads.
2. Main content is visible.
3. Critical buttons/links work.
4. Forms or uploads behave as expected.
5. No obvious console/runtime errors.
6. Desktop viewport works.
7. Mobile viewport works.
8. Expected data/state is displayed.

## Output contract

Report:

1. Routes tested.
2. Viewports tested.
3. Actions clicked/submitted.
4. Console/network issues.
5. Screenshots or trace paths if produced.
6. Bugs found and fixed.
7. Remaining `needs verification` items.

## Default prompt snippet

```text
Use Playwright Verification Mode.
Open the relevant local/preview/live pages.
Check desktop and mobile.
Click the critical buttons/forms.
Watch console and network errors.
If problems are found, fix them and verify again.
Report routes, viewports, actions, errors, fixes, and remaining needs verification.
```