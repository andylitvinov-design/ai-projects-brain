# Data Samples - psihotavr

Use this file for sanitized examples only. Do not store secrets, real tokens,
private customer data, provider responses with credentials, or env values.

## 1. Safe Catalog Item Shape

```json
{
  "id": "needs-verification",
  "title": "Example mandala service",
  "description": "Short public description",
  "category": "needs verification",
  "imageUrl": "/example-public-image.jpg",
  "price": "needs verification",
  "visible": true,
  "updatedAt": "2026-07-02T00:00:00.000Z"
}
```

Exact current field names must be verified in the repo before using this as a
contract.

## 2. Safe Order Request Shape

```json
{
  "items": [
    {
      "id": "needs-verification",
      "title": "Example service",
      "quantity": 1
    }
  ],
  "contact": "telegram-or-user-entered-contact",
  "message": "public order request text"
}
```

The canonical Telegram order format needs verification from current cart code.

## 3. Safe AI Video Request Shape

```json
{
  "serviceId": "needs-verification",
  "provider": "heygen-or-other-provider",
  "prompt": "public-safe generation prompt",
  "status": "queued"
}
```

Provider response contracts and credential status need live/code verification.

## 4. Screenshot Evidence

Useful screenshots:

- catalog first viewport desktop/mobile;
- service card after image update;
- admin mandala search/edit state;
- cart/order flow;
- AI-video admin flow;
- live deployment/version evidence.

Do not include screenshots exposing tokens, private emails, or provider keys.
