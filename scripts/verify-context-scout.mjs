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
  'systems/agent-modes.md',
  'systems/agent-rules.md',
  'systems/planner-mode.md',
  'systems/delivery-loop-standard.md',
  'systems/audit-mode.md',
  'systems/audit-ui.md',
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

assertIncludes('systems/critic-mode.md', 'Critique before execution');
assertIncludes('systems/critic-mode.md', 'improved execution prompt');

assertIncludes('systems/context-scout-mode.md', 'Codex may create or update the issue itself');

console.log('context-scout verification ok');
