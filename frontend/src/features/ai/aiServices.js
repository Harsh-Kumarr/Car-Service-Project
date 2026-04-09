import api from "../../services/api";

export const diagnoseIssue = (data) => api.post("/ai/diagnose", data);