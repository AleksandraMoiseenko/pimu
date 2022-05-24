import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// https://jsonplaceholder.typicode.com http://localhost:8080

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080',
    responseType: 'json',
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api: AxiosInstance = axios.create(config);
