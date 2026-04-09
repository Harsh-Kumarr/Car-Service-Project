import { useEffect, useState } from "react";
import { getMyBookings } from "../bookingService";
import { Link } from "react-router-dom";

const statusColor = (status) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    diagnosing: "bg-purple-100 text-purple-700",
    repairing: "bg-orange-100 text-orange-700",
    testing: "bg-indigo-100 text-indigo-700",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then((res) => {
      setBookings(res.data.bookings || []);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Bookings 📋</h2>
        <p className="text-gray-500 mt-1">Track the status of all your service bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-5xl mb-4 block">📭</span>
          <p className="text-gray-500 font-medium">No bookings yet. Book your first service!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {b.vehicleId?.brand} {b.vehicleId?.model}
                  </h3>
                  <p className="text-sm text-gray-500">Owner: {b.userId?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor(b.status)}`}>
                  {b.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                {b.issueDescription || b.serviceType || "No description"}
              </p>

              {/* ASSIGNED MECHANIC */}
              {b.assignedMechanic && (
                <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                    {b.assignedMechanic.name?.charAt(0)?.toUpperCase() || "M"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">{b.assignedMechanic.name}</p>
                    <p className="text-xs text-blue-500">Assigned Mechanic</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-400 font-medium">
                  📅 {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>

                {/* PAYMENT BUTTON — show when completed & not yet paid */}
                {b.status === "completed" && b.paymentStatus !== "paid" && (
                  <Link
                    to={`/invoice/${b._id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-sm transition-all active:scale-95 hover:-translate-y-0.5"
                  >
                    💳 Pay Now
                  </Link>
                )}

                {/* PAID BADGE — show when already paid */}
                {b.paymentStatus === "paid" && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    ✓ Payment Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;