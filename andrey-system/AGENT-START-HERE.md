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

## Report Routing Rule

For client reports, distinguish two sources:

- `ai-projects-brain/andrey-system` = agent instructions, runtime, report templates, structural samples.
- `alchemy-method` = method logic, consultations, live Russian report style.

For Russian client-facing reports, always check:

1. `andylitvinov-design/alchemy-method/consultations/reports-index.md`
2. `andylitvinov-design/alchemy-method/consultations/report-logic.md`
3. `andylitvinov-design/alchemy-method/consultations/examples/confidence-bach-report-example.md`

Important:

- `andrey-system/examples/sample-full-client-report.md` is an English structural sample.
- It is not the primary Russian live-style report.
- The primary Russian live-style report is `alchemy-method/consultations/examples/confidence-bach-report-example.md`.

---

## Core Model

client pain → mechanism → resource → next level → result

---

## Rule

Do not invent system.
Do not use external assumptions.
Use provided structure only.
If a file is missing, say so and suggest creating or indexing it.
