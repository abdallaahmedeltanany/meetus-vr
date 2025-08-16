import axios from "axios";
import {
  getTokenClient,
  setTokenClient,
  clearTokenClient,
} from "./auth-client";

const api = axios.create({
  baseURL: "https://api-yeshtery.dev.meetusvr.com/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getTokenClient();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/yeshtery/token", {
      email,
      password,
      isEmployee: true,
    });

    const { token } = res.data;

    setTokenClient(token);

    return { token };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  clearTokenClient();
};

export const getUser = async () => {
  try {
    const res = await api.get("/user/info");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export default api;
