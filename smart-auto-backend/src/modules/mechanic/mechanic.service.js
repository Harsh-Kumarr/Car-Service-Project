import Booking from "../booking/booking.model.js";
import AppError from "../../utils/AppError.js";
import bookingService from "../booking/booking.service.js";

class MechanicService {
  // GET ASSIGNED JOBS
  async getAssignedJobs(mechanicId) {
    return Booking.find({ assignedMechanic: mechanicId })
      .populate("vehicleId")
      .populate("userId");
  }

  // UPDATE STATUS
  async updateJobStatus(mechanicId, bookingId, status, note) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // 🔐 Ownership check
    if (booking.assignedMechanic?.toString() !== mechanicId) {
      throw new AppError("Not authorized for this job", 403);
    }

    // ✅ ONLY use central service (no manual update)
    return bookingService.updateStatus(bookingId, status, note);
  }
}

export default new MechanicService();