# System Map - psihotavr

## 1. High-level Flow

[INPUT] Public visitors, mandala catalog users, cart/order
actions, admin/content actions, uploaded service images, and
AI-video generation requests.

↓

[PROCESSING] Vite/React routes render the public catalog,
cart, admin mandala tools, AI-video hub, and related content
flows. Telegram-first order submission is the preferred
no-backend path for now.

↓

[STORAGE] Catalog/content data is repo/static/local workflow
unless a specific backend path is verified. Supabase/Firebase
cabinet and cart/order persistence work remains blocked until
backend, auth, migration, and live RLS gates are verified.

↓

[OUTPUT] Public Psihotavr site, mandala catalog, cart/order
flow, admin mandala editing surface, AI-video generation
status, and production deployment at
https://psihotavr.vercel.app.

## 2. Main Actors

- visitor / customer
- admin
- Telegram order recipient / operator
- Vercel-hosted frontend/API runtime
- AI-video providers: HeyGen, Synthesia, D-ID, exact live
  configuration needs verification
- Supabase/Firebase auth/backend experiments: blocked until
  verified

## 3. Data Flow

Mandala catalog pages read service/content data from project
files and route-level helpers. Admin mandala tools edit catalog
content and service image mappings through the current
repo-backed/admin workflow; persistence details must be
verified before production claims.

Cart/order flow should prefer Telegram request submission until
a backend-backed order storage path is confirmed.

AI-video requests flow through frontend/admin pages into
`api/ai-videos/generate.ts` and `api/ai-videos/status.ts`, then
through provider service code. Provider credentials are env
names only and must never be stored in memory.

## 4. Runtime Flow

Vercel serves a Vite/React app. Key routes include public
catalog pages, cart, `/admin/mandalas`, and video/admin flows.
Runtime source branch/commit must be checked through Vercel or
repo/deploy metadata before claiming a live fix.

## 5. Deploy Flow

https://github.com/andylitvinov-design/psihotavr -> Vercel
project `psihotavr` -> https://psihotavr.vercel.app.

Canonical branch is `main` unless repo/deploy metadata proves
otherwise. Historical Claude/Codex branches must not be carried
wholesale; salvage only current safe hunks onto fresh `main`.

## 6. Critical Paths

- public mandala catalog and service card classification
- service image upload/update and persistence
- admin mandala search/edit/delete/show-hide flows
- cart and Telegram-first order submission
- PayPal/payment UI handoff
- AI-video generation admin flow
- Google/Firebase/Supabase auth/cabinet experiments
- Vercel deploy source and live verification
- mobile layout/default-state/localStorage behavior

## 7. Verification Gates

- Run project checks such as build/typecheck/verification scripts
  when available.
- For UI/default-state changes, verify clean session, legacy
  localStorage/sessionStorage, clicked-state, desktop, and mobile.
- For production claims, verify the live URL and deployment source.
- For auth/orders/backend changes, require provider, migration,
  RLS/admin/user, and live gates before merge/deploy.

## 8. Unknowns

- Exact current Vercel deploy source: needs verification per run.
- Preview deployment mappings: needs verification.
- Authenticated admin/cabinet behavior: needs verification.
- Backend persistence path for catalog/order/admin edits: needs
  verification before production claims.
- AI-video provider live credential status: needs verification.
