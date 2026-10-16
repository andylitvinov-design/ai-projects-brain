import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

export const CAPTURE_ENGINE = 'Playwright Chromium';
export const SITE_ORIGIN = 'https://holistichouse.vercel.app';
export const ASSET_ORIGIN = 'https://ai-council-chat.vercel.app';
export const CAPTURE_PAGES = [
  ['/', 'home'], ['/en', 'en'], ['/ru', 'ru'], ['/es', 'es'],
  ['/en/services', 'en-services'], ['/ru/services', 'ru-services'], ['/es/services', 'es-services'],
  ['/en/academy', 'en-academy'], ['/en/about', 'en-about']
];
export const VIEWPORTS = Object.freeze({
  desktop: Object.freeze({ width: 1440, height: 900 }),
  mobile: Object.freeze({ width: 390, height: 844 })
});

export function captureOptions(mode) {
  if (!VIEWPORTS[mode]) throw new Error('Unknown screenshot mode: ' + mode);
  return {
    viewport: { ...VIEWPORTS[mode] },
    deviceScaleFactor: 1,
    isMobile: mode === 'mobile',
    hasTouch: mode === 'mobile',
    locale: 'en-CA',
    timezoneId: 'America/Toronto',
    reducedMotion: 'reduce',
    acceptDownloads: false
  };
}

// Read the actual JPEG frame header, rather than trusting requested dimensions.
// The bytes come directly from Chromium; this is a dimensions check, not a JPEG decoder.
export function jpegDimensions(input) {
  const bytes = Buffer.from(input);
  if (bytes.length < 4 || bytes.readUInt16BE(0) !== 0xffd8 || bytes.readUInt16BE(bytes.length - 2) !== 0xffd9) {
    throw new Error('Screenshot is not a complete JPEG');
  }
  const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let dimensions = null;
  for (let offset = 2; offset < bytes.length - 2;) {
    if (bytes[offset++] !== 0xff) throw new Error('Invalid JPEG marker');
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > bytes.length) throw new Error('Truncated JPEG segment');
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length - 2) throw new Error('Invalid JPEG segment length');
    if (frameMarkers.has(marker)) {
      if (length < 11) throw new Error('Invalid JPEG frame header');
      const height = bytes.readUInt16BE(offset + 3);
      const width = bytes.readUInt16BE(offset + 5);
      const components = bytes[offset + 7];
      if (!width || !height || !components || length !== 8 + 3 * components) throw new Error('Invalid JPEG frame dimensions');
      dimensions = { width, height };
    }
    if (marker === 0xda) {
      if (!dimensions) throw new Error('JPEG has no frame dimensions');
      if (length < 6 || offset + length >= bytes.length - 2) throw new Error('JPEG has no scan data');
      return dimensions;
    }
    offset += length;
  }
  throw new Error('JPEG has no image scan');
}

export function validatePageIdentity(requestedUrl, finalUrl, httpStatus) {
  if (!Number.isInteger(httpStatus) || httpStatus < 200 || httpStatus >= 300) throw new Error('HTTP ' + httpStatus);
  const requested = new URL(requestedUrl), final = new URL(finalUrl);
  const cleanPath = value => value.replace(/\/+$/, '') || '/';
  const requestedPath = cleanPath(requested.pathname), finalPath = cleanPath(final.pathname);
  if (requested.origin !== SITE_ORIGIN || final.origin !== SITE_ORIGIN || requested.username || requested.password || requested.search || requested.hash || final.username || final.password || final.search || final.hash) {
    throw new Error('Screenshot left the approved public site or changed the requested URL');
  }
  if (!CAPTURE_PAGES.some(([route]) => route === requestedPath)) throw new Error('Screenshot route is outside the public capture list');
  const homeRedirect = requestedPath === '/' && /^\/(en|ru|es)$/.test(finalPath);
  if (finalPath !== requestedPath && !homeRedirect) throw new Error('Screenshot redirected to a different public page: ' + finalPath);
}

