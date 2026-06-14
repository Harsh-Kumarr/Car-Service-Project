import { Booking, User, Invoice, Vehicle } from "../../models/models.js";
import AppError from "../../utils/AppError.js";
import bookingService from "../booking/booking.service.js";
import { sendEmail } from "../../services/email.service.js";
import { bookingAcceptedTemplate, bookingRejectedTemplate } from "../../utils/emailTemplates.js";
import { sendBookingAcceptedNotification } from "../../events/notification.events.js";


class AdminService {
    // GET ALL BOOKINGS
    async getAllBookings() {
        return Booking.find()
            .populate("userId")
            .populate("vehicleId")
            .populate("assignedMechanic");
    }

    // ACCEPT BOOKING
    async acceptBooking(bookingId) {
  // ✅ Populate user
  const booking = await Booking.findById(bookingId).populate("userId");

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.status !== "pending") {
    throw new AppError("Only pending bookings can be accepted", 400);
  }

  // ✅ Update status
  const updated = await bookingService.updateStatus(
    bookingId,
    "accepted",
    "Booking accepted by admin"
  );

  // ✅ SAFE EMAIL (VERY IMPORTANT)
  try {
    if (booking.userId?.email) {
      await sendEmail(
        booking.userId.email,
        "Booking Accepted",
        bookingAcceptedTemplate(booking.userId.name)
      );
    } else {
      console.log("⚠️ No email found for user");
    }
  } catch (err) {
    console.log("Email error:", err.message);
  }

  // ✅ Notification (safe)
  try {
    await sendBookingAcceptedNotification(booking.userId);
  } catch (err) {
    console.log("Notification error:", err.message);
  }

  return updated;
}

    // REJECT BOOKING
    async rejectBooking(bookingId) {
  // ✅ Populate user (future-proof)
  const booking = await Booking.findById(bookingId).populate("userId");

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.status !== "pending") {
    throw new AppError("Only pending bookings can be rejected", 400);
  }

  booking.status = "rejected";
  await booking.save();

  // ✅ OPTIONAL: send email
  try {
    if (booking.userId?.email) {
      await sendEmail(
        booking.userId.email,
        "Booking Declined — AutoAI",
        bookingRejectedTemplate(booking.userId.name)
      );
    }
  } catch (err) {
    console.log("Reject email error:", err.message);
  }

  return booking;
}

    // ASSIGN MECHANIC (ENHANCED)
    async assignMechanic(bookingId, mechanicId) {
        const mechanic = await User.findById(mechanicId);

        if (!mechanic || mechanic.role !== "mechanic") {
            throw new AppError("Invalid mechanic", 400);
        }

        return bookingService.assignMechanic(bookingId, mechanicId);
    }

    // DASHBOARD STATS
    async getDashboard() {
        // ✅ EXISTING (UNCHANGED)
        const totalBookings = await Booking.countDocuments();

        const completed = await Booking.countDocuments({
            status: "completed",
        });

        const pending = await Booking.countDocuments({
            status: "pending",
        });

        // 🔥 NEW: Total Revenue
        const revenueData = await Invoice.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" },
                },
            },
        ]);

        const totalRevenue = revenueData[0]?.total || 0;

        // 🔥 NEW: Most Common Issues
        const issues = await Booking.aggregate([
            {
                $group: {
                    _id: "$issueDescription",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        // 📊 NEW: Users Stats
        const totalUsers = await User.countDocuments({ role: "user" });

        const users = await User.find({ role: "user" }).select("name email phone").lean();
        const usersList = await Promise.all(
            users.map(async (u) => {
                const carCount = await Vehicle.countDocuments({ userId: u._id });
                return {
                    _id: u._id,
                    name: u.name,
                    email: u.email,
                    phone: u.phone || "N/A",
                    totalCars: carCount,
                };
            })
        );

        // ✅ RETURN (EXTENDED)
        return {
            totalBookings,
            completed,
            pending,
            totalRevenue,   // 🔥 added
            topIssues: issues, // 🔥 added
            totalUsers,
            usersList,
        };
    }
}

export default new AdminService();