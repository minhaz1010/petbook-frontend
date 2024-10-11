import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    try {
      const  {getToken} = auth();
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {

    // Handle 401 Unauthorized
    if (error?.response?.status === 401) {
      console.error("Unauthorized request - token might be invalid or expired");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
