import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../authService";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const toastId = toast.loading("Resetting password...");
    setLoading(true);
    try {
      await resetPassword(token, { password });
      toast.success("Password updated!", { id: toastId });
      navigate("/login");
    } catch {
      toast.error("Invalid or expired link", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative overflow-hidden font-sans px-4 text-slate-200">
      
      {/* Dark Grid Background */}
      <div 
        className="absolute inset-0 bg-[#0A0F1C] pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
      />

      {/* --- RESET CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        {/* Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight mb-2">
              Reset Password 🔑
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Enter your new password below
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !password}
              className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-[56px]"
            >
              <span className="relative z-10">
                {loading ? "Resetting..." : "Reset Password"}
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;