# Data Schema - psihotavr

## 1. Main Data Entities

- mandala/service catalog items
- service/card images
- catalog categories and article/collection/service classification
- cart items
- Telegram order request payload
- admin mandala edit/search/delete/show-hide state
- AI-video generation requests and statuses
- auth/cabinet/order persistence entities: needs verification

## 2. Canonical Fields

| field | meaning | source | required | notes |
|---|---|---|---|---|
| `id` | catalog/service identifier | project catalog data | yes | exact source file needs code verification |
| `title` | public service/card title | project catalog data | yes | preserve Excel-derived mandala names |
| `description` | public card/detail text | project catalog data | no | long text may be truncated in cards |
| `image` / `imageUrl` | service/card image | catalog/admin image mapping | no | uploaded/updated photos should sort above generated images when implemented |
| `category` | main catalog category | catalog data/admin | no | category taxonomy needs verification per current code |
| `kind` / type-like field | service/article/collection distinction | catalog parsing/admin logic | needs verification | avoid misclassifying services as articles |
| `price` | visible purchase/order amount | catalog data/cart | no | payment/provider flow needs verification |
| `visible` | show/hide flag | admin workflow | no | persistence needs verification |
| `updatedAt` | update freshness for sorting | admin/catalog workflow | no | required for newest/updated-first behavior |

## 3. Data Contracts

Psihotavr is a Vite/React catalog/admin/cart site. Exact field names and
data contracts must be verified from current code before editing data logic.

Known important code areas:

- `src/lib/mandalaServices.ts`
- `src/pages/MandalaCatalogPage.tsx`
- `src/pages/AdminMandalasPage.tsx`
- `src/pages/CartPage.tsx`
- `src/pages/AdminVideoFormPage.tsx`
- `api/ai-videos/generate.ts`
- `api/ai-videos/status.ts`

## 4. Storage

- Catalog/content source: needs verification from current repo.
- Admin image/update persistence: needs verification.
- Cart/order storage: Telegram-first path preferred unless backend storage is
  verified.
- Supabase/Firebase cabinet and order persistence: blocked until backend/auth/RLS
  gates are verified.
- Provider credentials: env names only, never values.

## 5. Derived Data

- catalog sorting and filtering;
- updated/new service ordering;
- service/article/collection grouping;
- generated vs uploaded image priority;
- cart totals and order request text;
- AI-video provider status normalization.

## 6. Validation Rules

- Do not lose Excel-derived mandala services.
- Do not merge multiple distinct mandalas into one service unless source data
  proves they are one item.
- Services with uploaded/updated photos should be able to sort above generated
  or older items when that feature is in scope.
- For UI/default changes, verify clean session and legacy localStorage state.
- Mark unknown schema/storage details as `needs verification`.

## 7. Migration Notes

- Preserve live catalog content unless explicitly changing it.
- Do not introduce backend migrations without verified provider, auth, RLS, and
  rollback gates.
- Do not store secrets, private URLs, or env values in memory.
