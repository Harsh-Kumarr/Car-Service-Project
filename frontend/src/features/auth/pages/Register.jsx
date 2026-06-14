import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../authSchema";
import { registerUser } from "../authService";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");
    setApiError("");
    try {
      await registerUser(data);
      toast.success("Account created! Check your email for OTP.", { id: toastId });
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Try again.";
      setApiError(message);
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative overflow-hidden font-sans py-12 px-4 text-slate-200">
      
      {/* Glow Backdrop Bubble */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* --- REGISTER CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        {/* Glow Border Effect */}
        {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div> */}
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* HEADER */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight mb-2">
                Create Account
              </h2>
              <p className="text-slate-400 text-sm font-light">
                Join our community and get started
              </p>
            </div>

            {/* INPUTS */}
            <div className="space-y-5">
              {/* NAME */}
              <Input
                label="Full Name"
                name="name"
                register={register}
                errors={errors}
                placeholder="Johny"
                className="bg-slate-800/50 border-slate-700 text-white focus:ring-blue-500/50"
              />

              {/* EMAIL */}
              <Input
                label="Email Address"
                name="email"
                register={register}
                errors={errors}
                placeholder="xyzgmail.com"
                className="bg-slate-800/50 border-slate-700 text-white focus:ring-blue-500/50"
              />

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                  className="bg-slate-800/50 border-slate-700 text-white focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/*ERROR MESSAGE */}
            {apiError && (
              <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 animate-pulse">
                <p className="text-xs text-center font-medium">{apiError}</p>
              </div>
            )}

            {/* REGISTER BUTTON */}
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
                      Processing...
                    </>
                  ) : (
                    "Register"
                  )}
                </span>
              </Button>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-sm text-slate-400">
                Already part of the team?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-4"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;