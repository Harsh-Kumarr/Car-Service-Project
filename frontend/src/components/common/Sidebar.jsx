import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <li>
        <Link 
          to={to} 
          onClick={() => setIsOpen(false)}
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
    <>
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
        />
      )}

      <div className={`fixed inset-y-0 left-0 w-64 h-screen bg-[#0A0F1C] text-white p-6 border-r border-white/5 flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between mb-10 mt-2 px-2">
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Menu</h2>
            <p className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 cursor-default">
              AutoAI 
            </p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2 flex-1">
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

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin/dashboard">Admin Overview</NavLink>
              <NavLink to="/admin/bookings">Pending/All</NavLink>
              <NavLink to="/admin/bookings/accepted">Accepted</NavLink>
              <NavLink to="/admin/bookings/completed">Completed</NavLink>
              <NavLink to="/admin/bookings/rejected">Rejected</NavLink>
            </>
          )}

          {user?.role === "mechanic" && (
            <>
              <NavLink to="/mechanic/jobs">My Jobs</NavLink>
            </>
          )}
        </ul>
        
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
    </>
  );
};

export default Sidebar;