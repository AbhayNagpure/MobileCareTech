import axios from 'axios';

// In development, this uses the Vite proxy (e.g. /api/v1)
// In production on Vercel, you should set VITE_API_BASE_URL to your backend's URL
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true,
});
