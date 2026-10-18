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

// Offline provider contract tests: no Google, GitHub or Telegram network requests.
const envNames = ['GEMINI_API_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'GITHUB_TOKEN', 'GITHUB_REPOSITORY'];
function fakeEnvironment() {
  const before = Object.fromEntries(envNames.map(key => [key, process.env[key]]));
  process.env.GEMINI_API_KEY = 'offline-test-google-key';
  process.env.TELEGRAM_BOT_TOKEN = 'offline-test-bot-token';
  process.env.TELEGRAM_CHAT_ID = '123456789';
  process.env.GITHUB_TOKEN = 'offline-test-github-token';
  process.env.GITHUB_REPOSITORY = 'andylitvinov-design/ai-projects-brain';
  return () => { for (const [key, value] of Object.entries(before)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  } };
}
const responseJson = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'content-type': 'application/json' },
});
const completedGemini = () => ({candidates: [{
  finishReason: 'STOP', content: { parts: [{text: 'Детальный технический отчёт: ' +
    'На проверенных страницах есть конкретные метаданные и URL. '.repeat(8)}]},
}]});

test('Gemini request respects current 3.8 Flash contract and rejects unfinished reports', async () => {
  const { getGeminiReview } = await import('../scripts/daily-gemini-telegram.mjs');
  const restoreEnv = fakeEnvironment(), fetchBefore = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({url: String(url), request: JSON.parse(init.body)});
    return responseJson(completedGemini());
  };
  try {
    const result = await getGeminiReview({ pages: [], date_toronto: '2026-10-17' });
    assert.ok(result.includes('технический отчёт'));
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /gemini-3\.8-flash:generateContent$/);
    assert.equal(calls[0].request.generationConfig.thinkingConfig.thinkingLevel, 'low');
    assert.equal(calls[0].request.generationConfig.maxOutputTokens, 6000);
    assert.ok(!('temperature' in calls[0].request.generationConfig));
    globalThis.fetch = async () => responseJson({ candidates: [{
      finishReason: 'MAX_TOKENS', content: {parts: [{text: 'частичный текст '.repeat(50)}]},
    }] });
    await assert.rejects(getGeminiReview({ pages: [] }), /incomplete response: MAX_TOKENS/);
    globalThis.fetch = async () => responseJson({error: 'quota'}, 429);
    await assert.rejects(getGeminiReview({ pages: [] }), /HTTP 429/);
  } finally { globalThis.fetch = fetchBefore; restoreEnv(); }
});

test('first run archives a public report and delivers once; second run is idempotent', async () => {
  const { runDaily } = await import('../scripts/daily-gemini-telegram.mjs');
  const restoreEnv = fakeEnvironment(), fetchBefore = globalThis.fetch;
  const stored = [];
  const counts = { scans: 0, gemini: 0, telegram: 0, post: 0, patch: 0 };
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url);
    if (u.startsWith('https://holistichouse.vercel.app/')) {
      counts.scans++;
      const isSitemap = u.endsWith('/sitemap.xml');
      return new Response(isSitemap ? '<urlset></urlset>' :
        '<html lang="en"><title>Public</title><meta name="description" content="Public page"><h1>Hello</h1></html>',
        {status: 200, headers: {'content-type': isSitemap ? 'text/xml' : 'text/html'}});
    }
    if (u.includes('generativelanguage.googleapis.com')) {
      counts.gemini++;
      return responseJson(completedGemini());
    }
    if (u.startsWith('https://api.telegram.org/')) {
      counts.telegram++;
      assert.equal(init.method, 'POST');
      assert.equal(init.body.get('chat_id'), '123456789');
      assert.match(await init.body.get('document').text(), /Gemini/);
      return responseJson({ok: true, result: {message_id: 42}});
    }
    if (u.includes('/issues/242/comments?')) {
      return responseJson(stored);
    }
    if (u.endsWith('/issues/242/comments') && init.method === 'POST') {
      counts.post++;
      const {body} = JSON.parse(init.body);
      assert.ok(body.includes('HH-GEMINI-AUDIT:'));
      const item = { id: 111, user: {login: 'github-actions[bot]'}, body,
        html_url: 'https://github.com/andylitvinov-design/ai-projects-brain/issues/242#issuecomment-111',
        created_at: new Date().toISOString() };
      stored.push(item);
      return responseJson(item, 201);
    }
    if (u.endsWith('/issues/comments/111') && init.method === 'PATCH') {
      counts.patch++;
      stored[0].body = JSON.parse(init.body).body;
      return responseJson(stored[0]);
    }
    throw new Error('Unexpected offline test URL: ' + u);
  };
  try {
    await runDaily();
    assert.equal(counts.post, 1);
    assert.equal(counts.gemini, 1);
    assert.equal(counts.telegram, 1);
    assert.equal(counts.patch, 1);
    assert.ok(counts.scans >= 10);
    assert.ok(stored[0].body.includes('HH-TELEGRAM-SENT:'));
    await runDaily();
    assert.equal(counts.post, 1);
    assert.equal(counts.gemini, 1);
    assert.equal(counts.telegram, 1);
    assert.equal(counts.patch, 1);
  } finally { globalThis.fetch = fetchBefore; restoreEnv(); }
});

test('Telegram failure keeps the archived audit pending, without retrying Gemini', async () => {
  const { runDaily } = await import('../scripts/daily-gemini-telegram.mjs');
  const restoreEnv = fakeEnvironment(), fetchBefore = globalThis.fetch;
  const currentDate = (await import('../scripts/daily-gemini-telegram.mjs')).torontoDate();
  const report = '<!-- HH-GEMINI-AUDIT:' + currentDate + ' -->\n\n' +
    '# Gemini public audit\n\nPublic report.\n\n<!-- HH-GEMINI-EVIDENCE -->\nmore public facts';
  let telegramCalls = 0, geminiCalls = 0;
  const stored = [{id: 555, body: report, user: {login: 'github-actions[bot]'},
    html_url: 'https://github.com/andylitvinov-design/ai-projects-brain/issues/242#issuecomment-555',
    created_at: new Date().toISOString()}];
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url);
    if (u.includes('/issues/242/comments?')) return responseJson(stored);
    if (u.startsWith('https://api.telegram.org/')) {
      telegramCalls++;
      return telegramCalls === 1 ? responseJson({ok: false}, 503) : responseJson({ok: true});
    }
    if (u.includes('generativelanguage.googleapis.com')) {
      geminiCalls++; throw Error('Gemini unexpectedly called');
    }
    if (u.endsWith('/issues/comments/555') && init.method === 'PATCH') {
      stored[0].body = JSON.parse(init.body).body;
      return responseJson(stored[0]);
    }
    throw Error('Unexpected offline URL: ' + u);
  };
  try {
    await assert.rejects(runDaily(), /Telegram Bot API returned HTTP 503/);
    assert.ok(!stored[0].body.includes('HH-TELEGRAM-SENT'));
    await runDaily();
    assert.equal(telegramCalls, 2);
    assert.equal(geminiCalls, 0);
    assert.ok(stored[0].body.includes('HH-TELEGRAM-SENT'));
  } finally { globalThis.fetch = fetchBefore; restoreEnv(); }
});
