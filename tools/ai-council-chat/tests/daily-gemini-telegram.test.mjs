import test from 'node:test';
import assert from 'node:assert/strict';
import { torontoDate, safePublicUrl, pickAuditUrls, analyzeHtml, SITE } from '../scripts/daily-gemini-telegram.mjs';

test('Toronto calendar date respects local midnight and DST', () => {
  assert.equal(torontoDate(new Date('2026-10-18T01:00:00Z')), '2026-10-17');
  assert.equal(torontoDate(new Date('2026-12-01T01:00:00Z')), '2026-11-30');
});

test('only anonymous public, same-origin URLs can be fetched', () => {
  assert.equal(safePublicUrl('/en/services'), SITE + '/en/services');
  for (const input of [
    'https://evil.example.com/', '//evil.example.com/a', '/en/client/tests',
    '/en/app/course', '/api/private', '/admin', '/en/services?access_token=abc',
    'https://holistichouse.vercel.app@evil.example.com/', '/en/account/profile',
  ]) assert.equal(safePublicUrl(input), null, input);
});

test('sitemap discovery stays within max pages and safe routes', () => {
  const content = '<urlset><url><loc>https://holistichouse.vercel.app/ru/homeopathy</loc></url>' +
    '<url><loc>https://example.net/bad</loc></url>' +
    '<url><loc>https://holistichouse.vercel.app/en/client/secret</loc></url></urlset>';
  const result = pickAuditUrls(content);
  assert.ok(result.urls.includes(SITE + '/ru/homeopathy'));
  assert.ok(!result.urls.some(x => x.includes('secret') || x.includes('example.net')));
  assert.ok(result.urls.length <= 24);
  assert.equal(result.sitemap_discovered, 3);
});

test('metadata findings reflect only public server-side HTML evidence', () => {
  const checked = analyzeHtml('<html lang="es"><head><title>Hola</title><meta content="Bienvenidos" name="description"><link href="https://holistichouse.vercel.app/es" rel="canonical"></head><body><h1>Hola a todos</h1></body></html>');
  assert.equal(checked.title, 'Hola');
  assert.equal(checked.lang, 'es');
  assert.equal(checked.description, 'Bienvenidos');
  assert.equal(checked.h1_count, 1);
  assert.deepEqual(checked.flags, []);
  const empty = analyzeHtml('<html><body><div>No H1</div></body></html>');
  assert.ok(empty.flags.includes('missing_h1_in_server_html'));
  assert.ok(empty.flags.includes('missing_html_lang'));
});
