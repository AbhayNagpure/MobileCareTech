import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1` 
  : '/api/v1';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
