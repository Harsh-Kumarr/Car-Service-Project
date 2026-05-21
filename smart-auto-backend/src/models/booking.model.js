import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
    },
    media: [String],

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "diagnosing",
        "repairing",
        "testing",
        "completed",
        "rejected",
      ],
      default: "pending",
    },

    assignedMechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    costEstimate: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);