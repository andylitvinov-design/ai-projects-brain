#!/usr/bin/env python3
"""
/save durable agent memory helper.

This script is intentionally dependency-free so it can run in Codex, Claude Code,
and ordinary local shells across project repositories.

Usage:
  python path/to/save_memory.py --message "/save\nошибка: ...\nправильно: ..." --project-root .
  python path/to/save_memory.py --message-file /tmp/save.txt --project-root /path/to/repo
  python path/to/save_memory.py --message "..." --project-root . --dry-run

It creates/updates /agent-memory files in the target project.
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


ACTIVE_LIMIT = 50

TOPIC_BY_SCOPE = {
    "delivery": "delivery",
    "audit": "audit",
    "mobile": "mobile",
    "navigation": "mobile",
    "ux": "ux",
    "copy": "copy",
    "text": "copy",
    "auth": "auth",
    "verification": "auth",
    "orders": "orders",
    "order": "orders",
    "grimoire": "grimoire",
    "profile": "profile-lite",
    "profile-lite": "profile-lite",
}

EXPLICIT_TRIGGERS = [
    "/save",
    "save this",
    "занеси в память",
    "запомни",
    "память:",
    "ошибка:",
    "правило:",
    "решение:",
]

STRONG_SIGNALS = [
    "опять",
    "снова",
    "я уже просил",
    "мы это уже исправляли",
    "как раньше",
    "верни как было",
    "не надо так",
    "всегда",
    "никогда",
    "во всём проекте",
    "во всем проекте",
    "для всех страниц",
]

ONE_TIME_SIGNALS = [
    "чуть выше",
    "чуть ниже",
    "чуть левее",
    "чуть правее",
    "эту кнопку",
    "на этой картинке",
    "поменяй это слово",
    "сделай мягче",
    "сделай дороже",
]


@dataclass
class SaveDecision:
    action: str
    title: str
    entry: str
    files: list[Path]
    score: int
    kind: str
    memory_type: str
    scope: str
    topic: str
    reason: str


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def tokenize(text: str) -> set[str]:
    text = normalize(text)
    words = re.findall(r"[a-zа-яё0-9_-]{3,}", text, flags=re.I)
    stop = {
        "что",
        "это",
        "как",
        "для",
        "или",
        "если",
        "the",
        "and",
        "when",
        "should",
        "with",
        "this",
        "that",
        "agent",
        "memory",
        "save",
        "правильно",
        "область",
    }
    return {w for w in words if w not in stop}


def score_message(text: str) -> int:
    t = normalize(text)
    score = 0
    if any(s in t for s in EXPLICIT_TRIGGERS):
        score += 3
    if any(s in t for s in STRONG_SIGNALS):
        score += 2
    if any(s in t for s in ["delivery", "/delivery", "audit", "/audit", "deploy", "auth", "live", "провер"]):
        score += 2
    if any(s in t for s in ["решение:", "должно быть", "нельзя", "не должно", "во всем проекте", "во всём проекте"]):
        score += 2
    if any(s in t for s in ["ux", "стиль", "текст", "копи", "client", "клиент"]):
        score += 1
    if any(s in t for s in ["опять", "снова", "повтор"]):
        score += 1
    if any(s in t for s in ONE_TIME_SIGNALS):
        score -= 2
    if any(s in t for s in ["временно", "эксперимент"]):
        score -= 2
    return score


def classify_kind(text: str) -> str:
    t = normalize(text)
    if "ошибка:" in t:
        return "mistake"
    if "правило:" in t:
        return "rule"
    if "решение:" in t:
        return "product_decision"
    if any(x in t for x in ["delivery", "/delivery", "audit", "/audit", "deploy", "live", "auth"]):
        return "workflow_lesson"
    if any(x in t for x in ["стиль", "корот", "жаргон", "мягч", "клиент"]):
        return "user_preference"
    return "rule"


def memory_type_for(kind: str) -> str:
    if kind == "mistake":
        return "episodic, procedural"
    if kind in {"product_decision", "ux_decision", "user_preference"}:
        return "semantic"
    return "procedural"


def extract_field(text: str, names: Iterable[str]) -> str | None:
    lines = text.splitlines()
    for line in lines:
        raw = line.strip()
        for name in names:
            if raw.lower().startswith(name.lower() + ":"):
                return raw.split(":", 1)[1].strip()
    return None


def infer_scope(text: str) -> str:
    explicit = extract_field(text, ["область", "scope"])
    if explicit:
        return explicit
    t = normalize(text)
    scopes = []
    for key in TOPIC_BY_SCOPE:
        if key in t:
            scopes.append(key)
    return " / ".join(dict.fromkeys(scopes)) if scopes else "global"


def infer_topic(scope: str, text: str) -> str:
    combined = normalize(scope + " " + text)
    for key, topic in TOPIC_BY_SCOPE.items():
        if key in combined:
            return topic
    return "general"


def clean_signal(text: str) -> str:
    cleaned = text.strip()
    cleaned = re.sub(r"^/save\s*", "", cleaned, flags=re.I)
    return cleaned.strip()


def make_title(text: str, kind: str, topic: str) -> str:
    lesson = extract_field(text, ["правильно", "lesson", "память", "правило", "решение", "ошибка"]) or clean_signal(text)
    lesson = re.sub(r"\s+", " ", lesson)
    words = re.findall(r"[A-Za-zА-Яа-яЁё0-9_-]+", lesson)[:9]
    if not words:
        return f"{topic.title()} memory"
    title = " ".join(words)
    return title[:80].strip().capitalize()


def make_lesson(text: str, kind: str) -> str:
    direct = extract_field(text, ["правильно", "lesson", "память", "правило", "решение"])
    if direct:
        return direct
    if kind == "mistake":
        err = extract_field(text, ["ошибка"])
        if err:
            return f"Future agents must avoid repeating this mistake: {err}"
    return clean_signal(text)


def make_check(lesson: str, scope: str) -> str:
    if "delivery" in normalize(scope + " " + lesson):
        return "Final report shows implementation, checks, PR/deploy status, and no unnecessary confirmation prompts."
    if "mobile" in normalize(scope + " " + lesson):
        return "Mobile UI is inspected and the relevant behavior is visible without extra hidden steps."
    if "copy" in normalize(scope + " " + lesson) or "текст" in normalize(lesson):
        return "Client-facing copy is compact, clear, and readable on mobile."
    return "The final report explicitly states how this memory item was applied."


def make_failure(lesson: str, scope: str) -> str:
    if "mobile" in normalize(scope + " " + lesson):
        return "Agent may repeat a rejected mobile UX pattern."
    if "delivery" in normalize(scope + " " + lesson):
        return "Agent may stop early, ask unnecessary confirmations, or fail to provide proof."
    if "copy" in normalize(scope + " " + lesson) or "текст" in normalize(lesson):
        return "Client-facing pages may become too dense or unclear."
    return "Agent may repeat a known mistake or ignore a durable user/product rule."


def priority_for(score: int) -> str:
    if score >= 5:
        return "high"
    if score >= 3:
        return "medium"
    return "low"


def ensure_memory_tree(root: Path) -> None:
    dirs = [
        root / "agent-memory",
        root / "agent-memory" / "topics",
        root / "agent-memory" / "component-notes",
    ]
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)

    files = {
        "active.md": "# Active Agent Memory\n\nActive rules loaded by default when relevant.\n\n",
        "index.md": "# Agent Memory Index\n\n## Always read\n- active.md\n\n## Topics\n- delivery -> topics/delivery.md\n- audit -> topics/audit.md\n- mobile -> topics/mobile.md\n- UX -> topics/ux.md\n- copy -> topics/copy.md\n- auth/live verification -> topics/auth.md\n\n",
        "archive.md": "# Archived Agent Memory\n\nDo not load by default.\n\n",
        "mistakes.md": "# Agent Mistakes Memory\n\nDurable mistakes with corrected future behavior.\n\n",
    }
    for name, content in files.items():
        p = root / "agent-memory" / name
        if not p.exists():
            p.write_text(content, encoding="utf-8")

    for topic in ["delivery", "audit", "mobile", "ux", "copy", "auth", "general"]:
        p = root / "agent-memory" / "topics" / f"{topic}.md"
        if not p.exists():
            p.write_text(f"# {topic.title()} Agent Memory\n\n", encoding="utf-8")


def iter_memory_files(root: Path) -> list[Path]:
    base = root / "agent-memory"
    if not base.exists():
        return []
    return [p for p in base.rglob("*.md") if p.is_file()]


def similarity(a: str, b: str) -> float:
    ta, tb = tokenize(a), tokenize(b)
    if not ta or not tb:
        return 0.0
    return len(ta & tb) / len(ta | tb)


def find_similar(root: Path, lesson: str, scope: str) -> tuple[Path | None, str | None, float]:
    best_path = None
    best_section = None
    best_score = 0.0
    query = scope + " " + lesson
    for path in iter_memory_files(root):
        text = path.read_text(encoding="utf-8", errors="ignore")
        sections = re.split(r"(?m)^## ", text)
        for sec in sections[1:]:
            section = "## " + sec
            if normalize(lesson) and normalize(lesson) in normalize(section):
                s = 1.0
            else:
                s = similarity(query, section)
            if s > best_score:
                best_score = s
                best_path = path
                best_section = section
    return best_path, best_section, best_score


def choose_files(root: Path, kind: str, topic: str, score: int) -> list[Path]:
    base = root / "agent-memory"
    files: list[Path] = []
    if kind == "mistake":
        files.append(base / "mistakes.md")
    if score >= 5 or kind in {"rule", "workflow_lesson"} and topic in {"delivery", "audit", "auth"}:
        files.append(base / "active.md")
    files.append(base / "topics" / f"{topic}.md")
    seen = set()
    out = []
    for f in files:
        if f not in seen:
            out.append(f)
            seen.add(f)
    return out


def build_entry(text: str, today: str) -> tuple[str, dict[str, str]]:
    kind = classify_kind(text)
    mem_type = memory_type_for(kind)
    scope = infer_scope(text)
    topic = infer_topic(scope, text)
    score = score_message(text)
    title = make_title(text, kind, topic)
    lesson = make_lesson(text, kind)
    check = make_check(lesson, scope)
    failure = make_failure(lesson, scope)
    priority = priority_for(score)
    status = "active" if score >= 3 else "candidate"
    user_signal = clean_signal(text).replace("\n", " / ")
    entry = f"""## {today} — {title}

