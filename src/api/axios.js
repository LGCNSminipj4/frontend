import axios from 'axios';

const api = axios.create({
  baseURL: 'https://unremitting-protanopic-davis.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); 

    if (token) {
      if (token.startsWith('Bearer')) {
        config.headers["Authorization"] = token;
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;