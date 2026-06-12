import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import mongoose from "mongoose";

// Ensure database connection is active (caching connection in serverless)
if (mongoose.connection.readyState === 0) {
  await connectDB();
}

export default app;
