# AGENT START HERE — Andrey Li System

This file is the entry point for any AI agent.

---

## Non-Negotiable First Step

Before free-text search, read:

1. `source-registry.json`
2. `system-index.json`
3. this file

Search is fallback, not the first step, when a canonical source exists in `source-registry.json`.

If a user asks where a known source is, answer from `source-registry.json` first.

---

## Key Architecture

GitHub = knowledge base
ChatGPT Project = runtime

Use:

- `source-registry.json` for canonical source routing
- `system-index.json` for structure
- this file for human-readable routing
- `project-ready/` for standalone instructions

---

## Two Agents

1. Business Builder Agent — business, products, marketing
2. Client Report Agent — diagnostics, reports, support

---

## Step 1

Read:

- `source-registry.json`
- `system-index.json`
- `core/master-doc.md`

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

For Russian client-facing reports, always check exact paths from `source-registry.json`, then:

1. `andylitvinov-design/alchemy-method/method-source-registry.json`
2. `andylitvinov-design/alchemy-method/consultations/reports-index.md`
3. `andylitvinov-design/alchemy-method/consultations/report-logic.md`
4. `andylitvinov-design/alchemy-method/consultations/examples/confidence-bach-report-example.md`

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
If a file is missing, say which registry and exact paths were checked before suggesting creation or indexing.
