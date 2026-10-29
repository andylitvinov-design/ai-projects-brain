#!/bin/bash
# Idempotent, local-only installation. Never changes global Python, macOS protection or billing.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd -P)"
cd "$ROOT"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo 'This installer is for macOS only. On Linux, follow README.md.' >&2
  exit 2
fi
if [[ "$(id -u)" == "0" ]]; then
  echo 'Do not run HBA or its installer as root.' >&2
  exit 2
fi

PYTHON=""
for candidate in python3.13 python3.14 python3.12 python3.11 python3; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c 'import sys; assert (3, 10) <= sys.version_info[:2] < (3, 15)' >/dev/null 2>&1; then
    PYTHON="$(command -v "$candidate")"
    break
  fi
done
if [[ -z "$PYTHON" ]]; then
  echo 'A supported Python 3.10–3.14 is required; none was found. No changes made.' >&2
  exit 2
fi
echo "Python selected: $("$PYTHON" -c 'import sys; print(sys.version.split()[0])')"

if [[ ! -d .venv ]]; then
  "$PYTHON" -m venv .venv
fi
PY="$ROOT/.venv/bin/python"
if [[ ! -x "$PY" ]]; then
  echo 'Existing .venv is incomplete. Rename it manually after reviewing contents; no automatic deletion.' >&2
  exit 2
fi
# Reuse matching local packages. A partial/stale venv must not be reported ready.
if ! "$PY" - <<'PY'
from importlib.metadata import version
from pathlib import Path
for line in Path("requirements.txt").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    name, pinned = line.split("==", 1)
    assert version(name.strip()) == pinned.strip()
PY
then
  "$PY" -m pip install --disable-pip-version-check -r requirements.txt
fi

# Probe an installed local browser with a fresh isolated context, never the
# user's saved profile, cookies or Chrome debugging port. Fall back to Playwright.
if [[ -z "${HBA_CHROMIUM_EXECUTABLE:-}" ]]; then
  for candidate in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "/Applications/Chromium.app/Contents/MacOS/Chromium" \
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"; do
    if [[ -x "$candidate" ]]; then
      export HBA_CHROMIUM_EXECUTABLE="$candidate"
      if "$PY" -m hba doctor >/dev/null 2>&1; then
        echo "Compatible existing Chromium-based browser detected."
        break
      fi
      unset HBA_CHROMIUM_EXECUTABLE
    fi
  done
fi
if ! "$PY" -m hba doctor >/dev/null 2>&1; then
  unset HBA_CHROMIUM_EXECUTABLE
  "$PY" -m playwright install chromium
fi
"$PY" -m hba doctor
"$PY" -m hba plan examples/offline-fixture.json
"$PY" -m hba run examples/offline-fixture.json

echo
echo 'Local synthetic Chromium check passed. No live website, client account or paid API was accessed.'
# Validate the complete native Codex JSON configuration rather than grep paths.
mcp_matches() {
  codex mcp get holistic-browser-agent --json | "$PY" -c '
import json, sys
try:
    x = json.load(sys.stdin).get("transport", {})
    ok = (x.get("type") == "stdio"
          and x.get("command") == sys.argv[1]
          and x.get("args") == ["-m", "hba", "mcp"]
          and (x.get("env") or {}).get("PYTHONPATH") == sys.argv[2])
except (TypeError, ValueError, AttributeError):
    ok = False
sys.exit(0 if ok else 1)
' "$PY" "$ROOT"
}

if command -v codex >/dev/null 2>&1; then
  if codex mcp get holistic-browser-agent --json >/dev/null 2>&1; then
    if ! mcp_matches; then
      echo 'Another Codex MCP already uses holistic-browser-agent; not overwritten.' >&2
      exit 3
    fi
    echo 'Existing HBA Codex stdio registration verified.'
  else
    read -r -p 'Register local HBA stdio MCP in Codex? [y/N] ' confirm
    if [[ "$confirm" == 'y' || "$confirm" == 'Y' ]]; then
      codex mcp add holistic-browser-agent --env "PYTHONPATH=$ROOT" -- "$PY" -m hba mcp
    else
      echo 'MCP registration skipped; browser CLI remains usable.'
      exit 0
    fi
  fi
  if ! mcp_matches; then
    echo 'Codex registration does not match HBA command/args/env.' >&2
    exit 3
  fi
  echo 'Codex configuration validated; actual host tool-call proof remains required.'
else
  echo 'Codex CLI not present. Browser CLI is verified; native MCP NOT_TESTED.'
fi
