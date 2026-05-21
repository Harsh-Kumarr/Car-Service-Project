import express from "express";
import {
  createOrUpdateReview,
  getAllReviews,
  getMyReview,
  deleteReview,
} from "./review.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🌐 PUBLIC — get all reviews (for landing page)
router.get("/", getAllReviews);

// 🔐 PROTECTED — user actions
router.post("/", verifyToken, createOrUpdateReview);
router.get("/my", verifyToken, getMyReview);
router.delete("/", verifyToken, deleteReview);

export default router;
