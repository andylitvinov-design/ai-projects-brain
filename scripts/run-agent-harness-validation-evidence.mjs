import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const evidenceDirectory = path.join(ROOT, 'agent-harness-validation-evidence');
const validators = [
  {
    script: 'scripts/validate-agentic-prompts.mjs',
    log: 'validate-agentic-prompts.log',
  },
  {
    script: 'scripts/run-behavior-replay-fixtures.mjs',
    log: 'run-behavior-replay-fixtures.log',
  },
  {
    script: 'scripts/verify-context-scout.mjs',
    log: 'verify-context-scout.log',
  },
  {
    script: 'scripts/validate-projects-brain.mjs',
    log: 'validate-projects-brain.log',
  },
];

fs.rmSync(evidenceDirectory, { recursive: true, force: true });
fs.mkdirSync(evidenceDirectory, { recursive: true });

let failed = false;

for (const validator of validators) {
  const command = `${process.execPath} ${validator.script}`;
  const result = spawnSync(process.execPath, [validator.script], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = [
    `$ ${command}`,
    result.stdout ?? '',
    result.stderr ?? '',
    result.error ? `runner error: ${result.error.message}` : '',
    `exit code: ${result.status ?? 'unknown'}`,
    '',
  ].filter((line) => line !== '').join('\n');

  const logPath = path.join(evidenceDirectory, validator.log);
  fs.writeFileSync(logPath, `${output}\n`, 'utf8');
  process.stdout.write(`\n=== ${validator.script} ===\n${output}\n`);

  if (result.error || result.status !== 0) {
    failed = true;
  }
}

if (failed) {
  console.error('agent harness validation evidence: one or more validators failed');
  process.exitCode = 1;
} else {
  console.log('agent harness validation evidence: all 4 validators passed');
}
