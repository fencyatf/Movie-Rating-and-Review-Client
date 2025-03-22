import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Should be "http://localhost:3002"

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`, 
  withCredentials: true,
});
