import vehicleService from "./vehicle.service.js";

// CREATE
export const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.createVehicle(
      req.user.id,
      req.body
    );

    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    next(error);
  }
};

// GET MY VEHICLES
export const getMyVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getUserVehicles(req.user.id);

    res.json({ success: true, vehicles });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await vehicleService.deleteVehicle(
      req.user.id,
      id
    );

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};