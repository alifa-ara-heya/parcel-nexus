/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

// Track if we're currently refreshing to avoid multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log("Axios", config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function onFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log("Axios", response);
        return response;
    },
    async function onRejected(error) {
        const originalRequest = error.config;

        // If the error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If we're already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Try to refresh the token
                const response = await axiosInstance.post('/auth/refresh-token');

                // If refresh successful, process the queue and retry the original request
                processQueue(null, response.data);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh fails, process the queue with error
                processQueue(refreshError, null);

                // Don't automatically redirect - let the app handle it
                console.log('Token refresh failed:', refreshError);

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // For any other error, just reject
        return Promise.reject(error);
    }
);