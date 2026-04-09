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
    <div className="min-h-screen flex items-center justify-center bg-[#303748fb] relative overflow-hidden font-sans px-4">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/50 p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Reset Password 🔑
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Enter your new password below
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;