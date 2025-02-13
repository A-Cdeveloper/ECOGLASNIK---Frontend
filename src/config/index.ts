import { apiUrls } from "./apiUrls";

export const APP_NAME = "ECOGLASNIK";

// Forms
export const TEXTAREA_MAX_CHARACTERS = 300;
export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;

// Weather
export const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// API

const getApiBaseUrl = () => {
  if (typeof window === "undefined")
    return "https://www.demo-api.ecoglasnik.org/api";

  const hostname = window.location.hostname;

  if (hostname.includes("localhost")) {
    return "http://localhost:3000/api"; // Local API
  }

  const matchedUrl = apiUrls.find((url) => hostname.includes(url));
  return matchedUrl
    ? `https://www.${matchedUrl}-api.ecoglasnik.org/api`
    : "https://www.demo-api.ecoglasnik.org/api"; // Default to demo API
};

export const API_URL = getApiBaseUrl();
