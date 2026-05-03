# Andrey System

Agent-friendly knowledge base for Andrey Li's business system.

---

## Important Architecture Rule

GitHub = knowledge base (method + structure)
ChatGPT Project = runtime (actual working agent)

Therefore:

- Files in `core/` and `agent/` describe the system
- Files in `project-ready/` are used directly in ChatGPT Projects
- `source-registry.json` is the canonical machine-readable routing layer

---

## First File For Agents

Agents must start with:

1. `source-registry.json`
2. `system-index.json`
3. `AGENT-START-HERE.md`

Do not rely on free-text search before checking `source-registry.json`.

Search is fallback, not the first step, for known source types.

---

## Two Agents

System uses 2 agents only:

1. Business Builder Agent
2. Client Report Agent

Each agent has:

- instruction (short rules)
- playbook (detailed workflow)
- project-ready instruction (runtime version)

---

## Start Here

1. Read `source-registry.json`
2. Read `AGENT-START-HERE.md`
3. Read `core/master-doc.md`
4. Use `system-index.json` for full navigation

---

## Structure

### core/
Method, positioning, products, content, reports

### agent/
Agent instructions and playbooks

### project-ready/
Standalone instructions for ChatGPT Projects (no GitHub needed)

### examples/
Reference outputs (safe, no personal data)

### source-registry.json
Machine-readable canonical routing manifest for agents.

---

## Cross-Repository Rule

Do not mix:

- method / consultations / live Russian report examples → `alchemy-method`
- business system / agents / runtime / structural samples → `ai-projects-brain/andrey-system`

For Russian client reports, the primary live-style example is:

`andylitvinov-design/alchemy-method/consultations/examples/confidence-bach-report-example.md`

---

## Goal

Make the system:
- clear
- usable by agents
- searchable by exact registry paths
- scalable
