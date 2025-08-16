// store/authStore.ts
import { create } from "zustand";
import api, {
  login as loginApi,
  logout as logoutApi,
  getUser,
} from "@/lib/api";
import {
  setTokenClient,
  clearTokenClient,
  getTokenClient,
} from "@/lib/auth-client";

interface User {
  id: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  token: getTokenClient(),

  setToken: (token) => {
    if (token) setTokenClient(token);
    else clearTokenClient();
    set({ token });
  },

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await loginApi(email, password);

      if (res?.token) {
        setTokenClient(res.token);
        set({ token: res.token });

        const user = await getUser();
        set({ user, isLoading: false });
        return true;
      } else {
        set({ error: "No token received", isLoading: false });
        return false;
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    logoutApi();
    clearTokenClient();
    set({ user: null, token: null });
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await getUser();
      set({ user, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch user",
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
