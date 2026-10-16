# AI Council Free — independent multi-model opinions on a phone

One lightweight responsive static HTML app, no paid services, no framework, no Node dependencies.

## Workflow

1. Create an OpenRouter API key at https://openrouter.ai/settings/keys — free account; no card required.
2. Open hosted `index.html` in a mobile browser, paste the key in the connection panel. Key only in React-free in-memory JS, optionally in sessionStorage if the visitor opts in. No key in source, analytics, GitHub, or website backend.
3. Enter one question, optionally context or public page copy, select up to three `:free` models.
4. Browser makes parallel `POST https://openrouter.ai/api/v1/chat/completions` requests with `model=...:free`. Independent real responses appear with model IDs and per-model failure status.
5. A separate free Gemma 4 request produces an attributed combined summary, disagreements and copyable Codex brief.
6. Optional personal Muse: Copy question → ask in Muse app → paste response → add as `manual:muse` → request one extra **free** synthesis call.
7. Copy or download Markdown report; no automatic public publication/issue creation.

## Price/limits

All model IDs strictly `:free` from official OpenRouter model listings checked October 16, 2026. The free OpenRouter tier generally allows 20 requests/minute and 50/day (shared per account), with possible provider errors or more restrictive limits. Failed calls may count. If quota is exhausted there is *no* paid fallback or charge; wait or use a different day.

## Boundaries

- A URL by itself is **not** browsed or audited; paste public page text as context. Do not fabricate observations. A future optional evidence gathering module may fetch pages via a separate free API after security and cost testing.
- No personal client/patient records, private screenshots, auth, health, banking, or other sensitive material in free-provider prompts.
- No automatic remote caller integration to personal Muse. Manual Muse is clearly marked.
- The app does not connect directly back into the user's ChatGPT conversation automatically: copy the Markdown report into ChatGPT if desired.
- Direct browser fetch depends on OpenRouter accepting the browser's CORS origin; with no user's key, this has not been end-to-end tested and must not be falsely reported as verified.