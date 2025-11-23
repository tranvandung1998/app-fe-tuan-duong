import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false, // Hoặc true nếu backend dùng cookie
});

export default http;
