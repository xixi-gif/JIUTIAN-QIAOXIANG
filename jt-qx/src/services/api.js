import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

export const getPlatforms = () => api.get('/platforms');
export const getPlatform = (id) => api.get(`/platforms/${id}`);

export default api;    