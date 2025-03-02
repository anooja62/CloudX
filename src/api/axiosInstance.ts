import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL + '/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Global response error handler
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
