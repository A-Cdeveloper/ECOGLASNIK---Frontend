//export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://clean-me-backend.vercel.app/api"
    : "http://localhost:3000/api";

//
export const APP_NAME = "Clean Me";

// Forms
export const TEXTAREA_MAX_CHARACTERS = 300;

// Map
export const INITIAL_ZOOM = 12;
export const DEFAULT_POSITION = { lat: 42.961498, lng: 22.124319 };
export const DEFAULT_CENTER = { lat: 42.965202, lng: 22.128136 };
export const DEFAULT_BOUND = {
  northEast: { lat: 43.028808, lng: 22.369252 },
  southWest: { lat: 42.887599, lng: 22.039992 },
};

// Weather
export const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
