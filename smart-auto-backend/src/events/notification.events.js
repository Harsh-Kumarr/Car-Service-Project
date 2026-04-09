import { sendEmail } from "../services/email.service.js";
import {
  bookingAcceptedTemplate,
  serviceCompletedTemplate,
  paymentSuccessTemplate,
} from "../utils/emailTemplates.js";

export const sendBookingAcceptedNotification = async (user) => {
  await sendEmail(
    user.email,
    "Booking Accepted",
    bookingAcceptedTemplate(user.name)
  );
};

export const sendServiceCompletedNotification = async (user) => {
  await sendEmail(
    user.email,
    "Service Completed",
    serviceCompletedTemplate(user.name)
  );
};

export const sendPaymentSuccessNotification = async (user, amount) => {
  await sendEmail(
    user.email,
    "Payment Successful",
    paymentSuccessTemplate(amount)
  );
};