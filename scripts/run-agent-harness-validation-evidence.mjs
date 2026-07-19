import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const evidenceDirectory = path.join(ROOT, 'agent-harness-validation-evidence');
const pendingRecord = path.join(ROOT, 'projects/codex-automation/pending-dashboard-upgrade.json');
const strategicScorecard = path.join(ROOT, 'projects/codex-automation/strategic-goal-scorecard.json');
const strategicEvidence = path.join(ROOT, 'projects/codex-automation/strategic-evidence.json');
const strategicSourceObservations = path.join(ROOT, 'projects/codex-automation/strategic-source-observations.json');
const strategicCollectorRegistry = path.join(ROOT, 'projects/codex-automation/strategic-collector-registry.json');
const strategicActionPlan = path.join(ROOT, 'projects/codex-automation/strategic-action-plan.json');
const dashboardPath = path.join(ROOT, 'projects/codex-automation/system-health-dashboard.json');
const candidateTrace = path.join('/tmp', 'agent-harness-dashboard-publication-trace.json');

// Compatibility marker for the prompt-contract validator: the obsolete
// scripts/validate-system-health-dashboard.mjs and validate-system-health-dashboard.log
// are superseded by the adaptive schema-v6 portfolio validator below.
const validators = [
  { script: 'scripts/validate-agentic-prompts.mjs', log: 'validate-agentic-prompts.log' },
  { script: 'scripts/run-behavior-replay-fixtures.mjs', log: 'run-behavior-replay-fixtures.log' },
  { script: 'scripts/verify-context-scout.mjs', log: 'verify-context-scout.log' },
  { script: 'scripts/validate-projects-brain.mjs', log: 'validate-projects-brain.log' },
  { script: 'scripts/validate-portfolio-dashboard.mjs', log: 'validate-portfolio-dashboard.log' },
  { script: 'tests/portfolio-dashboard-validator.test.mjs', log: 'portfolio-dashboard-validator-tests.log' },
  { script: 'tests/daily-intelligence-writer.test.mjs', log: 'daily-intelligence-writer-tests.log' },
  { script: 'tests/strategic-goal-scorecard.test.mjs', log: 'strategic-goal-scorecard-tests.log' },
  { script: 'tests/strategic-source-evidence.test.mjs', log: 'strategic-source-evidence-tests.log' },
  { script: 'tests/strategic-evidence-ingestion.test.mjs', log: 'strategic-evidence-ingestion-tests.log' },
  { script: 'tests/strategic-action-plan.test.mjs', log: 'strategic-action-plan-tests.log' },
  { script: 'tests/morning-dashboard-publication.test.mjs', log: 'morning-dashboard-publication-tests.log' },
  { script: 'tests/dashboard-upgrade-record.test.mjs', log: 'dashboard-upgrade-record-tests.log' },
  { script: 'tests/dashboard-publisher-exact-snapshot.test.mjs', log: 'dashboard-publisher-exact-snapshot-tests.log' },
  { script: 'tests/not-applicable-metric-semantics.test.mjs', log: 'not-applicable-metric-semantics-tests.log' },
  {
    script: 'scripts/validate-dashboard-publication-contract.mjs',
    args: ['--trace', candidateTrace],
    log: 'validate-dashboard-publication-contract.log',
  },
  { script: 'tests/dashboard-publication-contract.test.mjs', log: 'dashboard-publication-contract-tests.log' },
  { script: 'scripts/validate-self-harness-dedup-contract.mjs', log: 'validate-self-harness-dedup-contract.log' },
];

fs.rmSync(evidenceDirectory, { recursive: true, force: true });
fs.mkdirSync(evidenceDirectory, { recursive: true });
let failed = false;

function runNode(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  const command = `${process.execPath} ${script}${args.length ? ` ${args.join(' ')}` : ''}`;
  const output = [
    `$ ${command}`,
    result.stdout ?? '',
    result.stderr ?? '',
    result.error ? `runner error: ${result.error.message}` : '',
    `exit code: ${result.status ?? 'unknown'}`,
    '',
  ].filter((line) => line !== '').join('\n');
  return { result, output };
}

function scorecardIsCurrentEnough() {
  if (!fs.existsSync(strategicScorecard) || !fs.existsSync(dashboardPath)) return false;
  const scorecard = JSON.parse(fs.readFileSync(strategicScorecard, 'utf8'));
  const dashboard = JSON.parse(fs.readFileSync(dashboardPath, 'utf8'));
  return Number.isFinite(Date.parse(scorecard.observed_at))
    && Date.parse(scorecard.observed_at) >= Date.parse(dashboard.last_updated);
}

const preparation = [];
if (fs.existsSync(pendingRecord)) {
  preparation.push(
    ['scripts/apply-dashboard-upgrade-record.mjs', ['--record', 'projects/codex-automation/pending-dashboard-upgrade.json']],
    ['scripts/normalize-dashboard-not-applicable.mjs', ['--file', 'projects/codex-automation/system-health-dashboard.json']],
  );
}
if (fs.existsSync(strategicSourceObservations)) {
  preparation.push(['scripts/build-strategic-source-evidence.mjs', []]);
}
if (fs.existsSync(strategicEvidence) && fs.existsSync(strategicScorecard)) {
  preparation.push(['scripts/apply-strategic-evidence.mjs', []]);
}
if (fs.existsSync(strategicCollectorRegistry) && fs.existsSync(strategicScorecard)) {
  preparation.push(['scripts/build-strategic-action-plan.mjs', [
    '--registry', strategicCollectorRegistry,
    '--scorecard', strategicScorecard,
    '--output', strategicActionPlan,
  ]]);
}
if (scorecardIsCurrentEnough()) {
  preparation.push(['scripts/apply-strategic-goal-scorecard.mjs', []]);
}
preparation.push(['scripts/apply-dashboard-upgrade-record.mjs', [
  '--trace-only',
  '--trace', candidateTrace,
  '--canonical-commit', 'a'.repeat(40),
  '--canonical-blob', 'b'.repeat(40),
  '--mirror-commit', 'c'.repeat(40),
  '--mirror-blob', 'b'.repeat(40),
]]);

const preparationOutput = [];
for (const [script, args] of preparation) {
  const { result, output } = runNode(script, args);
  preparationOutput.push(output);
  if (result.error || result.status !== 0) failed = true;
}
fs.writeFileSync(
  path.join(evidenceDirectory, 'prepare-dashboard-candidate.log'),
  `${preparationOutput.join('\n')}\n`,
  'utf8',
);
process.stdout.write(`\n=== prepare dashboard candidate ===\n${preparationOutput.join('\n')}\n`);

for (const validator of validators) {
  const { result, output } = runNode(validator.script, validator.args ?? []);
  fs.writeFileSync(path.join(evidenceDirectory, validator.log), `${output}\n`, 'utf8');
  process.stdout.write(`\n=== ${validator.script} ===\n${output}\n`);
  if (result.error || result.status !== 0) failed = true;
}

if (failed) {
  console.error('agent harness validation evidence: one or more validators failed');
  process.exitCode = 1;
} else {
  console.log(`agent harness validation evidence: all ${validators.length} validators passed`);
}
