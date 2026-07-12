import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const skillPath = 'agent-skills/self-harness.md';
const fixturePath = 'projects/codex-automation/self-harness-dedup-regression.json';

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

function lower(value) {
  return String(value ?? '').toLowerCase();
}

function includesAll(text, tokens) {
  const value = lower(text);
  return tokens.every((token) => value.includes(token.toLowerCase()));
}

function includesAny(text, tokens) {
  const value = lower(text);
  return tokens.some((token) => value.includes(token.toLowerCase()));
}

function evaluateDedupOutput(output) {
  const hasGate = includesAny(output, ['freshness / duplicate-work gate', 'fresh-main and duplicate-work gate']);
  const provesFreshness = includesAny(output, ['fresh main checked', 're-fetched current main', 're-fetch current main']);
  const searchesDuplicates = includesAny(output, ['searched open and recently closed prs', 'open/recent pr search', 'search open and recently closed prs']);
  const namesCollisionKey = includesAny(output, ['failure id', 'handoff', 'issue', 'target file', 'target files']);
  const safeResolution = includesAny(output, ['superseded_by_main', 'reuse existing pr', 'reused existing pr', 'minimal salvage', 'salvaged onto fresh main']);
  const repeatsBeforeMerge = includesAny(output, ['immediately before merge', 'before pr creation', 'gate repeated']);
  const badStaleWork = includesAny(output, [
    'did not re-check current main',
    'mergeability is enough',
    'created another pr with the same target files',
    'opened a new harness pr',
  ]);

  return hasGate
    && provesFreshness
    && searchesDuplicates
    && namesCollisionKey
    && safeResolution
    && repeatsBeforeMerge
    && !badStaleWork;
}

const skill = readText(skillPath);
for (const expected of [
  'Fresh-main and duplicate-work gate',
  'Re-fetch current `main`',
  'Search open and recently closed PRs',
  'SUPERSEDED_BY_MAIN',
  'reuse or update it instead of opening a parallel PR',
  'salvage the smallest needed hunk onto fresh `main`',
  'Repeat this gate immediately before PR creation or merge',
  'Freshness / duplicate-work gate',
]) {
  assert(skill.includes(expected), `${skillPath} missing required dedup contract text: ${expected}`);
}

assert(
  /Freshness \/ duplicate-work gate:[\s\S]*fresh \/ reused existing PR \/ salvaged \/ superseded \/ not run/.test(skill),
  `${skillPath} final report schema must require Freshness / duplicate-work gate result`,
);

const fixture = readJson(fixturePath);
assert(fixture.schema_version === 1, `${fixturePath} schema_version must be 1`);
assert(fixture.id === 'duplicate-harness-pr-after-concurrent-main-update', `${fixturePath} id mismatch`);
assert(Array.isArray(fixture.required_contract) && fixture.required_contract.length >= 7, `${fixturePath} must list required contract clauses`);
assert(Array.isArray(fixture.sample_outputs) && fixture.sample_outputs.length >= 4, `${fixturePath} needs at least four sample outputs`);
assert(fixture.sample_outputs.some((sample) => sample.should_pass === true), `${fixturePath} needs a passing sample`);
assert(fixture.sample_outputs.some((sample) => sample.should_pass === false), `${fixturePath} needs a failing sample`);

let passCount = 0;
let failCount = 0;
for (const [index, sample] of fixture.sample_outputs.entries()) {
  const prefix = `${fixturePath}.sample_outputs[${index}]`;
  assert(typeof sample.label === 'string' && sample.label, `${prefix}.label required`);
  assert(typeof sample.output === 'string' && sample.output, `${prefix}.output required`);
  assert(typeof sample.should_pass === 'boolean', `${prefix}.should_pass required`);
  assert(typeof sample.reason === 'string' && sample.reason, `${prefix}.reason required`);
  const actual = evaluateDedupOutput(sample.output);
  assert(actual === sample.should_pass, `${sample.label} expected ${sample.should_pass ? 'pass' : 'fail'} but got ${actual ? 'pass' : 'fail'}`);
  if (sample.should_pass) passCount += 1;
  else failCount += 1;
}

console.log(`self-harness dedup contract ok: ${fixture.sample_outputs.length} samples (${passCount} expected pass, ${failCount} expected fail)`);
