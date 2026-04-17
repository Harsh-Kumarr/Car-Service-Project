import { useForm } from "react-hook-form";
import { addVehicle } from "../vehicleService";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";
import useVehicleStore from "../vehicleStore";
import { useNavigate } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";


const AddVehicle = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding vehicle...");
    try {
      await addVehicle(data);
      await fetchVehicles();
      toast.success("Vehicle added!", { id: toastId });
      navigate("/vehicles");
    } catch (err) {
      toast.error("Error adding vehicle", { id: toastId });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl inline-flex items-center gap-2 font-extrabold text-gray-900 tracking-tight">Add Vehicle <IoCarSportOutline /></h2>
          <p className="text-gray-500 mt-1">Enter the details of your vehicle and owner information.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* VEHICLE DETAILS */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm"><IoCarSportOutline /></span>
              Vehicle Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Registration Number *" name="registrationNumber" register={register} errors={errors} placeholder="e.g. PB10AB1234" />
              <Input label="Year *" name="year" register={register} errors={errors} placeholder="e.g. 2022" />
              <Input label="Brand *" name="brand" register={register} errors={errors} placeholder="e.g. Hyundai" />
              <Input label="Model *" name="model" register={register} errors={errors} placeholder="e.g. Creta" />
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Fuel Type</label>
                <select {...register("fuelType")} className="w-full border border-gray-200 bg-gray-50 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                  <option value="">Select Fuel</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <Input label="VIN / Chassis Number" name="vin" register={register} errors={errors} placeholder="Optional" />
            </div>
          </div>

          {/* OWNER DETAILS */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-sm">👤</span>
              Owner Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Owner Name *" name="ownerName" register={register} errors={errors} placeholder="John Doe" />
              <Input label="Phone Number *" name="phone" register={register} errors={errors} placeholder="+91 98765 43210" />
              <Input label="Alternate Phone (optional)" name="alternatePhone" register={register} errors={errors} placeholder="Optional" />
              <Input label="Address *" name="address" register={register} errors={errors} placeholder="City, State" />
            </div>
          </div>

          {/* BUTTON */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : "Add Vehicle"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;