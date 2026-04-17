import { useEffect, useState } from "react";
import { getMyBookings } from "../../booking/bookingService";
import { getVehicles } from "../../vehicle/vehicleService";
import { Link } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";
import { BsTools } from "react-icons/bs";
import { BsCalendarDay } from "react-icons/bs";


const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, vehicleRes] = await Promise.all([
          getMyBookings(),
          getVehicles(),
        ]);
        setBookings(bookingRes.data.bookings || []);
        setVehicles(vehicleRes.data.vehicles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Vehicles", value: vehicles.length, icon: <IoCarSportOutline />, color: "from-blue-500 to-indigo-500" },
    { title: "Total Bookings", value: bookings.length, icon: <BsCalendarDay />, color: "from-emerald-500 to-teal-500" },
    { title: "Active Services", value: bookings.filter(b => b.status !== "completed").length, icon: <BsTools />, color: "from-orange-500 to-amber-500" },
  ];

  const statusColor = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl inline-flex items-center gap-2 font-extrabold text-gray-900 tracking-tight">
          Welcome to Dashboard <IoCarSportOutline />
        </h2>
        <p className="text-gray-500 mt-1">Here's an overview of your vehicles and services.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statCards.map((s, i) => (
          <div key={i} className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:bg-gray-100 transition-shadow group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.color} rounded-full -translate-y-6 translate-x-6 opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <span className="text-3xl">{s.icon}</span>
            <p className="text-sm text-gray-500 font-medium mt-3">{s.title}</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No bookings yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {bookings.slice(0, 5).map((b) => (
              <div key={b._id} className="px-6 py-4 hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{b.serviceType}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{b.vehicleId?.brand} {b.vehicleId?.model}</p>
                  </div>

                  <h4 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    Status:
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </h4>
                </div>

                {/* PAYMENT + MECHANIC ROW */}
                <div className="flex items-center justify-between mt-3">
                  {/* PAYMENT STATUS */}
                  <div>
                    {b.status === "completed" && b.paymentStatus !== "paid" && (
                      <Link
                        to={`/invoice/${b._id}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 hover:-translate-y-0.5"
                      >
                        💳 Pay Now
                      </Link>
                    )}
                    {b.paymentStatus === "paid" && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                        ✓ Payment Completed
                      </span>
                    )}
                  </div>

                  {/* ASSIGNED MECHANIC */}
                  {b.assignedMechanic && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                      🔧 {b.assignedMechanic.name || "Mechanic Assigned"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;