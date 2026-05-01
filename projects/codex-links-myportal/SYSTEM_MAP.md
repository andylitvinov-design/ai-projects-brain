# System Map - codex-links-myportal

## 1. High-level Flow

[INPUT] Finance sync requests, provider import helpers, and token-gated
API calls.

↓

[PROCESSING] Cloudflare Pages Functions handle provider selection and
finance sync paths.

↓

[STORAGE] Cloudflare storage/KV and provider-side data need
verification.

↓

[OUTPUT] Finance sync responses and browser-assisted import helpers.

## 2. Main Actors

- user
- admin
- provider
- backend
- external APIs
- needs verification

## 3. Data Flow

Provider sync paths collect PayPal, Plaid, Wise, Binance, and TD import
data through Cloudflare Functions. Code paths do not prove live
credentials are configured.

## 4. Runtime Flow

Cloudflare Pages app with token-gated /api/finance/sync; local checkout
remote is unknown and dirty per inventory.

## 5. Deploy Flow

Repo remote unknown -> Cloudflare Pages project codex-links-myportal ->
live; repo mapping needs verification.

## 6. Critical Paths

- provider sync paths
- finance import helpers
- dirty local checkout risk
- never store finance secrets

## 7. Unknowns

- Exact deploy source: needs verification
- Current live behavior: needs verification
- Data flow details not listed in inventory: needs verification
