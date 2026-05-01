# System Map - brain-management

## 1. High-level Flow

[INPUT] Dashboard data, daily thinking/audit data, morning
report data, and mobile-run requests.

↓

[PROCESSING] scripts/refresh-management-dashboards.js
refreshes management dashboard data and report artifacts.

↓

[STORAGE] dashboard-thinking/data/ contains current
dashboard JSON snapshots.

↓

[OUTPUT] Cloudflare Pages dashboard, reports, and
verification paths.

## 2. Main Actors

- user
- admin
- provider
- backend
- external APIs
- needs verification

## 3. Data Flow

Refresh scripts update dashboard-thinking/data JSON files,
reports read those files, and public/API verification checks
the generated report data path.

## 4. Runtime Flow

Cloudflare Pages serves the dashboard and Functions such as
functions/api/mobile-run.js.

## 5. Deploy Flow

GitHub -> Cloudflare Pages -> brain-management live
dashboard; exact branch needs verification.

## 6. Critical Paths

- dashboard refresh
- morning report flow
- reports/data verification path
- mobile-run API

## 7. Unknowns

- Exact deploy source: needs verification
- Current live behavior: needs verification
- Data flow details not listed in inventory: needs
  verification
