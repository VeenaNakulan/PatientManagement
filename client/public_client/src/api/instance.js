import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
