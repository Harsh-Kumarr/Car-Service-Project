import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};

export default verifyToken;