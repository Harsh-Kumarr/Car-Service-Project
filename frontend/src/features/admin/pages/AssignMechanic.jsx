import { useState } from "react";
import { assignMechanic } from "../adminService";
import toast from "react-hot-toast";

const AssignMechanic = () => {
  const [bookingId, setBookingId] = useState("");
  const [mechanicId, setMechanicId] = useState("");

  const handleAssign = async () => {
    const toastId = toast.loading("Assigning...");
    try {
      await assignMechanic({ bookingId, mechanicId });
      toast.success("Assigned!", { id: toastId });
    } catch {
      toast.error("Assignment failed", { id: toastId });
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Assign Mechanic 🔧</h2>
          <p className="text-gray-500 mt-1">Manually assign a mechanic to a booking.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Booking ID</label>
            <input
              placeholder="Enter Booking ID"
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Mechanic ID</label>
            <input
              placeholder="Enter Mechanic ID"
              onChange={(e) => setMechanicId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            onClick={handleAssign}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-95 mt-2"
          >
            Assign Mechanic
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignMechanic;