// import nodemailer from "nodemailer";
// import { env } from "../config/env.js";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: env.EMAIL_USER,
//     pass: env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async (to, subject, html) => {
//   if (!env.EMAIL_USER || !env.EMAIL_PASS) {
//     throw new Error("Email credentials missing in env");
//   }

//   await transporter.sendMail({
//     from: `"Smart Auto" <${env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };


import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

// GENERIC SENDER
export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Smart Auto Service" <${env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: "This is an automated message from Smart Auto Service.", // ✅ ADD THIS

    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};