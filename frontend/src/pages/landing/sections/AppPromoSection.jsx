import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";


const AppPromoSection = () => {
  return (
    <section className="py-28 px-6 md:px-10 bg-[#0A0F1C] text-white text-center relative overflow-hidden font-sans">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/30 rounded-full mix-blend-screen blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/30 rounded-full mix-blend-screen blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
          Your Intelligent Garage,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Now in Your Pocket 📱</span>
        </h2>

        <p className="mb-12 text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Book services, track repairs, and use our AI diagnosis engine anywhere you go. Experience the future of automotive care.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-bold min-w-[200px]">
            <span className="text-2xl"><IoLogoGooglePlaystore />
</span>
            <div className="text-left">
               <div className="text-xs text-gray-500 font-medium">GET IT ON</div>
               <div className="text-lg">Google Play</div>
            </div>
          </button>

          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-bold min-w-[200px]">
            <span className="text-2xl"><FaApple />
</span>
            <div className="text-left">
               <div className="text-xs text-gray-300 font-medium">Download on the</div>
               <div className="text-lg">App Store</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;