import useAuthStore from "../../features/auth/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  
  return (
    <>
      <div className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40 transition-all duration-300">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200">
          Smart Auto 
        </h1>
        
        <button 
          onClick={() => setShowLogoutModal(true)} 
          className="text-red-500 hover:text-white hover:bg-red-500 font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm border border-red-100"
        >
          Logout
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to leave?</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to log out of your account?
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors shadow-sm active:scale-95"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
