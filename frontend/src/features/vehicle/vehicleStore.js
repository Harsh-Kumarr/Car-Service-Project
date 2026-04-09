import { create } from "zustand";
import { getVehicles } from "./vehicleService";

const useVehicleStore = create((set) => ({
    vehicles: [],
    loading: false,

    fetchVehicles: async () => {
        set({ loading: true });
        const res = await getVehicles();
        console.log("Vehicle API:", res.data);
        set({
            vehicles: res.data.vehicles || [],
            loading: false,
        });
    },
}));

export default useVehicleStore;