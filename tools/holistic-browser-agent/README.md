# Holistic Browser Agent — local MVP 0.1.0

**Status: runnable local deterministic alpha, NOT installed on the owner's Mac, NOT live on Holistic House.** Tracks [Brain issue #259](https://github.com/andylitvinov-design/ai-projects-brain/issues/259). Implements a bounded part of the [HBA Zero-Budget v2 specification](./TECH_SPEC_ZERO_BUDGET_V1_20261028.md).

## Why this exists

Local Chromium screenshot/DOM and simple UI checks without TinyFish wallet calls, browser-cloud credits, model APIs, unapproved payments, new hosting or duplicate schedulers. This **is not** a universal autonomous agent: free-text reasoning and code changes stay in ChatGPT/Codex; the browser executor performs reviewed deterministic operations only.

## Local setup (no new paid services)

Python 3.10+ and locally installed Chromium are prerequisites. On a machine where Python Playwright is not installed:

```bash
cd tools/holistic-browser-agent
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m playwright install chromium
python -m hba doctor
```

Downloading Chromium, Python packages, and CI minutes requires ordinary internet/computer resources and can have operational limits; it does **not** call paid browser/LLM APIs. If already installed, do not redownload. On macOS use the local Python executable; `--chromium /absolute/path/to/chromium` can target an existing binary. Do not run this tool in a public serverless Vercel route.

## Commands

```bash
python -m hba doctor
python -m hba plan examples/offline-fixture.json
python -m hba run examples/offline-fixture.json
python -m hba run examples/holistic-house-public.json
python -m hba status <32-character-run-id>
python -m hba cancel <32-character-run-id>
python -m hba mcp  # local stdio MCP, no HTTP port
```

`hba run` prints a JSON summary with `state`, `steps`, hash of manifest, screenshot filenames/checksums, redacted counters, and explicit `not_tested`. Images are private local files in `~/.local/share/hba/runs/<run-id>/`, never auto-uploaded. On authentication-required or private pages, the runner **must not** be used; it makes a fresh guest context and refuses mutating operations. The fixture has only synthetic content.

Set `HBA_CHROMIUM_EXECUTABLE=/path/to/chromium` if Chromium is installed outside Playwright's default cache. Optional `HBA_RUNS_DIR=/path/to/private-local-runs` stores private artifacts; never set it to public site assets, a Git-tracked directory or a shared cloud folder.

## MCP for Codex/local client

Use a local `stdio` tool server command `python -m hba mcp` with working directory at this folder. Supported tools: `hba_doctor`, `hba_plan`, `hba_run`, `hba_status`, `hba_cancel`. This is a small JSON-RPC/MCP subset intended for **local testing**; host compatibility and security restrictions must be verified before deployment. No network listener, remote OAuth, public tunnel, arbitrary shell, JavaScript evaluator, raw CDP, exposed clipboard, arbitrary filesystem path, or account access is provided. This does not automatically make the tool callable from ChatGPT on iPhone.

## Safeguards and known limitations

- Only the exact hard-coded public `https://holistichouse.vercel.app` origin is permitted; protected app/admin/API/account routes and image optimizer endpoints are denied even on that origin. For the fixture, only the bundled HTML is loaded and **all browser requests are denied**.
- Public route requests are GET/HEAD only; unexpected redirects and WebSockets are blocked. Service workers disabled. Cross-origin assets and even required framework POSTs may fail. A browser-level route is not a host firewall, and DNS/OS network containment is **not proven**; do not use it against hostile unknown websites.
- Public click means links only; buttons/forms/attachments are forbidden. All inputs and screenshot filenames are schema-validated before any browser launch.
- No auth, real client data, reports, payments, video renders, emails, Telegram messages, registrations, merges or production writes. Paid providers are not registered at all; max additional spend always 0.
- No trace/HAR/response bodies are saved; console/errors are stored as counts, not content. Screenshot storage is local, restricted and bounded. Screenshot can include public website content; inspect before sharing.
- One run starts an ephemeral isolated browser context, closes it and writes a single local state file. Cancellation is **cooperative between actions**; it cannot instantly interrupt a blocking browser API call. This is not a durable job scheduler.
- The packaged locator/URL checks and Playwright network interception do not prove complete isolation from browser exploits or all possible network egress. Do not open authenticated/private sessions with this alpha.

## Testing / implementation proof

```bash
python -m pytest -q tests
python -m compileall -q hba
python -m hba plan examples/offline-fixture.json
python -m hba run examples/offline-fixture.json
```

Browsers need to be installed/available. Tests include protected-route denial, cost denial, external/internal URL denial, form denial, unknown action/tool denial, malformed MCP requests, private path rejection and real Chromium exercise against the fixed offline fixture. Public site E2E is reported separately because network restrictions can block the current execution environment. A passing offline fixture is **synthetic**, not proof of Holistic House live flows.

## Cost and authority

This project makes **zero paid TinyFish calls and zero new paid API calls**. Local CPU/electricity/existing subscriptions are not necessarily zero-cost. Existing Brain project instructions govern PR, deployment, data and spending authorizations; the browser tool does not grant extra rights.

## Planned, not implemented

Separate host installation, full visual reference diff, Next.js production SHA confirmation, secure test account/RLS E2E, remote/mobile MCP, provider delivery proofs, resilient multi-run queue, local reasoning model, and user-facing dashboard require independent validated work. No unapproved always-on automation or poller.
