import { useEffect, useState } from "react";
import { getAllBookings } from "../adminService";
import AssignModal from "./AssignModal";

const AcceptedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    const res = await getAllBookings();
    const sorted = (res.data.bookings || [])
      .filter((b) => b.status === "accepted")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(sorted);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderBooking = (b) => (
    <div key={b._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {b.vehicleId?.brand} {b.vehicleId?.model}
          </h3>
          <p className="text-sm text-gray-500">👤 {b.userId?.name}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-blue-100 text-blue-700">
          {b.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl mb-3">🛠 {b.serviceType}</p>

      <p className="text-xs text-gray-400 font-medium mb-4">
        📅 {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedBooking(b._id)}
          disabled={b.assignedMechanic}
          className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
            b.assignedMechanic
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
          }`}
        >
          {b.assignedMechanic ? "✓ Assigned" : "Assign Mechanic"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Accepted Bookings ✅</h2>
        <p className="text-gray-500 mt-1">Bookings approved and awaiting mechanic assignment or progress.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl">📝</span>
            <p className="text-gray-400 mt-2 font-medium">No accepted bookings right now.</p>
          </div>
        ) : (
          bookings.map(renderBooking)
        )}
      </div>

      {selectedBooking && (
        <AssignModal
          bookingId={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
};

export default AcceptedBookings;
