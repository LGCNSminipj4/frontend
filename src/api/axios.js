import axios from 'axios';

const api = axios.create({
  baseURL: 'https://unremitting-protanopic-davis.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

export default api;