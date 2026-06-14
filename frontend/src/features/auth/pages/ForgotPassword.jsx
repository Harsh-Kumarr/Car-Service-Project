import { useState } from "react";
import { forgotPassword } from "../authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";

// Standardizing with your UI components for consistency
import Input from "../../../components/ui/Input"; 
import Button from "../../../components/ui/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default if wrapped in form
    const toastId = toast.loading("Sending reset link...");
    setLoading(true);
    setLinkSent(false);
    try {
      await forgotPassword({ email });
      toast.success("Recovery link sent! Check your inbox.", { id: toastId });
      setLinkSent(true);
    } catch (err) {
      toast.error("Could not find an account with that email", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative overflow-hidden font-sans px-4 text-slate-200">
      
      {/* Glow Backdrop Bubble */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* --- RECOVERY CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        {/* Glow Border */}

        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 text-2xl text-blue-400">
              <CiLock />
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
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* SEND BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full relative overflow-hidden group/btn bg-[#BDDDFC] hover:bg-[#6A89A7] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(189,221,252,0.25)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-[56px]"
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
                ) : linkSent ? (
                  "Link Sent"
                ) : (
                  "Send Recovery Link"
                )}
              </span>
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-400">
              Wait, I remember it!{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-4"
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