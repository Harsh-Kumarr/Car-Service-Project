import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">
          🎉
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-8">Your service payment has been completed successfully. Thank you for choosing AutoAI!</p>
        <Link
          to="/bookings"
          className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all active:scale-95"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;