import axios from 'axios';
import { API_BASE_URL } from '../common/data/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
});


// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Show your message here, e.g., using a notification library or modifying the app state
            console.log('Unauthorized request');
        }
        return Promise.reject(error);
    }
);

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // You can modify the request config here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
