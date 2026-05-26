#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

import { classifyVideo } from "./classify-youtube-videos.mjs";

const DEFAULT_CONFIG_PATH = "projects/reiki-yggdrasil/data/youtube-courses.json";
const DEFAULT_OUTPUT_PATH = "projects/reiki-yggdrasil/data/youtube-videos.json";
const DEFAULT_VAULT_URL = "http://127.0.0.1:8790";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

function parseArgs(argv = process.argv.slice(2)) {
  const args = {
    configPath: DEFAULT_CONFIG_PATH,
    outputPath: DEFAULT_OUTPUT_PATH,
    vaultUrl: process.env.SECRET_VAULT_URL || DEFAULT_VAULT_URL,
    dryRun: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--config") {
      args.configPath = argv[index + 1] || args.configPath;
      index += 1;
    } else if (value === "--out") {
      args.outputPath = argv[index + 1] || args.outputPath;
      index += 1;
    } else if (value === "--vault-url") {
      args.vaultUrl = argv[index + 1] || args.vaultUrl;
      index += 1;
    } else if (value === "--dry-run") {
      args.dryRun = true;
    }
  }
  return args;
}

async function loadJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function readYoutubeApiKey(vaultUrl) {
  const response = await fetch(`${vaultUrl.replace(/\/$/, "")}/api/secrets/read`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      project: "Reiki Yggdrasil",
      names: ["YOUTUBE_API_KEY"]
    })
  });
  if (!response.ok) return { ok: false, reason: `vault http ${response.status}` };
  const data = await response.json();
  const entry = data?.secrets?.YOUTUBE_API_KEY;
  if (!entry?.present || !entry.value) return { ok: false, reason: "missing" };
  return { ok: true, value: entry.value };
}

async function youtubeGet(path, params, apiKey) {
  const url = new URL(`${YOUTUBE_API_BASE}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }
  url.searchParams.set("key", apiKey);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`YouTube ${path} returned HTTP ${response.status}`);
  return response.json();
}

async function resolveChannel(channel, apiKey) {
  const data = await youtubeGet("channels", {
    part: "id,snippet,contentDetails",
    forHandle: channel.handle
  }, apiKey);
  const item = data.items?.[0];
  if (!item) throw new Error(`No YouTube channel found for handle ${channel.handle}`);
  return {
    ...channel,
    channelId: item.id,
    title: item.snippet?.title || channel.title || "needs verification",
    uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads || null
  };
}

async function fetchUploads(playlistId, apiKey) {
  const items = [];
  let pageToken = "";
  do {
    const data = await youtubeGet("playlistItems", {
      part: "snippet,contentDetails,status",
      playlistId,
      maxResults: 50,
      pageToken
    }, apiKey);
    items.push(...(data.items || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return items;
}

async function enrichVideos(videoIds, apiKey) {
  const map = new Map();
  for (let index = 0; index < videoIds.length; index += 50) {
    const batch = videoIds.slice(index, index + 50);
    const data = await youtubeGet("videos", {
      part: "snippet,status,contentDetails",
      id: batch.join(","),
      maxResults: 50
    }, apiKey);
    for (const item of data.items || []) map.set(item.id, item);
  }
  return map;
}

function normalizeVideo({ playlistItem, video, channel, courses, checkedAt }) {
  const snippet = video?.snippet || playlistItem.snippet || {};
  const thumbnails = snippet.thumbnails || {};
  const thumbnail = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "";
  const videoId = video?.id || playlistItem.contentDetails?.videoId || snippet.resourceId?.videoId;
  const normalized = {
    videoId,
    title: snippet.title || "needs verification",
    url: `https://www.youtube.com/watch?v=${videoId}`,
    description: snippet.description || "",
    publishedAt: snippet.publishedAt || playlistItem.contentDetails?.videoPublishedAt || "needs verification",
    thumbnail,
    channelHandle: channel.handle,
    channelTitle: snippet.channelTitle || channel.title || "needs verification",
    playlistId: channel.uploadsPlaylistId || null,
    playlistTitle: "Uploads",
    detectedTopics: [],
    courseSlug: null,
    courseTitle: null,
    language: snippet.defaultAudioLanguage || snippet.defaultLanguage || "needs verification",
    visibility: video?.status?.privacyStatus || playlistItem.status?.privacyStatus || "public",
    manualReviewStatus: "needs verification",
    source: "youtube-data-api-v3",
    lastCheckedAt: checkedAt
  };
  return classifyVideo(normalized, courses);
}

async function fetchInventory({ config, apiKey }) {
  const checkedAt = new Date().toISOString();
  const courses = config.courses || [];
  const videos = [];
  const channels = [];

  for (const channel of (config.channels || []).filter((item) => item.enabled)) {
    const resolved = await resolveChannel(channel, apiKey);
    channels.push(resolved);
    const playlistItems = resolved.uploadsPlaylistId ? await fetchUploads(resolved.uploadsPlaylistId, apiKey) : [];
    const videoIds = playlistItems
      .map((item) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId)
      .filter(Boolean);
    const enriched = await enrichVideos(videoIds, apiKey);
    videos.push(...playlistItems.map((item) => normalizeVideo({
      playlistItem: item,
      video: enriched.get(item.contentDetails?.videoId || item.snippet?.resourceId?.videoId),
      channel: resolved,
      courses,
      checkedAt
    })));
  }

  return { channels, videos };
}

async function main() {
  const args = parseArgs();
  const config = await loadJson(args.configPath);
  const apiKey = await readYoutubeApiKey(args.vaultUrl);

  if (!apiKey.ok) {
    console.log(JSON.stringify({
      ok: false,
      status: "needs verification",
      reason: "YOUTUBE_API_KEY missing from local secret vault",
      output: args.outputPath
    }, null, 2));
    process.exitCode = 2;
    return;
  }

  const inventory = await fetchInventory({ config, apiKey: apiKey.value });
  if (!args.dryRun) {
    await writeFile(args.outputPath, `${JSON.stringify(inventory.videos, null, 2)}\n`);
  }

  console.log(JSON.stringify({
    ok: true,
    channels: inventory.channels.map((channel) => ({
      slug: channel.slug,
      handle: channel.handle,
      channelId: channel.channelId,
      title: channel.title,
      videos: inventory.videos.filter((video) => video.channelHandle === channel.handle).length
    })),
    videos: inventory.videos.length,
    dionysusVideos: inventory.videos.filter((video) => video.detectedTopics.includes("Дионис")).length,
    wrote: !args.dryRun
  }, null, 2));
}

export {
  fetchInventory,
  normalizeVideo,
  parseArgs,
  readYoutubeApiKey,
  resolveChannel
};

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  await main();
}
