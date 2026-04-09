import api from "../../services/api";

export const getMyJobs = () => api.get("/mechanic/jobs");

export const updateJobStatus = (data) =>
  api.post("/mechanic/status", data);