Type: {kind}  
Memory type: {mem_type}  
Scope: {scope}  
Priority: {priority}  
Status: {status}  
Replaced by:  

User signal:
> {user_signal}

Evidence:
- User `/save` or strong correction signal on {today}.

Lesson:
{lesson}

Apply when:
- Future tasks match this scope: {scope}.
- An agent edits, audits, verifies, or explains related behavior.

Check:
- {check}

Failure if ignored:
- {failure}

Avoid:
- Repeating the rejected behavior.
- Creating duplicate or contradictory memory items.

Last applied:
- never

Related files/components:
- needs verification

"""
    meta = {
        "kind": kind,
        "memory_type": mem_type,
        "scope": scope,
        "topic": topic,
        "score": str(score),
        "title": title,
        "status": status,
        "lesson": lesson,
    }
    return entry, meta


def append_entry(path: Path, entry: str) -> None:
    old = path.read_text(encoding="utf-8") if path.exists() else ""
    if old and not old.endswith("\n"):
        old += "\n"
    path.write_text(old + "\n" + entry, encoding="utf-8")


def update_existing(path: Path, section: str, text: str, today: str) -> None:
    original = path.read_text(encoding="utf-8")
    signal = clean_signal(text).replace(chr(10), " / ")
    addition = f"\nRepeated signal:\n- {today}: {signal}\n"
    if "Repeated signal:" in section:
        new_section = section.rstrip() + f"\n- {today}: {signal}\n"
    else:
        new_section = section.rstrip() + addition + "\n"
    path.write_text(original.replace(section, new_section), encoding="utf-8")


def active_count(root: Path) -> int:
    active = root / "agent-memory" / "active.md"
    if not active.exists():
        return 0
    return len(re.findall(r"(?m)^## \d{4}-\d{2}-\d{2} — ", active.read_text(encoding="utf-8", errors="ignore")))


def decide_and_save(project_root: Path, text: str, today: str, dry_run: bool = False) -> SaveDecision:
    score = score_message(text)
    if score < 3 and not any(s in normalize(text) for s in EXPLICIT_TRIGGERS):
        kind = classify_kind(text)
        scope = infer_scope(text)
        return SaveDecision(
            action="not_saved",
            title="",
            entry="",
            files=[],
            score=score,
            kind=kind,
            memory_type=memory_type_for(kind),
            scope=scope,
            topic=infer_topic(scope, text),
            reason="Score below save threshold and no explicit /save trigger.",
        )

    if not dry_run:
        ensure_memory_tree(project_root)

    entry, meta = build_entry(text, today)
    topic = meta["topic"]
    kind = meta["kind"]
    files = choose_files(project_root, kind, topic, score)
    similar_path, similar_section, sim = (None, None, 0.0)
    if not dry_run and (project_root / "agent-memory").exists():
        similar_path, similar_section, sim = find_similar(project_root, meta["lesson"], meta["scope"])

    if similar_path and similar_section and sim >= 0.24:
        if not dry_run:
            update_existing(similar_path, similar_section, text, today)
        return SaveDecision(
            action="updated",
            title=meta["title"],
            entry=entry,
            files=[similar_path],
            score=score,
            kind=kind,
            memory_type=meta["memory_type"],
            scope=meta["scope"],
            topic=topic,
            reason=f"Updated similar memory item with similarity {sim:.2f}.",
        )

    if not dry_run:
        for f in files:
            f.parent.mkdir(parents=True, exist_ok=True)
            if not f.exists():
                f.write_text(f"# {f.stem.title()} Agent Memory\n\n", encoding="utf-8")
            append_entry(f, entry)

    return SaveDecision(
        action="created",
        title=meta["title"],
        entry=entry,
        files=files,
        score=score,
        kind=kind,
        memory_type=meta["memory_type"],
        scope=meta["scope"],
        topic=topic,
        reason="Created new memory item.",
    )


def format_report(decision: SaveDecision, root: Path) -> str:
    if decision.action == "not_saved":
        return (
            "Not saved as durable memory.\n\n"
            f"Reason: {decision.reason}\n"
            f"Score: {decision.score}\n"
            "This looks like a one-time task detail or weak signal.\n"
        )
    rel_files = [str(p.relative_to(root)) if str(p).startswith(str(root)) else str(p) for p in decision.files]
    review_note = ""
    if active_count(root) > ACTIVE_LIMIT:
        review_note = "\nMemory review recommended: active.md has more than 50 rules.\n"
    return (
        "Saved to memory.\n\n"
        f"Action: {decision.action}\n"
        f"Title: {decision.title}\n"
        f"Type: {decision.kind}\n"
        f"Memory type: {decision.memory_type}\n"
        f"Scope: {decision.scope}\n"
        f"Score: {decision.score}\n"
        "Files updated:\n"
        + "".join(f"- {f}\n" for f in rel_files)
        + "\nFuture agents should apply this when:\n"
        f"- Future tasks match scope: {decision.scope}\n"
        "\nCheck:\n"
        "- Final report states how this memory was applied.\n"
        + review_note
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="/save durable agent memory helper")
    parser.add_argument("--message", help="Message text to save.")
    parser.add_argument("--message-file", help="Path to a file containing message text.")
    parser.add_argument("--project-root", default=".", help="Target project root. Defaults to current directory.")
    parser.add_argument("--date", default=_dt.date.today().isoformat(), help="Date for the memory entry.")
    parser.add_argument("--dry-run", action="store_true", help="Do not write files; print decision only.")
    parser.add_argument("--json", action="store_true", help="Print JSON result.")
    args = parser.parse_args(argv)

    if not args.message and not args.message_file:
        print("Provide --message or --message-file.", file=sys.stderr)
        return 2

    if args.message_file:
        text = Path(args.message_file).read_text(encoding="utf-8")
    else:
        text = args.message or ""

    root = Path(args.project_root).resolve()
    decision = decide_and_save(root, text, args.date, dry_run=args.dry_run)

    if args.json:
        payload = {
            "action": decision.action,
            "title": decision.title,
            "score": decision.score,
            "kind": decision.kind,
            "memory_type": decision.memory_type,
            "scope": decision.scope,
            "topic": decision.topic,
            "files": [str(p) for p in decision.files],
            "reason": decision.reason,
        }
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(format_report(decision, root))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
