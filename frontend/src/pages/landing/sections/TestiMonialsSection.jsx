import { useState, useEffect } from "react";

// Fallback testimonials (shown when no API reviews or alongside)
const fallbackTestimonials = [
  {
    name: "Rahul Sharma",
    role: "Verified Customer",
    review: "Amazing service! AI diagnosed my issue instantly and saved me a huge mechanic bill. The mechanics were professional and on-time.",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "Verified Customer",
    review: "Very smooth experience. Booking was super easy and I loved the transparent pricing. My AC is chilling perfectly now.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "Verified Customer",
    review: "Loved the tracking feature. Highly recommended! I could see every step of the repair process live from my phone.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5 mb-6">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews?.length > 0) {
          const apiReviews = data.reviews.map((r) => ({
            name: r.userId?.name || "Anonymous",
            role: r.serviceType || "Verified Customer",
            review: r.review,
            rating: r.rating,
            avatar: `https://i.pravatar.cc/150?u=${r._id}`,
            isReal: true,
          }));
          setReviews([...apiReviews]);
        } else {
          setReviews(fallbackTestimonials);
        }
      })
      .catch(() => {
        setReviews(fallbackTestimonials);
      })
      .finally(() => setLoading(false));
  }, []);

  // Show max 6 reviews
  const displayReviews = reviews.slice(0, 6);

  return (
    <section className="py-24 px-6 md:px-10 bg-gray-50 font-sans relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply blur-[80px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200 rounded-full mix-blend-multiply blur-[60px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            What Our Users Say 
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Don't just take our word for it. See how we're changing the car service experience for thousands of happy customers.
          </p>
          {reviews.some((r) => r.isReal) && (
            <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live reviews from real customers
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 bg-white rounded-3xl shadow-sm animate-pulse">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-100 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayReviews.map((t, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Quote mark */}
                <div className="absolute -top-4 -right-2 text-6xl text-gray-100 font-serif group-hover:text-blue-50 transition-colors">
                  "
                </div>

                {/* Live badge */}
                {t.isReal && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Verified
                    </span>
                  </div>
                )}

                <StarRating rating={t.rating} />
                <p className="text-gray-600 mb-8 leading-relaxed relative z-10">"{t.review}"</p>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                  {/* <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"/> */}
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;