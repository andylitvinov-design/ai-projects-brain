"""Private, fixed-argv HBA Chromium subprocess. Not an MCP or shell tool."""
from __future__ import annotations

import json
import os
from pathlib import Path
import sys

from .policy import PolicyError, validate_manifest, safe_run_id
from .runner import default_runs_dir, read_status, run_manifest


def main(argv: list[str] | None = None) -> int:
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1 or not safe_run_id(argv[0]):
        return 2
    run_id = argv[0]
    directory = default_runs_dir() / run_id
    manifest_file = directory / "manifest.json"
    if directory.is_symlink() or manifest_file.is_symlink() or not manifest_file.is_file():
        return 2
    if manifest_file.stat().st_size > 1024 * 1024:
        return 2
    try:
        manifest = validate_manifest(json.loads(manifest_file.read_text(encoding="utf-8")))
        # run_manifest also verifies the queued fingerprint and a one-shot claim.
        result = run_manifest(
            manifest, run_id=run_id,
            chromium_executable=os.environ.get("HBA_CHROMIUM_EXECUTABLE"),
        )
    except (PolicyError, ValueError, OSError, TypeError):
        return 2
    return 0 if result.get("state") in {"SYNTHETIC_TEST_PASS", "VERIFIED_READONLY"} else 1


if __name__ == "__main__":
    raise SystemExit(main())
