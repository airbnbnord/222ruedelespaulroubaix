"use strict";

const fs = require("node:fs/promises");
const { createReadStream } = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const rootDir = __dirname;
const runtimeDir = process.env.AIRBNB_LIVRET_RUNTIME_DIR
  || path.join(process.env.LOCALAPPDATA || rootDir, "AirbnbLivret-4174");
let config;

function ensureConfig() {
  if (!config) config = require("./events-nearby.config.js");
  return config;
}

function configuredPort() {
  const explicitArg = process.argv.find((arg) => arg.startsWith("--port="));
  const explicitPort = explicitArg ? Number(explicitArg.slice("--port=".length)) : NaN;
  if (Number.isInteger(explicitPort) && explicitPort > 0 && explicitPort < 65536) return explicitPort;

  const envPort = Number(process.env.PORT || 4174);
  if (Number.isInteger(envPort) && envPort > 0 && envPort < 65536) return envPort;

  return 4174;
}

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".glb", "model/gltf-binary"],
  [".pdf", "application/pdf"],
  [".cmd", "text/plain; charset=utf-8"],
  [".ps1", "text/plain; charset=utf-8"],
  [".xmind", "application/octet-stream"]
]);

function nowIso() {
  return new Date().toISOString();
}

async function loadDotEnv() {
  for (const fileName of [".env.local", ".env"]) {
    const filePath = path.join(rootDir, fileName);
    try {
      const body = await fs.readFile(filePath, "utf8");
      body.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
        if (!match || process.env[match[1]]) return;
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      });
    } catch (error) {
      if (error.code !== "ENOENT") console.warn(`[events] Unable to read ${fileName}:`, error.message);
    }
  }
}

