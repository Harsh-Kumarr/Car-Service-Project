import { motion } from "framer-motion";

const Loader = () => {
  // Animation Variants
  const containerVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const letterVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const lineVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        delay: 1.5, 
        duration: 1.5, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };

  const word = "SMART AUTO";

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Text with Staggered Letters */}
        <div className="flex overflow-hidden">
          {word.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: 0.2 + index * 0.05,
                duration: 0.8,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
              className="text-5xl md:text-7xl text-white font-bold tracking-tighter inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Subtext with Letter Spacing Animation */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-blue-400/80 mt-4 text-[10px] md:text-xs uppercase font-light"
        >
          Intelligent Car Experience
        </motion.p>

        {/* Progress Bar Container */}
        <div className="relative w-64 h-[1px] bg-white/10 mt-10 overflow-hidden">
          {/* Main Loading Line */}
          <motion.div
            variants={lineVariants}
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />
          
          {/* Secondary "Pulse" Line */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear",
              delay: 2
            }}
            className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          />
        </div>

        {/* System Status Decorative Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 flex gap-4"
        >
           <span className="text-[8px] text-gray-600 font-mono animate-pulse underline underline-offset-4">SYSTEM_READY</span>
           <span className="text-[8px] text-gray-600 font-mono">0x442_STARTUP</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;