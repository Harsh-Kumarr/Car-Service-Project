import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden font-sans">
      
      {/* Container for the 404 and Clouds */}
      <div className="relative flex flex-col items-center justify-center w-full">
        
        {/* LARGE BACKGROUND 404 with Gradient */}
        <h1 className="text-[180px] md:text-[350px] font-bold leading-none select-none tracking-tighter
                       bg-gradient-to-b from-[#94b3a7] via-[#7a9e92] to-transparent bg-clip-text text-transparent">
          404
        </h1>

        {/* CLOUD EFFECT OVERLAY */}
        {/* This creates the misty fade at the bottom of the 404 */}
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
        
        {/* Optional: Add decorative cloud-like shapes for more realism */}
        <div className="absolute bottom-[-20px] flex justify-center opacity-60">
            <svg width="1000" height="200" viewBox="0 0 1000 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="150" r="120" />
                <circle cx="400" cy="160" r="100" />
                <circle cx="600" cy="150" r="130" />
                <circle cx="800" cy="170" r="110" />
                <circle cx="500" cy="180" r="150" />
            </svg>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 text-center px-6 -mt-12 md:-mt-20">
        <h2 className="text-3xl md:text-5xl font-medium text-gray-900 tracking-tight">
          Sorry, that page could not be found
        </h2>

        <p className="text-gray-400 mt-4 text-sm md:text-base max-w-md mx-auto">
          The requested page either doesn't exist or you don't have access to it.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mt-10 px-8 py-2.5 bg-black text-white text-sm font-medium rounded-md 
                     hover:bg-gray-800 transition-all duration-200 shadow-lg active:scale-95"
        >
          Go Back Home
        </button>
      </div>

    </div>
  );
};

export default NotFound;