export function validateViewport(mode, viewport, deviceScaleFactor) {
  const expected = VIEWPORTS[mode];
  if (!expected || viewport?.width !== expected.width || viewport?.height !== expected.height) {
    throw new Error('Viewport mismatch: expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(viewport));
  }
  if (deviceScaleFactor !== 1) throw new Error('Device pixel ratio mismatch: expected 1, got ' + deviceScaleFactor);
}

export function validateJpeg(mode, bytes) {
  const actual = jpegDimensions(bytes), expected = VIEWPORTS[mode];
  if (!expected || actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error('JPEG dimensions mismatch: expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  }
  return actual;
}

export function emptyPageEvidence(requestedUrl) {
  return {
    page: requestedUrl,
    desktop_url: '',
    mobile_preview_url: '',
    source: CAPTURE_ENGINE,
    verified: false,
    captures: Object.fromEntries(Object.entries(VIEWPORTS).map(([mode, viewport]) => [mode, {
      url: '', verified: false, expected_viewport: { ...viewport }, viewport: null,
      width: null, height: null, device_scale_factor: null,
      captured_at: null, source: CAPTURE_ENGINE, requested_url: requestedUrl,
      final_url: null, http_status: null
    }]))
  };
}

// The injected browser/files are test seams; tests do not launch a browser or call a model.
export async function capturePageEvidence(browser, { requestedUrl, slug, out, files = fs, now = () => new Date().toISOString() }) {
  if (!CAPTURE_PAGES.some(([route, expectedSlug]) => SITE_ORIGIN + route === requestedUrl && expectedSlug === slug)) {
    throw new Error('Screenshot target is not in the approved public capture plan');
  }
  const evidence = emptyPageEvidence(requestedUrl);
  for (const mode of Object.keys(VIEWPORTS)) {
    const capture = evidence.captures[mode];
    let page;
    let temporaryPath;
    capture.attempted_at = now();
    try {
      page = await browser.newPage(captureOptions(mode));
      page.setDefaultTimeout(10000);
      const response = await page.goto(requestedUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
      capture.http_status = response?.status() ?? null;
      capture.final_url = page.url();
      validatePageIdentity(requestedUrl, capture.final_url, capture.http_status);
      const contentType = response.headers()['content-type'] || '';
      if (!/^(text\/html|application\/xhtml\+xml)(?:\s*;|$)/i.test(contentType)) throw new Error('Screenshot response is not an HTML page');
      await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
      await page.waitForFunction(() => Boolean(document.body?.innerText.trim()), null, { timeout: 5000 });
      capture.fonts_ready = await page.waitForFunction(() => !document.fonts || document.fonts.status === 'loaded', null, { timeout: 3000 }).then(() => true, () => false);
      capture.viewport = page.viewportSize();
      const rendered = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight, ratio: window.devicePixelRatio }));
      capture.layout_viewport = { width: rendered.width, height: rendered.height };
      capture.device_scale_factor = rendered.ratio;
      validateViewport(mode, capture.viewport, capture.device_scale_factor);
      const bytes = await page.screenshot({ type: 'jpeg', quality: 72, fullPage: false, animations: 'disabled', timeout: 15000 });
      capture.captured_at = now();
      capture.final_url = page.url();
      validatePageIdentity(requestedUrl, capture.final_url, capture.http_status);
      const dimensions = validateJpeg(mode, bytes);
      const sha256 = createHash('sha256').update(bytes).digest('hex');
      const filename = slug + '-' + mode + '-' + sha256 + '.jpg';
      const filePath = path.join(out, filename);
      temporaryPath = path.join(out, '.capture-' + slug + '-' + mode + '-' + randomUUID() + '.tmp');
      await files.writeFile(temporaryPath, bytes, { flag: 'wx' });
      const temporaryBytes = await files.readFile(temporaryPath);
      validateJpeg(mode, temporaryBytes);
      if (!Buffer.from(bytes).equals(Buffer.from(temporaryBytes))) throw new Error('Temporary screenshot bytes differ from captured bytes');
      // link() atomically creates the immutable filename without replacing an
      // existing artifact. Older saved audits must keep their original pixels.
      await files.link(temporaryPath, filePath).catch(error => {
        if (error.code !== 'EEXIST') throw error;
      });
      const storedBytes = await files.readFile(filePath);
      validateJpeg(mode, storedBytes);
      if (!Buffer.from(bytes).equals(Buffer.from(storedBytes))) throw new Error('Saved screenshot bytes differ from captured bytes');
      Object.assign(capture, dimensions, {
        url: ASSET_ORIGIN + '/screenshots/' + filename,
        byte_length: storedBytes.length,
        sha256,
        verified: true
      });
      evidence[mode === 'desktop' ? 'desktop_url' : 'mobile_preview_url'] = capture.url;
    } catch (error) {
      capture.verified = false;
      capture.url = '';
      capture.error = String(error?.message || error);
    } finally {
      // Only this attempt's temporary file is disposable. Never delete or
      // overwrite an old hash URL, including after a partial/failed capture.
      if (temporaryPath) await files.rm(temporaryPath, { force: true }).catch(cleanupError => {
        capture.cleanup_warning = String(cleanupError?.message || cleanupError);
      });
      if (page) await page.close().catch(() => {});
    }
  }
  evidence.verified = Object.values(evidence.captures).every(capture => capture.verified);
  return evidence;
}

export function buildManifest(screenshots, { generatedAt = new Date().toISOString(), status } = {}) {
  const verifiedCount = screenshots.filter(page => page.verified === true && Object.values(page.captures || {}).length === 2 && Object.values(page.captures).every(capture => capture.verified === true)).length;
  const expectedPages = new Set(CAPTURE_PAGES.map(([route]) => SITE_ORIGIN + route));
  const allPagesPresent = screenshots.length === expectedPages.size && new Set(screenshots.map(page => page.page)).size === expectedPages.size && screenshots.every(page => expectedPages.has(page.page));
  return {
    schema_version: 2,
    generated_at: generatedAt,
    capture_engine: CAPTURE_ENGINE,
    device_viewport_desktop: '1440x900',
    device_viewport_mobile: '390x844',
    status: status || (allPagesPresent && verifiedCount === screenshots.length ? 'complete' : 'incomplete'),
    verified_pages: verifiedCount,
    planned_pages: CAPTURE_PAGES.length,
    screenshots
  };
}
