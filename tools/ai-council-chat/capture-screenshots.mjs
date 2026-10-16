import fs from 'node:fs/promises';
import path from 'node:path';
import { CAPTURE_PAGES, SITE_ORIGIN, emptyPageEvidence, capturePageEvidence, buildManifest } from './screenshot-evidence.mjs';

const out = path.resolve('screenshots');
await fs.mkdir(out, { recursive: true });
const list = CAPTURE_PAGES.map(([route]) => emptyPageEvidence(SITE_ORIGIN + route));
const saveManifest = async report => {
  const temporaryPath = path.join(out, 'manifest.json.tmp');
  await fs.writeFile(temporaryPath, JSON.stringify(report, null, 2) + '\n');
  await fs.rename(temporaryPath, path.join(out, 'manifest.json'));
};

// Invalidate previous evidence before import/launch. An interrupted run cannot
// publish yesterday's images with a new verification timestamp.
await saveManifest(buildManifest(list, { status: 'capturing' }));
let browser;
let failure;
try {
  const { chromium } = await import('playwright');
  browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage'], timeout: 30000 });
  for (const [index, [route, slug]] of CAPTURE_PAGES.entries()) {
    list[index] = await capturePageEvidence(browser, { requestedUrl: SITE_ORIGIN + route, slug, out });
    for (const [mode, capture] of Object.entries(list[index].captures)) {
      if (!capture.verified) console.error('Screenshot failed', list[index].page, mode, capture.error);
    }
  }
} catch (error) {
  failure = String(error?.message || error);
  console.error('Screenshot capture failed:', failure);
} finally {
  if (browser) await browser.close().catch(() => {});
  const report = buildManifest(list);
  if (failure) {
    report.status = 'failed';
    report.error = failure;
  }
  await saveManifest(report);
  if (report.status !== 'complete') process.exitCode = 1;
  console.log(JSON.stringify({ generated_at: report.generated_at, status: report.status, verified_pages: report.verified_pages, planned_pages: report.planned_pages }, null, 2));
}
