import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../authSchema";
import { loginUser } from "../authService";
import useAuthStore from "../authStore";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Authenticating...");
    try {
      setApiError("");
      const res = await loginUser(data);
      const { token, user } = res.data;

      setAuth({ token, user });
      toast.success("Welcome back!", { id: toastId });

      if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (user.role === "mechanic") navigate("/mechanic/jobs", { replace: true });
      else navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      setApiError(message);
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative overflow-hidden font-sans px-4 text-slate-200">
      
      {/* Glow Backdrop Bubble */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* --- LOGIN CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* HEADER */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500 tracking-tight mb-3">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-sm font-light">
                Secure access to your dashboard
              </p>
            </div>

            {/* INPUTS CONTAINER */}
            <div className="space-y-6">
              {/* EMAIL */}
              <div className="space-y-1">
                <Input
                  label="Email Address"
                  name="email"
                  register={register}
                  errors={errors}
                  placeholder="name@company.com"
                  // Note: Ensure your Input component accepts custom classNames for dark mode
                  className="bg-slate-800/50 border-slate-700 text-white focus:ring-cyan-500/50"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative space-y-1">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  className="bg-slate-800/50 border-slate-700 text-white focus:ring-cyan-500/50"
                />
                {/* 👁️ TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ❌ ERROR MESSAGE */}
            {apiError && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 animate-shake">
                <p className="text-sm text-center font-medium">{apiError}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group/btn bg-[#BDDDFC] hover:bg-[#6A89A7] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(189,221,252,0.25)] transition-all duration-300 disabled:opacity-50 h-[56px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </Button>
            </div>

            {/* FOOTER LINKS */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col items-center space-y-4">
              <p className="text-sm text-slate-400">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-4"
                >
                  Create account
                </button>
              </p>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;