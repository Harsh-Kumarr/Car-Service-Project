import mongoose from "mongoose";
import Booking from "./booking.model.js";
import ServiceLog from "./serviceLog.model.js";
import AppError from "../../utils/AppError.js";
import { canTransition } from "./booking.utils.js";

// ✅ Email imports (you had them separately)
import { sendEmail } from "../../services/email.service.js";
import { serviceCompletedTemplate } from "../../utils/emailTemplates.js";
import User from "../auth/auth.model.js";
import { sendServiceCompletedNotification } from "../../events/notification.events.js";


class BookingService {
  // CREATE BOOKING
  async createBooking(userId, data) {
    const { vehicleId } = data;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new AppError("Invalid vehicle ID", 400);
    }

    const booking = await Booking.create({
      ...data,
      userId,
    });

    // ✅ Initial log
    await ServiceLog.create({
      bookingId: booking._id,
      updates: [{ status: "pending", note: "Booking created" }],
    });

    return booking;
  }

  // GET USER BOOKINGS
  async getUserBookings(userId) {
    return Booking.find({ userId })
      .populate("vehicleId")
      .populate("assignedMechanic")
      .populate("userId");
  }

  // GET ALL BOOKINGS (ADMIN)
  async getAllBookings() {
    return Booking.find()
      .populate("userId")
      .populate("vehicleId")
      .populate("assignedMechanic");
  }

  // ASSIGN MECHANIC
  async assignMechanic(bookingId, mechanicId) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    booking.assignedMechanic = mechanicId;
    booking.status = "accepted";

    await booking.save();

    await this.addLog(bookingId, "accepted", "Mechanic assigned");

    return booking;
  }

  // UPDATE STATUS
  async updateStatus(bookingId, newStatus, note = "") {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (!canTransition(booking.status, newStatus)) {
      throw new AppError(
        `Invalid status transition from ${booking.status} to ${newStatus}`,
        400
      );
    }

    booking.status = newStatus;
    await booking.save();

    await this.addLog(bookingId, newStatus, note);

    // ✅ Send email when completed (your logic restored properly)
    if (newStatus === "completed") {
      const user = await User.findById(booking.userId);

      if (user) {
           await sendServiceCompletedNotification(user);

      }
    }

    return booking;
  }

  // ADD SERVICE LOG
  async addLog(bookingId, status, note) {
    const log = await ServiceLog.findOne({ bookingId });

    if (!log) {
      return ServiceLog.create({
        bookingId,
        updates: [{ status, note }],
      });
    }

    log.updates.push({ status, note });
    await log.save();
  }
}

export default new BookingService();