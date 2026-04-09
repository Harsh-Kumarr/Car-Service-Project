import { useEffect, useState } from "react";
import useMechanicStore from "../mechanicStore";
import { Link } from "react-router-dom";

const statusConfig = {
  accepted: { bg: "bg-blue-100", text: "text-blue-700" },
  diagnosing: { bg: "bg-yellow-100", text: "text-yellow-700" },
  repairing: { bg: "bg-orange-100", text: "text-orange-700" },
  testing: { bg: "bg-purple-100", text: "text-purple-700" },
  completed: { bg: "bg-green-100", text: "text-green-700" },
};

const MechanicJobs = () => {
  const { jobs, fetchJobs } = useMechanicStore();
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const activeJobs = jobs.filter((j) => j.status !== "completed");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  const renderJobCard = (job) => {
    const sc = statusConfig[job.status] || { bg: "bg-gray-100", text: "text-gray-700" };
    const isCompleted = job.status === "completed";

    return (
      <div
        key={job._id}
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all group ${
          isCompleted ? "opacity-80" : "hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              🚗 {job.vehicleId?.brand} {job.vehicleId?.model}
            </h3>
            <p className="text-sm text-gray-500">👤 {job.userId?.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${sc.bg} ${sc.text}`}>
            {job.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl mb-3">🛠 {job.serviceType}</p>

        {/* BOOKING DATE */}
        {job.createdAt && (
          <p className="text-xs text-gray-400 font-medium mb-4">
            📅 Booked: {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}

        {isCompleted ? (
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm">
              ✅ Service Completed
            </span>
            {job.updatedAt && (
              <span className="text-xs text-gray-400 font-medium">
                Completed: {new Date(job.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            )}
          </div>
        ) : (
          <Link
            to={`/mechanic/job/${job._id}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-all group-hover:gap-2"
          >
            Update Status
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Assigned Jobs 🔧</h2>
        <p className="text-gray-500 mt-1">View and manage all jobs assigned to you.</p>
      </div>

      {/* ACTIVE JOBS */}
      {activeJobs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-5xl mb-4 block">🔧</span>
          <p className="text-gray-500 font-medium">No active jobs right now. Check back later!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {activeJobs.map(renderJobCard)}
        </div>
      )}

      {/* COMPLETED JOBS TOGGLE */}
      {completedJobs.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-semibold text-sm transition-all px-4 py-2.5 rounded-xl hover:bg-gray-100 active:scale-95"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showCompleted ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            {showCompleted ? "Hide" : "Show"} Completed Jobs ({completedJobs.length})
          </button>

          {showCompleted && (
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {completedJobs.map(renderJobCard)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MechanicJobs;