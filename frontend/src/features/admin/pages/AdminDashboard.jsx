import { useEffect } from "react";
import useAdminStore from "../adminStore";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import IssueChart from "../components/IssueChart";

const AdminDashboard = () => {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const revenueData = [
    { name: "Jan", value: 10000 },
    { name: "Feb", value: 20000 },
    { name: "Mar", value: 15000 },
  ];

  const statCards = [
    { title: "Total Bookings", value: stats.totalBookings, icon: "📋", color: "from-blue-500 to-indigo-500" },
    { title: "Completed", value: stats.completed, icon: "✅", color: "from-emerald-500 to-teal-500" },
    { title: "Revenue", value: `₹${stats.totalRevenue}`, icon: "💰", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard 📊
        </h2>
        <p className="text-gray-500 mt-1">Analytics overview of all bookings and revenue.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statCards.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} icon={s.icon} color={s.color} />
        ))}
      </div>

      {/* CHARTS */}
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
    </div>
  );
};

export default AdminDashboard;