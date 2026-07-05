import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const allowedStatuses = new Set(['candidate', 'active', 'needs_revision', 'deprecated', 'rejected']);

function fail(message) {
  throw new Error(message);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function assertText(value, message) {
  assert(typeof value === 'string' && value.trim(), message);
}

function assertTextArray(value, message, allowEmpty = false) {
  assert(Array.isArray(value), message);
  assert(allowEmpty || value.length > 0, `${message} must not be empty`);
  value.forEach((item, index) => assertText(item, `${message}[${index}] must be text`));
}

function assertUnique(values, message) {
  const seen = new Set();
  for (const value of values) {
    assert(!seen.has(value), `${message} duplicate: ${value}`);
    seen.add(value);
  }
}

function byId(items, id, message) {
  const found = items.find((item) => item.id === id);
  assert(found, `${message} missing ${id}`);
  return found;
}

const promptPath = 'projects/codex-automation/prompt-regression-tests.json';
const replayPath = 'projects/codex-automation/failure-replay-cases.json';
const registryPath = 'projects/codex-automation/automation-prompt-registry.json';

const prompts = readJson(promptPath);
assert(prompts.schema_version === 1, `${promptPath} schema_version must be 1`);
assertText(prompts.last_updated, `${promptPath} needs last_updated`);
assert(Array.isArray(prompts.tests) && prompts.tests.length > 0, `${promptPath} needs tests`);
assertUnique(prompts.tests.map((test) => test.id), `${promptPath} tests`);

for (const [index, test] of prompts.tests.entries()) {
  const prefix = `${promptPath}.tests[${index}]`;
  assertText(test.id, `${prefix}.id required`);
  assert(/^[a-z0-9][a-z0-9-]*$/.test(test.id), `${prefix}.id must be kebab-case`);
  assert(allowedStatuses.has(test.status), `${prefix}.status invalid`);
  assertText(test.description, `${prefix}.description required`);
  assertText(test.input_prompt, `${prefix}.input_prompt required`);
  assertTextArray(test.must_include, `${prefix}.must_include`);
  if (test.alternative_must_include !== undefined) {
    assertTextArray(test.alternative_must_include, `${prefix}.alternative_must_include`);
  }
  assertTextArray(test.must_not_include, `${prefix}.must_not_include`, true);
  assertText(test.expected_route, `${prefix}.expected_route required`);
}

const replays = readJson(replayPath);
assert(replays.schema_version === 1, `${replayPath} schema_version must be 1`);
assertText(replays.last_updated, `${replayPath} needs last_updated`);
assert(Array.isArray(replays.cases) && replays.cases.length > 0, `${replayPath} needs cases`);
assertUnique(replays.cases.map((item) => item.id), `${replayPath} cases`);

for (const [index, item] of replays.cases.entries()) {
  const prefix = `${replayPath}.cases[${index}]`;
  assertText(item.id, `${prefix}.id required`);
  assert(/^[a-z0-9][a-z0-9-]*$/.test(item.id), `${prefix}.id must be kebab-case`);
  assert(allowedStatuses.has(item.status), `${prefix}.status invalid`);
  assertText(item.source, `${prefix}.source required`);
  assertText(item.pattern, `${prefix}.pattern required`);
  assertText(item.input_signal, `${prefix}.input_signal required`);
  assertText(item.expected_behavior, `${prefix}.expected_behavior required`);
  assert(typeof item.must_block_success === 'boolean', `${prefix}.must_block_success required`);
  assertText(item.suggested_route, `${prefix}.suggested_route required`);
}

for (const id of [
  'provider-dependent-feature-without-provider-proof',
  'daily-improve-strategic-portfolio-not-only-bugs',
  'morning-upgrade-report-only-without-applied-upgrade',
]) {
  byId(prompts.tests, id, promptPath);
  byId(replays.cases, id, replayPath);
}

const providerPrompt = byId(prompts.tests, 'provider-dependent-feature-without-provider-proof', promptPath);
assert(providerPrompt.must_include.includes('NEEDS_VERIFICATION'), 'provider prompt must require NEEDS_VERIFICATION');
assert(providerPrompt.must_not_include.includes('STATUS: SUCCESS'), 'provider prompt must block false success wording');
assert(byId(replays.cases, 'provider-dependent-feature-without-provider-proof', replayPath).must_block_success === true, 'provider replay must block success');

const dailyImprovePrompt = byId(prompts.tests, 'daily-improve-strategic-portfolio-not-only-bugs', promptPath);
for (const expected of ['cross-project strategic summary', 'project strategic cards', 'ready prompts']) {
  assert(dailyImprovePrompt.must_include.includes(expected), `Daily Improve prompt must include ${expected}`);
}

const morningPrompt = byId(prompts.tests, 'morning-upgrade-report-only-without-applied-upgrade', promptPath);
assert(morningPrompt.must_include.includes('APPLIED_UPGRADE'), 'Morning prompt must include APPLIED_UPGRADE');
assert(morningPrompt.alternative_must_include?.includes('NO_SAFE_UPGRADE'), 'Morning prompt must allow NO_SAFE_UPGRADE');

const registry = readJson(registryPath);
assert(registry.schema_version === 1, `${registryPath} schema_version must be 1`);
assert(Array.isArray(registry.automations) && registry.automations.length > 0, `${registryPath} needs automations`);
assertUnique(registry.automations.map((item) => item.title), `${registryPath} automations`);

const daily = registry.automations.find((item) => item.title === 'Daily Improve Sweep');
assert(daily, 'registry must include Daily Improve Sweep');
assert(/strategic|portfolio|vision/i.test(daily.role), 'Daily Improve must keep strategic role');
assert(daily.must_do.some((item) => /cross-project|project cards|ready prompts/i.test(item)), 'Daily Improve must require portfolio output');

const morning = registry.automations.find((item) => item.title === 'Morning System Upgrade');
assert(morning, 'registry must include Morning System Upgrade');
assert(morning.must_do.some((item) => /APPLIED_UPGRADE|NO_SAFE_UPGRADE/.test(item)), 'Morning Upgrade must require APPLIED_UPGRADE or NO_SAFE_UPGRADE');

console.log(`agentic prompt validation ok: ${prompts.tests.length} prompt regressions, ${replays.cases.length} replay cases, ${registry.automations.length} automation contracts`);
