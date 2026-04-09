import { useState } from "react";
import { diagnoseIssue } from "../../../features/ai/aiServices";

const AiSection = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!input) return;

    try {
      setLoading(true);
      const res = await diagnoseIssue({ issue: input });
      setResult(res.data.data);
    } catch {
      alert("AI failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-10 bg-white relative overflow-hidden font-sans" id="ai">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT (FORM & RESULTS) */}
        <div className="lg:w-1/2 w-full z-10 relative">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              AI Diagnosis 🔥
            </h2>
            <p className="text-lg text-gray-500">
              Describe your vehicle's symptoms and let our advanced AI pinpoint the exact problem in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 mb-8 relative z-10">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Describe Your Issue</h3>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-32"
              placeholder="e.g. My car is making a loud squealing noise when I brake at high speeds..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleDiagnose}
              disabled={loading || !input}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Data...
                </>
              ) : (
                "Run AI Diagnostic"
              )}
            </button>
          </div>

          {/* RESULT CARD */}
          {result && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100 shadow-sm animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-indigo-600 text-xl text-center flex justify-center w-6 h-6 items-center font-bold">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Diagnosis Complete</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div className="bg-white/60 p-4 rounded-xl">
                  <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Identified Problem</span>
                  <span className="font-medium text-gray-900">{Array.isArray(result.causes) ? result.causes.join(", ") : result.causes}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl">
                    <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Cost</span>
                    <span className="font-bold text-2xl text-gray-900">₹{result.costEstimate}</span>
                  </div>
                  
                  <div className="bg-white/60 p-4 rounded-xl">
                    <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Urgency</span>
                    <span className={`font-bold text-lg ${result.urgency.toLowerCase() === 'high' ? 'text-red-500' : 'text-orange-500'}`}>
                      {result.urgency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT (FLOATING IMAGE) */}
        <div className="lg:w-1/2 w-full relative hidden lg:block group">
          {/* Decorative Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100 rounded-full mix-blend-multiply blur-[80px] opacity-70"></div>
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-indigo-100 rounded-full mix-blend-multiply blur-[80px] opacity-70"></div>

          <div className="relative z-20 group-hover:-translate-y-4 transition-transform duration-[1000ms] ease-in-out">
            <img 
              src="https://images.unsplash.com/photo-1530906358829-e84b2769270f?q=80&w=1000&auto=format&fit=crop" 
              alt="AI Car Diagnostic" 
              className="w-full h-auto rounded-3xl shadow-2xl object-cover border-4 border-white transform rotate-2 group-hover:rotate-0 transition-transform duration-700"
            />
          </div>
          
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-30 group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-xl font-bold">85%</div>
              <div>
                <p className="font-bold text-gray-900">Accuracy Rate</p>
                <p className="text-sm text-gray-500">Based on 10k+ scans</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AiSection;