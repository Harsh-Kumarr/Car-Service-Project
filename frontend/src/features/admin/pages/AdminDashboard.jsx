import { useEffect, useState } from "react";
import useAdminStore from "../adminStore";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import IssueChart from "../components/IssueChart";
import { BsCalendarDay, BsSearch } from "react-icons/bs";
import { FaChartPie, FaUsers } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const AdminDashboard = () => {
  const { stats, fetchStats } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const revenueData = [
    { name: "Jan", value: 10000 },
    { name: "Feb", value: 20000 },
    { name: "Mar", value: 15000 },
  ];

  const statCards = [
    { title: "Total Bookings", value: stats.totalBookings, icon: <BsCalendarDay />, color: "from-blue-500 to-indigo-500" },
    { title: "Completed", value: stats.completed, icon: <IoShieldCheckmarkSharp />, color: "from-emerald-500 to-teal-500" },
    { title: "Revenue", value: `₹${stats.totalRevenue}`, icon: <GiTakeMyMoney />, color: "from-purple-500 to-violet-500" },
    { title: "Total Users", value: stats.totalUsers || 0, icon: <FaUsers />, color: "from-amber-500 to-orange-500" },
  ];

  const filteredUsers = (stats.usersList || []).filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold inline-flex items-center gap-2 text-gray-900 tracking-tight">
          Admin Dashboard <FaChartPie />
        </h2>
        <p className="text-gray-500 mt-1">Analytics overview of all bookings and revenue.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
          <RevenueChart data={revenueData} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Issues</h3>
          <IssueChart data={stats.topIssues || []} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Registered Users <FaUsers className="text-orange-500" />
            </h3>
            <p className="text-sm text-gray-500 mt-1">Directory of registered customers and their vehicle counts.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center  text-gray-400">
                <BsSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-800"
              />
            </div>
            
          </div>
        </div>

        <div className="overflow-y-auto max-h-[580px] rounded-xl border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">
              <tr className="text-gray-600 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4 text-center">Total Cars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400 font-medium">
                    {searchQuery ? "No users match your search query." : "No users registered yet."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-xs min-w-8">
                        {user.totalCars}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;