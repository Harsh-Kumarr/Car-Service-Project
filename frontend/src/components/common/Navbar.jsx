import useAuthStore from "../../features/auth/authStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40 transition-all duration-300">
      <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200">
        Smart Auto 🚗
      </h1>
      
      <button 
        onClick={handleLogout} 
        className="text-red-500 hover:text-white hover:bg-red-500 font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm border border-red-100"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
