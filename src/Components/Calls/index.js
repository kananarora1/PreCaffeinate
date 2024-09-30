import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "https://precaffeinate-backend.onrender.com/", 
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
