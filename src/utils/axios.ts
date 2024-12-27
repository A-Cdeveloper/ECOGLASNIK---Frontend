import axios from "axios";
import { API_URL, WEATHER_API_KEY, WEATHER_BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: API_URL, // Base URL for all requests
  timeout: 5000, // Optional: Set a timeout for requests (in ms)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export const weatherClient = axios.create({
  baseURL: WEATHER_BASE_URL, // Centralized base URL
  timeout: 5000, // Timeout for all requests
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: WEATHER_API_KEY, // Automatically include the API key in all requests
  },
});

export default apiClient;
