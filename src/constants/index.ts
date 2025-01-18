//export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://clean-me-backend.vercel.app/api"
    : "http://localhost:3000/api";

//
export const APP_NAME = "ECOGLASNIK";

// Forms
export const TEXTAREA_MAX_CHARACTERS = 300;

// Weather
export const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
