// API service for work orders
import axios from "axios";

const API_BASE_URL = "https://fieldsync.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