function encodeGeohash(latitude, longitude, precision = 9) {
  const base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
  let latRange = [-90, 90];
  let lonRange = [-180, 180];
  let hash = "";
  let bit = 0;
  let ch = 0;
  let even = true;

  while (hash.length < precision) {
    const range = even ? lonRange : latRange;
    const mid = (range[0] + range[1]) / 2;
    if ((even ? longitude : latitude) > mid) {
      ch |= 1 << (4 - bit);
      range[0] = mid;
    } else {
      range[1] = mid;
    }
    even = !even;
    if (bit < 4) {
      bit += 1;
    } else {
      hash += base32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return hash;
}

function startDateTime() {
  return new Date(Date.now() - 5 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
}

function ticketmasterUrl(params) {
  const url = new URL(config.apiBaseUrl);
  url.searchParams.set("apikey", process.env.TICKETMASTER_API_KEY || "");
  url.searchParams.set("startDateTime", startDateTime());
  url.searchParams.set("sort", "date,asc");
  url.searchParams.set("size", String(config.requestSize));
  url.searchParams.set("page", "0");
  url.searchParams.set("locale", "fr-fr,*");
  url.searchParams.set("includeTBA", "no");
  url.searchParams.set("includeTBD", "no");
  url.searchParams.set("includeTest", "no");
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

function openAgendaUrl(agenda, params = {}) {
  const url = new URL(`${config.openAgendaApiBaseUrl}/agendas/${agenda.uid}/events`);
  url.searchParams.set("relative[]", "current");
  url.searchParams.append("relative[]", "upcoming");
  url.searchParams.set("sort", "timingsWithFeatured.asc");
  url.searchParams.set("size", String(config.openAgenda.requestSize));
  url.searchParams.set("monolingual", "fr");
  url.searchParams.set("includeLabels", "1");
  url.searchParams.set("status[]", "1");
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

async function fetchWithTimeout(url, options = {}) {
  const timeoutMs = config.providerTimeoutMs || 8000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error.name === "AbortError") throw new Error(`Provider request timed out after ${timeoutMs}ms`);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function locationKeyFromUrl(url) {
  const requested = url.searchParams.get("location") || config.defaultLocation;
  return config.locations[requested] ? requested : config.defaultLocation;
}

function cachePathForLocation(locationKey) {
  const safeKey = String(locationKey).replace(/[^A-Za-z0-9_-]/g, "");
  return path.join(runtimeDir, `events-nearby-cache-${safeKey}.json`);
}

async function readCache(locationKey) {
  try {
    return JSON.parse(await fs.readFile(cachePathForLocation(locationKey), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("[events] Unable to read cache:", error.message);
    return null;
  }
}

async function writeCache(locationKey, payload) {
  await fs.mkdir(runtimeDir, { recursive: true });
  await fs.writeFile(cachePathForLocation(locationKey), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function isFresh(cache) {
  if (!cache?.updatedAt) return false;
  return Date.now() - new Date(cache.updatedAt).getTime() < config.cacheTtlMs;
}

function needsOpenAgendaRefresh(cache) {
  return Boolean(
    config.openAgenda.enabled &&
    process.env.OPENAGENDA_API_KEY &&
    (
      (cache?.source && !String(cache.source).includes("openagenda")) ||
      (cache?.events?.lille || []).some((event) => event.source === "landmark") ||
      cache?.events?.lille?.[0]?.source !== "openagenda" ||
      cache?.events?.lille?.[1]?.source !== "ticketmaster" ||
      cache?.events?.belgium?.[0]?.source !== "ticketmaster"
    )
  );
}

function refreshSlot(date = new Date()) {
  const hours = [...(config.refreshHours || [7, 12, 17])].sort((a, b) => a - b);
  const hour = date.getHours();
  const activeHour = hours.filter((value) => value <= hour).pop() ?? hours[hours.length - 1];
  const slotDate = new Date(date);
  if (hour < hours[0]) slotDate.setDate(slotDate.getDate() - 1);
  const year = slotDate.getFullYear();
  const month = String(slotDate.getMonth() + 1).padStart(2, "0");
  const day = String(slotDate.getDate()).padStart(2, "0");
  return {
    key: `${year}-${month}-${day}T${String(activeHour).padStart(2, "0")}:00`,
    isRefreshHour: hours.includes(hour)
  };
}

function nextRefreshIso(date = new Date()) {
  const hours = [...(config.refreshHours || [7, 12, 17])].sort((a, b) => a - b);
  const next = new Date(date);
  const nextHour = hours.find((value) => value > date.getHours());
  if (nextHour === undefined) {
    next.setDate(next.getDate() + 1);
    next.setHours(hours[0], 0, 0, 0);
  } else {
    next.setHours(nextHour, 0, 0, 0);
  }
  return next.toISOString();
}

function msUntilNextRefresh(date = new Date()) {
  return Math.max(new Date(nextRefreshIso(date)).getTime() - date.getTime(), 60 * 1000);
}

function isCurrentRefreshSlot(cache, slot = refreshSlot()) {
  return Boolean(cache?.refreshSlot && cache.refreshSlot === slot.key);
}

function hasMissedScheduledRefresh(cache) {
  if (!cache?.nextRefreshAt) return false;
  const nextRefreshTime = new Date(cache.nextRefreshAt).getTime();
  return Number.isFinite(nextRefreshTime) && nextRefreshTime <= Date.now();
}

function eventDate(event) {
  return event?.dates?.start?.dateTime || event?.dates?.start?.localDate || "";
}

function venueOf(event) {
  return event?._embedded?.venues?.[0] || {};
}

function eventCountry(event) {
  const venue = venueOf(event);
  return venue?.country?.countryCode || venue?.country?.name || "";
}

function eventCity(event) {
  return venueOf(event)?.city?.name || "";
}

function statusCode(event) {
  return String(event?.dates?.status?.code || "").toLowerCase();
}

function bestImage(event) {
  const images = Array.isArray(event?.images) ? event.images : [];
  const sorted = images
    .filter((image) => image?.url && !image.fallback)
    .sort((a, b) => {
      const ratioScore = (b.ratio === "16_9") - (a.ratio === "16_9");
      if (ratioScore) return ratioScore;
      return Number(b.width || 0) - Number(a.width || 0);
    });
  return sorted[0]?.url || "";
}

function classificationsText(event) {
  const parts = [];
  (event?.classifications || []).forEach((classification) => {
    ["segment", "genre", "subGenre", "type", "subType"].forEach((key) => {
      const name = classification?.[key]?.name;
      if (name) parts.push(name);
    });
  });
  return parts.join(" ");
}

function categoryLabel(event) {
  const classification = event?.classifications?.[0] || {};
  return classification?.genre?.name || classification?.segment?.name || classification?.subGenre?.name || "";
}

function localizedText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.fr || value.en || Object.values(value).find(Boolean) || "";
}

function distanceKm(a, b) {
  const lat1 = Number(a.latitude);
  const lon1 = Number(a.longitude);
  const lat2 = Number(b.latitude);
  const lon2 = Number(b.longitude);
  if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return null;
  const toRad = (value) => value * Math.PI / 180;
  const earthRadius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const startLat = toRad(lat1);
  const endLat = toRad(lat2);
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(startLat) * Math.cos(endLat) * Math.sin(dLon / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function priorityScore(event) {
  const haystack = `${event?.name || ""} ${classificationsText(event)}`.toLowerCase();
  const match = config.priorityCategories.find((category) => {
    return category.terms.some((term) => haystack.includes(term.toLowerCase()));
  });
  return match?.score || 36;
}

function qualityScore(event, group) {
  const date = new Date(eventDate(event));
  const daysAway = Number.isFinite(date.getTime()) ? Math.max(0, (date.getTime() - Date.now()) / 86400000) : 365;
  const venue = venueOf(event);
  const eventDistance = distanceKm(config.belgium.distanceAnchor, {
    latitude: venue?.location?.latitude,
    longitude: venue?.location?.longitude
  });
  const recencyBoost = Math.max(0, 50 - daysAway * 0.9);
  const imageBoost = bestImage(event) ? 14 : -100;
  const saleBoost = event?.sales?.public ? 6 : 0;
  const distanceBoost = group === "belgium" && eventDistance !== null
    ? Math.max(-45, 60 - eventDistance * 0.38)
    : 0;
  return priorityScore(event) + recencyBoost + imageBoost + saleBoost + distanceBoost;
}

function openAgendaPriorityScore(event, group, location) {
  const title = localizedText(event?.title);
  const description = localizedText(event?.description);
  const haystack = `${title} ${description}`.toLowerCase();
  const date = new Date(openAgendaDate(event));
  const daysAway = Number.isFinite(date.getTime()) ? Math.max(0, (date.getTime() - Date.now()) / 86400000) : 365;
  const distance = distanceKm(location, {
    latitude: event?.location?.latitude,
    longitude: event?.location?.longitude
  });
  const categoryBoost = config.priorityCategories.find((category) => {
    return category.terms.some((term) => haystack.includes(term.toLowerCase()));
  })?.score || 42;
  const featuredBoost = event?.featured ? 180 : 0;
  const braderieBoost = haystack.includes("braderie") ? 220 : 0;
  const officialBoost = event?.originAgenda?.uid === 57621068 ? 48 : 24;
  const distanceBoost = distance !== null ? Math.max(-30, 42 - distance * 1.3) : 0;
  const recencyBoost = Math.max(0, 42 - daysAway * 0.8);
  return config.openAgenda.priority + featuredBoost + braderieBoost + officialBoost + categoryBoost + distanceBoost + recencyBoost;
}

function isUsableEvent(event, group) {
  const date = new Date(eventDate(event));
  if (!event?.id || !event?.name || !event?.url) return false;
  if (!Number.isFinite(date.getTime()) || date.getTime() < Date.now()) return false;
  if (!bestImage(event)) return false;
  if (event.test) return false;
  if (["cancelled", "canceled"].includes(statusCode(event))) return false;
  if (group === "belgium" && eventCountry(event) !== "BE") return false;
  return true;
}

function normalizeEvent(event, group, location) {
  const venue = venueOf(event);
  const venueLocation = {
    latitude: venue?.location?.latitude,
    longitude: venue?.location?.longitude
  };
  return {
    id: event.id,
    title: event.name,
    date: eventDate(event),
    city: eventCity(event),
    venue: venue?.name || "",
    image: bestImage(event),
    category: categoryLabel(event),
    url: event.url,
    country: eventCountry(event),
    badge: group === "belgium" ? config.belgium.label : `${location.label.en} & Around`,
    distanceFromLilleKm: distanceKm(config.belgium.distanceAnchor, venueLocation),
    source: "ticketmaster"
  };
}

function openAgendaImage(event) {
  const image = event?.image;
  if (!image?.base) return "";
  const variants = Array.isArray(image.variants) ? image.variants : [];
  const best = variants
    .filter((variant) => variant?.filename)
    .sort((a, b) => {
      const typeScore = (b.type === "full") - (a.type === "full");
      if (typeScore) return typeScore;
      return Number(b.size?.width || 0) - Number(a.size?.width || 0);
    })[0];
  return `${image.base}${best?.filename || image.filename || ""}`;
}

function openAgendaDate(event) {
  return event?.nextTiming?.begin || event?.firstTiming?.begin || "";
}

function openAgendaEndDate(event) {
  return event?.nextTiming?.end || event?.lastTiming?.end || event?.firstTiming?.end || openAgendaDate(event);
}

function isUsableOpenAgendaEvent(event, group, location) {
  const start = new Date(openAgendaDate(event));
  const end = new Date(openAgendaEndDate(event));
  if (!event?.uid || !localizedText(event.title)) return false;
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end.getTime() < Date.now()) return false;
  if (!openAgendaImage(event)) return false;
  const status = event?.status;
  const statusId = typeof status === "object" ? status.id : status;
  if (statusId !== undefined && Number(statusId) !== 1) return false;
  const eventDistance = distanceKm(location, {
    latitude: event?.location?.latitude,
    longitude: event?.location?.longitude
  });
  if (group === "lille" && eventDistance !== null && eventDistance > config.lille.radiusKm) return false;
  return true;
}

function normalizeOpenAgendaEvent(event, group, location, agenda) {
  const eventLocation = {
    latitude: event?.location?.latitude,
    longitude: event?.location?.longitude
  };
  const title = localizedText(event.title);
  return {
    id: `openagenda-${event.uid}`,
    title,
    date: openAgendaDate(event),
    city: event?.location?.city || "",
    venue: event?.location?.name || "",
    image: openAgendaImage(event),
    category: localizedText(event?.["type-devenement"]?.label) || localizedText(event?.etiquette?.label) || (event.featured ? "À l'affiche" : "Agenda officiel"),
    url: `https://openagenda.com/${agenda.slug}/events/${event.slug || event.uid}`,
    country: event?.location?.countryCode || "FR",
    badge: event.featured ? "Lille official highlight" : "Lille official",
    distanceFromLilleKm: distanceKm(config.belgium.distanceAnchor, eventLocation),
    source: "openagenda",
    priority: openAgendaPriorityScore(event, group, location)
  };
}

function eventTextKey(event) {
  return `${event?.title || ""} ${event?.venue || ""} ${event?.city || ""}`.toLowerCase();
}

function isLikelyDuplicateEvent(event, selected) {
  const eventDateKey = String(event?.date || "").slice(0, 10);
  const eventText = eventTextKey(event);
  return selected.some((candidate) => {
    const candidateDateKey = String(candidate?.date || "").slice(0, 10);
    const candidateText = eventTextKey(candidate);
    if (eventDateKey && candidateDateKey && eventDateKey !== candidateDateKey) return false;
    const sameTitle = String(event?.title || "").toLowerCase().trim() === String(candidate?.title || "").toLowerCase().trim();
    const bothBraderie = eventText.includes("braderie") && candidateText.includes("braderie");
    return sameTitle || bothBraderie;
  });
}

function pickUniqueEvents(candidates, count, selected = []) {
  const picked = [];
  for (const event of candidates) {
    if (picked.length >= count) break;
    if (isLikelyDuplicateEvent(event, [...selected, ...picked])) continue;
    picked.push(event);
  }
  return picked;
}

function composeEventsBySource({ openAgendaLille = [], ticketmasterLille = [], ticketmasterBelgium = [], previous = {}, location }) {
  const sortedOpenAgenda = [...openAgendaLille].sort((a, b) => (b.priority || 0) - (a.priority || 0) || new Date(a.date) - new Date(b.date));
  const previousOpenAgenda = (previous.lille || []).filter((event) => event.source === "openagenda");
  const previousTicketmasterLille = (previous.lille || []).filter((event) => event.source === "ticketmaster");
  const previousTicketmasterBelgium = (previous.belgium || []).filter((event) => event.source === "ticketmaster");
  const officialLille = pickUniqueEvents(sortedOpenAgenda, 1);
  if (!officialLille.length) officialLille.push(...pickUniqueEvents(previousOpenAgenda, 1));
  if (!officialLille.length) officialLille.push(...pickUniqueEvents(ticketmasterLille, 1));
  if (!officialLille.length) officialLille.push(...pickUniqueEvents(previousTicketmasterLille, 1));

  const lilleTicketmaster = pickUniqueEvents(ticketmasterLille, Math.max(0, config.lille.count - officialLille.length), officialLille);
  const openAgendaBackfill = pickUniqueEvents(sortedOpenAgenda, Math.max(0, config.lille.count - officialLille.length - lilleTicketmaster.length), [
    ...officialLille,
    ...lilleTicketmaster
  ]);
  const fallbackLille = pickUniqueEvents(previousTicketmasterLille, Math.max(0, config.lille.count - officialLille.length - lilleTicketmaster.length - openAgendaBackfill.length), [
    ...officialLille,
    ...lilleTicketmaster,
    ...openAgendaBackfill
  ]);
  const belgium = pickUniqueEvents(ticketmasterBelgium.length ? ticketmasterBelgium : previousTicketmasterBelgium, config.belgium.count);

  return {
    lille: [...officialLille, ...lilleTicketmaster, ...openAgendaBackfill, ...fallbackLille].slice(0, config.lille.count),
    belgium
  };
}

function enrichCachedEvents(payload, locationKey) {
  const selected = config.locations[locationKey] || config.locations[config.defaultLocation];
  const location = payload.location || {
    key: locationKey,
    label: selected.label,
    country: selected.country,
    latitude: selected.latitude,
    longitude: selected.longitude
  };
  const events = payload.events || {};
  const cachedLille = (events.lille || []).filter(isUpcomingCachedEvent);
  const cachedOpenAgenda = cachedLille.filter((event) => event.source === "openagenda");
  const cachedTicketmasterLille = cachedLille.filter((event) => event.source === "ticketmaster");
  const officialLille = pickUniqueEvents(cachedOpenAgenda, 1);
  if (!officialLille.length) officialLille.push(...pickUniqueEvents(cachedTicketmasterLille, 1));
  const lilleTicketmaster = pickUniqueEvents(cachedTicketmasterLille, Math.max(0, config.lille.count - officialLille.length), officialLille);
  const openAgendaBackfill = pickUniqueEvents(cachedOpenAgenda, Math.max(0, config.lille.count - officialLille.length - lilleTicketmaster.length), [
    ...officialLille,
    ...lilleTicketmaster
  ]);
  return {
    ...payload,
    location,
    events: {
      lille: [...officialLille, ...lilleTicketmaster, ...openAgendaBackfill].slice(0, config.lille.count),
      belgium: pickUniqueEvents((events.belgium || []).filter((event) => event.source === "ticketmaster").filter(isUpcomingCachedEvent), config.belgium.count)
    }
  };
}

function isUpcomingCachedEvent(event) {
  const rawDate = String(event?.date || "");
  const date = new Date(rawDate);
  const eventDateKey = rawDate.slice(0, 10);
  const todayKey = new Date().toISOString().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate) || eventDateKey === todayKey) {
    date.setHours(23, 59, 59, 999);
  }
  return Number.isFinite(date.getTime()) && date.getTime() >= Date.now();
}

function dedupe(events) {
  const seen = new Set();
  return events.filter((event) => {
    const key = [
      String(event?.name || "").toLowerCase().replace(/\s+/g, " ").trim(),
      String(eventDate(event)).slice(0, 10),
      String(venueOf(event)?.name || eventCity(event)).toLowerCase()
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchTicketmasterEvents(params, group, count, location) {
  const response = await fetchWithTimeout(ticketmasterUrl(params));
  if (!response.ok) throw new Error(`Ticketmaster ${group} request failed with ${response.status}`);
  const data = await response.json();
  const events = data?._embedded?.events || [];
  return dedupe(events)
    .filter((event) => isUsableEvent(event, group))
    .map((event) => ({ event, score: qualityScore(event, group) }))
    .sort((a, b) => b.score - a.score || new Date(eventDate(a.event)) - new Date(eventDate(b.event)))
    .slice(0, count)
    .map(({ event }) => normalizeEvent(event, group, location))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

async function fetchOpenAgendaEvents(group, location) {
  if (!config.openAgenda.enabled || !process.env.OPENAGENDA_API_KEY) return [];
  const agendas = group === "lille" ? config.openAgenda.lilleAgendas : [];
  const batches = await Promise.allSettled(agendas.map(async (agenda) => {
    const response = await fetchWithTimeout(openAgendaUrl(agenda), {
      headers: { key: process.env.OPENAGENDA_API_KEY }
    });
    if (!response.ok) throw new Error(`OpenAgenda ${agenda.slug} request failed with ${response.status}`);
    const data = await response.json();
    return (data?.events || [])
      .filter((event) => isUsableOpenAgendaEvent(event, group, location))
      .map((event) => normalizeOpenAgendaEvent(event, group, location, agenda));
  }));
  batches
    .filter((result) => result.status === "rejected")
    .forEach((result) => console.warn("[events] OpenAgenda refresh failed:", result.reason?.message || result.reason));
  return batches
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0) || new Date(a.date) - new Date(b.date))
    .slice(0, Math.max(config.openAgenda.requestSize, config.lille.count));
}

async function fetchFreshEvents(previousCache, locationKey) {
  const selected = config.locations[locationKey] || config.locations[config.defaultLocation];
  const location = {
    key: locationKey,
    label: selected.label,
    country: selected.country,
    latitude: selected.latitude,
    longitude: selected.longitude
  };
  const lilleParams = {
    geoPoint: encodeGeohash(location.latitude, location.longitude),
    radius: config.lille.radiusKm,
    unit: "km"
  };
  const belgiumParams = { countryCode: config.belgium.countryCode };
  const providerResults = await Promise.allSettled([
    process.env.TICKETMASTER_API_KEY ? fetchTicketmasterEvents(lilleParams, "lille", config.lille.count, location) : Promise.resolve([]),
    process.env.TICKETMASTER_API_KEY ? fetchTicketmasterEvents(belgiumParams, "belgium", config.belgium.count, location) : Promise.resolve([]),
    fetchOpenAgendaEvents("lille", location)
  ]);
  providerResults
    .filter((result) => result.status === "rejected")
    .forEach((result) => console.warn("[events] Provider refresh failed:", result.reason?.message || result.reason));
  const [ticketmasterLille, ticketmasterBelgium, openAgendaLille] = providerResults.map((result) => (
    result.status === "fulfilled" ? result.value : []
  ));
  const previous = previousCache?.events || {};
  const composedEvents = composeEventsBySource({
    openAgendaLille,
    ticketmasterLille,
    ticketmasterBelgium,
    previous,
    location
  });
  return {
    updatedAt: nowIso(),
    ttlMs: config.cacheTtlMs,
    refreshSlot: refreshSlot().key,
    nextRefreshAt: nextRefreshIso(),
    source: openAgendaLille.length ? "openagenda+ticketmaster" : "ticketmaster",
    location,
    events: composedEvents
  };
}

async function getEventsNearby(locationKey) {
  await loadDotEnv();
  ensureConfig();
  const slot = refreshSlot();
  const cache = await readCache(locationKey);
  const shouldRepairOpenAgenda = needsOpenAgendaRefresh(cache);
  const forceRefresh = process.env.EVENTS_FORCE_REFRESH === "1";
  if (!forceRefresh && isCurrentRefreshSlot(cache, slot) && !shouldRepairOpenAgenda) return { ...enrichCachedEvents(cache, locationKey), fromCache: true };
  if (!forceRefresh && !shouldRepairOpenAgenda && !slot.isRefreshHour && !hasMissedScheduledRefresh(cache)) {
    return cache
      ? { ...enrichCachedEvents(cache, locationKey), fromCache: true, nextRefreshAt: nextRefreshIso() }
      : enrichCachedEvents(emptyEvents("waiting_for_refresh_window"), locationKey);
  }
  if (!process.env.TICKETMASTER_API_KEY && !process.env.OPENAGENDA_API_KEY) {
    return cache ? { ...enrichCachedEvents(cache, locationKey), fromCache: true, warning: "missing_api_keys" } : enrichCachedEvents(emptyEvents("missing_api_keys"), locationKey);
  }

  try {
    const payload = await fetchFreshEvents(cache, locationKey);
    if (payload.events.lille.length || payload.events.belgium.length) {
      try {
        await writeCache(locationKey, payload);
      } catch (error) {
        console.warn("[events] Cache write failed:", error.message);
      }
      return { ...payload, fromCache: false };
    }
    return cache ? { ...enrichCachedEvents(cache, locationKey), fromCache: true, warning: "empty_ticketmaster_response" } : enrichCachedEvents(emptyEvents("empty_ticketmaster_response"), locationKey);
  } catch (error) {
    console.warn("[events] Refresh failed:", error.message);
    return cache ? { ...enrichCachedEvents(cache, locationKey), fromCache: true, warning: "ticketmaster_unavailable" } : enrichCachedEvents(emptyEvents("ticketmaster_unavailable"), locationKey);
  }
}

function emptyEvents(warning) {
  return {
    updatedAt: null,
    ttlMs: config.cacheTtlMs,
    refreshSlot: null,
    nextRefreshAt: nextRefreshIso(),
    source: "unavailable",
    warning,
    fromCache: false,
    location: null,
    events: { lille: [], belgium: [] }
  };
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=300"
  });
  response.end(`${JSON.stringify(payload)}\n`);
}

function isInsideRoot(filePath) {
  const relative = path.relative(rootDir, filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

async function serveStatic(request, response, url) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const filePath = path.normalize(path.join(rootDir, requestedPath));
  if (!isInsideRoot(filePath) || filePath.includes(`${path.sep}.runtime${path.sep}`)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "content-type": mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream",
      "cache-control": "no-cache"
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
  if (url.pathname === "/api/events-nearby") {
    sendJson(response, 200, await getEventsNearby(locationKeyFromUrl(url)));
    return;
  }
  await serveStatic(request, response, url);
}

async function main() {
  await loadDotEnv();
  ensureConfig();
  const port = configuredPort();
  const server = http.createServer((request, response) => {
    handleRequest(request, response).catch((error) => {
      console.error("[server]", error);
      sendJson(response, 500, { error: "internal_server_error" });
    });
  });

  server.listen(port, "127.0.0.1", () => {
    console.log(`Airbnb welcome booklet running at http://127.0.0.1:${port}/`);
  });

  if (process.env.TICKETMASTER_API_KEY || process.env.OPENAGENDA_API_KEY) {
    const scheduleDefaultLocationRefresh = () => {
      setTimeout(() => {
        getEventsNearby(config.defaultLocation)
          .catch((error) => console.warn("[events] Scheduled refresh failed:", error.message))
          .finally(scheduleDefaultLocationRefresh);
      }, msUntilNextRefresh()).unref();
    };
    scheduleDefaultLocationRefresh();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  getEventsNearby,
  ensureConfig
};

