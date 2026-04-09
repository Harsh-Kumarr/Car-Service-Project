import express from "express";
import {
  getAllBookings,
  acceptBooking,
  rejectBooking,
  assignMechanic,
  getDashboard,
  getMechanics,
} from "./admin.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";

const router = express.Router();

// 🔐 Only ADMIN allowed
router.use(verifyToken, roleGuard("admin"));

router.get("/bookings", getAllBookings);

router.post("/accept", acceptBooking);
router.post("/reject", rejectBooking);
router.post("/assign", assignMechanic);
router.get("/mechanics", getMechanics);

router.get("/dashboard", getDashboard);

export default router;