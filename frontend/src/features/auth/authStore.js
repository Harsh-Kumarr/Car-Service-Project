import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),

  setAuth: (data) => {
    localStorage.setItem("token", data.token);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(data.user));
    set({ 
      user: data.user, 
      token: data.token, 
      refreshToken: data.refreshToken || localStorage.getItem("refreshToken") 
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, token: null, refreshToken: null });
  },
}));

export default useAuthStore;