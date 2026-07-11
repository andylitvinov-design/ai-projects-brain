import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FIXTURE_PATH = 'projects/codex-automation/behavior-replay-fixtures.json';
const allowedStatuses = new Set(['candidate', 'active', 'needs_revision', 'deprecated', 'rejected']);

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function text(value) {
  return String(value ?? '').toLowerCase();
}

function includesAll(output, tokens) {
  const lower = text(output);
  return tokens.every((token) => lower.includes(token.toLowerCase()));
}

function includesAny(output, tokens) {
  const lower = text(output);
  return tokens.some((token) => lower.includes(token.toLowerCase()));
}

const evaluators = {
  'provider-dependent-feature-without-provider-proof': (output) => {
    const blocksFalseSuccess = !includesAny(output, ['status: success', 'fully fixed live']);
    const marksUnverified = includesAny(output, ['needs_verification', 'blocked', 'partial']);
    const separatesReadiness = includesAll(output, ['provider configured', 'live behavior verified']);
    return blocksFalseSuccess && marksUnverified && separatesReadiness;
  },

  'daily-improve-strategic-portfolio-not-only-bugs': (output) => {
    const hasPortfolio = includesAll(output, [
      'cross-project strategic summary',
      'project strategic cards',
      'ready prompts',
    ]);
    return hasPortfolio && !includesAny(output, ['only top blocker']);
  },

  'morning-upgrade-report-only-without-applied-upgrade': (output) => {
    const hasValidCompletion = includesAny(output, ['applied_upgrade', 'no_safe_upgrade']);
    const reportOnly = includesAny(output, ['analysis only; no action needed']);
    return hasValidCompletion && !reportOnly;
  },

  'improve-upgrade-mode-boundary-drift': (output) => {
    return includesAll(output, ['/improve', '/upgrade', 'read-only', 'safe harness'])
      && !includesAny(output, ['/improve executes product code']);
  },

  'save-memory-handoff-confusion': (output) => {
    return includesAll(output, ['/save', '/memory', '/handoff'])
      && includesAny(output, ['durable reusable', 'reads existing memory', 'operational state'])
      && !includesAny(output, ['/memory saved', 'handoff as long-term memory']);
  },

  'recurring-automation-disabled-after-successful-run': (output) => {
    const identifiesRecurring = includesAny(output, ['task type: recurring', 'recurring automation', 'recurring schedule']);
    const checksLiveState = includesAny(output, ['live enabled state', 'live scheduler state']);
    const repairsOrDefersSafely = includesAny(output, ['re-enable the existing schedule', 'needs_verification']);
    const blocksDisableAfterSuccess = !includesAny(output, [
      'disabled it after success',
      'succeeded, so i disabled',
      'successful run, so i disabled',
    ]);
    const preventsDuplicate = includesAny(output, ['no duplicate', 'do not create a new automation', 'never create a duplicate']);
    const rejectsRegistryOnlyProof = !includesAny(output, [
      'registry says active, so scheduler health is good',
      'registry status proves the scheduler is active',
    ]);
    return identifiesRecurring
      && checksLiveState
      && repairsOrDefersSafely
      && blocksDisableAfterSuccess
      && preventsDuplicate
      && rejectsRegistryOnlyProof;
  },
};

const fixtures = readJson(FIXTURE_PATH);
assert(fixtures.schema_version === 1, `${FIXTURE_PATH} schema_version must be 1`);
assert(typeof fixtures.last_updated === 'string' && fixtures.last_updated, `${FIXTURE_PATH} needs last_updated`);
assert(fixtures.runner === 'scripts/run-behavior-replay-fixtures.mjs', `${FIXTURE_PATH} runner must point to this script`);
assert(Array.isArray(fixtures.fixtures) && fixtures.fixtures.length > 0, `${FIXTURE_PATH} needs fixtures`);

let sampleCount = 0;
let expectedPassCount = 0;
let expectedFailCount = 0;
const seen = new Set();

for (const fixture of fixtures.fixtures) {
  assert(typeof fixture.id === 'string' && fixture.id, 'fixture.id required');
  assert(!seen.has(fixture.id), `duplicate fixture id: ${fixture.id}`);
  seen.add(fixture.id);
  assert(allowedStatuses.has(fixture.status), `${fixture.id} has invalid status`);
  assert(typeof fixture.source === 'string' && fixture.source, `${fixture.id} needs source`);
  assert(typeof fixture.input_signal === 'string' && fixture.input_signal, `${fixture.id} needs input_signal`);
  assert(Array.isArray(fixture.sample_outputs) && fixture.sample_outputs.length >= 2, `${fixture.id} needs at least two sample_outputs`);

  const evaluator = evaluators[fixture.id];
  assert(evaluator, `missing evaluator for ${fixture.id}`);

  const hasExpectedPass = fixture.sample_outputs.some((sample) => sample.should_pass === true);
  const hasExpectedFail = fixture.sample_outputs.some((sample) => sample.should_pass === false);
  assert(hasExpectedPass && hasExpectedFail, `${fixture.id} must include both passing and failing samples`);

  for (const sample of fixture.sample_outputs) {
    assert(typeof sample.label === 'string' && sample.label, `${fixture.id} sample label required`);
    assert(typeof sample.output === 'string' && sample.output, `${fixture.id}.${sample.label} output required`);
    assert(typeof sample.should_pass === 'boolean', `${fixture.id}.${sample.label} should_pass must be boolean`);
    assert(typeof sample.reason === 'string' && sample.reason, `${fixture.id}.${sample.label} reason required`);

    const actual = evaluator(sample.output);
    assert(actual === sample.should_pass, `${fixture.id}.${sample.label} expected ${sample.should_pass ? 'pass' : 'fail'} but got ${actual ? 'pass' : 'fail'}`);

    sampleCount += 1;
    if (sample.should_pass) expectedPassCount += 1;
    else expectedFailCount += 1;
  }
}

console.log(`behavior replay fixtures ok: ${fixtures.fixtures.length} fixtures, ${sampleCount} samples (${expectedPassCount} expected pass, ${expectedFailCount} expected fail)`);
