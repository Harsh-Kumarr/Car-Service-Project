import { useState } from "react";
import { diagnoseIssue } from "../aiServices";
import ChatBox from "../components/ChatBox";
import ResultCard from "../components/ResultCard";
import toast from "react-hot-toast";

const Diagnose = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    try {
      setLoading(true);
      const res = await diagnoseIssue({ issue: input });
      setResult(res.data.data);
    } catch (err) {
      toast.error("AI diagnosis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">AI Vehicle Diagnosis 🤖</h2>
        <p className="text-gray-500 mt-1">Describe your vehicle's issue and let AI help diagnose it.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <ChatBox input={input} setInput={setInput} onSend={handleSend} loading={loading} />
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-6 text-gray-500">
          <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-medium">Analyzing your issue...</span>
        </div>
      )}

      <ResultCard result={result} />
    </div>
  );
};

export default Diagnose;