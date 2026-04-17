import { useEffect } from "react";
import useVehicleStore from "../vehicleStore";
import { IoCarSportOutline } from "react-icons/io5";


const MyVehicles = () => {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl inline-flex items-center gap-2 font-extrabold text-gray-900 tracking-tight">My Vehicles <IoCarSportOutline /></h2>
        <p className="text-gray-500 mt-1">Manage your registered vehicles below.</p>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-5xl mb-4 block">🚙</span>
          <p className="text-gray-500 font-medium">No vehicles found. Add your first vehicle!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <IoCarSportOutline />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{v.brand}</p>
                  <p className="text-sm text-gray-500">{v.model}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-sm text-gray-400 font-medium">{v.year}</span>
                <span className="text-xs bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full uppercase">{v.fuelType || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;