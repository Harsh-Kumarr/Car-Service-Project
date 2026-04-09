import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black text-gray-400 overflow-hidden pt-20">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/sunder.jpg" 
          alt="Car Background" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
        />
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        
        {/* --- FLOATING CTA (HUD STYLE) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
              Ready to shift into <span className="text-blue-500 italic">high gear?</span>
            </h3>
            <p className="text-gray-400 mt-3 text-lg font-light max-w-md">
              Join the elite circle of car owners using AI-driven precision care.
            </p>
          </div>
          <Link
            to="/register"
            className="group relative px-10 py-4 bg-blue-600 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* --- MAIN NAVIGATION GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16">
          
          {/* BRANDING COLUMN */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h1 className="text-3xl font-black text-white tracking-tighter mb-6">
              AUTO<span className="text-blue-500">AI</span>
            </h1>
            <p className="text-gray-500 leading-relaxed text-[15px] max-w-xs mb-8">
              Engineering the future of automotive reliability through 
              Artificial Intelligence and master craftsmanship.
            </p>
            {/* SOCIALS */}
            <div className="flex gap-4">
              {[FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Home', 'Services', 'AI Diagnose', 'Pricing'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-all flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-blue-500 group-hover:w-3 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Specialties</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Engine Mapping</li>
                <li className="hover:text-white cursor-pointer transition-colors">Digital Denting</li>
                <li className="hover:text-white cursor-pointer transition-colors">Smart AC Calibration</li>
                <li className="hover:text-white cursor-pointer transition-colors">Ceramic Shield</li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Headquarters</h4>
              <p className="text-sm leading-7 text-gray-500 italic">
                Sector 17, Intelligence Hub,<br />
                Chandigarh, Punjab 160017<br />
                <span className="text-blue-400 mt-2 block font-mono">contact@autoai.tech</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT BAR --- */}
        <div className="border-t border-white/10 py-10 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono uppercase tracking-widest text-gray-600">
          <p>© {currentYear} AutoAI Automotive Dynamics</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Protocol</a>
            <a href="#" className="hover:text-white">Service Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;