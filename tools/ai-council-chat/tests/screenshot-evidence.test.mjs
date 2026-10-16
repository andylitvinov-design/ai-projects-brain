import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  CAPTURE_PAGES, SITE_ORIGIN, ASSET_ORIGIN, VIEWPORTS, captureOptions,
  jpegDimensions, validateViewport, validateJpeg, validatePageIdentity,
  emptyPageEvidence, capturePageEvidence, buildManifest
} from '../screenshot-evidence.mjs';

// In-memory JPEG header/scan bytes exercise the parser only. These are not
// browser screenshots, are never written to disk, and never become evidence.
function jpegHeaderFixture(width, height, marker = 0xc0) {
  return Buffer.from([
    0xff, 0xd8,
    0xff, 0xe0, 0x00, 0x04, 0x00, 0x00,
    0xff, marker, 0x00, 0x0b, 0x08, height >> 8, height & 255, width >> 8, width & 255, 1, 1, 0x11, 0,
    0xff, 0xda, 0x00, 0x08, 1, 1, 0, 0, 63, 0,
    0x00, 0xff, 0xd9
  ]);
}

function captureHarness(overrides = {}) {
  const stored = new Map(), calls = [], closed = [];
  const requestedUrl = SITE_ORIGIN + '/en/services';
  const files = {
    async rm(filePath) { calls.push(['remove', filePath]); stored.delete(filePath); },
    async writeFile(filePath, bytes, options) {
      calls.push(['writeFile', filePath, options]);
      if (overrides.writeError) throw new Error('Disk unavailable');
      if (options?.flag === 'wx' && stored.has(filePath)) throw Object.assign(new Error('File exists'), { code: 'EEXIST' });
      stored.set(filePath, Buffer.from(bytes));
    },
    async link(source, destination) {
      calls.push(['link', source, destination]);
      if (overrides.linkError) throw new Error('Cannot publish screenshot');
      if (stored.has(destination)) throw Object.assign(new Error('File exists'), { code: 'EEXIST' });
      stored.set(destination, Buffer.from(stored.get(source)));
    },
    async readFile(filePath) {
      if (overrides.readError) throw new Error('Saved screenshot missing');
      if (overrides.corruptPublishedBytes && filePath.endsWith('.jpg')) return jpegHeaderFixture(1280, 720);
      return overrides.corruptStoredBytes ? jpegHeaderFixture(1280, 720) : stored.get(filePath);
    }
  };
  const browser = {
    async newPage(options) {
      const mode = options.isMobile ? 'mobile' : 'desktop';
      calls.push(['newPage', options]);
      if (overrides.newPageError === mode) throw new Error('Page creation failed');
      const viewport = overrides.viewport?.[mode] || options.viewport;
      return {
        setDefaultTimeout(value) { calls.push(['defaultTimeout', value]); },
        async goto(url, navigationOptions) {
          calls.push(['goto', url, navigationOptions]);
          if (overrides.gotoError === mode) throw new Error('Navigation timed out');
          if (overrides.missingResponse) return null;
          return { status: () => overrides.status ?? 200, headers: () => ({ 'content-type': overrides.contentType || 'text/html; charset=utf-8' }) };
        },
        url: () => overrides.finalUrl || requestedUrl,
        async waitForLoadState() {},
        async waitForFunction(fn) {
          if (overrides.emptyBody && String(fn).includes('innerText')) throw new Error('Empty page');
          if (overrides.fontTimeout && String(fn).includes('document.fonts')) throw new Error('Font timeout');
        },
        viewportSize: () => viewport,
        async evaluate() { return { ...viewport, ratio: overrides.pixelRatio ?? 1 }; },
        async screenshot(options) {
          calls.push(['screenshot', mode, options]);
          if (overrides.screenshotError === mode) throw new Error('Screenshot failed');
          const dimensions = overrides.jpeg?.[mode] || VIEWPORTS[mode];
          const bytes = jpegHeaderFixture(dimensions.width, dimensions.height);
          bytes[bytes.length - 3] = overrides.scanByte || 0;
          return bytes;
        },
        async close() { closed.push(mode); }
      };
    }
  };
  const run = () => capturePageEvidence(browser, { requestedUrl, slug: 'en-services', out: '/memory-only', files, now: () => '2026-10-16T23:00:00.000Z' });
  return { run, stored, calls, closed };
}

