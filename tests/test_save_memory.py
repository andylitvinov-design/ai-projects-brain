#!/usr/bin/env python3
"""Smoke tests for tools/save_memory.py.

Run from ai-projects-brain root:

  python tests/test_save_memory.py

These tests intentionally use only stdlib so they work in Codex and Claude Code.
"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "tools" / "save_memory.py"


def run_save(project: Path, message: str) -> dict:
    result = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--message",
            message,
            "--project-root",
            str(project),
            "--date",
            "2026-06-27",
            "--json",
        ],
        cwd=str(ROOT),
        text=True,
        capture_output=True,
        check=True,
    )
    return json.loads(result.stdout)


def test_creates_memory_tree() -> None:
    with tempfile.TemporaryDirectory() as td:
        project = Path(td)
        data = run_save(
            project,
            "/save\nправило: в /delivery не спрашивать лишние подтверждения\nобласть: delivery workflow",
        )
        assert data["action"] == "created"
        assert (project / "agent-memory" / "active.md").exists()
        assert (project / "agent-memory" / "topics" / "delivery.md").exists()


def test_weak_one_time_signal_not_saved() -> None:
    with tempfile.TemporaryDirectory() as td:
        project = Path(td)
        data = run_save(project, "сделай эту кнопку чуть выше")
        assert data["action"] == "not_saved"
        assert not (project / "agent-memory").exists()


def test_upsert_updates_similar_memory() -> None:
    with tempfile.TemporaryDirectory() as td:
        project = Path(td)
        first = run_save(
            project,
            "/save\nошибка: агент опять сделал слишком длинный текст\nправильно: клиентские тексты должны быть короче\nобласть: UX / copy",
        )
        second = run_save(
            project,
            "/save\nошибка: агент снова сделал слишком длинный текст\nправильно: клиентские тексты должны быть короче\nобласть: UX / copy",
        )
        assert first["action"] == "created"
        assert second["action"] == "updated"
        active = (project / "agent-memory" / "active.md").read_text(encoding="utf-8")
        assert active.count("## 2026-06-27 —") == 1
        assert "Repeated signal:" in active


def main() -> int:
    tests = [
        test_creates_memory_tree,
        test_weak_one_time_signal_not_saved,
        test_upsert_updates_similar_memory,
    ]
    for test in tests:
        test()
        print(f"PASS {test.__name__}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
