# AI Council Chat (free-model MVP)

A lightweight mobile-first multi-AI conversational reviewer that **does not use Codex**, external paid models, a database, or private API key in the repository.

## Open

Deploy the `tools/ai-council-chat` directory as a static site, e.g. Vercel with framework "Other" and root directory `tools/ai-council-chat`.

- Connect using the official OpenRouter OAuth PKCE sign-in (S256) or paste an API key from https://openrouter.ai/settings/keys.
- With **Remember this device** enabled (default for personal devices), the verified API key persists in this origin's browser `localStorage` (UNENCRYPTED), allowing reconnect on reload. Switch it off for shared devices to keep the key only in `sessionStorage`. The key is **never** committed, sent to our Vercel server, or stored in a database. In-app browsers and Safari can have separate localStorage contexts; always use the same browser/origin. It is sent directly over HTTPS to OpenRouter.
- Conversation transcripts are stored only in this browser's `localStorage` (no cross-device sync). Press '×' beside a conversation to delete it.
- Each question sends the same question/context to three different selected **free** models in parallel; a fourth request synthesizes successful responses. The app looks up the live `https://openrouter.ai/api/v1/models` list and requires each `model_id` to end with `:free` and to report `pricing.prompt = pricing.completion = 0`. It never silently upgrades to a paid model.
- A follow-up question creates another round in the same thread. Draft-TZ action produces a local, copyable planning draft; it does not publish GitHub tasks.
- One full round = up to **4** OpenRouter API calls. As of 2026-10-16, OpenRouter free usage is generally limited to 50 requests/day and 20/minute. Limits are provider/account-specific and can change. The on-screen count is a **local estimate**, not OpenRouter's authoritative quota.
- If model providers are unavailable, the app shows the actual request errors; there are no fake/generated sample responses.

## Privacy and important boundaries

- Requests go **directly from the browser to OpenRouter** via HTTPS, with a user-specific token only. You are responsible for your own account and key.
- Never paste private client/health records or other sensitive client data. Other providers receive your prompt.
- A URL in a prompt is context text, not browsing evidence. Reviewers must not claim they opened a URL.
- The first version is for individual use. Client-side BYOK API keys are not appropriate for shared team accounts or machines you don't control.
- If OpenRouter restricts browser CORS requests in a specific environment, a safe authenticated backend relay may be required later; never add an open public proxy.
- Hosting on the user's existing Vercel plan ordinarily needs no new subscription for a small static app, but the host's account-specific limits/billing still apply.
- Strict content security policy only permits calls to `https://openrouter.ai`.

## Known MVP limitations

No direct ChatGPT account integration; no automatic live-site screenshot/browser crawling; no API integration with GitHub; no use of Muse paid models; no cross-device chat synchronization. Independent UX/product/technical model roles are review lenses, not certified expertise.

## How to test manually

1. Open on desktop and iPhone 390px view; confirm no horizontal overflow.
2. Load free model list and verify only `:free` models in all selectors.
3. Connect a personal free OpenRouter key; submit one question.
4. Verify 3 independent statuses + one synthesis result, then ask a follow-up.
5. Force a 401 invalid key, 429 free quota, and offline mode; confirm errors are visible.
6. Create TZ, copy, export Markdown, delete a thread.
7. Disconnect; confirm API key no longer exists in sessionStorage.
8. Check keyboard Enter/Shift+Enter and RU/EN toggle.

Related architecture: https://github.com/andylitvinov-design/ai-projects-brain/issues/233

## 2026-10-16: Curated model selection and settings migration

Default reviewer roster: Nemotron 3.5 Super VL (UX), Dots3-Note Preview (independent product critique), Cohere North Mini Code (engineering), Nemotron 3 Super (synthesis). Selected for role fit, independent reviewer providers, benchmark/reliability trade-offs and free access. Not a claim that any individual model is best in all circumstances. Nemotron 3 Ultra free was excluded from automatic default because the provider's observed availability was unstable on this date. Model selection is stored separately in `ai-council-settings-v2`; existing manually customized choices are retained, and stale models are not silently swapped. If a model is no longer free/available, choose manually or press **Use recommended models**. First migration upgrades only the exact original default quartet. Verify new-free API prices before each request.

Security trade-off: persistence means keeping a bearer token in localStorage, readable by same-origin scripts and potentially by anyone with access to an unlocked device/browser profile. This is explicitly opt-in/opt-out and documented in the settings UI; not appropriate for shared/public devices. Browser storage isn't shared between ChatGPT's in-app browser and regular Safari. For higher security in a future version, consider passphrase-encrypted persistent storage or backend-managed HttpOnly sessions.
