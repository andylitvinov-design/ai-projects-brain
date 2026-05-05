# System Map - artefacts

## 1. High-level Flow

[INPUT] Artefacts marketplace MVP users, artefact catalog/content,
admin or curator inputs, and possible commerce/contact actions.
Exact actors and flows need verification from the Artefacts repo.

↓

[PROCESSING] needs verification

The actual framework, route model, catalog logic, filtering,
checkout/contact behavior, admin behavior, and build/runtime
pipeline must be confirmed from repo-local files.

↓

[STORAGE] needs verification

Possible storage/data source is not confirmed. Do not assume
Supabase, static JSON, CMS, Google Sheets, or payment provider
until verified in the Artefacts repo.

↓

[OUTPUT] needs verification

Likely outputs may include public marketplace pages, artefact
cards/details, admin/curator pages, or contact/checkout flows,
but exact routes and live behavior need verification.

## 2. Main Actors

- visitor/buyer: needs verification
- admin/curator: needs verification
- artefact provider/seller: needs verification
- backend/API layer: needs verification
- external APIs/payment/content providers: needs verification

## 3. Data Flow

needs verification

Before changing data flows, inspect:

- README.md
- AGENTS.md if present
- STATE.md or project-state.md if present
- LOG.md if present
- package/deploy config
- route/page/component structure
- data directories, API routes, CMS config, or database clients
- env names in `.env.example`, docs, or deploy config if present

## 4. Runtime Flow

Private related repo from GitHub inventory. Runtime framework,
rendering mode, and route structure need verification.

## 5. Deploy Flow

https://github.com/andylitvinov-design/artefacts -> needs
verification -> needs verification.

Exact deploy source, branch, hosting provider, preview URL, and
production live URL need verification.

## 6. Critical Paths To Verify First

- actual framework and package manager
- build/dev/test commands
- public marketplace routes
- artefact data source
- admin/curator flow, if present
- contact/checkout/payment flow, if present
- env variable names only
- hosting/deploy source
- design/mockup source
- MVP scope already implemented

## 7. Unknowns

- Exact deploy source: needs verification
- Current live behavior: needs verification
- Live URL: needs verification
- Hosting provider/project: needs verification
- Data flow details not listed in inventory: needs verification
- Env names and required services: needs verification
- Design/mockup availability: needs verification
