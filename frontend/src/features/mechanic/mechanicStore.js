import { create } from "zustand";
import { getMyJobs } from "./mechanicService";

const useMechanicStore = create((set, get) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });
    const res = await getMyJobs();
    set({ jobs: res.data.jobs || [], loading: false });
  },

  // Update a single job's status in the store (instant UI update)
  updateJobStatus: (jobId, newStatus) => {
    const updatedJobs = get().jobs.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );
    set({ jobs: updatedJobs });
  },
}));

export default useMechanicStore;