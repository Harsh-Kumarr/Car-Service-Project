import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../authSchema";
import { verifyOTP } from "../authService";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Verifying code...");
    try {
      await verifyOTP(data);
      toast.success("Identity verified!", { id: toastId });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden font-sans px-4 text-slate-200">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-fuchsia-600/10 rounded-full blur-[100px]"></div>
      {/* Grainy Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none"></div>

      {/* --- VERIFY CARD --- */}
      <div className="w-full max-w-md relative group z-10">
        {/* Card Outer Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* HEADER */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 text-2xl">
                ✉️
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 tracking-tight mb-2">
                Verify OTP
              </h2>
              <p className="text-slate-400 text-sm font-light">
                We've sent a 6-digit code to your inbox
              </p>
            </div>

            {/* INPUTS */}
            <div className="space-y-6">
              <div className="opacity-70 grayscale-[0.5]">
                <Input
                  label="Target Email"
                  name="email"
                  register={register}
                  errors={errors}
                  readOnly
                  className="bg-slate-950/50 border-slate-800 text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <Input
                  label="One-Time Password"
                  name="otp"
                  register={register}
                  errors={errors}
                  placeholder="0 0 0 0 0 0"
                  className="bg-slate-800/50 border-slate-700 text-white text-center text-xl tracking-[0.5em] focus:ring-indigo-500/50"
                />
              </div>
            </div>

            {/* VERIFY BUTTON */}
            <div className="pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-indigo-600 to-fuchsia-700 hover:from-indigo-500 hover:to-fuchsia-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 disabled:opacity-50 h-[56px]"
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
                    "Confirm Access"
                  )}
                </span>
                {/* Shine Animation */}
                <div className="absolute inset-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              </Button>
            </div>

            {/* RESEND SECTION */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-sm text-slate-400">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline underline-offset-4"
                >
                  Resend Code
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;