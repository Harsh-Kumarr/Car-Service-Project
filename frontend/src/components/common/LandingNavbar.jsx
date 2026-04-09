import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "AI Diagnose", href: "#ai" },
  { name: "Pricing", href: "#pricing" },
];

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle background transition
      setScrolled(window.scrollY > 50);

      // 2. Calculate scroll progress percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercent = (winScroll / height) * 100;
      
      setScrollProgress(scrolledPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50 flex justify-center pt-2 px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          relative pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out overflow-hidden
          ${scrolled 
            ? "w-full max-w-5xl rounded-2xl bg-[#0A0F1C]/80 backdrop-blur-xl border border-white/10 px-8 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "w-full max-w-7xl rounded-none bg-transparent px-10 py-5 border-transparent"
          }
        `}
      >
        {/* --- LOGO --- */}
        <Link to="/" className="group flex items-center gap-2">
          <div className=" p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <div className="w-10 h-10"> <img src="/logo.png" alt="" /></div>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tighter">
            Auto<span className="text-blue-500">AI</span>
          </h1>
        </Link>

        {/* --- NAV LINKS (DESKTOP) --- */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white px-4 py-2 transition-colors"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="relative group overflow-hidden bg-white text-black px-6 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Get Started
            </span>
          </Link>
        </div>

        {/* --- REAL-TIME PROGRESS BAR --- */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500"
            style={{ width: `${scrollProgress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </motion.nav>
    </div>
  );
};

export default LandingNavbar;