import { useEffect, useState } from "react";
import { getAllBookings } from "../adminService";
import { BsCalendarDay } from "react-icons/bs";

const CompletedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getAllBookings();
      const sorted = (res.data.bookings || [])
        .filter((b) => b.status === "completed")
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
      setBookings(sorted);
    };
    fetchBookings();
  }, []);

  const renderBooking = (b) => (
    <div key={b._id} className="bg-emerald-50/20 rounded-2xl shadow-sm border border-emerald-100 p-6 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {b.vehicleId?.brand} {b.vehicleId?.model}
          </h3>
          <p className="text-sm text-gray-500">👤 {b.userId?.name}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-green-100 text-green-700">
          {b.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 bg-white p-3 rounded-xl mb-3 border border-emerald-50">🛠 {b.serviceType}</p>

      <p className="text-xs inline-flex items-center gap-2 text-gray-400 font-medium">
        <BsCalendarDay /> Completed: {new Date(b.updatedAt || b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Completed Bookings 🎉</h2>
        <p className="text-gray-500 mt-1">Review all successfully completed services.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100">
            <span className="text-4xl">🎉</span>
            <p className="text-gray-400 mt-2 font-medium">No completed bookings yet.</p>
          </div>
        ) : (
          bookings.map(renderBooking)
        )}
      </div>
    </div>
  );
};

export default CompletedBookings;
