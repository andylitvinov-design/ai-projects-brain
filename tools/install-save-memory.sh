#!/usr/bin/env bash
set -euo pipefail

# Install /save durable agent memory into the current project repo.
# Run from a project root after cloning ai-projects-brain nearby or setting BRAIN_DIR.

BRAIN_DIR="${BRAIN_DIR:-../ai-projects-brain}"
PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Project dir does not exist: $PROJECT_DIR" >&2
  exit 1
fi

mkdir -p "$PROJECT_DIR/agent-memory/topics"
mkdir -p "$PROJECT_DIR/agent-memory/component-notes"
mkdir -p "$PROJECT_DIR/.codex/skills/save"
mkdir -p "$PROJECT_DIR/.claude/commands"

# Project memory templates
if [ ! -f "$PROJECT_DIR/agent-memory/active.md" ]; then
  cp "$BRAIN_DIR/templates/project-agent-memory/active.md" "$PROJECT_DIR/agent-memory/active.md"
fi

if [ ! -f "$PROJECT_DIR/agent-memory/index.md" ]; then
  cp "$BRAIN_DIR/templates/project-agent-memory/index-template.md" "$PROJECT_DIR/agent-memory/index.md"
fi

for file in archive.md mistakes.md; do
  if [ ! -f "$PROJECT_DIR/agent-memory/$file" ]; then
    printf "# %s\n\n" "$file" > "$PROJECT_DIR/agent-memory/$file"
  fi
done

for topic in delivery audit mobile ux copy auth; do
  if [ ! -f "$PROJECT_DIR/agent-memory/topics/$topic.md" ]; then
    printf "# %s memory\n\n" "$topic" > "$PROJECT_DIR/agent-memory/topics/$topic.md"
  fi
done

# Codex adapter
cp "$BRAIN_DIR/templates/codex/skills/save/SKILL.md" "$PROJECT_DIR/.codex/skills/save/SKILL.md"

# Claude Code adapter
cp "$BRAIN_DIR/templates/claude-code/commands/save.md" "$PROJECT_DIR/.claude/commands/save.md"

cat <<'EOF'
/save memory system installed.

Created/updated:
- agent-memory/
- .codex/skills/save/SKILL.md
- .claude/commands/save.md

Next:
- add a short reference to AGENTS.md / CLAUDE.md if the project uses them
- run a test /save in a safe branch
EOF