test('desktop/mobile dimensions are nested inside Playwright viewport options', () => {
  for (const mode of ['desktop', 'mobile']) {
    const options = captureOptions(mode);
    assert.deepEqual(options.viewport, VIEWPORTS[mode]);
    assert.equal(options.width, undefined);
    assert.equal(options.height, undefined);
    assert.equal(options.deviceScaleFactor, 1);
    assert.equal(options.isMobile, mode === 'mobile');
    assert.equal(options.hasTouch, mode === 'mobile');
  }
  captureOptions('mobile').viewport.width = 1280;
  assert.equal(captureOptions('mobile').viewport.width, 390);
  assert.throws(() => captureOptions('tablet'), /Unknown screenshot mode/);
});

test('JPEG dimensions are read from baseline and progressive frame bytes', () => {
  assert.deepEqual(jpegDimensions(jpegHeaderFixture(1440, 900)), VIEWPORTS.desktop);
  assert.deepEqual(jpegDimensions(jpegHeaderFixture(390, 844, 0xc2)), VIEWPORTS.mobile);
  assert.throws(() => validateJpeg('mobile', jpegHeaderFixture(1280, 720)), /JPEG dimensions mismatch/);
});

test('truncated, missing-frame, malformed and non-JPEG data cannot be verified', () => {
  const valid = jpegHeaderFixture(390, 844);
  assert.throws(() => jpegDimensions(valid.subarray(0, valid.length - 2)), /complete JPEG/);
  assert.throws(() => jpegDimensions(Buffer.from('a filename ending in .jpg is not an image')), /complete JPEG/);
  assert.throws(() => jpegDimensions(jpegHeaderFixture(0, 844)), /frame dimensions/);
  const wrongLength = Buffer.from(valid); wrongLength[11] = 255;
  assert.throws(() => jpegDimensions(wrongLength), /segment length/);
  assert.throws(() => jpegDimensions(Buffer.from([0xff, 0xd8, 0xff, 0xd9])), /no image scan/);
});

test('configured viewport and device pixel ratio must match the capture mode', () => {
  validateViewport('mobile', { width: 390, height: 844 }, 1);
  assert.throws(() => validateViewport('mobile', { width: 1280, height: 720 }, 1), /Viewport mismatch/);
  assert.throws(() => validateViewport('mobile', null, 1), /Viewport mismatch/);
  assert.throws(() => validateViewport('mobile', VIEWPORTS.mobile, 2), /pixel ratio mismatch/);
});

test('final URL checks reject HTTP errors, private/off-site routes and wrong service pages', () => {
  validatePageIdentity(SITE_ORIGIN + '/', SITE_ORIGIN + '/en', 200);
  validatePageIdentity(SITE_ORIGIN + '/en/services', SITE_ORIGIN + '/en/services/', 200);
  for (const finalUrl of [SITE_ORIGIN + '/en', SITE_ORIGIN + '/ru/services', SITE_ORIGIN + '/login', SITE_ORIGIN + '/en/services?private=1', 'https://example.com/en/services']) {
    assert.throws(() => validatePageIdentity(SITE_ORIGIN + '/en/services', finalUrl, 200));
  }
  for (const status of [null, 301, 404, 500]) assert.throws(() => validatePageIdentity(SITE_ORIGIN + '/en', SITE_ORIGIN + '/en', status), /HTTP/);
  assert.throws(() => validatePageIdentity(SITE_ORIGIN + '/private', SITE_ORIGIN + '/private', 200), /public capture list/);
});

test('unapproved targets and mismatched filenames are rejected before browser or filesystem work', async () => {
  const browser = { newPage() { assert.fail('An unapproved target must not reach a browser'); } };
  for (const [requestedUrl, slug] of [[SITE_ORIGIN + '/private', 'private'], [SITE_ORIGIN + '/en', '../en'], ['https://example.com/en', 'en']]) {
    await assert.rejects(capturePageEvidence(browser, { requestedUrl, slug, out: '/must-not-write' }), /approved public capture plan/);
  }
});

