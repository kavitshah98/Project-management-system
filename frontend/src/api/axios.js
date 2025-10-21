import axios from "axios";

const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 
  process.env.VITE_API_URL || 
  "http://localhost:3000";

export const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosNoAuth = axios.create({
  baseURL: API_BASE_URL,
});

axiosAuth.interceptors.request.use((config) => {
  const token_data = localStorage.getItem("token_data");
  if (token_data) {
    const token = JSON.parse(token_data);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
