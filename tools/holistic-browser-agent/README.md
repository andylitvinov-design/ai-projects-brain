# Holistic Browser Agent — local MVP 0.2.0

**Status: runnable local deterministic alpha, NOT installed on the owner's Mac, NOT live on Holistic House.** Tracks [Brain issue #259](https://github.com/andylitvinov-design/ai-projects-brain/issues/259). Implements a bounded part of the [HBA Zero-Budget v2 specification](./TECH_SPEC_ZERO_BUDGET_V1_20261028.md).

## Why this exists

Local Chromium screenshot/DOM and simple UI checks without TinyFish wallet calls, browser-cloud credits, model APIs, unapproved payments, new hosting or duplicate schedulers. This **is not** a universal autonomous agent: free-text reasoning and code changes stay in ChatGPT/Codex; the browser executor performs reviewed deterministic operations only.

## Local setup (no new paid services)

Python 3.10–3.14 is required; Playwright's pinned Chromium may be installed locally using the commands below. A system Chromium executable is optional. On a machine where Python Playwright is not installed:

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
PYTHONPATH=. python examples/public-readonly-matrix.py  # opt-in: 16 PUBLIC website visits, no login
PYTHONPATH=. python examples/public-cta-checks.py  # opt-in: 3 public navigation-only CTA journeys
python -m hba compare /path/to/approved-reference.png /path/to/actual.png
python -m hba status <32-character-run-id>
python -m hba cancel <32-character-run-id>
python -m hba mcp  # local stdio MCP, no HTTP port
```

`hba doctor` launches a small, synthetic, network-denied Chromium page, reporting `READY` only if it runs. It does **not** establish Codex compatibility or public-site E2E. `hba run` prints a JSON summary with `state`, `steps`, hash of manifest, screenshot filenames/checksums, redacted counters, and explicit `not_tested`. Images are private local files in `~/.local/share/hba/runs/<run-id>/`, never auto-uploaded. On authentication-required or private pages, the runner **must not** be used; it makes a fresh guest context and refuses mutating operations. The fixture has only synthetic content.

Set `HBA_CHROMIUM_EXECUTABLE=/path/to/chromium` if Chromium is installed outside Playwright's default cache. Optional `HBA_RUNS_DIR=/path/to/private-local-runs` stores private artifacts; never set it to public site assets, a Git-tracked directory or a shared cloud folder.

## MCP for Codex/local client

Use a local `stdio` tool server command `python -m hba mcp` with working directory at this folder. **`hba_run` now returns a run ID rather than blocking until completion; call `hba_status` for terminal evidence.** Supported tools: `hba_doctor`, `hba_plan`, `hba_run`, `hba_status`, `hba_cancel`. This is a small JSON-RPC/MCP subset intended for **local testing**; host compatibility and security restrictions must be verified before deployment. No network listener, remote OAuth, public tunnel, arbitrary shell, JavaScript evaluator, raw CDP, exposed clipboard, arbitrary filesystem path, or account access is provided. This does not automatically make the tool callable from ChatGPT on iPhone.

## Safeguards and known limitations

- Only the exact hard-coded public `https://holistichouse.vercel.app` origin is permitted. The publicly readable test catalogue (`/en/client/tests`, `/ru/client/tests`, `/es/client/tests`) is an explicit exact-path exception, **without query strings or descendant routes**; all other protected client/app/admin/API/account routes and the image optimizer are denied. For the fixture, only bundled HTML is loaded and **all browser requests are denied**.
- Public route requests are GET/HEAD only; unexpected redirects and WebSockets are blocked. Service workers disabled. Cross-origin assets and even required framework POSTs may fail. A browser-level route is not a host firewall, and DNS/OS network containment is **not proven**; do not use it against hostile unknown websites.
- Public click means links only; buttons/forms/attachments are forbidden. All inputs and screenshot filenames are schema-validated before any browser launch.
- No auth, real client data, reports, payments, video renders, emails, Telegram messages, registrations, merges or production writes. Paid providers are not registered at all; max additional spend always 0.
- No trace/HAR/response bodies are saved; console/errors are stored as counts, not content. Fixture form input is limited to explicitly approved synthetic strings (Business/Sample/Test/Example), so arbitrary secrets/medical text are rejected before Chromium launches. Screenshot storage is local, restricted and bounded. Public website screenshot content must still be inspected before sharing.
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

The separate 16-case PUBLIC matrix visits EN/RU/ES homes at 320, 375, 390, 430 and 1440 pixels and the unauthenticated EN tests catalogue at 390. It performs **only** allowed GET/HEAD navigation, a main-role assertion and an overflow check; no auth, write, forms, images uploaded, billable browser service or new deployment. It prints per-route sanitized JSON and **fails if any flow is incomplete, console-broken or restricted**. The GitHub Actions step uses `continue-on-error: true` to keep *core HBA tests* independent of *website quality*: inspect that step's logs and verdicts explicitly; an overall workflow SUCCESS does **not** establish full live-site PASS. Images, visual baseline, conversions and private data remain NOT_TESTED. Public requests do count toward the website's existing hosting traffic usage; do not use large repeat loops.

## Cost and authority

