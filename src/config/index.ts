export const APP_NAME = "ECOGLASNIK";

// Forms
export const TEXTAREA_MAX_CHARACTERS = 300;
export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;

// Weather
export const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// API

export const FRONTEND_URLS = [
  "https://www.demo.ecoglasnik.org",
  "https://www.vlasotince.ecoglasnik.org",
  "https://www.nis.ecoglasnik.org",
];

export const BACKEND_URLS: Record<string, string> = {
  "www.demo.ecoglasnik.org": "https://www.demo-api.ecoglasnik.org/api",
  "www.vlasotince.ecoglasnik.org":
    "https://www.vlasotince-api.ecoglasnik.org/api",
  "www.nis.ecoglasnik.org": "https://www.nis-api.ecoglasnik.org/api",
  localhost: "http://localhost:3000/api",
};

export const getBackendUrl = (): string => {
  const hostname = window.location.hostname; // Extracts "www.demo.ecoglasnik.org"
  return BACKEND_URLS[hostname] || "https://www.demo-api.ecoglasnik.org/api"; // Fallback URL
};

export const API_URL = getBackendUrl();
console.log(API_URL);

// export const API_URL = import.meta.env.VITE_API_URL;
