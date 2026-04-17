import { useEffect, useState } from "react";
import { getAllBookings } from "../adminService";
import { BsCalendarDay } from "react-icons/bs";

const RejectedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getAllBookings();
      const sorted = (res.data.bookings || [])
        .filter((b) => b.status === "rejected")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
    };
    fetchBookings();
  }, []);

  const renderBooking = (b) => (
    <div key={b._id} className="bg-red-50/30 rounded-2xl shadow-sm border border-red-100 p-6 transition-all opacity-80">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {b.vehicleId?.brand} {b.vehicleId?.model}
          </h3>
          <p className="text-sm text-gray-500">👤 {b.userId?.name}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-red-100 text-red-700">
          {b.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 bg-white p-3 rounded-xl mb-3 border border-red-50">🛠 {b.serviceType}</p>

      <p className="text-xs inline-flex items-center gap-2 text-gray-400 font-medium">
        <BsCalendarDay /> {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Rejected Bookings ❌</h2>
        <p className="text-gray-500 mt-1">Review all the bookings that were cancelled or rejected.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl">❌</span>
            <p className="text-gray-400 mt-2 font-medium">No rejected bookings found.</p>
          </div>
        ) : (
          bookings.map(renderBooking)
        )}
      </div>
    </div>
  );
};

export default RejectedBookings;
