import React from 'react';
import { motion } from "framer-motion";
import { Wrench, Paintbrush, Wind, Gauge, Sparkles, Binary } from "lucide-react"; // Optional: npm install lucide-react

const services = [
  {
    title: "General Service",
    desc: "Complete 360° vehicle diagnostic and precision maintenance.",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&auto=format&fit=crop&q=60",
    icon: <Wrench size={20} />,
  },
  {
    title: "Denting & Painting",
    desc: "Laser-matched color profiling and professional dent restoration.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600",
    icon: <Paintbrush size={20} />,
  },
  {
    title: "AI AC Repair",
    desc: "Smart climate control optimization and eco-friendly gas refill.",
    image: "https://images.unsplash.com/photo-1596493041237-e9cdbf8e5299?w=900&auto=format&fit=crop&q=60",
    icon: <Wind size={20} />,
  },
  {
    title: "Wheel Alignment",
    desc: "Digital suspension balancing for a smoother, safer drive.",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=600",
    icon: <Gauge size={20} />,
  },
  {
    title: "Car Wash & Spa",
    desc: "Deep nano-ceramic cleaning and interior detailing.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600",
    icon: <Sparkles size={20} />,
  },
  {
    title: "Engine Diagnostics",
    desc: "Real-time AI engine mapping to detect hidden performance leaks.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=600",
    icon: <Binary size={20} />,
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 px-6 bg-[#050810]" id="services">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Precision Solutions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Advanced AI <span className="text-gray-500">Auto Services.</span>
          </motion.h2>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-64 overflow-hidden p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                   <img 
                    src={s.image} 
                    alt={s.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
                  />
                  {/* Tech Overlay Effect */}
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-blue-400">
                    {s.icon}
                  </div>
                </div>
              </div>
              
              {/* CONTENT SECTION */}
              <div className="px-8 pb-8">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-[1px] bg-blue-500 group-hover:w-12 transition-all duration-500" />
                    <h3 className="text-xl font-bold text-white tracking-wide">{s.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {s.desc}
                </p>
                
                {/* EXPLORE LINK */}
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Configure Service <span>→</span>
                </div>
              </div>

              {/* BORDER GLOW HOVER */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-[2rem] pointer-events-none transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;