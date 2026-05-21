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

    // OTP fields
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);