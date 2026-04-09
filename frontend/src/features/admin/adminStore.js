import { create } from "zustand";
import { getAllBookings, getDashboardStats } from "./adminService";

const useAdminStore = create((set) => ({
  bookings: [],
  stats: {},

  fetchBookings: async () => {
    const res = await getAllBookings();
    set({ bookings: res.data.bookings });
  },

  fetchStats: async () => {
    const res = await getDashboardStats();
    set({ stats: res.data.stats });
  },
}));

export default useAdminStore;