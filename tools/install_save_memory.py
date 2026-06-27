#!/usr/bin/env python3
"""
Install /save adapters into a project repository.

Run from ai-projects-brain root:

  python tools/install_save_memory.py --project-root /path/to/project

This creates:
- /agent-memory skeleton
- .claude/commands/save.md
- .claude/skills/save/SKILL.md
- AGENTS.md snippet marker or AGENTS.save-memory.md companion

The runtime implementation remains tools/save_memory.py in ai-projects-brain.
Project repos may copy that script locally or call it by absolute/relative path.
"""

from __future__ import annotations

import argparse
from pathlib import Path


CODEX_SNIPPET = """

<!-- agent-memory-save:start -->
## /save durable agent memory

When the user writes `/save`, `память:`, `ошибка:`, `правило:`, `решение:`, or asks to save a durable lesson, use the shared `/save` memory protocol.

Canonical spec:
- `ai-projects-brain/agent-skills/save.md`

Runtime helper:
- `ai-projects-brain/tools/save_memory.py`

Project-local memory lives in:
- `/agent-memory/active.md`
- `/agent-memory/index.md`
- `/agent-memory/mistakes.md`
- `/agent-memory/topics/*.md`
- `/agent-memory/component-notes/*.md`

Rules:
- `/save` is upsert, not append.
- Save only reusable, scoped, checkable lessons.
- Do not save one-time visual tweaks by default.
- Active memory must have Apply when, Check, and Failure if ignored.
- Use `/memory-review` when active memory grows, duplicates appear, or rules conflict.
<!-- agent-memory-save:end -->
"""

CLAUDE_COMMAND = """# /save — durable agent memory

Use this command when the user wants to save an important lesson, correction, rule, decision, or stable preference from the conversation.

Canonical spec:
`ai-projects-brain/agent-skills/save.md`

Runtime helper:
`ai-projects-brain/tools/save_memory.py`

## Procedure

1. Treat `/save` as an upsert memory operation, not append.
2. Extract the reusable lesson only.
3. Classify it as mistake, rule, product_decision, ux_decision, user_preference, workflow_lesson, or component_note.
4. Assign memory type: procedural, semantic, or episodic.
5. Save/update project-local `/agent-memory` using the helper script when available.
6. If a similar rule exists, update it instead of duplicating it.
7. If a new rule contradicts an active rule, replace or narrow the old rule.
8. Report what was created, updated, replaced, or not saved.

## Preferred local command

```bash
python /path/to/ai-projects-brain/tools/save_memory.py --project-root . --message "$USER_MESSAGE"
```

If the helper path is not available, manually follow `agent-skills/save.md` and update `/agent-memory` files.
"""

CLAUDE_SKILL = """# Save Durable Agent Memory

Use when the user invokes `/save`, says `занеси в память`, `запомни`, `память:`, `ошибка:`, `правило:`, or `решение:`.

Read the canonical spec first:
- `ai-projects-brain/agent-skills/save.md`

This project stores concrete memory in local `/agent-memory` files.

Core rules:
- `/save` is upsert, not append.
- Save only durable reusable lessons.
- Do not save one-time tweaks by default.
- Active memory must be reusable, scoped, checkable, deduplicated, and short enough to load.
- Prefer updating topic documents over creating many small duplicate entries.
- Run `/memory-review` when memory becomes noisy, duplicated, contradictory, or `active.md` exceeds 50 rules.
"""

MEMORY_INDEX = """# Agent Memory Index

## Always read when relevant
- active.md

## Topics
- delivery -> topics/delivery.md
- audit -> topics/audit.md
- mobile UX -> topics/mobile.md
- UX -> topics/ux.md
- copy -> topics/copy.md
- auth/live verification -> topics/auth.md

## Commands
- `/save` uses the shared brain protocol: `ai-projects-brain/agent-skills/save.md`.
- `/memory [topic]` shows active memory for a topic.
- `/memory-review` merges duplicates, archives noise, and keeps active memory compact.
"""

ACTIVE = """# Active Agent Memory

Active rules loaded by default when relevant.

Keep this file under 30–50 rules.

Every active item must include:
- Apply when
- Check
- Failure if ignored

"""

MISTAKES = """# Agent Mistakes Memory

Durable mistakes with corrected behavior.

Do not store raw complaints. Each mistake must produce a future-facing lesson.

"""

ARCHIVE = """# Archived Agent Memory

Old, replaced, low-priority, or rarely used memory.

Do not load this file by default.
"""


def write_if_missing(path: Path, content: str) -> str:
    if path.exists():
        return "exists"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return "created"


def ensure_memory(root: Path) -> list[str]:
    actions = []
    actions.append(f"{write_if_missing(root / 'agent-memory' / 'active.md', ACTIVE)} agent-memory/active.md")
    actions.append(f"{write_if_missing(root / 'agent-memory' / 'index.md', MEMORY_INDEX)} agent-memory/index.md")
    actions.append(f"{write_if_missing(root / 'agent-memory' / 'mistakes.md', MISTAKES)} agent-memory/mistakes.md")
    actions.append(f"{write_if_missing(root / 'agent-memory' / 'archive.md', ARCHIVE)} agent-memory/archive.md")
    for topic in ["delivery", "audit", "mobile", "ux", "copy", "auth", "general"]:
        actions.append(
            f"{write_if_missing(root / 'agent-memory' / 'topics' / f'{topic}.md', '# ' + topic.title() + ' Agent Memory\n\n')} agent-memory/topics/{topic}.md"
        )
    (root / "agent-memory" / "component-notes").mkdir(parents=True, exist_ok=True)
    return actions


def install_codex(root: Path) -> str:
    agents = root / "AGENTS.md"
    if agents.exists():
        text = agents.read_text(encoding="utf-8")
        if "<!-- agent-memory-save:start -->" not in text:
            agents.write_text(text.rstrip() + CODEX_SNIPPET + "\n", encoding="utf-8")
            return "updated AGENTS.md"
        return "exists AGENTS.md snippet"
    companion = root / "AGENTS.save-memory.md"
    write_if_missing(companion, "# AGENTS save-memory companion\n" + CODEX_SNIPPET)
    return "created AGENTS.save-memory.md"


def install_claude(root: Path) -> list[str]:
    actions = []
    actions.append(f"{write_if_missing(root / '.claude' / 'commands' / 'save.md', CLAUDE_COMMAND)} .claude/commands/save.md")
    actions.append(f"{write_if_missing(root / '.claude' / 'skills' / 'save' / 'SKILL.md', CLAUDE_SKILL)} .claude/skills/save/SKILL.md")
    return actions


def main() -> int:
    parser = argparse.ArgumentParser(description="Install /save memory adapters into a project repo")
    parser.add_argument("--project-root", default=".", help="Target project root")
    parser.add_argument("--no-codex", action="store_true", help="Skip AGENTS.md / Codex adapter")
    parser.add_argument("--no-claude", action="store_true", help="Skip Claude Code adapters")
    args = parser.parse_args()

    root = Path(args.project_root).resolve()
    root.mkdir(parents=True, exist_ok=True)

    actions = ensure_memory(root)
    if not args.no_codex:
        actions.append(install_codex(root))
    if not args.no_claude:
        actions.extend(install_claude(root))

    print("Installed /save memory adapter:")
    for action in actions:
        print(f"- {action}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
