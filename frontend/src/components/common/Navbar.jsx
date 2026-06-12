import useAuthStore from "../../features/auth/authStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { MdOutlineReviews } from "react-icons/md";


const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [serviceType, setServiceType] = useState("General");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Fetch user's existing review when modal opens
  useEffect(() => {
    if (showReviewModal) {
      api.get("/reviews/my").then((res) => {
        if (res.data.review) {
          const r = res.data.review;
          setExistingReview(r);
          setRating(r.rating);
          setReviewText(r.review);
          setServiceType(r.serviceType || "General");
        }
      }).catch(() => {});
    }
  }, [showReviewModal]);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) return;
    setSubmitting(true);
    try {
      await api.post("/reviews", {
        rating,
        review: reviewText.trim(),
        serviceType,
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setSubmitted(false);
        setRating(0);
        setReviewText("");
        setServiceType("General");
        setExistingReview(null);
      }, 1800);
    } catch (err) {
      console.error("Review error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSubmitted(false);
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setServiceType("General");
    setExistingReview(null);
  };

  const serviceOptions = [
    "General",
    "Engine Repair",
    "Oil Change",
    "Full Service",
    "Battery Replacement",
    "Tyre Rotation & Balancing",
    "Coolant Flush",
    "AC Service",
    "Heater Repair",
    "Engine Repair",
    "Transmission Service",
    "Timing Belt Replacement",
    "Brake Service",
    "Suspension Repair",
    "Diagnostics",
    "Electrical Repair",
    "Denting & Painting",
    "Windshield Replacement",
  ];

  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-30 transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Toggle Button (hidden on desktop) */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 
            onClick={() => {
              if (user?.role === "admin") navigate("/admin/dashboard");
              else if (user?.role === "mechanic") navigate("/mechanic/jobs");
              else navigate("/dashboard");
            }}
            className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Smart Auto 
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          {/* ⭐ REVIEW BUTTON */}
          {user?.role === "user" && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="group relative inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 hover:from-amber-100 hover:to-yellow-100 hover:shadow-md hover:shadow-amber-100/50"
            >
              <span className="text-sm md:text-base transition-transform duration-300 group-hover:rotate-[20deg]"><MdOutlineReviews /></span>
              Review
            </button>
          )}

          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="text-mauve-800 hover:text-white hover:bg-black font-bold px-3 md:px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm border border-red-100 text-xs md:text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ⭐ REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={closeReviewModal}>
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ animation: "modalIn 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* SUCCESS STATE */}
            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200/50" style={{ animation: "bounceIn 0.5s ease-out" }}>
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Thank You! 🎉</h3>
                <p className="text-gray-500">Your review has been submitted successfully.</p>
              </div>
            ) : (
              <>
                {/* HEADER */}
                <div className="relative px-7 pt-7 pb-5">
                  <button onClick={closeReviewModal} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                    ✕
                  </button>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/50">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">
                        {existingReview ? "Update Your Review" : "Share Your Experience"}
                      </h3>
                      <p className="text-sm text-gray-400">We'd love to hear your feedback</p>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="px-7 pb-7 space-y-5">
                  {/* STAR RATING */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform duration-150 hover:scale-125 active:scale-90"
                        >
                          <svg
                            className={`w-8 h-8 transition-colors duration-200 ${
                              star <= (hoverRating || rating)
                                ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                                : "text-gray-200"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-3 text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                          {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SERVICE TYPE */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Type</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* REVIEW TEXT */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell us about your experience..."
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none placeholder:text-gray-300"
                    />
                    <div className="flex justify-end mt-1">
                      <span className={`text-xs font-medium ${reviewText.length > 450 ? "text-amber-500" : "text-gray-300"}`}>
                        {reviewText.length}/500
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-7 pb-7 flex gap-3">
                  <button
                    onClick={closeReviewModal}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors active:scale-95 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!rating || !reviewText.trim() || submitting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Submitting...
                      </span>
                    ) : existingReview ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              {/* <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👋</span>
              </div> */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to leave?</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to log out of your account?
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-mauve-800 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors shadow-sm active:scale-95"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INLINE ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
