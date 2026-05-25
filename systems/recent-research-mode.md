# Recent Research Mode / Last 30 Days

Use this mode when the user says:

- `last30days`
- `за последние 30 дней`
- `свежий ресерч`
- `проверь свежие релизы`
- `найди свежие обсуждения`
- `проверь новые инструменты`

## Purpose

Recent Research Mode gathers fresh public information before making decisions that may depend on current tools, APIs, prices, products, releases, or community discussions.

## When to use

Use this mode for topics likely to change:

- AI tools and products.
- APIs, SDKs, pricing, plans, limits.
- GitHub projects and releases.
- Vercel, Supabase, Cloudflare, Playwright, Codex, Claude Code, browser agents.
- Payment providers and bank integrations.
- Travel, hosting, local services, legal or compliance topics.

## Research scope

Prefer the last 30 days when the user explicitly requests `last30days`.
If the field moves slowly, include older authoritative docs but clearly separate:

- recent updates;
- current official docs;
- community discussion;
- open-source/GitHub evidence;
- product/pricing pages.

## Rules

- Use web research when available.
- Prefer primary sources: official docs, release notes, changelogs, GitHub repos/issues, provider status pages.
- Use community sources only as signals, not final truth.
- Cite sources when presenting results.
- Separate facts from interpretation.
- Call out outdated, conflicting, or unverified claims.
- End with practical recommendation for Andrey's project context.

## Output contract

1. Topic and date window.
2. Key findings.
3. Official/primary-source updates.
4. GitHub/open-source signals.
5. Product/tool options.
6. Risks, caveats, outdated claims.
7. Recommendation.
8. Links/citations.

## Default prompt snippet

```text
Use Recent Research Mode / Last 30 Days.
Research fresh information for this topic from the last 30 days.
Prioritize official docs, release notes, GitHub, and product pages.
Summarize findings with links/citations, risks, caveats, and a practical recommendation for my project.
```