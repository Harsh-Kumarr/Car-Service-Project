import { useForm } from "react-hook-form";
import { createBooking } from "../bookingService";
import { useEffect } from "react";
import useVehicleStore from "../../vehicle/vehicleStore";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

const CreateBooking = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  useEffect(() => {
    fetchVehicles();
  }, []);

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
          <p className="text-gray-500 mt-1">Select your vehicle and describe the service needed.</p>
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

          {/* SERVICE TYPE */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Service Type</label>
            <input
              placeholder="e.g. Oil Change, AC Repair"
              {...register("serviceType")}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* ISSUE */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Describe the Issue</label>
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
    </div>
  );
};

export default CreateBooking;