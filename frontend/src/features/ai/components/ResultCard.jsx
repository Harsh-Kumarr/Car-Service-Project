const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <span className="text-indigo-600 text-xl flex justify-center w-6 h-6 items-center font-bold">✓</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Diagnosis Result</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 p-4 rounded-xl">
          <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Possible Causes</span>
          <span className="font-medium text-gray-900">
            {Array.isArray(result.causes) ? result.causes.join(", ") : result.causes}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-xl">
            <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Cost</span>
            <span className="font-bold text-2xl text-gray-900">₹{result.costEstimate}</span>
          </div>
          <div className="bg-white/60 p-4 rounded-xl">
            <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Urgency</span>
            <span className={`font-bold text-lg ${result.urgency?.toLowerCase() === "high" ? "text-red-500" : "text-orange-500"}`}>
              {result.urgency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;