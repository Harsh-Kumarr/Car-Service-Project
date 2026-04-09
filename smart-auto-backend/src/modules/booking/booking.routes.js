import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  assignMechanic,
  updateStatus,
  uploadMedia,
} from "./booking.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { bookingSchema, statusSchema } from "../../utils/validators.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

// USER
router.post(
  "/",
  verifyToken,
  roleGuard("user"),
  validate(bookingSchema), 
  createBooking
);

router.get("/my", verifyToken, roleGuard("user"), getMyBookings);

// ADMIN
router.get("/", verifyToken, roleGuard("admin"), getAllBookings);

router.post(
  "/assign",
  verifyToken,
  roleGuard("admin"),
  assignMechanic
);

// MECHANIC
router.post(
  "/status",
  verifyToken,
  roleGuard("mechanic", "admin"),
  validate(statusSchema),
  updateStatus
);


// Upload
router.post(
  "/upload",
  verifyToken,
  roleGuard("user"), 
  upload.single("file"),
  uploadMedia
);

export default router;