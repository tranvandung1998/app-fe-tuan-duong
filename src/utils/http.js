import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: interceptors
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('HTTP Error:', err);
    return Promise.reject(err);
  }
);

export default http;
