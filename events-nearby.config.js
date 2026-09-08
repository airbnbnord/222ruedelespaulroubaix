"use strict";

function numberFromEnv(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

module.exports = {
  apiBaseUrl: "https://app.ticketmaster.com/discovery/v2/events.json",
  openAgendaApiBaseUrl: "https://api.openagenda.com/v2",
  cacheTtlMs: numberFromEnv("EVENTS_CACHE_TTL_HOURS", 6) * 60 * 60 * 1000,
  refreshHours: [7, 12, 17],
  requestSize: numberFromEnv("EVENTS_REQUEST_SIZE", 50),
  defaultLocation: "Roubaix",
  locations: {
    Lille: { country: "FR", label: { fr: "Lille", en: "Lille" }, latitude: 50.6292, longitude: 3.0573 },
    Roubaix: { country: "FR", label: { fr: "Roubaix", en: "Roubaix" }, latitude: 50.6927, longitude: 3.1778 },
    "Villeneuve-dAscq": { country: "FR", label: { fr: "Villeneuve-d'Ascq", en: "Villeneuve-d'Ascq" }, latitude: 50.6233, longitude: 3.1443 },
    Dunkerque: { country: "FR", label: { fr: "Dunkerque", en: "Dunkerque" }, latitude: 51.0344, longitude: 2.3768 },
    Bergues: { country: "FR", label: { fr: "Bergues", en: "Bergues" }, latitude: 50.9688, longitude: 2.4324 },
    Bruges: { country: "BE", label: { fr: "Bruges", en: "Brugge" }, latitude: 51.2093, longitude: 3.2247 },
    Gand: { country: "BE", label: { fr: "Gand", en: "Gent" }, latitude: 51.0543, longitude: 3.7174 },
    Bruxelles: { country: "BE", label: { fr: "Bruxelles", en: "Brussel" }, latitude: 50.8503, longitude: 4.3517 },
    Courtrai: { country: "BE", label: { fr: "Courtrai", en: "Kortrijk" }, latitude: 50.8280, longitude: 3.2649 },
    Tournai: { country: "BE", label: { fr: "Tournai", en: "Tournai" }, latitude: 50.6056, longitude: 3.3880 }
  },
  lille: {
    label: "Lille & Around",
    latitude: 50.6292,
    longitude: 3.0573,
    radiusKm: numberFromEnv("EVENTS_LILLE_RADIUS_KM", 30),
    count: numberFromEnv("EVENTS_LILLE_COUNT", 3)
  },
  belgium: {
    label: "Belgium",
    countryCode: "BE",
    count: numberFromEnv("EVENTS_BELGIUM_COUNT", 1),
    distanceAnchor: { latitude: 50.6292, longitude: 3.0573 },
    accessibleDistanceKm: numberFromEnv("EVENTS_BELGIUM_ACCESSIBLE_DISTANCE_KM", 130)
  },
  openAgenda: {
    enabled: process.env.EVENTS_OPENAGENDA_ENABLED !== "0",
    requestSize: numberFromEnv("EVENTS_OPENAGENDA_SIZE", 30),
    priority: numberFromEnv("EVENTS_OPENAGENDA_PRIORITY", 720),
    lilleAgendas: [
      { uid: 57621068, slug: "ville-de-lille", label: "Ville de Lille" },
      { uid: 89904399, slug: "metropole-europeenne-de-lille", label: "MEL" }
    ]
  },
  priorityCategories: [
    { score: 120, terms: ["festival", "festivals"] },
    { score: 95, terms: ["concert", "music", "musique", "rock", "pop", "jazz", "electronic", "classical"] },
    { score: 80, terms: ["culture", "arts", "theatre", "theater", "comedy", "museum", "exhibition", "expo"] },
    { score: 64, terms: ["sports", "sport", "football", "basketball", "tennis", "cycling"] },
    { score: 54, terms: ["family", "local", "community", "market"] }
  ]
};
