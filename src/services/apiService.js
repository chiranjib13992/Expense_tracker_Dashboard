import axios from "axios";
import { getToken } from "./global.service";
// API

const api = axios.create({
    baseURL: 'API_BASE_URL',
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
})

export const setUpAxiosInterceptor = () => {
    api.interceptors.response.use((response) => response, (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Logging Out.......")
        }
        return Promise.reject(error);
    })
}

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (config.headers["Content-Type"] === "application/json") {
            delete config.headers["Content-Type"];
        }

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default { api }