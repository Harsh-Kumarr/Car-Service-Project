import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

import errorHandler from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api", apiLimiter);

// Health Check
app.get("/", (req, res) => {
  res.send("🚗 Smart Auto Backend Running...");
});

// API Routes
app.use("/api", routes);

// Error Middleware
app.use(errorHandler);

export default app;