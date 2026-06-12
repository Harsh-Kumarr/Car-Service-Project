import express from "express";
import mongoose from "mongoose";

import authRoutes from "../modules/auth/auth.routes.js";
import bookingRoutes from "../modules/booking/booking.routes.js";
import vehicleRoutes from "../modules/vehicle/vehicle.routes.js";
import mechanicRoutes from "../modules/mechanic/mechanic.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";
import reviewRoutes from "../modules/review/review.routes.js";

const router = express.Router();

// 🔐 AUTH
router.use("/auth", authRoutes);

// 🚗 VEHICLE
router.use("/vehicle", vehicleRoutes);

// 📦 BOOKINGS
router.use("/bookings", bookingRoutes);

// 🧑‍💼 ADMIN
router.use("/admin", adminRoutes);

// 👨‍🔧 MECHANIC
router.use("/mechanic", mechanicRoutes);

// 💳 PAYMENT
router.use("/payment", paymentRoutes);
router.use("/ai", aiRoutes);

// ⭐ REVIEWS
router.use("/reviews", reviewRoutes);

// ❤️ HEALTH CHECK
router.get("/health", (req, res) => {
  res.json({
    success: true,
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

export default router;



// do it later 
// /api/user/profile
// /api/user/update