This project makes **zero paid TinyFish calls and zero new paid API calls**. Local CPU/electricity/existing subscriptions are not necessarily zero-cost. Existing Brain project instructions govern PR, deployment, data and spending authorizations; the browser tool does not grant extra rights.

## Planned, not implemented

Owner Mac installation, verified Codex-host MCP invocation, Next.js production SHA confirmation, secure test account/RLS E2E, remote/mobile MCP, provider delivery proofs, resilient multi-run queue, local reasoning model, and user-facing dashboard require independent validated work. **Offline pixel-based compare is implemented**, but it is not a semantic layout acceptance gate. No unapproved always-on automation or poller.

## macOS one-time installer (not executed on the owner's Mac)

A readable [INSTALL_MAC.command](./INSTALL_MAC.command) reuses matching pinned packages, probes headless Chromium, installs its Playwright browser only when needed, runs an offline fixture, and **asks before** registering the local MCP via the installed Codex CLI. If that MCP name already points elsewhere, it stops instead of overwriting it. Existing entries must match the full Codex stdio command, arguments and PYTHONPATH. It does not disable macOS Gatekeeper, expose a browser port, request tokens, or enable remote access. Review the script before running; macOS can warn about unsigned downloaded scripts. This installer is prepared but **has not been tested on the owner's Mac** (last remote device check: Offline). Running bash syntax checks in CI does not prove installation on macOS.

The Codex MCP registration uses the verified current syntax `codex mcp add ... --env PYTHONPATH=<local-folder> -- <venv-python> -m hba mcp`; storing PYTHONPATH is necessary because Codex launches the Python process from an arbitrary directory. Never attach the user's personal browser profile or production cookies.

## High-fidelity visual QA (local PNG comparison)

The `compare` CLI command compares **two explicitly selected local PNG files** of identical dimensions. It records pixel-change ratio, average RGB difference, SHA-256 checksums, overlay/difference/side-by-side previews in a private local artifact directory. It never sends screenshots to a model, cloud, GitHub or analytics. Size/format checks prevent oversized/invalid uploads. The comparison score is a diagnostic only; reference review and click/E2E verification still require their own gates. `compare` is deliberately **not** a remote MCP tool, to avoid exposing arbitrary local files.

## Recovery, diagnosis and safe removal

Run `python -m hba doctor` first. If it reports `BLOCKED_DEVICE`, inspect the local Python/Playwright installation and (if needed) run `python -m playwright install chromium`. Re-running `INSTALL_MAC.command` preserves a working venv and stops on a conflicting Codex registration rather than overwriting another server.

To disconnect **only this** MCP server, use `codex mcp get holistic-browser-agent --json` to confirm it points to the HBA venv, then `codex mcp remove holistic-browser-agent`. The `.venv` and `~/.local/share/hba/runs` can be removed manually after reviewing for retained evidence; the installer will not delete data. Do not alter Gatekeeper, Safari/Chrome profiles, unrelated MCP entries, global Python or Vercel settings.

The local stdio MCP supervises **one independent, non-shell Chromium worker subprocess** and returns a QUEUED `run_id` immediately. `hba_status` and `hba_cancel` are callable through the **same** stdio client while that process runs. A second overlapping `hba_run` returns `RUN_BUSY` without creating a new job. Cancellation writes a private flag and the supervisor terminates the *owned* worker process group (SIGTERM then SIGKILL if necessary); a deadline also kills hung work. A child crash without a terminal status becomes FAILED, never SUCCESS. Replaying a reserved run ID is denied by a one-shot claim. The supervised worker also detects loss of the controlling MCP stdin pipe and stops its own process group when supported. Stale active status records are displayed as `UNCONFIRMED_INTERRUPTED` rather than asserting that a browser is still alive; this does not prove power-loss cleanup. The owner-Mac/Codex integration and OS-level network sandbox are **not** proven by subprocess tests. CLI `cancel` outside this MCP process still requests cooperative cancellation only.

Public QA may be incomplete because strict network policies intentionally block some image optimizers, cross-origin assets and POST-backed Next.js behavior. Label those checks FAILED/NOT_TESTED; never call screenshots full-fidelity or count a UI click as a booked/paid conversion.


## Responsive public geometry without private-data extraction

The fixed, reviewed `measure_layout` action returns only numeric viewport/main geometry, overflow, and counts of images, links and buttons. The 16 guest-only public browser scenarios now capture private local screenshots and log only SHA-256 hashes (not the images). An image blocked by the strict policy is counted as *broken_or_blocked*, and cannot be attributed to a site bug without independent checks. `PASS_PUBLIC_DOM_POLICY_LIMITED` means the allowed guest DOM/overflow assertions passed, but overall page fidelity is still NOT_VERIFIED. No authenticated screenshot or automatic upload to GitHub is permitted.

On macOS, the installer probes a compatible already-installed Chrome/Chromium in an ephemeral context before downloading another Chromium. The script has executable Git mode and keeps Gatekeeper enabled. A clean `bash -n` CI pass is not a substitute for executing it on the actual owner Mac.

The independent public CTA smoke checks known free-test, OPORA and free-written-review link destinations. It clicks only anchors and validates paths, never forms. A click is **not** a lead, booking, confirmation or payment; restricted assets make full site fidelity unverified.
