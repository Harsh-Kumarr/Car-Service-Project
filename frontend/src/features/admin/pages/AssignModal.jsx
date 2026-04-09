import { useEffect, useState } from "react";
import { assignMechanic, getMechanics } from "../adminService";
import toast from "react-hot-toast";

const AssignModal = ({ bookingId, onClose }) => {
  const [mechanics, setMechanics] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    getMechanics().then((res) => {
      setMechanics(res.data.data || []);
    });
  }, []);

  const handleAssign = async () => {
    if (!selected) return toast.error("Select mechanic first");
    await assignMechanic(bookingId, selected);
    toast.success("Mechanic Assigned 🔧");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] border border-gray-100 relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3">🔧</div>
          <h2 className="text-xl font-extrabold text-gray-900">Assign Mechanic</h2>
          <p className="text-sm text-gray-500 mt-1">Select a mechanic for this job</p>
        </div>

        <select
          onChange={(e) => setSelected(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">Select Mechanic</option>
          {mechanics.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-all active:scale-95"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;