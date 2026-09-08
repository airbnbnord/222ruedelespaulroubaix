const modules = document.querySelectorAll(".module-panel");
const navButtons = document.querySelectorAll("[data-module-button]");
const ctaButtons = document.querySelectorAll("[data-target-module]");
const themeToggle = document.querySelector("#themeToggle");
const langToggle = document.querySelector("#langToggle");
const langLabel = document.querySelector("#langLabel");
const locationSelect = document.querySelector("#locationSelect");

let currentLang = localStorage.getItem("guestbook-lang") || "fr";
let currentTheme = localStorage.getItem("guestbook-theme") || "light";

const translations = {
  fr: {
    photoPlaceholder: "Photo de la pièce à venir",
    hostLabel: "Meet your hosts",
    hostNames: "Steven & votre hôte",
    introKicker: "Livret d'accueil",
    introCopy: "Repères rapides, bonnes adresses et infos pratiques pour vivre le logement sans friction.",
    eyebrow: "Bienvenue à Roubaix",
    heroTitle: "Votre parenthèse maison",
    heroText: "Toutes les infos utiles pour arriver sereinement, profiter du logement et explorer la métropole lilloise.",
    cta: "Préparer mon séjour",
    weatherTitle: "Météo locale",
    weatherLoading: "Chargement météo...",
    wind: "Vent",
    humidity: "Humidité",
    sideKicker: "Séjour fluide",
    sideTitle: "Tout à portée",
    sideCopy: "Arrivée, wifi, bonnes pratiques et recommandations locales seront regroupés ici par module.",
    nextSlice: "Prochain module : les essentiels du logement.",
    homeTitle: "Le logement",
    stayTitle: "Votre séjour",
    discoverTitle: "À découvrir",
    helpTitle: "Besoin d'aide ?",
    comingSoon: "Module prêt à construire dans ce même cadrant, sans rechargement.",
    navWelcome: "Bienvenu",
    navHome: "Le logement",
    navStay: "Votre séjour",
    navDiscover: "À découvrir",
    navHelp: "Besoin d'aide ?",
    clear: "Ciel clair",
    cloudy: "Nuageux",
    rainy: "Pluie",
    storm: "Orage",
    snow: "Neige",
    fallback: "Aperçu local, météo live indisponible",
    weatherFallbackLabel: "Semaine type",
    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  },
  en: {
    photoPlaceholder: "Room photo coming soon",
    hostLabel: "Meet your hosts",
    hostNames: "Steven & your host",
    introKicker: "Guest guide",
    introCopy: "Quick cues, local tips and practical details to use the home without friction.",
    eyebrow: "Welcome to Roubaix",
    heroTitle: "Your home pause",
    heroText: "Everything you need to arrive smoothly, enjoy the home and explore the Lille metropolitan area.",
    cta: "Prepare my stay",
    weatherTitle: "Local weather",
    weatherLoading: "Loading weather...",
    wind: "Wind",
    humidity: "Humidity",
    sideKicker: "Smooth stay",
    sideTitle: "Everything within reach",
    sideCopy: "Arrival, wifi, house guidance and local recommendations will live here module by module.",
    nextSlice: "Next module: home essentials.",
    homeTitle: "The home",
    stayTitle: "Your stay",
    discoverTitle: "Discover",
    helpTitle: "Need help?",
    comingSoon: "Module ready to build inside this same frame, without page reload.",
    navWelcome: "Welcome",
    navHome: "The home",
    navStay: "Your stay",
    navDiscover: "Discover",
    navHelp: "Need help?",
    clear: "Clear sky",
    cloudy: "Cloudy",
    rainy: "Rain",
    storm: "Storm",
    snow: "Snow",
    fallback: "Local preview, live weather unavailable",
    weatherFallbackLabel: "Typical week",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }
};

const locations = {
  Roubaix: { lat: 50.6927, lon: 3.1778 },
  Wattrelos: { lat: 50.7012, lon: 3.2181 },
  Lille: { lat: 50.6292, lon: 3.0573 },
  Tourcoing: { lat: 50.7249, lon: 3.1612 },
  "Villeneuve-d'Ascq": { lat: 50.6233, lon: 3.1443 },
  Croix: { lat: 50.6785, lon: 3.1493 }
};

function setModule(moduleName) {
  modules.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.module === moduleName));
  navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.moduleButton === moduleName));
  document.querySelector("#appContent").focus({ preventScroll: true });
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  langLabel.textContent = currentLang.toUpperCase();
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[currentLang][key]) node.textContent = translations[currentLang][key];
  });
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
  themeToggle.setAttribute("aria-label", currentTheme === "dark" ? "Basculer le theme clair" : "Basculer le theme sombre");
}

function weatherCodeLabel(code) {
  if ([0, 1].includes(code)) return ["☀", translations[currentLang].clear];
  if ([2, 3, 45, 48].includes(code)) return ["☁", translations[currentLang].cloudy];
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return ["☂", translations[currentLang].rainy];
  if ([95, 96, 99].includes(code)) return ["ϟ", translations[currentLang].storm];
  if ([71, 73, 75, 77, 85, 86].includes(code)) return ["❄", translations[currentLang].snow];
  return ["☁", translations[currentLang].cloudy];
}

function updateWeatherView(data, isFallback = false) {
  const current = data.current;
  const [icon, label] = weatherCodeLabel(current.weather_code);
  document.querySelector("#weatherIcon").textContent = icon;
  document.querySelector("#temperature").textContent = Math.round(current.temperature_2m);
  document.querySelector("#weatherStatus").textContent = isFallback ? translations[currentLang].fallback : label;
  document.querySelector("#wind").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  document.querySelector("#humidity").textContent = `${Math.round(current.relative_humidity_2m)}%`;

  const forecastRow = document.querySelector("#forecastRow");
  forecastRow.innerHTML = "";
  data.daily.time.forEach((time, index) => {
    const date = new Date(time);
    const weekday = translations[currentLang].weekdays[date.getDay()];
    const max = Math.round(data.daily.temperature_2m_max[index]);
    const min = Math.round(data.daily.temperature_2m_min[index]);
    const [dayIcon] = weatherCodeLabel(data.daily.weather_code[index]);
    const item = document.createElement("span");
    item.innerHTML = `<strong>${weekday}</strong><em>${dayIcon}</em>${max}° / ${min}°`;
    forecastRow.appendChild(item);
  });
}

async function fetchWeather() {
  const selected = locationSelect.value;
  const loc = locations[selected] || locations.Roubaix;
  const params = new URLSearchParams({
    latitude: loc.lat,
    longitude: loc.lon,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "7",
    timezone: "Europe/Paris"
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Weather request failed");
    updateWeatherView(await response.json());
  } catch {
    updateWeatherView({
      current: {
        temperature_2m: 19,
        relative_humidity_2m: 72,
        weather_code: 3,
        wind_speed_10m: 12
      },
      daily: {
        time: Array.from({ length: 7 }, (_, offset) => new Date(Date.now() + offset * 86400000).toISOString()),
        temperature_2m_max: [20, 21, 19, 22, 18, 19, 20],
        temperature_2m_min: [14, 15, 13, 14, 12, 13, 14],
        weather_code: [3, 3, 61, 2, 80, 1, 3]
      }
    }, true);
  }
}

navButtons.forEach((button) => button.addEventListener("click", () => setModule(button.dataset.moduleButton)));
ctaButtons.forEach((button) => button.addEventListener("click", () => setModule(button.dataset.targetModule)));

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("guestbook-theme", currentTheme);
  applyTheme();
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "en" : "fr";
  localStorage.setItem("guestbook-lang", currentLang);
  applyLanguage();
  fetchWeather();
});

locationSelect.addEventListener("change", fetchWeather);

applyTheme();
applyLanguage();
fetchWeather();
