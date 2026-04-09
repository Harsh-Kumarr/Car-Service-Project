import api from "../../services/api";

export const getAllBookings = () => api.get("/admin/bookings");

export const acceptBooking = (bookingId) =>
  api.post("/admin/accept", { bookingId });

export const rejectBooking = (bookingId) =>
  api.post("/admin/reject", { bookingId });

export const assignMechanic = (bookingId, mechanicId) =>
  api.post("/admin/assign", { bookingId, mechanicId });

export const getMechanics = () => api.get("/admin/mechanics");

export const getDashboardStats = () => api.get("/admin/dashboard");