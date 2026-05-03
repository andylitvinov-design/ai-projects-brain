# Agent Map — Andrey Li System

This file explains which agents are needed and which tasks each agent owns.

## Core Principle

Do not create many agents too early.

Start with one main agent and split only when workflows become repetitive.

## Minimum Agent System

### 1. Business Strategist Agent

Main role:
- keep positioning clear;
- develop products;
- improve offers;
- connect method to money and growth.

Reads:
- core/master-doc.md
- core/product-structure.md
- core/quality-checklist.md

Outputs:
- positioning;
- product ideas;
- offer structures;
- landing page logic;
- business strategy.

### 2. Client Report Agent

Main role:
- create client diagnostics and reports.

Reads:
- core/master-doc.md
- core/report-template.md
- core/quality-checklist.md

Outputs:
- express diagnosis;
- monthly report;
- extended report;
- next-step recommendation.

### 3. Content / Promotion Agent

Main role:
- generate posts, ads, hooks, and landing blocks.

Reads:
- core/master-doc.md
- core/content-formulas.md
- core/product-structure.md
- core/quality-checklist.md

Outputs:
- posts;
- ads;
- hooks;
- content plan;
- landing page copy.

## Optional Later Agents

### 4. Automation Agent

Use later when there are stable templates.

Role:
- connect reports, forms, content, and workflows;
- help build automations in tools like n8n, Make, ChatGPT Projects, or custom scripts.

### 5. Method Editor Agent

Use only when developing the method itself.

Role:
- refine concepts;
- update master-doc;
- keep terminology consistent.

## Recommended Setup Now

For the current stage, use only 3 agents:

1. Business Strategist Agent
2. Client Report Agent
3. Content / Promotion Agent

Do not create more agents until these three are working.

## If Using One ChatGPT Project Only

Create one project called:

Andrey Business Consultant

Inside it, use modes:
- Strategy Mode
- Report Mode
- Content Mode

The single project should read AGENT-START-HERE.md first and then use the right file for the task.

## Decision Rule

If task is about positioning, offers, products, website, or money → Business Strategist Agent.

If task is about a client case, diagnosis, resource state, remedies, or report → Client Report Agent.

If task is about posts, ads, hooks, landing text, or promotion → Content / Promotion Agent.
