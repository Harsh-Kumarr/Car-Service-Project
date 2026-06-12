import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "mechanic"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Phone number (used for mechanic contact)
    phone: {
      type: String,
      default: null,
    },

    // OTP fields
    otp: String,
    otpExpires: Date,

    // Session Management
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);