test('success records exact byte dimensions, viewport, provenance and saved-byte hash for both modes', async () => {
  const harness = captureHarness(), evidence = await harness.run();
  assert.equal(evidence.verified, true);
  assert.equal(evidence.desktop_url, ASSET_ORIGIN + '/screenshots/en-services-desktop-' + evidence.captures.desktop.sha256 + '.jpg');
  assert.equal(evidence.mobile_preview_url, ASSET_ORIGIN + '/screenshots/en-services-mobile-' + evidence.captures.mobile.sha256 + '.jpg');
  for (const mode of ['desktop', 'mobile']) {
    const capture = evidence.captures[mode];
    assert.equal(capture.verified, true);
    assert.deepEqual(capture.viewport, VIEWPORTS[mode]);
    assert.equal(capture.width, VIEWPORTS[mode].width);
    assert.equal(capture.height, VIEWPORTS[mode].height);
    assert.equal(capture.device_scale_factor, 1);
    assert.equal(capture.captured_at, '2026-10-16T23:00:00.000Z');
    assert.equal(capture.final_url, evidence.page);
    assert.equal(capture.http_status, 200);
    assert.match(capture.sha256, /^[0-9a-f]{64}$/);
    assert.ok(capture.byte_length > 0);
    const savedBytes = harness.stored.get('/memory-only/' + capture.url.split('/').at(-1));
    assert.equal(createHash('sha256').update(savedBytes).digest('hex'), capture.sha256);
  }
  assert.deepEqual(harness.closed, ['desktop', 'mobile']);
  assert.equal(harness.stored.size, 2);
  const screenshotOptions = harness.calls.find(call => call[0] === 'screenshot')[2];
  assert.equal(screenshotOptions.path, undefined, 'nothing is saved before byte validation');
  assert.equal(screenshotOptions.fullPage, false);
  assert.ok(screenshotOptions.timeout > 0);
});

test('wrong mobile viewport fails before capture without deleting legacy evidence', async () => {
  const harness = captureHarness({ viewport: { mobile: { width: 1280, height: 720 } } });
  harness.stored.set('/memory-only/en-services-mobile.jpg', Buffer.from('stale image'));
  const evidence = await harness.run();
  assert.equal(evidence.verified, false);
  assert.equal(evidence.captures.desktop.verified, true);
  assert.equal(evidence.captures.mobile.verified, false);
  assert.equal(evidence.mobile_preview_url, '');
  assert.match(evidence.captures.mobile.error, /Viewport mismatch/);
  assert.equal(harness.calls.some(call => call[0] === 'screenshot' && call[1] === 'mobile'), false);
  assert.equal(harness.stored.get('/memory-only/en-services-mobile.jpg').toString(), 'stale image');
  assert.equal(harness.calls.some(call => call[0] === 'remove' && call[1].endsWith('.jpg')), false);
});

test('wrong JPEG dimensions fail even when Playwright reports the requested viewport', async () => {
  const harness = captureHarness({ jpeg: { mobile: { width: 1280, height: 720 } } }), evidence = await harness.run();
  assert.equal(evidence.verified, false);
  assert.equal(evidence.captures.mobile.url, '');
  assert.match(evidence.captures.mobile.error, /JPEG dimensions mismatch/);
  assert.equal(harness.stored.has('/memory-only/en-services-mobile.jpg'), false);
});

test('navigation, creation, capture, response and storage failures all remain unverified', async () => {
  const failures = [
    { newPageError: 'mobile' }, { gotoError: 'mobile' }, { screenshotError: 'mobile' },
    { missingResponse: true }, { status: 503 }, { contentType: 'application/json' },
    { emptyBody: true }, { pixelRatio: 2 }, { writeError: true }, { readError: true },
    { corruptStoredBytes: true }, { corruptPublishedBytes: true }, { linkError: true }, { finalUrl: SITE_ORIGIN + '/en' }
  ];
  for (const failure of failures) {
    const harness = captureHarness(failure), evidence = await harness.run();
    assert.equal(evidence.verified, false, JSON.stringify(failure));
    assert.equal(evidence.captures.mobile.verified, false, JSON.stringify(failure));
    assert.equal(evidence.mobile_preview_url, '');
    assert.equal(evidence.captures.mobile.url, '');
    assert.ok(evidence.captures.mobile.error);
    assert.equal(harness.stored.has('/memory-only/en-services-mobile.jpg'), false);
    assert.equal([...harness.stored.keys()].some(filename => filename.endsWith('.tmp')), false);
  }
});

