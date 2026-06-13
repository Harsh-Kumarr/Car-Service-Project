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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

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
          relative pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out
          ${isOpen ? "overflow-visible" : "overflow-hidden"}
          ${scrolled 
            ? "w-full max-w-5xl rounded-2xl bg-[#0A0F1C]/80 backdrop-blur-xl border border-white/10 px-4 sm:px-8 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "w-full max-w-7xl rounded-none bg-transparent px-4 sm:px-10 py-4 sm:py-5 border-transparent"
          }
        `}
      >
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

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white px-4 py-2 transition-colors pointer-events-auto"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="relative group overflow-hidden bg-white text-black px-6 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-white/5 pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Login
            </span>
          </Link>

          {/* Hamburger Menu Toggle Button for Mobile/Tablet */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors pointer-events-auto"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* --- MOBILE DROPDOWN --- */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-[#0A0F1C]/95 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-40 rounded-b-2xl pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white text-sm font-semibold transition-colors py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-sm font-semibold transition-colors py-2 border-b border-white/5"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-sm font-semibold transition-colors py-2"
            >
              Register
            </Link>
          </motion.div>
        )}

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