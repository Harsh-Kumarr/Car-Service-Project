import express from "express";
import { diagnose } from "./ai.controller.js";

const router = express.Router();

// POST /api/ai/diagnose
router.post("/diagnose", diagnose);

export default router;