# AGENT START HERE — Andrey Li System

This file is the entry point for any AI agent.

---

## Key Architecture

GitHub = knowledge base
ChatGPT Project = runtime

Use:

- this file for routing
- `system-index.json` for structure
- `project-ready/` for standalone instructions

---

## Two Agents

1. Business Builder Agent — business, products, marketing
2. Client Report Agent — diagnostics, reports, support

---

## Step 1

Read:

- core/master-doc.md

---

## Step 2

Select agent:

- business task → Business Builder
- client report → Report Agent

---

## Step 3

If running in ChatGPT Project:

Use only:

- project-ready/business-builder-project-instruction.md
- project-ready/report-agent-project-instruction.md

---

## Core Model

client pain → mechanism → resource → next level → result

---

## Rule

Do not invent system
Do not use external assumptions
Use provided structure only
