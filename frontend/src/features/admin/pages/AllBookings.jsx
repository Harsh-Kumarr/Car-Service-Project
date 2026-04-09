import { useEffect, useState } from "react";
import {
  getAllBookings,
  acceptBooking,
  rejectBooking,
} from "../adminService";
import AssignModal from "./AssignModal";
import toast from "react-hot-toast";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showOld, setShowOld] = useState(false);
  const [filter, setFilter] = useState("week");

  const fetchBookings = async () => {
    const res = await getAllBookings();
    const sorted = (res.data.bookings || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setBookings(sorted);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const now = new Date();
  const isThisWeek = (date) => {
    const d = new Date(date);
    return (now - d) / (1000 * 60 * 60 * 24) <= 7;
  };
  const isThisMonth = (date) => {
    const d = new Date(date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const newBookings = bookings.filter((b) => isThisWeek(b.createdAt));
  const oldBookings = bookings.filter((b) => !isThisWeek(b.createdAt));
  let filteredOld = oldBookings;
  if (filter === "month") filteredOld = oldBookings.filter((b) => isThisMonth(b.createdAt));
  if (filter === "all") filteredOld = bookings;

  const handleAccept = async (id) => {
    await acceptBooking(id);
    toast.success("Accepted");
    fetchBookings();
  };
  const handleReject = async (id) => {
    await rejectBooking(id);
    toast.success("Rejected");
    fetchBookings();
  };

  const statusColor = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  const renderBooking = (b) => (
    <div
      key={b._id}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            🚗 {b.vehicleId?.brand} {b.vehicleId?.model}
          </h3>
          <p className="text-sm text-gray-500">👤 {b.userId?.name}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor(b.status)}`}>
          {b.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl mb-3">🛠 {b.serviceType}</p>

      <p className="text-xs text-gray-400 font-medium mb-4">
        📅 {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleAccept(b._id)}
          disabled={b.status !== "pending"}
          className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
            b.status === "pending"
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              : "bg-emerald-50 text-emerald-400 cursor-not-allowed"
          }`}
        >
          {b.status === "accepted" ? "✓ Accepted" : "Accept"}
        </button>

        <button
          onClick={() => handleReject(b._id)}
          disabled={b.status !== "pending"}
          className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
            b.status === "pending"
              ? "bg-red-500 hover:bg-red-600 text-white shadow-sm"
              : "bg-red-50 text-red-300 cursor-not-allowed"
          }`}
        >
          {b.status === "rejected" ? "✗ Rejected" : "Reject"}
        </button>

        <button
          onClick={() => setSelectedBooking(b._id)}
          disabled={b.assignedMechanic || b.status !== "accepted"}
          className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
            b.assignedMechanic
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
          }`}
        >
          {b.assignedMechanic ? "✓ Assigned" : "Assign"}
        </button>
      </div>
    </div>
  );

  const filterBtns = [
    { label: "Prev Week", val: "week" },
    { label: "Last Month", val: "month" },
    { label: "All", val: "all" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bookings 📋</h2>
        <p className="text-gray-500 mt-1">Manage and review all service bookings.</p>
      </div>

      {/* NEW BOOKINGS */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          This Week
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {newBookings.length === 0 ? (
            <p className="text-gray-400 col-span-2 text-center py-8">No new bookings this week.</p>
          ) : (
            newBookings.map(renderBooking)
          )}
        </div>
      </div>

      {/* SHOW OLD BUTTON */}
      {!showOld && (
        <button
          onClick={() => setShowOld(true)}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors"
        >
          <span>Show Previous Bookings</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
      )}

      {/* OLD BOOKINGS */}
      {showOld && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {filterBtns.map((f) => (
              <button
                key={f.val}
                onClick={() => setFilter(f.val)}
                className={`px-4 py-2 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
                  filter === f.val
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredOld.map(renderBooking)}
          </div>
        </div>
      )}

      {/* MODAL */}
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

export default AllBookings;