test('new captures use immutable content-addressed filenames and preserve previous audit pixels', async () => {
  const overrides = {}, harness = captureHarness(overrides);
  const first = await harness.run(), originals = new Map(harness.stored);
  overrides.scanByte = 7;
  const second = await harness.run();
  assert.equal(second.verified, true);
  assert.notEqual(second.desktop_url, first.desktop_url);
  assert.notEqual(second.mobile_preview_url, first.mobile_preview_url);
  assert.equal(harness.stored.size, 4);
  for (const [filename, bytes] of originals) assert.deepEqual(harness.stored.get(filename), bytes);
  assert.ok(harness.calls.filter(call => call[0] === 'writeFile').every(call => call[1].endsWith('.tmp') && call[2]?.flag === 'wx'));
  assert.ok(harness.calls.filter(call => call[0] === 'remove').every(call => call[1].endsWith('.tmp')));
});

test('an identical capture reuses its verified hash artifact without overwriting it', async () => {
  const harness = captureHarness();
  const first = await harness.run(), originals = new Map(harness.stored);
  const second = await harness.run();
  assert.equal(second.verified, true);
  assert.equal(second.desktop_url, first.desktop_url);
  assert.equal(second.mobile_preview_url, first.mobile_preview_url);
  assert.equal(harness.stored.size, 2);
  for (const [filename, bytes] of originals) assert.deepEqual(harness.stored.get(filename), bytes);
});

test('a failed later capture leaves every previously verified artifact intact', async () => {
  const overrides = {}, harness = captureHarness(overrides);
  await harness.run();
  const originals = new Map(harness.stored);
  overrides.scanByte = 11;
  overrides.screenshotError = 'mobile';
  const failed = await harness.run();
  assert.equal(failed.verified, false);
  assert.equal(failed.mobile_preview_url, '');
  assert.equal(failed.captures.mobile.verified, false);
  for (const [filename, bytes] of originals) assert.deepEqual(harness.stored.get(filename), bytes);
  assert.equal(harness.stored.size, 3, 'successful new desktop and both original images remain');
});

test('an existing hash filename with different bytes is never overwritten or marked verified', async () => {
  const harness = captureHarness();
  const mobileBytes = jpegHeaderFixture(390, 844);
  const expectedHash = createHash('sha256').update(mobileBytes).digest('hex');
  const target = '/memory-only/en-services-mobile-' + expectedHash + '.jpg';
  const conflictingBytes = Buffer.from(mobileBytes); conflictingBytes[conflictingBytes.length - 3] = 55;
  harness.stored.set(target, conflictingBytes);
  const failed = await harness.run();
  assert.equal(failed.verified, false);
  assert.equal(failed.captures.mobile.url, '');
  assert.match(failed.captures.mobile.error, /Saved screenshot bytes differ/);
  assert.deepEqual(harness.stored.get(target), conflictingBytes);
});

test('font wait is bounded and reports a fallback-font capture without inventing font readiness', async () => {
  const evidence = await captureHarness({ fontTimeout: true }).run();
  assert.equal(evidence.verified, true);
  assert.equal(evidence.captures.mobile.fonts_ready, false);
});

test('pending and incomplete manifests retain failed pages and cannot claim complete coverage', async () => {
  const pending = CAPTURE_PAGES.map(([route]) => emptyPageEvidence(SITE_ORIGIN + route));
  const manifest = buildManifest(pending, { status: 'capturing', generatedAt: '2026-10-16T23:00:00.000Z' });
  assert.equal(manifest.schema_version, 2);
  assert.equal(manifest.status, 'capturing');
  assert.equal(manifest.verified_pages, 0);
  assert.equal(manifest.planned_pages, 9);
  assert.equal(manifest.screenshots.length, 9);
  assert.ok(manifest.screenshots.every(page => !page.verified));
  const completePage = await captureHarness().run();
  assert.equal(buildManifest([completePage]).status, 'incomplete', 'one page is not the full capture plan');
  const failedPage = await captureHarness({ status: 404 }).run();
  const failedManifest = buildManifest([failedPage]);
  assert.equal(failedManifest.screenshots.length, 1, 'failures are visible, rather than silently dropped');
  assert.equal(failedManifest.verified_pages, 0);
});
