import axios from 'axios';
import { store } from '../store/store';

const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

client.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

export default client;
