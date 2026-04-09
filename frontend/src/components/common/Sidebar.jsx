import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <li>
        <Link 
          to={to} 
          className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 ${
            isActive 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20" 
              : "text-gray-400 hover:bg-white/5 hover:text-white hover:pl-5"
          }`}
        >
          {children}
        </Link>
      </li>
    );
  };

  return (
    <div className="w-64 h-screen bg-[#0A0F1C] text-white p-6 border-r border-white/5 flex flex-col shadow-2xl relative z-50">
      <div className="mb-10 mt-2 px-2">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Menu</h2>
        <p className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 cursor-default">
          AutoAI <span className="text-blue-500">⚡</span>
        </p>
      </div>

      <ul className="space-y-2 flex-1">
        {/* USER */}
        {user?.role === "user" && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/add-vehicle">Add Vehicle</NavLink>
            <NavLink to="/vehicles">My Vehicles</NavLink>
            <NavLink to="/create-booking">Book Service</NavLink>
            <NavLink to="/bookings">My Bookings</NavLink>
            <NavLink to="/ai-diagnose">AI Diagnose</NavLink>
          </>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/dashboard">Admin Overview</NavLink>
            <NavLink to="/admin/bookings">All Bookings</NavLink>
          </>
        )}

        {/* MECHANIC */}
        {user?.role === "mechanic" && (
          <>
            <NavLink to="/mechanic/jobs">My Jobs</NavLink>
          </>
        )}
      </ul>
      
      {/* USER PROFILE SNIPPET AT BOTTOM */}
      <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex flex-shrink-0 items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-sm truncate text-gray-200 group-hover:text-white transition-colors">{user?.name || "User"}</p>
          <p className="text-xs text-gray-400 capitalize truncate group-hover:text-gray-300 transition-colors">{user?.role || "Role"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;