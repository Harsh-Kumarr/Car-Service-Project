import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const plans = [
  {
    name: "Basic",
    price: "₹499",
    features: ["General Checkup", "Basic Support", "Standard Tools"],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹999",
    features: ["Full Service", "Priority Support", "AI Diagnosis", "Weekly Reports"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹1999",
    features: ["All Services", "Fast Repair", "Live Tracking", "Dedicated Agent"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-gray-200 font-sans" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl flex justify-center font-extrabold text-gray-900 tracking-tight mb-4">
            Pricing Plans <span> <RiMoneyRupeeCircleFill />
</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the perfect care package for your vehicle. Simple, transparent pricing with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                p.popular 
                  ? "bg-slate-900 text-white shadow-2xl border-transparent md:-mt-8 md:mb-8" 
                  : "bg-white text-gray-900 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              }`}
            >
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-4 ${p.popular ? "text-gray-200" : "text-gray-600"}`}>{p.name}</h3>
                <p className={`text-5xl font-extrabold mb-2 ${p.popular ? "text-white" : "text-gray-900"}`}>
                  {p.price}
                </p>
                <p className={`text-sm ${p.popular ? "text-gray-400" : "text-gray-500"}`}>per service</p>
              </div>

              <ul className="mb-8 space-y-4">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className={`w-5 h-5 flex-shrink-0 ${p.popular ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={p.popular ? "text-gray-300" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                p.popular 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-gray-200 hover:bg-gray-400 text-gray-900"
              }`}>
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;