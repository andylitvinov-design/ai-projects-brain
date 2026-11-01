"""Private, fixed-argv HBA Chromium subprocess. Not an MCP or shell tool."""
from __future__ import annotations

import json
import os
import signal
import sys
import threading

from .policy import PolicyError, validate_manifest, safe_run_id
from .runner import cancel_run, default_runs_dir, run_manifest




def _stop_if_controller_disappears(run_id: str) -> None:
    """The controller holds a private stdin pipe open until this process exits.

    An unexpected EOF (for example, Codex is SIGKILLed) must not leave its
    browser process tree operating in the background.
    """
    try:
        sys.stdin.buffer.read()
    except (OSError, ValueError):
        pass
    try:
        cancel_run(run_id)
    except (PolicyError, OSError):
        pass
    # start_new_session=True guarantees this child is its own process-group
    # leader; never send a group signal if it wasn't started that way.
    if os.name == "posix" and os.getpgrp() == os.getpid():
        os.killpg(os.getpgrp(), signal.SIGTERM)
    else:
        os._exit(5)

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
    if os.environ.get("HBA_SUPERVISED_WORKER") == "1":
        threading.Thread(
            target=_stop_if_controller_disappears, args=(run_id,),
            daemon=True, name="hba-parent-pipe-guard",
        ).start()
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
