"""CLI entrypoint for the local no-billing browser executor."""
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import shutil
import sys
from pathlib import Path
from typing import Any

from .policy import PolicyError
from .runner import cancel_run, default_runs_dir, make_plan, read_status, run_manifest


def doctor() -> dict[str, Any]:
    return {"app": "holistic-browser-agent", "version": "0.1.0",
            "python": sys.version.split()[0], "playwright_installed": importlib.util.find_spec("playwright") is not None,
            "chromium_system": shutil.which("chromium") or shutil.which("google-chrome"),
            "remote_mcp_enabled": False, "tinyfish_paid_enabled": False,
            "paid_provider_calls_allowed": 0, "allowed_external_spend_usd": 0,
            "note": "Doctor checks local installation only; it does not prove a live browser journey."}


def load_json(path: str) -> Any:
    file = Path(path)
    if not file.is_file() or file.stat().st_size > 1024 * 1024:
        raise PolicyError("INPUT_INVALID")
    try:
        return json.loads(file.read_text(encoding="utf-8"))
    except (ValueError, UnicodeError) as exc:
        raise PolicyError("INPUT_INVALID") from exc


def emit(data: dict[str, Any]) -> None:
    print(json.dumps(data, ensure_ascii=False, sort_keys=True))


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Holistic Browser Agent ($0 extra spend, local Playwright)")
    sub = p.add_subparsers(dest="command", required=True)
    sub.add_parser("doctor", help="Inspect local runtime without sending any network request")
    plan = sub.add_parser("plan", help="Validate and risk-check a manifest, no browser launch")
    plan.add_argument("manifest")
    run = sub.add_parser("run", help="Run a deterministic, policy-checked browser manifest")
    run.add_argument("manifest")
    run.add_argument("--chromium", help="Optional absolute path of locally installed Chromium")
    for cmd in ("status", "cancel"):
        tool = sub.add_parser(cmd)
        tool.add_argument("run_id")
    compare = sub.add_parser("compare", help="Compare two LOCAL PNG screenshots; no external calls")
    compare.add_argument("reference")
    compare.add_argument("actual")
    compare.add_argument("--tolerance", type=int, default=12)
    sub.add_parser("mcp", help="Run local stdio MCP bridge (never exposes a web listener)")
    args = p.parse_args(argv)
    try:
        if args.command == "doctor":
            result = doctor()
        elif args.command == "plan":
            result = make_plan(load_json(args.manifest))
        elif args.command == "run":
            result = run_manifest(load_json(args.manifest), chromium_executable=args.chromium or os.environ.get("HBA_CHROMIUM_EXECUTABLE"))
        elif args.command == "status":
            result = read_status(args.run_id)
        elif args.command == "cancel":
            result = cancel_run(args.run_id)
        elif args.command == "compare":
            from .visual import compare_images
            result = compare_images(args.reference, args.actual, tolerance=args.tolerance)
        else:
            from .mcp import serve_stdio
            serve_stdio()
            return 0
    except PolicyError as e:
        emit({"state": "BLOCKED", "error_code": e.code, "paid_provider_calls": 0})
        return 2
    emit(result)
    return 0 if result.get("state") not in {"FAILED", "BLOCKED_DEVICE", "CANCELLED"} else 1


if __name__ == "__main__":
    raise SystemExit(main())
