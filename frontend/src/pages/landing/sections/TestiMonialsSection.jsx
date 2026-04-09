const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Verified Customer",
    review: "Amazing service! AI diagnosed my issue instantly and saved me a huge mechanic bill. The mechanics were professional and on-time.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Priya Verma",
    role: "Verified Customer",
    review: "Very smooth experience. Booking was super easy and I loved the transparent pricing. My AC is chilling perfectly now.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Amit Singh",
    role: "Verified Customer",
    review: "Loved the tracking feature. Highly recommended! I could see every step of the repair process live from my phone.",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-gray-50 font-sans relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply blur-[80px] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            What Our Users Say ⭐
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Don't just take our word for it. See how we're changing the car service experience for thousands of happy customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative group"
            >
              <div className="absolute -top-4 -right-2 text-6xl text-gray-100 font-serif group-hover:text-blue-50 transition-colors">
                "
              </div>
              <div className="flex text-yellow-400 mb-6 text-sm">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">"{t.review}"</p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"/>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;