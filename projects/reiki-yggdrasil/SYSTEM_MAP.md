# System Map - reiki-yggdrasil

## 1. High-level Flow

[INPUT]
Public learners, profile users, masters, admins, Supabase auth/data, and admin moderation actions.

↓

[PROCESSING]
Vite/React routes render public pages, profile/admin flows, and master catalog data.

↓

[STORAGE]
Supabase stores auth/profile/master catalog data; exact live schema state needs verification.

↓

[OUTPUT]
Public routes, profile cabinet, masters catalog, admin moderation, and RU-default UI.

## 2. Main Actors

- user
- admin
- provider
- backend
- external APIs
- needs verification

## 3. Data Flow

React routes call Supabase client paths for profile, master, and admin data; seeded/live data still needs verification.

## 4. Runtime Flow

Vercel serves a Vite/React app with Supabase-backed flows.

## 5. Deploy Flow

GitHub -> Vercel Vite build -> live reiki-yggdrasil site; exact deploy source needs verification.

## 6. Critical Paths

- public routes
- admin/profile/master catalog
- Supabase auth/data
- RU default
- three-column layout risk

## 7. Unknowns

- Exact deploy source: needs verification
- Current live behavior: needs verification
- Data flow details not listed in inventory: needs verification
