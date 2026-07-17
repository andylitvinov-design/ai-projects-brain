import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/publish-system-health-dashboard.yml', 'utf8');
const runtimeContract = fs.readFileSync('systems/evening-upgrade-runtime-contract.md', 'utf8');

test('publisher does not execute a hard-coded Morning snapshot generator', () => {
  assert.doesNotMatch(workflow, /node scripts\/publish-morning-dashboard-snapshot\.mjs/);
  assert.doesNotMatch(workflow, /Generate Morning canonical candidate/);
  assert.doesNotMatch(workflow, /6a5207d064f1feba62676b5e/);
});

test('publisher applies only an explicit upgrade record and mirrors the exact JSON blob', () => {
  assert.match(workflow, /pending-dashboard-upgrade\.json/);
  assert.match(workflow, /apply-dashboard-upgrade-record\.mjs/);
  assert.match(workflow, /git hash-object projects\/codex-automation\/system-health-dashboard\.json/);
  assert.match(workflow, /canonical candidate and mirror blob differ/);
  assert.match(workflow, /validate-dashboard-publication-contract\.mjs/);
  assert.match(workflow, /client_payload/);
  assert.match(workflow, /GITHUB_SHA/);
});

test('runtime contract requires receipt-aware recovery without a second publisher', () => {
  assert.match(runtimeContract, /Trigger-independent publication recovery/);
  assert.match(runtimeContract, /only workflow allowed to deploy the dashboard or create a publication receipt/);
  assert.match(runtimeContract, /must not contain Netlify credentials, provider mutation logic or direct deployment commands/);
  assert.match(runtimeContract, /valid matching receipt and equal public timestamp require a healthy no-op/);
  assert.match(runtimeContract, /retry commit, queued workflow or dispatch request is not publication evidence/i);
});
