import { useState } from "react";
import { useParams } from "react-router-dom";
import { createOrder, verifyPayment } from "../paymentService";
import toast from "react-hot-toast";

const Invoice = ({ bookingId: propBookingId, amount = 5000 }) => {
  const { bookingId: paramBookingId } = useParams();
  const bookingId = propBookingId || paramBookingId;

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!bookingId) return toast.error("No booking ID found");

    try {
      setLoading(true);
      const res = await createOrder(bookingId);
      const { order } = res.data;

      const options = {
        key: "rzp_test_SX2g2LKhjBcqkt",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async (response) => {
          await verifyPayment({ ...response, bookingId });
          toast.success("Payment successful!");
          window.location.href = "/payment-success";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl mx-auto mb-4">💳</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Invoice</h2>
          <p className="text-gray-500 mt-1">Review and complete your payment</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Booking ID</span>
            <span className="text-sm font-bold text-gray-900 font-mono truncate max-w-[200px]">{bookingId}</span>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Amount</span>
            <span className="text-2xl font-extrabold text-gray-900">₹{amount}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </>
          ) : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Invoice;