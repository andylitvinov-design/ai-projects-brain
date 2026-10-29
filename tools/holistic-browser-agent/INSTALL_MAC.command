#!/bin/bash
# Local-only setup for Holistic Browser Agent (no paid services, no token entry).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd -P)"
cd "$ROOT"

if ! command -v python3 >/dev/null 2>&1; then
  echo 'Python 3 is required; no downloads or account changes were made.' >&2
  exit 2
fi

if [[ ! -d .venv ]]; then
  python3 -m venv .venv
fi
PY="$ROOT/.venv/bin/python"
if ! "$PY" -c 'import playwright' >/dev/null 2>&1; then
  "$PY" -m pip install --disable-pip-version-check -r requirements.txt
fi
"$PY" -m playwright install chromium
"$PY" -m hba doctor
"$PY" -m hba run examples/offline-fixture.json

echo
echo 'Local fixture complete. Only offline/synthetic behavior has been tested.'
echo 'No paid TinyFish, cloud browser, model, or production write was invoked.'

if command -v codex >/dev/null 2>&1; then
  if codex mcp get holistic-browser-agent >/dev/null 2>&1; then
    echo 'Codex MCP holistic-browser-agent already exists; leaving it unchanged.'
  else
    read -r -p 'Register this local-only MCP in Codex? [y/N] ' confirm
    if [[ "$confirm" == 'y' || "$confirm" == 'Y' ]]; then
      codex mcp add holistic-browser-agent --env "PYTHONPATH=$ROOT" -- "$PY" -m hba mcp
      codex mcp get holistic-browser-agent
    else
      echo 'MCP registration skipped.'
    fi
  fi
else
  echo 'Codex CLI not installed/found. Browser CLI is ready; MCP registration skipped.'
fi
