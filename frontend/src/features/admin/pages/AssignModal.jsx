import { useEffect, useState } from "react";
import { assignMechanic, getMechanics } from "../adminService";

const AssignModal = ({ bookingId, onClose }) => {
  const [mechanics, setMechanics] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMechanics().then((res) => {
      setMechanics(res.data.data || []);
    });
  }, []);

  const handleAssign = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await assignMechanic(bookingId, selected);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px] border border-gray-100 relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} disabled={loading} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3">🔧</div>
          <h2 className="text-xl font-extrabold text-gray-900">Assign Mechanic</h2>
          <p className="text-sm text-gray-500 mt-1">Select a mechanic for this job</p>
        </div>

        <select
          onChange={(e) => setSelected(e.target.value)}
          disabled={loading}
          className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-60"
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
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selected || loading}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${!selected || loading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Assigning...
              </>
            ) : (
              "Assign"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;