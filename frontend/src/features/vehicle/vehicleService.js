import api from "../../services/api";

export const addVehicle = (data) => api.post("/vehicle", data);
export const getVehicles = () => api.get("/vehicle");