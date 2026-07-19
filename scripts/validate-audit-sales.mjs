import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const paths = {
  standard: 'systems/audit-sales.md',
  markers: 'systems/audit-sales-markers.md',
  memory: 'projects/codex-automation/audit-sales-memory.md',
  automation: 'projects/codex-automation/audit-sales-automation-contract.md',
  regression: 'projects/codex-automation/audit-sales-regression.json',
  aliasStandard: 'systems/audit-sale.md',
  aliasMarkers: 'systems/audit-sale-markers.md',
  readme: 'README.md',
  skillMap: 'systems/active-skill-map.md',
  agentModes: 'systems/agent-modes.md',
};

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function includesAll(text, tokens, message) {
  const missing = tokens.filter((token) => !text.includes(token));
  assert(missing.length === 0, `${message}: missing ${missing.join(', ')}`);
}

function extractScoreSections(markersText) {
  const headingPattern = /^### ([A-G])\.\s+.+?—\s*(\d+)\s*$/gm;
  const headings = [...markersText.matchAll(headingPattern)];
  assert(headings.length === 7, `${paths.markers} must contain exactly seven weighted A-G categories`);

  return headings.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < headings.length ? headings[index + 1].index : markersText.indexOf('\n## ', start);
    const body = markersText.slice(start, end === -1 ? markersText.length : end);
    const markerWeights = [...body.matchAll(/^-\s+.+?—\s*(\d+)\s*$/gm)].map((item) => Number(item[1]));
    return {
      key: match[1],
      categoryWeight: Number(match[2]),
      markerWeights,
    };
  });
}

function evaluateScreenshotEvidence(output) {
  const lower = output.toLowerCase();
  const forbidden = [
    'status: success',
    'accessibility=pass',
    'performance=pass',
    'screenshot proves accessibility',
  ];
  const required = [
    '/audit-sales',
    'not_tested',
    'decision-critical',
    'keyboard',
    'core web vitals',
  ];
  return required.every((token) => lower.includes(token))
    && forbidden.every((token) => !lower.includes(token))
    && ['status: partial', 'status: blocked', 'status: needs_verification'].some((token) => lower.includes(token));
}

const standard = readText(paths.standard);
const markers = readText(paths.markers);
const memory = readText(paths.memory);
const automation = readText(paths.automation);
const aliasStandard = readText(paths.aliasStandard);
const aliasMarkers = readText(paths.aliasMarkers);
const readme = readText(paths.readme);
const skillMap = readText(paths.skillMap);
const agentModes = readText(paths.agentModes);
const regression = readJson(paths.regression);

includesAll(standard, [
  '`/audit-sales` is the single canonical',
  '`/audit-sale` is accepted only as a deprecated compatibility alias',
  'systems/audit-sales-markers.md',
  'PASS',
  'WATCH',
  'FAIL',
  'NOT_TESTED',
  'Core Web Vitals',
  'Temporary candidates expire after 90 days',
], paths.standard);

includesAll(markers, [
  'Version: 1.1',
  'Last intelligence review: 2026-07-19',
  'Decision-critical cost, eligibility, timing, format, and post-CTA expectations are disclosed before commitment',
  'Primary conversion path is operable on mobile and by keyboard',
  'Primary-path loading, responsiveness, visual stability',
  '## Durable marker decision contracts',
  '## Evidence and safety rules',
], paths.markers);

const expectedCategoryWeights = new Map([
  ['A', 20],
  ['B', 20],
  ['C', 15],
  ['D', 20],
  ['E', 10],
  ['F', 10],
  ['G', 5],
]);
const sections = extractScoreSections(markers);
let total = 0;
for (const section of sections) {
  assert(section.categoryWeight === expectedCategoryWeights.get(section.key), `category ${section.key} weight drift`);
  const markerTotal = section.markerWeights.reduce((sum, weight) => sum + weight, 0);
  assert(markerTotal === section.categoryWeight, `category ${section.key} marker weights total ${markerTotal}, expected ${section.categoryWeight}`);
  total += section.categoryWeight;
}
assert(total === 100, `scorecard total must be 100, found ${total}`);

