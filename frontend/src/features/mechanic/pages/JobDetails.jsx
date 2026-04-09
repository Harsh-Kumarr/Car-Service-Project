import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateJobStatus } from "../mechanicService";
import toast from "react-hot-toast";
import useMechanicStore from "../mechanicStore";

const STATUS_FLOW = ["accepted", "diagnosing", "repairing", "testing", "completed"];

const statusColors = {
  accepted: "bg-blue-500",
  diagnosing: "bg-yellow-500",
  repairing: "bg-orange-500",
  testing: "bg-purple-500",
  completed: "bg-green-500",
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJobStatus: updateStore } = useMechanicStore();
  const job = jobs.find((j) => j._id === id);

  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const currentIndex = STATUS_FLOW.indexOf(job?.status);
  const isCompleted = job?.status === "completed";

  const handleUpdate = async () => {
    if (!status) return toast.error("Select status");
    const toastId = toast.loading("Updating...");
    try {
      await updateJobStatus({ bookingId: id, status, note });
      // Update store immediately so UI reflects the change
      updateStore(id, status);
      setStatus("");
      setNote("");
      toast.success("Status updated!", { id: toastId });

      // If completed, navigate back to jobs list after a brief delay
      if (status === "completed") {
        setTimeout(() => navigate("/mechanic/jobs"), 1000);
      }
    } catch {
      toast.error("Error updating status", { id: toastId });
    }
  };

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <span className="text-5xl block mb-4">🔍</span>
        <p className="text-gray-500 font-medium">Job not found. It may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Details 🔧</h2>
          <p className="text-gray-500 mt-1">View job information and update the repair status.</p>
        </div>

        {/* VEHICLE INFO */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <div>
              <p className="font-bold text-gray-900">{job.vehicleId?.brand} {job.vehicleId?.model}</p>
              <p className="text-sm text-gray-500">👤 {job.userId?.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">🛠 {job.serviceType}</p>
          {job.createdAt && (
            <p className="text-xs text-gray-400 mt-2">
              📅 Booked on: {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          )}
        </div>

        {/* STATUS PROGRESS */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-3">Repair Progress</p>
          <div className="flex items-center gap-1">
            {STATUS_FLOW.map((s, index) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div className={`w-full h-2 rounded-full ${index <= currentIndex ? statusColors[s] : "bg-gray-200"} transition-all`}></div>
                <span className={`text-[10px] mt-1 font-medium capitalize ${index <= currentIndex ? "text-gray-700" : "text-gray-400"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPLETED MESSAGE */}
        {isCompleted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <span className="text-3xl block mb-2">✅</span>
            <p className="text-green-700 font-bold text-lg">Job Completed</p>
            <p className="text-green-600 text-sm mt-1">This service has been marked as completed. No further updates are needed.</p>
          </div>
        ) : (
          <>
            {/* STATUS DROPDOWN */}
            <div className="mb-4">
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select next status</option>
                {STATUS_FLOW.map((s, index) => {
                  const isDisabled = index !== currentIndex + 1;
                  return (
                    <option key={s} value={s} disabled={isDisabled}>
                      {s}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* NOTE */}
            <div className="mb-6">
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea
                value={note}
                placeholder="Add notes about repair progress..."
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none h-28"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleUpdate}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all active:scale-95 bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              Update Status
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetails;