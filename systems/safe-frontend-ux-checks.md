# /safe Frontend UX Safety Checks

Status: operational checklist for user-facing frontend reliability and visual quality.

Primary mode: `systems/safe-mode.md`
Routing matrix: `systems/safe-routing.md`

Use this file when `/safe` needs to check whether a site can break from normal user actions or look unpolished enough to reduce trust.

## Goal

Catch frontend problems that real users notice before they report them:

- site does not load;
- buttons/links/forms do not work;
- user can create bad state by clicking twice, submitting empty forms, refreshing, going back, or losing network;
- layout breaks on mobile or desktop;
- text, spacing, cards, modals, and navigation look messy or unfinished;
- errors are confusing, raw, or invisible.

## Route selection

Use this checklist when the selected route includes any of:

- frontend runtime;
- public forms;
- admin/profile dashboard;
- checkout/order flow;
- upload/gallery/catalog flow;
- mobile UX;
- visual polish;
- user-facing error safety.

## User action failure checks

For each critical user journey, test or inspect:

1. Open page directly by URL.
2. Refresh page after data loads.
3. Browser back/forward after navigation.
4. Click primary CTA once.
5. Double-click primary CTA quickly.
6. Submit form empty.
7. Submit form with invalid data.
8. Submit form with valid data.
9. Submit while logged out if auth is required.
10. Submit as wrong role if roles exist.
11. Cancel/close modal/drawer.
12. Retry after error.
13. Use search/filter with no results.
14. Use pagination/load-more at the end.
15. Upload too-large or wrong-type file if uploads exist.
16. Simulate slow/loading state when possible.
17. Simulate missing/null API data when possible.
18. Confirm no duplicate records/orders are created by repeated clicks.

## UI state checks

Every key screen should have clear states:

- loading;
- empty;
- success;
- validation error;
- server error;
- unauthorized/logged out;
- forbidden/wrong role;
- not found;
- offline/network failure if relevant;
- saved/unsaved state for forms or editors.

## Visual polish checks

Inspect mobile and desktop:

- spacing is consistent;
- cards align and do not overlap;
- buttons have clear hierarchy and tappable size;
- text does not overflow or clip;
- long labels wrap gracefully;
- images keep aspect ratio and have placeholders/fallbacks;
- modals/drawers fit viewport and scroll correctly;
- sticky headers/footers do not cover content;
- forms are not cramped;
- tables/cards are readable on mobile;
- active/disabled/loading states are visually distinct;
- colors and contrast are readable;
- no debug labels, placeholder copy, raw JSON, or broken icons are visible.

## Navigation checks

- Main navigation works from every primary page.
- User can return to dashboard/profile/home without dead ends.
- Current page/active tab is clear.
- Protected pages redirect or show safe auth state.
- Unknown routes show a useful 404, not blank screen.
- External links open intentionally and are not broken.

## Form and CTA checks

- Required fields are marked.
- Validation appears near the field or form.
- Submit button disables or shows loading during submit.
- Errors are human-readable.
- Success state is clear.
- Duplicate submit is prevented or idempotent.
- User input is preserved after recoverable errors when safe.
- Destructive actions require clear confirmation.

## Data display checks

- Currency, dates, counts, statuses, and user names format consistently.
- Missing optional data has a clean placeholder.
- Long content is truncated/wrapped intentionally.
- Empty lists explain what to do next.
- Filters/search do not hide everything without explanation.
- Admin/user data is not mixed between accounts.

## Severity guide

- `critical`: primary route white-screens, checkout/order/admin critical action breaks, duplicate paid/order action likely, private data appears in wrong account, mobile blocks primary action.
- `high`: key form cannot submit, auth state traps user, raw internal error shown, upload/order flow broken, destructive action can happen accidentally.
- `medium`: important layout broken on mobile/desktop, confusing validation, missing empty/error state, button/link broken but workaround exists.
- `low`: spacing/visual polish issues, copy inconsistency, non-blocking console warning, minor alignment or overflow.

## Evidence to report

For every frontend UX finding, include:

- route/page;
- device/viewport if checked;
- user action attempted;
- observed result;
- expected result;
- screenshot/browser note if available;
- severity;
- minimal safe fix;
- whether checked locally, preview, or live.

## Minimal safe fixes

Prefer small changes:

- add loading/empty/error state;
- disable submit during request;
- make submit idempotent or guard double click;
- show safe user-facing message;
- fix one broken route/link/button;
- add fallback for missing image/data;
- improve mobile layout for one component;
- add route-level error boundary;
- add a small smoke test or checklist entry for the broken journey.
