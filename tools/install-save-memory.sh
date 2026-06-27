#!/usr/bin/env bash
set -euo pipefail

# Install durable agent memory commands into the current project repo.
# Run from a project root after cloning ai-projects-brain nearby or setting BRAIN_DIR.

BRAIN_DIR="${BRAIN_DIR:-../ai-projects-brain}"
PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"

copy_if_exists() {
  local src="$1"
  local dst="$2"
  if [ -f "$src" ]; then
    mkdir -p "$(dirname "$dst")"
    cp "$src" "$dst"
    echo "Installed: $dst"
  else
    echo "Skipped optional adapter, missing: $src"
  fi
}

copy_if_missing() {
  local src="$1"
  local dst="$2"
  if [ -f "$dst" ]; then
    echo "Kept existing: $dst"
    echo "Review template if needed: $src"
  elif [ -f "$src" ]; then
    mkdir -p "$(dirname "$dst")"
    cp "$src" "$dst"
    echo "Installed: $dst"
  else
    echo "Skipped missing template: $src"
  fi
}

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Project dir does not exist: $PROJECT_DIR" >&2
  exit 1
fi

mkdir -p "$PROJECT_DIR/agent-memory/topics"
mkdir -p "$PROJECT_DIR/agent-memory/component-notes"

# Project boot/router templates. Do not overwrite existing project-specific instructions.
copy_if_missing "$BRAIN_DIR/templates/project-boot/AGENTS.md" "$PROJECT_DIR/AGENTS.md"
copy_if_missing "$BRAIN_DIR/templates/project-boot/CLAUDE.md" "$PROJECT_DIR/CLAUDE.md"

# Project memory templates
if [ ! -f "$PROJECT_DIR/agent-memory/active.md" ]; then
  cp "$BRAIN_DIR/templates/project-agent-memory/active.md" "$PROJECT_DIR/agent-memory/active.md"
fi

if [ ! -f "$PROJECT_DIR/agent-memory/index.md" ]; then
  cp "$BRAIN_DIR/templates/project-agent-memory/index-template.md" "$PROJECT_DIR/agent-memory/index.md"
fi

for file in archive.md mistakes.md candidates.md metrics.md; do
  if [ ! -f "$PROJECT_DIR/agent-memory/$file" ]; then
    printf "# %s\n\n" "$file" > "$PROJECT_DIR/agent-memory/$file"
  fi
done

for topic in delivery audit mobile ux copy auth; do
  if [ ! -f "$PROJECT_DIR/agent-memory/topics/$topic.md" ]; then
    printf "# %s memory\n\n" "$topic" > "$PROJECT_DIR/agent-memory/topics/$topic.md"
  fi
done

# Codex adapters
copy_if_exists "$BRAIN_DIR/templates/codex/skills/save/SKILL.md" "$PROJECT_DIR/.codex/skills/save/SKILL.md"
copy_if_exists "$BRAIN_DIR/templates/codex/skills/memory/SKILL.md" "$PROJECT_DIR/.codex/skills/memory/SKILL.md"
copy_if_exists "$BRAIN_DIR/templates/codex/skills/memory-review/SKILL.md" "$PROJECT_DIR/.codex/skills/memory-review/SKILL.md"
copy_if_exists "$BRAIN_DIR/templates/codex/skills/learn-pass/SKILL.md" "$PROJECT_DIR/.codex/skills/learn-pass/SKILL.md"

# Claude Code adapters
copy_if_exists "$BRAIN_DIR/templates/claude-code/commands/save.md" "$PROJECT_DIR/.claude/commands/save.md"
copy_if_exists "$BRAIN_DIR/templates/claude-code/commands/memory.md" "$PROJECT_DIR/.claude/commands/memory.md"
copy_if_exists "$BRAIN_DIR/templates/claude-code/commands/memory-review.md" "$PROJECT_DIR/.claude/commands/memory-review.md"
copy_if_exists "$BRAIN_DIR/templates/claude-code/commands/learn-pass.md" "$PROJECT_DIR/.claude/commands/learn-pass.md"

cat <<'EOF'
Agent memory system installed.

Created/updated:
- AGENTS.md / CLAUDE.md if missing
- agent-memory/
- candidates.md and metrics.md for self-learning
- Codex command adapters when available
- Claude Code command adapters when available

If AGENTS.md or CLAUDE.md already existed, merge the router snippet manually from templates/project-boot/.

Next:
- run a test /save in a safe branch
- run /memory to confirm active memory is discoverable
- run /learn-pass after a meaningful task
EOF
