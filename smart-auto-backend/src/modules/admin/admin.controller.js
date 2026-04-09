import User from "../auth/auth.model.js";
import adminService from "./admin.service.js";

// GET ALL BOOKINGS
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await adminService.getAllBookings();

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// ACCEPT BOOKING
export const acceptBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await adminService.acceptBooking(bookingId);

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// REJECT BOOKING
export const rejectBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await adminService.rejectBooking(bookingId);

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// GET MECHANIC
export const getMechanics = async (req, res, next) => {
  try {
    const mechanics = await User.find({ role: "mechanic" }).select("-password");

    res.json({
      success: true,
      data: mechanics,
    });
  } catch (err) {
    next(err);
  }
};

// ASSIGN MECHANIC
export const assignMechanic = async (req, res, next) => {
  try {
    const { bookingId, mechanicId } = req.body;

    const booking = await adminService.assignMechanic(
      bookingId,
      mechanicId
    );

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// DASHBOARD
export const getDashboard = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboard();

    res.json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};