for (const contract of [
  '### B4. Decision-critical expectations before commitment — 5',
  '### F1. Operable primary conversion path — 3',
  '### F3. Primary-path performance and stability — 2',
]) {
  const start = markers.indexOf(contract);
  assert(start >= 0, `missing marker decision contract: ${contract}`);
  const end = markers.indexOf('\n### ', start + contract.length);
  const section = markers.slice(start, end === -1 ? markers.length : end);
  for (const status of ['PASS', 'WATCH', 'FAIL', 'NOT_TESTED']) {
    assert(section.includes(`- \`${status}\``), `${contract} missing ${status} rule`);
  }
}

includesAll(memory, [
  '### 2026-07-19 — accepted marker changes: 3; temporary candidates accepted: 0',
  'Accepted durable marker refinements: 3',
  'Accepted temporary candidates: 0',
  'audit-sales-screenshot-evidence-overclaim',
  'Generic industry conversion-rate benchmark',
  'AI-search / GEO visibility',
], paths.memory);

includesAll(automation, [
  '## Canonical mode',
  '## Sales Audit Intelligence',
  '## Portfolio Sales Audit',
  '`/audit-sales` is the only canonical',
  '`/audit-sale` is a deprecated compatibility alias',
  'create an `/audit-sale` automation',
], paths.automation);
assert(!/^##\s+\/audit-sale\s*$/m.test(automation), 'automation contract must not define an alias-owned automation');

for (const [relativePath, text] of Object.entries({
  [paths.readme]: readme,
  [paths.skillMap]: skillMap,
  [paths.agentModes]: agentModes,
})) {
  includesAll(text, ['/audit-sales', '/audit-sale', 'compatibility alias'], `${relativePath} canonical naming`);
}

includesAll(aliasStandard, [
  '/audit-sale',
  'deprecated',
  'compatibility alias',
  'systems/audit-sales.md',
  'systems/audit-sales-markers.md',
], paths.aliasStandard);
includesAll(aliasMarkers, [
  '/audit-sale',
  'deprecated',
  'systems/audit-sales-markers.md',
], paths.aliasMarkers);
assert(!/—\s*\d+/.test(aliasStandard), `${paths.aliasStandard} must not define weighted markers`);
assert(!/—\s*\d+/.test(aliasMarkers), `${paths.aliasMarkers} must not define weighted markers`);
assert(!/audit-sale-memory|audit-sale-regression|validate-audit-sale\b/.test(`${aliasStandard}\n${aliasMarkers}`), 'compatibility aliases must not own memory, regressions, or validators');

assert(regression.schema_version === 1, `${paths.regression} schema_version must be 1`);
assert(regression.last_updated === '2026-07-19', `${paths.regression} last_updated drift`);
assert(regression.canonical_mode === '/audit-sales', `${paths.regression} canonical_mode must be /audit-sales`);
assert(regression.compatibility_alias === '/audit-sale', `${paths.regression} compatibility_alias must be /audit-sale`);
assert(Array.isArray(regression.failure_classes) && regression.failure_classes.length === 1, `${paths.regression} must define exactly one new durable failure class`);

const failure = regression.failure_classes[0];
assert(failure.id === 'audit-sales-screenshot-evidence-overclaim', 'unexpected audit-sales failure class');
assert(failure.status === 'active', 'audit-sales failure class must be active');
assert(failure.replay_case?.must_block_success === true, 'audit-sales replay must block false success');
includesAll(failure.prompt_regression.must_include.join('\n'), [
  '/audit-sales',
  'NOT_TESTED',
  'decision-critical',
  'keyboard',
  'Core Web Vitals',
], 'audit-sales prompt regression');
assert(Array.isArray(failure.behavior_fixture?.sample_outputs) && failure.behavior_fixture.sample_outputs.length >= 2, 'audit-sales behavior fixture needs at least two samples');
assert(failure.behavior_fixture.sample_outputs.some((sample) => sample.should_pass === true), 'audit-sales behavior fixture needs a passing sample');
assert(failure.behavior_fixture.sample_outputs.some((sample) => sample.should_pass === false), 'audit-sales behavior fixture needs a failing sample');

for (const sample of failure.behavior_fixture.sample_outputs) {
  const actual = evaluateScreenshotEvidence(sample.output);
  assert(actual === sample.should_pass, `${failure.id}.${sample.label} expected ${sample.should_pass ? 'pass' : 'fail'} but got ${actual ? 'pass' : 'fail'}`);
}

console.log(`audit-sales validation ok: canonical mode preserved, scorecard ${total}/100, 3 durable marker refinements, 0 temporary candidates, 1 regression/replay/fixture failure class`);
