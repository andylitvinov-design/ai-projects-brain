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

# Browser is installed only when the actual headless synthetic probe fails.
if ! "$PY" -m hba doctor >/dev/null 2>&1; then
  "$PY" -m playwright install chromium
fi
"$PY" -m hba doctor
"$PY" -m hba plan examples/offline-fixture.json
"$PY" -m hba run examples/offline-fixture.json

echo
echo 'Local synthetic Chromium check passed. No live website, client account or paid API was accessed.'
if command -v codex >/dev/null 2>&1; then
  if codex mcp get holistic-browser-agent --json >/dev/null 2>&1; then
    if codex mcp get holistic-browser-agent --json | grep -Fq -- "$PY"; then
      echo 'Existing Codex MCP entry points to this venv; preserved without changes.'
    else
      echo 'A DIFFERENT Codex MCP entry already uses holistic-browser-agent.' >&2
      echo 'It was not overwritten. Review: codex mcp get holistic-browser-agent --json' >&2
      exit 3
    fi
  else
    read -r -p 'Register local HBA stdio MCP in Codex? [y/N] ' confirm
    if [[ "$confirm" == 'y' || "$confirm" == 'Y' ]]; then
      codex mcp add holistic-browser-agent --env "PYTHONPATH=$ROOT" -- "$PY" -m hba mcp
    else
      echo 'Codex MCP registration skipped; HBA CLI remains usable.'
      exit 0
    fi
  fi
  codex mcp get holistic-browser-agent --json
  echo 'Codex registration checked. Actual Codex tool discovery/invocation still requires client verification.'
else
  echo 'Codex CLI not present. Browser CLI is verified; native MCP remains NOT_TESTED.'
fi
