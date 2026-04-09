import express from "express";
import {
  register,
  verifyOTP,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../../utils/validators.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-otp", verifyOTP);
router.post("/login", validate(loginSchema), login);
router.post("/change-password", verifyToken, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;