import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import { generateOTP, generateToken } from "./auth.utils.js";
import { sendEmail } from "../../services/email.service.js";
import AppError from "../../utils/AppError.js";
import { otpTemplate } from "../../utils/emailTemplates.js";

class AuthService {
  // REGISTER
  async register(data) {
    if (!data) {
      throw new AppError("Request body is missing", 400);
    }

    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }
    const existing = await User.findOne({ email });
    if (existing) throw new AppError("Email already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
      // role:'mechanic'
    });

    await sendEmail(
  email,
  "Verify Your Account",
  otpTemplate(otp)
);

    return { message: "User registered. OTP sent to email." };
  }

  // VERIFY OTP
  async verifyOTP(email, otp) {
    const user = await User.findOne({ email });

    if (!user) throw new AppError("User not found", 404);

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      throw new AppError("Invalid or expired OTP", 400);
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return { message: "Account verified successfully" };
  }

  // LOGIN
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) throw new AppError("Invalid credentials", 401);

    if (!user.isVerified) {
      throw new AppError("Please verify your email first", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
  }
}

export default new AuthService();