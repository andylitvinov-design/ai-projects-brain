import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const allowedStatuses = new Set(['candidate', 'active', 'needs_revision', 'deprecated', 'rejected']);
const promptPath = 'projects/codex-automation/prompt-regression-tests.json';
const replayPath = 'projects/codex-automation/failure-replay-cases.json';
const behaviorPath = 'projects/codex-automation/behavior-replay-fixtures.json';
const registryPath = 'projects/codex-automation/automation-prompt-registry.json';
const metricsPath = 'projects/codex-automation/agent-learning-metrics.md';
const workflowPath = '.github/workflows/agent-harness-validators.yml';
const evidenceRunnerPath = 'scripts/run-agent-harness-validation-evidence.mjs';

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

function assertText(value, message) {
  assert(typeof value === 'string' && value.trim(), message);
}

function assertTextArray(value, message, allowEmpty = false) {
  assert(Array.isArray(value), message);
  assert(allowEmpty || value.length > 0, `${message} must not be empty`);
  value.forEach((item, index) => assertText(item, `${message}[${index}] must be text`));
}

function assertUnique(ids, message) {
  const seen = new Set();
  for (const id of ids) {
    assert(!seen.has(id), `${message} duplicate: ${id}`);
    seen.add(id);
  }
}

function byId(items, id, message) {
  const found = items.find((item) => item.id === id);
  assert(found, `${message} missing ${id}`);
  return found;
}

function metricCount(metricsText, metricName) {
  for (const line of metricsText.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells[0] !== metricName) continue;
    const count = Number.parseInt(cells[1], 10);
    assert(Number.isFinite(count), `metric ${metricName} count must be numeric`);
    return count;
  }
  fail(`metric missing: ${metricName}`);
}

function assertMetricEquals(metricsText, metricName, expected) {
  const actual = metricCount(metricsText, metricName);
  assert(actual === expected, `metric ${metricName} expected ${expected}, found ${actual}`);
}

function assertMetricAtLeast(metricsText, metricName, minimum) {
  const actual = metricCount(metricsText, metricName);
  assert(actual >= minimum, `metric ${metricName} expected at least ${minimum}, found ${actual}`);
}

function validateStatus(value, message) {
  assert(allowedStatuses.has(value), `${message} invalid`);
}

function validateKebabId(id, message) {
  assertText(id, `${message} required`);
  assert(/^[a-z0-9][a-z0-9-]*$/.test(id), `${message} must be kebab-case`);
}

const prompts = readJson(promptPath);
assert(prompts.schema_version === 1, `${promptPath} schema_version must be 1`);
assertText(prompts.last_updated, `${promptPath} needs last_updated`);
assert(Array.isArray(prompts.tests) && prompts.tests.length > 0, `${promptPath} needs tests`);
assertUnique(prompts.tests.map((test) => test.id), `${promptPath} tests`);
for (const [index, test] of prompts.tests.entries()) {
  const prefix = `${promptPath}.tests[${index}]`;
  validateKebabId(test.id, `${prefix}.id`);
  validateStatus(test.status, `${prefix}.status`);
  assertText(test.description, `${prefix}.description required`);
  assertText(test.input_prompt, `${prefix}.input_prompt required`);
  assertTextArray(test.must_include, `${prefix}.must_include`);
  if (test.alternative_must_include !== undefined) assertTextArray(test.alternative_must_include, `${prefix}.alternative_must_include`);
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
  validateKebabId(item.id, `${prefix}.id`);
  validateStatus(item.status, `${prefix}.status`);
  for (const field of ['source', 'pattern', 'input_signal', 'expected_behavior', 'suggested_route']) assertText(item[field], `${prefix}.${field} required`);
  assert(typeof item.must_block_success === 'boolean', `${prefix}.must_block_success required`);
}

const behavior = readJson(behaviorPath);
assert(behavior.schema_version === 1, `${behaviorPath} schema_version must be 1`);
assertText(behavior.last_updated, `${behaviorPath} needs last_updated`);
assert(behavior.runner === 'scripts/run-behavior-replay-fixtures.mjs', `${behaviorPath} runner must point to scripts/run-behavior-replay-fixtures.mjs`);
assert(Array.isArray(behavior.fixtures) && behavior.fixtures.length > 0, `${behaviorPath} needs fixtures`);
assertUnique(behavior.fixtures.map((fixture) => fixture.id), `${behaviorPath} fixtures`);
for (const [index, fixture] of behavior.fixtures.entries()) {
  const prefix = `${behaviorPath}.fixtures[${index}]`;
  validateKebabId(fixture.id, `${prefix}.id`);
  validateStatus(fixture.status, `${prefix}.status`);
  assertText(fixture.source, `${prefix}.source required`);
  assertText(fixture.input_signal, `${prefix}.input_signal required`);
  byId(prompts.tests, fixture.id, `${behaviorPath} fixture must map to prompt regression test`);
  byId(replays.cases, fixture.id, `${behaviorPath} fixture must map to replay case`);
  assert(Array.isArray(fixture.sample_outputs) && fixture.sample_outputs.length >= 2, `${prefix}.sample_outputs needs at least two samples`);
  assert(fixture.sample_outputs.some((sample) => sample.should_pass === true), `${prefix}.sample_outputs needs a passing sample`);
  assert(fixture.sample_outputs.some((sample) => sample.should_pass === false), `${prefix}.sample_outputs needs a failing sample`);
  for (const [sampleIndex, sample] of fixture.sample_outputs.entries()) {
    const samplePrefix = `${prefix}.sample_outputs[${sampleIndex}]`;
    assertText(sample.label, `${samplePrefix}.label required`);
    assertText(sample.output, `${samplePrefix}.output required`);
    assert(typeof sample.should_pass === 'boolean', `${samplePrefix}.should_pass must be boolean`);
    assertText(sample.reason, `${samplePrefix}.reason required`);
  }
}

