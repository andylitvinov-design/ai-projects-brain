# Andrey System

Agent-friendly knowledge base for Andrey Li's method, positioning, products, reports, content, landing pages, pricing, client intake, brand language, and business execution.

This folder is designed for ChatGPT Projects, Codex, and other agents that need to understand Andrey's business-method system quickly and without guessing.

---

## Start Here

Primary entry file:

- `AGENT-START-HERE.md`

Source of truth:

- `core/master-doc.md`

Main operating playbook:

- `agent/business-builder-playbook.md`

Agent behavior rules:

- `agent/agent-instructions.md`

---

## Reading Order For Agents

1. Read `AGENT-START-HERE.md`.
2. Read `core/master-doc.md`.
3. For complex Business Builder tasks, read `agent/business-builder-playbook.md`.
4. Depending on task, read the relevant support files:
   - intake / questionnaire → `core/client-intake.md`
   - reports → `core/report-template.md` + `core/client-intake.md`
   - products/offers/pricing → `core/product-structure.md` + `core/offer-library.md` + `core/pricing.md`
   - landing pages → `core/landing-template.md` + `core/offer-library.md` + `core/content-formulas.md`
   - Russian copy / Russian audience → `core/ru-brand-language.md`
   - English copy / English audience → `core/en-brand-language.md`
   - content/ads/posts → `core/content-formulas.md` + `core/examples.md`
   - quality review → `core/quality-checklist.md`
   - examples/style → `core/examples.md`
   - execution / Codex prompts → `agent/business-builder-playbook.md`
   - agent behavior → `agent/agent-instructions.md`

Read only the minimum necessary files for small tasks.

---

## File Map

### Core

- `core/master-doc.md` — main concept, method, positioning, differentiation, language, constraints.
- `core/client-intake.md` — client intake questions, diagnostic input, Wu Xing intake, and offer routing.
- `core/report-template.md` — client report structure.
- `core/product-structure.md` — product ladder, offer logic, sales path.
- `core/offer-library.md` — reusable commercial offers and offer selection rules.
- `core/pricing.md` — current prices, pricing hypotheses, upgrade logic, and pricing language.
- `core/landing-template.md` — conversion-focused landing page structure and variants.
- `core/content-formulas.md` — marketing and post generation formulas.
- `core/ru-brand-language.md` — Russian brand voice, hooks, CTA, offer language, and positioning.
- `core/en-brand-language.md` — English brand voice, positioning, hooks, CTA, and market framing.
- `core/examples.md` — reference examples for posts, offers, reports, landing pages, optimization, and execution prompts.
- `core/quality-checklist.md` — checklist for reports, content, offers, and validation.

### Agent

- `agent/agent-instructions.md` — behavior rules, work modes, depth control, and output rules.
- `agent/business-builder-playbook.md` — main operating scenario for Business Builder tasks.

---

## Task Routing

Use this routing when selecting files:

- Business strategy / full workflow → `agent/business-builder-playbook.md` + `core/master-doc.md`
- Intake / questionnaire / first client message → `core/client-intake.md` + language file if needed
- Offer / product / pricing → `core/product-structure.md` + `core/offer-library.md` + `core/pricing.md`
- Landing page / sales page → `core/landing-template.md` + `core/offer-library.md` + `core/content-formulas.md` + language file if needed
- Client report / diagnosis → `core/report-template.md` + `core/client-intake.md` + `core/master-doc.md`
- Content / posts / ads → `core/content-formulas.md` + `core/examples.md` + language file if needed
- RU copy / Russian audience → `core/ru-brand-language.md`
- EN copy / English audience → `core/en-brand-language.md`
- Quality review / critique → `core/quality-checklist.md`
- Codex prompt / execution plan → `agent/business-builder-playbook.md`
- Style reference / examples → `core/examples.md`

Language file:
- Russian output → use `core/ru-brand-language.md`
- English output → use `core/en-brand-language.md`

---

## Raw Links

Use raw links when an agent cannot browse GitHub UI.

- Start here: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/AGENT-START-HERE.md
- Master doc: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/master-doc.md
- Client intake: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/client-intake.md
- Report template: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/report-template.md
- Product structure: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/product-structure.md
- Offer library: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/offer-library.md
- Pricing: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/pricing.md
- Landing template: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/landing-template.md
- Content formulas: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/content-formulas.md
- RU brand language: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/ru-brand-language.md
- EN brand language: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/en-brand-language.md
- Examples: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/examples.md
- Quality checklist: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/core/quality-checklist.md
- Agent instructions: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/agent/agent-instructions.md
- Business Builder playbook: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/andrey-system/agent/business-builder-playbook.md

---

## Core Rule

Do not invent Andrey's positioning or method from scratch. Use `core/master-doc.md` first, then adapt based on the requested output.

---

## Output Standard

Every output should connect:

client pain → hidden mechanism → resource → next level → concrete action/result.

The goal is not theory. The goal is clarity, clients, money, energy, movement, implementation, or quality of life.

---

## Safety

Do not store private client data, medical promises, secrets, tokens, or credentials in this folder.

Do not make guaranteed medical or financial claims.
