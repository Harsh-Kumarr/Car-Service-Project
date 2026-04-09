import express from "express";
import {
  getMyJobs,
  updateJobStatus,
} from "./mechanic.controller.js";

import verifyToken from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";

const router = express.Router();

// Only mechanic allowed
router.get("/jobs", verifyToken, roleGuard("mechanic"), getMyJobs);


router.post(
  "/status",
  verifyToken,
  roleGuard("mechanic"),
  updateJobStatus
);

export default router;