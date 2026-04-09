import { useState } from "react";
import { forgotPassword } from "../authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Standardizing with your UI components for consistency
import Input from "../../../components/ui/Input"; 
import Button from "../../../components/ui/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default if wrapped in form
    const toastId = toast.loading("Sending reset link...");
    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success("Recovery link sent! Check your inbox.", { id: toastId });
    } catch (err) {
      toast.error("Could not find an account with that email", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden font-sans px-4 text-slate-200">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      {/* Amber/Orange Glow for Recovery theme */}
      <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px]"></div>
      {/* Grainy Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none"></div>

      {/* --- RECOVERY CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        {/* Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-rose-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 text-2xl">
              🔒
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight mb-2">
              Reset Password
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Enter your email and we'll send you instructions to recover your account
            </p>
          </div>

          <div className="space-y-6">
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                Registered Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 transition-all"
              />
            </div>

            {/* SEND BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-orange-600 to-rose-700 hover:from-orange-500 hover:to-rose-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-[56px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Recovery Link"
                )}
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-400">
              Wait, I remember it!{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors underline underline-offset-4"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;