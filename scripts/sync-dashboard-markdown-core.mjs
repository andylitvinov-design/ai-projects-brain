#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_DASHBOARD = 'projects/codex-automation/system-health-dashboard.json';
const DEFAULT_MARKDOWN = 'projects/codex-automation/system-health-dashboard.md';

const escapeCell = (value) => String(value ?? 'unknown')
  .replace(/\|/g, '\\|')
  .replace(/\n/g, ' ');

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceSection(markdown, heading, nextHeading, body) {
  const pattern = new RegExp(
    `## ${escapeRegExp(heading)}\\n[\\s\\S]*?(?=\\n## ${escapeRegExp(nextHeading)}\\n)`,
  );
  if (!pattern.test(markdown)) throw new Error(`Markdown section missing: ${heading}`);
  return markdown.replace(pattern, `## ${heading}\n\n${body.trimEnd()}\n`);
}

function replaceFinalCoreSection(markdown, heading, body) {
  const pattern = new RegExp(
    `## ${escapeRegExp(heading)}\\n[\\s\\S]*?(?=\\n\\n<!-- (?:MORNING|EVENING)_UPGRADE:|$)`,
  );
  if (!pattern.test(markdown)) throw new Error(`Markdown section missing: ${heading}`);
  return markdown.replace(pattern, `## ${heading}\n\n${body.trimEnd()}\n`);
}

function stageEvidence(stage = {}) {
  return [
    stage.timestamp,
    stage.deploy_id ? `deploy ${stage.deploy_id}` : null,
    stage.source_commit_sha ? `source ${stage.source_commit_sha}` : null,
    stage.branch ? `branch ${stage.branch}` : null,
    stage.public_last_updated ? `public ${stage.public_last_updated}` : null,
    stage.live_verified_at ? `verified ${stage.live_verified_at}` : null,
    stage.failure_reason,
  ].filter(Boolean).join('; ') || 'no current evidence';
}

function metricImpactBody(dashboard) {
  const lines = [
    '| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |',
    '|---|---|---|---|---|---|---|---|---|',
  ];
  for (const item of dashboard.metric_impact ?? []) {
    lines.push(`| ${escapeCell(item.metric)} | ${escapeCell(item.project)} | ${escapeCell(item.goal)} | ${escapeCell(item.sector)} | ${escapeCell(item.before)} | ${escapeCell(item.after)} | ${escapeCell(item.change)} | ${escapeCell(item.evidence)} | ${escapeCell(item.confidence)} |`);
  }
  return lines.join('\n');
}

function intelligenceGainBody(dashboard) {
  return Object.entries(dashboard.system_intelligence_gain ?? {})
    .map(([key, value]) => `- ${key}: **${escapeCell(value)}**`)
    .join('\n') || '- No observed gain counters recorded.';
}

function guardrailsBody(dashboard) {
  return (dashboard.critical_slos ?? [])
    .map((item) => `- ${item.id}: **${item.state}** — ${escapeCell(item.observed)} / ${escapeCell(item.target)}`)
    .join('\n') || '- Critical guardrail evidence is unavailable.';
}

function publicationBody(dashboard) {
  const stages = dashboard.publication_evidence?.stages ?? {};
  return ['canonical_updated', 'mirror_synced', 'deploy_identified', 'live_verified']
    .map((name) => {
      const stage = stages[name] ?? {};
      return `- ${name}: **${stage.status ?? 'unknown'}** — ${escapeCell(stageEvidence(stage))}`;
    })
    .join('\n');
}

function handoffsBody(dashboard) {
  const handoffs = dashboard.risky_work_handoffs ?? [];
  if (!handoffs.length) return '- No risky-work handoff is currently registered.';
  return handoffs.map((item, index) => {
    const target = item.target ? ` (${item.target})` : '';
    const evidence = item.required_evidence ? ` Evidence: ${item.required_evidence}` : '';
    return `${index + 1}. **${item.project_id ?? 'unknown'} → ${item.route ?? 'unknown'}${target}:** ${item.blocker ?? 'No blocker detail.'}${evidence}`;
  }).join('\n');
}

function validationBody(dashboard) {
  const validation = dashboard.validation ?? {};
  const passed = validation.passed_checks ?? 'unknown';
  const executed = validation.executed_checks ?? 'unknown';
  const failed = validation.failed_checks ?? 'unknown';
  const checks = Array.isArray(validation.checks) && validation.checks.length
    ? validation.checks.join('; ')
    : 'unknown';
  return [
    `- **${passed}/${executed} PASS**; failed ${failed}.`,
    `- Checks: ${checks}.`,
    `- CI status: ${validation.ci_status ?? 'unknown'}.`,
    `- Canonical snapshot timestamp: ${dashboard.last_updated ?? 'unknown'}.`,
  ].join('\n');
}

function unknownBody(dashboard) {
  return (dashboard.unknown_blocked ?? [])
    .map((item) => `- ${item}`)
    .join('\n') || '- No unknown or blocked item is currently registered.';
}

function questionsBody(dashboard) {
  return (dashboard.evening_verification_questions ?? [])
    .map((item) => `- ${item}`)
    .join('\n') || '- Recheck the exact publication ladder and current evidence.';
}

export function syncDashboardMarkdownCore(inputMarkdown, dashboard) {
  let markdown = inputMarkdown
    .replace(/\*\*Last updated:\*\*\s*`[^`]+`/, `**Last updated:** \`${dashboard.last_updated}\``)
    .replace(/\*\*Public publication state:\*\*\s*`[^`]+`/, `**Public publication state:** \`${dashboard.publication_evidence?.publication_status ?? 'UNKNOWN'}\``);

  markdown = replaceSection(markdown, 'Metric impact', 'System Intelligence Gain', metricImpactBody(dashboard));
  markdown = replaceSection(markdown, 'System Intelligence Gain', 'Critical guardrails', intelligenceGainBody(dashboard));
  markdown = replaceSection(markdown, 'Critical guardrails', 'Publication ladder', guardrailsBody(dashboard));
  markdown = replaceSection(markdown, 'Publication ladder', 'Exact risky-work handoffs', publicationBody(dashboard));
  markdown = replaceSection(markdown, 'Exact risky-work handoffs', 'Validation evidence', handoffsBody(dashboard));
  markdown = replaceSection(markdown, 'Validation evidence', 'What remains unknown, not applicable or blocked', validationBody(dashboard));
  markdown = replaceSection(markdown, 'What remains unknown, not applicable or blocked', 'Evening verification questions', unknownBody(dashboard));
  markdown = replaceFinalCoreSection(markdown, 'Evening verification questions', questionsBody(dashboard));
  return markdown.endsWith('\n') ? markdown : `${markdown}\n`;
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const dashboardFile = path.resolve(root, argValue(args, '--dashboard', DEFAULT_DASHBOARD));
  const markdownFile = path.resolve(root, argValue(args, '--markdown', DEFAULT_MARKDOWN));
  const dashboard = JSON.parse(fs.readFileSync(dashboardFile, 'utf8'));
  const markdown = fs.readFileSync(markdownFile, 'utf8');
  fs.writeFileSync(markdownFile, syncDashboardMarkdownCore(markdown, dashboard));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
