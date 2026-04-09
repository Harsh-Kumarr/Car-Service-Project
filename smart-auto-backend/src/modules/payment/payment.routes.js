import express from "express";
import {
  createOrder,
  verifyPayment,
} from "./payment.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify", verifyToken, verifyPayment);

export default router;