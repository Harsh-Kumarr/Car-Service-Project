import AppError from "../utils/AppError.js";

const roleGuard = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Access denied", 403));
    }
    next();
  };
};

export default roleGuard;