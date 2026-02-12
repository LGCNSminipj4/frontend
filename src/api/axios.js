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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    console.log("실제 요청 헤더:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;