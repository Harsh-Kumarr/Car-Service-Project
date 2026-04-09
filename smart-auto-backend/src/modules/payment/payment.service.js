import Razorpay from "razorpay";
import crypto from "crypto";
import { sendEmail } from "../../services/email.service.js";
import { paymentSuccessTemplate } from "../../utils/emailTemplates.js";
import User from "../auth/auth.model.js";
import Booking from "../booking/booking.model.js";
import Invoice from "./invoice.model.js";
import AppError from "../../utils/AppError.js";
import { sendPaymentSuccessNotification } from "../../events/notification.events.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentService {
  // CREATE ORDER
  async createOrder(bookingId) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (booking.paymentStatus === "paid") {
      throw new AppError("Already paid", 400);
    }

    const amount = booking.costEstimate || 5000;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    return { order, amount };
  }

  // VERIFY PAYMENT
  async verifyPayment(data) {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = data;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new AppError("Payment verification failed", 400);
    }

    // ✅ Get booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    // ✅ Update payment status
    booking.paymentStatus = "paid";
    await booking.save();

    // ✅ Create invoice
    const invoice = await Invoice.create({
      bookingId,
      parts: [],
      laborCost: booking.costEstimate || 5000,
      tax: 0,
      totalAmount: booking.costEstimate || 5000,
    });

    // ✅ Send email
    const user = await User.findById(booking.userId);

    if (user) {
      await sendEmail(
        user.email,
        "Payment Successful",
        paymentSuccessTemplate(invoice.totalAmount)
      );
    }

    return { booking, invoice };
  }
}

export default new PaymentService();