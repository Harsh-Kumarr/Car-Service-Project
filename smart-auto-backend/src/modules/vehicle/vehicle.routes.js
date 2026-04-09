import express from "express";
import {
  createVehicle,
  getMyVehicles,
  deleteVehicle,
} from "./vehicle.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";

const router = express.Router();

// USER VEHICLE ROUTES
router.post("/", verifyToken, roleGuard("user"), createVehicle);
router.get("/", verifyToken, roleGuard("user"), getMyVehicles);
router.delete("/:id", verifyToken, roleGuard("user"), deleteVehicle);

export default router;