for (const id of ['provider-dependent-feature-without-provider-proof', 'daily-improve-strategic-portfolio-not-only-bugs', 'morning-upgrade-report-only-without-applied-upgrade']) {
  byId(prompts.tests, id, promptPath);
  byId(replays.cases, id, replayPath);
  byId(behavior.fixtures, id, behaviorPath);
}

const providerPrompt = byId(prompts.tests, 'provider-dependent-feature-without-provider-proof', promptPath);
assert(providerPrompt.must_include.includes('NEEDS_VERIFICATION'), 'provider prompt must require NEEDS_VERIFICATION');
assert(providerPrompt.must_not_include.includes('STATUS: SUCCESS'), 'provider prompt must block false success wording');
assert(byId(replays.cases, 'provider-dependent-feature-without-provider-proof', replayPath).must_block_success === true, 'provider replay must block success');
assert(replays.cases.filter((item) => item.must_block_success).length >= 3, 'expected at least 3 must-block-success replay cases');

const dailyImprovePrompt = byId(prompts.tests, 'daily-improve-strategic-portfolio-not-only-bugs', promptPath);
for (const expected of ['cross-project strategic summary', 'project strategic cards', 'ready prompts']) assert(dailyImprovePrompt.must_include.includes(expected), `Daily Improve prompt must include ${expected}`);
const morningPrompt = byId(prompts.tests, 'morning-upgrade-must-apply-or-prove-no-safe-upgrade', promptPath);
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
assert(morning.must_do.some((item) => /validate-agentic-prompts/.test(item)), 'Morning Upgrade must keep validator maintenance in contract');
assert(morning.must_do.some((item) => /behavior replay/i.test(item)), 'Morning Upgrade must keep behavior replay fixture maintenance in contract');

const evidenceRunnerText = readText(evidenceRunnerPath);
for (const expected of [
  'scripts/validate-agentic-prompts.mjs',
  'scripts/run-behavior-replay-fixtures.mjs',
  'scripts/verify-context-scout.mjs',
  'scripts/validate-projects-brain.mjs',
  'validate-agentic-prompts.log',
  'run-behavior-replay-fixtures.log',
  'verify-context-scout.log',
  'validate-projects-brain.log',
]) assert(evidenceRunnerText.includes(expected), `${evidenceRunnerPath} must run and log ${expected}`);
for (const expected of ['rmSync', 'agent-harness-validation-evidence', 'process.exitCode = 1']) assert(evidenceRunnerText.includes(expected), `${evidenceRunnerPath} must enforce evidence lifecycle: ${expected}`);

const workflowText = readText(workflowPath);
for (const expected of ['pull_request:', 'push:', 'workflow_dispatch:', 'node scripts/run-agent-harness-validation-evidence.mjs']) assert(workflowText.includes(expected), `${workflowPath} must include ${expected}`);
for (const expected of ['agent-harness-validation-evidence', 'actions/upload-artifact@v4']) assert(workflowText.includes(expected), `${workflowPath} must upload raw validator evidence artifact: ${expected}`);

const metricsText = readText(metricsPath);
assertMetricEquals(metricsText, 'replay cases defined', replays.cases.length);
assertMetricEquals(metricsText, 'prompt regressions defined', prompts.tests.length);
assertMetricEquals(metricsText, 'behavior replay fixtures defined', behavior.fixtures.length);
assertMetricAtLeast(metricsText, 'feedback-loop validators defined', 1);
assertMetricAtLeast(metricsText, 'behavior replay runners defined', 1);
assertMetricAtLeast(metricsText, 'validation CI workflows defined', 1);
metricCount(metricsText, 'validation commands run');
for (const requiredTemplateMetric of ['validation_passed:', 'validation_failed:', 'replay_case_passed:', 'prompt_regression_passed:', 'behavior_replay_fixture_passed:', 'behavior_replay_fixture_failed:']) assert(metricsText.includes(requiredTemplateMetric), `${metricsPath} template missing ${requiredTemplateMetric}`);

console.log(`agentic prompt validation ok: ${prompts.tests.length} prompt regressions, ${replays.cases.length} replay cases, ${behavior.fixtures.length} behavior fixtures, ${registry.automations.length} automation contracts, metrics aligned, fixture-to-prompt coverage checked, CI workflow defined, unified raw evidence runner contract checked`);
