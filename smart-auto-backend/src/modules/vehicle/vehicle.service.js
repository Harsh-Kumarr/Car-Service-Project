import Vehicle from "./vehicle.model.js";
import AppError from "../../utils/AppError.js";

class VehicleService {
  // CREATE VEHICLE
  async createVehicle(userId, data) {
    // Check if vehicle already exists
    const existingVehicle = await Vehicle.findOne({
      userId,
      registrationNumber: data.registrationNumber,
    });

    if (existingVehicle) {
      throw new AppError("Vehicle already exists", 400);
    }

    const vehicle = await Vehicle.create({
      ...data,
      userId,
    });

    return vehicle;
  }

  // GET USER VEHICLES
  async getUserVehicles(userId) {
    return Vehicle.find({ userId });
  }

  // DELETE VEHICLE
  async deleteVehicle(userId, vehicleId) {
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      throw new AppError("Vehicle not found", 404);
    }

    // Ownership check
    if (vehicle.userId.toString() !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    await vehicle.deleteOne();

    return { message: "Vehicle deleted successfully" };
  }
}

export default new VehicleService();