import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-[Poppins]">

      {/* --- BACKGROUND LAYER --- */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/car1.jpg"
          alt="Car"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Symmetric Dark Overlays for Centered Text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0A0F1C]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
      </motion.div>

      {/* --- TECH/AI OVERLAY EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Scanning Line */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-20"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">

        <div className="max-w-3xl text-center mx-auto">

          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-blue-400 font-tourney text-base md:text-lg tracking-[0.4em] uppercase mb-4 block">
              Automotive Intelligence v2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-tourney text-white leading-[1.1] tracking-tight uppercase">
              AUTO AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                Car Service
              </span>
            </h1>
          </motion.div>

          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Precision engineering meets artificial intelligence.
            Automate your maintenance, predict repairs, and optimize
            performance with a single tap.
          </motion.p>

          {/* Animated CTA Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <Link
              to="/register"
              className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:px-14 active:scale-95 shadow-lg shadow-white/10"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                →
              </span>
            </Link>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 uppercase tracking-widest mt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> Real-time Diagnostics
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> AI Powered
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- BOTTOM DECORATION --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center hidden md:flex">
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
        <p className="text-[9px] text-gray-500 tracking-[0.6em] mt-3 uppercase">
          Scroll to explore
        </p>
      </div>

    </section>
  );
};

export default HeroSection;