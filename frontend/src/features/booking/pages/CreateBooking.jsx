import { useForm } from "react-hook-form";
import { createBooking } from "../bookingService";
import { useEffect, useState } from "react";
import useVehicleStore from "../../vehicle/vehicleStore";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

const SERVICE_TYPES = [
  {
    category: "🔧 Maintenance",
    services: [
      { value: "Oil Change", desc: "Engine oil & filter replacement" },
      { value: "Full Service", desc: "Complete multi-point inspection & servicing" },
      { value: "Battery Replacement", desc: "Battery testing & replacement" },
      { value: "Tyre Rotation & Balancing", desc: "Rotate, balance & align tyres" },
      { value: "Coolant Flush", desc: "Cooling system flush & refill" },
    ],
  },
  {
    category: "❄️ Climate & Comfort",
    services: [
      { value: "AC Service", desc: "AC gas refill, cooling check & vent cleaning" },
      { value: "Heater Repair", desc: "Heater core, blower motor & thermostat fix" },
    ],
  },
  {
    category: "⚙️ Engine & Drivetrain",
    services: [
      { value: "Engine Repair", desc: "Engine diagnostics, rebuild & part replacement" },
      { value: "Transmission Service", desc: "Gearbox fluid change, clutch & shifting repair" },
      { value: "Timing Belt Replacement", desc: "Belt/chain inspection & replacement" },
    ],
  },
  {
    category: "🛞 Brakes & Suspension",
    services: [
      { value: "Brake Service", desc: "Brake pads, rotors, fluid & line inspection" },
      { value: "Suspension Repair", desc: "Shocks, struts, bushings & alignment" },
    ],
  },
  {
    category: "⚡ Electrical & Diagnostics",
    services: [
      { value: "Diagnostics", desc: "OBD-II scan, fault code analysis & troubleshooting" },
      { value: "Electrical Repair", desc: "Wiring, fuse, alternator & starter motor fixes" },
    ],
  },
  {
    category: "🎨 Body & Exterior",
    services: [
      { value: "Denting & Painting", desc: "Dent removal, scratch repair & full repaint" },
      { value: "Windshield Replacement", desc: "Cracked or chipped windshield replacement" },
    ],
  },
];

const CreateBooking = () => {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm();
  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);
  const [selectedService, setSelectedService] = useState(null);

  const watchedService = watch("serviceType");

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (watchedService) {
      const found = SERVICE_TYPES
        .flatMap((cat) => cat.services)
        .find((s) => s.value === watchedService);
      setSelectedService(found || null);
    } else {
      setSelectedService(null);
    }
  }, [watchedService]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating booking...");
    try {
      await createBooking(data);
      toast.success("Booking created!", { id: toastId });
    } catch {
      toast.error("Error creating booking", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Book Service 🛠️</h2>
          <p className="text-gray-500 mt-1">Select your vehicle and choose the service you need.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* VEHICLE SELECT */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Select Vehicle</label>
            <select {...register("vehicleId")} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option value="">Choose a vehicle</option>
              {vehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.brand} — {v.model} ({v.year})
                </option>
              ))}
            </select>
          </div>

          {/* SERVICE TYPE — GROUPED DROPDOWN */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Service Type</label>
            <select
              {...register("serviceType")}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Choose a service</option>
              {SERVICE_TYPES.map((cat) => (
                <optgroup key={cat.category} label={cat.category}>
                  {cat.services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.value}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* SELECTED SERVICE DETAIL PILL */}
            {selectedService && (
              <div className="mt-2.5 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 transition-all" style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <span className="text-blue-500 mt-0.5 text-lg">ℹ️</span>
                <div>
                  <p className="text-sm font-bold text-blue-800">{selectedService.value}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{selectedService.desc}</p>
                </div>
              </div>
            )}
          </div>

          {/* ISSUE */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Describe the Issue <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="Tell us more about your vehicle's issue..."
              {...register("issueDescription")}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none h-32"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 flex justify-center items-center h-[52px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Booking...
                </span>
              ) : "Book Now"}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CreateBooking;