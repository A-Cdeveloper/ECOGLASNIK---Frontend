import axios from "axios";
import { API_URL } from "../constants";

const apiClient = axios.create({
  baseURL: API_URL, // Base URL for all requests
  timeout: 5000, // Optional: Set a timeout for requests (in ms)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export default apiClient;
