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
          className="w-full h-full object-cover opacity-80"
        />
        {/* Advanced Gradient: Darker on the right to make text pop, subtle radial glow in center */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent)]" />
      </motion.div>

      {/* --- TECH/AI OVERLAY EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Overlay */}
        {/* <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '60px 60px' }} />
         */}
        {/* Animated Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-20"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 h-full flex items-center justify-end px-8 md:px-24">
        
        <div className="max-w-2xl text-right">
          
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              Automotive Intelligence v2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Intelligent <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                Car Service
              </span> <br /> 
              Experience
            </h1>
          </motion.div>

          {/* Animated Description */}
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg ml-auto"
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
            className="mt-10 flex flex-col items-end gap-4"
          >
            <Link
              to="/register"
              className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:pr-14"
            >
              <span className="relative z-10">Get Started</span>
              {/* Arrow that appears on hover */}
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                →
              </span>
            </Link>
            
            <div className="flex gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest mt-4">
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
      <div className="absolute bottom-10 left-10 hidden md:block">
         <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-white/20" />
         <p className="[writing-mode:vertical-lr] text-[10px] text-gray-500 tracking-[0.5em] mt-4 uppercase">
           Scroll to explore
         </p>
      </div>

    </section>
  );
};

export default HeroSection;