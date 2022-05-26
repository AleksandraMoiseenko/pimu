import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const baseURL = 'http://localhost:8080';

const config: AxiosRequestConfig = {
    baseURL,
    responseType: 'json',
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api: AxiosInstance = axios.create(config);
