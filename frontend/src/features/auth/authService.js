import api from "../../services/api";

export const registerUser = (data) => api.post("/auth/register", data);
export const verifyOTP = (data) => api.post("/auth/verify-otp", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const changePassword = (data) => api.post("/auth/change-password", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (token, data) => api.post(`/auth/reset-password/${token}`, data);