#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, 'projects/reiki-yggdrasil/data/youtube-videos.json');
const COURSES_FILE = path.join(ROOT, 'projects/reiki-yggdrasil/data/youtube-courses.json');
const DEFAULT_HANDLE = '@shamanic_academy';
const API_BASE = 'https://www.googleapis.com/youtube/v3';
const DIONYSUS_KEYWORDS = ['дионис', 'dionysus', 'мистерии диониса', 'мистерии греции. дионис', 'вакх', 'bacchus', 'вакханалии', 'сатиры', 'менады', 'сатиры и менады', 'музыка диониса', 'любовь и друзья'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readJson(filePath, fallback) {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : fallback;
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function parseArgs(argv = process.argv.slice(2)) {
  const args = {
    dryRun: false,
    handle: process.env.YOUTUBE_CHANNEL_HANDLE || DEFAULT_HANDLE,
    outFile: OUT_FILE,
    vaultUrl: process.env.YOUTUBE_SECRET_VAULT_URL || ''
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--dry-run') args.dryRun = true;
    else if (argv[i] === '--handle') args.handle = argv[++i] || args.handle;
    else if (argv[i] === '--out') args.outFile = argv[++i] || args.outFile;
    else if (argv[i] === '--vault-url') args.vaultUrl = argv[++i] || args.vaultUrl;
  }
  return args;
}

function classify(text = '') {
  const normalized = String(text).toLowerCase();
  const topics = new Set();
  if (DIONYSUS_KEYWORDS.some((keyword) => normalized.includes(keyword))) topics.add('Дионис');
  if (normalized.includes('мистерии греции')) topics.add('Мистерии Греции');
  return [...topics];
}

function courseFor(text = '') {
  const detectedTopics = classify(text);
  return detectedTopics.includes('Дионис')
    ? { detectedTopics, courseSlug: 'misterii-dionisa', courseTitle: 'Мистерии Диониса' }
    : { detectedTopics, courseSlug: 'needs verification', courseTitle: 'needs verification' };
}

async function getKeyFromVault(vaultUrl) {
  if (!vaultUrl) return '';
  try {
    const response = await fetch(new URL('/api/secrets/read', vaultUrl), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ project: 'YouTube Data API', names: ['YOUTUBE_API_KEY'] })
    });
    if (!response.ok) return '';
    const json = await response.json();
    return json?.secrets?.YOUTUBE_API_KEY?.value || '';
  } catch {
    return '';
  }
}

async function getApiKey(args) {
  return process.env.YOUTUBE_API_KEY || await getKeyFromVault(args.vaultUrl);
}

async function youtubeGet(resource, params, apiKey) {
  const url = new URL(`${API_BASE}/${resource}`);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, String(value));
  }
  url.searchParams.set('key', apiKey);
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube API ${resource} failed: ${response.status} ${body.slice(0, 300)}`);
  }
  return response.json();
}

async function resolveChannel(handle, apiKey) {
  const forHandle = handle.startsWith('@') ? handle.slice(1) : handle;
  const data = await youtubeGet('channels', { part: 'snippet,contentDetails', forHandle }, apiKey);
  const channel = data.items?.[0];
  if (!channel) throw new Error(`Channel not found for handle ${handle}`);
  return channel;
}

function normalizeVideo(item, channel, handle, playlistId) {
  const snippet = item.snippet || {};
  const videoId = snippet.resourceId?.videoId || item.contentDetails?.videoId || item.id || '';
  const title = snippet.title || 'needs verification';
  const description = snippet.description || 'needs verification';
  const c = courseFor(`${title}\n${description}`);
  const t = snippet.thumbnails || {};
  return {
    videoId,
    title,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    description,
    publishedAt: snippet.publishedAt || 'needs verification',
    thumbnail: t.maxres?.url || t.high?.url || t.medium?.url || t.default?.url || 'needs verification',
    channelHandle: handle,
    channelTitle: channel.snippet?.title || snippet.channelTitle || 'needs verification',
    playlistId,
    playlistTitle: 'Uploads',
    detectedTopics: c.detectedTopics,
    courseSlug: c.courseSlug,
    courseTitle: c.courseTitle,
    language: 'ru',
    visibility: 'public',
    manualReviewStatus: 'needs verification',
    source: 'youtube-data-api',
    lastCheckedAt: today()
  };
}

async function fetchUploads(channel, apiKey, handle) {
  const playlistId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error('Uploads playlist not found.');
  const videos = [];
  let pageToken = '';
  do {
    const data = await youtubeGet('playlistItems', { part: 'snippet,contentDetails', playlistId, maxResults: 50, pageToken }, apiKey);
    for (const item of data.items || []) videos.push(normalizeVideo(item, channel, handle, playlistId));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return videos;
}

function mergeVideos(seed, fetched) {
  const byId = new Map(seed.map((video) => [video.videoId, video]));
  for (const video of fetched) byId.set(video.videoId, { ...(byId.get(video.videoId) || {}), ...video });
  return [...byId.values()].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

function updateCourses(videos) {
  const courses = readJson(COURSES_FILE, []);
  const ids = videos.filter((video) => video.courseSlug === 'misterii-dionisa').map((video) => video.videoId);
  const record = {
    courseSlug: 'misterii-dionisa',
    courseTitle: 'Мистерии Диониса',
    project: 'reiki-yggdrasil',
    channelSlugs: ['shamanic-academy'],
    topics: ['Дионис', 'Dionysus', 'Вакх', 'Bacchus', 'вакханалии', 'сатиры', 'менады', 'Мистерии Греции'],
    videoIds: [...new Set(ids)],
    status: 'needs verification',
    lastCheckedAt: today(),
    notes: 'Generated by scripts/youtube/fetch-channel-videos.mjs; manual review still required.'
  };
  const index = courses.findIndex((course) => course.courseSlug === record.courseSlug);
  if (index >= 0) courses[index] = { ...courses[index], ...record };
  else courses.push(record);
  writeJson(COURSES_FILE, courses);
}

async function main() {
  const args = parseArgs();
  const seed = readJson(args.outFile, []);
  const apiKey = await getApiKey(args);
  if (!apiKey) {
    if (!args.dryRun) writeJson(args.outFile, seed);
    console.log(JSON.stringify({
      ok: true,
      apiKeyStatus: 'missing',
      mode: args.dryRun ? 'dry-run' : 'seed-only',
      channelHandle: args.handle,
      videos: seed.length,
      message: 'YOUTUBE_API_KEY missing; seed data kept.'
    }, null, 2));
    return;
  }

  const channel = await resolveChannel(args.handle, apiKey);
  const fetched = await fetchUploads(channel, apiKey, args.handle);
  const merged = mergeVideos(seed, fetched);
  if (!args.dryRun) {
    writeJson(args.outFile, merged);
    updateCourses(merged);
  }
  console.log(JSON.stringify({
    ok: true,
    apiKeyStatus: 'configured',
    mode: args.dryRun ? 'dry-run' : 'write',
    channelId: channel.id,
    channelTitle: channel.snippet?.title || 'needs verification',
    channelHandle: args.handle,
    fetchedVideos: fetched.length,
    totalVideos: merged.length,
    dionysusVideos: merged.filter((video) => video.detectedTopics.includes('Дионис')).length
  }, null, 2));
}

await main();
