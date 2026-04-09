import api from "../../services/api";

export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings/my");
export const getAllBookings = () => api.get("/bookings");