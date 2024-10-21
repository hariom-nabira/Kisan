import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.warn("No refresh token available.");
        throw new Error("No refresh token available.");
    }

    try {
        const response = await api.post('/api/refresh-token', { refreshToken });
        if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        }
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired access token (401)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh the access token
            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    // Update the headers with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // Retry the original request with the new access token
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // If refreshing fails, return a rejected promise
                return Promise.reject(refreshError);
            }
        }

        // If it's not a 401 error or refreshing failed, log the error
        console.error("API Response Error:", error.response ? error.response.data : error);
        return Promise.reject(error);
    }
);

export default api;
