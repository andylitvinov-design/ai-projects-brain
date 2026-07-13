import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function fail(message) {
  throw new Error(message);
}

function assertIncludes(file, needle) {
  const text = read(file);
  if (!text.includes(needle)) {
    fail(`${file} must include ${JSON.stringify(needle)}`);
  }
}

function assertMatches(file, regex, description) {
  const text = read(file);
  if (!regex.test(text)) {
    fail(`${file} must include ${description}`);
  }
}

const contextScoutFile = 'systems/context-scout-mode.md';
if (!fs.existsSync(path.join(ROOT, contextScoutFile))) {
  fail('Missing systems/context-scout-mode.md');
}

for (const file of [
  'systems/audit-sales.md',
  'systems/audit-sales-markers.md',
  'systems/audit-sale.md',
  'systems/audit-sale-markers.md',
  'projects/codex-automation/audit-sales-memory.md',
]) {
  if (!fs.existsSync(path.join(ROOT, file))) {
    fail(`Missing ${file}`);
  }
}

for (const file of [
  'systems/agent-modes.md',
  'systems/agent-rules.md',
  'systems/planner-mode.md',
  'systems/delivery-loop-standard.md',
  'systems/audit-mode.md',
  'systems/audit-ui.md',
  'systems/audit-sales.md',
  'systems/audit-fin-mode.md',
  'systems/critic-mode.md',
]) {
  assertIncludes(file, 'systems/context-scout-mode.md');
  assertMatches(
    file,
    /\/context-scout[\s\S]{0,240}(before|preflight|first|starts with)/i,
    '`/context-scout` preflight wiring',
  );
}

for (const field of [
  'Target project',
  'User goal',
  'Current workflow mode',
  'Relevant repo / branch / issue',
  'Current implementation state',
  'Existing implementation patterns',
  'Known constraints',
  'Scope boundaries',
  'Non-goals',
  'Files/modules likely involved',
  'Data/period involved',
  'Verification checklist',
  'Risks/blockers',
  'Safe auto-fix rules',
  'Recommended next command',
]) {
  assertIncludes(contextScoutFile, field);
}

for (const alias of [
  'finance / ezohata ledger',
  'ezohata.com / mandalas shop',
  'reports / psitherapy tools',
  'reiki-yggdrasil',
  'universal agent workflow / prompt modes',
]) {
  assertIncludes(contextScoutFile, alias);
}

assertIncludes(contextScoutFile, 'read-only');
assertIncludes(contextScoutFile, 'must never mutate');
assertIncludes(contextScoutFile, 'one soft A/B/C clarification question');
assertIncludes(contextScoutFile, '3000 tokens');
assertIncludes(contextScoutFile, '4000 tokens');

assertIncludes('systems/planner-mode.md', 'one copy-paste-ready `/delivery /goal` prompt');
assertIncludes('systems/planner-mode.md', '1-3 soft A/B/C questions');
assertIncludes('systems/planner-mode.md', 'Do not require Andrey to manually create a GitHub issue');

assertIncludes('systems/delivery-loop-standard.md', 'Inspect first');
assertIncludes('systems/delivery-loop-standard.md', 'Reuse existing patterns');

assertIncludes('systems/audit-mode.md', 'explicit verification checklist');
assertIncludes('systems/audit-mode.md', 'Auto-fix only safe deterministic issues');

assertIncludes('systems/audit-fin-mode.md', 'last 30 days');
for (const invariant of [
  'opening balance',
  'closing balance',
  'transaction sums',
  'account totals',
  'category totals',
  'duplicate transactions',
  'missing transactions',
  'rounding errors',
  'currency mismatches',
  'stale cached totals',
  'manually edited totals',
  'balance invariants',
]) {
  assertIncludes('systems/audit-fin-mode.md', invariant);
}

for (const file of [
  'systems/active-skill-map.md',
  'systems/agent-modes.md',
  'systems/context-scout-mode.md',
]) {
  assertIncludes(file, '/audit-sales');
}

assertIncludes('systems/audit-sales.md', 'systems/audit-sales-markers.md');
assertIncludes('systems/audit-sales.md', 'projects/codex-automation/audit-sales-memory.md');
assertMatches(
  'systems/audit-sales.md',
  /Do not promise conversion uplift without analytics or an experiment\./,
  'the no-fake-uplift rule',
);
assertMatches(
  'systems/audit-sales.md',
  /Do not invent testimonials, results, statistics, qualifications, prices, guarantees, scarcity, urgency, or conversion rates\./,
  'the no-invented-proof rule',
);

for (const scorecardGroup of [
  'A. Message and audience fit',
  'B. Offer clarity and value',
  'C. Trust and proof',
  'D. CTA and conversion path',
  'E. Objections and decision support',
  'F. Friction and usability',
  'G. Measurement readiness',
]) {
  assertIncludes('systems/audit-sales-markers.md', scorecardGroup);
}

for (const status of ['PASS', 'WATCH', 'FAIL', 'NOT_TESTED']) {
  assertIncludes('systems/audit-sales-markers.md', status);
}

for (const priority of ['P0', 'P1', 'P2']) {
  assertIncludes('systems/audit-sales-markers.md', priority);
}

const canonicalDefinitions = fs
  .readdirSync(path.join(ROOT, 'systems'))
  .filter((file) => file.endsWith('.md'))
  .filter((file) => read(path.join('systems', file)).includes('# /audit-sales standard'));
if (canonicalDefinitions.length !== 1) {
  fail(`Expected one /audit-sales standard definition, found ${canonicalDefinitions.length}`);
}

assertIncludes('systems/audit-sale.md', 'compatibility alias');
assertIncludes('systems/audit-sale.md', 'systems/audit-sales.md');
assertIncludes('systems/audit-sale-markers.md', 'systems/audit-sales-markers.md');
assertIncludes('systems/active-skill-map.md', '/audit-sale` is compatibility alias only');
assertIncludes('systems/agent-modes.md', 'compatibility alias only');

assertIncludes('systems/critic-mode.md', 'Critique before execution');
assertIncludes('systems/critic-mode.md', 'improved execution prompt');

assertIncludes('systems/context-scout-mode.md', 'Codex may create or update the issue itself');

console.log('context-scout verification ok');
