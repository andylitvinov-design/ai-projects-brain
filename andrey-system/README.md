# Andrey System

Agent-friendly knowledge base for Andrey Li's business system.

---

## Important Architecture Rule

GitHub = knowledge base (method + structure)
ChatGPT Project = runtime (actual working agent)

Therefore:

- Files in `core/` and `agent/` describe the system
- Files in `project-ready/` are used directly in ChatGPT Projects

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

1. Read `AGENT-START-HERE.md`
2. Read `core/master-doc.md`
3. Use `system-index.json` for navigation

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

---

## Rule

Do not mix:

- method (in alchemy-method repo)
- business system (here)

---

## Goal

Make the system:
- clear
- usable by agents
- scalable
