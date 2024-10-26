import axios from "axios";
import { getLocalStorage } from "../utils";

const apiKey = "http://localhost:5000/api";

const axiosInterceptor = axios.create({
  baseURL: apiKey,
});

// Request interceptor
axiosInterceptor.interceptors.request.use(
  async (config) => {
    const accessToken = await getLocalStorage("e-comToken");
    
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;