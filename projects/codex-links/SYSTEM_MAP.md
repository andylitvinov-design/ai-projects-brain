# System Map - codex-links

## 1. High-level Flow

[INPUT] User/operator commands, Slack-backed Codex Cloud
events, delivery/report requests.

↓

[PROCESSING] Cloudflare Pages Functions process commands,
delivery state, reports, and optional command bridge paths.

↓

[STORAGE] Cloudflare/KV-backed app state and project files
need verification.

↓

[OUTPUT] Inbox, delivery timeline, reports surface, and
related codex-save diagnostics.

## 2. Main Actors

- user
- admin
- provider
- backend
- external APIs
- needs verification

## 3. Data Flow

Commands and report requests enter Cloudflare Pages
Functions, pass through dispatch/report helpers, and surface
in public app views. Slack-backed Codex Cloud is the primary
production command delivery path per inventory.

## 4. Runtime Flow

Cloudflare Pages serves public assets and Functions for
commands, delivery, reports, and dispatch helpers.

## 5. Deploy Flow

GitHub -> Cloudflare Pages -> live codex-links pages; exact
production binding needs verification.

## 6. Critical Paths

- command bridge
- Slack-backed Codex Cloud dispatch
- delivery/reports
- codex-save related diagnostics
- release version alignment

## 7. Unknowns

- Exact deploy source: needs verification
- Current live behavior: needs verification
- Data flow details not listed in inventory: needs
  verification
